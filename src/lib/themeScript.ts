/** 伺服器（layout）和客戶端共用，不能放在 "use client" 檔案裡 */
export const THEME_STORAGE_KEY = "ai-resume-check:theme";

/**
 * 放在 <head> 的 inline script：在畫面繪製前套用使用者選過的主題，避免閃一下錯的顏色。
 * 沒選過就不設 data-theme，交給 CSS 的 prefers-color-scheme（跟隨系統）。
 */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
