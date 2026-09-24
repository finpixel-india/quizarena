import { Suspense } from "react";
import HomeClient from "@/components/HomeClient";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-5 py-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">
          Loading QuizLab…
        </div>
      }
    >
      <HomeClient />
    </Suspense>
  );
}
