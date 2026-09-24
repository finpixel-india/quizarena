import type { ComponentType, ReactNode } from "react";
import { Calculator, Cpu, FlaskConical, Landmark, Sparkles } from "lucide-react";
import { cn } from "@/lib/format";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

/* ---------------------------------- Layout --------------------------------- */

/** Page width + gutters. Sections can opt out to run edge-to-edge. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14", className)}>{children}</div>;
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-2xl border border-line bg-card card-shadow md:backdrop-blur-xl", className)}>{children}</div>;
}

/** Mono, uppercase eyebrow label — "■ 02 —— SUBJECT". */
export function Label({ n, children, className }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-subtle", className)}>
      <span className="h-1.5 w-1.5 shrink-0 bg-brand" aria-hidden="true" />
      {n ? (
        <>
          <span className="text-brand-ink">{n}</span>
          <span className="h-px w-5 bg-line-2" />
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <Label className="mb-4">{eyebrow}</Label> : null}
        <h1 className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">{title}</h1>
        {description ? <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }: { icon: IconType; title: string; description: string; action?: ReactNode }) {
  return (
    <Card className="flex flex-col items-center px-6 py-16 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/30 bg-brand/10 text-brand-ink glow-soft">
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <h2 className="mt-6 text-lg font-bold tracking-tight text-fg">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
      {action ? <div className="mt-8">{action}</div> : null}
    </Card>
  );
}

/* --------------------------------- Display --------------------------------- */

const SUBJECT_ICONS: Record<string, IconType> = {
  science: FlaskConical,
  sst: Landmark,
  math: Calculator,
  it: Cpu,
  custom: Sparkles,
};

export function SubjectIcon({ subject, size = "md", active, className }: { subject: string; size?: "sm" | "md" | "lg"; active?: boolean; className?: string }) {
  const Icon = SUBJECT_ICONS[subject] ?? FlaskConical;
  const box = size === "sm" ? "h-9 w-9 rounded-xl" : size === "lg" ? "h-14 w-14 rounded-2xl" : "h-11 w-11 rounded-xl";
  const icon = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center border transition",
        active ? "border-transparent grad-hero text-black" : "border-line bg-fg/[0.03] text-brand-ink",
        box,
        className,
      )}
    >
      <Icon className={icon} strokeWidth={1.75} />
    </span>
  );
}

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  tone = "brand",
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  icon?: IconType;
  tone?: "brand" | "success" | "warning" | "danger";
}) {
  const tones = { brand: "text-brand-ink", success: "text-success", warning: "text-warning", danger: "text-danger" };
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        {Icon ? <Icon className={cn("h-4 w-4", tones[tone])} strokeWidth={1.75} /> : null}
      </div>
      <p className="mt-5 font-mono text-2xl font-semibold tracking-tight text-fg tabular-nums sm:text-3xl">{value}</p>
      {sub ? <p className="mt-1.5 truncate text-xs text-muted">{sub}</p> : null}
    </Card>
  );
}

export function ProgressRing({
  value,
  size = 56,
  stroke = 5,
  variant = "status",
  className,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  variant?: "status" | "brand";
  className?: string;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  const status = v >= 80 ? "stroke-success" : v >= 50 ? "stroke-warning" : "stroke-danger";
  return (
    <div className={cn("relative inline-flex shrink-0 items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-fg/10" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (v / 100) * c}
          stroke={variant === "brand" ? "url(#ql-grad)" : undefined}
          className={cn(variant === "status" && status, "transition-[stroke-dashoffset] duration-700 ease-out")}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: "neutral" | "brand" | "success" | "warning" | "danger"; className?: string }) {
  const tones = {
    neutral: "border-line bg-fg/[0.04] text-muted",
    brand: "border-brand/30 bg-brand/10 text-brand-ink",
    success: "border-success/30 bg-success/10 text-success",
    warning: "border-warning/30 bg-warning/10 text-warning",
    danger: "border-danger/30 bg-danger/10 text-danger",
  };
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium", tones[tone], className)}>{children}</span>;
}

/* ---------------------------------- Inputs --------------------------------- */

export function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  className,
}: {
  value: T;
  options: Array<{ v: T; label: string }>;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex max-w-full gap-1 overflow-x-auto rounded-xl border border-line bg-fg/[0.02] p-1 scrollbar-none", className)}>
      {options.map((o) => {
        const active = value === o.v;
        return (
          <button
            key={String(o.v)}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.v)}
            className={cn(
              "shrink-0 rounded-lg px-3.5 py-1.5 text-sm font-medium transition ring-1 ring-inset",
              active ? "bg-brand/15 text-fg ring-brand/70" : "ring-transparent text-muted hover:bg-fg/[0.04] hover:text-fg",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Switch({
  checked,
  onChange,
  label,
  description,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 text-left disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="min-w-0">
        <span className="block text-sm font-medium text-fg">{label}</span>
        {description ? <span className="mt-0.5 block text-xs text-subtle">{description}</span> : null}
      </span>
      <span
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 rounded-full border transition",
          checked ? "border-brand bg-brand shadow-[0_0_18px_-4px_rgba(249,115,22,0.85)]" : "border-line-2 bg-fg/10",
        )}
      >
        <span className={cn("absolute left-0.5 top-0.5 h-[18px] w-[18px] rounded-full shadow transition-transform", checked ? "translate-x-5 bg-black" : "bg-white")} />
      </span>
    </button>
  );
}

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full grad-cta px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_-10px_rgba(249,115,22,0.8)] transition hover:brightness-110 hover:shadow-[0_12px_40px_-10px_rgba(249,115,22,0.95)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-full border border-line-2 bg-transparent px-6 py-3 text-sm font-semibold text-fg transition hover:border-brand hover:bg-brand/10 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
  subtle:
    "inline-flex items-center justify-center gap-2 rounded-full border border-line bg-fg/[0.03] px-6 py-3 text-sm font-medium text-fg transition hover:border-line-2 hover:bg-fg/[0.06] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted transition hover:bg-fg/5 hover:text-fg disabled:pointer-events-none disabled:opacity-40",
  icon: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted transition hover:bg-fg/[0.06] hover:text-fg",
};

export function chip(active: boolean) {
  return cn(
    "min-w-[3.25rem] rounded-xl border px-3.5 py-2 text-sm font-medium tabular-nums transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-25",
    // Always reserve the glow shadow space — transparent when inactive prevents layout shift
    active
      ? "border-brand bg-brand/10 text-fg shadow-[0_0_0_1px_rgba(249,115,22,0.55),0_0_20px_-6px_rgba(249,115,22,0.45)]"
      : "border-line bg-fg/[0.02] text-muted shadow-[0_0_0_1px_transparent] hover:border-line-2 hover:text-fg",
  );
}

export function inputCls(active: boolean) {
  return cn(
    "rounded-xl border bg-fg/[0.02] px-3 py-2 text-sm font-medium text-fg outline-none transition placeholder:font-normal placeholder:text-subtle",
    active ? "border-brand glow" : "border-line focus:border-line-2",
  );
}
