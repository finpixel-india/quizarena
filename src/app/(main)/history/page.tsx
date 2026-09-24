import type { Metadata } from "next";
import { Suspense } from "react";
import HistoryClient from "@/components/HistoryClient";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "History" };

export default function HistoryPage() {
  return (
    <Suspense
      fallback={
        <Container>
          <div className="mx-auto max-w-3xl py-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">Loading history…</div>
        </Container>
      }
    >
      <HistoryClient />
    </Suspense>
  );
}
