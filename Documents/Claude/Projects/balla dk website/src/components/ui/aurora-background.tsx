/**
 * Slow-drifting aurora bands over navy, plus a faint grid. Pure CSS, no JS.
 * Reduced-motion users get a static composition via the global animation override.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-navy">
      <div
        className="absolute -inset-[20%] opacity-70 blur-3xl"
        style={{
          background:
            "conic-gradient(from 90deg at 30% 40%, color-mix(in oklch, var(--rise-r) 55%, transparent), transparent 30%, color-mix(in oklch, var(--rise-e) 50%, transparent) 55%, transparent 75%, color-mix(in oklch, var(--rise-r) 45%, transparent))",
          animation: "aurora-drift 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -inset-[20%] opacity-60 blur-3xl"
        style={{
          background:
            "conic-gradient(from 220deg at 70% 60%, color-mix(in oklch, var(--gold) 50%, transparent), transparent 35%, color-mix(in oklch, var(--rise-s) 45%, transparent) 60%, transparent 80%, color-mix(in oklch, var(--gold) 40%, transparent))",
          animation: "aurora-drift-alt 32s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy" />
    </div>
  );
}
