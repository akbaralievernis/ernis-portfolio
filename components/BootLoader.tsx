"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AGENTS } from "@/lib/agents";
import { agentStore, useAgentSettings } from "@/lib/agent-store";
import { runTour } from "@/lib/tour";
import { PROFILE } from "@/lib/content";

const BOOT_MS = 1100;

/** A ring of agent dots on an empty page; the agents spawn from it and start building. */
export function BootLoader() {
  const { booted, count } = useAgentSettings();
  const [online, setOnline] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // build-mode is decided before paint by the inline script in layout.tsx
    const enabled = document.documentElement.classList.contains("build-mode");
    const n = window.innerWidth < 768 ? 6 : AGENTS.length;
    agentStore.set({ count: n, enabled });
    if (!enabled) {
      setShow(false);
      agentStore.set({ booted: true });
      return;
    }
    const iv = window.setInterval(() => setOnline((v) => Math.min(n, v + 1)), (BOOT_MS - 300) / n);
    const t = window.setTimeout(() => {
      agentStore.set({ booted: true });
      if (new URLSearchParams(window.location.search).get("tour") === "1") runTour();
    }, BOOT_MS);
    return () => {
      window.clearInterval(iv);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && !booted && (
        <motion.div key="boot" className="pointer-events-none fixed inset-0 z-[100]" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <div className="absolute left-1/2 top-1/2 size-0 animate-[spin_2.4s_linear_infinite]">
            {AGENTS.slice(0, count).map((a, i) => {
              const ang = (i / count) * Math.PI * 2 - Math.PI / 2;
              const on = i < online;
              return (
                <span
                  key={a.name}
                  className="absolute size-[7px] rounded-full transition-[opacity,transform] duration-300"
                  style={{
                    left: Math.round(Math.cos(ang) * 44),
                    top: Math.round(Math.sin(ang) * 44),
                    backgroundColor: a.color,
                    opacity: on ? 1 : 0.12,
                    transform: `translate(-50%,-50%) scale(${on ? 1 : 0.6})`,
                  }}
                />
              );
            })}
          </div>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[22px] text-accent">{PROFILE.initial}</span>
          <div className="absolute left-1/2 top-1/2 mt-20 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Запуск агентов{" "}
            <span className="tabular-nums text-fg">
              {String(online).padStart(2, "0")}/{String(count).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
