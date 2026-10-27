"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/format";
import { haptic } from "@/lib/haptics";
import { TTS_VOICE_PROFILES, type TTSVoiceProfile } from "@/lib/settings";
import type { TTSVoiceId } from "@/lib/types";
import { loadSettings, STORAGE_EVENT } from "@/lib/storage";

export interface VoiceConfig {
  voice: SpeechSynthesisVoice | null;
  pitch: number;
  rate: number;
  profile: TTSVoiceProfile;
}

/* ─── Robust Gender & Voice Classification ──────────────────────────────────── */
export function isFemaleVoice(v: SpeechSynthesisVoice): boolean {
  const name = v.name.toLowerCase();
  const uri = (v.voiceURI || "").toLowerCase();
  const text = `${name} ${uri}`;

  // Explicit female keywords
  if (/\b(female|woman|girl)\b/.test(text)) return true;

  // Known female voice names (Windows, macOS, iOS, Edge, Google)
  if (
    /zira|jenny|aria|samantha|karen|victoria|moira|fiona|tessa|ava|allison|susan|heera|catherine|neerja|sonia|michelle|clara|libby|mia|emma|serena|kate|veena|hazel|stephanie/i.test(
      name
    )
  ) {
    return true;
  }

  // If it's explicitly male, definitely NOT female
  if (isMaleVoice(v)) return false;

  // Google US English in Chromium is female by default
  if (name.includes("google us english") && !name.includes("male")) {
    return true;
  }

  return false;
}

export function isMaleVoice(v: SpeechSynthesisVoice): boolean {
  const name = v.name.toLowerCase();
  const uri = (v.voiceURI || "").toLowerCase();
  const text = `${name} ${uri}`;

  // If it explicitly says female, definitely NOT male
  if (/\b(female|woman|girl)\b/.test(text)) return false;

  // Explicit male keywords
  if (/\b(male|man|boy)\b/.test(text)) return true;

  // Known male voice names (Windows, macOS, iOS, Edge, Google)
  if (
    /david|mark|george|guy|christopher|daniel|oliver|alex|fred|tom|arthur|eric|steffan|brian|william|ryan|richard|ravi|sean|prabhat/i.test(
      name
    )
  ) {
    return true;
  }

  return false;
}

