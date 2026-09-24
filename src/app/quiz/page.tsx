import type { Metadata } from "next";
import { Suspense } from "react";
import QuizPageClient from "@/components/QuizPageClient";

export const metadata: Metadata = { title: "Quiz" };

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">
          Preparing quiz…
        </div>
      }
    >
      <QuizPageClient />
    </Suspense>
  );
}
