"use client";

import { useEffect, useState } from "react";
import { useApiKey } from "@/lib/apiKeyStore";
import { JOB_TYPES, findJobType, type JobTypeId } from "@/lib/jobTypes";
import type { ResumeReview } from "@/lib/reviewSchema";
import { MAX_PDF_BYTES } from "@/lib/upload";
import ApiKeyInput from "./ApiKeyInput";
import ResumeReport from "./ResumeReport";

type Result = { review: ResumeReview; jobType: JobTypeId };

export default function ResumeChecker() {
  const apiKey = useApiKey();
  const [file, setFile] = useState<File | null>(null);
  const [jobType, setJobType] = useState<JobTypeId | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [dragOver, setDragOver] = useState(false);

  function pickFile(f: File | undefined) {
    setError("");
    setFile(null);
    if (!f) return;
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setError("只接受 PDF 檔");
      return;
    }
    if (f.size > MAX_PDF_BYTES) {
      setError("檔案太大，請小於 4MB");
      return;
    }
    setFile(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!apiKey || !file || !jobType) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("jobType", jobType);
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "x-openai-key": apiKey },
        body,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? `分析失敗（${res.status}）`);
      setResult(data as Result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "分析失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  }

  // 切換畫面（送出 / 出結果 / 返回）時回到頂端
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [loading, result]);

  const canSubmit = !!apiKey && !!file && !!jobType && !loading;

  if (result) {
    return (
      <div className="animate-rise">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pen-soft text-lg" aria-hidden>
              📄
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{file?.name}</p>
              <p className="text-xs text-muted">目標職缺：{findJobType(result.jobType)?.label}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setResult(null)}
            className="h-10 shrink-0 rounded-full border border-line px-5 text-sm font-medium hover:border-ink/40"
          >
            ← 換一份 / 換職缺
          </button>
        </div>
        <ResumeReport review={result.review} jobLabel={findJobType(result.jobType)?.label ?? ""} />
      </div>
    );
  }

  if (loading) {
    return <LoadingPanel fileName={file?.name ?? ""} jobLabel={findJobType(jobType)?.label ?? ""} />;
  }

  return (
    <div className="animate-rise mx-auto max-w-2xl">
      <header className="mb-10">
        <p className="font-hand text-lg text-pen">履歷健檢</p>
        <h1 className="mt-1 font-serif text-4xl font-black leading-tight tracking-tight sm:text-5xl">把履歷交給紅筆</h1>
        <p className="mt-4 leading-7 text-muted">三個步驟，一分鐘內拿到逐句批改。</p>
      </header>

      <div className="relative">
        {/* 左側步驟連接線 */}
        <div className="absolute bottom-8 left-[15px] top-8 w-px bg-line sm:left-[19px]" aria-hidden />

        <Step n={1} title="你的 OpenAI API Key" done={!!apiKey}>
          <ApiKeyInput />
        </Step>

        <form onSubmit={handleSubmit}>
          <Step n={2} title="上傳履歷 PDF" done={!!file}>
            <label
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                pickFile(e.dataTransfer.files?.[0]);
              }}
              className={`group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-10 text-center transition ${
                dragOver
                  ? "border-pen bg-pen-soft"
                  : file
                    ? "border-leaf/40 bg-leaf-soft/60"
                    : "border-line bg-paper hover:border-ink/30 hover:bg-surface-2"
              }`}
            >
              <input
                type="file"
                accept="application/pdf,.pdf"
                className="sr-only"
                onChange={(e) => pickFile(e.target.files?.[0])}
              />
              {file ? (
                <>
                  <span className="text-3xl" aria-hidden>
                    📄
                  </span>
                  <span className="max-w-full break-all px-2 font-medium">{file.name}</span>
                  <span className="text-xs text-muted">{(file.size / 1024).toFixed(0)} KB・點擊或拖曳更換</span>
                </>
              ) : (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-xl shadow-sm transition group-hover:-translate-y-0.5" aria-hidden>
                    ↑
                  </span>
                  <span className="font-medium">
                    <span className="hidden sm:inline">拖曳 PDF 到這裡，或</span>點擊選擇檔案
                  </span>
                  <span className="text-xs text-muted">只接受 PDF・最大 4MB</span>
                </>
              )}
            </label>
          </Step>

          <Step n={3} title="想投遞的職缺類型" done={!!jobType}>
            <div role="radiogroup" aria-label="職缺類型" className="flex flex-wrap gap-2">
              {JOB_TYPES.map((j) => {
                const active = jobType === j.id;
                return (
                  <label
                    key={j.id}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ink/10 ${
                      active ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-ink/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="jobType"
                      value={j.id}
                      checked={active}
                      onChange={() => setJobType(j.id)}
                      className="sr-only"
                    />
                    {j.label}
                  </label>
                );
              })}
            </div>
          </Step>

          <div className="pl-12 sm:pl-14">
            {error && (
              <p role="alert" className="mb-4 rounded-xl border border-pen/30 bg-pen-soft px-4 py-3 text-sm text-pen">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={!canSubmit}
              className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-pen px-8 py-3.5 font-medium text-white shadow-[0_10px_30px_-10px_var(--pen)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none sm:w-auto"
            >
              開始健檢
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            {!canSubmit && (
              <p className="mt-3 text-xs text-muted">
                {apiKey === "" ? "請先完成步驟 1：輸入金鑰" : !file ? "請上傳履歷 PDF" : !jobType ? "請選擇職缺類型" : ""}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function Step({ n, title, done, children }: { n: number; title: string; done: boolean; children: React.ReactNode }) {
  return (
    <section className="relative mb-10 flex gap-4 sm:gap-5">
      <span
        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition sm:h-10 sm:w-10 ${
          done ? "border-leaf bg-leaf text-white" : "border-line bg-surface text-muted"
        }`}
      >
        {done ? "✓" : n}
      </span>
      <div className="min-w-0 flex-1 pt-0.5 sm:pt-1.5">
        <h2 className="mb-4 font-serif text-lg font-black sm:text-xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

const TIPS = [
  "正在逐頁閱讀你的履歷…",
  "對照目標職缺需要的能力…",
  "找出可以加上數字的成果…",
  "檢查用詞、關鍵字與排版…",
  "整理成可以直接替換的寫法…",
];

function LoadingPanel({ fileName, jobLabel }: { fileName: string; jobLabel: string }) {
  const [tip, setTip] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => s + 1);
      setTip((i) => (i + 1) % (TIPS.length * 4));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="animate-rise flex flex-col items-center py-10 text-center" aria-live="polite">
      {/* 正在被掃描的紙 */}
      <div className="relative h-56 w-44 overflow-hidden rounded-xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(60,40,10,0.4)]">
        <div className="ruled absolute inset-0" />
        <div className="space-y-3 p-5">
          <div className="h-3 w-1/2 rounded bg-ink/80" />
          <div className="h-2 w-1/3 rounded bg-line" />
          {[90, 75, 85, 60, 80, 70, 88].map((w, i) => (
            <div key={i} className="h-2 rounded bg-line" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="animate-scan absolute inset-x-0 h-10 -translate-y-1/2 bg-gradient-to-b from-transparent via-pen/25 to-transparent">
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-pen" />
        </div>
      </div>

      <h2 className="mt-10 font-serif text-2xl font-black">紅筆批改中</h2>
      <p key={Math.floor(tip / 4)} className="animate-rise mt-3 min-h-6 text-muted">
        {TIPS[Math.floor(tip / 4)]}
      </p>
      <p className="mt-6 max-w-full truncate text-xs text-muted">
        {fileName}・{jobLabel}・已經過 {seconds} 秒
      </p>
      <p className="mt-2 text-xs text-muted">通常需要 30 秒到 1 分鐘，請不要關閉頁面。</p>
    </div>
  );
}
