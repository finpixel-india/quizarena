import { Suspense } from "react";
import type { Metadata } from "next";
import FactsClient from "@/components/FactsClient";

export const metadata: Metadata = {
  title: "Interesting Facts",
  description:
    "Explore thousands of mind-blowing facts about space, science, animals, history, the human body, and more — with images and bookmark support.",
};

export default function FactsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-5 py-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">
          Loading facts…
        </div>
      }
    >
      <FactsClient />
    </Suspense>
  );
}
