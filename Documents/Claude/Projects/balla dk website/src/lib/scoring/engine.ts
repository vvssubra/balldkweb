import {
  CATEGORY_ORDER,
  type Answers,
  type CategoryKey,
  type CategoryResult,
  type ScorecardConfig,
  type ScorecardResult,
  type Tier,
} from "./types";

const MAX_RAW_SCORE_PER_CATEGORY = 9;

function scoreToTier(rawScore: number): Tier {
  const normalisedScore = Math.round((rawScore / MAX_RAW_SCORE_PER_CATEGORY) * 100);
  if (normalisedScore <= 33) return "needs-attention";
  if (normalisedScore <= 66) return "developing";
  return "strong";
}

export function calculateCategoryResults(
  config: ScorecardConfig,
  answers: Answers
): readonly CategoryResult[] {
  return config.categories.map(({ key }) => {
    const categoryQuestions = config.questions.filter((q) => q.category === key);
    const rawScore = categoryQuestions.reduce((sum, question) => sum + (answers[question.id] ?? 0), 0);
    const normalisedScore = Math.round((rawScore / MAX_RAW_SCORE_PER_CATEGORY) * 100);

    return {
      category: key,
      rawScore,
      normalisedScore,
      tier: scoreToTier(rawScore),
    };
  });
}

export function determineMissingLetter(
  categoryResults: readonly CategoryResult[],
  tieBreakCategory?: CategoryKey
): CategoryKey {
  const lowestScore = Math.min(...categoryResults.map((r) => r.normalisedScore));
  const tied = categoryResults.filter((r) => r.normalisedScore === lowestScore);

  if (tied.length === 1) {
    return tied[0].category;
  }

  const tieBreakMatch = tieBreakCategory && tied.find((r) => r.category === tieBreakCategory);
  if (tieBreakMatch) {
    return tieBreakMatch.category;
  }

  const tiedKeys = new Set(tied.map((r) => r.category));
  const byPriority = CATEGORY_ORDER.find((key) => tiedKeys.has(key));
  return byPriority ?? tied[0].category;
}

export function scoreScorecard(
  config: ScorecardConfig,
  answers: Answers,
  tieBreakCategory?: CategoryKey
): ScorecardResult {
  const categoryResults = calculateCategoryResults(config, answers);
  const missingLetter = determineMissingLetter(categoryResults, tieBreakCategory);

  return { categoryResults, missingLetter };
}
