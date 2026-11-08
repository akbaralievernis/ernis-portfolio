import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { HERO_STATS, PROFILE } from "@/lib/content";
import { btn } from "./ui";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {/* Red glow behind the portrait */}
      <div
        data-build="pop"
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(55%_55%_at_50%_64%,rgb(255_59_47/0.30),transparent_72%)]"
      />

      {/* Giant word, behind the portrait */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[22svh] flex justify-center md:top-[15svh]">
        <span data-build="wipe" className="block select-none font-display text-[clamp(64px,17vw,300px)] uppercase leading-[0.8] tracking-[-0.01em]">
          <span className="metal-text block pb-[0.04em]">Портфолио</span>
        </span>
      </div>

      {/* Black-and-white cut-out */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[62svh] w-[min(108vw,720px)] -translate-x-1/2 md:h-[min(84svh,880px)]">
        <div data-build="pop" className="relative h-full w-full">
          <Image
            src={PROFILE.photo}
            alt={`${PROFILE.first} ${PROFILE.last}`}
            fill
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="fade-bottom object-contain object-bottom"
          />
        </div>
      </div>

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1360px] flex-col justify-end px-4 pb-24 pt-28 md:justify-center md:px-8 md:pb-16">
        <div className="max-w-[440px] md:mt-[14svh]">
          <p data-build="type" className="font-brush text-[30px] leading-none text-fg md:text-[38px]">
            Привет, я
          </p>
          <h1 data-build="type" className="mt-1 font-display text-[clamp(44px,5vw,76px)] uppercase leading-[0.9] text-fg">
            {PROFILE.first}
            <br />
            {PROFILE.last}
            <span className="text-accent">.</span>
          </h1>
          <p data-build="type" className="mt-3 font-display text-[clamp(24px,2.5vw,36px)] uppercase leading-[0.98] text-accent">
            {PROFILE.roleA}
            <br />
            {PROFILE.roleB}
          </p>
          <p data-build="type" className="mt-4 max-w-[300px] text-[14.5px] leading-[1.55] text-zinc-300">
            {PROFILE.bio}
          </p>
          <div data-build="pop" className="mt-6 inline-flex">
            <a href="#work" className={btn.primary}>
              Смотреть работы <ArrowUpRight className="size-3.5" />
            </a>
          </div>
          <p data-build="type" className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            {PROFILE.location} · {PROFILE.openTo}
          </p>
        </div>

        <dl className="mt-10 hidden gap-6 md:absolute md:right-8 md:top-1/2 md:mt-0 md:flex md:-translate-y-1/4 md:flex-col">
          {HERO_STATS.map((s) => (
            <div key={s.label} data-build="pop" className="text-right">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-[44px] leading-none text-accent">{s.value}</dd>
              <dd className="mt-1 whitespace-pre-line font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
