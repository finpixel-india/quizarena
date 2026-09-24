"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, CircleAlert, ExternalLink, Loader2, Monitor, Moon, Sun, Trash2 } from "lucide-react";
import { Card, Label, Segmented, Switch, chip, inputCls } from "@/components/ui";
import { useTheme } from "@/lib/client-hooks";
import { cn } from "@/lib/format";
import { MAX_QUESTIONS, MAX_TIME, MAX_TOTAL_TIME, MIN_TIME, MIN_TOTAL_TIME, QUESTION_PRESETS, SOURCE_META, TIME_PRESETS, TOTAL_TIME_PRESETS } from "@/lib/settings";
import { clearAttempts, loadSettings, saveSettings } from "@/lib/storage";
import type { Difficulty, SourceId, ThemePref, TimerMode, UserSettings } from "@/lib/types";
import { useAttempts } from "@/lib/use-local-data";

function Section({ n, title, description, children }: { n: string; title: string; description?: string; children: ReactNode }) {
  return (
    <Card className="p-4 sm:p-8">
      <Label n={n}>{title}</Label>
      {description ? <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-muted">{description}</p> : null}
      <div className="mt-4 sm:mt-6">{children}</div>
    </Card>
  );
}

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

      <Section n="01" title="Question source" description="Where questions come from by default. You can still switch per quiz in the builder.">
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
                  "flex items-start gap-4 rounded-2xl border p-4 text-left transition",
                  active ? "border-brand bg-brand/[0.06] glow" : "border-line bg-fg/[0.02] hover:border-line-2",
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
        <p className="mt-4 rounded-xl border border-line bg-fg/[0.02] p-4 text-xs leading-relaxed text-muted">
          <span className="font-semibold text-fg">How it works:</span> Class 9 & 10 chapter quizzes always use the NCERT-aligned curated bank (online trivia
          databases don&apos;t have chapter-wise questions). Your source is used for General Science, History & Geography, Mixed Math and Mixed IT. If an online
          source is unavailable, QuizLab falls back to the curated bank automatically.
        </p>
      </Section>

      <Section n="02" title="Quiz defaults" description="Pre-selected in the quiz builder.">
        <div className="space-y-7">
          <div>
            <p className="mb-3 text-sm font-medium text-fg">Number of questions</p>
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
            <p className="mb-3 text-sm font-medium text-fg">Timer mode</p>
            <Segmented<TimerMode>
              value={s.timerMode}
              onChange={(v) => update({ timerMode: v })}
              options={[
                { v: "per-question", label: "Per question" },
                { v: "total", label: "Whole quiz" },
              ]}
            />
            <div className="mt-4 flex flex-wrap items-center gap-2">
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
            <p className="mt-2.5 text-xs text-subtle">
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
      </Section>

      <Section n="03" title="Gameplay" description="Answers, explanations and your score appear only on the results screen after the quiz.">
        <div className="space-y-6">
          <Switch
            checked={s.autoFullscreen}
            onChange={(v) => update({ autoFullscreen: v })}
            label="Full screen by default"
            description="Pre-enable the full screen option in the quiz builder."
          />
        </div>
        <p className="mt-6 border-t border-line pt-5 font-mono text-[11px] leading-relaxed text-subtle">
          Scoring: +100 per correct · up to +50 speed bonus when a per-question timer is on · −30 when a hint is used
        </p>
      </Section>

      <Section n="04" title="Appearance" description="Dark mode is the default.">
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
                  active ? "border-brand bg-brand/[0.06] text-fg glow" : "border-line text-muted hover:border-line-2 hover:text-fg",
                )}
              >
                <o.icon className={cn("h-5 w-5", active && "text-brand-ink")} strokeWidth={1.75} /> {o.label}
              </button>
            );
          })}
        </div>
      </Section>

      <Section n="05" title="Your data" description="History is stored only on this device (browser storage) — no account, no server database.">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-sm text-muted">
            <span className="text-fg">{count}</span> saved quiz{count === 1 ? "" : "zes"}
          </p>
          <button
            type="button"
            onClick={clearHistory}
            disabled={clearing || count === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-danger/40 px-4 py-2.5 text-sm font-medium text-danger transition hover:bg-danger/10 disabled:pointer-events-none disabled:opacity-40"
          >
            {clearing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Clear all history
          </button>
        </div>
      </Section>
    </div>
  );
}
