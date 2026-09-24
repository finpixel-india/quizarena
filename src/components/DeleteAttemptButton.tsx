"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { deleteAttempt } from "@/lib/storage";

export default function DeleteAttemptButton({ id }: { id: string }) {
  const [busy, setBusy] = useState(false);
  function remove() {
    if (!window.confirm("Delete this quiz from your history?")) return;
    setBusy(true);
    try {
      deleteAttempt(id);
    } finally {
      setBusy(false);
    }
  }
  return (
    <button
      type="button"
      onClick={remove}
      disabled={busy}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-subtle transition hover:bg-danger/10 hover:text-danger disabled:opacity-50"
      aria-label="Delete quiz"
      title="Delete"
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  );
}
