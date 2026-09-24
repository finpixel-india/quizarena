import type { Metadata } from "next";
import StatsClient from "@/components/StatsClient";

export const metadata: Metadata = { title: "Stats & High Scores" };

export default function StatsPage() {
  return <StatsClient />;
}
