import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

const VALID = {
  firstName: "Farah",
  email: "farah@example.com",
  whatsappNumber: "+60123456789",
  consent: true as const,
};

describe("contactSchema", () => {
  it("accepts a valid submission without a goal", () => {
    const result = contactSchema.safeParse(VALID);
    expect(result.success).toBe(true);
  });

  it("accepts a valid submission with a goal", () => {
    const result = contactSchema.safeParse({ ...VALID, goal: "Grow my income" });
    expect(result.success).toBe(true);
  });

  it.each([
    ["missing first name", { ...VALID, firstName: "" }, "firstName"],
    ["invalid email", { ...VALID, email: "not-an-email" }, "email"],
    ["whatsapp number too short", { ...VALID, whatsappNumber: "123" }, "whatsappNumber"],
    ["whatsapp number with letters", { ...VALID, whatsappNumber: "abc123456" }, "whatsappNumber"],
    ["consent not checked", { ...VALID, consent: false }, "consent"],
  ])("rejects %s", (_label, input, expectedField) => {
    const result = contactSchema.safeParse(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path[0] === expectedField)).toBe(true);
    }
  });
});
