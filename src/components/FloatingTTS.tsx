"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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

function findWordStart(fullText: string, charIndex: number): number {
  if (charIndex <= 0) return 0;
  let i = Math.min(charIndex, fullText.length - 1);
  while (i > 0 && !/\s/.test(fullText[i - 1])) {
    i--;
  }
  return i;
}

export interface CuteTTSState {
  isPlaying: boolean;
  isPaused: boolean;
  activeCharIndex: number | null;
  toggle: () => void;
  stop: () => void;
}

export function useCuteTTS(text: string, id?: string): CuteTTSState {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCharIndex, setActiveCharIndex] = useState<number | null>(null);

  const pausedCharIndexRef = useRef(0);
  const lastCharIndexRef = useRef(0);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Pre-warm voices for Web Speech API
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

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    activeUtteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
    setActiveCharIndex(null);
    pausedCharIndexRef.current = 0;
    lastCharIndexRef.current = 0;
  }, []);

  // When id or text changes (user changes page, challenge, chapter, or question), reset completely
  useEffect(() => {
    stop();
    return () => {
      stop();
    };
  }, [id, text, stop]);

  const speakFrom = useCallback(
    (offset: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      try {
        window.speechSynthesis.cancel();
      } catch {}

      const cleanText = text?.trim();
      if (!cleanText || offset >= cleanText.length) {
        setIsPlaying(false);
        setIsPaused(false);
        setActiveCharIndex(null);
        pausedCharIndexRef.current = 0;
        return;
      }

      const textSlice = cleanText.slice(offset);
      const utterance = new SpeechSynthesisUtterance(textSlice);
      utterance.lang = "en-US";

      const targetVoice = findCuteFemaleVoice();
      if (targetVoice) utterance.voice = targetVoice;

      let pitchMod = 0;
      if (textSlice.includes("!") || textSlice.includes("?")) pitchMod = 0.04;
      utterance.pitch = 1.08 + pitchMod;
      utterance.rate = 0.95;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };

      utterance.onboundary = (e) => {
        const globalIndex = offset + e.charIndex;
        setActiveCharIndex(globalIndex);
        lastCharIndexRef.current = globalIndex;
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setActiveCharIndex(null);
        pausedCharIndexRef.current = 0;
        lastCharIndexRef.current = 0;
        activeUtteranceRef.current = null;
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        activeUtteranceRef.current = null;
      };

      activeUtteranceRef.current = utterance;
      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        setIsPlaying(false);
      }
    },
    [text]
  );

  const toggle = useCallback(() => {
    haptic("light");

    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlaying) {
      // Pause action: stop audio, save position, clear highlight
      try {
        window.speechSynthesis.cancel();
      } catch {}

      const resumeIndex = findWordStart(text, lastCharIndexRef.current);
      pausedCharIndexRef.current = resumeIndex;
      setIsPlaying(false);
      setIsPaused(true);
      setActiveCharIndex(null); // highlight disappears when paused
      return;
    }

    if (isPaused) {
      // Resume action: continue from pausedCharIndexRef.current
      speakFrom(pausedCharIndexRef.current);
      return;
    }

    // Start from beginning
    pausedCharIndexRef.current = 0;
    lastCharIndexRef.current = 0;
    speakFrom(0);
  }, [isPlaying, isPaused, text, speakFrom]);

  return {
    isPlaying,
    isPaused,
    activeCharIndex,
    toggle,
    stop,
  };
}

/* ─── Floating TTS Button (FAB) at Bottom-Right Corner ─────────────────────── */
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
          "group relative flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full border shadow-xl transition-all duration-200 cursor-pointer select-none active:scale-95 touch-manipulation backdrop-blur-md",
          isPlaying
            ? "bg-amber-600/95 hover:bg-amber-600 text-white border-amber-300/40 shadow-[0_0_24px_rgba(245,158,11,0.6)]"
            : isPaused
            ? "bg-emerald-600/95 hover:bg-emerald-600 text-white border-emerald-300/40 shadow-[0_8px_24px_-4px_rgba(16,185,129,0.5)]"
            : "bg-gradient-to-r from-orange-500/90 to-amber-500/90 hover:from-orange-500 hover:to-amber-500 text-white border-white/25 shadow-[0_8px_24px_-4px_rgba(249,115,22,0.6)] hover:brightness-105"
        )}
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 text-amber-200 fill-current animate-pulse shrink-0" />
            <span className="text-xs font-bold tracking-wide">Pause</span>
            <span className="flex h-2 w-2 relative ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          </>
        ) : isPaused ? (
          <>
            <Play className="w-4 h-4 text-emerald-200 fill-current shrink-0" />
            <span className="text-xs font-bold tracking-wide">Resume</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold tracking-wide">Listen</span>
          </>
        )}
      </button>
    </div>
  );
}

/* ─── TTS Word-by-Word Highlighted Text Component ──────────────────────────── */
export function TTSHighlightedText({
  text,
  activeCharIndex,
  offset = 0,
  isSpeaking,
  className,
}: {
  text: string;
  activeCharIndex: number | null;
  offset?: number;
  isSpeaking: boolean;
  className?: string;
}) {
  if (
    !isSpeaking ||
    activeCharIndex === null ||
    activeCharIndex < offset ||
    activeCharIndex >= offset + text.length
  ) {
    return <span className={className}>{text}</span>;
  }

  const localIndex = activeCharIndex - offset;
  const parts = text.split(/(\s+)/g);
  let charCounter = 0;

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const start = charCounter;
        const end = start + part.length;
        charCounter = end;

        if (/\s+/.test(part)) {
          return <span key={i}>{part}</span>;
        }

        const isWordActive = localIndex >= start && localIndex < end;

        if (isWordActive) {
          return (
            <span
              key={i}
              className="inline-block px-1.5 -mx-0.5 py-0.5 rounded-lg bg-white/30 dark:bg-white/25 backdrop-blur-md border border-white/50 text-white shadow-[0_4px_16px_rgba(255,255,255,0.3)] ring-1 ring-white/40 font-semibold transition-all duration-150"
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
