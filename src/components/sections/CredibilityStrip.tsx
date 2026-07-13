const STATS: readonly { label: string; value: string }[] = [
  { label: "Years of industry experience", value: "[INSERT VERIFIED YEARS]" },
  { label: "Clients served", value: "[INSERT VERIFIED COUNT]" },
  { label: "Active agents", value: "[INSERT VERIFIED COUNT]" },
  { label: "Areas served", value: "[INSERT VERIFIED AREAS]" },
];

export function CredibilityStrip() {
  return (
    <div className="border-y border-white/10 bg-navy px-4 py-8 sm:px-6">
      <dl className="mx-auto grid max-w-4xl grid-cols-2 gap-6 text-center text-white sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <dt className="text-xs uppercase tracking-wide text-white/50">{stat.label}</dt>
            <dd className="mt-1 font-heading text-lg font-bold text-gold">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
