"use client";

import { useSyncExternalStore } from "react";

export const API_KEY_STORAGE_KEY = "ai-resume-check:openai-api-key";
const CHANGE_EVENT = "ai-resume-check:api-key-change";

function read(): string {
  try {
    return localStorage.getItem(API_KEY_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback); // 其他分頁變更
  window.addEventListener(CHANGE_EVENT, callback); // 同一分頁變更
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export function saveApiKey(key: string) {
  try {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function clearApiKey() {
  try {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** 回傳 null 代表還在伺服器端渲染 / 尚未讀到 localStorage */
export function useApiKey(): string | null {
  return useSyncExternalStore<string | null>(subscribe, read, () => null);
}

export function maskKey(key: string) {
  if (key.length <= 10) return "•".repeat(key.length);
  return `${key.slice(0, 5)}••••••••${key.slice(-4)}`;
}
