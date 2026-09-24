"use client";

import { useSearchParams } from "next/navigation";
import ResultsClient from "@/components/ResultsClient";
import { Container } from "@/components/ui";

export default function ResultsPageClient() {
  const sp = useSearchParams();
  const id = sp.get("id") || "";
  if (!id) {
    return (
      <Container>
        <div className="mx-auto max-w-sm py-20 text-center">
          <p className="text-sm text-muted">No quiz selected.</p>
        </div>
      </Container>
    );
  }
  return <ResultsClient id={id} />;
}
