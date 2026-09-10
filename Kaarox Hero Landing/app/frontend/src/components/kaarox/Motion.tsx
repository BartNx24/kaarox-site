import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Tracks the user's reduced-motion preference so effects can be disabled. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * Scroll-linked vertical offset, measured from the element's distance to the
 * viewport centre. Returns pixels, already clamped, updated inside rAF.
 */
export function useParallax<T extends HTMLElement>(strength = 40) {
  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setOffset(0);
      return;
    }

    let frame = 0;

    const measure = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const clamped = Math.max(-1.15, Math.min(1.15, progress));
      setOffset(clamped * strength);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [strength, reduced]);

  return { ref, offset };
}

/**
 * Progress (0 -> 1) of the visitor's travel through a tall section, intended
 * for sticky storytelling: attach the ref to a section taller than the
 * viewport and drive the animation from the returned value.
 *
 * Because the value is derived purely from scroll position, any animation
 * built on it reverses gracefully when the visitor scrolls back up.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const travel = rect.height - (window.innerHeight || 0);
      if (travel <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(1, Math.max(0, -rect.top / travel)));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

/**
 * True once the element has entered the viewport (latches, fires once).
 *
 * Combines three signals so content can never stay stuck at `opacity: 0`:
 * - an IntersectionObserver for the normal scroll case;
 * - an immediate position measurement, for pages opened part-way down;
 * - a timeout safety net, for prerender/headless capture where neither the
 *   observer nor a scroll event ever fires.
 *
 * Pass `immediate` for above-the-fold content that must animate on mount.
 *
 * @param trigger Fraction of the viewport height the element's top must cross.
 */
export function useInView<T extends HTMLElement>(trigger = 0.9, immediate = false) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (immediate) {
      // Next frame, so the browser paints the initial state first.
      const frame = window.requestAnimationFrame(() => setInView(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const element = ref.current;
    if (!element) return;

    // Already on screen at mount — reveal without waiting for a scroll.
    const rect = element.getBoundingClientRect();
    if (rect.top < (window.innerHeight || 0) * trigger && rect.bottom > 0) {
      const frame = window.requestAnimationFrame(() => setInView(true));
      return () => window.cancelAnimationFrame(frame);
    }

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: `0px 0px -${Math.round((1 - trigger) * 100)}% 0px`, threshold: 0.02 },
    );

    observer.observe(element);

    // Safety net for environments where the observer never fires (prerender,
    // headless capture). Kept short so content is never left invisible.
    const fallback = window.setTimeout(() => setInView(true), 700);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [trigger, immediate]);

  return { ref, inView };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds. Keep the total stagger of a group under 500ms. */
  delay?: number;
  /** Entrance direction offset. */
  from?: 'bottom' | 'left' | 'right' | 'none';
  /** Animate on mount instead of on scroll. Use for above-the-fold content. */
  immediate?: boolean;
};

const OFFSETS: Record<NonNullable<RevealProps['from']>, string> = {
  bottom: 'translate-y-8',
  left: '-translate-x-8',
  right: 'translate-x-8',
  none: 'translate-y-0',
};

/** Wraps content in a scroll-triggered fade + slide entrance. */
export function Reveal({
  children,
  className,
  delay = 0,
  from = 'bottom',
  immediate = false,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.9, immediate);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-out-expo will-change-transform',
        inView ? 'translate-x-0 translate-y-0 opacity-100' : cn('opacity-0', OFFSETS[from]),
        className,
      )}
    >
      {children}
    </div>
  );
}