/* ─── Flexible Persona Voice Matching ──────────────────────────────────────── */
export function findVoiceForProfile(profileId: TTSVoiceId = "cute"): VoiceConfig {
  const profile = TTS_VOICE_PROFILES.find((p) => p.id === profileId) || TTS_VOICE_PROFILES[0];
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return { voice: null, pitch: profile.pitch, rate: profile.rate, profile };
  }
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) {
    return { voice: null, pitch: profile.pitch, rate: profile.rate, profile };
  }

  const enVoices = voices.filter((v) => v.lang.startsWith("en"));
  const pool = enVoices.length > 0 ? enVoices : voices;

  let matchedVoice: SpeechSynthesisVoice | null = null;

  if (profileId === "cute") {
    // Sweet, natural female voice in English
    const femalePool = pool.filter(isFemaleVoice);
    const checks = [
      (v: SpeechSynthesisVoice) => /jenny|aria/i.test(v.name),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes("google us english"),
      (v: SpeechSynthesisVoice) => /samantha|ava|victoria/i.test(v.name),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes("zira"),
      (v: SpeechSynthesisVoice) => /natural|female/i.test(v.name) && v.lang === "en-US",
      (v: SpeechSynthesisVoice) => v.lang === "en-US",
      (v: SpeechSynthesisVoice) => true,
    ];
    for (const check of checks) {
      const found = femalePool.find(check);
      if (found) {
        matchedVoice = found;
        break;
      }
    }
    // Only if system has zero female voices at all, fall back to safe english voice
    if (!matchedVoice) {
      matchedVoice = pool.find((v) => v.lang === "en-US") || pool[0];
    }
  } else if (profileId === "storyteller") {
    // Rich, dramatic male voice (favors British or deep narrative baritone)
    const malePool = pool.filter(isMaleVoice);
    const checks = [
      (v: SpeechSynthesisVoice) => /george|daniel|oliver/i.test(v.name),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes("google uk english male"),
      (v: SpeechSynthesisVoice) => /guy|christopher|richard/i.test(v.name),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes("david"),
      (v: SpeechSynthesisVoice) => v.lang === "en-GB",
      (v: SpeechSynthesisVoice) => true,
    ];
    for (const check of checks) {
      const found = malePool.find(check);
      if (found) {
        matchedVoice = found;
        break;
      }
    }
    if (!matchedVoice) {
      matchedVoice = pool.find((v) => v.lang === "en-GB") || pool.find((v) => v.lang === "en-US") || pool[0];
    }
  } else if (profileId === "professor") {
    // Clear, authoritative STEM male voice (favors American academic clarity)
    const malePool = pool.filter(isMaleVoice);
    const checks = [
      (v: SpeechSynthesisVoice) => /mark|guy|alex/i.test(v.name),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes("google us english male"),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes("david"),
      (v: SpeechSynthesisVoice) => /christopher|daniel/i.test(v.name),
      (v: SpeechSynthesisVoice) => v.lang === "en-US",
      (v: SpeechSynthesisVoice) => true,
    ];
    for (const check of checks) {
      const found = malePool.find(check);
      if (found) {
        matchedVoice = found;
        break;
      }
    }
    if (!matchedVoice) {
      matchedVoice = pool.find((v) => v.lang === "en-US") || pool[0];
    }
  } else if (profileId === "mentor") {
    // Soothing, calm, supportive tutor (female)
    const femalePool = pool.filter(isFemaleVoice);
    const checks = [
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes("google uk english female"),
      (v: SpeechSynthesisVoice) => /moira|victoria|karen|sonia/i.test(v.name),
      (v: SpeechSynthesisVoice) => /samantha|aria|jenny/i.test(v.name),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes("zira"),
      (v: SpeechSynthesisVoice) => v.lang === "en-GB",
      (v: SpeechSynthesisVoice) => v.lang === "en-US",
      (v: SpeechSynthesisVoice) => true,
    ];
    for (const check of checks) {
      const found = femalePool.find(check);
      if (found) {
        matchedVoice = found;
        break;
      }
    }
    if (!matchedVoice) {
      matchedVoice = pool.find((v) => v.lang === "en-GB") || pool.find((v) => v.lang === "en-US") || pool[0];
    }
  } else if (profileId === "mystic") {
    // Atmospheric, intriguing, British or international English
    const checks = [
      (v: SpeechSynthesisVoice) => /serena|kate|moira|oliver/i.test(v.name),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes("google uk english"),
      (v: SpeechSynthesisVoice) => v.lang === "en-GB" || v.lang === "en-IE",
      (v: SpeechSynthesisVoice) => /daniel|george/i.test(v.name),
      (v: SpeechSynthesisVoice) => v.lang.startsWith("en"),
    ];
    for (const check of checks) {
      const found = pool.find(check);
      if (found) {
        matchedVoice = found;
        break;
      }
    }
    if (!matchedVoice) {
      matchedVoice = pool[0];
    }
  } else if (profileId === "radio") {
    // Punchy, upbeat, energetic broadcast host (male)
    const malePool = pool.filter(isMaleVoice);
    const checks = [
      (v: SpeechSynthesisVoice) => /david|mark|guy|alex/i.test(v.name),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes("google us english male"),
      (v: SpeechSynthesisVoice) => /daniel|ryan/i.test(v.name),
      (v: SpeechSynthesisVoice) => v.lang === "en-US",
      (v: SpeechSynthesisVoice) => true,
    ];
    for (const check of checks) {
      const found = malePool.find(check);
      if (found) {
        matchedVoice = found;
        break;
      }
    }
    if (!matchedVoice) {
      matchedVoice = pool.find((v) => v.lang === "en-US") || pool[0];
    }
  }

  return {
    voice: matchedVoice || pool[0] || voices[0] || null,
    pitch: profile.pitch,
    rate: profile.rate,
    profile,
  };
}

/* ─── Backward compatibility wrapper ───────────────────────────────────────── */
export function findCuteFemaleVoice(): SpeechSynthesisVoice | null {
  return findVoiceForProfile("cute").voice;
}

/* ─── Clean text for natural speech (strips asterisks, bullets, markdown) ──── */
export function cleanForSpeech(raw: string): string {
  if (!raw) return "";
  return raw
    // Strip markdown bold and italic formatting: **text** -> text, *text* -> text
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1")
    .replace(/_{1,3}([^_]+)_{1,3}/g, "$1")
    .replace(/\*/g, "")
    // Strip bullet points and bullet symbols
    .replace(/[•·▪▫➢➔►▶]/g, "")
    // Convert chemical / mathematical arrows into spoken words
    .replace(/→/g, " yields ")
    .replace(/↑/g, " gas ")
    .replace(/↓/g, " precipitate ")
    // Convert markdown links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Convert bracketed labels [blue] -> (blue)
    .replace(/\[([^\]]+)\]/g, " ($1) ")
    // Clean up LaTeX formatting like xrightarrow{...}
    .replace(/xrightarrow\{[^}]*\}/g, " yields ")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/[{}]/g, " ")
    // Collapse whitespace and clean punctuation spacing
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}

