import { SECTIONS, SEVERITIES, type ResumeReview, type Severity } from "@/lib/reviewSchema";
import CopyButton from "./CopyButton";

const SEVERITY: Record<Severity, { label: string; pill: string; bar: string }> = {
  high: { label: "重要", pill: "bg-pen-soft text-pen", bar: "border-l-pen" },
  medium: { label: "建議", pill: "bg-amber-soft text-amber", bar: "border-l-amber" },
  low: { label: "細節", pill: "bg-surface-2 text-muted", bar: "border-l-line" },
};

function verdict(score: number) {
  if (score >= 85) return { text: "很有競爭力", color: "text-leaf", stroke: "stroke-leaf" };
  if (score >= 70) return { text: "不錯，再磨一下", color: "text-leaf", stroke: "stroke-leaf" };
  if (score >= 55) return { text: "還有進步空間", color: "text-amber", stroke: "stroke-amber" };
  return { text: "建議大幅調整", color: "text-pen", stroke: "stroke-pen" };
}

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const v = verdict(score);
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="9" className="stroke-line" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.min(100, Math.max(0, score)) / 100)}
          className={`${v.stroke} transition-[stroke-dashoffset] duration-1000`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-serif text-4xl font-black tabular-nums ${v.color}`}>{score}</span>
        <span className="text-xs text-muted">/ 100</span>
      </div>
    </div>
  );
}

export default function ResumeReport({ review, jobLabel }: { review: ResumeReview; jobLabel: string }) {
  if (!review.isResume) {
    return (
      <section className="rounded-2xl border border-amber/40 bg-amber-soft p-6 sm:p-8">
        <p className="font-hand text-lg text-amber">嗯…</p>
        <h2 className="mt-1 font-serif text-2xl font-black">這份檔案看起來不是履歷</h2>
        <p className="mt-3 leading-7 text-muted">{review.summary}</p>
      </section>
    );
  }

  const all = SECTIONS.flatMap((s) => review.sections[s.key]);
  const counts = Object.fromEntries(SEVERITIES.map((sev) => [sev, all.filter((i) => i.severity === sev).length])) as Record<
    Severity,
    number
  >;
  const v = verdict(review.score);

  return (
    <div className="flex flex-col gap-10">
      {/* ── 成績單 ── */}
      <section className="overflow-hidden rounded-3xl border border-line bg-surface">
        <div className="flex flex-col items-center gap-6 p-6 text-center sm:flex-row sm:items-start sm:gap-8 sm:p-8 sm:text-left">
          <ScoreRing score={review.score} />
          <div className="min-w-0 flex-1">
            <p className="text-xs tracking-widest text-muted">以「{jobLabel}」的標準來看</p>
            <h1 className={`mt-1 font-serif text-3xl font-black sm:text-4xl ${v.color}`}>{v.text}</h1>
            <p className="mt-4 text-left leading-8">{review.summary}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              {SEVERITIES.map((sev) => (
                <span key={sev} className={`rounded-full px-3 py-1 text-xs font-medium ${SEVERITY[sev].pill}`}>
                  {SEVERITY[sev].label} × {counts[sev]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {review.strengths.length > 0 && (
          <div className="border-t border-line bg-leaf-soft/50 p-6 sm:px-8">
            <h2 className="font-hand text-lg text-leaf">做得好的地方 ✓</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {review.strengths.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm leading-7">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" aria-hidden />
                  <span className="min-w-0">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-10">
        {/* ── 面向導覽：手機橫向捲動 / 桌機側邊欄 ── */}
        <nav aria-label="建議面向" className="sticky top-16 z-30 -mx-4 mb-6 border-b border-line bg-paper/90 px-4 backdrop-blur-md lg:top-24 lg:mx-0 lg:mb-0 lg:self-start lg:border-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none">
          <p className="hidden pb-3 text-xs tracking-widest text-muted lg:block">面向</p>
          <ul className="no-scrollbar flex gap-1 overflow-x-auto py-2 lg:flex-col lg:py-0">
            {SECTIONS.map((s) => (
              <li key={s.key} className="shrink-0">
                <a
                  href={`#sec-${s.key}`}
                  className="flex items-center justify-between gap-3 whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-muted transition hover:bg-surface hover:text-ink lg:rounded-lg lg:py-2"
                >
                  {s.label}
                  <span className="rounded-full bg-surface-2 px-1.5 text-xs tabular-nums">{review.sections[s.key].length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── 各面向建議 ── */}
        <div className="flex min-w-0 flex-col gap-14">
          {SECTIONS.map((section, si) => {
            const items = review.sections[section.key];
            return (
              <section key={section.key} id={`sec-${section.key}`} className="scroll-mt-32 lg:scroll-mt-24">
                <header className="flex items-end justify-between gap-4 border-b border-line pb-4">
                  <div className="min-w-0">
                    <span className="font-mono text-xs text-pen">0{si + 1}</span>
                    <h2 className="font-serif text-2xl font-black">{section.label}</h2>
                    <p className="mt-1 text-sm text-muted">{section.hint}</p>
                  </div>
                  <span className="shrink-0 font-serif text-3xl font-black text-line">{items.length}</span>
                </header>

                {items.length === 0 ? (
                  <p className="mt-5 flex items-center gap-2 rounded-xl bg-leaf-soft/60 px-4 py-3 text-sm text-leaf">
                    <span aria-hidden>✓</span> 這個面向沒有明顯問題，保持下去。
                  </p>
                ) : (
                  <ol className="mt-5 flex flex-col gap-5">
                    {items.map((item, i) => (
                      <li
                        key={i}
                        className={`rounded-2xl border border-l-4 border-line bg-surface p-5 sm:p-6 ${SEVERITY[item.severity].bar}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${SEVERITY[item.severity].pill}`}>
                            {SEVERITY[item.severity].label}
                          </span>
                          <span className="font-mono text-xs text-muted">#{i + 1}</span>
                        </div>

                        <p className="mt-4 text-xs font-medium tracking-widest text-muted">原句</p>
                        <blockquote className="mt-1.5 leading-8 [overflow-wrap:anywhere]">
                          「<span className="hl">{item.quote}</span>」
                        </blockquote>

                        <p className="mt-4 text-xs font-medium tracking-widest text-pen">問題</p>
                        <p className="mt-1 text-sm leading-7 text-muted [overflow-wrap:anywhere]">{item.problem}</p>

                        <div className="mt-4 rounded-xl bg-leaf-soft p-4">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-medium tracking-widest text-leaf">改法</p>
                            <CopyButton text={item.suggestion} />
                          </div>
                          <p className="mt-1 whitespace-pre-line text-sm leading-7 [overflow-wrap:anywhere]">{item.suggestion}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
