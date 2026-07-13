import { describe, expect, it } from "vitest";
import { calculateCategoryResults, determineMissingLetter, scoreScorecard } from "./engine";
import type { Answers, CategoryResult } from "./types";
import { financialHealthConfig } from "./financial-health-config";

describe("calculateCategoryResults", () => {
  it("computes raw and normalised score per category from 3 questions each", () => {
    const answers: Answers = {
      "fin-r-1": 3,
      "fin-r-2": 3,
      "fin-r-3": 3,
      "fin-i-1": 0,
      "fin-i-2": 0,
      "fin-i-3": 0,
      "fin-s-1": 1,
      "fin-s-2": 1,
      "fin-s-3": 1,
      "fin-e-1": 2,
      "fin-e-2": 2,
      "fin-e-3": 2,
    };

    const results = calculateCategoryResults(financialHealthConfig, answers);

    const byCategory = Object.fromEntries(results.map((r) => [r.category, r]));

    expect(byCategory.R.rawScore).toBe(9);
    expect(byCategory.R.normalisedScore).toBe(100);
    expect(byCategory.I.rawScore).toBe(0);
    expect(byCategory.I.normalisedScore).toBe(0);
    expect(byCategory.S.rawScore).toBe(3);
    expect(byCategory.S.normalisedScore).toBe(33);
    expect(byCategory.E.rawScore).toBe(6);
    expect(byCategory.E.normalisedScore).toBe(67);
  });

  it("treats unanswered questions as 0", () => {
    const results = calculateCategoryResults(financialHealthConfig, {});
    expect(results.every((r) => r.rawScore === 0)).toBe(true);
  });

  it.each([
    [0, "needs-attention"],
    [3, "needs-attention"],
    [4, "developing"],
    [5, "developing"],
    [6, "strong"],
    [9, "strong"],
  ] as const)("raw category score %i maps to tier %s", (rawScore, expectedTier) => {
    const answers: Answers = {
      "fin-r-1": Math.min(3, rawScore) as 0 | 1 | 2 | 3,
      "fin-r-2": Math.min(3, Math.max(0, rawScore - 3)) as 0 | 1 | 2 | 3,
      "fin-r-3": Math.min(3, Math.max(0, rawScore - 6)) as 0 | 1 | 2 | 3,
    };

    const results = calculateCategoryResults(financialHealthConfig, answers);
    const restore = results.find((r) => r.category === "R");

    expect(restore?.rawScore).toBe(rawScore);
    expect(restore?.tier).toBe(expectedTier);
  });
});

describe("determineMissingLetter", () => {
  it("returns the category with the lowest normalised score", () => {
    const categoryResults: CategoryResult[] = [
      { category: "R", rawScore: 9, normalisedScore: 100, tier: "strong" },
      { category: "I", rawScore: 3, normalisedScore: 33, tier: "needs-attention" },
      { category: "S", rawScore: 6, normalisedScore: 67, tier: "strong" },
      { category: "E", rawScore: 9, normalisedScore: 100, tier: "strong" },
    ];

    expect(determineMissingLetter(categoryResults)).toBe("I");
  });

  it("breaks ties using R > I > S > E priority order when no tie-break category given", () => {
    const categoryResults: CategoryResult[] = [
      { category: "R", rawScore: 3, normalisedScore: 33, tier: "needs-attention" },
      { category: "I", rawScore: 3, normalisedScore: 33, tier: "needs-attention" },
      { category: "S", rawScore: 9, normalisedScore: 100, tier: "strong" },
      { category: "E", rawScore: 9, normalisedScore: 100, tier: "strong" },
    ];

    expect(determineMissingLetter(categoryResults)).toBe("R");
  });

  it("uses the supplied tie-break category when it is among the tied lowest", () => {
    const categoryResults: CategoryResult[] = [
      { category: "R", rawScore: 3, normalisedScore: 33, tier: "needs-attention" },
      { category: "I", rawScore: 3, normalisedScore: 33, tier: "needs-attention" },
      { category: "S", rawScore: 9, normalisedScore: 100, tier: "strong" },
      { category: "E", rawScore: 9, normalisedScore: 100, tier: "strong" },
    ];

    expect(determineMissingLetter(categoryResults, "I")).toBe("I");
  });

  it("ignores a tie-break category that is not among the tied lowest", () => {
    const categoryResults: CategoryResult[] = [
      { category: "R", rawScore: 3, normalisedScore: 33, tier: "needs-attention" },
      { category: "I", rawScore: 3, normalisedScore: 33, tier: "needs-attention" },
      { category: "S", rawScore: 9, normalisedScore: 100, tier: "strong" },
      { category: "E", rawScore: 9, normalisedScore: 100, tier: "strong" },
    ];

    expect(determineMissingLetter(categoryResults, "E")).toBe("R");
  });
});

describe("scoreScorecard", () => {
  it("combines category results and missing letter into a single result", () => {
    const answers: Answers = {
      "fin-r-1": 0,
      "fin-r-2": 0,
      "fin-r-3": 0,
      "fin-i-1": 3,
      "fin-i-2": 3,
      "fin-i-3": 3,
      "fin-s-1": 3,
      "fin-s-2": 3,
      "fin-s-3": 3,
      "fin-e-1": 3,
      "fin-e-2": 3,
      "fin-e-3": 3,
    };

    const result = scoreScorecard(financialHealthConfig, answers);

    expect(result.categoryResults).toHaveLength(4);
    expect(result.missingLetter).toBe("R");
  });
});
