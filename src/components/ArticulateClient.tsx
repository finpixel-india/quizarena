"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, Flame, Play, RotateCcw, Settings2, Square, X } from "lucide-react";
import { ARTICULATE_PROMPTS, type ArticulateCategory, type ArticulateMode, type ArticulatePrompt } from "@/data/articulate/prompts";
import {
  ELOCUTION_ITEMS,
  ELOCUTION_TYPES,
  type ElocutionDifficulty,
  type ElocutionItem,
  type ElocutionType,
} from "@/data/articulate/elocution";
import { cn } from "@/lib/format";
import { haptic } from "@/lib/haptics";

/* ─── Mode Definitions ───────────────────────────────────────────────────── */
const ARTICULATE_MODES: { id: ArticulateMode; label: string; dot: string }[] = [
  { id: "off-the-cuff", label: "Off the cuff", dot: "bg-pink-200" },
  { id: "deep-research", label: "Deep research", dot: "bg-sky-200" },
  { id: "elocution", label: "Elocution", dot: "bg-amber-300" },
];

function formatStopwatch(ms: number) {
  const totalSecs = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSecs / 60);
  const seconds = totalSecs % 60;
  const hundredths = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(hundredths).padStart(2, "0")}`;
}

/* ─── Category Definitions ───────────────────────────────────────────────── */
const DISPLAY_CATEGORIES: { id: ArticulateCategory; label: string; emoji: string }[] = [
  { id: "all",         label: "General",      emoji: "✦" },
  { id: "philosophy",  label: "Philosophy",   emoji: "🏛️" },
  { id: "technology",  label: "Tech / AI",    emoji: "⚡" },
  { id: "society",     label: "Society",      emoji: "🌐" },
  { id: "personal",    label: "Personal",     emoji: "💰" },
  { id: "curveballs",  label: "Curveballs",   emoji: "🎲" },
];

const DIFFICULTIES: { id: ElocutionDifficulty; label: string; dot: string }[] = [
  { id: "easy",   label: "Easy",   dot: "bg-emerald-400" },
  { id: "medium", label: "Medium", dot: "bg-amber-400" },
  { id: "hard",   label: "Hard",   dot: "bg-rose-400" },
];

/* ─── Font Sizing Controls ───────────────────────────────────────────────── */
const ARTICULATE_FONT_KEY = "ql-articulate-font-scale";
const FONT_SCALES = [0.8, 0.9, 1.0, 1.15, 1.35, 1.55];
const FONT_SCALE_LABELS = ["80%", "90%", "100%", "115%", "135%", "155%"];

/* ─── Settings ───────────────────────────────────────────────────────────── */
interface Settings { speechMinutes: number; researchMinutes: number; muteSounds: boolean; }
const DEFAULT_SETTINGS: Settings = { speechMinutes: 1, researchMinutes: 5, muteSounds: false };
const SETTINGS_KEY = "ql-articulate-v3";

/* ─── Persistent Session Flow (Preferences & Streak) ─────────────────────── */
interface ArticulateFlowState {
  mode?: ArticulateMode;
  category?: ArticulateCategory;
  promptId?: string;
  elocutionType?: ElocutionType;
  elocutionDifficulty?: ElocutionDifficulty;
  elocutionItemId?: string;
  elocutionStreak?: number; // legacy backward compatibility
  elocutionStreaks?: Record<ElocutionType, number>;
}
const FLOW_STORAGE_KEY = "ql-articulate-flow-v1";

const DEFAULT_ELOCUTION_STREAKS: Record<ElocutionType, number> = {
  "tongue-twister": 0,
  "hard-sentence": 0,
  "vocab-dense": 0,
};

function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const s = localStorage.getItem(SETTINGS_KEY);
    return s ? { ...DEFAULT_SETTINGS, ...JSON.parse(s) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}
function persistSettings(s: Settings) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch {}
}

/* ─── Instagram Icon ─────────────────────────────────────────────────────── */
function IgIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

/* ─── Audio ──────────────────────────────────────────────────────────────── */
let audioCtx: AudioContext | null = null;
function getCtx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const C = window.AudioContext ?? (window as unknown as {webkitAudioContext: typeof AudioContext}).webkitAudioContext;
    if (C) audioCtx = new C();
  }
  if (audioCtx?.state === "suspended") audioCtx.resume().catch(() => {});
  return audioCtx;
}
function playTick(pitch = 700) {
  const ctx = getCtx(); if (!ctx) return;
  try {
    const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
    o.type = "triangle";
    o.frequency.setValueAtTime(pitch, t);
    o.frequency.exponentialRampToValueAtTime(90, t + 0.016);
    g.gain.setValueAtTime(0.001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.016);
    o.connect(g); g.connect(ctx.destination);
    o.start(t); o.stop(t + 0.016);
  } catch {}
}
function playLock() {
  const ctx = getCtx(); if (!ctx) return;
  try {
    const t = ctx.currentTime;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(280, t);
    o.frequency.exponentialRampToValueAtTime(55, t + 0.06);
    g.gain.setValueAtTime(0.2, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    o.connect(g); g.connect(ctx.destination);
    o.start(t); o.stop(t + 0.06);

    const b = ctx.createOscillator(), bg = ctx.createGain();
    b.type = "sine"; b.frequency.setValueAtTime(880, t + 0.02);
    bg.gain.setValueAtTime(0.001, t + 0.02);
    bg.gain.exponentialRampToValueAtTime(0.1, t + 0.04);
    bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    b.connect(bg); bg.connect(ctx.destination);
    b.start(t + 0.02); b.stop(t + 0.5);
  } catch {}
}
function playChime() {
  const ctx = getCtx(); if (!ctx) return;
  try {
    const t = ctx.currentTime;
    [[523.25, 0], [659.25, 0.1], [783.99, 0.22]].forEach(([f, d]) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), s = t + d;
      o.type = "sine"; o.frequency.setValueAtTime(f, s);
      g.gain.setValueAtTime(0.001, s);
      g.gain.exponentialRampToValueAtTime(0.14, s + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, s + 0.65);
      o.connect(g); g.connect(ctx.destination);
      o.start(s); o.stop(s + 0.65);
    });
  } catch {}
}

/* ─── Styled Slider ──────────────────────────────────────────────────────── */
function Slider({ min, max, value, onChange }: { min: number; max: number; value: number; onChange: (v: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative h-6 flex items-center">
      <div className="absolute inset-x-0 h-[5px] rounded-full bg-white/[0.1]" />
      <div className="absolute left-0 h-[5px] rounded-full bg-[#d96b43] transition-all" style={{ width: `${pct}%` }} />
      <div className="absolute w-[18px] h-[18px] rounded-full bg-[#d96b43] border-2 border-white/30 shadow-lg pointer-events-none transition-all" style={{ left: `calc(${pct}% - 9px)` }} />
      <input
        type="range" min={min} max={max} step={1} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
      />
    </div>
  );
}

/* ─── Settings Overlay ───────────────────────────────────────────────────── */
function SettingsOverlay({ settings, onChange, onClose }: { settings: Settings; onChange: (s: Settings) => void; onClose: () => void }) {
  const [local, setLocal] = useState(settings);
  const upd = (p: Partial<Settings>) => setLocal((v) => ({ ...v, ...p }));
  const done = () => { persistSettings(local); onChange(local); onClose(); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/75" />
      <div
        className="relative z-10 w-full max-w-[350px] rounded-3xl overflow-hidden border border-white/[0.12] shadow-2xl bg-[#161210] [transform:translateZ(0)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between mb-1.5">
            <h2 className="font-serif text-2xl font-normal text-fg tracking-tight">Settings</h2>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-fg hover:bg-white/[0.08] transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted mb-7">Timer lengths in whole minutes.</p>

          {/* SPEECH */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#d96b43]">Speech</span>
              <span className="text-xl font-bold text-fg tabular-nums">{local.speechMinutes} min</span>
            </div>
            <Slider min={1} max={10} value={local.speechMinutes} onChange={(v) => upd({ speechMinutes: v })} />
            <div className="flex justify-between mt-2">
              <span className="text-xs font-mono text-subtle">1 min</span>
              <span className="text-xs font-mono text-subtle">10 min</span>
            </div>
          </div>

          {/* RESEARCH */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#d96b43]">Research</span>
              <span className="text-xl font-bold text-fg tabular-nums">{local.researchMinutes} min</span>
            </div>
            <Slider min={1} max={60} value={local.researchMinutes} onChange={(v) => upd({ researchMinutes: v })} />
            <div className="flex justify-between mt-2">
              <span className="text-xs font-mono text-subtle">1 min</span>
              <span className="text-xs font-mono text-subtle">60 min</span>
            </div>
            <p className="text-xs text-subtle mt-1.5">Deep research mode only</p>
          </div>

          <div className="h-px bg-white/[0.08] mb-5" />

          <label className="flex items-center gap-3 cursor-pointer select-none mb-6">
            <button
              type="button"
              onClick={() => upd({ muteSounds: !local.muteSounds })}
              className={cn(
                "w-5 h-5 rounded-[6px] border flex items-center justify-center shrink-0 transition-all cursor-pointer",
                local.muteSounds ? "bg-[#d96b43] border-[#d96b43]" : "border-white/25 bg-white/[0.04]"
              )}
            >
              {local.muteSounds && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </button>
            <span className="text-[15px] text-fg/85">Mute sound effects</span>
          </label>

          <button
            type="button"
            onClick={done}
            className="w-full rounded-full bg-[#d96b43] text-white py-3.5 text-base font-semibold hover:brightness-110 active:scale-[0.98] transition cursor-pointer shadow-[0_4px_16px_rgba(217,107,67,0.35)]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
type TimerPhase = "research" | "ready-to-speak" | "speaking" | "done";

export default function ArticulateClient() {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [mode, setMode] = useState<ArticulateMode>("off-the-cuff");
  const [modeKey, setModeKey] = useState(0);
  const [category, setCategory] = useState<ArticulateCategory>("all");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [elocutionCatOpen, setElocutionCatOpen] = useState(false);
  const [elocutionDiffOpen, setElocutionDiffOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [elocutionStreaks, setElocutionStreaks] = useState<Record<ElocutionType, number>>(DEFAULT_ELOCUTION_STREAKS);

  /* Ref for outside click on dropdowns */
  const catRef = useRef<HTMLDivElement>(null);
  const elocutionCatRef = useRef<HTMLDivElement>(null);
  const elocutionDiffRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCategoryOpen(false);
      }
      if (elocutionCatRef.current && !elocutionCatRef.current.contains(e.target as Node)) {
        setElocutionCatOpen(false);
      }
      if (elocutionDiffRef.current && !elocutionDiffRef.current.contains(e.target as Node)) {
        setElocutionDiffOpen(false);
      }
    }
    if (categoryOpen || elocutionCatOpen || elocutionDiffOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [categoryOpen, elocutionCatOpen, elocutionDiffOpen]);

  /* Prompt pool */
  const pool = useMemo(() => {
    const all = ARTICULATE_PROMPTS.filter((p) => p.mode === mode);
    return category === "all" ? all : all.filter((p) => p.category === category);
  }, [mode, category]);

  const [currentPrompt, setCurrentPrompt] = useState<ArticulatePrompt>(() => {
    const p = ARTICULATE_PROMPTS.filter((x) => x.mode === "off-the-cuff");
    return p[0];
  });

  /* ── Slot machine spinning state ── */
  const [displayText, setDisplayText] = useState(currentPrompt.title);
  const [tickKey, setTickKey] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* ─── Elocution State ──────────────────────────────────────────────────── */
  const [elocutionType, setElocutionType] = useState<ElocutionType>("tongue-twister");
  const [elocutionDifficulty, setElocutionDifficulty] = useState<ElocutionDifficulty>("medium");
  const [currentElocutionItem, setCurrentElocutionItem] = useState<ElocutionItem>(() => {
    const list = ELOCUTION_ITEMS.filter((x) => x.type === "tongue-twister" && x.difficulty === "medium");
    return list[0] ?? ELOCUTION_ITEMS[0];
  });
  const [elocutionKey, setElocutionKey] = useState(0);

  /* Active streak for currently selected elocution type */
  const currentStreak = elocutionStreaks[elocutionType] ?? 0;

  /* ── Restore persistent session flow on client mount (preferences & progress) ── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(FLOW_STORAGE_KEY);
      if (raw) {
        const saved: ArticulateFlowState = JSON.parse(raw);
        if (saved.mode && ARTICULATE_MODES.some((m) => m.id === saved.mode)) {
          setMode(saved.mode);
        }
        if (saved.category && DISPLAY_CATEGORIES.some((c) => c.id === saved.category)) {
          setCategory(saved.category);
        }
        if (saved.promptId) {
          const found = ARTICULATE_PROMPTS.find((p) => p.id === saved.promptId);
          if (found) {
            setCurrentPrompt(found);
            setDisplayText(found.title);
          }
        }
        if (saved.elocutionType && ELOCUTION_TYPES.some((t) => t.id === saved.elocutionType)) {
          setElocutionType(saved.elocutionType);
        }
        if (saved.elocutionDifficulty && DIFFICULTIES.some((d) => d.id === saved.elocutionDifficulty)) {
          setElocutionDifficulty(saved.elocutionDifficulty);
        }
        if (saved.elocutionItemId) {
          const foundItem = ELOCUTION_ITEMS.find((it) => it.id === saved.elocutionItemId);
          if (foundItem) {
            setCurrentElocutionItem(foundItem);
          }
        }
        if (saved.elocutionStreaks) {
          setElocutionStreaks({
            "tongue-twister": Math.max(0, Number(saved.elocutionStreaks["tongue-twister"]) || 0),
            "hard-sentence": Math.max(0, Number(saved.elocutionStreaks["hard-sentence"]) || 0),
            "vocab-dense": Math.max(0, Number(saved.elocutionStreaks["vocab-dense"]) || 0),
          });
        } else if (typeof saved.elocutionStreak === "number" && saved.elocutionStreak >= 0) {
          const typeKey: ElocutionType = saved.elocutionType && ELOCUTION_TYPES.some((t) => t.id === saved.elocutionType)
            ? saved.elocutionType
            : "tongue-twister";
          setElocutionStreaks({
            ...DEFAULT_ELOCUTION_STREAKS,
            [typeKey]: saved.elocutionStreak,
          });
        }
      } else {
        // First visit: pick random initial items so it's fresh
        const p = ARTICULATE_PROMPTS.filter((x) => x.mode === "off-the-cuff");
        if (p.length > 0) {
          const rand = p[Math.floor(Math.random() * p.length)];
          setCurrentPrompt(rand);
          setDisplayText(rand.title);
        }
        const elList = ELOCUTION_ITEMS.filter((x) => x.type === "tongue-twister" && x.difficulty === "medium");
        if (elList.length > 0) {
          setCurrentElocutionItem(elList[Math.floor(Math.random() * elList.length)]);
        }
      }
    } catch {}
    setIsHydrated(true);
  }, []);

  /* ── Persist session preferences and progress on any change ── */
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const state: ArticulateFlowState = {
        mode,
        category,
        promptId: currentPrompt.id,
        elocutionType,
        elocutionDifficulty,
        elocutionItemId: currentElocutionItem.id,
        elocutionStreaks,
      };
      localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [
    isHydrated,
    mode,
    category,
    currentPrompt.id,
    elocutionType,
    elocutionDifficulty,
    currentElocutionItem.id,
    elocutionStreaks,
  ]);

  /* Stopwatch State */
  const [stopwatchState, setStopwatchState] = useState<"idle" | "running" | "stopped">("idle");
  const [stopwatchElapsed, setStopwatchElapsed] = useState(0);
  const stopwatchTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ─── Font Scale State for Prompts & Sentences ─────────────────────────── */
  const [fontScaleIndex, setFontScaleIndex] = useState<number>(2); // default index 2 (100%)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(ARTICULATE_FONT_KEY);
      if (saved !== null) {
        const idx = parseInt(saved, 10);
        if (!isNaN(idx) && idx >= 0 && idx < FONT_SCALES.length) {
          setFontScaleIndex(idx);
        }
      }
    } catch {}
  }, []);

  const handleDecreaseFont = useCallback(() => {
    haptic("light");
    setFontScaleIndex((prev) => {
      const next = Math.max(0, prev - 1);
      try { localStorage.setItem(ARTICULATE_FONT_KEY, String(next)); } catch {}
      return next;
    });
  }, []);

  const handleIncreaseFont = useCallback(() => {
    haptic("light");
    setFontScaleIndex((prev) => {
      const next = Math.min(FONT_SCALES.length - 1, prev + 1);
      try { localStorage.setItem(ARTICULATE_FONT_KEY, String(next)); } catch {}
      return next;
    });
  }, []);
  const stopwatchStartRef = useRef(0);

  const resetStopwatch = useCallback(() => {
    if (stopwatchTimerRef.current) {
      clearInterval(stopwatchTimerRef.current);
      stopwatchTimerRef.current = null;
    }
    setStopwatchElapsed(0);
    setStopwatchState("idle");
  }, []);

  const startStopwatch = useCallback(() => {
    if (stopwatchTimerRef.current) clearInterval(stopwatchTimerRef.current);
    stopwatchStartRef.current = performance.now();
    setStopwatchElapsed(0);
    setStopwatchState("running");
    if (!settings.muteSounds) playTick(750);

    stopwatchTimerRef.current = setInterval(() => {
      setStopwatchElapsed(performance.now() - stopwatchStartRef.current);
    }, 16);
  }, [settings.muteSounds]);

  const stopStopwatch = useCallback(() => {
    if (stopwatchTimerRef.current) {
      clearInterval(stopwatchTimerRef.current);
      stopwatchTimerRef.current = null;
    }
    setStopwatchElapsed(performance.now() - stopwatchStartRef.current);
    setStopwatchState("stopped");
    if (!settings.muteSounds) playChime();
  }, [settings.muteSounds]);

  useEffect(() => {
    return () => {
      if (stopwatchTimerRef.current) clearInterval(stopwatchTimerRef.current);
    };
  }, []);

  const handleSelectElocutionType = (t: ElocutionType) => {
    setElocutionType(t);
    setElocutionCatOpen(false);
    resetStopwatch();
    const pool = ELOCUTION_ITEMS.filter((x) => x.type === t && x.difficulty === elocutionDifficulty);
    const candidates = pool.length > 0 ? pool : ELOCUTION_ITEMS.filter((x) => x.type === t);
    if (candidates.length > 0) {
      setCurrentElocutionItem(candidates[Math.floor(Math.random() * candidates.length)]);
      setElocutionKey((k) => k + 1);
    }
  };

  const handleSelectElocutionDifficulty = (d: ElocutionDifficulty) => {
    setElocutionDifficulty(d);
    setElocutionDiffOpen(false);
    resetStopwatch();
    const pool = ELOCUTION_ITEMS.filter((x) => x.type === elocutionType && x.difficulty === d);
    const candidates = pool.length > 0 ? pool : ELOCUTION_ITEMS.filter((x) => x.difficulty === d);
    if (candidates.length > 0) {
      setCurrentElocutionItem(candidates[Math.floor(Math.random() * candidates.length)]);
      setElocutionKey((k) => k + 1);
    }
  };

  const nextElocutionChallenge = useCallback(() => {
    resetStopwatch();
    setElocutionStreaks((prev) => ({
      ...prev,
      [elocutionType]: (prev[elocutionType] ?? 0) + 1,
    }));
    const pool = ELOCUTION_ITEMS.filter((x) => x.type === elocutionType && x.difficulty === elocutionDifficulty);
    const candidates = pool.filter((x) => x.id !== currentElocutionItem.id);
    const list = candidates.length > 0 ? candidates : pool;
    if (list.length > 0) {
      const next = list[Math.floor(Math.random() * list.length)];
      setCurrentElocutionItem(next);
      setElocutionKey((k) => k + 1);
      if (!settings.muteSounds) playLock();
    }
  }, [elocutionType, elocutionDifficulty, currentElocutionItem.id, resetStopwatch, settings.muteSounds]);

  const elocutionWords = useMemo(() => {
    return currentElocutionItem.text.trim().split(/\s+/).length;
  }, [currentElocutionItem.text]);

  const elocutionWpm = useMemo(() => {
    const secs = stopwatchElapsed / 1000;
    if (secs < 0.4) return 0;
    return Math.round((elocutionWords / secs) * 60);
  }, [elocutionWords, stopwatchElapsed]);

  /* Keyboard shortcut: Spacebar to start / stop stopwatch in elocution mode */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (mode !== "elocution") return;
      if (e.code === "Space" && (e.target === document.body || (e.target as HTMLElement)?.tagName === "BUTTON")) {
        e.preventDefault();
        if (stopwatchState === "idle") startStopwatch();
        else if (stopwatchState === "running") stopStopwatch();
        else if (stopwatchState === "stopped") resetStopwatch();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, stopwatchState, startStopwatch, stopStopwatch, resetStopwatch]);

  /* ── Fullscreen Glassmorphism Timer Page State ── */
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayPhase, setOverlayPhase] = useState<TimerPhase>("speaking");
  const [overlayLeft, setOverlayLeft] = useState(0);
  const [overlayTotal, setOverlayTotal] = useState(0);
  const overlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  /* ── Spin Logic (contained, stable, zero layout shift) ── */
  const doSpin = useCallback(() => {
    if (isSpinning) return;
    spinTimers.current.forEach(clearTimeout);
    spinTimers.current = [];

    const src = pool.length > 0 ? pool : ARTICULATE_PROMPTS.filter((p) => p.mode === mode);
    const candidates = src.filter((p) => p.id !== currentPrompt.id);
    const finalItem = (candidates.length > 0 ? candidates : src)[
      Math.floor(Math.random() * (candidates.length > 0 ? candidates.length : src.length))
    ];

    setIsSpinning(true);

    const phases: [number, number][] = [
      [55, 6],
      [75, 5],
      [105, 4],
      [145, 4],
      [195, 3],
      [260, 2],
      [340, 2],
    ];

    let acc = 0;
    phases.forEach(([interval, count]) => {
      for (let i = 0; i < count; i++) {
        acc += interval;
        const t = setTimeout(() => {
          const rand = src[Math.floor(Math.random() * src.length)];
          setDisplayText(rand.title);
          setTickKey((k) => k + 1);
          if (!settings.muteSounds) playTick(600 + (acc / 2000) * 500);
        }, acc);
        spinTimers.current.push(t);
      }
    });

    const endT = setTimeout(() => {
      setCurrentPrompt(finalItem);
      setDisplayText(finalItem.title);
      setTickKey((k) => k + 1);
      setIsSpinning(false);
      setHasSpun(true);
      if (!settings.muteSounds) playLock();
    }, acc + 120);
    spinTimers.current.push(endT);
  }, [isSpinning, pool, currentPrompt, mode, settings.muteSounds]);

  /* ── Open Timer Page Handlers ── */
  const startOffTheCuff = useCallback(() => {
    const secs = settings.speechMinutes * 60;
    setOverlayPhase("speaking");
    setOverlayTotal(secs);
    setOverlayLeft(secs);
    setShowOverlay(true);
  }, [settings.speechMinutes]);

  const startDeepResearch = useCallback(() => {
    const secs = settings.researchMinutes * 60;
    setOverlayPhase("research");
    setOverlayTotal(secs);
    setOverlayLeft(secs);
    setShowOverlay(true);
  }, [settings.researchMinutes]);

  /* Called when user finishes researching (or research time elapses) */
  const finishResearch = useCallback(() => {
    if (overlayRef.current) clearInterval(overlayRef.current);
    if (!settings.muteSounds) playChime();
    const secs = settings.speechMinutes * 60;
    // Enter ready-to-speak state: displays speech duration & Speak button without auto-starting
    setOverlayPhase("ready-to-speak");
    setOverlayTotal(secs);
    setOverlayLeft(secs);
  }, [settings.speechMinutes, settings.muteSounds]);

  /* User taps "Speak" button to initiate speech timer */
  const startSpeakingCountdown = useCallback(() => {
    setOverlayPhase("speaking");
  }, []);

  const closeOverlay = useCallback(() => {
    if (overlayRef.current) clearInterval(overlayRef.current);
    setShowOverlay(false);
  }, []);

  /* ── Countdown Loop (Only ticks during research or speaking) ── */
  useEffect(() => {
    if (!showOverlay || overlayPhase === "done" || overlayPhase === "ready-to-speak") {
      if (overlayRef.current) clearInterval(overlayRef.current);
      return;
    }

    overlayRef.current = setInterval(() => {
      setOverlayLeft((prev) => {
        if (prev <= 1) {
          clearInterval(overlayRef.current!);
          if (overlayPhase === "research") {
            finishResearch();
          } else {
            setOverlayPhase("done");
            if (!settings.muteSounds) playChime();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (overlayRef.current) clearInterval(overlayRef.current);
    };
  }, [showOverlay, overlayPhase, finishResearch, settings.muteSounds]);

  /* ── Mode switch ── */
  const switchMode = (m: ArticulateMode) => {
    if (m === mode) return;
    setMode(m);
    setModeKey((k) => k + 1);
    setCategoryOpen(false);
    setElocutionCatOpen(false);
    setElocutionDiffOpen(false);
    resetStopwatch();

    if (m === "elocution") {
      if (currentElocutionItem.type !== elocutionType || currentElocutionItem.difficulty !== elocutionDifficulty) {
        const pool = ELOCUTION_ITEMS.filter((x) => x.type === elocutionType && x.difficulty === elocutionDifficulty);
        if (pool.length > 0) {
          setCurrentElocutionItem(pool[Math.floor(Math.random() * pool.length)]);
        }
      }
      return;
    }

    if (currentPrompt.mode !== m) {
      const src = category === "all"
        ? ARTICULATE_PROMPTS.filter((p) => p.mode === m)
        : ARTICULATE_PROMPTS.filter((p) => p.mode === m && p.category === category);
      const cand = src.length > 0 ? src : ARTICULATE_PROMPTS.filter((p) => p.mode === m);
      if (cand.length) {
        const rand = cand[Math.floor(Math.random() * cand.length)];
        setCurrentPrompt(rand);
        setDisplayText(rand.title);
      }
    }
  };

  /* ── Category selection ── */
  const handleSelectCategory = (catId: ArticulateCategory) => {
    setCategory(catId);
    setCategoryOpen(false);
    const src = catId === "all"
      ? ARTICULATE_PROMPTS.filter((p) => p.mode === mode)
      : ARTICULATE_PROMPTS.filter((p) => p.mode === mode && p.category === catId);
    const cand = src.length > 0 ? src : ARTICULATE_PROMPTS.filter((p) => p.mode === mode);
    if (cand.length) {
      const rand = cand[Math.floor(Math.random() * cand.length)];
      setCurrentPrompt(rand);
      setDisplayText(rand.title);
    }
  };

  const activeCat = DISPLAY_CATEGORIES.find((c) => c.id === category) ?? DISPLAY_CATEGORIES[0];
  const activeElocutionType = ELOCUTION_TYPES.find((t) => t.id === elocutionType) ?? ELOCUTION_TYPES[0];

  return (
    <div className="relative flex flex-col justify-between items-center w-full min-h-[calc(100dvh-3.5rem-7rem)] md:min-h-[calc(100dvh-4rem)] select-none px-4 sm:px-6 pt-2 sm:pt-8 pb-4 sm:pb-8">

      {/* ── Atmospheric glows ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 top-[5%] h-[65vh] w-[55vw] rounded-full [background:radial-gradient(ellipse_at_center,rgba(165,75,30,0.18),transparent_70%)]" />
        <div className="absolute -right-24 top-0 h-[60vh] w-[50vw] rounded-full [background:radial-gradient(ellipse_at_center,rgba(217,107,67,0.12),transparent_70%)]" />
      </div>

      {/* ─── Top Right Controls: Font Size Buttons (Yellow Box Spot) + Elocution Streak ─── */}
      <div className="absolute right-3.5 top-2.5 sm:right-8 sm:top-6 md:right-10 md:top-8 z-30 flex items-center gap-1.5 sm:gap-2">
        {/* Font Size Adjuster Pill */}
        <div
          className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-1 shadow-[0_2px_10px_rgba(0,0,0,0.2)] text-fg/90 select-none"
          title="Adjust text size"
        >
          <button
            type="button"
            onClick={handleDecreaseFont}
            disabled={fontScaleIndex <= 0}
            className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full hover:bg-white/10 active:scale-90 transition disabled:opacity-30 disabled:pointer-events-none text-fg/80 hover:text-fg"
            title="Decrease font size (A−)"
            aria-label="Decrease font size"
          >
            <span className="font-serif font-bold text-xs sm:text-sm">A−</span>
          </button>
          <span className="font-mono text-[10px] sm:text-xs text-muted px-0.5 sm:px-1 min-w-[2.2rem] sm:min-w-[2.5rem] text-center font-semibold">
            {FONT_SCALE_LABELS[fontScaleIndex]}
          </span>
          <button
            type="button"
            onClick={handleIncreaseFont}
            disabled={fontScaleIndex >= FONT_SCALES.length - 1}
            className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full hover:bg-white/10 active:scale-90 transition disabled:opacity-30 disabled:pointer-events-none text-fg/80 hover:text-fg"
            title="Increase font size (A+)"
            aria-label="Increase font size"
          >
            <span className="font-serif font-bold text-sm sm:text-base">A+</span>
          </button>
        </div>

        {/* Elocution Streak Indicator */}
        {mode === "elocution" && (
          <div
            key={elocutionType}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 backdrop-blur-md shadow-[0_2px_12px_rgba(245,158,11,0.15)] text-amber-300 text-xs sm:text-sm font-semibold select-none animate-fade-in"
            title={`${currentStreak} ${activeElocutionType.label} challenges practiced`}
          >
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400/90 shrink-0 animate-pulse" />
            <span className="tabular-nums font-bold text-amber-200">{currentStreak}</span>
            <span className="hidden xs:inline text-[11px] sm:text-xs text-amber-300/80 font-medium">Practiced</span>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          ZONE 1: TOP SECTION (Header, Mode Switcher, Category Dropdowns)
          Anchored at top — Height locked across all modes so NOTHING jumps!
         ════════════════════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-xl flex flex-col items-center shrink-0 text-center z-10 pt-1 sm:pt-2">

        {/* ─── HEADER ─── */}
        <div className="text-center mb-1.5 sm:mb-4">
          <h1 className="font-serif text-2xl xs:text-[1.85rem] sm:text-[3rem] font-normal tracking-tight text-fg leading-none">
            Articulate
          </h1>
          <div className="flex items-center justify-center gap-1.5 mt-1 sm:mt-2 text-xs sm:text-xs text-muted">
            <span>made by</span>
            <a
              href="https://instagram.com/ur.spideey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] sm:text-[11px] text-fg/80 hover:text-fg hover:border-white/20 transition"
            >
              <IgIcon />
              @ur.spideey
            </a>
          </div>
        </div>

        {/* ─── MODE TOGGLE ─── */}
        <div className="relative z-30 inline-flex p-1 rounded-full border border-white/[0.1] bg-white/[0.04] max-w-full">
          {ARTICULATE_MODES.map((m) => {
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => switchMode(m.id)}
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2 text-xs xs:text-[13px] sm:text-[14px] font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap",
                  active ? "bg-[#d96b43] text-white shadow-[0_2px_16px_-4px_rgba(217,107,67,0.7)]" : "text-fg/45 hover:text-fg/70",
                )}
              >
                <span className={cn(
                  "w-2 h-2 sm:w-2 sm:h-2 rounded-full shrink-0 transition-all duration-300",
                  active ? m.dot : "bg-current opacity-40"
                )} />
                {m.label}
              </button>
            );
          })}
        </div>

        {/* ─── CATEGORY & FILTERS (Fixed row height across all modes) ─── */}
        <div className="h-9 sm:h-11 flex items-center justify-center mt-2 sm:mt-4 w-full">
          {mode === "elocution" ? (
            /* Elocution: Side-by-side Category and Difficulty Dropdowns */
            <div className="flex items-center justify-center gap-2 sm:gap-2.5">
              {/* Category Dropdown */}
              <div ref={elocutionCatRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setElocutionCatOpen((v) => !v);
                    setElocutionDiffOpen(false);
                  }}
                  className="flex items-center justify-between gap-2 sm:gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 sm:px-4 py-2 sm:py-2 text-[13px] sm:text-[14px] font-medium text-fg hover:bg-white/[0.08] transition cursor-pointer min-w-[145px] sm:min-w-[170px]"
                >
                  <span className="flex items-center gap-1.5 sm:gap-2 truncate">
                    <span className="text-sm sm:text-base leading-none">{activeElocutionType.emoji}</span>
                    <span className="truncate">{activeElocutionType.label}</span>
                  </span>
                  {elocutionCatOpen ? (
                    <ChevronUp className="w-4 h-4 sm:w-4 sm:h-4 text-muted shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-4 sm:h-4 text-muted shrink-0" />
                  )}
                </button>

                {elocutionCatOpen && (
                  <div
                    className="absolute left-0 top-full mt-1.5 z-50 rounded-2xl border border-white/[0.12] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-fade-in min-w-[180px]"
                    style={{ background: "rgba(22, 18, 15, 0.97)" }}
                  >
                    <div className="space-y-0.5">
                      {ELOCUTION_TYPES.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            handleSelectElocutionType(t.id);
                            setElocutionCatOpen(false);
                          }}
                          className={cn(
                            "flex items-center w-full gap-2.5 px-3 py-2 rounded-xl text-[14px] transition cursor-pointer text-left",
                            elocutionType === t.id
                              ? "bg-white/[0.1] text-fg font-medium"
                              : "text-fg/60 hover:text-fg hover:bg-white/[0.05]"
                          )}
                        >
                          <span className="text-base w-5 text-center shrink-0 leading-none">{t.emoji}</span>
                          <span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Difficulty Dropdown */}
              <div ref={elocutionDiffRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setElocutionDiffOpen((v) => !v);
                    setElocutionCatOpen(false);
                  }}
                  className="flex items-center justify-between gap-1.5 sm:gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-3 sm:px-3.5 py-2 sm:py-2 text-[13px] sm:text-[14px] font-medium text-fg hover:bg-white/[0.08] transition cursor-pointer min-w-[100px] sm:min-w-[115px]"
                >
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <span className={cn(
                      "w-2 h-2 sm:w-2 sm:h-2 rounded-full shrink-0",
                      elocutionDifficulty === "easy" ? "bg-emerald-400" : elocutionDifficulty === "medium" ? "bg-amber-400" : "bg-rose-400"
                    )} />
                    <span className="capitalize">{elocutionDifficulty}</span>
                  </span>
                  {elocutionDiffOpen ? (
                    <ChevronUp className="w-4 h-4 sm:w-4 sm:h-4 text-muted shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-4 sm:h-4 text-muted shrink-0" />
                  )}
                </button>

                {elocutionDiffOpen && (
                  <div
                    className="absolute right-0 top-full mt-1.5 z-50 rounded-2xl border border-white/[0.12] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-fade-in min-w-[130px]"
                    style={{ background: "rgba(22, 18, 15, 0.97)" }}
                  >
                    <div className="space-y-0.5">
                      {DIFFICULTIES.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => handleSelectElocutionDifficulty(d.id)}
                          className={cn(
                            "flex items-center w-full gap-2.5 px-3 py-2 rounded-xl text-[14px] transition cursor-pointer text-left capitalize",
                            elocutionDifficulty === d.id
                              ? "bg-white/[0.1] text-fg font-medium"
                              : "text-fg/60 hover:text-fg hover:bg-white/[0.05]"
                          )}
                        >
                          <span className={cn("w-2 h-2 rounded-full shrink-0", d.dot)} />
                          <span>{d.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Off-the-cuff / Deep-research Category */
            <div ref={catRef} className="relative w-full max-w-[220px] sm:max-w-[260px]">
              <button
                type="button"
                onClick={() => setCategoryOpen((v) => !v)}
                className="flex items-center justify-between w-full gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 sm:px-4 py-2 sm:py-2 text-[13px] sm:text-[14px] font-medium text-fg hover:bg-white/[0.08] transition cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm sm:text-base leading-none">{activeCat.emoji}</span>
                  <span>{activeCat.label}</span>
                </span>
                {categoryOpen ? <ChevronUp className="w-4 h-4 sm:w-4 sm:h-4 text-muted shrink-0" /> : <ChevronDown className="w-4 h-4 sm:w-4 sm:h-4 text-muted shrink-0" />}
              </button>

              {categoryOpen && (
                <div
                  className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-2xl border border-white/[0.12] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-fade-in"
                  style={{ background: "rgba(22, 18, 15, 0.97)" }}
                >
                  <div className="space-y-0.5 max-h-60 overflow-y-auto overscroll-contain scrollbar-none">
                    {DISPLAY_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectCategory(cat.id)}
                        className={cn(
                          "flex items-center w-full gap-2.5 px-3 py-2 rounded-xl text-[14px] transition cursor-pointer text-left",
                          category === cat.id ? "bg-white/[0.1] text-fg font-medium" : "text-fg/60 hover:text-fg hover:bg-white/[0.05]"
                        )}
                      >
                        <span className="text-base w-5 text-center shrink-0 leading-none">{cat.emoji}</span>
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          ZONE 2: CENTER STAGE (Topic Title or Elocution Sentence)
          Natural fluid vertical centering matching desktop layout
         ════════════════════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-2xl flex-1 my-auto flex flex-col items-center justify-center px-2 sm:px-4 py-3 sm:py-6 text-center">
        {mode === "elocution" ? (
          <div className="w-full max-h-[50vh] sm:max-h-[55vh] overflow-y-auto overscroll-contain py-2 sm:py-3 animate-fade-in flex items-center justify-center my-auto scrollbar-none">
            <p
              key={elocutionKey}
              style={{
                fontSize: `calc(${
                  currentElocutionItem.text.length > 220
                    ? "clamp(0.95rem, 2.2vw, 1.15rem)"
                    : currentElocutionItem.text.length > 100
                    ? "clamp(1.05rem, 2.6vw, 1.35rem)"
                    : "clamp(1.2rem, 3.2vw, 1.65rem)"
                } * ${FONT_SCALES[fontScaleIndex]})`,
                lineHeight: 1.6,
              }}
              className={cn(
                "font-serif font-normal tracking-normal text-fg select-text animate-prompt-land mx-auto text-balance px-2",
                currentElocutionItem.text.length > 220
                  ? "max-w-prose sm:max-w-xl"
                  : currentElocutionItem.text.length > 100
                  ? "max-w-prose sm:max-w-xl"
                  : "max-w-[34ch] sm:max-w-lg"
              )}
            >
              &ldquo;{currentElocutionItem.text}&rdquo;
            </p>
          </div>
        ) : (
          <div className="w-full py-2 sm:py-4 animate-fade-in flex flex-col items-center justify-center my-auto">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#d96b43]/90 uppercase mb-2 sm:mb-3">
              READY
            </span>
            <h2
              key={tickKey}
              style={{
                fontSize: `calc(clamp(1.75rem, 4.5vw, 3.5rem) * ${FONT_SCALES[fontScaleIndex]})`,
              }}
              className={cn(
                "font-serif font-normal text-fg leading-[1.15] sm:leading-[1.1] tracking-[-0.015em] max-w-[16ch] mx-auto",
                isSpinning ? "animate-slot-in" : "animate-prompt-land"
              )}
            >
              {displayText || "\u00A0"}
            </h2>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          ZONE 3: BOTTOM SECTION (Timer + Symmetrical Action Bar)
          Anchored at bottom — Fixed slots with plenty of room above navigation bar!
         ════════════════════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-xl flex flex-col items-center shrink-0 z-10 pt-2 pb-2 sm:pb-4">
        {mode === "elocution" ? (
          <div className="w-full flex flex-col items-center animate-fade-in">
            {/* Timer and WPM Badge */}
            <div className="flex flex-col items-center justify-center mb-2 sm:mb-3">
              <div className="flex items-center justify-center gap-2 font-mono text-2xl sm:text-[1.75rem] font-normal tabular-nums tracking-tight text-fg/90 leading-none">
                {stopwatchState === "running" && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping mr-1" />
                )}
                {formatStopwatch(stopwatchElapsed)}
              </div>

              {/* Reserved height (20px mobile / 24px desktop) for WPM stats badge so the buttons never jump */}
              <div className="h-6 sm:h-6 flex items-center justify-center mt-1.5 sm:mt-1.5">
                {stopwatchState === "stopped" ? (
                  <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3 py-1 sm:py-0.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs sm:text-xs font-mono text-fg/80 animate-fade-in shadow-sm">
                    <span className="text-[#d96b43] font-bold">{elocutionWpm} WPM</span>
                    <span className="text-white/20">·</span>
                    <span className="text-muted">
                      {elocutionWpm >= 220 ? "⚡ Lightning Speed" : elocutionWpm >= 160 ? "🎯 Crisp & Articulate" : elocutionWpm >= 110 ? "🧘 Measured Cadence" : "🐢 Deliberate Pace"}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Action Buttons (Generous, Symmetrical, Fixed Slots) */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-4 w-full max-w-[360px] sm:max-w-[440px] h-12 sm:h-12 px-1">
              {/* Slot 1: Primary Stopwatch Control (Start / Stop / Retry) */}
              {stopwatchState === "idle" && (
                <button
                  type="button"
                  onClick={startStopwatch}
                  className="flex-1 sm:flex-initial sm:w-[130px] h-12 sm:h-12 rounded-full bg-[#d96b43] text-white px-4 sm:px-6 text-sm sm:text-[15px] font-semibold shadow-[0_4px_20px_-4px_rgba(217,107,67,0.5)] hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2 sm:gap-2 whitespace-nowrap shrink-0"
                >
                  <Play className="w-4 h-4 sm:w-4 sm:h-4 fill-current" />
                  Start
                </button>
              )}
              {stopwatchState === "running" && (
                <button
                  type="button"
                  onClick={stopStopwatch}
                  className="flex-1 sm:flex-initial sm:w-[130px] h-12 sm:h-12 rounded-full bg-rose-600 hover:bg-rose-500 text-white px-4 sm:px-6 text-sm sm:text-[15px] font-semibold shadow-[0_4px_20px_-4px_rgba(225,29,72,0.5)] active:scale-95 transition cursor-pointer flex items-center justify-center gap-2 sm:gap-2 animate-pulse whitespace-nowrap shrink-0"
                >
                  <Square className="w-4 h-4 sm:w-4 sm:h-4 fill-current" />
                  Stop
                </button>
              )}
              {stopwatchState === "stopped" && (
                <button
                  type="button"
                  onClick={resetStopwatch}
                  className="flex-1 sm:flex-initial sm:w-[130px] h-12 sm:h-12 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-fg px-4 sm:px-6 text-sm sm:text-[15px] font-semibold transition active:scale-95 cursor-pointer flex items-center justify-center gap-2 sm:gap-2 whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-4 h-4 sm:w-4 sm:h-4" />
                  Retry
                </button>
              )}

              {/* Slot 2: Next Challenge (Fixed Position) */}
              <button
                type="button"
                onClick={nextElocutionChallenge}
                disabled={stopwatchState === "running"}
                className={cn(
                  "flex-[1.4] sm:flex-initial sm:w-[185px] h-12 sm:h-12 rounded-full text-sm sm:text-[15px] font-semibold transition active:scale-95 flex items-center justify-center gap-1.5 sm:gap-1.5 px-4 sm:px-6 whitespace-nowrap shrink-0",
                  stopwatchState === "stopped"
                    ? "bg-[#d96b43] text-white shadow-[0_4px_20px_-4px_rgba(217,107,67,0.5)] hover:brightness-110 cursor-pointer"
                    : stopwatchState === "running"
                    ? "border border-white/10 bg-white/[0.02] text-fg/30 cursor-not-allowed font-medium"
                    : "border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-fg cursor-pointer"
                )}
              >
                Next challenge {stopwatchState === "stopped" ? "→" : ""}
              </button>

              {/* Slot 3: Settings Gear */}
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="w-12 h-12 sm:w-12 sm:h-12 shrink-0 rounded-full border border-white/15 text-fg/60 hover:text-fg hover:bg-white/[0.06] transition flex items-center justify-center cursor-pointer"
                title="Timer Settings"
              >
                <Settings2 className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Off-the-cuff / Deep-research Action Bar */
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 w-full max-w-[360px] sm:max-w-[440px] h-12 sm:h-12 animate-fade-in px-1">
            {/* Slot 1: Spin */}
            <button
              type="button"
              onClick={doSpin}
              disabled={isSpinning}
              className="flex-1 sm:flex-initial sm:w-[130px] h-12 sm:h-12 shrink-0 rounded-full bg-[#d96b43] text-white px-4 sm:px-6 text-sm sm:text-[15px] font-semibold shadow-[0_4px_20px_-4px_rgba(217,107,67,0.5)] hover:brightness-110 active:scale-95 transition disabled:opacity-40 cursor-pointer whitespace-nowrap text-center flex items-center justify-center"
            >
              {hasSpun ? "Spin again" : "Spin"}
            </button>

            {/* Slot 2: Start Timer / Research */}
            {mode === "off-the-cuff" ? (
              <button
                type="button"
                onClick={startOffTheCuff}
                className="flex-[1.4] sm:flex-initial sm:w-[185px] h-12 sm:h-12 shrink-0 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-fg px-4 sm:px-6 text-sm sm:text-[15px] font-semibold transition active:scale-95 cursor-pointer whitespace-nowrap text-center flex items-center justify-center"
              >
                Start {settings.speechMinutes}m timer
              </button>
            ) : (
              <button
                type="button"
                onClick={startDeepResearch}
                className="flex-[1.4] sm:flex-initial sm:w-[185px] h-12 sm:h-12 shrink-0 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-fg px-4 sm:px-6 text-sm sm:text-[15px] font-semibold transition active:scale-95 cursor-pointer whitespace-nowrap text-center flex items-center justify-center"
              >
                Start {settings.researchMinutes}m research
              </button>
            )}

            {/* Slot 3: Settings Gear */}
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="w-12 h-12 sm:w-12 sm:h-12 shrink-0 rounded-full border border-white/15 text-fg/60 hover:text-fg hover:bg-white/[0.06] transition flex items-center justify-center cursor-pointer"
              title="Timer Settings"
            >
              <Settings2 className="w-5 h-5 sm:w-4 sm:h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ─── SETTINGS MODAL ─── */}
      {settingsOpen && (
        <SettingsOverlay
          settings={settings}
          onChange={(s) => setSettings(s)}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {/* ─── FULLSCREEN CLEAN TIMER PAGE (No Window / Card Box) ─── */}
      {showOverlay && (() => {
        const isResearch = overlayPhase === "research";
        const isReadyToSpeak = overlayPhase === "ready-to-speak";
        const isSpeaking = overlayPhase === "speaking";
        const isDone = overlayPhase === "done";

        // Progress calculation:
        // In ready-to-speak: 0 (clean un-filled glass ring)
        // In research/speaking: arc grows clockwise as time elapses
        const elapsedFraction = (isReadyToSpeak || overlayTotal <= 0)
          ? 0
          : Math.max(0, Math.min(1, (overlayTotal - overlayLeft) / overlayTotal));

        // Structure Pills for speaking practice (What? / So what? / Now what?)
        const speakingThirds = overlayTotal > 0 ? overlayTotal / 3 : 20;
        const activePill = isReadyToSpeak
          ? 0
          : overlayLeft > speakingThirds * 2 ? 0 : overlayLeft > speakingThirds ? 1 : 2;
        const PILLS = [
          { title: "What?", desc: "The core point" },
          { title: "So what?", desc: "Why it matters" },
          { title: "Now what?", desc: "Action or takeaway" },
        ];

        // Circle dimensions: viewBox 330 allows perfect fluid scaling on all mobile screens
        const size = 330;
        const strokeWidth = 28;
        const radius = (size - strokeWidth) / 2;
        const circ = 2 * Math.PI * radius;
        const strokeDashoffset = circ - elapsedFraction * circ;

        return (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 py-4 sm:py-8 bg-[#0d0d0f]/98 backdrop-blur-3xl animate-fade-in select-none overflow-y-auto">
            {/* Ambient Radial Theme Aura */}
            <div className="pointer-events-none absolute w-[520px] h-[520px] rounded-full bg-[#d96b43]/12 blur-[140px]" />

            {/* Main Column — Clean, Spaced, Symmetrical on Phone */}
            <div className="relative z-10 flex flex-col items-center text-center w-full max-w-lg mx-auto py-2">
              
              {/* Topic Title & Context */}
              <h2 className="font-mono text-xs sm:text-sm font-bold tracking-[0.24em] uppercase text-[#d96b43] mb-1 sm:mb-1.5 max-w-[32ch] px-4 leading-relaxed">
                {currentPrompt.title}
              </h2>
              {currentPrompt.context && (
                <p className="text-[11px] sm:text-[13px] text-muted/70 italic font-serif max-w-sm px-4 mb-2 sm:mb-2.5 line-clamp-2">
                  &ldquo;{currentPrompt.context}&rdquo;
                </p>
              )}

              {/* Subtitle / Structure Pills */}
              <div className="min-h-[36px] sm:min-h-[44px] flex items-center justify-center mb-1 sm:mb-2">
                {isResearch ? (
                  <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.3em] uppercase text-[#d96b43]/90">
                    RESEARCHING
                  </span>
                ) : (
                  /* Speaking / Ready: The 3 Pill buttons */
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 px-2">
                    {PILLS.map((pill, idx) => {
                      const active = idx === activePill;
                      return (
                        <div
                          key={pill.title}
                          className={cn(
                            "flex items-center px-3 sm:px-5 py-1 sm:py-2 rounded-full border transition-all duration-300",
                            active
                              ? "bg-[#d96b43]/20 border-[#d96b43] text-white shadow-[0_0_18px_rgba(217,107,67,0.35)]"
                              : "bg-white/[0.04] border-white/[0.1] text-white/45"
                          )}
                        >
                          <span className="text-[11px] sm:text-sm font-semibold">{pill.title}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Thick Glassmorphism Radial Timer Ring (Fluid responsive width) */}
              <div className="relative my-4 sm:my-8 flex items-center justify-center w-[230px] h-[230px] sm:w-[330px] sm:h-[330px]">
                <svg viewBox="0 0 330 330" className="w-full h-full -rotate-90" aria-hidden="true">
                  {/* Outer Glass Bevel Stroke */}
                  <circle
                    cx={size / 2} cy={size / 2} r={radius + strokeWidth / 2}
                    fill="none" strokeWidth={1}
                    stroke="rgba(255, 255, 255, 0.12)"
                  />
                  {/* Thick Dark Glassmorphism Track */}
                  <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" strokeWidth={strokeWidth}
                    stroke="rgba(255, 255, 255, 0.08)"
                  />
                  {/* Inner Glass Bevel Stroke */}
                  <circle
                    cx={size / 2} cy={size / 2} r={radius - strokeWidth / 2}
                    fill="none" strokeWidth={1}
                    stroke="rgba(255, 255, 255, 0.06)"
                  />
                  {/* Active Colored Progress Arc (Radial cut, thick, glow) */}
                  <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" strokeWidth={strokeWidth}
                    strokeLinecap="butt"
                    strokeDasharray={circ}
                    strokeDashoffset={strokeDashoffset}
                    stroke="#d96b43"
                    className="transition-[stroke-dashoffset] duration-700 ease-linear"
                    style={{ filter: "drop-shadow(0 0 14px rgba(217, 107, 67, 0.45))" }}
                  />
                </svg>

                {/* Large Serif Digits Inside Ring */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="font-serif text-6xl sm:text-8xl md:text-9xl font-normal tabular-nums tracking-tight leading-none"
                    style={{ color: "#d96b43" }}
                  >
                    {fmt(overlayLeft)}
                  </span>
                </div>
              </div>

              {/* Status Caption */}
              <p className="font-serif text-lg sm:text-2xl text-fg/85 italic mb-4 sm:mb-7">
                {isResearch
                  ? "Research."
                  : isReadyToSpeak
                  ? "Ready."
                  : isSpeaking
                  ? "Speak."
                  : "Time's up."}
              </p>

              {/* Action Controls Matching Reference Screenshot */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                {isResearch && (
                  <button
                    type="button"
                    onClick={finishResearch}
                    className="rounded-full bg-[#d96b43] text-white px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold hover:brightness-110 active:scale-95 transition shadow-[0_8px_24px_-6px_rgba(217,107,67,0.6)] cursor-pointer"
                  >
                    Done researching
                  </button>
                )}

                {isReadyToSpeak && (
                  <button
                    type="button"
                    onClick={startSpeakingCountdown}
                    className="rounded-full bg-[#d96b43] text-white px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base font-semibold hover:brightness-110 active:scale-95 transition shadow-[0_8px_24px_-6px_rgba(217,107,67,0.6)] cursor-pointer"
                  >
                    Speak
                  </button>
                )}

                {isSpeaking && (
                  <button
                    type="button"
                    onClick={() => {
                      if (overlayRef.current) clearInterval(overlayRef.current);
                      setOverlayPhase("done");
                      if (!settings.muteSounds) playChime();
                    }}
                    className="rounded-full bg-[#d96b43] text-white px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold hover:brightness-110 active:scale-95 transition shadow-[0_8px_24px_-6px_rgba(217,107,67,0.6)] cursor-pointer"
                  >
                    Done speaking
                  </button>
                )}

                {isDone && (
                  <button
                    type="button"
                    onClick={closeOverlay}
                    className="rounded-full bg-[#d96b43] text-white px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold hover:brightness-110 active:scale-95 transition shadow-[0_8px_24px_-6px_rgba(217,107,67,0.6)] cursor-pointer"
                  >
                    Finish
                  </button>
                )}

                <button
                  type="button"
                  onClick={closeOverlay}
                  className="text-sm sm:text-base text-muted hover:text-fg underline underline-offset-4 cursor-pointer transition px-3 py-1.5"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
