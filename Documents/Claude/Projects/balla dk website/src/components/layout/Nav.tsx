"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site-content";

interface NavProps {
  onStartScorecard: () => void;
}

interface LampRect {
  left: number;
  width: number;
}

export function Nav({ onStartScorecard }: NavProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(NAV_LINKS[0]?.href ?? "");
  const [lampRect, setLampRect] = useState<LampRect | null>(null);

  const shellRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const moveLamp = (href: string) => {
    const shell = shellRef.current;
    const item = itemRefs.current.get(href);
    if (!shell || !item) return;

    const shellRect = shell.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    setLampRect({ left: itemRect.left - shellRect.left, width: itemRect.width });
  };

  useEffect(() => {
    moveLamp(activeHref);

    const handleResize = () => moveLamp(activeHref);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeHref]);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
      (el): el is Element => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-navy/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6" aria-label="Primary">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
            B
          </span>
          <span className="text-lg font-medium tracking-wide text-white">Balla DK</span>
        </a>

        <ul
          ref={shellRef}
          className="relative hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-sm font-medium text-white/70 backdrop-blur-md md:flex"
        >
          {lampRect ? (
            <li
              aria-hidden
              className="pointer-events-none absolute top-1 h-[calc(100%-0.5rem)] rounded-full bg-gradient-to-b from-gold/25 to-gold/5 transition-[transform,width] duration-300 ease-out"
              style={{ transform: `translateX(${lampRect.left}px)`, width: lampRect.width }}
            >
              <span
                className="absolute left-1/2 -top-[9px] h-1 w-8 -translate-x-1/2 rounded-full bg-gold"
                style={{ boxShadow: "0 0 12px color-mix(in oklch, var(--gold) 70%, transparent)" }}
              />
            </li>
          ) : null}

          {NAV_LINKS.map((link) => (
            <li key={link.href} className="relative z-10">
              <a
                ref={(el) => {
                  if (el) itemRefs.current.set(link.href, el);
                }}
                href={link.href}
                aria-current={activeHref === link.href ? "true" : undefined}
                onClick={() => setActiveHref(link.href)}
                className={`relative block rounded-full px-4 py-2 transition-colors hover:text-white ${
                  activeHref === link.href ? "text-white" : "text-white/70"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={onStartScorecard}
            className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-navy transition-transform hover:scale-105 active:scale-95"
          >
            Take the R.I.S.E. Scorecard
          </button>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 text-white md:hidden"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((open) => !open)}
        >
          {drawerOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {drawerOpen ? (
        <div className="border-t border-white/10 bg-navy px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium text-white/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => {
                    setActiveHref(link.href);
                    setDrawerOpen(false);
                  }}
                >
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
            className="mt-4 w-full rounded-full bg-gold px-5 py-3 text-sm font-bold text-navy"
          >
            Take the R.I.S.E. Scorecard
          </button>
        </div>
      ) : null}
    </header>
  );
}
