"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, BookOpenText, Calculator, ChevronDown, FlaskConical, Landmark, Languages, Lightbulb, ListChecks, Monitor, Search, Sigma, Sparkles } from "lucide-react";
import { DiagramFrame } from "@/components/notes/DiagramKit";
import { getDiagram } from "@/components/notes";
import { Badge, Card, Container, Label, btn } from "@/components/ui";
import { NOTES_COUNTS, NOTES_SUBJECTS, notesByClass, searchChapters, type ClassLevel, type NoteChapter, type NotesSubjectId } from "@/data/notes";
import { cn, pad2 } from "@/lib/format";

/* ------------------------------ text with **bold** ------------------------------ */

function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return <>{parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-semibold text-fg">{part}</strong> : <span key={i}>{part}</span>))}</>;
}

function SubjectGlyph({ id, active = false }: { id: NotesSubjectId; active?: boolean }) {
  const Icon = id === "science" ? FlaskConical : id === "sst" ? Landmark : id === "math" ? Calculator : id === "english" ? BookOpenText : id === "it" ? Monitor : Languages;
  return (
    <span className={cn("inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border", active ? "border-transparent grad-hero text-white" : "border-line bg-fg/[0.03] text-brand-ink")}>
      <Icon className="h-5 w-5" strokeWidth={1.8} />
    </span>
  );
}

function SectionBlock({ index, section }: { index: number; section: NoteChapter["sections"][number] }) {
  return (
    <section className="border-t border-line pt-10 first:border-t-0 first:pt-0 sm:pt-12">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-brand-ink">{pad2(index)}</span>
        <h3 className="text-xl font-bold tracking-tight text-fg sm:text-2xl">{section.title}</h3>
      </div>

      {section.points?.length ? (
        <ul className="mt-5 space-y-3.5">
          {section.points.map((p, i) => (
            <li key={i} className="flex gap-3.5 text-base leading-8 text-muted sm:text-[17px]">
              <span className="mt-3.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/80" aria-hidden="true" />
              <span><Rich text={p} /></span>
            </li>
          ))}
        </ul>
      ) : null}

      {section.formula?.length ? (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-fg/[0.03] p-5 sm:p-6">
          <p className="mb-3 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-subtle"><Sigma className="h-3.5 w-3.5 text-brand-ink" /> Formula / derivation</p>
          <pre className="font-mono text-[14px] leading-7 text-fg sm:text-[15px]">{section.formula.join("\n")}</pre>
        </div>
      ) : null}

      {section.table ? (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
            <thead><tr className="bg-fg/[0.04]">{section.table.head.map((h) => <th key={h} className="border-b border-line px-5 py-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">{h}</th>)}</tr></thead>
            <tbody>{section.table.rows.map((row, ri) => (
              <tr key={ri} className="align-top even:bg-fg/[0.02]">
                {row.map((cell, ci) => <td key={ci} className={cn("border-b border-line px-5 py-4 leading-6", ci === 0 ? "font-medium text-fg" : "text-muted")}><Rich text={cell} /></td>)}
              </tr>
            ))}</tbody>
          </table>
        </div>
      ) : null}

      {section.tip ? (
        <div className="mt-6 flex gap-3.5 rounded-2xl border border-brand/35 bg-brand/[0.07] p-5">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" />
          <p className="text-[15px] leading-7 text-fg"><span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-ink">Remember · </span><Rich text={section.tip} /></p>
        </div>
      ) : null}
    </section>
  );
}

