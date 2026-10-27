"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/format";
import { haptic } from "@/lib/haptics";

/* ─── Cute Natural Female Voice Selection ──────────────────────────────────── */
export function findCuteFemaleVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const priorities = [
    (v: SpeechSynthesisVoice) => v.name === "Google US English",
    (v: SpeechSynthesisVoice) => v.name === "Microsoft Zira",
    (v: SpeechSynthesisVoice) => v.name === "Samantha",
    (v: SpeechSynthesisVoice) => v.name.includes("Google") && v.lang === "en-US",
    (v: SpeechSynthesisVoice) => v.name.includes("Female") && v.lang === "en-US",
    (v: SpeechSynthesisVoice) =>
      /female|natural|jenny|aria|karen|susan|victoria/i.test(v.name) && v.lang.startsWith("en"),
    (v: SpeechSynthesisVoice) => v.lang === "en-US",
    (v: SpeechSynthesisVoice) => v.lang.startsWith("en"),
  ];

  for (const check of priorities) {
    const found = voices.find(check);
    if (found) return found;
  }
  return voices[0];
}

/* ─── Estimate Word Duration (Calibrated Syllables + Punctuation) ───────────── */
function estimateWordDuration(word: string, rate: number = 0.95): number {
  const clean = word.replace(/[^a-zA-Z0-9]/g, "");
  const len = Math.max(1, clean.length);
  // Base time: ~65ms per character + 100ms word phonation
  let ms = (len * 65 + 100) / rate;
  if (/[,;—–-]/.test(word)) ms += 160 / rate;
  if (/[.!?:]/.test(word)) ms += 300 / rate;
  return Math.max(180, Math.round(ms));
}

interface WordToken {
  word: string;
  start: number;
  end: number;
  index: number;
  durationMs: number;
}

function tokenizeWords(fullText: string, rate: number = 0.95): WordToken[] {
  const words = fullText.trim().split(/\s+/).filter(Boolean);
  let charPos = 0;
  return words.map((w, idx) => {
    const found = fullText.indexOf(w, charPos);
    const start = found !== -1 ? found : charPos;
    const end = start + w.length;
    charPos = end;
    return {
      word: w,
      start,
      end,
      index: idx,
      durationMs: estimateWordDuration(w, rate),
    };
  });
}

export interface CuteTTSState {
  isPlaying: boolean;
  isPaused: boolean;
  activeWordIndex: number | null;
  toggle: () => void;
  stop: () => void;
}

