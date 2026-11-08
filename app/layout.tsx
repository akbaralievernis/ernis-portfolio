import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Caveat, JetBrains_Mono, Manrope, Oswald } from "next/font/google";
import "./globals.css";

// Все шрифты с кириллицей: у оригинальных Anton, Geist и Caveat Brush её нет
const anton = Oswald({ weight: ["600", "700"], subsets: ["latin", "cyrillic"], variable: "--nf-anton", display: "swap" });
const geist = Manrope({ subsets: ["latin", "cyrillic"], variable: "--nf-geist", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--nf-mono", display: "swap" });
const brush = Caveat({ weight: "700", subsets: ["latin", "cyrillic"], variable: "--nf-brush", display: "swap" });

export const metadata: Metadata = {
  title: "Эрнис Акбаралиев — веб-разработчик",
  description:
    "Портфолио Эрниса Акбаралиева, веб-разработчика из Оша: Bilim Arena, Nexus AI, NomadTrails, OshAuto и другие проекты на Next.js и Supabase.",
  openGraph: {
    title: "Эрнис Акбаралиев — веб-разработчик",
    description: "Учебные игры, сервисы для Кыргызстана и ИИ-чатбот. Страницу собирает рой агентов прямо на глазах.",
    images: ["/me-suit.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

/**
 * Runs before first paint so the page starts empty for the agents to build.
 * Order: ?agents=on|off, then the viewer's last dock toggle, then the OS reduced-motion setting.
 */
const BUILD_MODE_SCRIPT = `(function(){try{var d=document.documentElement,q=new URLSearchParams(location.search).get('agents'),s=null;try{s=localStorage.getItem('agents')}catch(e){}var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(q?q!=='off':s?s==='on':!r)d.classList.add('build-mode')}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${anton.variable} ${geist.variable} ${mono.variable} ${brush.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BUILD_MODE_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
