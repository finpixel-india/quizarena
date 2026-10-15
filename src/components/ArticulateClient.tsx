"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, RotateCcw, Play, Pause, Settings2, X } from "lucide-react";
import { ARTICULATE_PROMPTS, type ArticulateCategory, type ArticulateMode, type ArticulatePrompt } from "@/data/articulate/prompts";
import { cn } from "@/lib/format";

/* ─── Category Definitions ───────────────────────────────────────────────── */
const DISPLAY_CATEGORIES: { id: ArticulateCategory; label: string; emoji: string }[] = [
  { id: "all",         label: "General",      emoji: "✦" },
  { id: "philosophy",  label: "Philosophy",   emoji: "🏛️" },
  { id: "technology",  label: "Tech / AI",    emoji: "⚡" },
  { id: "society",     label: "Society",      emoji: "🌐" },
  { id: "personal",    label: "Personal",     emoji: "💰" },
  { id: "curveballs",  label: "Curveballs",   emoji: "🎲" },
];

/* ─── Settings ───────────────────────────────────────────────────────────── */
interface Settings { speechMinutes: number; researchMinutes: number; muteSounds: boolean; }
const DEFAULT_SETTINGS: Settings = { speechMinutes: 1, researchMinutes: 5, muteSounds: false };
const SETTINGS_KEY = "ql-articulate-v3";

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
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <div
        className="relative z-10 w-full max-w-[340px] rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl"
        style={{ background: "rgba(18,14,12,0.92)", backdropFilter: "blur(32px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between mb-1">
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
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-[#d96b43]">Speech</span>
              <span className="text-lg font-bold text-fg tabular-nums">{local.speechMinutes} min</span>
            </div>
            <Slider min={1} max={10} value={local.speechMinutes} onChange={(v) => upd({ speechMinutes: v })} />
            <div className="flex justify-between mt-2">
              <span className="text-[10px] font-mono text-subtle">1 min</span>
              <span className="text-[10px] font-mono text-subtle">10 min</span>
            </div>
          </div>

          {/* RESEARCH */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-[#d96b43]">Research</span>
              <span className="text-lg font-bold text-fg tabular-nums">{local.researchMinutes} min</span>
            </div>
            <Slider min={1} max={60} value={local.researchMinutes} onChange={(v) => upd({ researchMinutes: v })} />
            <div className="flex justify-between mt-2">
              <span className="text-[10px] font-mono text-subtle">1 min</span>
              <span className="text-[10px] font-mono text-subtle">60 min</span>
            </div>
            <p className="text-xs text-subtle mt-1.5">Deep research only</p>
          </div>

          <div className="h-px bg-white/[0.07] mb-5" />

          <label className="flex items-center gap-3 cursor-pointer select-none mb-5">
            <button
              type="button"
              onClick={() => upd({ muteSounds: !local.muteSounds })}
              className={cn(
                "w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center shrink-0 transition-all cursor-pointer",
                local.muteSounds ? "bg-[#d96b43] border-[#d96b43]" : "border-white/25 bg-white/[0.04]"
              )}
            >
              {local.muteSounds && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
            </button>
            <span className="text-sm text-fg/85">Mute sound effects</span>
          </label>

          <button
            type="button"
            onClick={done}
            className="w-full rounded-full bg-[#d96b43] text-white py-3.5 text-[15px] font-semibold hover:brightness-110 active:scale-[0.98] transition cursor-pointer shadow-[0_4px_16px_rgba(217,107,67,0.35)]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function ArticulateClient() {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [mode, setMode] = useState<ArticulateMode>("off-the-cuff");
  const [modeKey, setModeKey] = useState(0);
  const [category, setCategory] = useState<ArticulateCategory>("all");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  /* Ref for outside click on category dropdown */
  const catRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCategoryOpen(false);
      }
    }
    if (categoryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [categoryOpen]);

  /* Prompt pool */
  const pool = useMemo(() => {
    const all = ARTICULATE_PROMPTS.filter((p) => p.mode === mode);
    return category === "all" ? all : all.filter((p) => p.category === category);
  }, [mode, category]);

  const [currentPrompt, setCurrentPrompt] = useState<ArticulatePrompt>(() => {
    const p = ARTICULATE_PROMPTS.filter((x) => x.mode === "off-the-cuff");
    return p.find((x) => x.title === "Voicemail") ?? p[0];
  });

  /* ── Slot machine spinning state ── */
  const [displayText, setDisplayText] = useState(currentPrompt.title);
  const [tickKey, setTickKey] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* ── Fullscreen Glassmorphism Timer Page State ── */
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayPhase, setOverlayPhase] = useState<"research" | "speaking" | "done">("speaking");
  const [overlayLeft, setOverlayLeft] = useState(0);
  const [overlayTotal, setOverlayTotal] = useState(0);
  const [isOverlayPaused, setIsOverlayPaused] = useState(false);
  const overlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  /* ── Spin Logic (contained, stable) ── */
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

    // Deceleration curve
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
    setIsOverlayPaused(false);
    setShowOverlay(true);
  }, [settings.speechMinutes]);

  const startDeepResearch = useCallback(() => {
    const secs = settings.researchMinutes * 60;
    setOverlayPhase("research");
    setOverlayTotal(secs);
    setOverlayLeft(secs);
    setIsOverlayPaused(false);
    setShowOverlay(true);
  }, [settings.researchMinutes]);

  const advanceToSpeaking = useCallback(() => {
    if (overlayRef.current) clearInterval(overlayRef.current);
    if (!settings.muteSounds) playChime();
    const secs = settings.speechMinutes * 60;
    setOverlayPhase("speaking");
    setOverlayTotal(secs);
    setOverlayLeft(secs);
    setIsOverlayPaused(false);
  }, [settings.speechMinutes, settings.muteSounds]);

  const toggleOverlayPause = useCallback(() => {
    setIsOverlayPaused((p) => !p);
  }, []);

  const restartOverlay = useCallback(() => {
    const secs = overlayPhase === "research" ? settings.researchMinutes * 60 : settings.speechMinutes * 60;
    setOverlayTotal(secs);
    setOverlayLeft(secs);
    setIsOverlayPaused(false);
  }, [overlayPhase, settings.researchMinutes, settings.speechMinutes]);

  const closeOverlay = useCallback(() => {
    if (overlayRef.current) clearInterval(overlayRef.current);
    setShowOverlay(false);
  }, []);

  /* ── Countdown Loop ── */
  useEffect(() => {
    if (!showOverlay || isOverlayPaused || overlayPhase === "done") {
      if (overlayRef.current) clearInterval(overlayRef.current);
      return;
    }

    overlayRef.current = setInterval(() => {
      setOverlayLeft((prev) => {
        if (prev <= 1) {
          clearInterval(overlayRef.current!);
          if (overlayPhase === "research") {
            advanceToSpeaking();
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
  }, [showOverlay, isOverlayPaused, overlayPhase, advanceToSpeaking, settings.muteSounds]);

  /* ── Mode switch ── */
  const switchMode = (m: ArticulateMode) => {
    if (m === mode) return;
    setMode(m);
    setModeKey((k) => k + 1);
    setCategoryOpen(false);
    const src = ARTICULATE_PROMPTS.filter((p) => p.mode === m);
    if (src.length) {
      setCurrentPrompt(src[0]);
      setDisplayText(src[0].title);
    }
  };

  const activeCat = DISPLAY_CATEGORIES.find((c) => c.id === category) ?? DISPLAY_CATEGORIES[0];

  return (
    <div className="relative flex flex-1 flex-col items-center justify-between w-full min-h-[calc(100dvh-4rem)] overflow-hidden select-none">

      {/* ── Atmospheric glows ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 top-[5%] h-[65vh] w-[55vw] rounded-full [background:radial-gradient(ellipse_at_center,rgba(165,75,30,0.18),transparent_70%)]" />
        <div className="absolute -right-24 top-0 h-[60vh] w-[50vw] rounded-full [background:radial-gradient(ellipse_at_center,rgba(217,107,67,0.12),transparent_70%)]" />
      </div>

      {/* ── Main Vertical Content Stack ── */}
      <div className="flex flex-col items-center w-full max-w-[560px] mx-auto px-5 pt-8 sm:pt-12 pb-8 flex-1 justify-center">

        {/* ─── HEADER ─── */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-serif text-[2.2rem] sm:text-[2.7rem] font-normal tracking-tight text-fg leading-none">
            Articulate
          </h1>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-muted">
            <span>made by</span>
            <a
              href="https://instagram.com/ur.spideey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-fg/75 hover:text-fg hover:border-white/20 transition"
            >
              <IgIcon />
              @ur.spideey
            </a>
          </div>
        </div>

        {/* ─── MODE TOGGLE & CATEGORY DROPDOWN (z-30 ensures dropdown floats above prompt) ─── */}
        <div className="relative z-30 flex flex-col items-center w-full mb-4">
          <div className="inline-flex p-1 rounded-full border border-white/[0.1] bg-white/[0.04]">
            {(["off-the-cuff", "deep-research"] as ArticulateMode[]).map((m) => {
              const active = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => switchMode(m)}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer",
                    active ? "bg-[#d96b43] text-white shadow-[0_2px_16px_-4px_rgba(217,107,67,0.7)]" : "text-fg/45 hover:text-fg/70",
                  )}
                >
                  <span className={cn(
                    "w-2 h-2 rounded-full shrink-0 transition-all duration-300",
                    active ? (m === "off-the-cuff" ? "bg-pink-200" : "bg-sky-200") : "bg-current opacity-40"
                  )} />
                  {m === "off-the-cuff" ? "Off the cuff" : "Deep research"}
                </button>
              );
            })}
          </div>

          {/* Subtitle Caption */}
          <p key={modeKey} className="mt-3 text-sm text-muted text-center max-w-xs leading-relaxed animate-mode-in">
            {mode === "off-the-cuff"
              ? "Minimal prep. Try to think quick on your feet."
              : "Spin a topic, set a research timer, then speak with structure."}
          </p>

          {/* Category Selector with Native Outside-Click Handling */}
          <div ref={catRef} className="relative mt-3.5 w-full max-w-[260px]">
            <button
              type="button"
              onClick={() => setCategoryOpen((v) => !v)}
              className="flex items-center justify-between w-full gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-sm font-medium text-fg hover:bg-white/[0.08] transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="leading-none">{activeCat.emoji}</span>
                <span>{activeCat.label}</span>
              </span>
              {categoryOpen ? <ChevronUp className="w-4 h-4 text-muted shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted shrink-0" />}
            </button>

            {categoryOpen && (
              <div
                className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-white/[0.12] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-fade-in"
                style={{ background: "rgba(22, 18, 15, 0.97)" }}
              >
                <div className="space-y-0.5 max-h-56 overflow-y-auto overscroll-contain scrollbar-none">
                  {DISPLAY_CATEGORIES.map((cat) => {
                    const isActive = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => { setCategory(cat.id); setCategoryOpen(false); }}
                        className={cn(
                          "flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm transition cursor-pointer text-left",
                          isActive ? "bg-white/[0.1] text-fg font-medium" : "text-fg/60 hover:text-fg hover:bg-white/[0.05]"
                        )}
                      >
                        <span className="text-base w-5 text-center shrink-0 leading-none">{cat.emoji}</span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── PROMPT STAGE (Strictly height-locked so buttons NEVER move) ─── */}
        <div className="relative z-10 w-full h-[180px] sm:h-[210px] flex-shrink-0 my-3 sm:my-5 flex flex-col items-center justify-center text-center overflow-hidden select-none">
          <p className="h-5 flex-shrink-0 font-mono text-[11px] font-bold tracking-[0.25em] uppercase mb-2 text-[#d96b43]">
            {isSpinning ? "SPINNING..." : mode === "deep-research" ? "YOUR TOPIC" : "READY"}
          </p>

          <div className="w-full h-[130px] sm:h-[150px] flex-shrink-0 flex items-center justify-center px-4 overflow-hidden">
            <h2
              key={tickKey}
              className={cn(
                "font-serif font-normal text-fg leading-[1.14] tracking-[-0.015em] max-w-[22ch] mx-auto text-3xl sm:text-4xl md:text-5xl line-clamp-3",
                isSpinning ? "animate-slot-in" : "animate-prompt-land",
              )}
            >
              {displayText || "\u00A0"}
            </h2>
          </div>
        </div>

        {/* ─── ACTION BAR (Always rock-solid stationary) ─── */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={doSpin}
            disabled={isSpinning}
            className="rounded-full bg-[#d96b43] text-white px-8 py-3 text-[15px] font-semibold shadow-[0_8px_28px_-8px_rgba(217,107,67,0.7)] hover:brightness-110 active:scale-95 transition disabled:opacity-40 cursor-pointer"
          >
            {hasSpun ? "Spin again" : "Spin"}
          </button>

          {/* Action button opens fullscreen glassmorphism timer page */}
          {mode === "off-the-cuff" ? (
            <button
              type="button"
              onClick={startOffTheCuff}
              className="rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] text-fg px-6 py-3 text-[15px] font-semibold transition active:scale-95 cursor-pointer"
            >
              Start {settings.speechMinutes} min timer
            </button>
          ) : (
            <button
              type="button"
              onClick={startDeepResearch}
              className="rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] text-fg px-6 py-3 text-[15px] font-semibold transition active:scale-95 cursor-pointer"
            >
              Start {settings.researchMinutes} min research
            </button>
          )}

          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 text-fg/50 hover:text-fg hover:bg-white/[0.06] transition cursor-pointer"
            title="Timer Settings"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ─── SETTINGS MODAL ─── */}
      {settingsOpen && (
        <SettingsOverlay
          settings={settings}
          onChange={(s) => setSettings(s)}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {/* ─── FULLSCREEN GLASSMORPHISM TIMER PAGE (Theme-aligned, Zero Green) ─── */}
      {showOverlay && (() => {
        const isResearch = overlayPhase === "research";
        const isSpeaking = overlayPhase === "speaking";
        const isDone = overlayPhase === "done";
        const pct = overlayTotal > 0 ? overlayLeft / overlayTotal : 0;

        // Structure Pills for speaking practice (What? / So what? / Now what?)
        const speakingThirds = overlayTotal > 0 ? overlayTotal / 3 : 20;
        const activePill = overlayLeft > speakingThirds * 2 ? 0 : overlayLeft > speakingThirds ? 1 : 2;
        const PILLS = [
          { title: "What?", desc: "The core point" },
          { title: "So what?", desc: "Why it matters" },
          { title: "Now what?", desc: "Action or takeaway" },
        ];

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden animate-fade-in select-none">
            {/* Atmospheric Glass Backdrop */}
            <div
              className="absolute inset-0 bg-black/75 backdrop-blur-2xl"
              onClick={closeOverlay}
            />

            {/* Ambient Radial Theme Aura */}
            <div className="pointer-events-none absolute w-[460px] h-[460px] rounded-full bg-[#d96b43]/15 blur-[120px]" />

            {/* Central Glass Card */}
            <div
              className="relative z-10 w-full max-w-[480px] rounded-3xl border border-white/[0.12] p-7 sm:p-9 flex flex-col items-center text-center shadow-[0_24px_64px_-16px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-3xl"
              style={{ background: "rgba(18, 14, 12, 0.88)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Phase Badge */}
              <div className="mb-2">
                {isResearch ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d96b43]/35 bg-[#d96b43]/10 px-3.5 py-1 text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#d96b43]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d96b43] animate-pulse" />
                    Research Phase
                  </span>
                ) : isSpeaking ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d96b43]/35 bg-[#d96b43]/10 px-3.5 py-1 text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#d96b43]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d96b43] animate-pulse" />
                    Speaking Practice
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-danger/40 bg-danger/10 px-3.5 py-1 text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-danger">
                    Time&apos;s Up!
                  </span>
                )}
              </div>

              {/* Topic Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg leading-snug tracking-tight my-2 max-w-[24ch]">
                {currentPrompt.title}
              </h2>

              {/* Structure Pills during Speaking Phase (NO GREEN, Theme-aligned Warm Orange & Glass) */}
              {isSpeaking && (
                <div className="flex items-center justify-center gap-2 my-3 w-full">
                  {PILLS.map((pill, idx) => {
                    const active = idx === activePill;
                    return (
                      <div
                        key={pill.title}
                        className={cn(
                          "flex flex-col items-center flex-1 py-2 px-1 rounded-2xl border transition-all duration-300",
                          active
                            ? "bg-[#d96b43] border-[#d96b43] text-white shadow-[0_4px_20px_rgba(217,107,67,0.45)] scale-[1.03]"
                            : "bg-white/[0.04] border-white/[0.08] text-white/50"
                        )}
                      >
                        <span className="text-xs font-semibold leading-none">{pill.title}</span>
                        <span className={cn("text-[10px] mt-1 leading-none", active ? "text-white/85" : "text-white/40")}>
                          {pill.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Radial Timer Ring */}
              <div className="relative my-5" style={{ width: 240, height: 240 }}>
                {(() => {
                  const size = 240, sw = 8, r = (size - sw) / 2;
                  const circ = 2 * Math.PI * r;
                  const offset = circ - pct * circ;
                  return (
                    <>
                      <svg width={size} height={size} className="-rotate-90 absolute inset-0" aria-hidden="true">
                        <circle
                          cx={size / 2} cy={size / 2} r={r}
                          fill="none" strokeWidth={sw}
                          className="stroke-white/[0.08]"
                        />
                        <circle
                          cx={size / 2} cy={size / 2} r={r}
                          fill="none" strokeWidth={sw} strokeLinecap="round"
                          strokeDasharray={circ}
                          strokeDashoffset={offset}
                          className="stroke-[#d96b43] transition-[stroke-dashoffset] duration-700 ease-linear"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-serif text-6xl sm:text-7xl font-normal tabular-nums tracking-tight text-fg">
                          {fmt(overlayLeft)}
                        </span>
                        <span className="text-xs font-mono tracking-widest uppercase text-muted mt-1">
                          {isOverlayPaused ? "Paused" : isResearch ? "Researching" : isSpeaking ? "Speaking" : "Finished"}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Context Guidance Caption */}
              <p className="text-sm text-muted max-w-xs mb-6 leading-relaxed italic">
                {isResearch
                  ? "Take notes and organize your thoughts."
                  : isSpeaking
                  ? "Speak. Structure your argument."
                  : "Time is up! Great practice."}
              </p>

              {/* Timer Page Control Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full justify-center">
                {!isDone && (
                  <button
                    type="button"
                    onClick={toggleOverlayPause}
                    className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-5 py-2.5 text-sm font-semibold text-fg transition active:scale-95 cursor-pointer"
                  >
                    {isOverlayPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                    {isOverlayPaused ? "Resume" : "Pause"}
                  </button>
                )}

                {isResearch && (
                  <button
                    type="button"
                    onClick={advanceToSpeaking}
                    className="rounded-full bg-[#d96b43] text-white px-5 py-2.5 text-sm font-semibold shadow-[0_6px_20px_rgba(217,107,67,0.4)] hover:brightness-110 active:scale-95 transition cursor-pointer"
                  >
                    Done researching →
                  </button>
                )}

                <button
                  type="button"
                  onClick={restartOverlay}
                  className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-fg/70 hover:text-fg transition active:scale-95 cursor-pointer"
                  title="Restart timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restart
                </button>

                <button
                  type="button"
                  onClick={closeOverlay}
                  className="rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-fg/70 hover:text-fg transition active:scale-95 cursor-pointer"
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
