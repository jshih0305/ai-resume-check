import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Logo />
        <p>AI 建議僅供參考，最後的判斷權在你手上。</p>
        <p>© 履歷紅筆</p>
      </div>
    </footer>
  );
}
