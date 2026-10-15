"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Clock, RotateCcw, Settings2, X } from "lucide-react";
import {
  ARTICULATE_CATEGORIES,
  ARTICULATE_PROMPTS,
  type ArticulateCategory,
  type ArticulateMode,
  type ArticulatePrompt,
} from "@/data/articulate/prompts";
import { cn } from "@/lib/format";

/* ─── Settings Interface & Defaults ─────────────────────────────────────── */
interface ArticulateSettings {
  offCuffSeconds: number;
  researchSeconds: number;
  speakingSeconds: number;
  soundSpin: boolean;
  soundChime: boolean;
  showGuidingThought: boolean;
  autoStartTimer: boolean;
}

const DEFAULT_SETTINGS: ArticulateSettings = {
  offCuffSeconds: 60,
  researchSeconds: 300,
  speakingSeconds: 120,
  soundSpin: true,
  soundChime: true,
  showGuidingThought: true,
  autoStartTimer: false,
};

const SETTINGS_KEY = "ql-articulate-settings";

function loadSavedSettings(): ArticulateSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveSettings(settings: ArticulateSettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {}
}

/* ─── Minimal Instagram SVG Icon ────────────────────────────────────────── */
function InstagramIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* ─── Web Audio API Sound Synthesizer ──────────────────────────────────── */
class SoundEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  // Realistic mechanical reel ticker click
  playTick(pitch = 750) {
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.022);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.16, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.022);
    } catch {}
  }

  // Mechanical lock-in ratchet & subtle bell when spin lands
  playLock() {
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // Heavy lock thud
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.05);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);

      // Sweet resolving harmonic bell
      const bell = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bell.type = "sine";
      bell.frequency.setValueAtTime(880, now + 0.015);
      bellGain.gain.setValueAtTime(0.001, now + 0.015);
      bellGain.gain.exponentialRampToValueAtTime(0.12, now + 0.035);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
      bell.connect(bellGain);
      bellGain.connect(this.ctx.destination);
      bell.start(now + 0.015);
      bell.stop(now + 0.55);
    } catch {}
  }

  // Soft triad chime when countdown reaches 0:00
  playChime() {
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const playTone = (freq: number, start: number, dur: number) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.18, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + dur);
      };

      playTone(523.25, now, 0.45);        // C5
      playTone(659.25, now + 0.12, 0.55); // E5
      playTone(783.99, now + 0.24, 0.75); // G5
    } catch {}
  }
}

const sounds = new SoundEngine();

