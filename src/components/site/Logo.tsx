import Link from "next/link";

export function PenMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <rect x="3" y="3" width="20" height="26" rx="3" className="fill-surface stroke-ink" strokeWidth="2" />
      <path d="M8 11h10M8 16h7M8 21h9" className="stroke-muted" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 16.2 11 19l6-7" fill="none" className="stroke-pen" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m20.5 25.5 8-8a1.9 1.9 0 0 0-2.7-2.7l-8 8-.8 3.5z" className="fill-pen" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2" aria-label="履歷紅筆 首頁">
      <PenMark className="h-8 w-8 transition-transform group-hover:-rotate-6" />
      <span className="font-serif text-lg font-black tracking-wide">
        履歷<span className="text-pen">紅筆</span>
      </span>
    </Link>
  );
}
