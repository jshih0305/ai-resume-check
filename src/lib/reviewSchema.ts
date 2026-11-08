import { z } from "zod";

/**
 * AI 回傳的固定結構。前端照這個渲染，改這裡就要一起改 ResumeReport。
 *
 * {
 *   isResume, summary, score, strengths[],
 *   sections: {
 *     jobFit | impact | wording | structure | skills: [
 *       { quote, problem, suggestion, severity }
 *     ]
 *   }
 * }
 */

export const SEVERITIES = ["high", "medium", "low"] as const;

export const suggestionSchema = z.object({
  quote: z.string().describe("履歷中的原句，必須逐字引用，不可改寫或摘要"),
  problem: z.string().describe("這句話的問題是什麼、為什麼會扣分"),
  suggestion: z.string().describe("具體的改法，盡量直接給出可替換的改寫範例句"),
  severity: z.enum(SEVERITIES).describe("影響程度：high 嚴重、medium 中等、low 小細節"),
});

/** 面向固定 5 個，順序就是前端顯示的順序 */
export const SECTIONS = [
  { key: "jobFit", label: "職缺匹配度", hint: "內容是否對準目標職缺需要的經驗與能力" },
  { key: "impact", label: "成果與量化", hint: "是否寫出具體成果、數字、影響力，而不只是職責" },
  { key: "wording", label: "用詞與表達", hint: "動詞是否有力、句子是否精簡、有無錯字或口語" },
  { key: "skills", label: "技能與關鍵字", hint: "技能是否完整、有無職缺常見關鍵字（ATS）" },
  { key: "structure", label: "結構與排版", hint: "段落順序、資訊層次、長度、一致性" },
] as const;

export type SectionKey = (typeof SECTIONS)[number]["key"];

const sectionArray = z.array(suggestionSchema);

export const resumeReviewSchema = z.object({
  isResume: z.boolean().describe("上傳的檔案是否為履歷"),
  summary: z.string().describe("2~3 句整體評語"),
  score: z.number().int().min(0).max(100).describe("以目標職缺來看的整體分數 0~100"),
  strengths: z.array(z.string()).describe("履歷做得好的地方，2~4 點"),
  sections: z.object({
    jobFit: sectionArray,
    impact: sectionArray,
    wording: sectionArray,
    skills: sectionArray,
    structure: sectionArray,
  }),
});

export type Suggestion = z.infer<typeof suggestionSchema>;
export type ResumeReview = z.infer<typeof resumeReviewSchema>;
export type Severity = (typeof SEVERITIES)[number];
