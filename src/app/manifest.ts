import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "QuizLab — Science, SST, Math & IT Practice",
    short_name: "QuizLab",
    description: "Chapter-wise Class 9 & 10 Science and SST quizzes, Basic Math and IT — with timers, hints, history and high scores stored on your device.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#0C0A09",
    theme_color: "#0C0A09",
    categories: ["education"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
