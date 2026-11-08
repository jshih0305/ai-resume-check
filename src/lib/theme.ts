"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./themeScript";

export type Theme = "light" | "dark";

const CHANGE_EVENT = "ai-resume-check:theme-change";

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

/** 目前實際顯示的主題（手動選的優先，否則看系統） */
function read(): Theme {
  const t = document.documentElement.dataset.theme;
  if (t === "light" || t === "dark") return t;
  return media().matches ? "dark" : "light";
}

function subscribe(callback: () => void) {
  const m = media();
  m.addEventListener("change", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    m.removeEventListener("change", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** null = 伺服器端渲染中，還不知道 */
export function useTheme(): Theme | null {
  return useSyncExternalStore<Theme | null>(subscribe, read, () => null);
}
