import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "QuizLab — Practice Science, SST, Math & IT",
    template: "%s · QuizLab",
  },
  description:
    "Fast, focused quiz practice for Class 9 & 10 Science and SST (NCERT-aligned), Basic Math and IT — with timers, hints, full history, reviews and high scores.",
  applicationName: "QuizLab",
  appleWebApp: { capable: true, title: "QuizLab", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0C0A09",
};

// Dark mode first: only switch to light when the user explicitly chose it (or chose "system" on a light OS).
const themeScript = `(function(){try{var t=localStorage.getItem('ql-theme');if(t!=='light'&&t!=='system')t='dark';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.remove(d?'light':'dark');r.classList.add(d?'dark':'light');r.style.colorScheme=d?'dark':'light';if(!d){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#F7F5F1');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh font-sans text-fg antialiased">
        {/* Shared gradient used by progress rings */}
        <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="ql-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle aurora + grid backdrop */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000_20%,transparent_75%)]" />
          <div className="absolute -left-48 -top-64 h-[40rem] w-[40rem] rounded-full [background:radial-gradient(closest-side,var(--aurora-1),transparent)]" />
          <div className="absolute -right-48 -top-48 h-[42rem] w-[42rem] rounded-full [background:radial-gradient(closest-side,var(--aurora-2),transparent)]" />
        </div>

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
