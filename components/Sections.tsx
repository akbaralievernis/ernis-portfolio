import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Instagram, Mail, MessageCircle } from "lucide-react";
import { ABOUT_TEXT, EDUCATION, MORE_WORK, PRINCIPLES, PROFILE, QUOTE, RECORD, SKILLS, TIMELINE, TOOLS, TRAVEL, WORK, WORK_STATS } from "@/lib/content";
import { btn, chipStatic } from "./ui";

function Tag({ children }: { children: ReactNode }) {
  return (
    <p data-build="type" className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
      {children}
    </p>
  );
}

function Headline({ a, b }: { a: string; b: string }) {
  return (
    <h2 data-build="type" className="mt-3 font-display text-[clamp(46px,6.4vw,96px)] uppercase leading-[0.9] text-fg">
      {a}
      <br />
      <span className="text-accent">{b}</span>
    </h2>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-[1360px] scroll-mt-10 px-4 py-24 md:px-8 md:py-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
        <div className="lg:col-span-6">
          <Tag>Избранные работы</Tag>
          <Headline a="Работы, которые" b="запущены." />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p data-build="type" className="text-[15.5px] leading-[1.6] text-zinc-300">
            Учебные игры для школ, сервисы для Оша и Кыргызстана, ИИ-чатбот и сайты для клиентов. Все проекты ниже работают, у каждого есть живая ссылка и код на GitHub.
          </p>
          <dl className="mt-7 grid grid-cols-3 border-t border-line pt-5">
            {WORK_STATS.map((s) => (
              <div key={s.label} data-build="pop">
                <dd className="font-display text-[40px] leading-none text-fg">
                  {s.value}
                  <span className="text-accent">.</span>
                </dd>
                <dt className="mt-2 whitespace-pre-line font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-faint">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {WORK.map((w) => (
          <article
            key={w.n}
            data-build="pop"
            className="group flex flex-col overflow-hidden rounded-[10px] border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong md:p-8"
          >
            <div data-build="wipe" className="relative -mx-6 -mt-6 mb-6 aspect-[16/9] max-w-none overflow-hidden border-b border-line md:-mx-8 md:-mt-8 md:mb-8">
              <Image
                src={w.image}
                alt={`Скриншот сайта ${w.title}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-[44px] leading-none text-accent">{w.n}</span>
              <span className="text-right font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">{w.meta}</span>
            </div>
            <h3 data-build="type" className="mt-5 font-display text-[clamp(34px,3.4vw,48px)] uppercase leading-[0.95] text-fg">
              {w.title}
            </h3>
            <p data-build="type" className="mt-3 text-[15px] leading-[1.55] text-zinc-300">
              {w.summary}
            </p>
            <ul className="mt-5 space-y-2.5">
              {w.points.map((pt) => (
                <li key={pt} data-build="type" className="relative pl-5 text-[14px] leading-[1.5] text-muted">
                  <span aria-hidden className="absolute left-0 top-[9px] h-px w-2.5 bg-accent" />
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-7">
              <div className="flex flex-wrap gap-1.5">
                {w.stack.map((c) => (
                  <span key={c} className={chipStatic}>
                    {c}
                  </span>
                ))}
              </div>
              {w.links.length > 0 && (
                <div className="flex gap-1.5">
                  {w.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-8 items-center gap-1 rounded-[5px] border border-line-strong px-2.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-fg transition-[background-color,border-color,color,transform] duration-150 hover:border-accent hover:bg-accent hover:text-ink active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {l.label} <ArrowUpRight className="size-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 border-t border-line pt-6">
        <p data-build="type" className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          Ещё на GitHub
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {MORE_WORK.map((m) => (
            <li key={m.title} data-build="pop">
              <a
                href={m.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-2 text-[13px] text-fg transition-colors duration-150 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="font-semibold">{m.title}</span>
                <span className="text-muted">{m.note}</span>
                <ArrowUpRight className="size-3 text-accent" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-24 flex items-baseline justify-between gap-4">
        <p data-build="type" className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          Мой стек
        </p>
        <p data-build="type" className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          {TOOLS.length} инструментов · от кода до железа
        </p>
      </div>
      {/* Loops left → right; the list is rendered twice so the seam never shows */}
      <div data-build="wipe" className="marquee mt-4 overflow-hidden border-y border-line py-6">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {TOOLS.map((t) => (
                <li key={t} className="flex items-center whitespace-nowrap px-6 text-[clamp(18px,1.8vw,26px)] font-semibold tracking-[-0.02em] text-zinc-500 transition-colors duration-200 hover:text-fg">
                  {t}
                  <span aria-hidden className="ml-12 size-1.5 rotate-45 bg-accent" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RecordSection() {
  return (
    <section className="mx-auto grid max-w-[1360px] gap-12 px-4 py-24 md:px-8 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-5">
        <Tag>Путь</Tag>
        <Headline a="Делаю быстро." b="Запускаю по-настоящему." />
        <p data-build="pop" className="mt-8 font-display text-[clamp(110px,12vw,170px)] leading-[0.8] text-accent">
          {RECORD.value}<span className="text-fg">.</span>
        </p>
        <p data-build="type" className="mt-4 max-w-[300px] text-[14.5px] leading-[1.55] text-muted">
          {RECORD.text}
        </p>
      </div>
      <ul className="self-end border-t border-line lg:col-span-6 lg:col-start-7">
        {TIMELINE.map((t) => (
          <li key={t.title} data-build="pop" className="flex items-center justify-between gap-6 border-b border-line py-5">
            <div>
              <p className="text-[18px] font-semibold tracking-[-0.02em] text-fg">{t.title}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{t.sub}</p>
            </div>
            <span className="font-display text-[30px] uppercase leading-none text-accent">{t.tag}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-[1360px] scroll-mt-10 px-4 py-24 md:px-8 md:py-32">
      <Tag>Обо мне</Tag>
      <Headline a="Не просто код." b="Код, который работает." />
      <div className="mt-8 grid max-w-[1000px] gap-5 md:grid-cols-2 md:gap-8">
        {ABOUT_TEXT.map((t) => (
          <p key={t.slice(0, 20)} data-build="type" className="text-[15.5px] leading-[1.65] text-zinc-300">
            {t}
          </p>
        ))}
      </div>
      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
        <div data-build="pop">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Учёба и навыки</p>
          <p className="mt-4 text-[16px] font-semibold tracking-[-0.02em] text-fg">{EDUCATION.title}</p>
          <p className="text-[13px] text-muted">{EDUCATION.sub}</p>
          <dl className="mt-5 divide-y divide-line border-y border-line">
            {SKILLS.map((s) => (
              <div key={s.k} className="flex justify-between gap-4 py-2.5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{s.k}</dt>
                <dd className="text-right text-[13px] text-zinc-300">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div data-build="pop">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Как я работаю</p>
          <ol className="mt-4 space-y-5">
            {PRINCIPLES.map((p, i) => (
              <li key={p.t} className="flex gap-4">
                <span className="font-display text-[22px] leading-none text-accent">0{i + 1}</span>
                <div>
                  <p className="text-[15.5px] font-semibold tracking-[-0.02em] text-fg">{p.t}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <figure data-build="pop" className="flex flex-col justify-between rounded-[8px] bg-accent p-6 text-ink">
          <blockquote className="font-display text-[clamp(30px,2.8vw,40px)] uppercase leading-[0.95]">
            {QUOTE}
          </blockquote>
          <figcaption className="mt-8 font-brush text-[28px] leading-none">— {PROFILE.first}</figcaption>
        </figure>
      </div>

      <div className="mt-20 flex items-baseline justify-between gap-4">
        <p data-build="type" className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          Вне кода
        </p>
        <a href={PROFILE.links.instagram} target="_blank" rel="noreferrer" className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint transition-colors hover:text-fg">
          @_akbaraliev_ernis
        </a>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {TRAVEL.map((t) => (
          <li key={t.src} data-build="pop" className="relative aspect-[3/4] overflow-hidden rounded-[8px] border border-line">
            <Image src={t.src} alt={`Эрнис, ${t.place}`} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover grayscale transition-[filter] duration-300 hover:grayscale-0" />
            <span className="absolute bottom-2 left-2 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-fg">
              {t.place} {t.flag}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

const CHANNELS = [
  { label: "Почта", value: PROFILE.email, href: `mailto:${PROFILE.email}`, Icon: Mail },
  { label: "WhatsApp", value: PROFILE.phone, href: PROFILE.links.whatsapp, Icon: MessageCircle },
  { label: "Instagram", value: "@_akbaraliev_ernis", href: PROFILE.links.instagram, Icon: Instagram },
  { label: "GitHub", value: "akbaralievernis", href: PROFILE.links.github, Icon: Github },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative scroll-mt-10 border-t border-line">
      <div className="mx-auto grid min-h-[86svh] max-w-[1360px] items-center gap-12 px-4 py-24 md:px-8 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <Tag>Контакты</Tag>
          <Headline a="Давайте" b="работать." />
          <p data-build="type" className="mt-5 max-w-[320px] text-[14.5px] leading-[1.55] text-muted">
            Сделаю сайт, лендинг или админ-панель под ваш бизнес. Открыт к стажировкам и совместным проектам.
          </p>
          <div data-build="pop" className="mt-7 inline-flex">
            <a href={`mailto:${PROFILE.email}`} className={btn.primary}>
              Написать <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>

        <ul className="space-y-1 lg:col-span-4">
          {CHANNELS.map(({ label, value, href, Icon }) => (
            <li key={label} data-build="pop">
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-[8px] px-2 py-3 transition-colors duration-150 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.99]"
              >
                <span className="grid size-10 place-items-center rounded-full border border-line-strong text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                  <Icon className="size-4" />
                </span>
                <span>
                  <span className="block font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">{label}</span>
                  <span className="block text-[15px] tracking-tight text-fg">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div data-build="pop" className="relative flex aspect-[4/5] max-h-[440px] flex-col justify-between overflow-hidden rounded-[8px] border border-line bg-surface p-6 lg:col-span-4">
          <p className="font-display text-[clamp(44px,4.6vw,64px)] uppercase leading-[0.9] text-fg">
            Запустим
            <br />
            <span className="text-accent">по-настоящему.</span>
          </p>
          <div aria-hidden data-swarm-anchor className="absolute right-6 top-1/2 size-36 -translate-y-1/3 rounded-full border border-dashed border-line-strong" />
          <a
            href={`mailto:${PROFILE.email}`}
            aria-label="Написать на почту"
            className="grid size-12 place-items-center self-end rounded-full bg-accent text-ink transition-[background-color,transform] duration-150 hover:bg-accent-hover active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <ArrowUpRight className="size-5" />
          </a>
        </div>
      </div>

      <footer className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-6 pb-20 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint md:px-8 md:pb-6">
        <span>© 2026 {PROFILE.first} {PROFILE.last}</span>
        <span>Собрано роем агентов · {PROFILE.location}</span>
      </footer>
    </section>
  );
}
