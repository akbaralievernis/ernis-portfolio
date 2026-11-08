"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { AGENTS } from "@/lib/agents";
import { agentStore, useAgentSettings } from "@/lib/agent-store";

/**
 * Build engine. Every [data-build] element starts hidden (html.build-mode).
 * When it scrolls into view it is queued; a free agent flies to its top-left
 * corner, drags out a blue wireframe to the bottom-right, then fills it:
 *   data-build="type" → text is typed in character by character
 *   data-build="pop"  → element scales in
 *   data-build="wipe" → element is revealed left to right
 * Once nothing is left to build the agents drift around, and they circle the
 * [data-swarm-anchor] when it is on screen.
 */

type Kind = "type" | "pop" | "wipe";
type Phase = "idle" | "travel" | "draw" | "fill";

interface Job {
  el: HTMLElement;
  kind: Kind;
  queuedAt: number;
}

interface Typing {
  nodes: Text[];
  full: string[];
  total: number;
}

interface Agent {
  x: number;
  y: number;
  tx: number;
  ty: number;
  rate: number;
  phase: Phase;
  job: Job | null;
  t0: number;
  dur: number;
  until: number;
  typing: Typing | null;
  tilt: number;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Cap on agents building at once, so only a few wireframes are on screen at a time. */
const MAX_ACTIVE = 6;

function textNodes(el: HTMLElement): Text[] {
  const out: Text[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if ((n.nodeValue ?? "").length) out.push(n as Text);
  }
  return out;
}

function parentReady(el: HTMLElement): boolean {
  const p = el.parentElement?.closest<HTMLElement>("[data-build]");
  return !p || p.classList.contains("built");
}

export function Builder() {
  const { booted, enabled, count } = useAgentSettings();
  const cursors = useRef<(HTMLDivElement | null)[]>([]);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const tags = useRef<(HTMLSpanElement | null)[]>([]);
  const ripples = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!booted) return;
    const root = document.documentElement;
    const n = count;
    const vw = () => window.innerWidth;
    const vh = () => window.innerHeight;
    const queue: Job[] = [];
    const queued = new WeakSet<HTMLElement>();

    const finishTyping = (a: Agent) => {
      if (!a.typing) return;
      a.typing.nodes.forEach((node, k) => (node.nodeValue = a.typing!.full[k]));
      a.typing = null;
      if (a.job) {
        a.job.el.style.minWidth = "";
        a.job.el.style.minHeight = "";
      }
    };

    const buildNow = (el: HTMLElement) => el.classList.add("built", "instant");

    // Agents switched off: show everything that is still pending.
    const flushAll = () => {
      agents.forEach((a) => {
        finishTyping(a);
        if (a.job) buildNow(a.job.el);
        a.job = null;
        a.phase = "idle";
      });
      queue.length = 0;
      document.querySelectorAll<HTMLElement>("[data-build]").forEach(buildNow);
      root.classList.remove("build-mode");
    };

    const io = new IntersectionObserver(
      (entries) => {
        const now = performance.now();
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (!e.isIntersecting || queued.has(el) || el.classList.contains("built")) return;
          queued.add(el);
          queue.push({ el, kind: (el.dataset.build as Kind) || "pop", queuedAt: now });
        });
        queue.sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    if (root.classList.contains("build-mode")) {
      document.querySelectorAll<HTMLElement>("[data-build]").forEach((el) => io.observe(el));
    }

    let swarm = false;
    const anchor = document.querySelector<HTMLElement>("[data-swarm-anchor]");
    const anchorIo = anchor
      ? new IntersectionObserver(([e]) => {
          swarm = e.isIntersecting;
        }, { threshold: 0.5 })
      : null;
    if (anchor && anchorIo) anchorIo.observe(anchor);

    const agents: Agent[] = Array.from({ length: n }, (_, i) => {
      const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
      const x = vw() / 2 + Math.cos(ang) * 44;
      const y = vh() / 2 + Math.sin(ang) * 44;
      return { x, y, tx: x, ty: y, rate: 3, phase: "idle", job: null, t0: 0, dur: 0, until: 0, typing: null, tilt: 0 };
    });

    const showFrame = (i: number, on: boolean) => {
      const f = frames.current[i];
      if (f) f.style.opacity = on ? "1" : "0";
    };

