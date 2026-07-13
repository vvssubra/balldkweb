import { describe, expect, it } from "vitest";
import { buildWhatsAppLink, buildWhatsAppMessage } from "./whatsapp";
import type { CategoryResult } from "./scoring/types";

const CATEGORY_RESULTS: readonly CategoryResult[] = [
  { category: "R", rawScore: 3, normalisedScore: 33, tier: "needs-attention" },
  { category: "I", rawScore: 6, normalisedScore: 67, tier: "strong" },
  { category: "S", rawScore: 5, normalisedScore: 56, tier: "developing" },
  { category: "E", rawScore: 9, normalisedScore: 100, tier: "strong" },
];

describe("buildWhatsAppMessage", () => {
  it("includes name, scorecard type, category scores and missing letter", () => {
    const message = buildWhatsAppMessage({
      firstName: "Farah",
      path: "financial",
      categoryResults: CATEGORY_RESULTS,
      missingLetter: "R",
    });

    expect(message).toContain("Financial Health");
    expect(message).toContain("Farah");
    expect(message).toContain("R: Needs Attention (33%)");
    expect(message).toContain("My priority stage: R");
  });

  it("labels the career path correctly", () => {
    const message = buildWhatsAppMessage({
      firstName: "Daniel",
      path: "career",
      categoryResults: CATEGORY_RESULTS,
      missingLetter: "R",
    });

    expect(message).toContain("Career Growth");
  });

  it("includes the goal line only when a goal is supplied", () => {
    const withGoal = buildWhatsAppMessage({
      firstName: "Farah",
      path: "financial",
      categoryResults: CATEGORY_RESULTS,
      missingLetter: "R",
      goal: "Build an emergency fund",
    });
    const withoutGoal = buildWhatsAppMessage({
      firstName: "Farah",
      path: "financial",
      categoryResults: CATEGORY_RESULTS,
      missingLetter: "R",
    });

    expect(withGoal).toContain("My goal: Build an emergency fund");
    expect(withoutGoal).not.toContain("My goal:");
  });
});

describe("buildWhatsAppLink", () => {
  it.each([
    ["+60 12-345 6789", "60123456789"],
    ["0123456789", "0123456789"],
    ["60123456789", "60123456789"],
  ])("strips non-digit characters from %s", (input, expectedDigits) => {
    const link = buildWhatsAppLink(input, "hello");
    expect(link).toBe(`https://wa.me/${expectedDigits}?text=hello`);
  });

  it("URL-encodes the message", () => {
    const link = buildWhatsAppLink("60123456789", "Hi Balla DK, R: 33%\nName: Farah");
    expect(link).toContain(encodeURIComponent("Hi Balla DK, R: 33%\nName: Farah"));
  });
});