function SubjectPicker({ subject, onSubject }: { subject: NotesSubjectId; onSubject: (id: NotesSubjectId) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {NOTES_SUBJECTS.map((s) => {
        const active = s.id === subject;
        const count = NOTES_COUNTS[s.id];
        return (
          <button key={s.id} type="button" onClick={() => onSubject(s.id)} aria-pressed={active} className={cn("flex items-center gap-4 rounded-2xl border p-5 text-left transition sm:p-6", active ? "border-brand bg-brand/[0.08] glow" : "border-line bg-card hover:border-line-2 hover:bg-fg/[0.04]")}>
            <SubjectGlyph id={s.id} active={active} />
            <span className="min-w-0">
              <span className="block text-lg font-bold tracking-tight text-fg">{s.name}</span>
              <span className="mt-1 block text-sm text-muted">{s.tagline}</span>
              <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">{count} chapters</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ChapterGrid({ chapters, onSelect }: { chapters: NoteChapter[]; onSelect: (id: string) => void }) {
  if (!chapters.length) return <Card className="p-10 text-center text-muted">No chapter matched this search.</Card>;
  const groups = chapters.reduce<Array<{ unit: string; chapters: NoteChapter[] }>>((all, chapter) => {
    const existing = all.find((g) => g.unit === chapter.unit);
    if (existing) existing.chapters.push(chapter);
    else all.push({ unit: chapter.unit, chapters: [chapter] });
    return all;
  }, []);
  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <section key={group.unit}>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{group.unit}</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {group.chapters.map((ch) => (
              <button key={ch.id} type="button" onClick={() => onSelect(ch.id)} className="group flex min-h-44 flex-col items-start rounded-2xl border border-line bg-card p-6 text-left transition hover:-translate-y-0.5 hover:border-brand/60 hover:bg-brand/[0.04] hover:shadow-[0_18px_40px_-26px_rgba(249,115,22,0.75)] sm:p-7">
                <span className="font-mono text-xs text-brand-ink">CH {pad2(ch.chapterNo)}</span>
                <span className="mt-5 text-xl font-bold leading-tight tracking-tight text-fg">{ch.title}</span>
                <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{ch.overview}</span>
                <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-brand-ink">Open notes <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function NotesBrowser() {
  const router = useRouter();
  const sp = useSearchParams();
  const subjectFromUrl = sp.get("subject");
  const subject: NotesSubjectId =
    subjectFromUrl === "sst" || subjectFromUrl === "math" || subjectFromUrl === "english" || subjectFromUrl === "hindi" || subjectFromUrl === "it" ? subjectFromUrl : "science";
  const classLevel: ClassLevel = sp.get("class") === "10" ? 10 : 9;
  const chapterId = sp.get("chapter") ?? "";
  const [query, setQuery] = useState("");
  const [jumpOpen, setJumpOpen] = useState(false);

  const chapters = useMemo(() => notesByClass(classLevel, subject), [classLevel, subject]);
  const selected = chapters.find((c) => c.id === chapterId);
  const filtered = useMemo(() => searchChapters(classLevel, subject, query), [classLevel, subject, query]);
  const selectedIndex = selected ? chapters.findIndex((c) => c.id === selected.id) : -1;
  const diagram = getDiagram(selected?.diagram);

  useEffect(() => {
    setQuery("");
    setJumpOpen(false);
  }, [subject, classLevel]);

  function libraryUrl(nextSubject: NotesSubjectId, nextClass: ClassLevel) {
    return `/notes?subject=${nextSubject}&class=${nextClass}`;
  }
  function chooseSubject(next: NotesSubjectId) {
    router.replace(libraryUrl(next, classLevel));
  }
  function chooseClass(next: ClassLevel) {
    router.replace(libraryUrl(subject, next));
  }
  function openChapter(id: string) {
    router.push(`/notes?subject=${subject}&class=${classLevel}&chapter=${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function backToLibrary() {
    router.push(libraryUrl(subject, classLevel));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ------------------------------ Library view ----------------------------- */
  if (!selected) {
    return (
      <Container>
        <div className="animate-fade-in">
          <div className="max-w-3xl">
            <Label>Study library</Label>
            <h1 className="mt-5 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-fg sm:text-6xl lg:text-7xl">Notes that make<br /><span className="grad-text">revision simpler.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">Clear NCERT-aligned chapter notes for Class 9 and 10. Choose a subject, open a chapter, then revise the concepts, key terms, formulas and exam tips at your own pace.</p>
          </div>

          <div className="mt-12">
            <Label n="01">Choose a subject</Label>
            <div className="mt-5"><SubjectPicker subject={subject} onSubject={chooseSubject} /></div>
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-line pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Label n="02">Choose your class</Label>
              <div className="mt-4 flex gap-2">
                {([9, 10] as ClassLevel[]).map((c) => {
                  const active = c === classLevel;
                  return <button key={c} type="button" onClick={() => chooseClass(c)} className={cn("rounded-full border px-6 py-3 text-sm font-semibold transition", active ? "border-brand bg-brand/[0.1] text-fg glow" : "border-line text-muted hover:border-line-2 hover:text-fg")}>Class {c}</button>;
                })}
              </div>
            </div>
            <div className="w-full sm:w-72">
              <label className="flex items-center gap-3 rounded-xl border border-line bg-fg/[0.03] px-4 py-3 focus-within:border-brand/70"><Search className="h-4 w-4 text-subtle" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a chapter" className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-subtle" /></label>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">Class {classLevel} {NOTES_SUBJECTS.find((s) => s.id === subject)?.name}</h2><span className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">{filtered.length} chapters</span></div>
            <ChapterGrid chapters={filtered} onSelect={openChapter} />
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {[
              { v: NOTES_COUNTS.chapters, k: "Chapters" },
              { v: NOTES_COUNTS.sections, k: "Concept sections" },
              { v: NOTES_COUNTS.diagrams, k: "Science diagrams" },
              { v: "9 & 10", k: "Classes covered" },
            ].map((m) => <div key={m.k} className="bg-bg px-6 py-6"><p className="grad-text font-mono text-3xl font-bold tabular-nums">{m.v}</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">{m.k}</p></div>)}
          </div>
        </div>
      </Container>
    );
  }

  /* ------------------------------ Reader view ------------------------------ */
  const meta = [
    { k: "Class", v: `${selected.classLevel}` }, { k: "Chapter", v: pad2(selected.chapterNo) }, { k: "Sections", v: String(selected.sections.length) }, { k: "Key terms", v: String(selected.keyTerms.length) },
  ];
  const subjectName = NOTES_SUBJECTS.find((s) => s.id === subject)?.name ?? subject;

  return (
    <Container>
      <article className="mx-auto max-w-4xl animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={backToLibrary} className={cn(btn.ghost, "-ml-3")}><ArrowLeft className="h-4 w-4" /> All Class {classLevel} {subjectName} notes</button>
          <div className="relative">
            <button type="button" onClick={() => setJumpOpen((v) => !v)} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm font-medium text-fg hover:border-line-2"><span className="font-mono text-[11px] text-brand-ink">{pad2(selected.chapterNo)}</span><span className="max-w-40 truncate">{selected.title}</span><ChevronDown className={cn("h-4 w-4 text-subtle transition", jumpOpen && "rotate-180")} /></button>
            {jumpOpen ? (
              <div className="absolute right-0 top-full z-20 mt-2 max-h-80 w-80 overflow-y-auto rounded-2xl border border-line bg-surface p-2 card-shadow">
                {chapters.map((ch) => <button key={ch.id} type="button" onClick={() => { openChapter(ch.id); setJumpOpen(false); }} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition", ch.id === selected.id ? "bg-brand/[0.1] text-fg" : "text-muted hover:bg-fg/[0.05] hover:text-fg")}><span className="font-mono text-[11px] text-brand-ink">{pad2(ch.chapterNo)}</span><span className="truncate">{ch.title}</span></button>)}
              </div>
            ) : null}
          </div>
        </div>

        <header className="mt-12 sm:mt-16">
          <div className="flex flex-wrap items-center gap-2"><Badge tone="brand"><BookOpen className="h-3.5 w-3.5" /> {subjectName} · Class {selected.classLevel}</Badge><Badge>Chapter {pad2(selected.chapterNo)}</Badge>{diagram ? <Badge><Sparkles className="h-3.5 w-3.5 text-brand-ink" /> Labelled diagram</Badge> : null}</div>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1] tracking-tight text-fg sm:text-5xl lg:text-6xl">{selected.title}</h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{selected.unit}</p>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted sm:text-xl">{selected.overview}</p>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">{meta.map((m) => <div key={m.k} className="bg-bg px-5 py-4"><dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">{m.k}</dt><dd className="mt-1 font-mono text-xl font-semibold text-fg tabular-nums">{m.v}</dd></div>)}</dl>
        </header>

        {diagram ? <div className="mt-10"><DiagramFrame entry={diagram} index={selected.chapterNo} /></div> : null}

        <div className="mt-12 space-y-10 sm:mt-16 sm:space-y-12">{selected.sections.map((s, i) => <SectionBlock key={s.title} index={i + 1} section={s} />)}</div>

        <Card className="mt-14 p-6 sm:p-8"><Label className="mb-6">Key terms</Label><dl className="grid gap-3 sm:grid-cols-2">{selected.keyTerms.map((t) => <div key={t.term} className="rounded-xl border border-line bg-fg/[0.02] p-4"><dt className="text-base font-semibold text-fg">{t.term}</dt><dd className="mt-1.5 text-sm leading-relaxed text-muted">{t.meaning}</dd></div>)}</dl></Card>

        <Card className="mt-6 p-6 sm:p-8"><Label className="mb-6">Exam tips</Label><ul className="space-y-4">{selected.examTips.map((tip, i) => <li key={i} className="flex gap-3.5 text-base leading-7 text-muted"><span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-brand/40 bg-brand/10 font-mono text-[11px] font-semibold text-brand-ink">{i + 1}</span><Rich text={tip} /></li>)}</ul></Card>

        <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {selectedIndex > 0 ? <button type="button" onClick={() => openChapter(chapters[selectedIndex - 1].id)} className={cn(btn.subtle, "justify-start text-left")}><ArrowLeft className="h-4 w-4 shrink-0" /><span><span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">Previous</span><span className="block max-w-52 truncate">{chapters[selectedIndex - 1].title}</span></span></button> : <span />}
          {selectedIndex < chapters.length - 1 ? <button type="button" onClick={() => openChapter(chapters[selectedIndex + 1].id)} className={cn(btn.subtle, "justify-end text-right")}><span><span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">Next</span><span className="block max-w-52 truncate">{chapters[selectedIndex + 1].title}</span></span><ArrowRight className="h-4 w-4 shrink-0" /></button> : null}
        </nav>

        {subject === "science" || subject === "sst" ? <Card className="mt-10 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="flex items-center gap-2 font-semibold text-fg"><ListChecks className="h-4 w-4 text-brand-ink" /> Finished revising?</p><p className="mt-1 text-sm text-muted">Test this chapter with a short practice quiz.</p></div><button type="button" onClick={() => router.push(`/quiz?topic=${quizTopicFor(selected)}&n=10&t=30&tm=per-question&d=any&src=bank&h=3`)} className={btn.primary}>Practise this chapter <ArrowRight className="h-4 w-4" /></button></Card> : null}
      </article>
    </Container>
  );
}

function quizTopicFor(chapter: NoteChapter): string {
  if (chapter.subject === "sst") return chapter.id.replace("note-", "");
  if (chapter.subject === "science") return `sci${chapter.id.replace("note", "")}`;
  return "math-mixed";
}
