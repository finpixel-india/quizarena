"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Shuffle, Sparkles, X } from "lucide-react";
import { Container, Label, PageHeader } from "@/components/ui";
import { cn } from "@/lib/format";
import { FACT_CATEGORIES, FACTS, type Fact } from "@/data/facts";

/* ─── local storage key ──────────────────────────────────────────────────── */
const SAVED_KEY = "ql-saved-facts";

function loadSaved(): Set<string> {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function persistSaved(s: Set<string>) {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify([...s]));
  } catch {
    /* ignore */
  }
}

/* ─── Fact Card ──────────────────────────────────────────────────────────── */
function FactCard({
  fact,
  saved,
  onToggleSave,
  style,
}: {
  fact: Fact;
  saved: boolean;
  onToggleSave: (id: string) => void;
  style?: React.CSSProperties;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const catObj = FACT_CATEGORIES.find((c) => c.id === fact.category);

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card card-shadow transition-all duration-300 hover:-translate-y-1 hover:border-line-2 hover:shadow-[0_32px_64px_-24px_rgba(0,0,0,0.6)] animate-fade-up"
      style={style}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-fg/[0.06] to-transparent" />
        )}
        <Image
          src={fact.image}
          alt={fact.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover transition-all duration-700 group-hover:scale-105",
            imgLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setImgLoaded(true)}
          unoptimized
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Category chip */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            <span>{catObj?.emoji}</span>
            <span>{catObj?.label}</span>
          </span>
        </div>

        {/* Bookmark button */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggleSave(fact.id); }}
          className={cn(
            "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl border backdrop-blur-sm transition-all duration-200 active:scale-90",
            saved
              ? "border-brand/60 bg-brand/30 text-white"
              : "border-white/20 bg-black/50 text-white/80 hover:border-brand/60 hover:bg-brand/30",
          )}
          aria-label={saved ? "Remove bookmark" : "Bookmark this fact"}
        >
          {saved ? (
            <BookmarkCheck className="h-4 w-4" strokeWidth={2} />
          ) : (
            <Bookmark className="h-4 w-4" strokeWidth={1.75} />
          )}
        </button>
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <h3 className="text-[15px] font-bold leading-snug tracking-tight text-fg sm:text-base">
          {fact.title}
        </h3>
        <p className="flex-1 text-[13px] leading-relaxed text-muted sm:text-sm">{fact.body}</p>
        {fact.source && (
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-subtle">
            Source: {fact.source}
          </p>
        )}
      </div>
    </article>
  );
}

/* ─── Category Pill ──────────────────────────────────────────────────────── */
function CategoryPill({
  cat,
  active,
  count,
  onClick,
}: {
  cat: (typeof FACT_CATEGORIES)[number];
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-95",
        active
          ? "border-brand bg-brand/15 text-fg shadow-[0_0_0_1px_rgba(249,115,22,0.55),0_0_20px_-6px_rgba(249,115,22,0.45)]"
          : "border-line bg-fg/[0.02] text-muted hover:border-line-2 hover:text-fg",
      )}
    >
      <span className="text-base leading-none">{cat.emoji}</span>
      <span>{cat.label}</span>
      <span
        className={cn(
          "rounded-md px-1.5 py-0.5 font-mono text-[10px]",
          active ? "bg-brand/20 text-brand-ink" : "bg-fg/[0.06] text-subtle",
        )}
      >
        {count}
      </span>
    </button>
  );
}

