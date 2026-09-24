import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "src/app/api");
const stash = path.join(root, ".api-stash");
const nextDir = path.join(root, ".next");

if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true });
}

function run(cmd, args, env = {}) {
  const res = spawnSync(cmd, args, { stdio: "inherit", env: { ...process.env, ...env }, shell: process.platform === "win32" });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

// Temporarily move API routes out so static export has zero server endpoints.
if (existsSync(apiDir)) {
  rmSync(stash, { recursive: true, force: true });
  cpSync(apiDir, stash, { recursive: true });
  rmSync(apiDir, { recursive: true, force: true });
}

try {
  run("npx", ["next", "build"], { QUIZLAB_STATIC: "1" });
} finally {
  if (existsSync(stash)) {
    mkdirSync(path.dirname(apiDir), { recursive: true });
    cpSync(stash, apiDir, { recursive: true });
    rmSync(stash, { recursive: true, force: true });
  }
}

// Ensure Cloudflare sees a health file (optional)
if (existsSync(path.join(root, "out"))) {
  writeFileSync(path.join(root, "out", "health.json"), JSON.stringify({ ok: true, mode: "local" }));
  console.log("Static export ready in ./out");
}