    const setFrame = (i: number, x: number, y: number, w: number, h: number) => {
      const f = frames.current[i];
      if (f) {
        f.style.transform = `translate3d(${x}px,${y}px,0)`;
        f.style.width = `${Math.max(0, w)}px`;
        f.style.height = `${Math.max(0, h)}px`;
      }
    };

    // Click ripple under the cursor when an agent starts or finishes a block.
    const pulse = (i: number) => {
      const r = ripples.current[i];
      if (!r) return;
      r.classList.remove("go");
      void r.offsetWidth;
      r.classList.add("go");
    };

    const label = (i: number, text: string) => {
      const t = tags.current[i];
      if (t && t.textContent !== text) t.textContent = text;
    };

    const takeJob = (i: number, now: number): boolean => {
      for (let q = 0; q < queue.length; q++) {
        const job = queue[q];
        if (!job.el.isConnected || job.el.classList.contains("built")) {
          queue.splice(q--, 1);
          continue;
        }
        if (!parentReady(job.el)) continue;
        queue.splice(q, 1);
        const r = job.el.getBoundingClientRect();
        // Scrolled past already: no point animating it off screen.
        if (r.bottom < 0 || r.top > vh()) {
          buildNow(job.el);
          q--;
          continue;
        }
        const a = agents[i];
        a.job = job;
        a.phase = "travel";
        a.t0 = now;
        a.rate = 6.5;
        return true;
      }
      return false;
    };

    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const s = agentStore.getSettings();
      if (!s.enabled) {
        if (root.classList.contains("build-mode")) flushAll();
        agents.forEach((_, i) => showFrame(i, false));
        return;
      }
      if (s.paused) return;

      // Safety net: nothing stays hidden for long, even if every agent is busy.
      for (let q = queue.length - 1; q >= 0; q--) {
        if (now - queue[q].queuedAt > 12000 && parentReady(queue[q].el)) {
          buildNow(queue[q].el);
          queue.splice(q, 1);
        }
      }

      const anchorRect = swarm && anchor && queue.length === 0 ? anchor.getBoundingClientRect() : null;

