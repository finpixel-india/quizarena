"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  ATTEMPTS_KEY,
  SETTINGS_KEY,
  STORAGE_EVENT,
  clearAttempts,
  deleteAttempt,
  loadAttempts,
  loadSettings,
  saveSettings,
  type StoredAttempt,
} from "./storage";
import { computeStats, toSummary, type AttemptSummary } from "./stats";
import type { UserSettings } from "./types";
import { DEFAULT_SETTINGS } from "./settings";

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const onStorage = (e: StorageEvent) => {
    if (!e.key || e.key === ATTEMPTS_KEY || e.key === SETTINGS_KEY) cb();
  };
  window.addEventListener(STORAGE_EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(STORAGE_EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getAttemptsSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  try {
    return localStorage.getItem(ATTEMPTS_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getSettingsSnapshot(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(SETTINGS_KEY) ?? "";
  } catch {
    return "";
  }
}

export function useAttempts(): {
  ready: boolean;
  attempts: StoredAttempt[];
  summaries: AttemptSummary[];
  remove: (id: string) => void;
  clear: () => void;
} {
  const snap = useSyncExternalStore(subscribe, getAttemptsSnapshot, () => "[]");
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const attempts = useMemo(() => {
    try {
      return loadAttempts();
    } catch {
      return [] as StoredAttempt[];
    }
  }, [snap]);
  const summaries = useMemo(() => attempts.map(toSummary), [attempts]);
  const remove = useCallback((id: string) => {
    deleteAttempt(id);
  }, []);
  const clear = useCallback(() => {
    clearAttempts();
  }, []);
  return { ready, attempts, summaries, remove, clear };
}

export function useLocalSettings(): {
  ready: boolean;
  settings: UserSettings;
  update: (patch: Partial<UserSettings>) => UserSettings;
} {
  const snap = useSyncExternalStore(subscribe, getSettingsSnapshot, () => "");
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const settings = useMemo(() => {
    try {
      return loadSettings();
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }, [snap]);
  const update = useCallback((patch: Partial<UserSettings>) => {
    const next = saveSettings({ ...loadSettings(), ...patch });
    return next;
  }, []);
  return { ready, settings, update };
}

export function useLocalStats() {
  const { ready, summaries } = useAttempts();
  const stats = useMemo(() => computeStats(summaries), [summaries]);
  return { ready, stats, summaries };
}
