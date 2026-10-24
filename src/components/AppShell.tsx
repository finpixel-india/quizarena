"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, BookOpenText, FlaskConical, Lightbulb, Maximize, Mic, Minimize, Moon, Settings2, Sun, Zap } from "lucide-react";
import { btn } from "@/components/ui";
import { useFullscreen, useTheme } from "@/lib/client-hooks";
import { cn } from "@/lib/format";
import { haptic } from "@/lib/haptics";
import { initBackButton, subscribeExitToast } from "@/lib/back-button";
import { initNotifications, scheduleDailyReminders } from "@/lib/notifications";
import { loadSettings } from "@/lib/storage";

const NAV = [
  { href: "/", label: "Quiz", icon: Zap },
  { href: "/notes", label: "Notes", icon: BookOpenText },
  { href: "/facts", label: "Facts", icon: Lightbulb },
  { href: "/articulate", label: "Articulate", icon: Mic },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex h-8 w-8 items-center justify-center rounded-lg grad-hero text-black shadow-[0_0_22px_-4px_rgba(249,115,22,0.8)]", className)}>
      <FlaskConical className="h-4 w-4" strokeWidth={2.25} />
    </span>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const fs = useFullscreen();
  const { isDark, setPref } = useTheme();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  // Back button handling on native Android
  useEffect(() => {
    const cleanup = initBackButton(router, () => pathnameRef.current);
    const unsubsToast = subscribeExitToast((msg) => {
      setToastMessage(msg);
      window.setTimeout(() => setToastMessage(null), 2000);
    });
    return () => {
      cleanup();
      unsubsToast();
    };
  }, [router]);

  // Local notifications initialization and schedule sync
  useEffect(() => {
    initNotifications();
    try {
      const s = loadSettings();
      if (s.notificationsEnabled) {
        void scheduleDailyReminders(s.notificationHour ?? 19, s.notificationMinute ?? 30);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="glass sticky top-0 z-40 w-full border-b border-line pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Quiz Lab home">
            <LogoMark />
            <span className="text-[17px] font-bold tracking-tight text-fg">Quiz Lab</span>
          </Link>

          <nav className="ml-10 hidden items-center gap-1 md:flex" aria-label="Main">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn("relative rounded-lg px-3.5 py-2 text-sm font-medium transition", active ? "text-fg" : "text-muted hover:text-fg")}
                >
                  {item.label}
                  {active ? <span className="absolute inset-x-3 -bottom-[15px] h-px grad-cta shadow-[0_0_10px_1px_rgba(249,115,22,0.75)]" /> : null}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
            <Link
              href="/#builder"
              className="mr-1 hidden items-center gap-1.5 rounded-full grad-cta px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_-10px_rgba(249,115,22,0.9)] transition hover:brightness-110 md:inline-flex"
            >
              Start quiz <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setPref(isDark ? "light" : "dark")}
              className={btn.icon}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? <Sun className="h-5 w-5 sm:h-[18px] sm:w-[18px]" /> : <Moon className="h-5 w-5 sm:h-[18px] sm:w-[18px]" />}
            </button>
            {fs.supported ? (
              <button
                type="button"
                onClick={fs.toggle}
                className={btn.icon}
                aria-label={fs.isFullscreen ? "Exit full screen" : "Enter full screen"}
                title={fs.isFullscreen ? "Exit full screen" : "Full screen"}
              >
                {fs.isFullscreen ? <Minimize className="h-5 w-5 sm:h-[18px] sm:w-[18px]" /> : <Maximize className="h-5 w-5 sm:h-[18px] sm:w-[18px]" />}
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <main className={cn("flex-1 min-w-0", pathname === "/articulate" ? "flex flex-col pb-28 md:pb-0" : "pb-24 md:pb-0")}>
        {children}
      </main>

      {pathname !== "/articulate" ? (
        <footer className="hidden border-t border-line md:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-8 py-6 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
            <span>Quiz Lab · NCERT-aligned practice</span>
            <span>Curated bank · Open Trivia DB · The Trivia API</span>
          </div>
        </footer>
      ) : null}

      <nav className="glass fixed inset-x-0 bottom-0 z-30 border-t border-line pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 md:hidden" aria-label="Main">
        <div className="mx-auto grid max-w-md grid-cols-5 px-2">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => haptic("light")}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl py-2 px-1 text-[11px] font-medium transition active:scale-95",
                  active ? "text-brand-ink bg-brand/[0.08]" : "text-subtle hover:text-fg",
                )}
              >
                <Icon className={cn("h-5 w-5", active ? "text-brand-ink" : "text-subtle")} strokeWidth={active ? 2.2 : 1.8} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {toastMessage ? (
        <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-pop">
          <div className="flex items-center gap-2 rounded-full border border-line bg-card/95 backdrop-blur-md px-4 py-2 text-xs font-semibold text-fg shadow-xl card-shadow">
            <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
