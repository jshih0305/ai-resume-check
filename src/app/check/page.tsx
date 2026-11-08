import type { Metadata } from "next";
import ResumeChecker from "@/components/ResumeChecker";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "開始健檢",
};

export default function CheckPage() {
  return (
    <>
      <SiteHeader showCta={false} />
      <main className="grain flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <ResumeChecker />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
