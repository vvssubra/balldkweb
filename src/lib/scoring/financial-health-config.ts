import type { ScorecardConfig } from "./types";

const SCALE = [
  { label: "Not in place", score: 0 },
  { label: "Starting", score: 1 },
  { label: "Mostly in place", score: 2 },
  { label: "Strong and reviewed", score: 3 },
] as const;

export const financialHealthConfig: ScorecardConfig = {
  path: "financial",
  categories: [
    { key: "R", label: "Restore" },
    { key: "I", label: "Income" },
    { key: "S", label: "Sustain" },
    { key: "E", label: "Empire" },
  ],
  questions: [
    { id: "fin-r-1", category: "R", text: "Emergency savings can cover essential expenses.", options: SCALE },
    { id: "fin-r-2", category: "R", text: "Protection needs are understood and recently reviewed.", options: SCALE },
    { id: "fin-r-3", category: "R", text: "High-interest debt and monthly cashflow have a clear plan.", options: SCALE },

    { id: "fin-i-1", category: "I", text: "Income has a realistic growth plan.", options: SCALE },
    { id: "fin-i-2", category: "I", text: "There is a backup or second-income strategy.", options: SCALE },
    { id: "fin-i-3", category: "I", text: "Skills are being developed to increase earning capacity.", options: SCALE },

    { id: "fin-s-1", category: "S", text: "Saving or investing happens consistently.", options: SCALE },
    { id: "fin-s-2", category: "S", text: "Investments match goals, time horizon and risk comfort.", options: SCALE },
    { id: "fin-s-3", category: "S", text: "Progress is reviewed at least every six months.", options: SCALE },

    { id: "fin-e-1", category: "E", text: "Nominees, will or estate arrangements are understood.", options: SCALE },
    { id: "fin-e-2", category: "E", text: "Family can locate key financial information.", options: SCALE },
    { id: "fin-e-3", category: "E", text: "A long-term legacy, leadership or continuity plan exists.", options: SCALE },
  ],
};
