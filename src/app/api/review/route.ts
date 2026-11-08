import OpenAI from "openai";
import { findJobType } from "@/lib/jobTypes";
import { reviewResume } from "@/lib/reviewResume";
import { MAX_PDF_BYTES } from "@/lib/upload";

export const maxDuration = 120; // AI 讀整份 PDF 需要一點時間


function fail(status: number, error: string) {
  return Response.json({ error }, { status });
}

export async function POST(req: Request) {
  // 金鑰只在這次請求的記憶體中使用：不寫 DB、不寫 log、不回傳
  const apiKey = req.headers.get("x-openai-key")?.trim();
  if (!apiKey) return fail(401, "請先輸入你的 OpenAI API Key");

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail(400, "上傳格式錯誤");
  }

  const file = form.get("file");
  const job = findJobType(form.get("jobType"));
  if (!(file instanceof File)) return fail(400, "請上傳履歷 PDF");
  if (!job) return fail(400, "請選擇職缺類型");
  if (file.size === 0) return fail(400, "檔案是空的");
  if (file.size > MAX_PDF_BYTES) return fail(413, "檔案太大，請小於 4MB");

  const pdf = Buffer.from(await file.arrayBuffer());
  if (pdf.subarray(0, 5).toString("latin1") !== "%PDF-") {
    return fail(400, "只接受 PDF 檔");
  }

  try {
    const review = await reviewResume({ apiKey, pdf, filename: file.name, jobLabel: job.label });
    return Response.json({ review, jobType: job.id });
  } catch (err) {
    // 不直接把 OpenAI 的錯誤訊息丟回去（可能含部分金鑰），轉成友善訊息
    if (err instanceof OpenAI.APIError) {
      console.error("OpenAI error", err.status, err.code);
      if (err.status === 401) return fail(401, "API Key 無效，請確認後重新輸入");
      if (err.status === 429)
        return fail(429, err.code === "insufficient_quota" ? "這把金鑰的額度用完了，請到 OpenAI 儲值" : "請求太頻繁，請稍後再試");
      if (err.status === 400) return fail(400, "OpenAI 無法讀取這份 PDF，請換一個檔案試試");
      return fail(502, "OpenAI 服務暫時有問題，請稍後再試");
    }
    console.error("review failed", err instanceof Error ? err.message : err);
    return fail(500, "分析失敗，請稍後再試");
  }
}
