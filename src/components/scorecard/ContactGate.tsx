"use client";

import { useState, type FormEvent } from "react";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { CONSENT_MICROCOPY } from "@/lib/site-content";
import type { ScorecardPath } from "@/lib/scoring/types";

interface ContactGateProps {
  path: ScorecardPath;
  onSubmit: (values: ContactFormValues) => void;
  onBack: () => void;
  onClose: () => void;
}

type FormState = {
  firstName: string;
  email: string;
  whatsappNumber: string;
  goal: string;
  consent: boolean;
};

const INITIAL_STATE: FormState = {
  firstName: "",
  email: "",
  whatsappNumber: "",
  goal: "",
  consent: false,
};

export function ContactGate({ path, onSubmit, onBack, onClose }: ContactGateProps) {
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = contactSchema.safeParse({
      ...values,
      goal: values.goal || undefined,
      consent: values.consent,
    });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  }

  const revealLabel = path === "financial" ? "Reveal My Financial R.I.S.E. Result" : "Reveal My Career R.I.S.E. Result";

  return (
    <div className="mx-auto flex h-full max-w-lg flex-col px-4 py-10">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Back
        </button>
        <button type="button" onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">
          Close
        </button>
      </div>

      <h2 className="mt-6 text-2xl font-bold sm:text-3xl">Almost there — where should we send your result?</h2>

      <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-1 flex-col gap-4">
        <div>
          <label htmlFor="firstName" className="text-sm font-medium">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            value={values.firstName}
            onChange={(e) => setValues((v) => ({ ...v, firstName: e.target.value }))}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-3 text-base"
          />
          {errors.firstName ? (
            <p id="firstName-error" className="mt-1 text-sm text-destructive">
              {errors.firstName}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-3 text-base"
          />
          {errors.email ? (
            <p id="email-error" className="mt-1 text-sm text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="whatsappNumber" className="text-sm font-medium">
            WhatsApp number
          </label>
          <input
            id="whatsappNumber"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+60123456789"
            value={values.whatsappNumber}
            onChange={(e) => setValues((v) => ({ ...v, whatsappNumber: e.target.value }))}
            aria-invalid={Boolean(errors.whatsappNumber)}
            aria-describedby={errors.whatsappNumber ? "whatsapp-error" : undefined}
            className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-3 text-base"
          />
          {errors.whatsappNumber ? (
            <p id="whatsapp-error" className="mt-1 text-sm text-destructive">
              {errors.whatsappNumber}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="goal" className="text-sm font-medium">
            Your biggest goal for the next 12 months (optional)
          </label>
          <input
            id="goal"
            type="text"
            value={values.goal}
            onChange={(e) => setValues((v) => ({ ...v, goal: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-3 text-base"
          />
        </div>

        <label htmlFor="consent" className="mt-2 flex items-start gap-3 text-sm">
          <input
            id="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => setValues((v) => ({ ...v, consent: e.target.checked }))}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 size-4 shrink-0"
          />
          <span>{CONSENT_MICROCOPY}</span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="text-sm text-destructive">
            {errors.consent}
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        >
          {revealLabel}
        </button>
      </form>
    </div>
  );
}
