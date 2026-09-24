import type { Metadata } from "next";
import { Suspense } from "react";
import NotesBrowser from "@/components/NotesBrowser";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Study Notes — Class 9 & 10",
  description:
    "Expanded Class 9 and 10 Science, Social Science, Mathematics, English Grammar and Hindi Grammar notes with explanations, formulas, examples and exam tips.",
};

export default function NotesPage() {
  return (
    <Suspense
      fallback={
        <Container>
          <div className="py-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">Loading notes…</div>
        </Container>
      }
    >
      <NotesBrowser />
    </Suspense>
  );
}
