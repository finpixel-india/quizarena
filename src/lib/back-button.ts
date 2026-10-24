import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { haptic } from "./haptics";

export type BackHandler = () => boolean | void;

interface HandlerEntry {
  id: string;
  handler: BackHandler;
  priority: number;
}

const handlers: HandlerEntry[] = [];
let lastBackTimestamp = 0;
let isInitialized = false;

// Toast event subscription
type ToastListener = (message: string) => void;
const toastListeners = new Set<ToastListener>();

export function subscribeExitToast(fn: ToastListener): () => void {
  toastListeners.add(fn);
  return () => {
    toastListeners.delete(fn);
  };
}

export function showExitToast(message: string): void {
  toastListeners.forEach((fn) => {
    try {
      fn(message);
    } catch (e) {
      console.warn("Error in toast listener:", e);
    }
  });
}

/**
 * Register a high-priority handler for the Android back button / gesture.
 * If handler returns true (or truthy), it consumed the back event.
 * If handler returns false, evaluation continues down the stack.
 */
export function registerBackHandler(id: string, handler: BackHandler, priority = 0): () => void {
  const existingIdx = handlers.findIndex((h) => h.id === id);
  if (existingIdx >= 0) {
    handlers[existingIdx] = { id, handler, priority };
  } else {
    handlers.push({ id, handler, priority });
  }

  // Sort descending: highest priority runs first
  handlers.sort((a, b) => b.priority - a.priority);

  return () => {
    const idx = handlers.findIndex((h) => h.id === id);
    if (idx >= 0) {
      handlers.splice(idx, 1);
    }
  };
}

interface RouterLike {
  back: () => void;
  push: (href: string) => void;
}

/**
 * Main back button dispatcher.
 * Handles modals -> active quizzes -> subpages -> double-tap to exit on home.
 */
export function handleBackNavigation(router: RouterLike, pathname: string): void {
  // 1. Run custom back handlers (modals, open dialogs, active quiz runner)
  for (const item of [...handlers]) {
    try {
      const consumed = item.handler();
      if (consumed !== false) {
        // Consumed! Stop here.
        return;
      }
    } catch (err) {
      console.error(`Error in back handler ${item.id}:`, err);
    }
  }

  // 2. If at root home page ('/'), perform double-back-to-exit pattern
  if (pathname === "/" || pathname === "") {
    const now = Date.now();
    if (now - lastBackTimestamp < 2000) {
      // Second tap within 2 seconds: exit the app!
      if (Capacitor.isNativePlatform()) {
        void App.exitApp();
      }
      return;
    }

    lastBackTimestamp = now;
    haptic("light");
    showExitToast("Press back again to exit");
    return;
  }

  // 3. If on a sub-page (/articulate, /notes, /facts, /settings, /results, /history, /stats),
  // navigate back smoothly to previous screen or home.
  haptic("light");
  if (typeof window !== "undefined" && window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
}

/**
 * Initializes the native Capacitor back button listener.
 * Called once in AppShell.
 */
export function initBackButton(router: RouterLike, getPathname: () => string): () => void {
  if (typeof window === "undefined" || !Capacitor.isNativePlatform() || isInitialized) {
    return () => {};
  }

  isInitialized = true;

  const listener = App.addListener("backButton", () => {
    handleBackNavigation(router, getPathname());
  });

  return () => {
    void listener.then((handle) => handle.remove());
    isInitialized = false;
  };
}
