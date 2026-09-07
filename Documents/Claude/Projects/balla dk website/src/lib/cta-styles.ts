/**
 * Shared CTA class strings so every button on the site looks and behaves the same.
 * Keep visual variants here rather than re-typing Tailwind stacks in each section.
 */
const BASE = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-center";

export const CTA = {
  /** Gold fill on dark backgrounds. Primary action. */
  gold: `${BASE} bg-gold text-navy transition-transform hover:scale-105 active:scale-95`,
  /** Navy fill on light backgrounds. Primary action. */
  primary: `${BASE} bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95`,
  /** Outline on dark backgrounds. Secondary action. */
  outlineLight: `${BASE} border border-white/30 text-white transition-colors hover:border-gold hover:text-gold`,
  /** Outline on light backgrounds. Secondary action. */
  outlineDark: `${BASE} border border-border text-foreground transition-colors hover:border-gold hover:bg-secondary`,
  /** WhatsApp green outline. Works on dark or light. */
  whatsapp: `${BASE} border border-[#25D366]/50 text-[#25D366] transition-colors hover:border-[#25D366] hover:bg-[#25D366]/10`,
  /** Solid WhatsApp green for light backgrounds where outline lacks contrast. */
  whatsappSolid: `${BASE} bg-[#128C7E] text-white transition-transform hover:scale-105 active:scale-95`,
} as const;

/** Full-width on mobile, auto on desktop. Append to any CTA variant. */
export const CTA_RESPONSIVE = "w-full sm:w-auto";
