"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Image from "next/image";
import {
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Filter,
  Loader2,
  Radio,
  Search,
  Shuffle,
  Sparkles,
  X,
} from "lucide-react";
import { Container, Label, PageHeader } from "@/components/ui";
import { cn } from "@/lib/format";
import { FACT_CATEGORIES, FACTS, type Fact, type FactCategory } from "@/data/facts";
import { fetchLiveBatch } from "@/data/facts/live";

/* ─── Local storage key ──────────────────────────────────────────────────── */
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

/* ─── Symmetrical Fact Card ──────────────────────────────────────────────── */
function FactCard({
  fact,
  saved,
  onToggleSave,
  onOpen,
  style,
}: {
  fact: Fact;
  saved: boolean;
  onToggleSave: (id: string) => void;
  onOpen: () => void;
  style?: React.CSSProperties;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const catObj = FACT_CATEGORIES.find((c) => c.id === fact.category) || FACT_CATEGORIES[0];

  return (
    <article
      onClick={onOpen}
      style={style}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card card-shadow transition-all duration-300 hover:-translate-y-1 hover:border-line-2 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6)] cursor-pointer select-none animate-fade-up"
    >
      {/* ── Fixed aspect-ratio image container ── */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-fg/[0.06] to-transparent" />
        )}
        <Image
          src={fact.image}
          alt={fact.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
            imgLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setImgLoaded(true)}
          unoptimized
        />
        {/* Soft dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Category tag */}
        <div className="absolute left-3 top-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-md">
            <span>{catObj.emoji}</span>
            <span className="truncate max-w-[120px]">{catObj.label}</span>
          </span>
        </div>

        {/* Live indicator tag if dynamically streamed */}
        {fact.isLive && (
          <div className="absolute left-3 bottom-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-black/60 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-emerald-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Stream
            </span>
          </div>
        )}

        {/* Bookmark action */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(fact.id);
          }}
          className={cn(
            "absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-200 active:scale-90",
            saved
              ? "border-brand/70 bg-brand text-white shadow-[0_0_16px_rgba(249,115,22,0.6)]"
              : "border-white/20 bg-black/60 text-white/80 hover:border-brand/60 hover:text-white",
          )}
          aria-label={saved ? "Remove bookmark" : "Bookmark this fact"}
        >
          {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>

      {/* ── Content container with strict symmetrical line clamping ── */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          {/* Title: exactly 2 lines min-height */}
          <h3 className="line-clamp-2 min-h-[2.85rem] text-[15px] font-bold leading-snug tracking-tight text-fg group-hover:text-brand-ink transition-colors sm:text-base">
            {fact.title}
          </h3>

          {/* Body: exactly 3 lines min-height */}
          <p className="mt-2.5 line-clamp-3 min-h-[3.9rem] text-[13px] leading-relaxed text-muted">
            {fact.body}
          </p>
        </div>

        {/* Bottom meta row */}
        <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-[11px] font-mono text-subtle">
          <span className="truncate max-w-[170px]">
            {fact.source ? `Src: ${fact.source}` : "Verified Curiosity"}
          </span>
          <span className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-brand-ink opacity-0 transition-opacity group-hover:opacity-100">
            Read <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

/* ─── Category Selection Menu Modal ──────────────────────────────────────── */
function CategoryMenuModal({
  activeCategory,
  onSelect,
  onClose,
  categories,
  categoryCounts,
  savedCount,
}: {
  activeCategory: string;
  onSelect: (id: string) => void;
  onClose: () => void;
  categories: FactCategory[];
  categoryCounts: Record<string, number>;
  savedCount: number;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase();
    return categories.filter(
      (c) => c.label.toLowerCase().includes(q) || c.description.toLowerCase().includes(q),
    );
  }, [categories, search]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      style={{ backdropFilter: "blur(18px)", background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-2xl animate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand-ink">
              <Compass className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-fg sm:text-lg">Select Fact Category</h2>
              <p className="text-xs text-muted">Choose what realm of knowledge to explore</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-line text-muted hover:border-line-2 hover:text-fg transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search input */}
        <div className="border-b border-line px-5 py-3 sm:px-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, keyword, universe, deep sea..."
              className="w-full rounded-xl border border-line bg-fg/[0.02] py-2 pl-9 pr-3 text-sm text-fg outline-none focus:border-brand transition"
              autoFocus
            />
          </div>
        </div>

        {/* Category options grid */}
        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {filtered.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const count = categoryCounts[cat.id] ?? 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    onSelect(cat.id);
                    onClose();
                  }}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 active:scale-[0.98]",
                    isSelected
                      ? "border-brand bg-brand/15 shadow-[0_0_0_1px_rgba(249,115,22,0.55),0_0_24px_-6px_rgba(249,115,22,0.35)]"
                      : "border-line bg-fg/[0.02] hover:border-line-2 hover:bg-fg/[0.04]",
                  )}
                >
                  <span className="text-2xl shrink-0 mt-0.5">{cat.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-sm text-fg truncate">{cat.label}</span>
                      <span
                        className={cn(
                          "rounded-md px-1.5 py-0.5 font-mono text-[10px]",
                          isSelected ? "bg-brand/25 text-brand-ink" : "bg-fg/[0.06] text-subtle",
                        )}
                      >
                        {count}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted line-clamp-1">{cat.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Saved shortcut */}
          <div className="mt-4 pt-4 border-t border-line">
            <button
              type="button"
              onClick={() => {
                onSelect("saved");
                onClose();
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl border p-3.5 transition active:scale-[0.98]",
                activeCategory === "saved"
                  ? "border-brand bg-brand/15 text-brand-ink"
                  : "border-line bg-fg/[0.02] text-muted hover:border-line-2 hover:text-fg",
              )}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4.5 w-4.5 text-amber-400" />
                <span className="text-sm font-semibold text-fg">Your Bookmarked Facts</span>
              </div>
              <span className="rounded-md bg-fg/[0.06] px-2 py-0.5 font-mono text-xs text-subtle">
                {savedCount} saved
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
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
  const fact = facts[idx] || facts[0];
  const catObj = FACT_CATEGORIES.find((c) => c.id === fact?.category) || FACT_CATEGORIES[0];
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
  }, [idx]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") setIdx((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setIdx((i) => Math.min(facts.length - 1, i + 1));
      if (e.key === "Escape") onClose();
      if ((e.key === "b" || e.key === "B") && fact) onToggleSave(fact.id);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fact, facts.length, onClose, onToggleSave]);

  if (!fact) return null;
  const isSaved = saved.has(fact.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-fade-in"
      style={{ backdropFilter: "blur(20px)", background: "rgba(0,0,0,0.8)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-card card-shadow animate-pop flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Full visual banner */}
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-surface">
          {!imgLoaded && (
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-fg/[0.06] to-transparent" />
          )}
          <Image
            src={fact.image}
            alt={fact.title}
            fill
            sizes="672px"
            className={cn("object-cover transition-opacity duration-700", imgLoaded ? "opacity-100" : "opacity-0")}
            onLoad={() => setImgLoaded(true)}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Category pill */}
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            {catObj.emoji} {catObj.label}
          </span>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          {/* Index counter */}
          <span className="absolute bottom-4 right-4 rounded-lg bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white/80 backdrop-blur-md">
            {idx + 1} / {facts.length}
          </span>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto px-6 py-5 sm:px-8 sm:py-6 flex-1">
          <h2 className="text-xl font-extrabold tracking-tight text-fg sm:text-2xl">{fact.title}</h2>
          <p className="mt-3.5 text-sm leading-relaxed text-muted sm:text-base">{fact.body}</p>
          {fact.source && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-line bg-fg/[0.03] px-3 py-1.5 font-mono text-[11px] text-subtle">
              <span>Source:</span>
              <span className="font-semibold text-fg">{fact.source}</span>
            </div>
          )}
        </div>

        {/* Navigation bottom bar */}
        <div className="flex items-center justify-between border-t border-line px-5 py-3.5 sm:px-8 bg-surface/30">
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
                ? "border-brand bg-brand/20 text-brand-ink"
                : "border-line text-muted hover:border-brand/50 hover:text-brand-ink",
            )}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="h-4 w-4" /> Bookmarked
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" /> Bookmark
              </>
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

