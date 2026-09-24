import type { NextConfig } from "next";

const isStatic = process.env.QUIZLAB_STATIC === "1";

const nextConfig: NextConfig = {
  // QUIZLAB_STATIC=1 → fully static `out/` folder for Cloudflare Pages / GitHub Pages.
  ...(isStatic ? { output: "export" as const } : {}),
  images: { unoptimized: true },
  // Custom redirects need a host; with static export use Cloudflare _redirects instead.
  ...(!isStatic
    ? {
        async redirects() {
          return [
            { source: "/play", destination: "/", permanent: false },
            { source: "/play/setup", destination: "/", permanent: false },
            { source: "/results/:id", destination: "/results?id=:id", permanent: false },
          ];
        },
      }
    : {}),
};

export default nextConfig;
