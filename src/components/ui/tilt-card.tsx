"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
}

const REST: TiltState = { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 };
const MAX_TILT_DEG = 10;

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Pointer-tracked 3D tilt with a soft gold glare. Only reacts to hover-capable
 * pointers; on touch it renders as a static elevated card. Honours reduced motion
 * through the global rule that collapses transition durations.
 */
export function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>(REST);
  const [hovering, setHovering] = useState(false);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    setTilt({
      rotateX: (0.5 - py) * MAX_TILT_DEG * 2,
      rotateY: (px - 0.5) * MAX_TILT_DEG * 2,
      glareX: px * 100,
      glareY: py * 100,
    });
    setHovering(true);
  }

  function handleLeave() {
    setTilt(REST);
    setHovering(false);
  }

  return (
    <div className={`[perspective:1000px] ${className}`}>
      <div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="relative overflow-hidden rounded-2xl border border-border bg-card will-change-transform"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${hovering ? 1.02 : 1})`,
          transition: hovering
            ? "transform 80ms linear, box-shadow 200ms ease"
            : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease",
          boxShadow: hovering
            ? `${-tilt.rotateY * 1.5}px ${tilt.rotateX * 1.5 + 20}px 40px rgba(10, 14, 26, 0.25)`
            : "0 1px 2px rgba(10, 14, 26, 0.04)",
        }}
      >
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: hovering ? 1 : 0,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, color-mix(in oklch, var(--gold) 28%, transparent), transparent 55%)`,
            mixBlendMode: "soft-light",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl transition-[box-shadow] duration-300"
          style={{ boxShadow: hovering ? "inset 0 0 0 1px color-mix(in oklch, var(--gold) 50%, transparent)" : "none" }}
        />
      </div>
    </div>
  );
}
