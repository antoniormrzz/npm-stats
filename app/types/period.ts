export const period = {
  daily: "last-day",
  weekly: "last-week",
  monthly: "last-month",
  yearly: "last-year",
} as const;

export type Period = typeof period[keyof typeof period];