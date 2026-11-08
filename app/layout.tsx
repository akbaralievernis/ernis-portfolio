import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

// Шрифты лежат в проекте (variable woff2 с кириллицей), чтобы сборка не зависела от Google Fonts
const anton = localFont({ src: "./fonts/oswald.woff2", weight: "200 700", variable: "--nf-anton", display: "swap" });
const geist = localFont({ src: "./fonts/manrope.woff2", weight: "200 800", variable: "--nf-geist", display: "swap" });
const mono = localFont({ src: "./fonts/mono.woff2", weight: "100 800", variable: "--nf-mono", display: "swap" });
const brush = localFont({ src: "./fonts/caveat.woff2", weight: "400 700", variable: "--nf-brush", display: "swap" });

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
