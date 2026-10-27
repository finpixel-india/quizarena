"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, BarChart3, Bell, BellRing, Check, CircleAlert, ExternalLink, History, Loader2, Mic, Monitor, Moon, Pause, Play, Send, Sparkles, Square, Sun, Trash2, Type, Volume2 } from "lucide-react";
import { Card, CollapsibleSection, Label, Segmented, Switch, chip, inputCls } from "@/components/ui";
import { useAppTypography, useFullscreen, useTheme } from "@/lib/client-hooks";
import { cn } from "@/lib/format";
import { haptic } from "@/lib/haptics";
import { APP_FONTS, APP_FONT_SIZES, MAX_QUESTIONS, MAX_TIME, MAX_TOTAL_TIME, MIN_TIME, MIN_TOTAL_TIME, QUESTION_PRESETS, SOURCE_META, TIME_PRESETS, TOTAL_TIME_PRESETS, TTS_VOICE_PROFILES, type TTSVoiceProfile } from "@/lib/settings";
import { clearAttempts, loadSettings, saveSettings } from "@/lib/storage";
import { cancelReminders, requestNotificationPermission, scheduleDailyReminders, sendTestNotification } from "@/lib/notifications";
import { findVoiceForProfile } from "@/components/FloatingTTS";
import type { AppFontFamily, AppFontSize, Difficulty, SourceId, ThemePref, TimerMode, TTSVoiceId, UserSettings } from "@/lib/types";
import { useAttempts } from "@/lib/use-local-data";

const timeLabel = (t: number) => (t === 0 ? "No limit" : `${t}s`);
const totalLabel = (t: number) => (t >= 3600 && t % 3600 === 0 ? `${t / 3600} hr` : `${Math.round(t / 60)} min`);

