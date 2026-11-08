import { agentStore } from "./agent-store";

const SPEED_PX_PER_S = 95;
const RAMP = 0.06;
const HERO_BUILD_MS = 5200; // let the agents finish the hero before scrolling

let raf = 0;
let timer = 0;
let detach: (() => void) | null = null;

/** Trapezoid velocity profile: smooth start, constant middle, smooth stop. */
function progress(t: number): number {
  const v = 1 / (1 - RAMP);
  if (t < RAMP) return (v * t * t) / (2 * RAMP);
  if (t > 1 - RAMP) {
    const u = 1 - t;
    return 1 - (v * u * u) / (2 * RAMP);
  }
  return v * (t - RAMP / 2);
}

export function stopTour(): void {
  cancelAnimationFrame(raf);
  window.clearTimeout(timer);
  detach?.();
  detach = null;
  document.documentElement.classList.remove("is-touring");
  if (agentStore.getSettings().touring) agentStore.set({ touring: false });
}

/** Reload into a fresh build with the tour queued, so every take starts from an empty page. */
export function requestTour(): void {
  const url = new URL(window.location.href);
  url.searchParams.set("agents", "on");
  url.searchParams.set("tour", "1");
  url.hash = "";
  window.scrollTo({ top: 0, behavior: "instant" });
  window.location.replace(url.toString());
}

/** Auto-scrolls the page at a steady pace while the agents build each section. */
export function runTour(): void {
  stopTour();
  const root = document.documentElement;
  root.classList.add("is-touring");
  agentStore.set({ touring: true, paused: false });
  window.scrollTo({ top: 0, behavior: "instant" });

  const total = () => root.scrollHeight - window.innerHeight;
  const duration = Math.max(20000, (total() / SPEED_PX_PER_S) * 1000);

  timer = window.setTimeout(() => {
    const begin = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - begin) / duration);
      window.scrollTo({ top: total() * progress(t), behavior: "instant" });
      if (t < 1) raf = requestAnimationFrame(tick);
      else stopTour();
    };
    raf = requestAnimationFrame(tick);
  }, HERO_BUILD_MS);

  const cancel = () => stopTour();
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" || e.key === " " || e.key.startsWith("Arrow") || e.key.startsWith("Page")) cancel();
  };
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", onKey);
  detach = () => {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", onKey);
  };
}
