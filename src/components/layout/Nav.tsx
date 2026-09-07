"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site-content";
import { useScorecard } from "@/components/scorecard/ScorecardProvider";

interface LampRect {
  left: number;
  width: number;
}

/** Split "/#about" into { path: "/", hash: "#about" }. Path-only links have hash "". */
function splitHref(href: string): { path: string; hash: string } {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return { path: href, hash: "" };
  return { path: href.slice(0, hashIndex) || "/", hash: href.slice(hashIndex) };
}

export function Nav() {
  const pathname = usePathname();
  const { open } = useScorecard();
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Href chosen by scroll position or click, tagged with the pathname it belongs to so a
  // stale value from a previous route is ignored without needing a reset effect.
  const [selected, setSelected] = useState<{ pathname: string; href: string } | null>(null);
  const [lampRect, setLampRect] = useState<LampRect | null>(null);

  const shellRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Links whose target lives on the current page (in-page anchors) vs. separate routes.
  const pageLink = NAV_LINKS.find((link) => splitHref(link.href).hash === "" && link.href === pathname);
  const anchorLinks = NAV_LINKS.filter((link) => {
    const { path, hash } = splitHref(link.href);
    return hash !== "" && path === pathname;
  });

  // On a dedicated route, that route's link is active. On the homepage, scroll position decides.
  const activeHref =
    pageLink?.href ?? (selected?.pathname === pathname ? selected.href : anchorLinks[0]?.href ?? "");
  const setActiveHref = (href: string) => setSelected({ pathname, href });

  useEffect(() => {
    const moveLamp = () => {
      const shell = shellRef.current;
      const item = itemRefs.current.get(activeHref);
      if (!shell || !item) {
        setLampRect(null);
        return;
      }
      const shellRect = shell.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      setLampRect({ left: itemRect.left - shellRect.left, width: itemRect.width });
    };

    moveLamp();
    window.addEventListener("resize", moveLamp);
    return () => window.removeEventListener("resize", moveLamp);
  }, [activeHref]);

  useEffect(() => {
    if (anchorLinks.length === 0) return;

    const targets = anchorLinks
      .map((link) => ({ href: link.href, el: document.getElementById(splitHref(link.href).hash.slice(1)) }))
      .filter((t): t is { href: string; el: HTMLElement } => t.el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const match = targets.find((t) => t.el === visible.target);
        if (match) setActiveHref(match.href);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    targets.forEach((t) => observer.observe(t.el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const linkClass = (href: string) =>
    `relative block rounded-full px-4 py-2 transition-colors hover:text-white ${
      activeHref === href ? "text-white" : "text-white/70"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-navy/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6" aria-label="Primary">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
            B
          </span>
          <span className="text-lg font-medium tracking-wide text-white">Balla DK</span>
        </Link>

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
              <Link
                ref={(el) => {
                  if (el) itemRefs.current.set(link.href, el);
                }}
                href={link.href}
                aria-current={activeHref === link.href ? "page" : undefined}
                onClick={() => setActiveHref(link.href)}
                className={linkClass(link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => open()}
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
          onClick={() => setDrawerOpen((isOpen) => !isOpen)}
        >
          {drawerOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {drawerOpen ? (
        <div className="border-t border-white/10 bg-navy px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium text-white/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => {
                    setActiveHref(link.href);
                    setDrawerOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setDrawerOpen(false);
              open();
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
