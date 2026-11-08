"use client";

import { useEffect } from "react";
import { Pause, Play, Power, Clapperboard, Square } from "lucide-react";
import { agentStore, useAgentSettings } from "@/lib/agent-store";
import { requestTour, stopTour } from "@/lib/tour";
import { btn } from "./ui";

export function Dock() {
  const { enabled, paused, touring, count, booted } = useAgentSettings();

  const toggleAgents = () => {
    const enabled = !agentStore.getSettings().enabled;
    agentStore.set({ enabled, paused: false });
    try {
      window.localStorage.setItem("agents", enabled ? "on" : "off");
    } catch {
      /* storage blocked: the toggle still works for this visit */
    }
  };
  const togglePause = () => agentStore.set({ paused: !agentStore.getSettings().paused });
  const toggleTour = () => (agentStore.getSettings().touring ? stopTour() : requestTour());

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === "a") toggleAgents();
      else if (k === "p" && agentStore.getSettings().enabled) togglePause();
      else if (k === "t") toggleTour();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const status = !enabled ? "offline" : paused ? "paused" : "live";

  return (
    <div
      className="fixed bottom-4 left-1/2 z-[85] -translate-x-1/2 transition-[opacity,transform] duration-500"
      style={{ opacity: booted ? 1 : 0, transform: `translate(-50%, ${booted ? 0 : 12}px)` }}
    >
      <div role="toolbar" aria-label="Управление агентами" className="flex items-center gap-0.5 rounded-full border border-line-strong bg-surface p-1 pl-3 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.8)]">
        <span className="mr-1.5 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">
          <span className="relative flex size-1.5">
            {status === "live" && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />}
            <span className={`relative size-1.5 rounded-full ${status === "live" ? "bg-emerald-400" : status === "paused" ? "bg-amber-400" : "bg-zinc-600"}`} />
          </span>
          <span className="tabular-nums text-fg">{count}</span>
          <span className="hidden sm:inline">агентов {status === "live" ? "в работе" : status === "paused" ? "на паузе" : "выкл"}</span>
        </span>
        <button type="button" className={btn.dock} onClick={togglePause} disabled={!enabled} aria-label={paused ? "Продолжить" : "Пауза"} title="Пауза (P)">
          {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
        </button>
        <button type="button" className={btn.dock} onClick={toggleAgents} aria-pressed={enabled} title="Агенты вкл/выкл (A)">
          <Power className="size-3.5" />
          <span className="hidden sm:inline">{enabled ? "Агенты вкл" : "Агенты выкл"}</span>
        </button>
        <button
          type="button"
          onClick={toggleTour}
          title="Автотур для записи экрана (T)"
          className={`${btn.dock} ${touring ? "bg-accent text-ink hover:bg-accent-hover hover:text-ink" : "text-fg"}`}
        >
          {touring ? <Square className="size-3" /> : <Clapperboard className="size-3.5" />}
          {touring ? "Стоп" : "Тур"}
        </button>
      </div>
    </div>
  );
}
