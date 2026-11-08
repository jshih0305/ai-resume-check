"use client";

import { useState } from "react";
import { clearApiKey, maskKey, saveApiKey, useApiKey } from "@/lib/apiKeyStore";

export default function ApiKeyInput() {
  const savedKey = useApiKey();
  const [draft, setDraft] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const key = draft.trim();
    if (!key.startsWith("sk-") || key.length < 20) {
      setError("看起來不像 OpenAI API Key，應該是 sk- 開頭的一長串字。");
      return;
    }
    saveApiKey(key);
    setDraft("");
    setShow(false);
    setError("");
  }

  return (
    <div>
      {savedKey === null ? (
        <div className="h-12 animate-pulse rounded-xl bg-surface-2" />
      ) : savedKey ? (
        <div className="flex flex-col gap-3 rounded-xl border border-leaf/30 bg-leaf-soft p-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-leaf text-sm text-white" aria-hidden>
              ✓
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-leaf">金鑰已儲存在這個瀏覽器</p>
              <code className="block truncate font-mono text-xs text-muted">{maskKey(savedKey)}</code>
            </div>
          </div>
          <button
            type="button"
            onClick={clearApiKey}
            className="h-9 shrink-0 rounded-lg border border-line bg-surface px-4 text-sm hover:border-pen hover:text-pen"
          >
            清除 / 更換
          </button>
        </div>
      ) : (
        <form onSubmit={handleSave} className="flex flex-col gap-2 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <input
              type={show ? "text" : "password"}
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                setError("");
              }}
              placeholder="sk-..."
              autoComplete="off"
              spellCheck={false}
              aria-label="OpenAI API Key"
              className="h-12 w-full rounded-xl border border-line bg-paper px-4 pr-16 font-mono text-sm outline-none transition placeholder:text-muted/60 focus:border-ink/50 focus:ring-4 focus:ring-ink/5"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-muted hover:bg-surface-2 hover:text-ink"
            >
              {show ? "隱藏" : "顯示"}
            </button>
          </div>
          <button
            type="submit"
            disabled={!draft.trim()}
            className="h-12 shrink-0 rounded-xl bg-ink px-6 text-sm font-medium text-paper transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-30"
          >
            儲存金鑰
          </button>
        </form>
      )}

      {error && <p className="mt-2 text-sm text-pen">{error}</p>}

      <p className="mt-3 text-xs leading-6 text-muted">
        <span aria-hidden>🔒 </span>
        金鑰只存在你自己的瀏覽器（localStorage），我們的伺服器不會保存它。{" "}
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ink underline decoration-pen decoration-2 underline-offset-4 hover:text-pen"
        >
          到 OpenAI 申請 API Key ↗
        </a>
      </p>
    </div>
  );
}
