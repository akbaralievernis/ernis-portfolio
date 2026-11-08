import { useSyncExternalStore } from "react";

export interface AgentSettings {
  enabled: boolean;
  paused: boolean;
  touring: boolean;
  booted: boolean;
  count: number;
}

let settings: AgentSettings = { enabled: true, paused: false, touring: false, booted: false, count: 12 };
const listeners = new Set<() => void>();

export const agentStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSettings: () => settings,
  set(patch: Partial<AgentSettings>) {
    settings = { ...settings, ...patch };
    listeners.forEach((l) => l());
  },
};

export function useAgentSettings(): AgentSettings {
  return useSyncExternalStore(agentStore.subscribe, agentStore.getSettings, agentStore.getSettings);
}
