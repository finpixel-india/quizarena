import type { Metadata } from "next";
import { Suspense } from "react";
import ResultsPageClient from "@/components/ResultsPageClient";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Results" };

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <Container>
          <div className="mx-auto max-w-3xl py-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">Loading results…</div>
        </Container>
      }
    >
      <ResultsPageClient />
    </Suspense>
  );
}