export default function ArticulateClient() {
  /* ─── State ──────────────────────────────────────────────────────────── */
  const [settings, setSettings] = useState<ArticulateSettings>(loadSavedSettings);
  const [mode, setMode] = useState<ArticulateMode>("off-the-cuff");
  const [category, setCategory] = useState<ArticulateCategory>("all");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Active prompt
  const initialPool = useMemo(() => {
    return ARTICULATE_PROMPTS.filter((p) => p.mode === "off-the-cuff");
  }, []);

  const [currentPrompt, setCurrentPrompt] = useState<ArticulatePrompt>(() => {
    return initialPool.find((p) => p.title === "Voicemail") ?? initialPool[0];
  });

  // Slot machine spin animation state
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDisplayTitle, setSpinDisplayTitle] = useState("");
  const [spinVelocityY, setSpinVelocityY] = useState(0);
  const spinTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // In-place Timer (Off the cuff)
  const [timerStatus, setTimerStatus] = useState<"idle" | "running" | "paused" | "completed">("idle");
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(() => settings.offCuffSeconds);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Deep Research Fullscreen Radial Overlay (Screenshot 2)
  const [showRadialOverlay, setShowRadialOverlay] = useState(false);
  const [radialPhase, setRadialPhase] = useState<"research" | "speaking" | "done">("research");
  const [radialSecondsLeft, setRadialSecondsLeft] = useState(() => settings.researchSeconds);
  const [radialTotalSeconds, setRadialTotalSeconds] = useState(() => settings.researchSeconds);
  const radialIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered pool
  const currentPool = useMemo(() => {
    return ARTICULATE_PROMPTS.filter((p) => {
      const modeMatch = p.mode === mode;
      const catMatch = category === "all" ? true : p.category === category;
      return modeMatch && catMatch;
    });
  }, [mode, category]);

  // Format time (e.g. 0:59, 4:58)
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /* ─── Mode Switching ─────────────────────────────────────────────────── */
  const handleModeChange = (newMode: ArticulateMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    resetTimer();

    const newPool = ARTICULATE_PROMPTS.filter((p) => {
      const modeMatch = p.mode === newMode;
      const catMatch = category === "all" ? true : p.category === category;
      return modeMatch && catMatch;
    });
    if (newPool.length > 0) {
      setCurrentPrompt(newPool[0]);
    }
  };

  /* ─── Realistic Slot-Machine Reel Spin (1.8s physics deceleration) ───── */
  const spinPrompt = useCallback(() => {
    if (isSpinning) return;
    resetTimer();

    // Clear any pending timeouts
    spinTimeoutsRef.current.forEach(clearTimeout);
    spinTimeoutsRef.current = [];

    const pool = currentPool.length > 0
      ? currentPool
      : ARTICULATE_PROMPTS.filter((p) => p.mode === mode);

    if (pool.length === 0) return;

    // Pick final destination item that isn't the current one
    const candidatePool = pool.filter((p) => p.id !== currentPrompt.id);
    const finalCandidates = candidatePool.length > 0 ? candidatePool : pool;
    const finalPick = finalCandidates[Math.floor(Math.random() * finalCandidates.length)];

    setIsSpinning(true);

    // 20 gradual deceleration steps over ~1.85 seconds
    const intervals = [
      45, 45, 45, 50, 50, 55, 60, 65, 70, 75,
      85, 95, 110, 130, 155, 185, 220, 260, 310,
    ];

    let accumulatedTime = 0;

    intervals.forEach((stepDuration, stepIndex) => {
      accumulatedTime += stepDuration;

      const t = setTimeout(() => {
        // Random intermediary topic
        const interim = pool[Math.floor(Math.random() * pool.length)];
        setSpinDisplayTitle(interim.title);
        setSpinVelocityY((stepIndex % 2 === 0 ? 1 : -1) * (14 - Math.min(12, stepIndex * 0.6)));

        // Audio ticker with realistic frequency scaling
        if (settings.soundSpin) {
          const pitch = 700 + (stepIndex / intervals.length) * 350;
          sounds.playTick(pitch);
        }
      }, accumulatedTime);

      spinTimeoutsRef.current.push(t);
    });

    // Final arrival on the selected prompt
    const finalArrivalTimeout = setTimeout(() => {
      setCurrentPrompt(finalPick);
      setSpinDisplayTitle("");
      setIsSpinning(false);
      setSpinVelocityY(0);

      // Lock sound
      if (settings.soundSpin) {
        sounds.playLock();
      }

      // Auto-start timer if user enabled it in settings
      if (settings.autoStartTimer) {
        if (mode === "off-the-cuff") {
          setTimerStatus("running");
          setTimerSecondsLeft(settings.offCuffSeconds);
        } else {
          openRadialTimer();
        }
      }
    }, accumulatedTime + 330);

    spinTimeoutsRef.current.push(finalArrivalTimeout);
  }, [isSpinning, currentPool, currentPrompt.id, mode, settings]);

  /* ─── In-Card Timer Mechanics (Off the cuff) ─────────────────────────── */
  const resetTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setTimerStatus("idle");
    setTimerSecondsLeft(settings.offCuffSeconds);
  }, [settings.offCuffSeconds]);

  const toggleTimer = useCallback(() => {
    if (mode === "deep-research") {
      openRadialTimer();
      return;
    }

    if (timerStatus === "idle") {
      setTimerStatus("running");
      setTimerSecondsLeft(settings.offCuffSeconds);
    } else if (timerStatus === "running") {
      setTimerStatus("paused");
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    } else if (timerStatus === "paused") {
      setTimerStatus("running");
    } else if (timerStatus === "completed") {
      resetTimer();
    }
  }, [mode, timerStatus, settings.offCuffSeconds, resetTimer]);

  useEffect(() => {
    if (timerStatus === "running") {
      timerIntervalRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            setTimerStatus("completed");
            if (settings.soundChime) sounds.playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerStatus, settings.soundChime]);

  /* ─── Fullscreen Radial Timer (Screenshot 2: Deep Research) ───────────── */
  const openRadialTimer = () => {
    setRadialPhase("research");
    setRadialTotalSeconds(settings.researchSeconds);
    setRadialSecondsLeft(settings.researchSeconds);
    setShowRadialOverlay(true);
  };

  const closeRadialTimer = () => {
    if (radialIntervalRef.current) clearInterval(radialIntervalRef.current);
    setShowRadialOverlay(false);
  };

  const advanceRadialToSpeaking = () => {
    if (radialIntervalRef.current) clearInterval(radialIntervalRef.current);
    if (settings.soundChime) sounds.playChime();
    setRadialPhase("speaking");
    setRadialTotalSeconds(settings.speakingSeconds);
    setRadialSecondsLeft(settings.speakingSeconds);
  };

  useEffect(() => {
    if (!showRadialOverlay) return;

    if (radialPhase === "research" || radialPhase === "speaking") {
      radialIntervalRef.current = setInterval(() => {
        setRadialSecondsLeft((prev) => {
          if (prev <= 1) {
            if (radialIntervalRef.current) clearInterval(radialIntervalRef.current);
            if (radialPhase === "research") {
              advanceRadialToSpeaking();
            } else {
              setRadialPhase("done");
              if (settings.soundChime) sounds.playChime();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (radialIntervalRef.current) clearInterval(radialIntervalRef.current);
    };
  }, [showRadialOverlay, radialPhase, settings.soundChime]);

  /* ─── Keyboard Listeners (Space & T / Enter) ─────────────────────────── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      if (e.code === "Space") {
        e.preventDefault();
        spinPrompt();
      } else if (e.code === "KeyT" || e.code === "Enter") {
        e.preventDefault();
        if (showRadialOverlay) {
          if (radialPhase === "research") advanceRadialToSpeaking();
        } else {
          toggleTimer();
        }
      } else if (e.code === "Escape") {
        setIsCategoryOpen(false);
        setIsSettingsOpen(false);
        if (showRadialOverlay) closeRadialTimer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [spinPrompt, toggleTimer, showRadialOverlay, radialPhase]);

  // Update & persist settings helper
  const updateSettings = (patch: Partial<ArticulateSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveSettings(next);
      return next;
    });
  };

  const activeCategoryMeta = ARTICULATE_CATEGORIES.find((c) => c.id === category) ?? ARTICULATE_CATEGORIES[0];
  const displayTitle = isSpinning ? spinDisplayTitle : currentPrompt.title;

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center w-full min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-4.25rem)] px-4 py-4 md:py-6 select-none overflow-hidden">
      
      {/* ─── Atmospheric Vignette Lighting (Subtle warm glow left, teal glow right) ─── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-1/4 h-[34rem] w-[34rem] rounded-full [background:radial-gradient(closest-side,rgba(217,107,67,0.11),transparent)] blur-2xl" />
        <div className="absolute -right-32 top-1/3 h-[36rem] w-[36rem] rounded-full [background:radial-gradient(closest-side,rgba(20,85,65,0.13),transparent)] blur-2xl" />
      </div>

      {/* ─── Main Stack (Max width 560px, cleanly centered) ────────────────── */}
      <div className="flex flex-col items-center w-full max-w-[560px] text-center my-auto">
        
        {/* ── Title & Creator Attribution ── */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-fg">
            Articulate
          </h1>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
            <span>made by</span>
            <a
              href="https://instagram.com/ur.spideey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-line bg-fg/[0.04] px-2.5 py-0.5 text-xs font-medium text-fg hover:border-brand/50 hover:bg-brand/10 hover:text-brand-ink transition group shadow-sm"
              title="Visit @ur.spideey on Instagram"
            >
              <InstagramIcon className="w-3 h-3 text-muted group-hover:text-brand-ink transition-colors" />
              <span>@ur.spideey</span>
            </a>
          </div>
        </div>

        {/* ── Mode Segmented Toggle ── */}
        <div className="flex flex-col items-center w-full mb-5">
          <div className="inline-flex p-1 rounded-full border border-line bg-card/80 backdrop-blur-md shadow-sm">
            <button
              type="button"
              onClick={() => handleModeChange("off-the-cuff")}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
                mode === "off-the-cuff"
                  ? "bg-[#d96b43] text-white shadow-[0_4px_16px_-4px_rgba(217,107,67,0.6)]"
                  : "text-muted hover:text-fg hover:bg-fg/[0.04]",
              )}
            >
              <span>🧠</span>
              <span>Off the cuff</span>
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("deep-research")}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
                mode === "deep-research"
                  ? "bg-[#d96b43] text-white shadow-[0_4px_16px_-4px_rgba(217,107,67,0.6)]"
                  : "text-muted hover:text-fg hover:bg-fg/[0.04]",
              )}
            >
              <span>🔍</span>
              <span>Deep research</span>
            </button>
          </div>

          {/* Subtitle Caption */}
          <p className="mt-2 text-xs text-muted font-normal max-w-sm transition-opacity duration-300">
            {mode === "off-the-cuff"
              ? "Minimal prep. Try to think quick on your feet."
              : "Take your time. Explore the topic in depth and structure a detailed argument."}
          </p>
        </div>

        {/* ── Category Pill (No Star Icon) ── */}
        <div className="relative mb-6 z-20">
          <button
            type="button"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-1.5 text-xs font-semibold text-fg shadow-sm hover:border-line-2 hover:bg-fg/[0.04] transition cursor-pointer"
            aria-expanded={isCategoryOpen}
          >
            <span>{activeCategoryMeta.label}</span>
            <ChevronDown className={cn("w-3.5 h-3.5 text-muted transition-transform duration-200", isCategoryOpen && "rotate-180")} />
          </button>

          {isCategoryOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsCategoryOpen(false)} />
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 rounded-2xl border border-line bg-surface p-1.5 shadow-2xl z-20 backdrop-blur-xl animate-fade-in text-left">
                {ARTICULATE_CATEGORIES.map((cat) => {
                  const active = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id);
                        setIsCategoryOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-between w-full rounded-xl px-3 py-2 text-xs font-medium transition cursor-pointer",
                        active ? "bg-brand/15 text-brand-ink font-semibold" : "text-muted hover:bg-fg/[0.05] hover:text-fg",
                      )}
                    >
                      <span>{cat.label}</span>
                      {active && <Check className="w-3.5 h-3.5 text-brand-ink shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* ── Central Prompt Display (Open Floating Space, No Bulky Card Box!) ── */}
        <div className="w-full flex flex-col items-center justify-center my-6 sm:my-8 px-4 min-h-[160px] sm:min-h-[190px]">
          {/* Micro Status Label */}
          <div
            className={cn(
              "font-mono text-[11px] font-bold tracking-[0.25em] uppercase mb-3 transition-colors",
              timerStatus === "completed"
                ? "text-danger animate-bounce"
                : timerStatus === "running"
                ? "text-brand-ink"
                : isSpinning
                ? "text-brand animate-pulse"
                : "text-[#d96b43]",
            )}
          >
            {isSpinning
              ? "SPINNING..."
              : timerStatus === "running"
              ? "SPEAKING"
              : timerStatus === "paused"
              ? "PAUSED"
              : timerStatus === "completed"
              ? "TIME'S UP"
              : "READY"}
          </div>

          {/* Prompt Headline in Editorial Display Serif */}
          <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
            <h2
              style={{
                transform: `translateY(${spinVelocityY}px)`,
                transition: isSpinning ? "transform 40ms linear, filter 40ms linear" : "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className={cn(
                "font-serif font-normal text-fg tracking-tight leading-[1.08] select-text max-w-[34ch]",
                isSpinning ? "blur-[1.5px] opacity-75" : "blur-0 opacity-100",
                displayTitle.length > 36
                  ? "text-2xl sm:text-3xl md:text-4xl"
                  : displayTitle.length > 20
                  ? "text-3xl sm:text-4xl md:text-5xl"
                  : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
              )}
            >
              {displayTitle}
            </h2>

            {/* Optional Guiding Thought / Prompt Context */}
            {!isSpinning && settings.showGuidingThought && currentPrompt.context && (
              <p className="mt-3.5 text-xs sm:text-sm text-muted font-serif italic max-w-sm tracking-wide">
                &ldquo;{currentPrompt.context}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* ── Primary Action Bar (Clean, Minimal, No Star Icons) ── */}
        <div className="flex items-center justify-center gap-3 w-full mt-4 sm:mt-6">
          {/* Spin Button */}
          <button
            type="button"
            onClick={spinPrompt}
            disabled={isSpinning}
            className="inline-flex items-center justify-center rounded-full bg-[#d96b43] text-white px-8 py-3 text-sm font-semibold shadow-[0_8px_24px_-8px_rgba(217,107,67,0.7)] hover:brightness-110 active:scale-95 transition disabled:opacity-50 cursor-pointer shrink-0"
          >
            Spin
          </button>

          {/* Timer Button */}
          {mode === "off-the-cuff" ? (
            <div className="flex items-center gap-1.5 flex-1 max-w-[240px]">
              <button
                type="button"
                onClick={toggleTimer}
                className={cn(
                  "flex-1 inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition active:scale-95 tabular-nums cursor-pointer",
                  timerStatus === "running"
                    ? "border-brand bg-brand/10 text-brand-ink shadow-[0_0_16px_-4px_rgba(249,115,22,0.4)]"
                    : timerStatus === "completed"
                    ? "border-danger bg-danger/10 text-danger"
                    : "border-line-2 bg-card/80 hover:bg-fg/5 text-fg",
                )}
              >
                <span>
                  {timerStatus === "idle" && `Start ${Math.round(settings.offCuffSeconds / 60)} min timer`}
                  {timerStatus === "running" && `${formatTime(timerSecondsLeft)} — Pause`}
                  {timerStatus === "paused" && `Resume (${formatTime(timerSecondsLeft)})`}
                  {timerStatus === "completed" && "Reset timer"}
                </span>
              </button>

              {timerStatus !== "idle" && (
                <button
                  type="button"
                  onClick={resetTimer}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-line bg-card hover:bg-fg/5 text-muted hover:text-fg transition shrink-0 cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={openRadialTimer}
              className="flex-1 max-w-[240px] inline-flex items-center justify-center rounded-full border border-line-2 bg-card/80 hover:bg-fg/5 text-fg px-6 py-3 text-sm font-semibold transition active:scale-95 tabular-nums cursor-pointer"
            >
              Start {Math.round(settings.researchSeconds / 60)} min timer
            </button>
          )}

          {/* Settings Button */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-line bg-card/80 hover:bg-fg/5 text-muted hover:text-fg transition cursor-pointer shrink-0"
            title="Settings"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ─── Settings Modal (Proper Settings Panel) ────────────────────────── */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="glass w-full max-w-sm rounded-3xl border border-line p-5 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <span className="text-sm font-bold text-fg">Articulate Settings</span>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="h-8 w-8 rounded-full flex items-center justify-center text-muted hover:text-fg hover:bg-fg/[0.05] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              {/* Off the cuff prep timer */}
              <div>
                <label className="font-semibold text-fg block mb-1.5">
                  Off the Cuff Duration
                </label>
                <div className="grid grid-cols-5 gap-1">
                  {[30, 45, 60, 90, 120].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => {
                        updateSettings({ offCuffSeconds: sec });
                        if (timerStatus === "idle") setTimerSecondsLeft(sec);
                      }}
                      className={cn(
                        "rounded-xl py-1.5 text-xs font-semibold text-center border transition cursor-pointer",
                        settings.offCuffSeconds === sec
                          ? "border-[#d96b43] bg-[#d96b43]/15 text-[#d96b43]"
                          : "border-line bg-fg/[0.02] text-muted hover:text-fg",
                      )}
                    >
                      {sec < 60 ? `${sec}s` : `${sec / 60}m`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deep research timer */}
              <div>
                <label className="font-semibold text-fg block mb-1.5">
                  Deep Research Prep Duration
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {[120, 180, 300, 420].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => updateSettings({ researchSeconds: sec })}
                      className={cn(
                        "rounded-xl py-1.5 text-xs font-semibold text-center border transition cursor-pointer",
                        settings.researchSeconds === sec
                          ? "border-[#d96b43] bg-[#d96b43]/15 text-[#d96b43]"
                          : "border-line bg-fg/[0.02] text-muted hover:text-fg",
                      )}
                    >
                      {sec / 60} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Speaking timer */}
              <div>
                <label className="font-semibold text-fg block mb-1.5">
                  Speaking Duration (After Research)
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {[60, 120, 180].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => updateSettings({ speakingSeconds: sec })}
                      className={cn(
                        "rounded-xl py-1.5 text-xs font-semibold text-center border transition cursor-pointer",
                        settings.speakingSeconds === sec
                          ? "border-[#d96b43] bg-[#d96b43]/15 text-[#d96b43]"
                          : "border-line bg-fg/[0.02] text-muted hover:text-fg",
                      )}
                    >
                      {sec / 60} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-line space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Reel ticking audio</span>
                  <button
                    type="button"
                    onClick={() => updateSettings({ soundSpin: !settings.soundSpin })}
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 rounded-full border transition cursor-pointer",
                      settings.soundSpin ? "border-[#d96b43] bg-[#d96b43]" : "border-line-2 bg-fg/10",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform my-auto ml-0.5",
                        settings.soundSpin ? "translate-x-4" : "translate-x-0",
                      )}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted">Completion chime sound</span>
                  <button
                    type="button"
                    onClick={() => updateSettings({ soundChime: !settings.soundChime })}
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 rounded-full border transition cursor-pointer",
                      settings.soundChime ? "border-[#d96b43] bg-[#d96b43]" : "border-line-2 bg-fg/10",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform my-auto ml-0.5",
                        settings.soundChime ? "translate-x-4" : "translate-x-0",
                      )}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted">Show guiding thought context</span>
                  <button
                    type="button"
                    onClick={() => updateSettings({ showGuidingThought: !settings.showGuidingThought })}
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 rounded-full border transition cursor-pointer",
                      settings.showGuidingThought ? "border-[#d96b43] bg-[#d96b43]" : "border-line-2 bg-fg/10",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform my-auto ml-0.5",
                        settings.showGuidingThought ? "translate-x-4" : "translate-x-0",
                      )}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted">Auto-start timer after spin</span>
                  <button
                    type="button"
                    onClick={() => updateSettings({ autoStartTimer: !settings.autoStartTimer })}
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 rounded-full border transition cursor-pointer",
                      settings.autoStartTimer ? "border-[#d96b43] bg-[#d96b43]" : "border-line-2 bg-fg/10",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform my-auto ml-0.5",
                        settings.autoStartTimer ? "translate-x-4" : "translate-x-0",
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSettingsOpen(false)}
              className="w-full rounded-2xl bg-fg/[0.06] hover:bg-fg/[0.1] text-fg py-2.5 text-xs font-semibold transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ─── Fullscreen Radial Countdown Overlay (Screenshot 2) ──────────── */}
      {showRadialOverlay && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg/95 backdrop-blur-2xl px-4 animate-fade-in select-none">
          {/* Upper Title */}
          <div className="text-center mb-1">
            <h3 className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#d96b43]">
              {currentPrompt.title}
            </h3>
            <span className="font-mono text-[11px] font-semibold tracking-[0.25em] uppercase text-[#38b2ac] mt-1.5 block">
              {radialPhase === "research" ? "RESEARCHING" : radialPhase === "speaking" ? "SPEAKING" : "TIME'S UP"}
            </span>
          </div>

          {/* Massive Circular SVG Progress Ring */}
          <div className="relative my-8 flex items-center justify-center">
            {(() => {
              const ringSize = 280;
              const strokeWidth = 8;
              const radius = (ringSize - strokeWidth) / 2;
              const circumference = 2 * Math.PI * radius;
              const progress = radialTotalSeconds > 0 ? radialSecondsLeft / radialTotalSeconds : 0;
              const strokeDashoffset = circumference - progress * circumference;

              return (
                <div className="relative" style={{ width: ringSize, height: ringSize }}>
                  <svg
                    width={ringSize}
                    height={ringSize}
                    className="-rotate-90"
                    aria-hidden="true"
                  >
                    <circle
                      cx={ringSize / 2}
                      cy={ringSize / 2}
                      r={radius}
                      fill="none"
                      strokeWidth={strokeWidth}
                      className="stroke-fg/[0.08]"
                    />
                    <circle
                      cx={ringSize / 2}
                      cy={ringSize / 2}
                      r={radius}
                      fill="none"
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="stroke-[#38b2ac] transition-[stroke-dashoffset] duration-700 ease-linear"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-serif text-6xl sm:text-7xl font-normal text-fg tabular-nums tracking-tight">
                      {formatTime(radialSecondsLeft)}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Helper Caption */}
          <p className="text-sm font-serif text-muted mb-6">
            {radialPhase === "research"
              ? "Research."
              : radialPhase === "speaking"
              ? "Speak now. Articulate your argument."
              : "Completed."}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {radialPhase === "research" && (
              <button
                type="button"
                onClick={advanceRadialToSpeaking}
                className="inline-flex items-center justify-center rounded-full bg-[#d96b43] text-white px-7 py-3 text-sm font-semibold shadow-[0_8px_24px_-8px_rgba(217,107,67,0.7)] hover:brightness-110 active:scale-95 transition cursor-pointer"
              >
                Done researching
              </button>
            )}

            {radialPhase === "speaking" && (
              <button
                type="button"
                onClick={() => {
                  if (radialIntervalRef.current) clearInterval(radialIntervalRef.current);
                  setRadialPhase("done");
                  if (settings.soundChime) sounds.playChime();
                }}
                className="inline-flex items-center justify-center rounded-full bg-[#d96b43] text-white px-7 py-3 text-sm font-semibold shadow-[0_8px_24px_-8px_rgba(217,107,67,0.7)] hover:brightness-110 active:scale-95 transition cursor-pointer"
              >
                Done speaking
              </button>
            )}

            <button
              type="button"
              onClick={closeRadialTimer}
              className="text-xs text-muted hover:text-fg underline underline-offset-4 cursor-pointer transition py-2 px-3"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
