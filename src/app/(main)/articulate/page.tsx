import { Suspense } from "react";
import type { Metadata } from "next";
import ArticulateClient from "@/components/ArticulateClient";

export const metadata: Metadata = {
  title: "Articulate — Impromptu Speaking Practice",
  description:
    "Master spontaneous articulation and deep analytical thinking with random prompts, timers, and research topics. Made by @ur.spideey.",
};

export default function ArticulatePage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center min-h-[calc(100dvh-4rem)] text-center font-mono text-xs uppercase tracking-[0.2em] text-subtle">
          Loading Articulate…
        </div>
      }
    >
      <ArticulateClient />
    </Suspense>
  );
}
