"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Filter,
  ListFilter,
  Loader2,
  Maximize2,
  Minimize2,
  Radio,
  Scan,
  Share2,
  Shuffle,
  X,
} from "lucide-react";
import { Card, CollapsibleSection, Container, Label, PageHeader } from "@/components/ui";
import { FloatingTTSButton, TTSHighlightedText, useCuteTTS } from "@/components/FloatingTTS";
import { cn } from "@/lib/format";
import { haptic } from "@/lib/haptics";
import { FACT_CATEGORIES, FACTS, type Fact } from "@/data/facts";
import { fetchLiveBatch, CATEGORY_FALLBACK_IMAGES } from "@/data/facts/live";

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

/* ─── Symmetrical Grid Card ──────────────────────────────────────────────── */
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
  const [imgSrc, setImgSrc] = useState(fact.image);
  const catObj = FACT_CATEGORIES.find((c) => c.id === fact.category) || FACT_CATEGORIES[0];

  useEffect(() => {
    setImgSrc(fact.image);
  }, [fact.image]);

  return (
    <article
      onClick={onOpen}
      style={style}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card card-shadow transition-all duration-300 hover:-translate-y-1 hover:border-line-2 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6)] cursor-pointer select-none"
    >
      {/* ── Fixed aspect-ratio image container with smart focal framing ── */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-fg/[0.06] to-transparent" />
        )}
        {/* Ambient subtle glow */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-md opacity-25 scale-110 pointer-events-none"
          style={{ backgroundImage: `url(${imgSrc})` }}
        />
        <Image
          src={imgSrc}
          alt={fact.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover object-[center_20%] sm:object-[center_22%] transition-transform duration-700 ease-out group-hover:scale-105",
            imgLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgSrc(CATEGORY_FALLBACK_IMAGES[fact.category] || CATEGORY_FALLBACK_IMAGES.all)}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category tag */}
        <div className="absolute left-3 top-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-md">
            <span>{catObj.emoji}</span>
            <span className="truncate max-w-[120px]">{catObj.label}</span>
          </span>
        </div>

        {/* Live stream badge */}
        {fact.isLive && (
          <div className="absolute left-3 bottom-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-black/60 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-emerald-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Feed
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
            "absolute right-3 top-3 z-10 flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-200 active:scale-90",
            saved
              ? "border-brand/70 bg-brand text-white shadow-[0_0_16px_rgba(249,115,22,0.6)]"
              : "border-white/20 bg-black/60 text-white/80 hover:border-brand/60 hover:text-white",
          )}
          aria-label={saved ? "Remove bookmark" : "Bookmark this fact"}
        >
          {saved ? <BookmarkCheck className="h-5 w-5 sm:h-4 sm:w-4" /> : <Bookmark className="h-5 w-5 sm:h-4 sm:w-4" />}
        </button>
      </div>

      {/* ── Content container with strict symmetrical line heights ── */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <h3 className="line-clamp-2 min-h-[2.85rem] text-[15px] font-bold leading-snug tracking-tight text-fg group-hover:text-brand-ink transition-colors sm:text-base">
            {fact.title}
          </h3>
          <p className="mt-2.5 line-clamp-3 min-h-[3.9rem] text-[13px] leading-relaxed text-muted">
            {fact.body}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-[11px] font-mono text-subtle">
          <span className="truncate max-w-[170px]">
            {fact.source ? `Src: ${fact.source}` : "Verified Fact"}
          </span>
          <span className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-brand-ink opacity-0 transition-opacity group-hover:opacity-100">
            Read full <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

/* ─── Clean Full Page Fact Reader (No Bloated Sticky Bar) ─────────────────── */
function FullPageFactView({
  fact,
  facts,
  saved,
  onToggleSave,
  onBack,
  onSelectFact,
}: {
  fact: Fact;
  facts: Fact[];
  saved: Set<string>;
  onToggleSave: (id: string) => void;
  onBack: () => void;
  onSelectFact: (f: Fact) => void;
}) {
  const currentIndex = facts.findIndex((f) => f.id === fact.id);
  const prevFact = currentIndex > 0 ? facts[currentIndex - 1] : null;
  const nextFact = currentIndex < facts.length - 1 ? facts[currentIndex + 1] : null;
  const isSaved = saved.has(fact.id);
  const catObj = FACT_CATEGORIES.find((c) => c.id === fact.category) || FACT_CATEGORIES[0];
  const [copied, setCopied] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(fact.image);
  const [imageFit, setImageFit] = useState<"smart" | "contain">("smart");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  /* ─── Cute TTS Speech Narration inside Fact ─── */
  const fullFactSpeechText = useMemo(() => {
    return `${fact.title}. ${fact.body}`;
  }, [fact.title, fact.body]);

  const tts = useCuteTTS(fullFactSpeechText, fact.id);
  const titleWordsCount = useMemo(() => {
    return fact.title.trim().split(/\s+/).filter(Boolean).length;
  }, [fact.title]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" && prevFact) onSelectFact(prevFact);
      if (e.key === "ArrowRight" && nextFact) onSelectFact(nextFact);
      if (e.key === "Escape") {
        if (isLightboxOpen) setIsLightboxOpen(false);
        else onBack();
      }
      if (e.key === "b" || e.key === "B") onToggleSave(fact.id);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevFact, nextFact, onSelectFact, onBack, onToggleSave, fact.id, isLightboxOpen]);

  // Scroll to top on fact change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setHeroLoaded(false);
    setImgSrc(fact.image);
  }, [fact.id, fact.image]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedFacts = useMemo(() => {
    return facts.filter((f) => f.id !== fact.id && f.category === fact.category).slice(0, 3);
  }, [facts, fact.id, fact.category]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-8 sm:py-8 animate-fade-in">
      {/* ── Compact Slim Action Row (Non-sticky, no screen covering) ── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-4 py-2.5 sm:px-3.5 sm:py-2 text-sm sm:text-sm font-semibold text-fg hover:border-brand hover:text-brand-ink transition active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to facts</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 font-mono text-[11px] sm:text-xs text-subtle">
            <span>{catObj.emoji}</span>
            <span className="font-semibold text-fg">{catObj.label}</span>
          </span>

          <button
            type="button"
            onClick={() => onToggleSave(fact.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 sm:px-3.5 sm:py-2 text-sm sm:text-sm font-semibold transition active:scale-95",
              isSaved
                ? "border-brand bg-brand/20 text-brand-ink"
                : "border-line bg-card text-muted hover:border-line-2 hover:text-fg",
            )}
          >
            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-card px-3.5 py-2.5 sm:px-3.5 sm:py-2 text-sm sm:text-sm font-medium text-muted hover:border-line-2 hover:text-fg transition active:scale-95"
            title="Copy link"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* ── Main Article Layout ── */}
      <article className="space-y-6 sm:space-y-8">
        {/* Well-proportioned Hero Banner with Smart Framing & Fit/Fill Controls */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] min-h-[260px] sm:min-h-[380px] max-h-[480px] w-full overflow-hidden rounded-3xl border border-line bg-surface/90 shadow-2xl">
          {!heroLoaded && (
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-fg/[0.06] to-transparent" />
          )}

          {/* Ambient blurred glow backdrop matching photo colors */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-105 pointer-events-none"
            style={{ backgroundImage: `url(${imgSrc})` }}
          />

          <Image
            src={imgSrc}
            alt={fact.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className={cn(
              "transition-all duration-500",
              imageFit === "contain"
                ? "object-contain p-2 sm:p-4 drop-shadow-2xl"
                : "object-cover object-[center_20%] sm:object-[center_22%]",
              heroLoaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setHeroLoaded(true)}
            onError={() => setImgSrc(CATEGORY_FALLBACK_IMAGES[fact.category] || CATEGORY_FALLBACK_IMAGES.all)}
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

          {/* Category Tag on bottom left */}
          <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-sm">
              {catObj.emoji} {catObj.label}
            </span>
          </div>

          {/* Smart Image Control Pills on top right */}
          <div className="absolute right-3 sm:right-5 top-3 sm:top-5 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setImageFit((prev) => (prev === "smart" ? "contain" : "smart"))}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md hover:bg-black/80 transition active:scale-95"
              title={imageFit === "contain" ? "Fill banner" : "Fit entire photo (uncut)"}
            >
              {imageFit === "contain" ? <Maximize2 className="h-3.5 w-3.5" /> : <Scan className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline font-mono text-[11px]">
                {imageFit === "contain" ? "Fill Banner" : "Fit Full Photo"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-sm backdrop-blur-md hover:bg-black/80 transition active:scale-95"
              title="View full resolution"
              aria-label="View full resolution"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Title & Body */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-fg leading-tight">
            <TTSHighlightedText
              text={fact.title}
              activeWordIndex={tts.activeWordIndex}
              wordOffset={0}
              isSpeaking={tts.isPlaying}
            />
          </h1>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-subtle border-b border-line pb-4">
            <span>EXPLORATION NO. {currentIndex + 1}</span>
            {fact.source && (
              <>
                <span>·</span>
                <span>SOURCE: {fact.source}</span>
              </>
            )}
            {fact.isLive && (
              <>
                <span>·</span>
                <span className="text-emerald-400 font-semibold">● LIVE GLOBAL DISCOVERY</span>
              </>
            )}
          </div>

          <p className="text-base sm:text-xl leading-relaxed text-fg/90 font-normal">
            <TTSHighlightedText
              text={fact.body}
              activeWordIndex={tts.activeWordIndex}
              wordOffset={titleWordsCount}
              isSpeaking={tts.isPlaying}
            />
          </p>
        </div>

        {/* ── Next / Previous Navigation Controls ── */}
        <div className="pt-6 border-t border-line">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {prevFact ? (
              <button
                type="button"
                onClick={() => onSelectFact(prevFact)}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-card p-4 sm:p-5 text-left transition hover:border-brand hover:shadow-lg active:scale-[0.98]"
              >
                <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted group-hover:text-brand-ink">
                  <ChevronLeft className="h-4 w-4" /> Previous
                </span>
                <span className="mt-2 line-clamp-1 text-sm font-bold text-fg sm:text-base">
                  {prevFact.title}
                </span>
              </button>
            ) : (
              <div className="rounded-2xl border border-line/40 bg-card/40 p-4 text-xs font-mono text-subtle flex items-center">
                Beginning of facts
              </div>
            )}

            {nextFact ? (
              <button
                type="button"
                onClick={() => onSelectFact(nextFact)}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-card p-4 sm:p-5 text-right transition hover:border-brand hover:shadow-lg active:scale-[0.98]"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs font-mono uppercase tracking-wider text-muted group-hover:text-brand-ink">
                  Next <ChevronRight className="h-4 w-4" />
                </span>
                <span className="mt-2 line-clamp-1 text-sm font-bold text-fg sm:text-base">
                  {nextFact.title}
                </span>
              </button>
            ) : (
              <div className="rounded-2xl border border-line/40 bg-card/40 p-4 text-xs font-mono text-subtle flex items-center justify-end">
                End of collection
              </div>
            )}
          </div>
        </div>

        {/* ── Related curiosities ── */}
        {relatedFacts.length > 0 && (
          <div className="pt-6 sm:pt-10">
            <Label className="mb-4">More in {catObj.label}</Label>
            <div className="grid gap-4 sm:grid-cols-3">
              {relatedFacts.map((rf) => (
                <button
                  key={rf.id}
                  type="button"
                  onClick={() => onSelectFact(rf)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card text-left transition hover:border-line-2 hover:-translate-y-1"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-surface">
                    <Image
                      src={rf.image}
                      alt={rf.title}
                      fill
                      className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="line-clamp-2 text-xs sm:text-sm font-bold text-fg group-hover:text-brand-ink transition">
                      {rf.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-2xl animate-fade-in"
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="fixed top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition active:scale-90"
            aria-label="Close fullscreen view"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[85vh] max-w-[95vw] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl"
          >
            <img
              src={imgSrc}
              alt={fact.title}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl"
            />
            <div className="w-full bg-black/80 px-4 py-3 text-center border-t border-white/10">
              <p className="line-clamp-2 text-xs sm:text-sm font-semibold text-white/90">
                {fact.title}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating TTS Action Button */}
      <FloatingTTSButton tts={tts} />
    </div>
  );
}

/* ─── Main Facts Client Component ────────────────────────────────────────── */
export default function FactsClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [selectedFact, setSelectedFact] = useState<Fact | null>(null);
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
    haptic("light");
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


  const [streamFeedback, setStreamFeedback] = useState<string | null>(null);

  // Load more facts from live public sources targeting active category
  const loadMoreLiveFacts = async () => {
    setIsStreaming(true);
    haptic("light");
    try {
      const batch = await fetchLiveBatch(activeCategory, 6);
      if (batch.length > 0) {
        startTransition(() => {
          setLiveFacts((prev) => [...prev, ...batch]);
        });
        haptic("medium");
        const catLabel = activeCategory === "all" ? "Live" : activeCategoryObj.label;
        setStreamFeedback(`+${batch.length} new ${catLabel} discoveries loaded!`);
        setTimeout(() => setStreamFeedback(null), 3500);
      }
    } finally {
      setIsStreaming(false);
    }
  };

  // Surprise random fact
  const shuffleFact = () => {
    const pool = visibleFacts.length > 0 ? visibleFacts : allCombinedFacts;
    const idx = Math.floor(Math.random() * pool.length);
    setSelectedFact(pool[idx]);
  };

  const activeCategoryObj = useMemo(() => {
    if (activeCategory === "saved") {
      return { id: "saved", label: "Bookmarked Facts", emoji: "🔖", description: "Your saved collection", accent: "" };
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

  // ── Render Full Page View if a Fact is Selected ──
  if (selectedFact) {
    return (
      <FullPageFactView
        fact={selectedFact}
        facts={visibleFacts.length > 0 ? visibleFacts : allCombinedFacts}
        saved={saved}
        onToggleSave={toggleSave}
        onBack={() => setSelectedFact(null)}
        onSelectFact={(f) => setSelectedFact(f)}
      />
    );
  }

  return (
    <Container className="w-full max-w-6xl overflow-hidden pb-16">
      {/* ── Page Header ── */}
      <section className="pb-6 sm:pb-8">
        <div>
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
                  className="inline-flex items-center gap-2 rounded-full grad-cta px-5 py-3 sm:px-4.5 sm:py-2.5 text-sm sm:text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(249,115,22,0.8)] transition hover:brightness-110 active:scale-95 disabled:opacity-50"
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
      </section>

      {/* ── Collapsible Category Selection Section (Smooth, Hardware-Accelerated) ── */}
      <CollapsibleSection
        title="Explore Categories"
        isOpen={isCategoryExpanded}
        onToggle={() => setIsCategoryExpanded((prev) => !prev)}
        className="mb-8 card-shadow"
        preview={
          <div className="inline-flex items-center gap-2 min-w-0">
            <span className="text-base shrink-0 leading-none">{activeCategoryObj.emoji}</span>
            <span className="text-xs sm:text-sm font-semibold text-fg truncate">
              {activeCategoryObj.label}
            </span>
          </div>
        }
      >
        <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {FACT_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  haptic("light");
                  setActiveCategory(cat.id);
                  setIsCategoryExpanded(false);
                }}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-xl border p-3 text-left transition-colors duration-150 active:scale-[0.98]",
                  isSelected
                    ? "border-brand bg-brand/15 text-brand-ink ring-1 ring-brand/40 font-semibold"
                    : "border-line bg-card text-muted hover:border-line-2 hover:bg-fg/[0.03] hover:text-fg",
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg shrink-0">{cat.emoji}</span>
                  <span className="text-xs sm:text-sm truncate">{cat.label}</span>
                </div>
                {isSelected && <Check className="h-3.5 w-3.5 text-brand-ink shrink-0" />}
              </button>
            );
          })}

          {/* Bookmarked collection button */}
          <button
            type="button"
            onClick={() => {
              haptic("light");
              setActiveCategory("saved");
              setIsCategoryExpanded(false);
            }}
            className={cn(
              "flex items-center justify-between gap-2 rounded-xl border p-3 text-left transition-colors duration-150 active:scale-[0.98] col-span-2 sm:col-span-1",
              activeCategory === "saved"
                ? "border-brand bg-brand/15 text-brand-ink ring-1 ring-brand/40 font-semibold"
                : "border-line bg-card text-muted hover:border-line-2 hover:bg-fg/[0.03] hover:text-fg",
            )}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Bookmark className="h-4 w-4 text-brand-ink shrink-0" />
              <span className="text-xs sm:text-sm truncate">Bookmarked</span>
            </div>
            {activeCategory === "saved" && <Check className="h-3.5 w-3.5 text-brand-ink shrink-0" />}
          </button>
        </div>
      </CollapsibleSection>

      {/* ── Symmetrical Fact Cards Grid ── */}
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
          <div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
            style={{ contain: "layout paint" }}
          >
            {visibleFacts.map((fact, i) => (
              <div key={fact.id} className="h-full">
                <FactCard
                  fact={fact}
                  saved={saved.has(fact.id)}
                  onToggleSave={toggleSave}
                  onOpen={() => setSelectedFact(fact)}
                  style={{ animationDelay: `${Math.min(i * 35, 350)}ms` }}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Infinite Live Discovery Footer ── */}
      <section className="mt-14 flex flex-col items-center justify-center gap-4 border-t border-line/60 pt-10 text-center">
        {streamFeedback && (
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md animate-fade-in shadow-[0_0_16px_rgba(52,211,153,0.2)]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{streamFeedback}</span>
          </div>
        )}
        <p className="text-sm text-muted">
          Never hit the limits with our infinite live global feed.
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
  );
}