      for (let i = 0; i < n; i++) {
        const a = agents[i];
        const def = AGENTS[i];

        if (a.phase === "idle") {
          const active = agents.reduce((c, b) => c + (b.job ? 1 : 0), 0);
          if (active >= MAX_ACTIVE || !takeJob(i, now)) {
            if (anchorRect) {
              const ang = now * 0.0006 * (i % 2 ? 1 : -1) + (i / n) * Math.PI * 2;
              const rad = 40 + (i % 3) * 24;
              a.tx = anchorRect.left + anchorRect.width / 2 + Math.cos(ang) * rad;
              a.ty = anchorRect.top + anchorRect.height / 2 + Math.sin(ang) * rad;
              a.rate = 5;
            } else if (now > a.until) {
              a.tx = rand(80, vw() - 80);
              a.ty = rand(110, vh() - 140);
              a.until = now + rand(1400, 3200);
              a.rate = 1.6;
            }
          }
        }

        if (a.job && a.phase !== "idle") {
          const el = a.job.el;
          const r = el.getBoundingClientRect();

          if (a.phase === "travel") {
            a.tx = r.left;
            a.ty = r.top;
            if (Math.hypot(a.tx - a.x, a.ty - a.y) < 10 || now - a.t0 > 1300) {
              a.phase = "draw";
              a.t0 = now;
              pulse(i);
              a.dur = clamp(380 + (r.width + r.height) * 0.3, 480, 850);
              setFrame(i, r.left, r.top, 0, 0);
              showFrame(i, true);
              const f = frames.current[i];
              if (f) f.classList.remove("filling");
            }
          } else if (a.phase === "draw") {
            const p = easeInOut(clamp((now - a.t0) / a.dur, 0, 1));
            setFrame(i, r.left, r.top, r.width * p, r.height * p);
            label(i, `${def.name} · ${Math.round(r.width)} × ${Math.round(r.height)}`);
            a.tx = r.left + r.width * p;
            a.ty = r.top + r.height * p;
            a.rate = 18;
            if (p >= 1) {
              a.phase = "fill";
              a.t0 = now;
              const f = frames.current[i];
              if (f) f.classList.add("filling");
              if (a.job.kind === "type") {
                const nodes = textNodes(el);
                const full = nodes.map((t) => t.nodeValue ?? "");
                const total = full.reduce((s2, t) => s2 + t.length, 0);
                el.style.minWidth = `${r.width}px`;
                el.style.minHeight = `${r.height}px`;
                nodes.forEach((t) => (t.nodeValue = ""));
                a.typing = { nodes, full, total };
                a.dur = clamp(total * 14, 320, 1500);
                label(i, `${def.name} · печатает`);
              } else {
                a.dur = 460;
                label(i, `${def.name} · ${a.job.kind === "wipe" ? "рисует" : "ставит"}`);
              }
              el.classList.add("built");
            }
          } else if (a.phase === "fill") {
            const p = clamp((now - a.t0) / a.dur, 0, 1);
            setFrame(i, r.left, r.top, r.width, r.height);
            if (a.typing) {
              let left = Math.floor(a.typing.total * p);
              a.typing.nodes.forEach((t, k) => {
                const full = a.typing!.full[k];
                const take = Math.min(full.length, left);
                left -= take;
                const next = full.slice(0, take);
                if (t.nodeValue !== next) t.nodeValue = next;
              });
              // Follow an imaginary caret across the lines of the block.
              const lineH = parseFloat(getComputedStyle(el).lineHeight) || 24;
              const lines = Math.max(1, Math.round(r.height / lineH));
              const prog = p * lines;
              const row = Math.min(lines - 1, Math.floor(prog));
              a.tx = r.left + (prog - row) * r.width;
              a.ty = r.top + (row + 0.75) * (r.height / lines);
              a.rate = 14;
            } else {
              a.tx = r.left + r.width * (0.55 + 0.3 * p);
              a.ty = r.top + r.height * (0.55 + 0.3 * p);
              a.rate = 8;
            }
            if (p >= 1) {
              finishTyping(a);
              showFrame(i, false);
              pulse(i);
              a.job = null;
              a.phase = "idle";
              a.until = 0;
            }
          }
        }

        const k = 1 - Math.exp(-a.rate * dt);
        const dx = (a.tx - a.x) * k;
        a.x += dx;
        a.y += (a.ty - a.y) * k;
        const c = cursors.current[i];
        if (c) {
          c.style.transform = `translate3d(${a.x}px,${a.y}px,0)`;
          // Lean into horizontal motion like a little rover.
          a.tilt += (clamp(dx * 1.6, -14, 14) - a.tilt) * 0.2;
          c.style.setProperty("--tilt", `${a.tilt.toFixed(2)}deg`);
          const state = a.phase === "idle" ? "idle" : a.phase === "travel" ? "moving" : "working";
          if (c.dataset.state !== state) c.dataset.state = state;
        }
      }
    };

    if (!root.classList.contains("build-mode")) flushAll();
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      anchorIo?.disconnect();
      agents.forEach((a) => {
        finishTyping(a);
        if (a.job) buildNow(a.job.el);
      });
    };
  }, [booted, count]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden transition-opacity duration-300"
      style={{ opacity: booted && enabled ? 1 : 0 }}
    >
      {AGENTS.slice(0, count).map((a, i) => (
        <div key={a.name}>
          <div ref={(el) => { frames.current[i] = el; }} className="build-frame" style={{ "--c": a.color } as CSSProperties}>
            <i />
            <i />
            <i />
            <i />
            <span ref={(el) => { tags.current[i] = el; }} className="build-tag" />
          </div>
          <div
            ref={(el) => { cursors.current[i] = el; }}
            className="agent-cursor"
            data-state="idle"
            style={{ transform: "translate3d(50vw,50vh,0)", "--c": a.color, "--blink-delay": `${(i * 0.37) % 3}s` } as CSSProperties}
          >
            <span ref={(el) => { ripples.current[i] = el; }} className="bot-ripple" />
            <svg className="bot-arrow" width="18" height="22" viewBox="0 0 18 22" fill="none">
              <path d="M1.5 1.5v16.2l4.6-4.3 3 6.6 2.9-1.3-3-6.5h6.3L1.5 1.5Z" fill={a.color} stroke="#09090b" strokeWidth="1.3" strokeLinejoin="round" />
              <circle cx="5.2" cy="9.4" r="1.5" fill="#09090b" />
            </svg>
            <span className="bot-tag">
              <span className="bot-head">
                <i className="bot-antenna" />
                <i className="bot-eye" />
                <i className="bot-eye" />
              </span>
              <span className="bot-name">{a.name}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
