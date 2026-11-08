/** 職缺類型：前端下拉選單與 API 驗證共用 */
export const JOB_TYPES = [
  { id: "software-engineer", label: "軟體工程師" },
  { id: "frontend", label: "前端工程師" },
  { id: "backend", label: "後端工程師" },
  { id: "data", label: "資料分析 / 資料科學" },
  { id: "product-manager", label: "產品經理" },
  { id: "designer", label: "UI / UX 設計師" },
  { id: "marketing", label: "行銷企劃" },
  { id: "sales", label: "業務" },
  { id: "hr", label: "人資" },
  { id: "finance", label: "財務 / 會計" },
  { id: "other", label: "其他 / 通用" },
] as const;

export type JobTypeId = (typeof JOB_TYPES)[number]["id"];

export function findJobType(id: unknown) {
  return JOB_TYPES.find((j) => j.id === id);
}