/* ─── Estimate Word Duration (Calibrated to natural ~150 WPM TTS speed) ────── */
function estimateWordDuration(word: string, rate: number = 1.0): number {
  const clean = word.replace(/[^a-zA-Z0-9]/g, "");
  const len = Math.max(1, clean.length);
  // Base phoneme onset ~140ms + ~44ms per letter at rate 1.0 (~150 WPM)
  let ms = (140 + len * 44) / Math.max(0.5, rate);
  if (/[,;—–-]/.test(word)) ms += 180 / Math.max(0.5, rate);
  if (/[.!?:]/.test(word)) ms += 320 / Math.max(0.5, rate);
  return Math.max(240, Math.round(ms));
}

export interface WordToken {
  word: string;
  start: number;
  end: number;
  index: number;
  durationMs: number;
}

export function tokenizeWords(fullText: string, rate: number = 1.0): WordToken[] {
  if (!fullText) return [];
  const tokens: WordToken[] = [];
  const regex = /\S+/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(fullText)) !== null) {
    tokens.push({
      word: match[0],
      start: match.index,
      end: match.index + match[0].length,
      index: tokens.length,
      durationMs: estimateWordDuration(match[0], rate),
    });
  }
  return tokens;
}

export interface CuteTTSState {
  isPlaying: boolean;
  isPaused: boolean;
  activeWordIndex: number | null;
  toggle: () => void;
  stop: () => void;
  start: () => void;
}

export interface UseCuteTTSOptions {
  autoPlay?: boolean;
  voiceId?: TTSVoiceId;
}

