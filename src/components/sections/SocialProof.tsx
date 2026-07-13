import { SOCIAL_PROOF_PLACEHOLDERS } from "@/lib/site-content";

export function SocialProof() {
  return (
    <section className="bg-secondary px-4 py-20 sm:px-6" aria-labelledby="proof-heading">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="proof-heading" className="text-3xl font-bold sm:text-4xl">
            Client and Agent Stories
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Verified stories will appear here once permission and documentation are confirmed.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {SOCIAL_PROOF_PLACEHOLDERS.map((item, index) => (
            <div key={index} className="rise-card rounded-2xl border-dashed border-gold/40 p-6 text-sm">
              <p className="font-semibold text-foreground">{item.name}</p>
              <p className="mt-2 text-muted-foreground">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
