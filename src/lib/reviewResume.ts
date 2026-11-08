import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { resumeReviewSchema, SECTIONS, type ResumeReview } from "@/lib/reviewSchema";

export const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.5";

const sectionGuide = SECTIONS.map((s) => `- ${s.key}（${s.label}）：${s.hint}`).join("\n");

const INSTRUCTIONS = `你是一位在台灣有多年經驗的資深招募顧問與履歷教練。
使用者會上傳一份履歷 PDF 並指定想投遞的職缺類型，請從該職缺招募方的角度審閱，給出具體可執行的優化建議。

建議分成以下五個面向（sections），每個面向給 0~5 條，沒有問題就給空陣列，不要硬湊：
${sectionGuide}

每一條建議都必須：
1. quote：從履歷中「逐字」複製原句或原片段（保留原本語言與標點，不可改寫、翻譯或摘要）。若問題是「缺少某內容」而無原句可引，引用最相關的段落標題或句子。
2. problem：說明這句的問題與為什麼扣分。
3. suggestion：給出具體改法，盡量附上可直接替換的改寫範例。
4. severity：high / medium / low。

同一句話不要在多個面向重複出現。依 severity 由高到低排序。
一律使用繁體中文回答（quote 例外，維持原文）。
若檔案不是履歷，isResume 設為 false，在 summary 說明，score 設為 0，其他陣列留空。`;

export async function reviewResume(params: {
  apiKey: string;
  pdf: Buffer;
  filename: string;
  jobLabel: string;
}): Promise<ResumeReview> {
  // 每次請求用使用者自己的金鑰建立 client，不存、不記錄
  const openai = new OpenAI({ apiKey: params.apiKey });

  const response = await openai.responses.parse({
    model: OPENAI_MODEL,
    instructions: INSTRUCTIONS,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_file",
            filename: params.filename,
            file_data: `data:application/pdf;base64,${params.pdf.toString("base64")}`,
          },
          { type: "input_text", text: `目標職缺類型：${params.jobLabel}\n請審閱這份履歷。` },
        ],
      },
    ],
    text: { format: zodTextFormat(resumeReviewSchema, "resume_review") },
  });

  if (!response.output_parsed) {
    throw new Error("AI 沒有回傳有效的分析結果");
  }
  return response.output_parsed;
}
