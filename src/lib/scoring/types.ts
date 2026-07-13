export type ScoreValue = 0 | 1 | 2 | 3;

export type ScorecardPath = "financial" | "career";

export type CategoryKey = "R" | "I" | "S" | "E";

export type Tier = "needs-attention" | "developing" | "strong";

export interface AnswerOption {
  label: string;
  score: ScoreValue;
}

export interface Question {
  id: string;
  category: CategoryKey;
  text: string;
  options: readonly AnswerOption[];
}

export interface CategoryDefinition {
  key: CategoryKey;
  label: string;
}

export interface ScorecardConfig {
  path: ScorecardPath;
  categories: readonly CategoryDefinition[];
  questions: readonly Question[];
}

export type Answers = Readonly<Record<string, ScoreValue>>;

export interface CategoryResult {
  category: CategoryKey;
  rawScore: number;
  normalisedScore: number;
  tier: Tier;
}

export interface ScorecardResult {
  categoryResults: readonly CategoryResult[];
  missingLetter: CategoryKey;
}

export const CATEGORY_ORDER: readonly CategoryKey[] = ["R", "I", "S", "E"];
