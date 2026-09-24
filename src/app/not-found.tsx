import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="max-w-sm text-center animate-fade-up">
        <p className="grad-text font-mono text-6xl font-bold tracking-tight">404</p>
        <h1 className="mt-4 text-xl font-bold tracking-tight text-fg">Page not found</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">This quiz or page doesn&apos;t exist, or it was deleted from your history.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full grad-cta px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_-10px_rgba(249,115,22,0.8)] transition hover:brightness-110"
        >
          Back to QuizLab
        </Link>
      </div>
    </div>
  );
}