export default function SettingsForm() {
  const { pref, setPref } = useTheme();
  const { font, fontSize, setFont, setFontSize } = useAppTypography();
  const fs = useFullscreen();
  const { summaries } = useAttempts();
  const [s, setS] = useState<UserSettings>(() => loadSettings());
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [count, setCount] = useState(0);
  const [clearing, setClearing] = useState(false);
  const [qText, setQText] = useState("");
  const [tText, setTText] = useState("");
  const [totalText, setTotalText] = useState("");
  const [openSource, setOpenSource] = useState(false);
  const [openDefaults, setOpenDefaults] = useState(false);
  const [openGameplay, setOpenGameplay] = useState(false);
  const [openAppearance, setOpenAppearance] = useState(false);
  const [openTypography, setOpenTypography] = useState(false);
  const [openVoice, setOpenVoice] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openData, setOpenData] = useState(false);
  const [activePreviewId, setActivePreviewId] = useState<TTSVoiceId | null>(null);
  const [isPreviewPaused, setIsPreviewPaused] = useState(false);
  const [testSending, setTestSending] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const hydrated = useRef(false);
  const previewUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const previewTimerRef = useRef<number | null>(null);
  const previewSessionCounterRef = useRef<number>(0);
  const previewWordIndexRef = useRef<number>(0);

  // Helper to completely stop any audio preview and clear all timers
  const stopAudioPreview = useCallback(() => {
    previewSessionCounterRef.current += 1;

    if (previewTimerRef.current) {
      window.clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }

    if (previewUtteranceRef.current) {
      previewUtteranceRef.current.onstart = null;
      previewUtteranceRef.current.onboundary = null;
      previewUtteranceRef.current.onend = null;
      previewUtteranceRef.current.onerror = null;
      previewUtteranceRef.current = null;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }

    (window as unknown as { __activePreviewUtterance?: SpeechSynthesisUtterance }).__activePreviewUtterance = undefined;
    setActivePreviewId(null);
    setIsPreviewPaused(false);
    previewWordIndexRef.current = 0;
  }, []);

  // Pre-warm speech synthesis engine and listen for voiceschanged (Chromium loads voices asynchronously)
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.getVoices();
    } catch {}
    const handleVoicesChanged = () => {
      try {
        window.speechSynthesis.getVoices();
      } catch {}
    };
    window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
      stopAudioPreview();
    };
  }, [stopAudioPreview]);

  // Core speech synthesis function for preview slices
  const speakPreviewSlice = useCallback(
    (profile: TTSVoiceProfile, startIndex: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        alert("Speech synthesis is not supported in this browser.");
        return;
      }

      // Invalidate any previous utterance sessions
      const sessionId = ++previewSessionCounterRef.current;

      if (previewTimerRef.current) {
        window.clearTimeout(previewTimerRef.current);
        previewTimerRef.current = null;
      }

      // Detach listeners from old utterance before cancelling
      if (previewUtteranceRef.current) {
        previewUtteranceRef.current.onstart = null;
        previewUtteranceRef.current.onboundary = null;
        previewUtteranceRef.current.onend = null;
        previewUtteranceRef.current.onerror = null;
        previewUtteranceRef.current = null;
      }

      // Cancel any ongoing speech
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();
      } catch {}

      const allWords = profile.sample.split(/\s+/).filter(Boolean);
      const safeStart = Math.max(0, Math.min(startIndex, allWords.length - 1));
      const sliceWords = allWords.slice(safeStart);
      const textToSpeak = sliceWords.join(" ");

      if (!textToSpeak.trim()) {
        stopAudioPreview();
        return;
      }

      // Match voice profile
      const config = findVoiceForProfile(profile.id);
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "en-US";
      if (config.voice) {
        utterance.voice = config.voice;
        if (config.voice.lang) utterance.lang = config.voice.lang;
      }
      utterance.pitch = config.pitch;
      utterance.rate = config.rate;

      // Update UI state immediately
      setActivePreviewId(profile.id);
      setIsPreviewPaused(false);
      previewWordIndexRef.current = safeStart;

      utterance.onstart = () => {
        if (previewSessionCounterRef.current !== sessionId) return;
        setActivePreviewId(profile.id);
        setIsPreviewPaused(false);
      };

      utterance.onboundary = (e) => {
        if (previewSessionCounterRef.current !== sessionId) return;
        if (e.name && e.name !== "word") return;
        const relChar = e.charIndex || 0;
        let acc = 0;
        let relIdx = 0;
        for (let i = 0; i < sliceWords.length; i++) {
          const wLen = sliceWords[i].length;
          if (relChar >= acc && relChar <= acc + wLen) {
            relIdx = i;
            break;
          }
          acc += wLen + 1;
        }
        previewWordIndexRef.current = safeStart + relIdx;
      };

      utterance.onend = () => {
        if (previewSessionCounterRef.current !== sessionId) return;
        stopAudioPreview();
      };

      utterance.onerror = (e) => {
        if (previewSessionCounterRef.current !== sessionId) return;
        // Ignore expected cancellation or interruption
        if (e && (e.error === "canceled" || e.error === "interrupted")) {
          return;
        }
        stopAudioPreview();
      };

      // Keep utterance in ref and window to prevent Chromium GC premature collection
      previewUtteranceRef.current = utterance;
      (window as unknown as { __activePreviewUtterance?: SpeechSynthesisUtterance }).__activePreviewUtterance = utterance;

      // Safety fallback timer (word count * 800ms + 3.5s buffer)
      const estDurationMs = Math.round((sliceWords.length * 800) / Math.max(0.5, config.rate)) + 3500;
      previewTimerRef.current = window.setTimeout(() => {
        if (previewSessionCounterRef.current === sessionId) {
          stopAudioPreview();
        }
      }, estDurationMs);

      // 40ms dispatch tick ensures cancel() finishes cleanly in Chromium
      window.setTimeout(() => {
        if (previewSessionCounterRef.current !== sessionId) return;
        try {
          window.speechSynthesis.speak(utterance);
        } catch {
          stopAudioPreview();
        }
      }, 40);
    },
    [stopAudioPreview]
  );

  function handlePlaySample(e: React.MouseEvent, profile: TTSVoiceProfile) {
    e.stopPropagation();
    haptic("light");
    speakPreviewSlice(profile, 0);
  }

  function handlePauseSample(e: React.MouseEvent) {
    e.stopPropagation();
    haptic("light");
    if (previewTimerRef.current) {
      window.clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    if (previewUtteranceRef.current) {
      previewUtteranceRef.current.onstart = null;
      previewUtteranceRef.current.onboundary = null;
      previewUtteranceRef.current.onend = null;
      previewUtteranceRef.current.onerror = null;
      previewUtteranceRef.current = null;
    }
    previewSessionCounterRef.current += 1;
    try {
      window.speechSynthesis.cancel();
    } catch {}
    setIsPreviewPaused(true);
  }

  function handleResumeSample(e: React.MouseEvent, profile: TTSVoiceProfile) {
    e.stopPropagation();
    haptic("light");
    const resumeIndex = previewWordIndexRef.current || 0;
    speakPreviewSlice(profile, resumeIndex);
  }

  function handleStopSample(e: React.MouseEvent) {
    e.stopPropagation();
    haptic("light");
    stopAudioPreview();
  }

  useEffect(() => {
    const initial = loadSettings();
    setS(initial);
    setQText(QUESTION_PRESETS.includes(initial.defaultQuestions) ? "" : String(initial.defaultQuestions));
    setTText(TIME_PRESETS.includes(initial.defaultTime) ? "" : String(initial.defaultTime));
    setTotalText(TOTAL_TIME_PRESETS.includes(initial.defaultTotalTime) ? "" : String(initial.defaultTotalTime / 60));
    hydrated.current = true;
  }, []);

  useEffect(() => {
    setCount(summaries.length);
  }, [summaries.length]);

  function update(patch: Partial<UserSettings>) {
    const next = { ...s, ...patch };
    setS(next);
    setStatus("saving");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      try {
        saveSettings(next);
        setStatus("saved");
      } catch {
        setStatus("error");
      }
    }, 200);
  }

  function clearHistory() {
    if (!window.confirm("Delete ALL quiz history, reviews and high scores on this device? This cannot be undone.")) return;
    setClearing(true);
    try {
      clearAttempts();
      setCount(0);
    } finally {
      setClearing(false);
    }
  }

  function formatNotificationTime(h = 19, m = 30) {
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const padMin = m < 10 ? `0${m}` : `${m}`;
    return `${hour12}:${padMin} ${ampm}`;
  }

  async function toggleNotifications(enabled: boolean) {
    if (enabled) {
      const ok = await requestNotificationPermission();
      if (!ok) {
        alert("Notification permissions are required to receive daily practice reminders. Please allow notifications in device settings.");
        return;
      }
      update({ notificationsEnabled: true });
      void scheduleDailyReminders(s.notificationHour ?? 19, s.notificationMinute ?? 30);
    } else {
      update({ notificationsEnabled: false });
      void cancelReminders();
    }
  }

  async function handleSendTest() {
    setTestSending(true);
    setTestSent(false);
    try {
      const ok = await sendTestNotification();
      if (ok) {
        setTestSent(true);
        window.setTimeout(() => setTestSent(false), 3000);
      } else {
        alert("Please allow notification permissions first.");
      }
    } finally {
      setTestSending(false);
    }
  }

  function handleTimePreset(hour: number, minute: number) {
    update({ notificationHour: hour, notificationMinute: minute });
    if (s.notificationsEnabled) {
      void scheduleDailyReminders(hour, minute);
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex h-5 items-center justify-end font-mono text-[11px] uppercase tracking-[0.14em]" aria-live="polite">
        {status === "saving" ? (
          <span className="inline-flex items-center gap-1.5 text-subtle">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving
          </span>
        ) : status === "saved" ? (
          <span className="inline-flex items-center gap-1.5 text-success">
            <Check className="h-3.5 w-3.5" /> Saved
          </span>
        ) : status === "error" ? (
          <span className="inline-flex items-center gap-1.5 text-danger">
            <CircleAlert className="h-3.5 w-3.5" /> Couldn&apos;t save
          </span>
        ) : null}
      </div>

      {/* Activity & Analytics: Direct clean links to History and Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Link
          href="/history"
          className="group flex items-center justify-between rounded-2xl border border-line bg-card p-4 sm:p-5 transition hover:border-brand/50 hover:bg-brand/[0.04] card-shadow"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-ink transition group-hover:scale-105">
              <History className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-fg transition group-hover:text-brand-ink">Quiz History</p>
              <p className="text-xs text-subtle font-mono mt-0.5">
                {count} saved quiz{count === 1 ? "" : "zes"}
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-subtle transition group-hover:text-fg group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <Link
          href="/stats"
          className="group flex items-center justify-between rounded-2xl border border-line bg-card p-4 sm:p-5 transition hover:border-brand/50 hover:bg-brand/[0.04] card-shadow"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-ink transition group-hover:scale-105">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-fg transition group-hover:text-brand-ink">Stats &amp; High Scores</p>
              <p className="text-xs text-subtle font-mono mt-0.5">Accuracy, streaks &amp; niches</p>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-subtle transition group-hover:text-fg group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* 01 Question source (Collapsible) */}
      <CollapsibleSection
        stepNumber="01"
        title="Question source"
        isOpen={openSource}
        onToggle={() => setOpenSource((prev) => !prev)}
        preview={
          <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-2 py-0.5 text-xs font-semibold text-fg">
            <span>{s.source === "bank" ? "📚" : "🌐"}</span>
            <span>{SOURCE_META[s.source]?.name ?? s.source}</span>
          </span>
        }
      >
        <p className="text-xs sm:text-sm leading-relaxed text-muted mb-4">
          Where questions come from by default. You can still switch per quiz in the builder.
        </p>
        <div className="grid gap-2.5">
          {(Object.keys(SOURCE_META) as SourceId[]).map((id) => {
            const meta = SOURCE_META[id];
            const active = s.source === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => update({ source: id })}
                aria-pressed={active}
                className={cn(
                  "flex items-start gap-4 rounded-2xl border p-3.5 sm:p-4 text-left transition",
                  active ? "border-brand bg-brand/[0.06] glow" : "border-line bg-card hover:border-line-2",
                )}
              >
                <span className={cn("mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border", active ? "border-brand" : "border-line-2")}>
                  {active ? <span className="h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_8px_rgba(249,115,22,0.9)]" /> : null}
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-fg">
                    {meta.name}
                    {id === "bank" ? (
                      <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-brand-ink">Recommended</span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">{meta.description}</span>
                  {meta.url ? (
                    <a
                      href={meta.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1.5 inline-flex items-center gap-1 font-mono text-[11px] text-brand-ink hover:underline"
                    >
                      {meta.url.replace("https://", "")} <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-card p-3.5 sm:p-4 text-xs leading-relaxed text-muted">
          <span className="font-semibold text-fg">How it works:</span> Class 9 & 10 chapter quizzes always use the NCERT-aligned curated bank (online trivia
          databases don&apos;t have chapter-wise questions). Your source is used for General Science, History & Geography, Mixed Math and Mixed IT. If an online
          source is unavailable, QuizLab falls back to the curated bank automatically.
        </p>
      </CollapsibleSection>

      {/* 02 Quiz defaults (Collapsible) */}
      <CollapsibleSection
        stepNumber="02"
        title="Quiz defaults"
        isOpen={openDefaults}
        onToggle={() => setOpenDefaults((prev) => !prev)}
        preview={
          <div className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-semibold text-fg truncate">
            <span>{s.defaultQuestions} Q</span>
            <span className="text-line-2">·</span>
            <span>{s.timerMode === "per-question" ? `${s.defaultTime}s` : `${Math.round(s.defaultTotalTime / 60)}m`}</span>
            <span className="text-line-2">·</span>
            <span className="capitalize">{s.defaultDifficulty}</span>
            <span className="text-line-2">·</span>
            <span>{s.hintsPerQuiz ? `${s.hintsPerQuiz}h` : "0h"}</span>
          </div>
        }
      >
        <p className="text-xs sm:text-sm leading-relaxed text-muted mb-4">
          Pre-selected defaults when opening the quiz builder.
        </p>
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-medium text-fg">Number of questions</p>
            <div className="flex flex-wrap items-center gap-2">
              {QUESTION_PRESETS.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={chip(!qText && s.defaultQuestions === n)}
                  onClick={() => {
                    setQText("");
                    update({ defaultQuestions: n });
                  }}
                >
                  {n}
                </button>
              ))}
              <input
                type="number"
                inputMode="numeric"
                placeholder="Custom"
                min={1}
                max={MAX_QUESTIONS}
                value={qText}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                  setQText(v);
                  const n = parseInt(v, 10);
                  if (n >= 1) update({ defaultQuestions: Math.min(MAX_QUESTIONS, n) });
                }}
                className={cn(inputCls(!!qText), "w-24")}
                aria-label="Custom default number of questions"
              />
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-fg">Timer mode</p>
            <Segmented<TimerMode>
              value={s.timerMode}
              onChange={(v) => update({ timerMode: v })}
              options={[
                { v: "per-question", label: "Per question" },
                { v: "total", label: "Whole quiz" },
              ]}
            />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {s.timerMode === "per-question"
                ? TIME_PRESETS.map((t) => (
                    <button key={t} type="button" className={chip(!tText && s.defaultTime === t)} onClick={() => { setTText(""); update({ defaultTime: t }); }}>
                      {timeLabel(t)}
                    </button>
                  ))
                : TOTAL_TIME_PRESETS.map((t) => (
                    <button key={t} type="button" className={chip(!totalText && s.defaultTotalTime === t)} onClick={() => { setTotalText(""); update({ defaultTotalTime: t }); }}>
                      {totalLabel(t)}
                    </button>
                  ))}
              {s.timerMode === "per-question" ? (
                <input
                  type="number" inputMode="numeric" placeholder="Custom s" min={MIN_TIME} max={MAX_TIME} value={tText}
                  onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0, 3); setTText(v); const n = parseInt(v, 10); if (n >= MIN_TIME) update({ defaultTime: Math.min(MAX_TIME, n) }); }}
                  className={cn(inputCls(!!tText), "w-28")} aria-label="Custom default seconds per question"
                />
              ) : (
                <input
                  type="number" inputMode="numeric" placeholder="Custom min" min={Math.round(MIN_TOTAL_TIME / 60)} max={Math.round(MAX_TOTAL_TIME / 60)} value={totalText}
                  onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0, 3); setTotalText(v); const n = parseInt(v, 10); if (n >= 1) update({ defaultTotalTime: Math.min(MAX_TOTAL_TIME, n * 60) }); }}
                  className={cn(inputCls(!!totalText), "w-28")} aria-label="Custom default total minutes"
                />
              )}
            </div>
            <p className="mt-2 text-xs text-subtle">
              {s.timerMode === "per-question" ? `${MIN_TIME}–${MAX_TIME} seconds for each question.` : `One countdown for the whole quiz, ${MIN_TOTAL_TIME / 60}–${Math.round(MAX_TOTAL_TIME / 60)} minutes.`}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-fg">Difficulty (online & math)</p>
            <Segmented<Difficulty>
              value={s.defaultDifficulty}
              onChange={(v) => update({ defaultDifficulty: v })}
              options={[
                { v: "any", label: "Mixed" },
                { v: "easy", label: "Easy" },
                { v: "medium", label: "Medium" },
                { v: "hard", label: "Hard" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-fg">Hints per quiz</p>
              <p className="mt-0.5 text-xs text-subtle">A clue + wrong options removed · −30 pts on that question</p>
            </div>
            <Segmented
              value={s.hintsPerQuiz}
              onChange={(v) => update({ hintsPerQuiz: v })}
              options={[
                { v: 0, label: "Off" },
                { v: 1, label: "1" },
                { v: 2, label: "2" },
                { v: 3, label: "3" },
              ]}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 03 Gameplay (Collapsible) */}
      <CollapsibleSection
        stepNumber="03"
        title="Gameplay"
        isOpen={openGameplay}
        onToggle={() => setOpenGameplay((prev) => !prev)}
        preview={
          <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-2 py-0.5 text-xs font-semibold text-fg">
            <span>{fs.supported && s.autoFullscreen ? "🖥️ Fullscreen on" : "Standard"}</span>
          </span>
        }
      >
        <p className="text-xs sm:text-sm leading-relaxed text-muted mb-4">
          Answers, explanations and your score appear only on the results screen after the quiz.
        </p>
        {fs.supported ? (
          <div className="space-y-4">
            <Switch
              checked={s.autoFullscreen}
              onChange={(v) => update({ autoFullscreen: v })}
              label="Full screen by default"
              description="Pre-enable the full screen option in the quiz builder."
            />
          </div>
        ) : null}
        <p className="mt-4 border-t border-line/60 pt-4 font-mono text-[11px] leading-relaxed text-subtle">
          Scoring: +100 per correct · up to +50 speed bonus when a per-question timer is on · −30 when a hint is used
        </p>
      </CollapsibleSection>

      {/* 04 Appearance (Collapsible) */}
      <CollapsibleSection
        stepNumber="04"
        title="Appearance"
        isOpen={openAppearance}
        onToggle={() => setOpenAppearance((prev) => !prev)}
        preview={
          <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-2 py-0.5 text-xs font-semibold text-fg capitalize">
            <span>{pref === "dark" ? "🌙 Dark" : pref === "light" ? "☀️ Light" : "💻 System"}</span>
          </span>
        }
      >
        <p className="text-xs sm:text-sm leading-relaxed text-muted mb-4">
          Dark mode is the default. Choose your preferred theme.
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {(
            [
              { v: "dark", label: "Dark", icon: Moon },
              { v: "light", label: "Light", icon: Sun },
              { v: "system", label: "System", icon: Monitor },
            ] as Array<{ v: ThemePref; label: string; icon: typeof Sun }>
          ).map((o) => {
            const active = pref === o.v;
            return (
              <button
                key={o.v}
                type="button"
                onClick={() => setPref(o.v)}
                aria-pressed={active}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-2xl border p-4 text-sm font-medium transition",
                  active ? "border-brand bg-brand/[0.06] text-fg glow" : "border-line bg-card text-muted hover:border-line-2 hover:text-fg",
                )}
              >
                <o.icon className={cn("h-5 w-5", active && "text-brand-ink")} strokeWidth={1.75} /> {o.label}
              </button>
            );
          })}
        </div>
      </CollapsibleSection>

      {/* 05 App Typography & Font Size (Collapsible) */}
      <CollapsibleSection
        stepNumber="05"
        title="App font & text size"
        isOpen={openTypography}
        onToggle={() => setOpenTypography((prev) => !prev)}
        preview={
          <div className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-semibold text-fg">
            <span>{APP_FONTS.find((f) => f.id === font)?.name ?? "Geist Sans"}</span>
            <span className="text-line-2">·</span>
            <span>{APP_FONT_SIZES.find((sz) => sz.id === fontSize)?.pct ?? "100%"}</span>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Subheading: Font Family */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-semibold text-fg">Font Family</p>
              <span className="font-mono text-xs text-brand-ink font-semibold">
                {APP_FONTS.find((f) => f.id === font)?.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted mb-3.5">
              Choose your preferred typeface. Changes apply immediately across all quizzes, study notes, and menus.
            </p>

            <div className="grid gap-2.5 sm:grid-cols-2">
              {APP_FONTS.map((f) => {
                const active = font === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      haptic("light");
                      setFont(f.id);
                      update({ appFont: f.id });
                    }}
                    aria-pressed={active}
                    className={cn(
                      "flex flex-col items-start rounded-2xl border p-3.5 sm:p-4 text-left transition active:scale-98",
                      active
                        ? "border-brand bg-brand/[0.06] text-fg glow"
                        : "border-line bg-card text-muted hover:border-line-2 hover:text-fg"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                            active ? "border-brand" : "border-line-2"
                          )}
                        >
                          {active ? (
                            <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_6px_rgba(249,115,22,0.9)]" />
                          ) : null}
                        </span>
                        <span className="text-sm font-bold text-fg">{f.name}</span>
                      </div>
                      <span className="rounded-md border border-line/60 bg-fg/[0.04] px-2 py-0.5 font-mono text-[10px] text-subtle font-semibold uppercase">
                        {f.tag}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-muted leading-snug">{f.subtitle}</p>

                    {/* Live Preview Sample */}
                    <div
                      className="mt-2.5 w-full rounded-xl border border-line/50 bg-fg/[0.02] px-3 py-2 text-xs text-fg leading-relaxed"
                      style={{
                        fontFamily:
                          f.id === "geist"
                            ? "var(--font-geist-sans), sans-serif"
                            : f.id === "system"
                            ? "system-ui, -apple-system, sans-serif"
                            : f.id === "serif"
                            ? '"Newsreader", "Instrument Serif", Georgia, serif'
                            : f.id === "mono"
                            ? "var(--font-geist-mono), monospace"
                            : '"Plus Jakarta Sans", "Quicksand", sans-serif',
                      }}
                    >
                      {f.sample}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subheading: Font Size */}
          <div className="border-t border-line/60 pt-5">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-semibold text-fg">App Text Size</p>
              <span className="font-mono text-xs text-brand-ink font-semibold">
                {APP_FONT_SIZES.find((sz) => sz.id === fontSize)?.label} ({APP_FONT_SIZES.find((sz) => sz.id === fontSize)?.pct})
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted mb-3.5">
              Scales typography across the entire interface.
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {APP_FONT_SIZES.map((sz) => {
                const active = fontSize === sz.id;
                return (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => {
                      haptic("light");
                      setFontSize(sz.id);
                      update({ appFontSize: sz.id });
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-2xl border p-3 sm:p-3.5 text-center transition active:scale-95",
                      active
                        ? "border-brand bg-brand/[0.08] text-fg glow"
                        : "border-line bg-card text-muted hover:border-line-2 hover:text-fg"
                    )}
                  >
                    <span className="text-sm font-bold text-fg">{sz.label}</span>
                    <span className="font-mono text-xs text-brand-ink font-bold mt-0.5">{sz.pct}</span>
                    <span className="text-[10px] text-subtle mt-1 leading-tight">{sz.subtitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Interactive Preview Card */}
            <div className="mt-4 rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-2">
              <p className="font-mono text-[10px] uppercase text-subtle font-bold tracking-wider">
                Live Quiz & Notes Preview
              </p>
              <p className="text-base font-bold text-fg leading-snug">
                Which organelle is universally known as the powerhouse of the cell?
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs sm:text-sm">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 font-semibold text-emerald-700 dark:text-emerald-300">
                  (A) Mitochondria ✓
                </div>
                <div className="rounded-xl border border-line bg-fg/[0.02] px-3 py-2 text-muted">
                  (B) Ribosome
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 06 Pronunciation & Speech Voice (Collapsible) */}
      <CollapsibleSection
        stepNumber="06"
        title="Pronunciation & voice assistant"
        isOpen={openVoice}
        onToggle={() => setOpenVoice((prev) => !prev)}
        preview={
          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-fg">
            <span>{TTS_VOICE_PROFILES.find((v) => v.id === (s.ttsVoice || "cute"))?.avatar}</span>
            <span>{TTS_VOICE_PROFILES.find((v) => v.id === (s.ttsVoice || "cute"))?.name}</span>
            <span className="text-line-2">·</span>
            <span className="text-brand-ink">{TTS_VOICE_PROFILES.find((v) => v.id === (s.ttsVoice || "cute"))?.genderBadge}</span>
          </span>
        }
      >
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-semibold text-fg">AI Pronunciation Persona</p>
              <span className="font-mono text-xs text-brand-ink font-semibold">
                {TTS_VOICE_PROFILES.find((v) => v.id === (s.ttsVoice || "cute"))?.avatar}{" "}
                {TTS_VOICE_PROFILES.find((v) => v.id === (s.ttsVoice || "cute"))?.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted mb-4 leading-relaxed">
              Select your preferred voice for reading chapters, facts, notes, and quiz questions aloud. Tap any persona to activate it, or tap the preview button to listen to a live sample.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {TTS_VOICE_PROFILES.map((vp) => {
                const active = (s.ttsVoice || "cute") === vp.id;
                const isThisActive = activePreviewId === vp.id;
                const isThisPlaying = isThisActive && !isPreviewPaused;
                const isThisPaused = isThisActive && isPreviewPaused;

                return (
                  <div
                    key={vp.id}
                    onClick={() => {
                      haptic("light");
                      update({ ttsVoice: vp.id });
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={active}
                    className={cn(
                      "group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer active:scale-98 select-none",
                      active
                        ? "border-brand bg-brand/[0.08] text-fg shadow-[0_0_24px_-8px_rgba(249,115,22,0.5)]"
                        : "border-line bg-card text-muted hover:border-line-2 hover:text-fg"
                    )}
                  >
                    <div>
                      {/* Top Row: Avatar, Name, Gender Badge, Tag */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{vp.avatar}</span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-fg">{vp.name}</span>
                              {active && (
                                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand text-white shadow-sm">
                                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-[11px] text-brand-ink font-medium">
                              {vp.genderBadge}
                            </span>
                          </div>
                        </div>

                        <span
                          className={cn(
                            "rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider",
                            active
                              ? "border-brand/50 bg-brand/20 text-brand-ink"
                              : "border-line/60 bg-fg/[0.03] text-subtle"
                          )}
                        >
                          {vp.tag}
                        </span>
                      </div>

                      {/* Subtitle & Description */}
                      <p className="mt-2 text-xs text-muted leading-relaxed">
                        {vp.subtitle}
                      </p>

                      {/* Sample Quote Box */}
                      <div className="mt-3 rounded-xl border border-line/60 bg-fg/[0.02] p-2.5 text-[11px] text-fg/80 italic leading-relaxed">
                        &ldquo;{vp.sample}&rdquo;
                      </div>
                    </div>

                    {/* Bottom Action Row: Play/Pause/Resume/Stop Sample Preview Controls */}
                    <div className="mt-4 flex items-center justify-between border-t border-line/50 pt-3">
                      <span className="font-mono text-[10px] text-subtle">
                        {active ? "Active Voice" : "Tap to activate"}
                      </span>

                      {isThisPlaying ? (
                        <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <span className="flex items-center gap-0.5 px-1 py-1 text-amber-400">
                            <span className="h-2 w-0.5 bg-amber-400 animate-pulse" />
                            <span className="h-3.5 w-0.5 bg-amber-400 animate-pulse delay-75" />
                            <span className="h-2 w-0.5 bg-amber-400 animate-pulse delay-150" />
                          </span>

                          <button
                            type="button"
                            onClick={handlePauseSample}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/80 bg-amber-500/20 px-2.5 py-1.5 text-xs font-semibold text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] backdrop-blur-md transition hover:bg-amber-500/30 active:scale-95"
                            title="Pause sample preview"
                          >
                            <Pause className="h-3 w-3 fill-current" />
                            <span>Pause</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleStopSample}
                            className="inline-flex items-center gap-1 rounded-xl border border-line bg-card/80 px-2 py-1.5 text-xs font-medium text-muted hover:text-fg hover:border-line-2 transition active:scale-95"
                            title="Stop sample"
                          >
                            <Square className="h-2.5 w-2.5 fill-current" />
                            <span>Stop</span>
                          </button>
                        </div>
                      ) : isThisPaused ? (
                        <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                            Paused
                          </span>

                          <button
                            type="button"
                            onClick={(e) => handleResumeSample(e, vp)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/80 bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)] backdrop-blur-md transition hover:bg-emerald-500/30 active:scale-95 animate-pulse"
                            title="Resume sample preview"
                          >
                            <Play className="h-3 w-3 fill-current" />
                            <span>Resume</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleStopSample}
                            className="inline-flex items-center gap-1 rounded-xl border border-line bg-card/80 px-2 py-1.5 text-xs font-medium text-muted hover:text-fg hover:border-line-2 transition active:scale-95"
                            title="Stop sample"
                          >
                            <Square className="h-2.5 w-2.5 fill-current" />
                            <span>Stop</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handlePlaySample(e, vp)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-card/80 px-3 py-1.5 text-xs font-semibold backdrop-blur-md text-fg hover:border-brand/60 hover:text-brand-ink transition active:scale-95 shadow-sm"
                          title="Listen to live voice sample"
                        >
                          <Play className="h-3 w-3 fill-current" />
                          <span>Preview</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 07 Notifications & Daily Reminders (Collapsible) */}
      <CollapsibleSection
        stepNumber="07"
        title="Notifications & reminders"
        isOpen={openNotifications}
        onToggle={() => setOpenNotifications((prev) => !prev)}
        preview={
          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-subtle">
            {s.notificationsEnabled ? (
              <span className="text-emerald-500 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active · {formatNotificationTime(s.notificationHour, s.notificationMinute)}
              </span>
            ) : (
              <span className="text-muted">Disabled</span>
            )}
          </span>
        }
      >
        <div className="space-y-6">
          <p className="text-xs sm:text-sm leading-relaxed text-muted">
            Quiz Lab sends gentle offline notifications to keep your NCERT revision consistent, maintain your daily study streak, and sharpen problem-solving habits.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-between rounded-2xl border border-line bg-fg/[0.02] p-4 sm:p-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-ink">
                {s.notificationsEnabled ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-fg">Daily Study Reminders</p>
                <p className="text-xs text-muted">Receive a friendly prompt for daily NCERT practice</p>
              </div>
            </div>
            <Switch
              checked={s.notificationsEnabled}
              onChange={toggleNotifications}
              label="Enable daily study reminders"
            />
          </div>

          {s.notificationsEnabled ? (
            <div className="space-y-4 animate-fade-in">
              <div>
                <Label>Preferred reminder time</Label>
                <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    { label: "Morning", sub: "8:00 AM", h: 8, m: 0 },
                    { label: "Afternoon", sub: "2:00 PM", h: 14, m: 0 },
                    { label: "Evening", sub: "7:30 PM", h: 19, m: 30 },
                    { label: "Night", sub: "9:00 PM", h: 21, m: 0 },
                  ].map((preset) => {
                    const active = (s.notificationHour ?? 19) === preset.h && (s.notificationMinute ?? 30) === preset.m;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handleTimePreset(preset.h, preset.m)}
                        className={cn(
                          "flex flex-col items-center justify-center rounded-xl border p-3 text-center transition active:scale-95",
                          active
                            ? "border-brand bg-brand/[0.08] text-fg glow"
                            : "border-line bg-card text-muted hover:border-line-2 hover:text-fg"
                        )}
                      >
                        <span className={cn("text-xs font-semibold", active ? "text-brand-ink" : "text-fg")}>{preset.label}</span>
                        <span className="font-mono text-[11px] text-muted">{preset.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Test Notification Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-xs text-subtle">Verify notifications on this smartphone:</span>
                <button
                  type="button"
                  onClick={handleSendTest}
                  disabled={testSending}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-3.5 py-2 text-xs font-semibold text-fg transition hover:border-brand/50 hover:bg-brand/[0.04] disabled:opacity-50"
                >
                  {testSending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : testSent ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Send className="h-3.5 w-3.5 text-brand-ink" />
                  )}
                  {testSent ? "Test Notification Sent!" : "Send Test Notification"}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </CollapsibleSection>

      {/* 08 Your data (Collapsible) */}
      <CollapsibleSection
        stepNumber="08"
        title="Your data"
        isOpen={openData}
        onToggle={() => setOpenData((prev) => !prev)}
        preview={
          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-subtle">
            <span className="text-fg">{count}</span> saved quiz{count === 1 ? "" : "zes"}
          </span>
        }
      >
        <p className="text-xs sm:text-sm leading-relaxed text-muted mb-4">
          History is stored only on this device (browser storage) — no account, no server database.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-mono text-sm text-muted">
              <span className="text-fg font-bold">{count}</span> saved quiz{count === 1 ? "" : "zes"} recorded
            </p>
            {count > 0 ? (
              <span className="flex items-center gap-2 text-xs font-semibold">
                <span className="text-line-2">·</span>
                <Link href="/history" className="text-brand-ink hover:underline">
                  View history →
                </Link>
                <span className="text-line-2">·</span>
                <Link href="/stats" className="text-brand-ink hover:underline">
                  View stats →
                </Link>
              </span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={clearHistory}
            disabled={clearing || count === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-danger/40 px-4 py-2.5 text-sm font-medium text-danger transition hover:bg-danger/10 disabled:pointer-events-none disabled:opacity-40"
          >
            {clearing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Clear all history
          </button>
        </div>
      </CollapsibleSection>
    </div>
  );
}
