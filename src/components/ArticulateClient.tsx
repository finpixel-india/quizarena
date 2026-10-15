"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, RotateCcw, Settings2 } from "lucide-react";
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
  try { const s = localStorage.getItem(SETTINGS_KEY); return s ? { ...DEFAULT_SETTINGS, ...JSON.parse(s) } : DEFAULT_SETTINGS; }
  catch { return DEFAULT_SETTINGS; }
}
function persistSettings(s: Settings) { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch {} }

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
    g.gain.setValueAtTime(0.001, t); g.gain.exponentialRampToValueAtTime(0.12, t + 0.003); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.016);
    o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.016);
  } catch {}
}
function playLock() {
  const ctx = getCtx(); if (!ctx) return;
  try {
    const t = ctx.currentTime;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(280, t); o.frequency.exponentialRampToValueAtTime(55, t + 0.06);
    g.gain.setValueAtTime(0.2, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.06);
    const b = ctx.createOscillator(), bg = ctx.createGain();
    b.type = "sine"; b.frequency.setValueAtTime(880, t + 0.02);
    bg.gain.setValueAtTime(0.001, t + 0.02); bg.gain.exponentialRampToValueAtTime(0.1, t + 0.04); bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    b.connect(bg); bg.connect(ctx.destination); b.start(t + 0.02); b.stop(t + 0.5);
  } catch {}
}
function playChime() {
  const ctx = getCtx(); if (!ctx) return;
  try {
    const t = ctx.currentTime;
    [[523.25, 0], [659.25, 0.1], [783.99, 0.22]].forEach(([f, d]) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), s = t + d;
      o.type = "sine"; o.frequency.setValueAtTime(f, s);
      g.gain.setValueAtTime(0.001, s); g.gain.exponentialRampToValueAtTime(0.14, s + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.65);
      o.connect(g); g.connect(ctx.destination); o.start(s); o.stop(s + 0.65);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/55 backdrop-blur-md" />
      <div
        className="relative z-10 w-full max-w-[340px] mx-4 rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl"
        style={{ background: "rgba(18,14,12,0.92)", backdropFilter: "blur(32px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-7">
          <h2 className="font-serif text-2xl font-normal text-fg mb-0.5 tracking-tight">Settings</h2>
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
                "w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center shrink-0 transition-all",
                local.muteSounds ? "bg-[#d96b43] border-[#d96b43]" : "border-white/25 bg-white/[0.04]"
              )}
            >
              {local.muteSounds && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
            </button>
            <span className="text-sm text-fg/85">Mute sound effects</span>
          </label>

          <p className="text-xs text-subtle/70 mb-5">Saved for next time.</p>

          <button
            type="button" onClick={done}
            className="w-full rounded-full bg-[#d96b43] text-white py-3.5 text-[15px] font-semibold hover:brightness-110 active:scale-[0.98] transition cursor-pointer"
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
  const [modeKey, setModeKey] = useState(0); // forces re-mount of mode content for animation
  const [category, setCategory] = useState<ArticulateCategory>("all");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  /* Prompt pool */
  const pool = useMemo(() => {
    const all = ARTICULATE_PROMPTS.filter((p) => p.mode === mode);
    return category === "all" ? all : all.filter((p) => p.category === category);
  }, [mode, category]);

  const [currentPrompt, setCurrentPrompt] = useState<ArticulatePrompt>(() => {
    const p = ARTICULATE_PROMPTS.filter((x) => x.mode === "off-the-cuff");
    return p.find((x) => x.title === "Voicemail") ?? p[0];
  });

  /* ── Slot machine state ── */
  // Instead of blur/opacity tricks, we use a queue of text items that "tick" in
  const [displayText, setDisplayText] = useState(currentPrompt.title);
  const [tickKey, setTickKey] = useState(0); // increment triggers slot-in animation
  const [isSpinning, setIsSpinning] = useState(false);
  const spinTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* ── Off-the-cuff timer ── */
  const [timerState, setTimerState] = useState<"idle" | "running" | "paused" | "done">("idle");
  const [timerLeft, setTimerLeft] = useState<number>(loadSettings().speechMinutes * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Deep research overlay ── */
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayPhase, setOverlayPhase] = useState<"research" | "speaking" | "done">("research");
  const [overlayLeft, setOverlayLeft] = useState(0);
  const [overlayTotal, setOverlayTotal] = useState(0);
  const overlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  /* ── Sync timer when idle ── */
  useEffect(() => {
    if (timerState === "idle") setTimerLeft(settings.speechMinutes * 60);
  }, [settings.speechMinutes, timerState]);

  /* ── Reset timer ── */
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerState("idle");
    setTimerLeft(settings.speechMinutes * 60);
  }, [settings.speechMinutes]);

  /* ── Realistic slot machine spin (2+ seconds, no blur) ── */
  const doSpin = useCallback(() => {
    if (isSpinning) return;
    resetTimer();
    spinTimers.current.forEach(clearTimeout);
    spinTimers.current = [];

    const src = pool.length > 0 ? pool : ARTICULATE_PROMPTS.filter((p) => p.mode === mode);
    const candidates = src.filter((p) => p.id !== currentPrompt.id);
    const finalItem = (candidates.length > 0 ? candidates : src)[
      Math.floor(Math.random() * (candidates.length > 0 ? candidates.length : src.length))
    ];

    setIsSpinning(true);

    // Deceleration curve: fast ticks → slow → land
    // Each entry is [intervalMs, how many ticks at that speed]
    const phases: [number, number][] = [
      [55, 6],   // very fast
      [75, 5],   // fast
      [105, 4],  // medium
      [145, 4],  // slowing
      [195, 3],  // slow
      [260, 2],  // very slow
      [340, 2],  // crawling
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

    // Final land
    const endT = setTimeout(() => {
      setCurrentPrompt(finalItem);
      setDisplayText(finalItem.title);
      setTickKey((k) => k + 1);
      setIsSpinning(false);
      setHasSpun(true);
      if (!settings.muteSounds) playLock();
    }, acc + 120);
    spinTimers.current.push(endT);
  }, [isSpinning, pool, currentPrompt, mode, settings.muteSounds, resetTimer]);

  /* ── Off the cuff timer logic ── */
  const toggleTimer = useCallback(() => {
    if (timerState === "idle") { setTimerState("running"); setTimerLeft(settings.speechMinutes * 60); }
    else if (timerState === "running") { setTimerState("paused"); if (timerRef.current) clearInterval(timerRef.current); }
    else if (timerState === "paused") { setTimerState("running"); }
    else if (timerState === "done") { resetTimer(); }
  }, [timerState, settings.speechMinutes, resetTimer]);

  useEffect(() => {
    if (timerState === "running") {
      timerRef.current = setInterval(() => {
        setTimerLeft((prev) => {
          if (prev <= 1) { clearInterval(timerRef.current!); setTimerState("done"); if (!settings.muteSounds) playChime(); return 0; }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) { clearInterval(timerRef.current); }
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
          if (overlayPhase === "research") advanceToSpeaking();
          else { setOverlayPhase("done"); if (!settings.muteSounds) playChime(); }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (overlayRef.current) clearInterval(overlayRef.current); };
  }, [showOverlay, overlayPhase, advanceToSpeaking, settings.muteSounds]);

  /* ── Mode switch with animation ── */
  const switchMode = (m: ArticulateMode) => {
    if (m === mode) return;
    setMode(m);
    setModeKey((k) => k + 1);
    resetTimer();
    setCategoryOpen(false);
    const src = ARTICULATE_PROMPTS.filter((p) => p.mode === m);
    if (src.length) {
      setCurrentPrompt(src[0]);
      setDisplayText(src[0].title);
    }
  };

  const activeCat = DISPLAY_CATEGORIES.find((c) => c.id === category) ?? DISPLAY_CATEGORIES[0];

  /* ── Font size based on title length ── */
  const titleSize = displayText.length > 32
    ? "text-4xl sm:text-5xl"
    : displayText.length > 18
    ? "text-5xl sm:text-6xl md:text-7xl"
    : "text-5xl sm:text-7xl md:text-8xl";

  return (
    <div className="relative flex flex-1 flex-col items-center w-full min-h-[calc(100dvh-4rem)] overflow-hidden select-none">

      {/* ── Atmospheric glows ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 top-[5%] h-[65vh] w-[55vw] rounded-full [background:radial-gradient(ellipse_at_center,rgba(165,75,30,0.2),transparent_70%)]" />
        <div className="absolute -right-24 top-0 h-[60vh] w-[50vw] rounded-full [background:radial-gradient(ellipse_at_center,rgba(15,75,60,0.18),transparent_70%)]" />
      </div>

      {/* ── Central stack, max 560px, everything centered ── */}
      <div className="flex flex-col items-center w-full max-w-[560px] mx-auto px-5 pt-10 sm:pt-14 pb-10">

        {/* ─── HEADER ─── */}
        <div className="text-center mb-9 sm:mb-11">
          <h1 className="font-serif text-[2.1rem] sm:text-[2.6rem] font-normal tracking-tight text-fg leading-none">
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

        {/* ─── MODE TOGGLE ─── */}
        <div className="flex flex-col items-center w-full mb-7">
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

          {/* Caption + Category — animated when mode changes */}
          <div key={modeKey} className="flex flex-col items-center w-full animate-mode-in">
            <p className="mt-3 text-sm text-muted text-center max-w-xs leading-relaxed">
              {mode === "off-the-cuff"
                ? "Minimal prep. Try to think quick on your feet."
                : "Spin a topic, set a research timer, then start the speech timer whenever you're ready."}
            </p>

            {/* Category selector — BOTH modes */}
            <div className="relative mt-4 w-full max-w-[260px] z-20">
              <button
                type="button"
                onClick={() => setCategoryOpen((v) => !v)}
                className="flex items-center justify-between w-full gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-sm font-medium text-fg hover:bg-white/[0.07] transition cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="leading-none">{activeCat.emoji}</span>
                  <span>{activeCat.label}</span>
                </span>
                {categoryOpen ? <ChevronUp className="w-4 h-4 text-muted shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted shrink-0" />}
              </button>

              {categoryOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setCategoryOpen(false)} />
                  <div
                    className="absolute left-0 right-0 top-full mt-1.5 z-20 rounded-2xl border border-white/[0.1] overflow-hidden animate-fade-in"
                    style={{ background: "rgba(16,12,10,0.97)", backdropFilter: "blur(20px)" }}
                  >
                    <div className="py-1.5 px-1.5 space-y-0.5 max-h-56 overflow-y-auto overscroll-contain scrollbar-none">
                      {DISPLAY_CATEGORIES.map((cat) => {
                        const isActive = category === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => { setCategory(cat.id); setCategoryOpen(false); }}
                            className={cn(
                              "flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm transition cursor-pointer",
                              isActive ? "bg-white/[0.09] text-fg font-medium" : "text-fg/55 hover:text-fg hover:bg-white/[0.05]"
                            )}
                          >
                            <span className="text-base w-5 text-center shrink-0 leading-none">{cat.emoji}</span>
                            <span>{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ─── PROMPT STAGE ─── */}
        <div className="flex flex-col items-center justify-center w-full my-8 sm:my-10 min-h-[110px] sm:min-h-[140px] text-center overflow-hidden">
          <p className={cn(
            "font-mono text-[11px] font-bold tracking-[0.25em] uppercase mb-4 transition-colors duration-300",
            isSpinning ? "text-[#d96b43]/60" : mode === "deep-research" ? "text-[#d96b43]" : "text-[#d96b43]",
          )}>
            {isSpinning ? "SPINNING..." : mode === "deep-research" ? "YOUR TOPIC" : "READY"}
          </p>

          {/* Slot machine text area — fixed height, clip overflow, animate each tick */}
          <div className="w-full overflow-hidden">
            <h2
              key={tickKey}
              className={cn(
                "font-serif font-normal text-fg leading-[1.05] tracking-[-0.01em] max-w-[28ch] mx-auto",
                isSpinning ? "animate-slot-in" : "animate-prompt-land",
                titleSize,
              )}
            >
              {displayText || "\u00A0"}
            </h2>
          </div>
        </div>

        {/* ─── ACTION BAR ─── */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={doSpin}
            disabled={isSpinning}
            className="rounded-full bg-[#d96b43] text-white px-8 py-3 text-[15px] font-semibold shadow-[0_8px_28px_-8px_rgba(217,107,67,0.7)] hover:brightness-110 active:scale-95 transition disabled:opacity-40 cursor-pointer"
          >
            {hasSpun ? "Spin again" : "Spin"}
          </button>

          {/* Inline timer button — adapts to mode */}
          {mode === "off-the-cuff" ? (
            <div className="flex items-center gap-1.5">
              {timerState !== "idle" && (
                <button type="button" onClick={resetTimer} className="w-9 h-9 rounded-full flex items-center justify-center text-subtle hover:text-fg hover:bg-white/[0.07] transition cursor-pointer">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={toggleTimer}
                className={cn(
                  "rounded-full px-5 py-3 text-[15px] font-semibold transition active:scale-95 tabular-nums cursor-pointer border",
                  timerState === "running" ? "bg-[#d96b43]/15 text-[#d96b43] border-[#d96b43]/40"
                    : timerState === "done" ? "bg-danger/10 text-danger border-danger/30"
                    : "bg-transparent text-fg border-white/[0.15] hover:bg-white/[0.06]"
                )}
              >
                {timerState === "idle" && `Start ${settings.speechMinutes} min timer`}
                {timerState === "running" && `${fmt(timerLeft)} — Pause`}
                {timerState === "paused" && `Resume ${fmt(timerLeft)}`}
                {timerState === "done" && "Time's up · Reset"}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={openResearch}
              className="rounded-full px-5 py-3 text-[15px] font-semibold transition active:scale-95 cursor-pointer border bg-transparent text-fg border-white/[0.15] hover:bg-white/[0.06]"
            >
              Start {settings.researchMinutes} min research
            </button>
          )}

          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 text-fg/50 hover:text-fg hover:bg-white/[0.06] transition cursor-pointer"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ─── SETTINGS OVERLAY ─── */}
      {settingsOpen && (
        <SettingsOverlay
          settings={settings}
          onChange={(s) => { setSettings(s); if (timerState === "idle") setTimerLeft(s.speechMinutes * 60); }}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {/* ─── RADIAL RESEARCH OVERLAY ─── */}
      {showOverlay && (() => {
        const isSpeaking = overlayPhase === "speaking";
        const ringColor = isSpeaking ? "#d96b43" : "#38b2ac";
        const speakingThirds = overlayTotal > 0 ? overlayTotal / 3 : 20;
        // Determine active pill: What? (first third), So what? (second), Now what? (last)
        const activePill = overlayLeft > speakingThirds * 2 ? 0 : overlayLeft > speakingThirds ? 1 : 2;
        const PILLS = ["What?", "So what?", "Now what?"];

        return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg/96 backdrop-blur-2xl px-4 animate-fade-in">
          <div className="text-center mb-2">
            <h3 className="font-mono text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#d96b43] mb-2">
              {currentPrompt.title.toUpperCase()}
            </h3>

            {/* Speaking phase pills */}
            {isSpeaking ? (
              <div className="flex items-center justify-center gap-2 mb-2">
                {PILLS.map((pill, i) => (
                  <button
                    key={pill}
                    type="button"
                    className={cn(
                      "rounded-full px-5 py-2 text-sm font-semibold border transition-all duration-300 cursor-default",
                      i === activePill
                        ? "bg-[#1a3a2a] border-[#38b2ac]/40 text-white"
                        : "bg-transparent border-white/[0.12] text-fg/40"
                    )}
                  >
                    {pill}
                  </button>
                ))}
              </div>
            ) : (
              <span className="font-mono text-[11px] font-bold tracking-[0.28em] uppercase" style={{ color: ringColor }}>
                {overlayPhase === "research" ? "RESEARCHING" : "TIME'S UP"}
              </span>
            )}
          </div>

          {/* Ring */}
          <div className="relative my-7" style={{ width: 280, height: 280 }}>
            {(() => {
              const size = 280, sw = 8, r = (size - sw) / 2;
              const circ = 2 * Math.PI * r;
              const pct = overlayTotal > 0 ? overlayLeft / overlayTotal : 0;
              return (
                <>
                  <svg width={size} height={size} className="-rotate-90 absolute inset-0" aria-hidden="true">
                    <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={sw} className="stroke-fg/[0.07]" />
                    <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={sw} strokeLinecap="round"
                      strokeDasharray={circ} strokeDashoffset={circ - pct * circ}
                      style={{ stroke: ringColor }}
                      className="transition-[stroke-dashoffset,stroke] duration-700 ease-linear" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-6xl sm:text-7xl font-normal tabular-nums tracking-tight transition-colors duration-300" style={{ color: ringColor }}>
                      {fmt(overlayLeft)}
                    </span>
                  </div>
                </>
              );
            })()}
          </div>

          <p className="font-serif text-sm text-muted mb-5 italic">
            {overlayPhase === "research" ? "Research." : overlayPhase === "speaking" ? "Speak." : "Time's up."}
          </p>

          <div className="flex items-center gap-4">
            {overlayPhase === "research" && (
              <button type="button" onClick={advanceToSpeaking}
                className="rounded-full bg-[#d96b43] text-white px-7 py-3 text-sm font-semibold shadow-[0_8px_24px_-8px_rgba(217,107,67,0.65)] hover:brightness-110 active:scale-95 transition cursor-pointer">
                Done researching
              </button>
            )}
            {overlayPhase === "speaking" && (
              <button type="button" onClick={() => { if (overlayRef.current) clearInterval(overlayRef.current); setOverlayPhase("done"); if (!settings.muteSounds) playChime(); }}
                className="rounded-full bg-[#d96b43] text-white px-7 py-3 text-sm font-semibold shadow-[0_8px_24px_-8px_rgba(217,107,67,0.65)] hover:brightness-110 active:scale-95 transition cursor-pointer">
                Done speaking
              </button>
            )}
            <button type="button" onClick={closeOverlay}
              className="text-sm text-muted hover:text-fg underline underline-offset-4 cursor-pointer transition px-2 py-1">
              Close
            </button>
          </div>
        </div>
        );
      })()}
    </div>
  );
}
