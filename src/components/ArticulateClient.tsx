"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, Settings2 } from "lucide-react";
import { ARTICULATE_PROMPTS, type ArticulateCategory, type ArticulateMode, type ArticulatePrompt } from "@/data/articulate/prompts";
import { cn } from "@/lib/format";

/* ─── Category Definitions (richer, with emojis as in Screenshot 3) ────── */
interface CategoryDef {
  id: ArticulateCategory | string;
  label: string;
  emoji?: string;
}

const CATEGORIES: CategoryDef[] = [
  { id: "all",            label: "General",           emoji: "✦" },
  { id: "philosophy",    label: "Philosophy",         emoji: "🏛️" },
  { id: "technology",    label: "Tech / AI",          emoji: "⚡" },
  { id: "society",       label: "Society",            emoji: "🌐" },
  { id: "personal",      label: "Personal finance",   emoji: "💰" },
  { id: "personal",      label: "Entrepreneurship",   emoji: "🚀" },
  { id: "technology",    label: "Startups",           emoji: "🌱" },
  { id: "personal",      label: "Fitness",            emoji: "💪" },
  { id: "personal",      label: "Nutrition",          emoji: "🥗" },
  { id: "general",       label: "Productivity",       emoji: "⚡" },
  { id: "general",       label: "History",            emoji: "📜" },
  { id: "general",       label: "Literature",         emoji: "📚" },
  { id: "curveballs",    label: "Curveballs",         emoji: "🎲" },
];

// Deduplicated display list with unique display keys
const DISPLAY_CATEGORIES = [
  { key: "all",           id: "all" as ArticulateCategory,          label: "General",           emoji: "✦" },
  { key: "philosophy",    id: "philosophy" as ArticulateCategory,   label: "Philosophy",         emoji: "🏛️" },
  { key: "technology",    id: "technology" as ArticulateCategory,   label: "Tech / AI",          emoji: "⚡" },
  { key: "society",       id: "society" as ArticulateCategory,      label: "Society",            emoji: "🌐" },
  { key: "personal",      id: "personal" as ArticulateCategory,     label: "Personal",           emoji: "💰" },
  { key: "curveballs",    id: "curveballs" as ArticulateCategory,   label: "Curveballs",         emoji: "🎲" },
];

/* ─── Settings ───────────────────────────────────────────────────────────── */
interface Settings {
  speechMinutes: number;   // 1–10
  researchMinutes: number; // 1–60
  muteSounds: boolean;
}

const DEFAULT_SETTINGS: Settings = { speechMinutes: 1, researchMinutes: 5, muteSounds: false };
const SETTINGS_KEY = "ql-articulate-v2";

function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const s = localStorage.getItem(SETTINGS_KEY);
    return s ? { ...DEFAULT_SETTINGS, ...JSON.parse(s) } : DEFAULT_SETTINGS;
  } catch { return DEFAULT_SETTINGS; }
}

function persistSettings(s: Settings) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch {}
}

/* ─── Minimal Instagram SVG ─────────────────────────────────────────────── */
function IgIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

/* ─── Web Audio ─────────────────────────────────────────────────────────── */
let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctor = window.AudioContext ?? (window as unknown as {webkitAudioContext: typeof AudioContext}).webkitAudioContext;
    if (Ctor) audioCtx = new Ctor();
  }
  if (audioCtx?.state === "suspended") audioCtx.resume().catch(() => {});
  return audioCtx;
}

function playTick(pitch = 700) {
  const ctx = getAudioCtx(); if (!ctx) return;
  try {
    const osc = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
    osc.type = "triangle";
    osc.frequency.setValueAtTime(pitch, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.018);
    g.gain.setValueAtTime(0.001, t);
    g.gain.exponentialRampToValueAtTime(0.14, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.018);
  } catch {}
}

function playLock() {
  const ctx = getAudioCtx(); if (!ctx) return;
  try {
    const t = ctx.currentTime;
    // thud
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(300, t); o.frequency.exponentialRampToValueAtTime(55, t + 0.05);
    g.gain.setValueAtTime(0.22, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.05);
    // bell
    const b = ctx.createOscillator(), bg = ctx.createGain();
    b.type = "sine"; b.frequency.setValueAtTime(880, t + 0.015);
    bg.gain.setValueAtTime(0.001, t + 0.015); bg.gain.exponentialRampToValueAtTime(0.11, t + 0.03); bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    b.connect(bg); bg.connect(ctx.destination); b.start(t + 0.015); b.stop(t + 0.5);
  } catch {}
}