/* ─── Spotlight Modal ────────────────────────────────────────────────────── */
function SpotlightModal({
  facts,
  startIndex,
  saved,
  onToggleSave,
  onClose,
}: {
  facts: Fact[];
  startIndex: number;
  saved: Set<string>;
  onToggleSave: (id: string) => void;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const fact = facts[idx];
  const catObj = FACT_CATEGORIES.find((c) => c.id === fact.category);
  const [imgLoaded, setImgLoaded] = useState(false);

  // reset image loaded when fact changes
  useEffect(() => {
    setImgLoaded(false);
  }, [idx]);

  // keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") setIdx((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setIdx((i) => Math.min(facts.length - 1, i + 1));
      if (e.key === "Escape") onClose();
      if (e.key === "b" || e.key === "B") onToggleSave(fact.id);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fact.id, facts.length, onClose, onToggleSave]);

  const isSaved = saved.has(fact.id);

  return (
    // backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-fade-in"
      style={{ backdropFilter: "blur(16px)", background: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      {/* modal */}
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-card card-shadow animate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface">
          {!imgLoaded && (
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-fg/[0.06] to-transparent" />
          )}
          <Image
            src={fact.image}
            alt={fact.title}
            fill
            sizes="672px"
            className={cn(
              "object-cover transition-all duration-700",
              imgLoaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setImgLoaded(true)}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* category */}
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-sm">
            {catObj?.emoji} {catObj?.label}
          </span>

          {/* close */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
            aria-label="Close"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          {/* counter */}
          <span className="absolute bottom-4 right-4 rounded-lg bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white/80 backdrop-blur-sm">
            {idx + 1} / {facts.length}
          </span>
        </div>

        {/* content */}
        <div className="px-6 py-5 sm:px-7 sm:py-6">
          <h2 className="text-xl font-extrabold tracking-tight text-fg sm:text-2xl">{fact.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{fact.body}</p>
          {fact.source && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-subtle">
              Source: {fact.source}
            </p>
          )}
        </div>

        {/* footer nav */}
        <div className="flex items-center justify-between border-t border-line px-5 py-3.5 sm:px-7">
          <button
            type="button"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line px-4 py-2 text-sm font-medium text-muted transition hover:border-line-2 hover:text-fg disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </button>

          <button
            type="button"
            onClick={() => onToggleSave(fact.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition active:scale-95",
              isSaved
                ? "border-brand/60 bg-brand/15 text-brand-ink"
                : "border-line text-muted hover:border-brand/50 hover:text-brand-ink",
            )}
          >
            {isSaved ? (
              <><BookmarkCheck className="h-4 w-4" /> Saved</>
            ) : (
              <><Bookmark className="h-4 w-4" /> Save</>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIdx((i) => Math.min(facts.length - 1, i + 1))}
            disabled={idx === facts.length - 1}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line px-4 py-2 text-sm font-medium text-muted transition hover:border-line-2 hover:text-fg disabled:pointer-events-none disabled:opacity-30"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */
export default function FactsClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showSaved, setShowSaved] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [spotlight, setSpotlight] = useState<{ facts: Fact[]; idx: number } | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // load saved from localStorage on mount
  useEffect(() => {
    setSaved(loadSaved());
    setHydrated(true);
  }, []);

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      persistSaved(next);
      return next;
    });
  };

  const visibleFacts = useMemo(() => {
    let list = FACTS;
    if (activeCategory !== "all") list = list.filter((f) => f.category === activeCategory);
    if (showSaved) list = list.filter((f) => saved.has(f.id));
    return list;
  }, [activeCategory, showSaved, saved]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: FACTS.length };
    for (const f of FACTS) {
      counts[f.category] = (counts[f.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const shuffleFact = () => {
    const pool = visibleFacts.length > 0 ? visibleFacts : FACTS;
    const idx = Math.floor(Math.random() * pool.length);
    setSpotlight({ facts: pool, idx });
  };

  const openSpotlight = (fact: Fact) => {
    const idx = visibleFacts.indexOf(fact);
    if (idx >= 0) setSpotlight({ facts: visibleFacts, idx });
  };

  // scroll category pills to active on change
  useEffect(() => {
    const el = scrollRef.current?.querySelector("[data-active]");
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeCategory]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">
        Loading facts…
      </div>
    );
  }

  return (
    <>
      <Container>
        {/* ── Hero ── */}
        <section className="pb-8 sm:pb-12">
          <div className="animate-fade-up">
            <Label className="mb-4">Explore the unknown</Label>
            <PageHeader
              title="Interesting Facts"
              description="Thousands of mind-blowing facts about our universe, nature, science, history and more. Something new to discover every visit."
              action={
                <button
                  type="button"
                  onClick={shuffleFact}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full grad-cta px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_28px_-10px_rgba(249,115,22,0.8)] transition hover:brightness-110 active:scale-95"
                >
                  <Shuffle className="h-4 w-4" />
                  Surprise me
                </button>
              }
            />
          </div>

          {/* Stats strip */}
          <div className="mt-6 flex flex-wrap gap-6 sm:mt-8">
            {[
              { v: `${FACTS.length}+`, k: "Total facts" },
              { v: `${FACT_CATEGORIES.length - 1}`, k: "Categories" },
              { v: `${saved.size}`, k: "Bookmarked" },
            ].map((s) => (
              <div key={s.k}>
                <p className="grad-text font-mono text-2xl font-bold tabular-nums sm:text-3xl">{s.v}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">{s.k}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Category pills ── */}
        <section className="sticky top-[56px] z-20 -mx-4 sm:-mx-8 sm:top-[64px]">
          <div className="glass border-b border-line px-4 py-3 sm:px-8">
            <div
              ref={scrollRef}
              className="scrollbar-none flex gap-2 overflow-x-auto pb-0.5"
            >
              {FACT_CATEGORIES.map((cat) => (
                <div key={cat.id} data-active={activeCategory === cat.id ? "" : undefined}>
                  <CategoryPill
                    cat={cat}
                    active={activeCategory === cat.id && !showSaved}
                    count={categoryCounts[cat.id] ?? 0}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setShowSaved(false);
                    }}
                  />
                </div>
              ))}
              {/* Saved */}
              <button
                type="button"
                onClick={() => setShowSaved((s) => !s)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-95",
                  showSaved
                    ? "border-brand bg-brand/15 text-fg shadow-[0_0_0_1px_rgba(249,115,22,0.55)]"
                    : "border-line bg-fg/[0.02] text-muted hover:border-line-2 hover:text-fg",
                )}
              >
                <Sparkles className="h-4 w-4" />
                Saved
                {saved.size > 0 && (
                  <span
                    className={cn(
                      "rounded-md px-1.5 py-0.5 font-mono text-[10px]",
                      showSaved ? "bg-brand/20 text-brand-ink" : "bg-fg/[0.06] text-subtle",
                    )}
                  >
                    {saved.size}
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* ── Grid ── */}
        <section className="pt-6 sm:pt-10">
          {visibleFacts.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-card px-8 py-20 text-center card-shadow animate-fade-up">
              <span className="text-4xl">{showSaved ? "🔖" : "🔍"}</span>
              <h3 className="text-lg font-bold text-fg">
                {showSaved ? "No saved facts yet" : "No facts found"}
              </h3>
              <p className="max-w-xs text-sm text-muted">
                {showSaved
                  ? "Bookmark facts you love and find them here."
                  : "Try a different category or clear your filters."}
              </p>
              {showSaved && (
                <button
                  type="button"
                  onClick={() => setShowSaved(false)}
                  className="mt-2 inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-brand hover:bg-brand/10"
                >
                  Browse all facts
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleFacts.map((fact, i) => (
                <button
                  key={fact.id}
                  type="button"
                  className="block w-full text-left"
                  onClick={() => openSpotlight(fact)}
                >
                  <FactCard
                    fact={fact}
                    saved={saved.has(fact.id)}
                    onToggleSave={(id) => {
                      toggleSave(id);
                    }}
                    style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* ── Fun bottom note ── */}
        {visibleFacts.length > 0 && (
          <div className="mt-16 flex flex-col items-center gap-3 pb-6 text-center">
            <p className="text-sm text-muted">
              You&apos;ve seen <span className="font-semibold text-fg">{visibleFacts.length}</span> facts
              {activeCategory !== "all" && (
                <> in <span className="text-brand-ink">{FACT_CATEGORIES.find((c) => c.id === activeCategory)?.label}</span></>
              )}
            </p>
            <button
              type="button"
              onClick={shuffleFact}
              className="inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-brand hover:bg-brand/10 active:scale-95"
            >
              <Shuffle className="h-4 w-4" /> Feeling lucky
            </button>
          </div>
        )}
      </Container>

      {/* ── Spotlight modal ── */}
      {spotlight && (
        <SpotlightModal
          facts={spotlight.facts}
          startIndex={spotlight.idx}
          saved={saved}
          onToggleSave={toggleSave}
          onClose={() => setSpotlight(null)}
        />
      )}
    </>
  );
}
