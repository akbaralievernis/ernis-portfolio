/** Shared class strings so every control gets idle / hover / active / focus-visible / disabled. */
const base =
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-mono uppercase tracking-[0.08em] transition-[background-color,color,border-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-40";

export const btn = {
  primary: `${base} h-10 rounded-[6px] bg-accent px-4 text-[11.5px] font-medium text-ink hover:bg-accent-hover active:bg-accent-press`,
  ghost: `${base} h-10 rounded-[6px] border border-line-strong px-4 text-[11.5px] text-fg hover:border-zinc-500 hover:bg-raised active:bg-surface`,
  chip: `${base} h-8 rounded-full border px-3 text-[10.5px]`,
  dock: `${base} h-8 rounded-full px-3 text-[10.5px] text-muted hover:bg-raised hover:text-fg active:bg-line`,
};

export const chipStatic =
  "inline-flex items-center rounded-[4px] border border-line bg-raised px-2 py-1 font-mono text-[10.5px] text-muted";
