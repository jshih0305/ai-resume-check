"use client";

import { setTheme, useTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  const label = theme === null ? "切換深淺色" : theme === "dark" ? "切換為淺色模式" : "切換為深色模式";

  return (
    <button
      type="button"
      onClick={() => theme && setTheme(next)}
      aria-label={label}
      title={label}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition hover:border-ink/40 hover:text-ink"
    >
      {/* 太陽：深色模式時顯示（點了變淺色） */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* 月亮：淺色模式時顯示（點了變深色） */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
      </svg>
    </button>
  );
}
