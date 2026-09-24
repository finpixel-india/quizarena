"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { ThemePref } from "./types";

/* ------------------------------- Fullscreen ------------------------------- */

type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => Promise<void> | void;
};
type FsElement = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };

function subscribeFullscreen(cb: () => void) {
  document.addEventListener("fullscreenchange", cb);
  document.addEventListener("webkitfullscreenchange", cb);
  return () => {
    document.removeEventListener("fullscreenchange", cb);
    document.removeEventListener("webkitfullscreenchange", cb);
  };
}
const noopSubscribe = () => () => {};

export function useFullscreen() {
  const isFullscreen = useSyncExternalStore(
    subscribeFullscreen,
    () => Boolean(document.fullscreenElement || (document as FsDocument).webkitFullscreenElement),
    () => false,
  );
  // Assume support during SSR (most devices); unsupported browsers (e.g. iPhone Safari) hide it after hydration.
  const supported = useSyncExternalStore(
    noopSubscribe,
    () => Boolean(document.fullscreenEnabled || (document as FsDocument).webkitFullscreenEnabled),
    () => true,
  );

  const enter = useCallback(async () => {
    const el = document.documentElement as FsElement;
    try {
      if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: "hide" });
      else await el.webkitRequestFullscreen?.();
    } catch {
      /* user agent refused — ignore */
    }
  }, []);

  const exit = useCallback(async () => {
    const doc = document as FsDocument;
    try {
      if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
      else if (doc.webkitFullscreenElement) await doc.webkitExitFullscreen?.();
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    const doc = document as FsDocument;
    if (document.fullscreenElement || doc.webkitFullscreenElement) void exit();
    else void enter();
  }, [enter, exit]);

  return { isFullscreen, supported, enter, exit, toggle };
}

/* ---------------------------------- Theme --------------------------------- */

const THEME_KEY = "ql-theme";
const THEME_EVENT = "ql-theme-change";

export function readThemePref(): ThemePref {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "light" || v === "system" ? v : "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(pref: ThemePref) {
  try {
    localStorage.setItem(THEME_KEY, pref);
  } catch {
    /* ignore */
  }
  const dark = pref === "dark" || (pref === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.classList.toggle("light", !dark);
  root.style.colorScheme = dark ? "dark" : "light";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0C0A09" : "#F7F5F1");
  window.dispatchEvent(new Event(THEME_EVENT));
}

function subscribeTheme(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    if (readThemePref() === "system") applyTheme("system");
    cb();
  };
  window.addEventListener(THEME_EVENT, cb);
  mq.addEventListener("change", onSystem);
  return () => {
    window.removeEventListener(THEME_EVENT, cb);
    mq.removeEventListener("change", onSystem);
  };
}

export function useTheme() {
  const pref = useSyncExternalStore(subscribeTheme, readThemePref, () => "dark" as ThemePref);
  const isDark = useSyncExternalStore(
    subscribeTheme,
    () => !document.documentElement.classList.contains("light"),
    () => true,
  );
  return { pref, isDark, setPref: applyTheme };
}