export function useCuteTTS(text: string, id?: string): CuteTTSState {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  const pausedWordIndexRef = useRef(0);
  const currentWordIndexRef = useRef(0);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const tickerTimeoutRef = useRef<number | null>(null);
  const wordStartTimeRef = useRef(0);
  const boundaryFiredRef = useRef(false);

  // Pre-tokenize words for timing and highlighting
  const wordTokens = useMemo(() => {
    return tokenizeWords(text || "", 0.95);
  }, [text]);

  // Pre-warm voices list
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.getVoices();
      const onVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
      };
    } catch {}
  }, []);

  const clearTicker = useCallback(() => {
    if (tickerTimeoutRef.current !== null) {
      window.clearTimeout(tickerTimeoutRef.current);
      tickerTimeoutRef.current = null;
    }
  }, []);

  const stopAll = useCallback(() => {
    clearTicker();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    activeUtteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
    setActiveWordIndex(null);
    pausedWordIndexRef.current = 0;
    currentWordIndexRef.current = 0;
    boundaryFiredRef.current = false;
  }, [clearTicker]);

  // When id or text changes (challenge, question, chapter, fact change), reset cleanly
  useEffect(() => {
    stopAll();
    return () => {
      stopAll();
    };
  }, [id, text, stopAll]);

  // Ticker scheduler that moves word-by-word with natural cadence
  const scheduleNextWord = useCallback(
    (nextIdx: number) => {
      clearTicker();

      if (nextIdx >= wordTokens.length) {
        // Reached end of text
        return;
      }

      currentWordIndexRef.current = nextIdx;
      setActiveWordIndex(nextIdx);
      wordStartTimeRef.current = performance.now();

      const duration = wordTokens[nextIdx]?.durationMs || 300;

      tickerTimeoutRef.current = window.setTimeout(() => {
        // If onboundary is actively driving the indices, skip timer auto-advancing
        if (!boundaryFiredRef.current) {
          scheduleNextWord(nextIdx + 1);
        }
      }, duration);
    },
    [clearTicker, wordTokens]
  );

  const startFrom = useCallback(
    (startWordIdx: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      clearTicker();
      try {
        window.speechSynthesis.cancel();
      } catch {}

      if (!wordTokens || wordTokens.length === 0 || startWordIdx >= wordTokens.length) {
        setIsPlaying(false);
        setIsPaused(false);
        setActiveWordIndex(null);
        pausedWordIndexRef.current = 0;
        return;
      }

      // Slice words to speak if resuming from mid-sentence
      const wordsToSpeak = wordTokens.slice(startWordIdx).map((w) => w.word);
      const textToSpeak = wordsToSpeak.join(" ");
      if (!textToSpeak.trim()) return;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "en-US";

      const targetVoice = findCuteFemaleVoice();
      if (targetVoice) utterance.voice = targetVoice;

      let pitchMod = 0;
      if (textToSpeak.includes("!") || textToSpeak.includes("?")) pitchMod = 0.04;
      utterance.pitch = 1.08 + pitchMod;
      utterance.rate = 0.95;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        currentWordIndexRef.current = startWordIdx;
        setActiveWordIndex(startWordIdx);
        scheduleNextWord(startWordIdx);
      };

      utterance.onboundary = (e) => {
        boundaryFiredRef.current = true;
        // Onboundary charIndex is relative to textToSpeak
        let charAcc = 0;
        let relativeWordIdx = 0;
        for (let i = 0; i < wordsToSpeak.length; i++) {
          const wLen = wordsToSpeak[i].length;
          if (e.charIndex >= charAcc && e.charIndex <= charAcc + wLen) {
            relativeWordIdx = i;
            break;
          }
          charAcc += wLen + 1; // plus space
        }
        const globalWordIdx = Math.min(wordTokens.length - 1, startWordIdx + relativeWordIdx);
        currentWordIndexRef.current = globalWordIdx;
        setActiveWordIndex(globalWordIdx);
      };

      utterance.onend = () => {
        clearTicker();
        setIsPlaying(false);
        setIsPaused(false);
        setActiveWordIndex(null);
        pausedWordIndexRef.current = 0;
        currentWordIndexRef.current = 0;
        activeUtteranceRef.current = null;
      };

      utterance.onerror = () => {
        clearTicker();
        setIsPlaying(false);
        setIsPaused(false);
        setActiveWordIndex(null);
        activeUtteranceRef.current = null;
      };

      activeUtteranceRef.current = utterance;
      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        setIsPlaying(false);
      }
    },
    [clearTicker, scheduleNextWord, wordTokens]
  );

  const toggle = useCallback(() => {
    haptic("light");

    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlaying) {
      // ─── USER TAPS PAUSE ──────────────────────────────────────────────────
      clearTicker();

      // Pause audio stream natively
      try {
        window.speechSynthesis.pause();
      } catch {}

      const pauseWord = currentWordIndexRef.current;
      pausedWordIndexRef.current = pauseWord;

      setIsPlaying(false);
      setIsPaused(true);
      setActiveWordIndex(null); // Highlight immediately disappears when paused!
      return;
    }

    if (isPaused) {
      // ─── USER TAPS RESUME ─────────────────────────────────────────────────
      const resumeIndex = pausedWordIndexRef.current;
      setIsPlaying(true);
      setIsPaused(false);
      setActiveWordIndex(resumeIndex); // Highlight reappears immediately on resume!

      // Try native resume first
      let resumedNatively = false;
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
          resumedNatively = true;
        }
      } catch {}

      // If native resume didn't activate or engine canceled, speak remaining words from paused index
      setTimeout(() => {
        if (
          typeof window !== "undefined" &&
          "speechSynthesis" in window &&
          (!window.speechSynthesis.speaking || !resumedNatively)
        ) {
          startFrom(resumeIndex);
        } else {
          scheduleNextWord(resumeIndex);
        }
      }, 100);

      return;
    }

    // ─── USER TAPS START (From Beginning) ───────────────────────────────────
    pausedWordIndexRef.current = 0;
    currentWordIndexRef.current = 0;
    startFrom(0);
  }, [isPlaying, isPaused, clearTicker, scheduleNextWord, startFrom]);

  return {
    isPlaying,
    isPaused,
    activeWordIndex,
    toggle,
    stop: stopAll,
  };
}

