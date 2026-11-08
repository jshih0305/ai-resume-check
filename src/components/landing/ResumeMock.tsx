/** 首頁主視覺：一張被紅筆批改過的履歷（純 HTML/CSS，非圖片） */
export default function ResumeMock() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* 後面那張紙 */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-2xl border border-line bg-surface-2" aria-hidden />

      <div className="relative -rotate-1 overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(60,40,10,0.35)]">
        {/* 履歷頁首 */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-4 sm:px-6">
          <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-amber-soft to-pen-soft" />
          <div className="min-w-0">
            <p className="font-serif text-base font-black">王小明</p>
            <p className="truncate text-xs text-muted">前端工程師・3 年經驗</p>
          </div>
          <span className="ml-auto shrink-0 rounded-full border-2 border-pen px-2 py-0.5 font-hand text-sm font-bold text-pen -rotate-6">
            72 分
          </span>
        </div>

        <div className="ruled space-y-0 px-5 py-4 text-[13px] leading-8 sm:px-6 sm:text-sm">
          <p className="font-semibold text-muted">工作經歷</p>

          <p>
            ・<span className="pen-underline">負責公司官網的維護</span>
          </p>
          <p className="animate-write pl-3 font-hand text-[15px] leading-6 text-pen [animation-delay:600ms]">
            ↳ 寫成果！例：主導官網改版，首頁載入速度提升 40%
          </p>

          <p>・使用 React、TypeScript 開發新功能</p>

          <p>
            ・<span className="hl">與設計師合作</span>完成後台系統
          </p>
          <p className="animate-write pl-3 font-hand text-[15px] leading-6 text-leaf [animation-delay:1100ms]">
            ✓ 很好，再補上使用人數會更有力
          </p>

          <p className="font-semibold text-muted">技能</p>
          <p className="text-muted">
            Office、<span className="line-through decoration-pen decoration-2">會打字</span>、溝通能力
          </p>
        </div>
      </div>

      {/* 浮動標籤 */}
      <div className="absolute -left-2 top-24 hidden -rotate-6 rounded-xl border border-line bg-surface px-3 py-2 text-xs shadow-lg sm:-left-10 sm:block">
        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-pen" /> 成果與量化
      </div>
      <div className="absolute -right-2 bottom-10 hidden rotate-3 rounded-xl border border-line bg-surface px-3 py-2 text-xs shadow-lg sm:-right-8 sm:block">
        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-amber" /> 技能與關鍵字
      </div>
    </div>
  );
}
