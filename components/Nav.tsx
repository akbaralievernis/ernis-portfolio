"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { NAV, PROFILE } from "@/lib/content";
import { useAgentSettings } from "@/lib/agent-store";

export function Nav() {
  const [active, setActive] = useState<string>("home");
  const { booted } = useAgentSettings();

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className="fixed left-1/2 top-3 z-[80] transition-[opacity,transform] duration-500"
      style={{ opacity: booted ? 1 : 0, transform: `translate(-50%, ${booted ? 0 : -10}px)` }}
    >
      <nav data-build="pop" aria-label="Навигация" className="flex items-center gap-0.5 rounded-full border border-line-strong bg-surface p-1 shadow-[0_12px_40px_-16px_rgb(0_0_0/0.9)]">
        <a
          href="#home"
          aria-label="Наверх"
          className="mr-1 grid size-8 place-items-center rounded-full bg-accent font-display text-[15px] leading-none text-ink transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg"
        >
          {PROFILE.initial}
        </a>
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            aria-current={active === n.id ? "true" : undefined}
            className="relative rounded-full px-2.5 py-1.5 text-[12.5px] font-medium tracking-tight text-muted transition-colors duration-150 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97] aria-[current]:text-fg sm:px-3"
          >
            {active === n.id && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-full bg-raised ring-1 ring-line-strong"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <span className="relative">{n.label}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}

export function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[75] h-full w-[2px] origin-top bg-accent"
      style={{ scaleY }}
    />
  );
}