export function useCuteTTS(
  text: string,
  id?: string,
  options?: UseCuteTTSOptions
): CuteTTSState {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  const [activeVoiceId, setActiveVoiceId] = useState<TTSVoiceId>(() => {
    if (options?.voiceId) return options.voiceId;
    if (typeof window !== "undefined") {
      try {
        const s = loadSettings();
        if (s.ttsVoice) return s.ttsVoice;
      } catch {}
    }
    return "cute";
  });

  // Keep active voice synchronized with global settings across the app
  useEffect(() => {
    if (options?.voiceId) {
      setActiveVoiceId(options.voiceId);
      return;
    }
    const updateVoice = () => {
      try {
        const s = loadSettings();
        if (s.ttsVoice) setActiveVoiceId(s.ttsVoice);
      } catch {}
    };
    updateVoice();
    window.addEventListener(STORAGE_EVENT, updateVoice);
    window.addEventListener("storage", updateVoice);
    return () => {
      window.removeEventListener(STORAGE_EVENT, updateVoice);
      window.removeEventListener("storage", updateVoice);
    };
  }, [options?.voiceId]);

  // Preload and observe browser voice availability (Chromium voices load asynchronously)
  const [voicesLoaded, setVoicesLoaded] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.getVoices();
    } catch {}
    const onVoicesChanged = () => {
      setVoicesLoaded((prev) => prev + 1);
    };
    window.speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
    };
  }, []);

  const pausedWordIndexRef = useRef(0);
  const currentWordIndexRef = useRef(0);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const tickerTimeoutRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);
  const isPausedRef = useRef(false);
  const autoPlay = options?.autoPlay ?? false;
  const autoPlayRef = useRef(autoPlay);

  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  const voiceConfig = useMemo(() => {
    return findVoiceForProfile(activeVoiceId);
  }, [activeVoiceId, voicesLoaded]);

  // Pre-tokenize words for boundary indexing and smooth duration calculation matching speech rate
  const wordTokens = useMemo(() => {
    return tokenizeWords(text || "", voiceConfig.rate);
  }, [text, voiceConfig.rate]);

  // Keep ref flags synchronized with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Pre-warm voices list on mount
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
    isPausedRef.current = false;
    isPlayingRef.current = false;
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
  }, [clearTicker]);

  // Step through words with calibrated speech pace (~150 WPM)
  const advanceTicker = useCallback(
    (targetIndex: number) => {
      clearTicker();

      if (!isPlayingRef.current || isPausedRef.current) return;
      if (targetIndex >= wordTokens.length) {
        return;
      }

      currentWordIndexRef.current = targetIndex;
      setActiveWordIndex(targetIndex);

      const duration = wordTokens[targetIndex]?.durationMs || 360;

      tickerTimeoutRef.current = window.setTimeout(() => {
        if (isPlayingRef.current && !isPausedRef.current) {
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
        stopAll();
        return;
      }

      // Find safe chunk boundary for browser synthesis (~18-24 words or nearest sentence boundary)
      let endWordIdx = Math.min(wordTokens.length, startWordIdx + 20);
      for (let i = startWordIdx + 8; i < Math.min(wordTokens.length, startWordIdx + 28); i++) {
        if (/[.!?:]/.test(wordTokens[i].word)) {
          endWordIdx = i + 1;
          break;
        }
      }

      // Slice ONLY this chunk to prevent browser speech buffer overflow on long notes chapters
      const chunkWords = wordTokens.slice(startWordIdx, endWordIdx);
      const textToSpeak = chunkWords.map((w) => w.word).join(" ").trim();
      if (!textToSpeak) {
        stopAll();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "en-US";

      const currentConfig = findVoiceForProfile(activeVoiceId);
      if (currentConfig.voice) {
        utterance.voice = currentConfig.voice;
        if (currentConfig.voice.lang) utterance.lang = currentConfig.voice.lang;
      }

      utterance.pitch = currentConfig.pitch;
      utterance.rate = currentConfig.rate;

      // Optimistically update playing state and first active word
      isPausedRef.current = false;
      isPlayingRef.current = true;
      setIsPlaying(true);
      setIsPaused(false);
      currentWordIndexRef.current = startWordIdx;
      setActiveWordIndex(startWordIdx);

      utterance.onstart = () => {
        if (isPausedRef.current) return;
        setIsPlaying(true);
        setIsPaused(false);
        isPlayingRef.current = true;
        currentWordIndexRef.current = startWordIdx;
        setActiveWordIndex(startWordIdx);
        advanceTicker(startWordIdx);
      };

      utterance.onboundary = (e) => {
        if (isPausedRef.current || !isPlayingRef.current) return;
        if (e.name && e.name !== "word") return;

        // Map boundary charIndex to relative word in current chunk
        let charAcc = 0;
        let relativeWordIdx = 0;
        for (let i = 0; i < chunkWords.length; i++) {
          const wLen = chunkWords[i].word.length;
          if ((e.charIndex || 0) >= charAcc && (e.charIndex || 0) <= charAcc + wLen) {
            relativeWordIdx = i;
            break;
          }
          charAcc += wLen + 1;
        }

        const matchedIndex = Math.min(endWordIdx - 1, startWordIdx + relativeWordIdx);
        currentWordIndexRef.current = matchedIndex;
        setActiveWordIndex(matchedIndex);

        // Resync ticker to wait for the remaining duration of this matched word before stepping
        clearTicker();
        const duration = wordTokens[matchedIndex]?.durationMs || 360;
        tickerTimeoutRef.current = window.setTimeout(() => {
          if (isPlayingRef.current && !isPausedRef.current) {
            advanceTicker(matchedIndex + 1);
          }
        }, duration);
      };

      utterance.onend = () => {
        // If user paused, cancel() triggers onend. Do NOT wipe paused state!
        if (isPausedRef.current) return;

        // If there are more words left in the text, speak next chunk seamlessly!
        if (endWordIdx < wordTokens.length) {
          startFrom(endWordIdx);
          return;
        }

        clearTicker();
        setIsPlaying(false);
        setIsPaused(false);
        isPlayingRef.current = false;
        setActiveWordIndex(null);
        pausedWordIndexRef.current = 0;
        currentWordIndexRef.current = 0;
        activeUtteranceRef.current = null;
      };

      utterance.onerror = (e) => {
        // Ignore expected interruption errors caused by manual pause cancel()
        if (isPausedRef.current || (e && (e.error === "canceled" || e.error === "interrupted"))) {
          return;
        }
        clearTicker();
        setIsPlaying(false);
        setIsPaused(false);
        isPlayingRef.current = false;
        setActiveWordIndex(null);
        activeUtteranceRef.current = null;
      };

      activeUtteranceRef.current = utterance;
      // Prevent Chromium GC bug
      (window as unknown as { __activeUtterance?: SpeechSynthesisUtterance }).__activeUtterance = utterance;

      // Use a slight 25ms tick to prevent Chromium from dropping speech after cancel()
      window.setTimeout(() => {
        if (isPausedRef.current || !isPlayingRef.current) return;
        try {
          window.speechSynthesis.speak(utterance);
        } catch {
          setIsPlaying(false);
          isPlayingRef.current = false;
        }
      }, 25);
    },
    [advanceTicker, clearTicker, stopAll, text, wordTokens]
  );

  // Handle id/text change and auto-play across quiz questions
  useEffect(() => {
    if (autoPlayRef.current && text && text.trim().length > 0) {
      startFrom(0);
    } else {
      stopAll();
    }
    return () => {
      stopAll();
    };
  }, [id, text, autoPlay, startFrom, stopAll]);

  const toggle = useCallback(() => {
    haptic("light");

    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlaying) {
      // ─── USER TAPS PAUSE ──────────────────────────────────────────────────
      clearTicker();
      isPausedRef.current = true;
      isPlayingRef.current = false;

      // Remember the exact word where user stopped
      const pausedWord = currentWordIndexRef.current;
      pausedWordIndexRef.current = pausedWord;

      // Cancel audio stream
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
      isPausedRef.current = false;
      startFrom(resumeIndex);
      return;
    }

    // ─── USER TAPS START (From Word 0) ──────────────────────────────────────
    isPausedRef.current = false;
    pausedWordIndexRef.current = 0;
    currentWordIndexRef.current = 0;
    startFrom(0);
  }, [isPlaying, isPaused, clearTicker, startFrom]);

  const start = useCallback(() => {
    isPausedRef.current = false;
    pausedWordIndexRef.current = 0;
    currentWordIndexRef.current = 0;
    startFrom(0);
  }, [startFrom]);

  return {
    isPlaying,
    isPaused,
    activeWordIndex,
    toggle,
    stop: stopAll,
    start,
  };
}

/* ─── Circular Floating TTS Button in True Glassmorphism Style ─────────────── */
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
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
        className={cn(
          "group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer select-none active:scale-90 touch-manipulation border",
          isPlaying
            ? "bg-gradient-to-br from-amber-500/25 to-amber-600/20 dark:from-amber-400/25 dark:to-amber-500/15 border-amber-400/60 dark:border-amber-300/50 text-amber-500 dark:text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.38),0_8px_30px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.6)] ring-2 ring-amber-400/30 dark:ring-amber-300/30 animate-pulse"
            : isPaused
            ? "bg-gradient-to-br from-emerald-500/25 to-teal-600/20 dark:from-emerald-400/25 dark:to-teal-500/15 border-emerald-400/60 dark:border-emerald-300/50 text-emerald-500 dark:text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.35),0_8px_30px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.6)] ring-2 ring-emerald-400/30 dark:ring-emerald-300/30"
            : "bg-white/[0.14] dark:bg-white/[0.08] hover:bg-white/[0.22] dark:hover:bg-white/[0.14] border-white/35 dark:border-white/20 text-fg/80 hover:text-fg shadow-[0_8px_30px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.45)] hover:shadow-lg"
        )}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 fill-current drop-shadow-sm shrink-0" />
        ) : isPaused ? (
          <Play className="w-4 h-4 fill-current ml-0.5 drop-shadow-sm shrink-0" />
        ) : (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 drop-shadow-sm transition-transform duration-200 group-hover:scale-110" />
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

  // Split text into alternating whitespace and word tokens
  const parts = useMemo(() => text.split(/(\s+)/), [text]);

  let wordCounter = 0;

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (!part) return null;

        // Render whitespace chunks directly without word counter increment
        if (/^\s+$/.test(part)) {
          return <React.Fragment key={i}>{part}</React.Fragment>;
        }

        const currentWordIdx = wordCounter;
        wordCounter++;

        const isCurrentActive =
          Boolean(isSpeaking) &&
          activeWordIndex !== null &&
          activeWordIndex === wordOffset + currentWordIdx;

        return (
          <span
            key={i}
            className={
              isCurrentActive
                ? "bg-amber-400/25 dark:bg-amber-300/25 text-inherit rounded-[3px] transition-colors duration-150 ease-out"
                : "text-inherit transition-colors duration-150 ease-out"
            }
          >
            {part}
          </span>
        );
      })}
    </span>
  );
}
