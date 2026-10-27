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

/* ─── Estimate Word Duration (Calibrated to natural ~190 WPM TTS speed) ───── */
function estimateWordDuration(word: string, rate: number = 0.95): number {
  const clean = word.replace(/[^a-zA-Z0-9]/g, "");
  const len = Math.max(1, clean.length);
  // ~28ms per character + 70ms base phoneme onset
  let ms = (len * 28 + 70) / rate;
  if (/[,;—–-]/.test(word)) ms += 80 / rate;
  if (/[.!?:]/.test(word)) ms += 150 / rate;
  return Math.max(130, Math.round(ms));
}

export interface WordToken {
  word: string;
  start: number;
  end: number;
  index: number;
  durationMs: number;
}

export function tokenizeWords(fullText: string, rate: number = 0.95): WordToken[] {
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
  const isPlayingRef = useRef(false);

  // Pre-tokenize words for fast timing and boundary indexing
  const wordTokens = useMemo(() => {
    return tokenizeWords(text || "", 0.95);
  }, [text]);

  // Keep isPlayingRef in sync for timer checks
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

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
    isPlayingRef.current = false;
    setActiveWordIndex(null);
    pausedWordIndexRef.current = 0;
    currentWordIndexRef.current = 0;
  }, [clearTicker]);

  // Reset when id or text changes (challenge, question, chapter, or fact change)
  useEffect(() => {
    stopAll();
    return () => {
      stopAll();
    };
  }, [id, text, stopAll]);

  // Step through words with realistic voice duration
  const advanceTicker = useCallback(
    (targetIndex: number) => {
      clearTicker();

      if (!isPlayingRef.current) return;
      if (targetIndex >= wordTokens.length) {
        return;
      }

      currentWordIndexRef.current = targetIndex;
      setActiveWordIndex(targetIndex);

      const duration = wordTokens[targetIndex]?.durationMs || 220;

      tickerTimeoutRef.current = window.setTimeout(() => {
        if (isPlayingRef.current) {
          advanceTicker(targetIndex + 1);
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
        isPlayingRef.current = false;
        setActiveWordIndex(null);
        pausedWordIndexRef.current = 0;
        return;
      }

      // Slice words to speak starting from the paused word
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
        isPlayingRef.current = true;
        currentWordIndexRef.current = startWordIdx;
        setActiveWordIndex(startWordIdx);
        advanceTicker(startWordIdx);
      };

      utterance.onboundary = (e) => {
        if (e.name && e.name !== "word") return;
        // Map boundary charIndex to relative word in wordsToSpeak
        let charAcc = 0;
        let relativeWordIdx = 0;
        for (let i = 0; i < wordsToSpeak.length; i++) {
          const wLen = wordsToSpeak[i].length;
          if (e.charIndex >= charAcc && e.charIndex <= charAcc + wLen) {
            relativeWordIdx = i;
            break;
          }
          charAcc += wLen + 1;
        }
        const matchedIndex = Math.min(wordTokens.length - 1, startWordIdx + relativeWordIdx);
        currentWordIndexRef.current = matchedIndex;
        setActiveWordIndex(matchedIndex);
      };

      utterance.onend = () => {
        clearTicker();
        setIsPlaying(false);
        setIsPaused(false);
        isPlayingRef.current = false;
        setActiveWordIndex(null);
        pausedWordIndexRef.current = 0;
        currentWordIndexRef.current = 0;
        activeUtteranceRef.current = null;
      };

      utterance.onerror = () => {
        clearTicker();
        setIsPlaying(false);
        setIsPaused(false);
        isPlayingRef.current = false;
        setActiveWordIndex(null);
        activeUtteranceRef.current = null;
      };

      activeUtteranceRef.current = utterance;
      // Prevent Chromium garbage collection
      (window as unknown as { __activeUtterance?: SpeechSynthesisUtterance }).__activeUtterance = utterance;

      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        setIsPlaying(false);
        isPlayingRef.current = false;
      }
    },
    [advanceTicker, clearTicker, wordTokens]
  );

  const toggle = useCallback(() => {
    haptic("light");

    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlaying) {
      // ─── USER TAPS PAUSE ──────────────────────────────────────────────────
      clearTicker();
      isPlayingRef.current = false;

      // Remember the exact word where user stopped
      const pausedWord = currentWordIndexRef.current;
      pausedWordIndexRef.current = pausedWord;

      // Stop voice stream cleanly so resume is pristine
      try {
        window.speechSynthesis.cancel();
      } catch {}

      setIsPlaying(false);
      setIsPaused(true);
      setActiveWordIndex(null); // Highlight immediately disappears when paused!
      return;
    }

    if (isPaused) {
      // ─── USER TAPS RESUME ─────────────────────────────────────────────────
      const resumeIndex = pausedWordIndexRef.current;
      startFrom(resumeIndex);
      return;
    }

    // ─── USER TAPS START (From Word 0) ──────────────────────────────────────
    pausedWordIndexRef.current = 0;
    currentWordIndexRef.current = 0;
    startFrom(0);
  }, [isPlaying, isPaused, clearTicker, startFrom]);

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
          "w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer select-none active:scale-90 touch-manipulation backdrop-blur-xl border shadow-lg",
          isPlaying
            ? "bg-amber-500/20 dark:bg-amber-500/25 border-amber-400/50 dark:border-amber-400/40 text-amber-500 dark:text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.3)] animate-pulse"
            : isPaused
            ? "bg-emerald-500/20 dark:bg-emerald-500/25 border-emerald-400/50 dark:border-emerald-400/40 text-emerald-500 dark:text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
            : "bg-white/[0.12] dark:bg-white/[0.08] hover:bg-white/20 dark:hover:bg-white/15 border-white/25 dark:border-white/15 text-fg/80 hover:text-fg shadow-md hover:shadow-lg"
        )}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 fill-current shrink-0" />
        ) : isPaused ? (
          <Play className="w-4 h-4 fill-current ml-0.5 shrink-0" />
        ) : (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}

/* ─── Word-by-Word Smooth Glassmorphic Highlighted Text Component ──────────── */
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
              className="bg-amber-400/25 dark:bg-amber-300/25 text-inherit rounded px-1 -mx-0.5 transition-colors duration-100 shadow-[0_0_8px_rgba(245,158,11,0.25)]"
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
