import { CAREER_DISCLAIMER, FINANCIAL_DISCLAIMER } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary px-4 py-10 text-sm text-muted-foreground sm:px-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <p>
          <strong className="text-foreground">Financial disclaimer:</strong> {FINANCIAL_DISCLAIMER}
        </p>
        <p>
          <strong className="text-foreground">Career disclaimer:</strong> {CAREER_DISCLAIMER}
        </p>
        <p>
          Your information is kept private and used only to provide your result and relevant follow-up.
          You can unsubscribe at any time.
        </p>
        <p className="pt-2 text-xs">© {new Date().getFullYear()} Balla DK. All rights reserved.</p>
      </div>
    </footer>
  );
}
