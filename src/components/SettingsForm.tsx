"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, BarChart3, Check, CircleAlert, ExternalLink, History, Loader2, Monitor, Moon, Sun, Trash2 } from "lucide-react";
import { Card, CollapsibleSection, Label, Segmented, Switch, chip, inputCls } from "@/components/ui";
import { useTheme } from "@/lib/client-hooks";
import { cn } from "@/lib/format";
import { MAX_QUESTIONS, MAX_TIME, MAX_TOTAL_TIME, MIN_TIME, MIN_TOTAL_TIME, QUESTION_PRESETS, SOURCE_META, TIME_PRESETS, TOTAL_TIME_PRESETS } from "@/lib/settings";
import { clearAttempts, loadSettings, saveSettings } from "@/lib/storage";
import type { Difficulty, SourceId, ThemePref, TimerMode, UserSettings } from "@/lib/types";
import { useAttempts } from "@/lib/use-local-data";

const timeLabel = (t: number) => (t === 0 ? "No limit" : `${t}s`);
const totalLabel = (t: number) => (t >= 3600 && t % 3600 === 0 ? `${t / 3600} hr` : `${Math.round(t / 60)} min`);

export default function SettingsForm() {
  const { pref, setPref } = useTheme();
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
  const [openData, setOpenData] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const hydrated = useRef(false);

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
            <span>{s.autoFullscreen ? "🖥️ Fullscreen on" : "Windowed"}</span>
          </span>
        }
      >
        <p className="text-xs sm:text-sm leading-relaxed text-muted mb-4">
          Answers, explanations and your score appear only on the results screen after the quiz.
        </p>
        <div className="space-y-4">
          <Switch
            checked={s.autoFullscreen}
            onChange={(v) => update({ autoFullscreen: v })}
            label="Full screen by default"
            description="Pre-enable the full screen option in the quiz builder."
          />
        </div>
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

      {/* 05 Your data (Collapsible) */}
      <CollapsibleSection
        stepNumber="05"
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