/* ─── Main Facts Client ─────────────────────────────────────────────────── */
export default function FactsClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [spotlight, setSpotlight] = useState<{ facts: Fact[]; idx: number } | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Dynamic live stream facts
  const [liveFacts, setLiveFacts] = useState<Fact[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [, startTransition] = useTransition();

  // Load bookmarks on mount
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

  // Combine static facts + streamed live facts
  const allCombinedFacts = useMemo(() => {
    return [...FACTS, ...liveFacts];
  }, [liveFacts]);

  // Filtered facts
  const visibleFacts = useMemo(() => {
    if (activeCategory === "saved") {
      return allCombinedFacts.filter((f) => saved.has(f.id));
    }
    if (activeCategory === "all") {
      return allCombinedFacts;
    }
    return allCombinedFacts.filter((f) => f.category === activeCategory);
  }, [allCombinedFacts, activeCategory, saved]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allCombinedFacts.length };
    for (const f of allCombinedFacts) {
      counts[f.category] = (counts[f.category] ?? 0) + 1;
    }
    return counts;
  }, [allCombinedFacts]);

  // Load more facts from live public sources
  const loadMoreLiveFacts = async () => {
    setIsStreaming(true);
    try {
      const batch = await fetchLiveBatch(6);
      if (batch.length > 0) {
        startTransition(() => {
          setLiveFacts((prev) => [...prev, ...batch]);
        });
      }
    } finally {
      setIsStreaming(false);
    }
  };

  // Surprise random fact
  const shuffleFact = () => {
    const pool = visibleFacts.length > 0 ? visibleFacts : allCombinedFacts;
    const idx = Math.floor(Math.random() * pool.length);
    setSpotlight({ facts: pool, idx });
  };

  const activeCategoryObj = useMemo(() => {
    if (activeCategory === "saved") {
      return { id: "saved", label: "Bookmarked Facts", emoji: "🔖", description: "Your personal collection", accent: "" };
    }
    return FACT_CATEGORIES.find((c) => c.id === activeCategory) || FACT_CATEGORIES[0];
  }, [activeCategory]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">
        Loading knowledge base…
      </div>
    );
  }

  return (
    <>
      <Container className="w-full max-w-6xl overflow-hidden pb-16">
        {/* ── Page Header ── */}
        <section className="pb-6 sm:pb-10">
          <div className="animate-fade-up">
            <Label className="mb-3">Encyclopedic Discoveries</Label>
            <PageHeader
              title="Interesting Facts"
              description="Explore mind-bending phenomena, historical glitches, cosmic anomalies, and deep sea mysteries. An infinite stream of verified curiosities you never knew existed."
              action={
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={shuffleFact}
                    className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-card px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-fg transition hover:border-brand hover:text-brand-ink active:scale-95"
                  >
                    <Shuffle className="h-4 w-4 text-brand-ink" />
                    Surprise me
                  </button>
                  <button
                    type="button"
                    onClick={loadMoreLiveFacts}
                    disabled={isStreaming}
                    className="inline-flex items-center gap-2 rounded-full grad-cta px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(249,115,22,0.8)] transition hover:brightness-110 active:scale-95 disabled:opacity-50"
                  >
                    {isStreaming ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Radio className="h-4 w-4 animate-pulse" />
                    )}
                    {isStreaming ? "Streaming…" : "Live Feed +"}
                  </button>
                </div>
              }
            />
          </div>

          {/* Quick Metrics */}
          <div className="mt-5 flex flex-wrap items-center gap-4 sm:gap-8 border-y border-line py-3.5 font-mono text-xs text-subtle">
            <div>
              <span className="font-bold text-fg tabular-nums">{allCombinedFacts.length}</span> Total Facts
            </div>
            <div>
              <span className="font-bold text-fg tabular-nums">{FACT_CATEGORIES.length - 1}</span> Categories
            </div>
            <div>
              <span className="font-bold text-fg tabular-nums">{saved.size}</span> Bookmarked
            </div>
            {liveFacts.length > 0 && (
              <div className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold tabular-nums">+{liveFacts.length}</span> Streamed Live
              </div>
            )}
          </div>
        </section>

        {/* ── Category Menu Trigger & Quick Bar ── */}
        <section className="sticky top-[56px] z-30 -mx-4 mb-6 border-b border-line glass px-4 py-3 sm:-mx-8 sm:top-[64px] sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* The Main Menu Button requested by user */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center gap-2.5 rounded-2xl border border-line-2 bg-card px-4 py-2.5 text-xs sm:text-sm font-medium text-fg shadow-sm transition-all hover:border-brand hover:shadow-[0_0_16px_rgba(249,115,22,0.2)] active:scale-95"
            >
              <Filter className="h-4 w-4 text-brand-ink" />
              <span>Category:</span>
              <span className="font-bold text-fg flex items-center gap-1.5">
                <span>{activeCategoryObj.emoji}</span>
                <span>{activeCategoryObj.label}</span>
              </span>
              <span className="rounded-md bg-fg/[0.06] px-2 py-0.5 font-mono text-[11px] text-subtle">
                {visibleFacts.length}
              </span>
              <ChevronDown className="h-4 w-4 text-muted ml-0.5" />
            </button>

            {/* Quick quick-toggle pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-full">
              {["all", "space", "creatures", "quantum", "history", "saved"].map((catId) => {
                const isSelected = activeCategory === catId;
                const cat = FACT_CATEGORIES.find((c) => c.id === catId);
                const label = catId === "saved" ? "Saved" : cat?.label;
                const emoji = catId === "saved" ? "🔖" : cat?.emoji;
                return (
                  <button
                    key={catId}
                    type="button"
                    onClick={() => setActiveCategory(catId)}
                    className={cn(
                      "shrink-0 rounded-xl border px-3 py-1.5 text-xs font-medium transition active:scale-95",
                      isSelected
                        ? "border-brand bg-brand/15 text-fg shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                        : "border-line bg-fg/[0.02] text-muted hover:border-line-2 hover:text-fg",
                    )}
                  >
                    <span>{emoji} </span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Perfectly Symmetrical Fact Cards Grid ── */}
        <section>
          {visibleFacts.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-line bg-card px-8 py-20 text-center card-shadow animate-fade-up">
              <span className="text-4xl">{activeCategory === "saved" ? "🔖" : "🔍"}</span>
              <h3 className="text-lg font-bold text-fg">
                {activeCategory === "saved" ? "No bookmarked facts yet" : "No facts found"}
              </h3>
              <p className="max-w-sm text-sm text-muted">
                {activeCategory === "saved"
                  ? "Click the bookmark ribbon on any fact to save it to your personal vault."
                  : "Try switching to another category or explore all facts."}
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-brand hover:bg-brand/10"
              >
                Browse all facts
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {visibleFacts.map((fact, i) => (
                <div key={fact.id} className="h-full">
                  <FactCard
                    fact={fact}
                    saved={saved.has(fact.id)}
                    onToggleSave={toggleSave}
                    onOpen={() => setSpotlight({ facts: visibleFacts, idx: i })}
                    style={{ animationDelay: `${Math.min(i * 35, 350)}ms` }}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Infinite Live Discovery Footer ── */}
        <section className="mt-14 flex flex-col items-center justify-center gap-4 border-t border-line/60 pt-10 text-center">
          <p className="text-sm text-muted">
            Viewing <span className="font-semibold text-fg">{visibleFacts.length}</span> facts. Never hit the limits with our live global feed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={loadMoreLiveFacts}
              disabled={isStreaming}
              className="inline-flex items-center gap-2 rounded-full grad-cta px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(249,115,22,0.8)] transition hover:brightness-110 active:scale-95 disabled:opacity-50"
            >
              {isStreaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Radio className="h-4 w-4" />
              )}
              {isStreaming ? "Streaming new facts…" : "Load More Live Facts"}
            </button>

            <button
              type="button"
              onClick={shuffleFact}
              className="inline-flex items-center gap-2 rounded-full border border-line-2 px-6 py-3 text-sm font-semibold text-fg transition hover:border-brand hover:text-brand-ink active:scale-95"
            >
              <Shuffle className="h-4 w-4" /> Surprise Me
            </button>
          </div>
        </section>
      </Container>

      {/* ── Category Menu Modal ── */}
      {menuOpen && (
        <CategoryMenuModal
          activeCategory={activeCategory}
          onSelect={(id) => setActiveCategory(id)}
          onClose={() => setMenuOpen(false)}
          categories={FACT_CATEGORIES}
          categoryCounts={categoryCounts}
          savedCount={saved.size}
        />
      )}

      {/* ── Spotlight Fullscreen Modal ── */}
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
