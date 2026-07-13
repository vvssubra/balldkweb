import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  whatsappNumber: z
    .string()
    .trim()
    .min(8, "Enter a valid WhatsApp number")
    .regex(/^[0-9+\s-]+$/, "Use digits only, e.g. +60123456789"),
  goal: z.string().trim().max(200).optional(),
  consent: z.literal(true, {
    message: "Please confirm consent to continue",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
