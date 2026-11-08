import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, LXGW_WenKai_TC, Noto_Serif_TC } from "next/font/google";
import { THEME_INIT_SCRIPT } from "@/lib/themeScript";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 標題用的中文襯線字
const serifTC = Noto_Serif_TC({
  variable: "--font-serif-tc",
  weight: ["600", "900"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

// 「紅筆批註」用的手寫感字體
const handTC = LXGW_WenKai_TC({
  variable: "--font-hand-tc",
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "履歷紅筆｜AI 逐句批改你的履歷",
    template: "%s｜履歷紅筆",
  },
  description: "上傳履歷 PDF、選擇目標職缺，AI 會引用你的原句、指出問題並給出改法。使用你自己的 OpenAI API Key，我們不保存任何資料。",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e6" },
    { media: "(prefers-color-scheme: dark)", color: "#13110d" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} ${serifTC.variable} ${handTC.variable} h-full antialiased`}
      suppressHydrationWarning // data-theme 由下面的 script 在 hydration 前設定
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
