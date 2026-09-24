"use client";

import { useSyncExternalStore } from "react";
import { formatDate, formatDateTime } from "@/lib/format";

const subscribe = () => () => {};

/** Renders a timestamp in the viewer's local timezone (IST during server render, then local after hydration). */
export default function LocalTime({ value, withTime = true }: { value: Date | string; withTime?: boolean }) {
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);
  const d = typeof value === "string" ? new Date(value) : value;
  const tz = isClient ? null : undefined;
  return <time dateTime={d.toISOString()}>{withTime ? formatDateTime(d, tz) : formatDate(d, tz)}</time>;
}
