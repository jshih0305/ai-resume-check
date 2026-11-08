import Link from "next/link";
import ResumeMock from "@/components/landing/ResumeMock";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { JOB_TYPES } from "@/lib/jobTypes";
import { SECTIONS } from "@/lib/reviewSchema";

const STEPS = [
  { title: "貼上你的金鑰", body: "使用你自己的 OpenAI API Key，只存在你的瀏覽器，下次回來不用重貼。" },
  { title: "上傳履歷、選職缺", body: "上傳 PDF，選擇你想投遞的職缺類型，AI 會用那個職位的標準來看。" },
  { title: "拿到逐句批改", body: "每一條建議都引用你的原句、說清楚問題，並直接給出可以替換的寫法。" },
];

const FAQ = [
  {
    q: "要付費嗎？",
    a: "本服務不收費。分析時會用你自己的 OpenAI API Key 呼叫模型，費用由 OpenAI 依用量向你的帳戶收取，單份履歷的花費通常很低（依模型與頁數而定）。",
  },
  {
    q: "你們會保存我的履歷或金鑰嗎？",
    a: "不會。金鑰只存在你的瀏覽器；履歷只在分析當下傳給 OpenAI，我們的伺服器不寫入資料庫、也不記錄。",
  },
  { q: "支援哪些檔案？", a: "目前支援 PDF，大小 4MB 以內。AI 會直接讀整份 PDF，包含排版。" },
  { q: "分析要多久？", a: "通常 30 秒到 1 分鐘，視履歷長度而定。" },
];

const SECTION_ICONS = ["◎", "↗", "✎", "⌘", "▤"];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="grain relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-28">
            <div className="animate-rise">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-pen" />
                AI 履歷健檢・BYOK 自備金鑰
              </p>
              <h1 className="mt-6 font-serif text-[2.6rem] font-black leading-[1.15] tracking-tight sm:text-6xl">
                讓 AI 當你的
                <br />
                <span className="relative inline-block text-pen">
                  履歷紅筆老師
                  <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden className="absolute -bottom-2 left-0 h-3 w-full">
                    <path d="M2 9 C 80 2, 180 2, 298 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-muted sm:text-lg">
                不只告訴你「寫得不夠好」。它會<span className="hl text-ink">逐句引用你的履歷原文</span>
                ，指出問題、說明原因，再直接給你可以替換的寫法。
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/check"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-pen px-7 font-medium text-white shadow-[0_10px_30px_-10px_var(--pen)] transition hover:brightness-110"
                >
                  免費開始健檢
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <a
                  href="#how"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-surface px-7 font-medium hover:border-ink/40"
                >
                  看看怎麼運作
                </a>
              </div>
              <p className="mt-6 text-sm text-muted">🔒 不註冊、不保存履歷、金鑰只留在你的瀏覽器</p>
            </div>

            <div className="animate-rise [animation-delay:150ms]">
              <ResumeMock />
            </div>
          </div>
        </section>

        {/* ── 五大面向 ── */}
        <section className="border-y border-line/70 bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <SectionTitle kicker="五大面向" title="從招募方的眼睛，看你的履歷" />
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
              {SECTIONS.map((s, i) => (
                <div key={s.key} className="bg-surface p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    <span className="text-xl text-pen" aria-hidden>
                      {SECTION_ICONS[i]}
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-black">{s.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{s.hint}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 一條建議長什麼樣 ── */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle kicker="建議長這樣" title="每一條，都有憑有據" align="left" />
              <p className="mt-6 leading-8 text-muted">
                AI 一定會先引用你履歷裡的那句話，再告訴你哪裡不好、為什麼，最後給出改寫範例。不講空泛的「建議加強表達」，你看完就能直接改。
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                {["引用原句：知道在說哪一行", "講問題：為什麼會被扣分", "給改法：可以直接複製替換"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-xs text-leaf">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <article className="rounded-2xl border border-line bg-surface p-5 shadow-[0_20px_50px_-30px_rgba(60,40,10,0.35)] sm:p-7">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-pen-soft px-2.5 py-0.5 text-xs font-medium text-pen">重要</span>
                <span className="text-xs text-muted">成果與量化</span>
              </div>
              <p className="mt-5 text-xs font-medium tracking-widest text-muted">原句</p>
              <blockquote className="mt-2 border-l-2 border-pen pl-3 leading-7">
                <span className="hl">負責公司官網的維護與更新</span>
              </blockquote>
              <p className="mt-5 text-xs font-medium tracking-widest text-pen">問題</p>
              <p className="mt-1 text-sm leading-7 text-muted">只寫了職責，沒有成果。招募方看不出你做得好不好，和其他人也沒有區別。</p>
              <div className="mt-5 rounded-xl bg-leaf-soft p-4">
                <p className="text-xs font-medium tracking-widest text-leaf">改法</p>
                <p className="mt-1 text-sm leading-7">
                  主導公司官網改版，導入圖片延遲載入與程式碼分割，首頁載入時間從 4.2 秒降至 2.5 秒（-40%）。
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ── 如何運作 ── */}
        <section id="how" className="scroll-mt-16 border-y border-line/70 bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <SectionTitle kicker="三個步驟" title="一分鐘拿到完整批改" />
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative rounded-2xl border border-line bg-paper p-6">
                  <span className="font-serif text-5xl font-black text-pen/25">{i + 1}</span>
                  <h3 className="mt-2 font-serif text-xl font-black">{s.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {JOB_TYPES.map((j) => (
                <span key={j.id} className="rounded-full border border-line bg-paper px-3 py-1 text-xs text-muted">
                  {j.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 隱私 ── */}
        <section id="privacy" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:py-28">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1c1a16] px-6 py-12 text-[#f5f0e6] sm:px-12 sm:py-16">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-pen/30 blur-3xl" aria-hidden />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <p className="text-sm font-medium tracking-widest text-pen">BRING YOUR OWN KEY</p>
                <h2 className="mt-3 font-serif text-3xl font-black leading-tight sm:text-4xl">你的金鑰，你作主。</h2>
                <p className="mt-5 leading-8 opacity-75">
                  我們不用帳號、不收費，也不保存任何東西。分析時用的是你自己的 OpenAI API Key，花多少、用多少，都在你的 OpenAI 帳戶裡看得一清二楚。
                </p>
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium underline decoration-pen decoration-2 underline-offset-4 hover:text-pen"
                >
                  還沒有金鑰？到 OpenAI 申請 ↗
                </a>
              </div>
              <ul className="space-y-4 text-sm">
                {[
                  ["金鑰", "只存在你瀏覽器的 localStorage"],
                  ["履歷", "分析當下傳給 OpenAI，不寫入資料庫"],
                  ["帳號", "不需要註冊或登入"],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                    <span className="font-serif font-black text-pen">{k}</span>
                    <span className="opacity-80">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
          <SectionTitle kicker="常見問題" title="你可能想問" />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="shrink-0 text-xl text-muted transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── 最後 CTA ── */}
        <section className="grain border-t border-line/70">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
            <h2 className="font-serif text-3xl font-black leading-tight sm:text-5xl">
              下一份履歷，
              <span className="hl">先讓紅筆看過</span>。
            </h2>
            <Link
              href="/check"
              className="group mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-pen px-8 font-medium text-white shadow-[0_10px_30px_-10px_var(--pen)] transition hover:brightness-110"
            >
              開始健檢
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function SectionTitle({ kicker, title, align = "center" }: { kicker: string; title: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="font-hand text-lg text-pen">{kicker}</p>
      <h2 className="mt-2 font-serif text-3xl font-black leading-tight tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}
