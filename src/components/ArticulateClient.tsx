"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Clock, RotateCcw, Settings2, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import {
  ARTICULATE_CATEGORIES,
  ARTICULATE_PROMPTS,
  type ArticulateCategory,
  type ArticulateMode,
  type ArticulatePrompt,
} from "@/data/articulate/prompts";
import { cn } from "@/lib/format";

/* ─── Minimal Instagram SVG Icon ────────────────────────────────────────── */
function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* ─── Soft Web Audio Chime Synthesizer ─────────────────────────────────── */
function playChime() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const playTone = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.2, start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };

    playTone(587.33, now, 0.45);        // D5
    playTone(880.0, now + 0.15, 0.65);   // A5
  } catch {
    // AudioContext blocked by user policy or unavailable
  }
}

export default function ArticulateClient() {
  /* ─── State ──────────────────────────────────────────────────────────── */
  const [mode, setMode] = useState<ArticulateMode>("off-the-cuff");
  const [category, setCategory] = useState<ArticulateCategory>("all");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Custom durations (in seconds)
  const [offCuffDuration, setOffCuffDuration] = useState(60); // 1 min default
  const [researchDuration, setResearchDuration] = useState(300); // 5 min default
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active prompt
  const initialPool = useMemo(() => {
    return ARTICULATE_PROMPTS.filter((p) => p.mode === "off-the-cuff");
  }, []);

  const [currentPrompt, setCurrentPrompt] = useState<ArticulatePrompt>(() => {
    return initialPool.find((p) => p.title === "Comfort Zone") ?? initialPool[0];
  });

  // Slot machine animation state
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDisplayTitle, setSpinDisplayTitle] = useState("");
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // In-card timer state (Off the cuff)
  const [timerStatus, setTimerStatus] = useState<"idle" | "running" | "paused" | "completed">("idle");
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(60);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Full-screen Deep Research Radial Timer Overlay
  const [showRadialOverlay, setShowRadialOverlay] = useState(false);
  const [radialPhase, setRadialPhase] = useState<"research" | "speaking" | "done">("research");
  const [radialSecondsLeft, setRadialSecondsLeft] = useState(300);
  const [radialTotalSeconds, setRadialTotalSeconds] = useState(300);
  const radialIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered prompt pool
  const currentPool = useMemo(() => {
    return ARTICULATE_PROMPTS.filter((p) => {
      const modeMatch = p.mode === mode;
      const catMatch = category === "all" ? true : p.category === category;
      return modeMatch && catMatch;
    });
  }, [mode, category]);

  // Helper for formatting time (e.g., 0:59 or 4:58)
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

    // Select a fitting initial prompt for the new mode
    const newPool = ARTICULATE_PROMPTS.filter((p) => {
      const modeMatch = p.mode === newMode;
      const catMatch = category === "all" ? true : p.category === category;
      return modeMatch && catMatch;
    });
    if (newPool.length > 0) {
      setCurrentPrompt(newPool[0]);
    }
  };

  /* ─── Slot-Machine Spin Action ───────────────────────────────────────── */
  const spinPrompt = useCallback(() => {
    if (isSpinning) return;
    resetTimer();

    const pool = currentPool.length > 0
      ? currentPool
      : ARTICULATE_PROMPTS.filter((p) => p.mode === mode);

    if (pool.length === 0) return;

    // Filter out the current one so we never draw the exact same one twice
    const candidatePool = pool.filter((p) => p.id !== currentPrompt.id);
    const finalCandidates = candidatePool.length > 0 ? candidatePool : pool;
    const finalPick = finalCandidates[Math.floor(Math.random() * finalCandidates.length)];

    setIsSpinning(true);
    let step = 0;
    const totalSteps = 8;
    const stepDuration = 65;

    if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);

    spinIntervalRef.current = setInterval(() => {
      step++;
      const randomInterim = pool[Math.floor(Math.random() * pool.length)];
      setSpinDisplayTitle(randomInterim.title);

      if (step >= totalSteps) {
        if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
        setCurrentPrompt(finalPick);
        setIsSpinning(false);
        setSpinDisplayTitle("");
      }
    }, stepDuration);
  }, [isSpinning, currentPool, currentPrompt.id, mode]);

  /* ─── In-Card Timer Mechanics (Off The Cuff) ─────────────────────────── */
  const activeDuration = mode === "off-the-cuff" ? offCuffDuration : researchDuration;

  const resetTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setTimerStatus("idle");
    setTimerSecondsLeft(activeDuration);
  }, [activeDuration]);

  // Sync timer duration if duration settings change and timer is idle
  useEffect(() => {
    if (timerStatus === "idle") {
      setTimerSecondsLeft(activeDuration);
    }
  }, [activeDuration, timerStatus]);

  const toggleTimer = useCallback(() => {
    if (mode === "deep-research") {
      // For deep research, open the dedicated radial timer overlay as in Screenshot 2
      openRadialTimer();
      return;
    }

    if (timerStatus === "idle") {
      setTimerStatus("running");
      setTimerSecondsLeft(offCuffDuration);
    } else if (timerStatus === "running") {
      setTimerStatus("paused");
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    } else if (timerStatus === "paused") {
      setTimerStatus("running");
    } else if (timerStatus === "completed") {
      resetTimer();
    }
  }, [mode, timerStatus, offCuffDuration, resetTimer]);

  useEffect(() => {
    if (timerStatus === "running") {
      timerIntervalRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            setTimerStatus("completed");
            if (soundEnabled) playChime();
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
  }, [timerStatus, soundEnabled]);

  /* ─── Radial Timer Overlay (Deep Research) ───────────────────────────── */
  const openRadialTimer = () => {
    setRadialPhase("research");
    setRadialTotalSeconds(researchDuration);
    setRadialSecondsLeft(researchDuration);
    setShowRadialOverlay(true);
  };

  const closeRadialTimer = () => {
    if (radialIntervalRef.current) clearInterval(radialIntervalRef.current);
    setShowRadialOverlay(false);
  };

  const advanceRadialToSpeaking = () => {
    if (radialIntervalRef.current) clearInterval(radialIntervalRef.current);
    if (soundEnabled) playChime();
    setRadialPhase("speaking");
    // 2 minutes for structured speaking
    const speakDuration = 120;
    setRadialTotalSeconds(speakDuration);
    setRadialSecondsLeft(speakDuration);
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
              if (soundEnabled) playChime();
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
  }, [showRadialOverlay, radialPhase, soundEnabled]);

  /* ─── Keyboard Shortcuts ─────────────────────────────────────────────── */
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

  /* ─── Active Category Meta ───────────────────────────────────────────── */
  const activeCategoryMeta = ARTICULATE_CATEGORIES.find((c) => c.id === category) ?? ARTICULATE_CATEGORIES[0];

  // Dynamic status micro-label
  const statusLabel = useMemo(() => {
    if (isSpinning) return "SPINNING...";
    if (timerStatus === "running") return "SPEAKING";
    if (timerStatus === "paused") return "PAUSED";
    if (timerStatus === "completed") return "TIME'S UP";
    return "READY";
  }, [isSpinning, timerStatus]);

  // Main prompt text to display
  const displayTitle = isSpinning ? spinDisplayTitle : currentPrompt.title;

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center w-full min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-4.25rem)] px-4 py-4 md:py-6 select-none overflow-hidden">
      {/* ─── Constrained Central Stack (Max 540px - 580px) ────────────────── */}
      <div className="flex flex-col items-center w-full max-w-[560px] text-center my-auto">
        
        {/* ── Header: Title + Creator Attribution ── */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-fg">
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

        {/* ── Practice Mode Segmented Toggle ── */}
        <div className="flex flex-col items-center w-full mb-5">
          <div className="inline-flex p-1 rounded-full border border-line bg-card/80 backdrop-blur-md shadow-sm">
            <button
              type="button"
              onClick={() => handleModeChange("off-the-cuff")}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
                mode === "off-the-cuff"
                  ? "bg-brand text-white shadow-[0_4px_16px_-4px_rgba(249,115,22,0.6)]"
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
                  ? "bg-brand text-white shadow-[0_4px_16px_-4px_rgba(249,115,22,0.6)]"
                  : "text-muted hover:text-fg hover:bg-fg/[0.04]",
              )}
            >
              <span>🔍</span>
              <span>Deep research</span>
            </button>
          </div>

          {/* Mode Description Caption */}
          <p className="mt-2 text-xs text-muted font-normal max-w-sm">
            {mode === "off-the-cuff"
              ? "Minimal prep. Try to think quick on your feet."
              : "Take your time. Explore the topic in depth and structure a detailed argument."}
          </p>
        </div>

        {/* ── Category Dropdown / Filter ── */}
        <div className="relative mb-5 z-20">
          <button
            type="button"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-xs font-semibold text-fg shadow-sm hover:border-line-2 hover:bg-fg/[0.04] transition cursor-pointer"
            aria-expanded={isCategoryOpen}
          >
            <span>{activeCategoryMeta.emoji || "✦"}</span>
            <span>{activeCategoryMeta.label}</span>
            <ChevronDown className={cn("w-3.5 h-3.5 text-muted transition-transform duration-200", isCategoryOpen && "rotate-180")} />
          </button>

          {isCategoryOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsCategoryOpen(false)}
              />
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-52 rounded-2xl border border-line bg-surface p-1.5 shadow-2xl z-20 backdrop-blur-xl animate-fade-in text-left">
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
                        active
                          ? "bg-brand/15 text-brand-ink font-semibold"
                          : "text-muted hover:bg-fg/[0.05] hover:text-fg",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.emoji || "✦"}</span>
                        <span>{cat.label}</span>
                      </span>
                      {active && <Check className="w-3.5 h-3.5 text-brand-ink shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* ── Central Prompt Stage (Focal Card) ── */}
        <div
          className={cn(
            "w-full rounded-[28px] border bg-card/85 backdrop-blur-xl card-shadow px-6 py-10 sm:px-10 sm:py-14 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 min-h-[220px] sm:min-h-[260px]",
            timerStatus === "completed"
              ? "border-danger/40 ring-2 ring-danger/20 shadow-[0_0_36px_-6px_rgba(248,113,113,0.35)]"
              : timerStatus === "running"
              ? "border-brand/40 ring-1 ring-brand/20 shadow-[0_0_30px_-8px_rgba(249,115,22,0.25)]"
              : "border-line",
          )}
        >
          {/* Status Micro-Label */}
          <div
            className={cn(
              "font-mono text-[11px] font-bold tracking-[0.22em] uppercase mb-4 transition-colors",
              timerStatus === "completed"
                ? "text-danger animate-bounce"
                : timerStatus === "running"
                ? "text-brand-ink"
                : isSpinning
                ? "text-brand animate-pulse"
                : "text-subtle",
            )}
          >
            {statusLabel}
          </div>

          {/* Prompt Display Heading (Serif) */}
          <div className="relative w-full flex flex-col items-center justify-center overflow-hidden min-h-[72px]">
            <h2
              className={cn(
                "font-serif font-bold text-fg tracking-tight leading-tight transition-all duration-150 max-w-[38ch]",
                isSpinning ? "opacity-70 blur-[1px] translate-y-1 scale-95" : "opacity-100 blur-0 translate-y-0 scale-100",
                displayTitle.length > 36
                  ? "text-xl sm:text-2xl"
                  : displayTitle.length > 20
                  ? "text-2xl sm:text-3xl"
                  : "text-3xl sm:text-4xl md:text-[2.65rem]",
              )}
            >
              {displayTitle}
            </h2>

            {/* Guiding Question / Context (if available and not spinning) */}
            {!isSpinning && currentPrompt.context && (
              <p className="mt-3 text-xs sm:text-sm text-muted font-sans italic max-w-sm">
                &ldquo;{currentPrompt.context}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* ── Bottom Action Bar (Controls) ── */}
        <div className="flex items-center justify-center gap-3 w-full mt-6">
          {/* Button 1: Spin */}
          <button
            type="button"
            onClick={spinPrompt}
            disabled={isSpinning}
            className="inline-flex items-center justify-center gap-2 rounded-full grad-cta px-7 py-3 text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(249,115,22,0.8)] hover:brightness-110 active:scale-95 transition disabled:opacity-50 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Spin</span>
          </button>

          {/* Button 2: Timer Button */}
          {mode === "off-the-cuff" ? (
            <div className="flex items-center gap-1.5 flex-1 max-w-[240px]">
              <button
                type="button"
                onClick={toggleTimer}
                className={cn(
                  "flex-1 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition active:scale-95 tabular-nums cursor-pointer",
                  timerStatus === "running"
                    ? "border-brand bg-brand/10 text-brand-ink shadow-[0_0_16px_-4px_rgba(249,115,22,0.4)]"
                    : timerStatus === "completed"
                    ? "border-danger bg-danger/10 text-danger"
                    : "border-line-2 bg-card hover:bg-fg/5 text-fg",
                )}
              >
                <Clock className="w-4 h-4 shrink-0 text-muted" />
                <span>
                  {timerStatus === "idle" && `Start ${Math.round(offCuffDuration / 60)} min timer`}
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
              className="flex-1 max-w-[240px] inline-flex items-center justify-center gap-2 rounded-full border border-line-2 bg-card hover:bg-fg/5 text-fg px-5 py-3 text-sm font-semibold transition active:scale-95 tabular-nums cursor-pointer"
            >
              <Clock className="w-4 h-4 shrink-0 text-brand-ink" />
              <span>Start {Math.round(researchDuration / 60)} min research</span>
            </button>
          )}

          {/* Button 3: Settings Gear */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-line bg-card hover:bg-fg/5 text-muted hover:text-fg transition cursor-pointer"
              title="Timer & Sound Settings"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            {/* Settings Popover */}
            {isSettingsOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsSettingsOpen(false)}
                />
                <div className="absolute right-0 bottom-full mb-2 w-64 rounded-2xl border border-line bg-surface p-4 shadow-2xl z-30 backdrop-blur-xl animate-fade-in text-left">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-line">
                    <span className="text-xs font-bold text-fg">Articulate Settings</span>
                    <button
                      type="button"
                      onClick={() => setIsSettingsOpen(false)}
                      className="text-subtle hover:text-fg"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Off the cuff duration */}
                  <div className="mb-3">
                    <span className="text-[11px] font-semibold text-muted block mb-1.5">
                      Off the Cuff Duration
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      {[30, 60, 90].map((sec) => (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => {
                            setOffCuffDuration(sec);
                            if (timerStatus === "idle") setTimerSecondsLeft(sec);
                          }}
                          className={cn(
                            "rounded-lg py-1 px-1.5 text-xs font-medium text-center border transition",
                            offCuffDuration === sec
                              ? "border-brand bg-brand/15 text-brand-ink font-semibold"
                              : "border-line bg-fg/[0.02] text-muted hover:text-fg",
                          )}
                        >
                          {sec < 60 ? `${sec}s` : `${sec / 60}m`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deep research duration */}
                  <div className="mb-3">
                    <span className="text-[11px] font-semibold text-muted block mb-1.5">
                      Research Duration
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      {[120, 180, 300].map((sec) => (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => setResearchDuration(sec)}
                          className={cn(
                            "rounded-lg py-1 px-1.5 text-xs font-medium text-center border transition",
                            researchDuration === sec
                              ? "border-brand bg-brand/15 text-brand-ink font-semibold"
                              : "border-line bg-fg/[0.02] text-muted hover:text-fg",
                          )}
                        >
                          {sec / 60}m
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sound toggle */}
                  <div className="flex items-center justify-between pt-2 border-t border-line">
                    <span className="text-xs text-muted flex items-center gap-1.5">
                      {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-brand-ink" /> : <VolumeX className="w-3.5 h-3.5 text-subtle" />}
                      Chime audio
                    </span>
                    <button
                      type="button"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={cn(
                        "relative inline-flex h-5 w-9 shrink-0 rounded-full border transition cursor-pointer",
                        soundEnabled ? "border-brand bg-brand" : "border-line-2 bg-fg/10",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform my-auto ml-0.5",
                          soundEnabled ? "translate-x-4" : "translate-x-0",
                        )}
                      />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Keyboard Shortcuts Hint (Desktop) ── */}
        <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-subtle hidden sm:block">
          Press <kbd className="px-1.5 py-0.5 rounded border border-line bg-fg/[0.04] text-fg">Space</kbd> to spin · <kbd className="px-1.5 py-0.5 rounded border border-line bg-fg/[0.04] text-fg">T</kbd> to toggle timer
        </p>
      </div>

      {/* ─── Fullscreen Radial Countdown Timer Overlay (from Screenshot 2) ── */}
      {showRadialOverlay && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg/95 backdrop-blur-2xl px-4 animate-fade-in select-none">
          {/* Upper Title */}
          <div className="text-center mb-2">
            <h3 className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brand-ink">
              {currentPrompt.title}
            </h3>
            <span className="font-mono text-[11px] font-semibold tracking-[0.25em] uppercase text-brand mt-1 block">
              {radialPhase === "research" ? "RESEARCHING" : radialPhase === "speaking" ? "SPEAKING" : "TIME'S UP"}
            </span>
          </div>

          {/* Radial Circular SVG Ring */}
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
                    {/* Background Track */}
                    <circle
                      cx={ringSize / 2}
                      cy={ringSize / 2}
                      r={radius}
                      fill="none"
                      strokeWidth={strokeWidth}
                      className="stroke-fg/[0.08]"
                    />
                    {/* Animated Progress Arc */}
                    <circle
                      cx={ringSize / 2}
                      cy={ringSize / 2}
                      r={radius}
                      fill="none"
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="stroke-brand transition-[stroke-dashoffset] duration-700 ease-linear"
                    />
                  </svg>

                  {/* Centered Large Digits */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-serif text-5xl sm:text-6xl font-semibold text-fg tabular-nums tracking-tight">
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

          {/* Bottom Action Controls */}
          <div className="flex items-center gap-4">
            {radialPhase === "research" && (
              <button
                type="button"
                onClick={advanceRadialToSpeaking}
                className="inline-flex items-center justify-center rounded-full grad-cta px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(249,115,22,0.8)] hover:brightness-110 active:scale-95 transition cursor-pointer"
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
                  if (soundEnabled) playChime();
                }}
                className="inline-flex items-center justify-center rounded-full grad-cta px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(249,115,22,0.8)] hover:brightness-110 active:scale-95 transition cursor-pointer"
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
