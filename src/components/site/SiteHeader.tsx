import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader({ showCta = true }: { showCta?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-1.5 text-sm sm:gap-2">
          <ThemeToggle />
          {showCta ? (
            <>
              <Link href="/#how" className="hidden rounded-full px-3 py-2 text-muted hover:text-ink sm:inline-block">
                如何運作
              </Link>
              <Link href="/#privacy" className="hidden rounded-full px-3 py-2 text-muted hover:text-ink sm:inline-block">
                隱私
              </Link>
              <Link
                href="/check"
                className="rounded-full bg-ink px-4 py-2 font-medium text-paper transition hover:bg-pen"
              >
                開始健檢
              </Link>
            </>
          ) : (
            <Link href="/" className="rounded-full px-3 py-2 text-muted hover:text-ink">
              ← 回首頁
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
