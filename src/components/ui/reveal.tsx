"use client";

import {
  createElement,
  useCallback,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type Ref,
} from "react";

/**
 * Scroll-reveal primitives. Elements render hidden and animate in when they
 * enter the viewport. All motion is CSS (see `[data-reveal]` in globals.css),
 * so a single shared IntersectionObserver is the only JS cost.
 *
 * Variants:
 *   up / down / left / right  slide + fade
 *   scale                     grow from 92%
 *   blur                      un-blur + lift
 *   fade                      opacity only
 *   flip                      rotate up from a slight X tilt
 *   sides (group only)        odd children from left, even from right
 */
export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "fade" | "flip";
export type RevealGroupVariant = RevealVariant | "sides";

type Callback = (visible: boolean) => void;

const DEFAULT_THRESHOLD = 0.15;
const ROOT_MARGIN = "0px 0px -8% 0px";

/** One observer per threshold, shared by every Reveal on the page. */
const observers = new Map<number, IntersectionObserver>();
const callbacks = new WeakMap<Element, Callback>();

function getObserver(threshold: number): IntersectionObserver {
  const existing = observers.get(threshold);
  if (existing) return existing;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        callbacks.get(entry.target)?.(entry.isIntersecting);
      }
    },
    { threshold, rootMargin: ROOT_MARGIN },
  );
  observers.set(threshold, observer);
  return observer;
}

interface UseRevealOptions {
  threshold?: number;
  once?: boolean;
}

/**
 * Tracks whether an element is in view. Returns a callback ref (attach it to the
 * element) and the visible flag. Observation starts when the node mounts and the
 * returned cleanup stops it when the node unmounts.
 */
export function useReveal<T extends Element>({ threshold = DEFAULT_THRESHOLD, once = true }: UseRevealOptions = {}) {
  const [visible, setVisible] = useState(false);

  const ref = useCallback(
    (el: T | null) => {
      if (!el) return;
      if (typeof IntersectionObserver === "undefined") {
        setVisible(true);
        return;
      }
      const observer = getObserver(threshold);
      callbacks.set(el, (isVisible) => {
        if (isVisible) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      });
      observer.observe(el);
      return () => {
        observer.unobserve(el);
        callbacks.delete(el);
      };
    },
    [threshold, once],
  );

  return { ref, visible };
}

function assignRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (!ref) return;
  if (typeof ref === "function") ref(node);
  else (ref as { current: T | null }).current = node;
}

/** Combines the observer ref with a caller-supplied ref. */
function useMergedRef(
  observe: (el: HTMLElement | null) => (() => void) | undefined,
  external: Ref<HTMLElement> | undefined,
) {
  return useCallback(
    (node: HTMLElement | null) => {
      const stop = observe(node);
      assignRef(external, node);
      return () => {
        stop?.();
        assignRef(external, null);
      };
    },
    [observe, external],
  );
}

interface RevealBaseProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to div. */
  as?: ElementType;
  /** Delay before the animation starts, in ms. */
  delay?: number;
  /** Animation length, in ms. */
  duration?: number;
  /** Fraction of the element that must be visible before it reveals. */
  threshold?: number;
  /** Reveal once and stay (default), or re-hide when scrolled away. */
  once?: boolean;
  ref?: Ref<HTMLElement>;
}

export interface RevealProps extends RevealBaseProps {
  variant?: RevealVariant;
}

/** Reveals a single element when it scrolls into view. */
export function Reveal({
  as = "div",
  variant = "up",
  delay = 0,
  duration,
  threshold,
  once,
  style,
  ref,
  ...rest
}: RevealProps) {
  const { ref: observe, visible } = useReveal<HTMLElement>({ threshold, once });
  const setRef = useMergedRef(observe, ref);

  return createElement(as, {
    ...rest,
    ref: setRef,
    "data-reveal": variant,
    "data-visible": visible ? "" : undefined,
    style: revealStyle(style, { delay, duration }),
  });
}

export interface RevealGroupProps extends RevealBaseProps {
  variant?: RevealGroupVariant;
  /** Gap between each child's animation, in ms. */
  stagger?: number;
}

/**
 * Reveals every direct child in sequence when the group scrolls into view.
 * Children need no changes; the stagger is applied with nth-child in CSS.
 */
export function RevealGroup({
  as = "div",
  variant = "up",
  delay = 0,
  duration,
  stagger = 90,
  threshold,
  once,
  style,
  ref,
  ...rest
}: RevealGroupProps) {
  const { ref: observe, visible } = useReveal<HTMLElement>({ threshold, once });
  const setRef = useMergedRef(observe, ref);

  return createElement(as, {
    ...rest,
    ref: setRef,
    "data-reveal-group": variant,
    "data-visible": visible ? "" : undefined,
    style: revealStyle(style, { delay, duration, stagger }),
  });
}

function revealStyle(
  base: CSSProperties | undefined,
  { delay, duration, stagger }: { delay: number; duration?: number; stagger?: number },
): CSSProperties {
  const vars: Record<string, string> = {};
  if (delay) vars["--reveal-base"] = `${delay}ms`;
  if (duration) vars["--reveal-duration"] = `${duration}ms`;
  if (stagger !== undefined) vars["--reveal-stagger"] = `${stagger}ms`;
  return { ...base, ...vars } as CSSProperties;
}
