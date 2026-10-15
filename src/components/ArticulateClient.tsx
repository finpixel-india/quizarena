"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, Settings2, X } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none" onClick={onClose}>
      <div className="absolute inset-0 bg-black/65 backdrop-blur-md" />
      <div
        className="relative z-10 w-full max-w-[350px] rounded-3xl overflow-hidden border border-white/[0.12] shadow-2xl"
        style={{ background: "rgba(18,14,12,0.94)", backdropFilter: "blur(32px)" }}
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
    return p[0];
  });

  /* ── Slot machine spinning state ── */
  const [displayText, setDisplayText] = useState(currentPrompt.title);
  const [tickKey, setTickKey] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* ── Randomize default topic on client load so it never remains the same ── */
  useEffect(() => {
    const p = ARTICULATE_PROMPTS.filter((x) => x.mode === mode);
    if (p.length > 0) {
      const rand = p[Math.floor(Math.random() * p.length)];
      setCurrentPrompt(rand);
      setDisplayText(rand.title);
    }
  }, []);

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
    const src = category === "all"
      ? ARTICULATE_PROMPTS.filter((p) => p.mode === m)
      : ARTICULATE_PROMPTS.filter((p) => p.mode === m && p.category === category);
    const cand = src.length > 0 ? src : ARTICULATE_PROMPTS.filter((p) => p.mode === m);
    if (cand.length) {
      const rand = cand[Math.floor(Math.random() * cand.length)];
      setCurrentPrompt(rand);
      setDisplayText(rand.title);
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

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center w-full min-h-[calc(100dvh-4rem)] overflow-hidden select-none">

      {/* ── Atmospheric glows ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 top-[5%] h-[65vh] w-[55vw] rounded-full [background:radial-gradient(ellipse_at_center,rgba(165,75,30,0.18),transparent_70%)]" />
        <div className="absolute -right-24 top-0 h-[60vh] w-[50vw] rounded-full [background:radial-gradient(ellipse_at_center,rgba(217,107,67,0.12),transparent_70%)]" />
      </div>

      {/* ── Main Centered Stack (Symmetric on mobile & desktop) ── */}
      <div className="flex flex-col items-center w-full max-w-[560px] mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 justify-center text-center">

        {/* ─── HEADER ─── */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-serif text-[2.6rem] sm:text-[3.3rem] font-normal tracking-tight text-fg leading-none">
            Articulate
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2.5 text-sm text-muted">
            <span>made by</span>
            <a
              href="https://instagram.com/ur.spideey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-fg/80 hover:text-fg hover:border-white/20 transition"
            >
              <IgIcon />
              @ur.spideey
            </a>
          </div>
        </div>

        {/* ─── MODE TOGGLE & CATEGORY DROPDOWN ─── */}
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
                    "flex items-center gap-2 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-[14px] sm:text-[15px] font-semibold transition-all duration-300 cursor-pointer",
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
          <p key={modeKey} className="mt-3.5 text-[15px] sm:text-base text-muted text-center max-w-sm leading-relaxed animate-mode-in">
            {mode === "off-the-cuff"
              ? "Minimal prep. Try to think quick on your feet."
              : "Spin a topic, set a research timer, then speak with structure."}
          </p>

          {/* Category Selector with Native Outside-Click Handling */}
          <div ref={catRef} className="relative mt-4 w-full max-w-[280px]">
            <button
              type="button"
              onClick={() => setCategoryOpen((v) => !v)}
              className="flex items-center justify-between w-full gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4.5 py-2.5 text-[15px] font-medium text-fg hover:bg-white/[0.08] transition cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <span className="text-base leading-none">{activeCat.emoji}</span>
                <span>{activeCat.label}</span>
              </span>
              {categoryOpen ? <ChevronUp className="w-4 h-4 text-muted shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted shrink-0" />}
            </button>

            {categoryOpen && (
              <div
                className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-white/[0.12] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-fade-in"
                style={{ background: "rgba(22, 18, 15, 0.97)" }}
              >
                <div className="space-y-0.5 max-h-60 overflow-y-auto overscroll-contain scrollbar-none">
                  {DISPLAY_CATEGORIES.map((cat) => {
                    const isActive = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectCategory(cat.id)}
                        className={cn(
                          "flex items-center w-full gap-3 px-3.5 py-2.5 rounded-xl text-[14px] sm:text-[15px] transition cursor-pointer text-left",
                          isActive ? "bg-white/[0.1] text-fg font-medium" : "text-fg/60 hover:text-fg hover:bg-white/[0.05]"
                        )}
                      >
                        <span className="text-lg w-5 text-center shrink-0 leading-none">{cat.emoji}</span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── PROMPT STAGE (Strictly height-locked, text scaled up comfortably) ─── */}
        <div className="relative z-10 w-full h-[190px] sm:h-[220px] flex-shrink-0 my-3 sm:my-5 flex flex-col items-center justify-center text-center overflow-hidden select-none">
          <p className="h-5 flex-shrink-0 font-mono text-xs sm:text-[13px] font-bold tracking-[0.25em] uppercase mb-1.5 text-[#d96b43]">
            {isSpinning ? "SPINNING..." : mode === "deep-research" ? "RESEARCH TOPIC" : "VOCAB PROMPT"}
          </p>

          <div className="w-full flex-1 flex flex-col items-center justify-center px-3 sm:px-4 overflow-hidden">
            <h2
              key={tickKey}
              className={cn(
                "font-serif font-normal text-fg leading-[1.12] tracking-[-0.015em] max-w-[20ch] mx-auto text-[2.2rem] sm:text-[3rem] md:text-[3.5rem] line-clamp-2",
                isSpinning ? "animate-slot-in" : "animate-prompt-land",
              )}
            >
              {displayText || "\u00A0"}
            </h2>
            {!isSpinning && currentPrompt.context && (
              <p className="mt-2 text-xs sm:text-sm text-muted/80 max-w-[42ch] mx-auto line-clamp-2 italic font-serif">
                &ldquo;{currentPrompt.context}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* ─── ACTION BAR (Symmetric & responsive on mobile) ─── */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 w-full max-w-[460px] px-1">
          <button
            type="button"
            onClick={doSpin}
            disabled={isSpinning}
            className="flex-1 sm:flex-initial rounded-full bg-[#d96b43] text-white px-5 sm:px-8 py-3.5 text-[15px] sm:text-base font-semibold shadow-[0_8px_28px_-8px_rgba(217,107,67,0.7)] hover:brightness-110 active:scale-95 transition disabled:opacity-40 cursor-pointer whitespace-nowrap text-center"
          >
            {hasSpun ? "Spin again" : "Spin"}
          </button>

          {/* Action button */}
          {mode === "off-the-cuff" ? (
            <button
              type="button"
              onClick={startOffTheCuff}
              className="flex-1 sm:flex-initial rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] text-fg px-4 sm:px-7 py-3.5 text-[15px] sm:text-base font-semibold transition active:scale-95 cursor-pointer whitespace-nowrap text-center"
            >
              Start {settings.speechMinutes} min timer
            </button>
          ) : (
            <button
              type="button"
              onClick={startDeepResearch}
              className="flex-1 sm:flex-initial rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] text-fg px-4 sm:px-7 py-3.5 text-[15px] sm:text-base font-semibold transition active:scale-95 cursor-pointer whitespace-nowrap text-center"
            >
              Start {settings.researchMinutes} min research
            </button>
          )}

          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="w-12 h-12 shrink-0 rounded-full border border-white/15 text-fg/50 hover:text-fg hover:bg-white/[0.06] transition flex items-center justify-center cursor-pointer"
            title="Timer Settings"
          >
            <Settings2 className="w-5 h-5" />
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
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 py-6 sm:py-8 bg-[#0d0d0f]/98 backdrop-blur-3xl animate-fade-in select-none">
            {/* Ambient Radial Theme Aura */}
            <div className="pointer-events-none absolute w-[520px] h-[520px] rounded-full bg-[#d96b43]/12 blur-[140px]" />

            {/* Main Column — Clean, Spaced, Symmetrical on Phone */}
            <div className="relative z-10 flex flex-col items-center text-center w-full max-w-lg mx-auto">
              
              {/* Topic Title & Context */}
              <h2 className="font-mono text-xs sm:text-sm font-bold tracking-[0.24em] uppercase text-[#d96b43] mb-1.5 max-w-[32ch] px-4 leading-relaxed">
                {currentPrompt.title}
              </h2>
              {currentPrompt.context && (
                <p className="text-xs sm:text-[13px] text-muted/70 italic font-serif max-w-sm px-4 mb-2.5 line-clamp-2">
                  &ldquo;{currentPrompt.context}&rdquo;
                </p>
              )}

              {/* Subtitle / Structure Pills */}
              <div className="min-h-[44px] flex items-center justify-center mb-1 sm:mb-2">
                {isResearch ? (
                  <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.3em] uppercase text-[#d96b43]/90">
                    RESEARCHING
                  </span>
                ) : (
                  /* Speaking / Ready: The 3 Pill buttons */
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5 px-2">
                    {PILLS.map((pill, idx) => {
                      const active = idx === activePill;
                      return (
                        <div
                          key={pill.title}
                          className={cn(
                            "flex items-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border transition-all duration-300",
                            active
                              ? "bg-[#d96b43]/20 border-[#d96b43] text-white shadow-[0_0_18px_rgba(217,107,67,0.35)]"
                              : "bg-white/[0.04] border-white/[0.1] text-white/45"
                          )}
                        >
                          <span className="text-xs sm:text-sm font-semibold">{pill.title}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Thick Glassmorphism Radial Timer Ring (Fluid responsive width) */}
              <div className="relative my-6 sm:my-8 flex items-center justify-center w-[270px] h-[270px] sm:w-[330px] sm:h-[330px]">
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
                    className="font-serif text-7xl sm:text-8xl md:text-9xl font-normal tabular-nums tracking-tight leading-none"
                    style={{ color: "#d96b43" }}
                  >
                    {fmt(overlayLeft)}
                  </span>
                </div>
              </div>

              {/* Status Caption */}
              <p className="font-serif text-xl sm:text-2xl text-fg/85 italic mb-6 sm:mb-7">
                {isResearch
                  ? "Research."
                  : isReadyToSpeak
                  ? "Ready."
                  : isSpeaking
                  ? "Speak."
                  : "Time's up."}
              </p>

              {/* Action Controls Matching Reference Screenshot */}
              <div className="flex items-center justify-center gap-4">
                {isResearch && (
                  <button
                    type="button"
                    onClick={finishResearch}
                    className="rounded-full bg-[#d96b43] text-white px-8 py-3.5 text-base font-semibold hover:brightness-110 active:scale-95 transition shadow-[0_8px_24px_-6px_rgba(217,107,67,0.6)] cursor-pointer"
                  >
                    Done researching
                  </button>
                )}

                {isReadyToSpeak && (
                  <button
                    type="button"
                    onClick={startSpeakingCountdown}
                    className="rounded-full bg-[#d96b43] text-white px-10 py-3.5 text-base font-semibold hover:brightness-110 active:scale-95 transition shadow-[0_8px_24px_-6px_rgba(217,107,67,0.6)] cursor-pointer"
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
                    className="rounded-full bg-[#d96b43] text-white px-8 py-3.5 text-base font-semibold hover:brightness-110 active:scale-95 transition shadow-[0_8px_24px_-6px_rgba(217,107,67,0.6)] cursor-pointer"
                  >
                    Done speaking
                  </button>
                )}

                {isDone && (
                  <button
                    type="button"
                    onClick={closeOverlay}
                    className="rounded-full bg-[#d96b43] text-white px-8 py-3.5 text-base font-semibold hover:brightness-110 active:scale-95 transition shadow-[0_8px_24px_-6px_rgba(217,107,67,0.6)] cursor-pointer"
                  >
                    Finish
                  </button>
                )}

                <button
                  type="button"
                  onClick={closeOverlay}
                  className="text-base text-muted hover:text-fg underline underline-offset-4 cursor-pointer transition px-3 py-1.5"
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
