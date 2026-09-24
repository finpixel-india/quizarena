import type { ReactNode } from "react";
import type { DiagramEntry } from "@/data/notes/types";

/* ------------------------------ SVG primitives ------------------------------ */

export function L({ x1, y1, x2, y2, dashed, w = 1.3, opacity = 0.7 }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean; w?: number; opacity?: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={w} opacity={opacity} strokeDasharray={dashed ? "4 3" : undefined} strokeLinecap="round" />;
}

export function Arrow({ x1, y1, x2, y2, marker, opacity = 0.85 }: { x1: number; y1: number; x2: number; y2: number; marker: string; opacity?: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={1.5} opacity={opacity} markerEnd={`url(#${marker})`} strokeLinecap="round" />;
}

export function Defs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
      </marker>
    </defs>
  );
}

export function Box({
  x,
  y,
  w,
  h,
  r = 10,
  label,
  sub,
  tone = "line",
  dashed,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  label?: string;
  sub?: string;
  tone?: "line" | "brand" | "muted";
  dashed?: boolean;
}) {
  const strokeOpacity = tone === "brand" ? 0.75 : tone === "muted" ? 0.35 : 0.5;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={r}
        fill={tone === "brand" ? "rgb(249 115 22 / 0.10)" : "currentColor"}
        fillOpacity={tone === "brand" ? 1 : 0.03}
        stroke="currentColor"
        strokeOpacity={strokeOpacity}
        strokeWidth={1.3}
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      {label ? (
        <text x={x + w / 2} y={y + h / 2 + (sub ? -2 : 4)} fontSize={12.5} fontWeight={600} fill="currentColor" textAnchor="middle">
          {label}
        </text>
      ) : null}
      {sub ? (
        <text x={x + w / 2} y={y + h / 2 + 14} fontSize={10.5} fill="currentColor" opacity={0.65} textAnchor="middle">
          {sub}
        </text>
      ) : null}
    </g>
  );
}

export function T({
  x,
  y,
  children,
  anchor = "start",
  size = 10.5,
  bold,
  opacity = 0.95,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  size?: number;
  bold?: boolean;
  opacity?: number;
}) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={bold ? 600 : 400} fill="currentColor" opacity={opacity} textAnchor={anchor}>
      {children}
    </text>
  );
}

export function Dot({ cx, cy, r = 4, fill }: { cx: number; cy: number; r?: number; fill?: string }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill ?? "currentColor"} fillOpacity={fill ? 1 : 0.75} stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.8} />;
}

export function Ellipse({ cx, cy, rx, ry, opacity = 0.5 }: { cx: number; cy: number; rx: number; ry: number; opacity?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="currentColor" strokeOpacity={opacity} strokeWidth={1.3} />;
}

export function Path({ d, opacity = 0.6, w = 1.3, fill = "none", dashed }: { d: string; opacity?: number; w?: number; fill?: string; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill={fill}
      stroke="currentColor"
      strokeOpacity={fill === "none" ? opacity : 0}
      strokeWidth={w}
      strokeLinecap="round"
      strokeDasharray={dashed ? "5 4" : undefined}
    />
  );
}

/** Leader line from a label to a part of the figure. */
export function Leader({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <L x1={x1} y1={y1} x2={x2} y2={y2} dashed w={1} opacity={0.5} />
      <circle cx={x2} cy={y2} r={2.6} fill="currentColor" fillOpacity={0.9} />
    </g>
  );
}

/* --------------------------------- The frame -------------------------------- */

export function DiagramFrame({ entry, index }: { entry: DiagramEntry; index?: number }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-fg/[0.02]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
          {index !== undefined ? <span className="text-brand-ink">FIG {String(index).padStart(2, "0")} · </span> : null}
          {entry.title}
        </p>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-subtle sm:inline">Labelled diagram</span>
      </div>
      <div className="bg-fg/[0.01] p-4 sm:p-6">
        <svg viewBox="0 0 640 360" className="mx-auto h-auto w-full max-w-2xl text-fg" role="img" aria-label={`${entry.title}. ${entry.caption}`}>
          <Defs id={`ar-${entry.id}`} />
          {entry.Svg()}
        </svg>
      </div>
      <figcaption className="border-t border-line px-5 py-4">
        <p className="text-sm leading-relaxed text-muted">{entry.caption}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {entry.labels.map((l) => (
            <li key={l} className="rounded-full border border-line bg-fg/[0.03] px-2.5 py-1 font-mono text-[10.5px] text-subtle">
              {l}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
