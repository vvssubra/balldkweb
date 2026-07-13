import { OUTCOME_ROWS } from "@/lib/site-content";

export function OutcomeTransformation() {
  return (
    <section className="bg-secondary px-4 py-20 sm:px-6" aria-labelledby="outcome-heading">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="outcome-heading" className="text-3xl font-bold sm:text-4xl">
            What Changes When You Follow the Right Sequence?
          </h2>
        </div>

        <div className="rise-card mt-10 overflow-x-auto rounded-2xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="px-6 py-4 font-semibold text-muted-foreground">
                  Before R.I.S.E.
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-foreground">
                  After R.I.S.E.
                </th>
              </tr>
            </thead>
            <tbody>
              {OUTCOME_ROWS.map((row) => (
                <tr key={row.before} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 text-muted-foreground">{row.before}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Imagine knowing exactly which financial step deserves your attention first — and what to do next.
        </p>
      </div>
    </section>
  );
}
