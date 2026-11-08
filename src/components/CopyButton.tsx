"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 rounded-md px-2 py-1 text-xs text-leaf transition hover:bg-leaf/10"
      aria-label="複製改法"
    >
      {copied ? "已複製 ✓" : "複製"}
    </button>
  );
}