function playChime() {
  const ctx = getAudioCtx(); if (!ctx) return;
  try {
    const t = ctx.currentTime;
    [[523.25, 0], [659.25, 0.1], [783.99, 0.2]].forEach(([freq, delay]) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), s = t + delay;
      o.type = "sine"; o.frequency.setValueAtTime(freq, s);
      g.gain.setValueAtTime(0.001, s); g.gain.exponentialRampToValueAtTime(0.16, s + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.65);
      o.connect(g); g.connect(ctx.destination); o.start(s); o.stop(s + 0.65);
    });
  } catch {}
}

/* ─── Styled Slider ─────────────────────────────────────────────────────── */
function RangeSlider({ min, max, value, step = 1, onChange }: { min: number; max: number; value: number; step?: number; onChange: (v: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative h-5 flex items-center">
      <div className="absolute inset-x-0 h-[5px] rounded-full bg-fg/[0.12]" />
      <div className="absolute left-0 h-[5px] rounded-full bg-[#d96b43]" style={{ width: `${pct}%` }} />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        style={{ WebkitAppearance: "none" }}
      />
      {/* Custom thumb */}
      <div
        className="absolute w-4 h-4 rounded-full bg-[#d96b43] shadow-md border-2 border-white/20 pointer-events-none"
        style={{ left: `calc(${pct}% - 8px)` }}
      />
    </div>
  );
}

/* ─── Settings Panel (exactly as Screenshot 4) ──────────────────────────── */
function SettingsPanel({ settings, onChange, onClose }: { settings: Settings; onChange: (s: Settings) => void; onClose: () => void }) {
  const [local, setLocal] = useState<Settings>(settings);

  const update = (patch: Partial<Settings>) => {
    setLocal((prev) => ({ ...prev, ...patch }));
  };

  const handleDone = () => {
    persistSettings(local);
    onChange(local);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-[320px] mx-4 rounded-2xl bg-[#1a1513] border border-white/[0.08] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Heading */}
        <h2 className="text-xl font-serif font-normal text-fg mb-0.5">Settings</h2>
        <p className="text-sm text-muted mb-5">Timer lengths in whole minutes.</p>

        {/* SPEECH */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-[#d96b43]">Speech</span>
            <span className="font-bold text-base text-fg tabular-nums">{local.speechMinutes} min</span>
          </div>
          <RangeSlider min={1} max={10} value={local.speechMinutes} onChange={(v) => update({ speechMinutes: v })} />
          <div className="flex justify-between mt-1.5">
            <span className="font-mono text-[10px] text-subtle">1 min</span>
            <span className="font-mono text-[10px] text-subtle">10 min</span>
          </div>
        </div>

        {/* RESEARCH */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-[#d96b43]">Research</span>
            <span className="font-bold text-base text-fg tabular-nums">{local.researchMinutes} min</span>
          </div>
          <RangeSlider min={1} max={60} value={local.researchMinutes} onChange={(v) => update({ researchMinutes: v })} />
          <div className="flex justify-between mt-1.5">
            <span className="font-mono text-[10px] text-subtle">1 min</span>
            <span className="font-mono text-[10px] text-subtle">60 min</span>
          </div>
          <p className="text-xs text-subtle mt-1">Deep research only</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07] mb-4" />

        {/* Mute checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer mb-4 select-none">
          <button
            type="button"
            onClick={() => update({ muteSounds: !local.muteSounds })}
            className={cn(
              "w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors",
              local.muteSounds ? "bg-[#d96b43] border-[#d96b43]" : "border-line-2 bg-transparent",
            )}
          >
            {local.muteSounds && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
          </button>
          <span className="text-sm text-fg">Mute sound effects</span>
        </label>

        <p className="text-xs text-subtle mb-4">Saved for next time.</p>

        {/* Done button */}
        <button
          type="button"
          onClick={handleDone}
          className="w-full rounded-full bg-[#d96b43] text-white py-3 text-sm font-semibold tracking-wide hover:brightness-110 active:scale-[0.98] transition cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function ArticulateClient() {
  /* State */
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [mode, setMode] = useState<ArticulateMode>("off-the-cuff");
  const [category, setCategory] = useState<ArticulateCategory>("all");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  // Prompt
  const pool = useMemo(() => {
    const all = ARTICULATE_PROMPTS.filter((p) => p.mode === mode);
    return category === "all" ? all : all.filter((p) => p.category === category);
  }, [mode, category]);

  const [currentPrompt, setCurrentPrompt] = useState<ArticulatePrompt>(() => {
    const p = ARTICULATE_PROMPTS.filter((x) => x.mode === "off-the-cuff");
    return p.find((x) => x.title === "Voicemail") ?? p[0];
  });

  // Spin animation
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDisplay, setSpinDisplay] = useState("");
  const [spinBlur, setSpinBlur] = useState(false);
  const spinRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Timer (off the cuff)
  const [timerState, setTimerState] = useState<"idle" | "running" | "paused" | "done">("idle");
  const [timerLeft, setTimerLeft] = useState<number>(() => loadSettings().speechMinutes * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Deep research radial overlay
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayPhase, setOverlayPhase] = useState<"research" | "speaking" | "done">("research");
  const [overlayLeft, setOverlayLeft] = useState(0);
  const [overlayTotal, setOverlayTotal] = useState(0);
  const overlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  // Sync timer left when settings change
  useEffect(() => {
    if (timerState === "idle") {
      setTimerLeft(settings.speechMinutes * 60);
    }
  }, [settings.speechMinutes, timerState]);

  /* ── Reset timer helper ── */
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerState("idle");
    setTimerLeft(settings.speechMinutes * 60);
  }, [settings.speechMinutes]);

  /* ── Spin (1.8s deceleration reel) ── */
  const doSpin = useCallback(() => {
    if (isSpinning) return;
    resetTimer();

    spinRefs.current.forEach(clearTimeout);
    spinRefs.current = [];

    const src = pool.length > 0 ? pool : ARTICULATE_PROMPTS.filter((p) => p.mode === mode);
    const candidates = src.filter((p) => p.id !== currentPrompt.id);
    const final = (candidates.length > 0 ? candidates : src)[Math.floor(Math.random() * (candidates.length > 0 ? candidates.length : src.length))];

    setIsSpinning(true);
    setSpinBlur(true);

    const steps = [40, 40, 45, 50, 55, 60, 70, 80, 95, 115, 140, 170, 205, 245, 285, 330, 375, 420, 465];
    let acc = 0;
    steps.forEach((dur, i) => {
      acc += dur;
      const t = setTimeout(() => {
        const rand = src[Math.floor(Math.random() * src.length)];
        setSpinDisplay(rand.title);
        if (!settings.muteSounds) playTick(650 + (i / steps.length) * 400);
      }, acc);
      spinRefs.current.push(t);
    });

    const endT = setTimeout(() => {
      setCurrentPrompt(final);
      setSpinDisplay("");
      setIsSpinning(false);
      setSpinBlur(false);
      setHasSpun(true);
      if (!settings.muteSounds) playLock();
    }, acc + 300);
    spinRefs.current.push(endT);
  }, [isSpinning, pool, currentPrompt, mode, settings.muteSounds, resetTimer]);

  /* ── Off the cuff timer ── */
  const toggleTimer = useCallback(() => {
    if (timerState === "idle") {
      setTimerState("running");
      setTimerLeft(settings.speechMinutes * 60);
    } else if (timerState === "running") {
      setTimerState("paused");
      if (timerRef.current) clearInterval(timerRef.current);
    } else if (timerState === "paused") {
      setTimerState("running");
    } else if (timerState === "done") {
      resetTimer();
    }
  }, [timerState, settings.speechMinutes, resetTimer]);

  useEffect(() => {
    if (timerState === "running") {
      timerRef.current = setInterval(() => {
        setTimerLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setTimerState("done");
            if (!settings.muteSounds) playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerState, settings.muteSounds]);

  /* ── Deep research overlay ── */
  const openResearch = useCallback(() => {
    const secs = settings.researchMinutes * 60;
    setOverlayPhase("research");
    setOverlayTotal(secs);
    setOverlayLeft(secs);
    setShowOverlay(true);
  }, [settings.researchMinutes]);

  const advanceToSpeaking = useCallback(() => {
    if (overlayRef.current) clearInterval(overlayRef.current);
    if (!settings.muteSounds) playChime();
    const secs = settings.speechMinutes * 60;
    setOverlayPhase("speaking");
    setOverlayTotal(secs);
    setOverlayLeft(secs);
  }, [settings.speechMinutes, settings.muteSounds]);

  const closeOverlay = useCallback(() => {
    if (overlayRef.current) clearInterval(overlayRef.current);
    setShowOverlay(false);
  }, []);

  useEffect(() => {
    if (!showOverlay || (overlayPhase !== "research" && overlayPhase !== "speaking")) return;
    overlayRef.current = setInterval(() => {
      setOverlayLeft((prev) => {
        if (prev <= 1) {
          clearInterval(overlayRef.current!);
          if (overlayPhase === "research") { advanceToSpeaking(); }
          else { setOverlayPhase("done"); if (!settings.muteSounds) playChime(); }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (overlayRef.current) clearInterval(overlayRef.current); };
  }, [showOverlay, overlayPhase, advanceToSpeaking, settings.muteSounds]);

  /* ── Mode switch ── */
  const switchMode = (m: ArticulateMode) => {
    if (m === mode) return;
    setMode(m);
    resetTimer();
    setCategoryOpen(false);
    const src = ARTICULATE_PROMPTS.filter((p) => p.mode === m);
    if (src.length) setCurrentPrompt(src[0]);
  };

  /* ── Timer button label ── */
  const timerLabel = () => {
    if (mode === "deep-research") return `Start ${settings.researchMinutes} min research`;
    if (timerState === "idle") return `Start ${settings.speechMinutes} min timer`;
    if (timerState === "running") return `${fmt(timerLeft)} — Pause`;
    if (timerState === "paused") return `Resume (${fmt(timerLeft)})`;
    return "Reset timer";
  };

  /* ── Status label (off the cuff) ── */
  const statusLabel = isSpinning ? "SPINNING..." : timerState === "running" ? "SPEAKING" : timerState === "paused" ? "PAUSED" : timerState === "done" ? "TIME'S UP" : "READY";

  const displayTitle = isSpinning ? spinDisplay : currentPrompt.title;
  const activeCat = DISPLAY_CATEGORIES.find((c) => c.id === category) ?? DISPLAY_CATEGORIES[0];

  return (
    <div className="relative flex flex-1 flex-col items-center w-full min-h-[calc(100dvh-4rem)] overflow-hidden select-none">

      {/* ── Atmospheric background glows ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-20 top-10 h-[60vh] w-[55vw] rounded-full opacity-40 [background:radial-gradient(ellipse_at_center,rgba(180,90,40,0.22),transparent_70%)]" />
        <div className="absolute -right-20 top-5 h-[55vh] w-[50vw] rounded-full opacity-40 [background:radial-gradient(ellipse_at_center,rgba(20,80,65,0.2),transparent_70%)]" />
      </div>

      {/* ── Central stack ── */}
      <div className="flex flex-col items-center w-full max-w-[600px] px-6 pt-10 sm:pt-14 pb-8">

        {/* ──────────────────── HEADER ──────────────────── */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-fg leading-none">
            Articulate
          </h1>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-muted">
            <span>made by</span>
            <a
              href="https://instagram.com/ur.spideey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-fg/80 hover:text-fg hover:border-white/20 transition"
            >
              <IgIcon />
              @ur.spideey
            </a>
          </div>
        </div>

        {/* ──────────────────── MODE TOGGLE ──────────────────── */}
        <div className="flex flex-col items-center w-full mb-6">
          <div className="inline-flex p-[3px] rounded-full border border-white/10 bg-fg/[0.04] backdrop-blur-sm">
            {(["off-the-cuff", "deep-research"] as ArticulateMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer",
                  mode === m
                    ? "bg-[#d96b43] text-white shadow-[0_2px_14px_-4px_rgba(217,107,67,0.65)]"
                    : "text-fg/50 hover:text-fg/80",
                )}
              >
                <span className={cn("w-2 h-2 rounded-full flex-shrink-0", mode === m ? (m === "off-the-cuff" ? "bg-pink-300" : "bg-sky-300") : "bg-fg/20")} />
                {m === "off-the-cuff" ? "Off the cuff" : "Deep research"}
              </button>
            ))}
          </div>

          {/* Mode caption */}
          <p className="mt-3 text-sm text-muted text-center max-w-xs leading-relaxed">
            {mode === "off-the-cuff"
              ? "Minimal prep. Try to think quick on your feet."
              : "Spin a topic, set a research timer, then start the speech timer whenever you're ready."}
          </p>

          {/* Category dropdown — off the cuff only */}
          {mode === "off-the-cuff" && (
            <div className="relative mt-3 w-full max-w-[260px] z-20">
              {/* Trigger */}
              <button
                type="button"
                onClick={() => setCategoryOpen((v) => !v)}
                className="flex items-center justify-between w-full gap-2 rounded-full border border-white/[0.12] bg-fg/[0.04] px-4 py-2 text-sm font-medium text-fg hover:bg-fg/[0.07] transition cursor-pointer"
                aria-expanded={categoryOpen}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base leading-none">{activeCat.emoji}</span>
                  <span>{activeCat.label}</span>
                </span>
                {categoryOpen ? <ChevronUp className="w-4 h-4 text-muted shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted shrink-0" />}
              </button>

              {/* Dropdown list — slides below, attached to button */}
              {categoryOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setCategoryOpen(false)} />
                  <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-2xl border border-white/[0.1] bg-[#151210] shadow-2xl overflow-hidden animate-fade-in">
                    <div className="max-h-64 overflow-y-auto overscroll-contain py-1.5 px-1.5 space-y-0.5 scrollbar-none">
                      {DISPLAY_CATEGORIES.map((cat) => {
                        const active = category === cat.id;
                        return (
                          <button
                            key={cat.key}
                            type="button"
                            onClick={() => { setCategory(cat.id); setCategoryOpen(false); }}
                            className={cn(
                              "flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm transition cursor-pointer",
                              active ? "bg-white/[0.07] text-fg font-medium" : "text-fg/60 hover:text-fg hover:bg-white/[0.04]",
                            )}
                          >
                            <span className="text-base leading-none w-5 text-center shrink-0">{cat.emoji}</span>
                            <span>{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* ──────────────────── PROMPT STAGE ──────────────────── */}
        <div className="flex flex-col items-center justify-center w-full my-8 sm:my-12 min-h-[120px] sm:min-h-[150px] px-2 text-center">
          {/* Status label */}
          <p className={cn(
            "font-mono text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-4 transition-colors",
            timerState === "done" ? "text-danger" :
            timerState === "running" ? "text-[#d96b43]" :
            isSpinning ? "text-[#d96b43] animate-pulse" :
            mode === "deep-research" ? "text-[#d96b43]" :
            "text-[#d96b43]",
          )}>
            {mode === "deep-research" && !isSpinning ? "YOUR TOPIC" : statusLabel}
          </p>

          {/* Giant serif heading */}
          <h2
            className={cn(
              "font-serif font-normal text-fg leading-[1.05] tracking-[-0.01em] max-w-[30ch] transition-all duration-150",
              spinBlur ? "blur-[2px] opacity-60 scale-[0.98]" : "blur-0 opacity-100 scale-100",
              displayTitle.length > 30 ? "text-4xl sm:text-5xl md:text-6xl"
                : displayTitle.length > 18 ? "text-5xl sm:text-6xl md:text-7xl"
                : "text-5xl sm:text-6xl md:text-8xl",
            )}
            style={{ color: "rgba(var(--color-fg-raw, 255,255,255), 1)" }}
          >
            {displayTitle || "\u00A0"}
          </h2>
        </div>

        {/* ──────────────────── ACTION BAR ──────────────────── */}
        <div className="flex items-center gap-3 mt-4">
          {/* Spin button */}
          <button
            type="button"
            onClick={doSpin}
            disabled={isSpinning}
            className="inline-flex items-center justify-center rounded-full bg-[#d96b43] text-white px-7 py-3 text-sm font-semibold shadow-[0_8px_24px_-8px_rgba(217,107,67,0.65)] hover:brightness-110 active:scale-95 transition disabled:opacity-50 cursor-pointer"
          >
            {hasSpun ? "Spin again" : "Spin"}
          </button>

          {/* Timer / Research button */}
          {mode === "off-the-cuff" ? (
            <button
              type="button"
              onClick={toggleTimer}
              className={cn(
                "inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition active:scale-95 tabular-nums cursor-pointer",
                timerState === "running" ? "border-[#d96b43]/60 bg-[#d96b43]/10 text-[#d96b43]"
                  : timerState === "done" ? "border-danger/60 bg-danger/10 text-danger"
                  : "border-white/20 bg-transparent text-fg hover:bg-white/[0.05]",
              )}
            >
              {timerLabel()}
            </button>
          ) : (
            <button
              type="button"
              onClick={openResearch}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent text-fg px-6 py-3 text-sm font-semibold hover:bg-white/[0.05] transition active:scale-95 tabular-nums cursor-pointer"
            >
              {timerLabel()}
            </button>
          )}

          {/* Settings gear */}
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-transparent text-fg/50 hover:text-fg hover:bg-white/[0.05] transition cursor-pointer"
            aria-label="Open settings"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ──────────────────── SETTINGS PANEL ──────────────────── */}
      {settingsOpen && (
        <SettingsPanel
          settings={settings}
          onChange={(s) => {
            setSettings(s);
            if (timerState === "idle") setTimerLeft(s.speechMinutes * 60);
          }}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {/* ──────────────────── RADIAL OVERLAY (Screenshot 5) ──────────────────── */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg/95 backdrop-blur-2xl px-4 animate-fade-in select-none">
          <div className="text-center mb-2">
            <h3 className="font-mono text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#d96b43] mb-1">
              {currentPrompt.title.toUpperCase()}
            </h3>
            <span className="font-mono text-[11px] font-bold tracking-[0.28em] uppercase text-[#38b2ac]">
              {overlayPhase === "research" ? "RESEARCHING" : overlayPhase === "speaking" ? "SPEAKING" : "TIME'S UP"}
            </span>
          </div>

          {/* Circular ring */}
          <div className="relative my-10" style={{ width: 280, height: 280 }}>
            {(() => {
              const size = 280, stroke = 8, r = (size - stroke) / 2;
              const circ = 2 * Math.PI * r;
              const pct = overlayTotal > 0 ? overlayLeft / overlayTotal : 0;
              return (
                <>
                  <svg width={size} height={size} className="-rotate-90 absolute inset-0" aria-hidden="true">
                    <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke} className="stroke-fg/[0.07]" />
                    <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke} strokeLinecap="round"
                      strokeDasharray={circ} strokeDashoffset={circ - pct * circ}
                      className="stroke-[#38b2ac] transition-[stroke-dashoffset] duration-700 ease-linear" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-6xl sm:text-7xl font-normal text-fg tabular-nums tracking-tight" style={{ color: "#38b2ac" }}>
                      {fmt(overlayLeft)}
                    </span>
                  </div>
                </>
              );
            })()}
          </div>

          <p className="font-serif text-sm text-muted mb-6 italic">
            {overlayPhase === "research" ? "Research." : overlayPhase === "speaking" ? "Speak now." : "Time's up."}
          </p>

          <div className="flex items-center gap-4">
            {overlayPhase === "research" && (
              <button
                type="button"
                onClick={advanceToSpeaking}
                className="rounded-full bg-[#d96b43] text-white px-7 py-3 text-sm font-semibold shadow-[0_8px_24px_-8px_rgba(217,107,67,0.65)] hover:brightness-110 active:scale-95 transition cursor-pointer"
              >
                Done researching
              </button>
            )}
            {overlayPhase === "speaking" && (
              <button
                type="button"
                onClick={() => { if (overlayRef.current) clearInterval(overlayRef.current); setOverlayPhase("done"); if (!settings.muteSounds) playChime(); }}
                className="rounded-full bg-[#d96b43] text-white px-7 py-3 text-sm font-semibold shadow-[0_8px_24px_-8px_rgba(217,107,67,0.65)] hover:brightness-110 active:scale-95 transition cursor-pointer"
              >
                Done speaking
              </button>
            )}
            <button
              type="button"
              onClick={closeOverlay}
              className="text-sm text-muted hover:text-fg underline underline-offset-4 transition cursor-pointer px-2 py-1"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
