export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec.toString().padStart(2, "0")}s`;
  return `${sec}s`;
}

/** Server-side default timezone (the curriculum is Indian). Pass `null` to use the viewer's local timezone. */
export const DEFAULT_TZ = "Asia/Kolkata";

export function formatDate(date: Date | string, timeZone: string | null = DEFAULT_TZ): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: timeZone ?? undefined });
}

export function formatDateTime(date: Date | string, timeZone: string | null = DEFAULT_TZ): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: timeZone ?? undefined,
  });
}

export function relativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const days = Math.round(hr / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return formatDate(d);
}

export function accuracyTone(acc: number): string {
  if (acc >= 80) return "text-success";
  if (acc >= 50) return "text-warning";
  return "text-danger";
}

export function accuracyBar(acc: number): string {
  if (acc >= 80) return "bg-success";
  if (acc >= 50) return "bg-warning";
  return "bg-danger";
}

/** "Class 10 Science · Metals and Non-metals" → { context: "Class 10 Science", title: "Metals and Non-metals" } */
export function splitLabel(label: string): { context: string; title: string } {
  const i = label.lastIndexOf(" · ");
  return i === -1 ? { context: "", title: label } : { context: label.slice(0, i), title: label.slice(i + 3) };
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
