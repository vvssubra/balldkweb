"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site-content";

interface NavProps {
  onStartScorecard: () => void;
}

export function Nav({ onStartScorecard }: NavProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0A0E1A]/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6" aria-label="Primary">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-bold text-[#0A0E1A]">
            B
          </span>
          <span className="text-lg font-medium tracking-wide text-white">Balla DK</span>
        </a>

        <ul className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={onStartScorecard}
            className="rounded-full bg-[#D4AF37] px-5 py-2 text-sm font-bold text-[#0A0E1A] transition-transform hover:scale-105 active:scale-95"
          >
            Take the R.I.S.E. Scorecard
          </button>
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((open) => !open)}
        >
          {drawerOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {drawerOpen ? (
        <div className="border-t border-white/10 bg-[#0A0E1A] px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium text-white/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setDrawerOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setDrawerOpen(false);
              onStartScorecard();
            }}
            className="mt-4 w-full rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#0A0E1A]"
          >
            Take the R.I.S.E. Scorecard
          </button>
        </div>
      ) : null}
    </header>
  );
}