/* ─── Small Circular Floating TTS Button in Glassmorphism Style ────────────── */
export function FloatingTTSButton({
  tts,
  className,
}: {
  tts: CuteTTSState;
  className?: string;
}) {
  const { isPlaying, isPaused, toggle } = tts;

  return (
    <div
      className={cn(
        "fixed bottom-20 right-4 sm:bottom-24 sm:right-6 md:bottom-8 md:right-8 z-40 animate-fade-in",
        className
      )}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={
          isPlaying
            ? "Pause speech narration"
            : isPaused
            ? "Resume speech narration"
            : "Listen to text"
        }
        title={
          isPlaying
            ? "Pause speech narration"
            : isPaused
            ? "Resume speech narration"
            : "Listen to text"
        }
        className={cn(
          "w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer select-none active:scale-90 touch-manipulation backdrop-blur-xl border shadow-lg",
          isPlaying
            ? "bg-white/25 dark:bg-white/20 border-white/50 dark:border-white/40 text-fg dark:text-white shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            : isPaused
            ? "bg-white/20 dark:bg-white/15 border-white/35 dark:border-white/25 text-emerald-400 dark:text-emerald-300 shadow-md"
            : "bg-white/[0.12] dark:bg-black/35 hover:bg-white/20 dark:hover:bg-black/50 border-white/25 dark:border-white/15 text-fg/80 hover:text-fg shadow-md"
        )}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 fill-current animate-pulse shrink-0" />
        ) : isPaused ? (
          <Play className="w-4 h-4 fill-current ml-0.5 shrink-0" />
        ) : (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}

/* ─── Word-by-Word Glassmorphic Highlighted Text Component ─────────────────── */
export function TTSHighlightedText({
  text,
  activeWordIndex,
  wordOffset = 0,
  isSpeaking,
  className,
}: {
  text: string;
  activeWordIndex: number | null;
  wordOffset?: number;
  isSpeaking: boolean;
  className?: string;
}) {
  if (!text) return null;

  // If paused or not speaking, render clean unhighlighted text immediately
  if (!isSpeaking || activeWordIndex === null) {
    return <span className={className}>{text}</span>;
  }

  const parts = text.split(/(\s+)/g);
  let wordCounter = 0;

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (/\s+/.test(part)) {
          return <span key={i}>{part}</span>;
        }

        const currentWordIdx = wordCounter;
        wordCounter++;

        const isCurrentActive =
          activeWordIndex === wordOffset + currentWordIdx;

        if (isCurrentActive) {
          return (
            <span
              key={i}
              className="inline-block px-1.5 -mx-0.5 py-0.5 rounded-lg bg-white/35 dark:bg-white/20 backdrop-blur-md border border-white/50 dark:border-white/30 text-fg dark:text-white shadow-[0_2px_12px_rgba(255,255,255,0.25)] ring-1 ring-white/40 dark:ring-white/20 font-semibold transition-all duration-150"
            >
              {part}
            </span>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
