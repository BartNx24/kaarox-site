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

    const onChange = (event: MediaQueryListEvent) =>
      setReduced(event.matches);

    query.addEventListener('change', onChange);

    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * Kept for API compatibility with existing components.
 *
 * Parallax is intentionally disabled. Nothing on the normal page should move
 * according to scroll position anymore. Prolonged Share uses
 * `useScrollProgress` directly and remains the only scroll-driven sequence.
 */
export function useParallax<T extends HTMLElement>(_strength = 40) {
  const ref = useRef<T | null>(null);

  return {
    ref,
    offset: 0,
  };
}

/**
 * Progress (0 -> 1) through a tall section.
 *
 * This hook remains scroll-linked because it is used by the Prolonged Share
 * demonstration, which is intentionally the one scroll-controlled experience
 * on the page.
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

      setProgress(
        Math.min(1, Math.max(0, -rect.top / travel)),
      );
    };

    const schedule = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(measure);
      }
    };

    measure();

    window.addEventListener('scroll', schedule, {
      passive: true,
    });
    window.addEventListener('resize', schedule);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return { ref, progress };
}

/**
 * Content is revealed immediately after mount instead of waiting for the
 * visitor to scroll it into view.
 *
 * This preserves a small entrance transition while removing all scroll-based
 * reveal behaviour. By the time the visitor reaches a lower section, its
 * content and media are already visible.
 */
export function useInView<T extends HTMLElement>(
  _trigger = 0.9,
  _immediate = false,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setInView(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return { ref, inView };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds. */
  delay?: number;
  /** Entrance direction offset. */
  from?: 'bottom' | 'left' | 'right' | 'none';
  /** Kept for compatibility. All reveals now start on mount. */
  immediate?: boolean;
};

const OFFSETS: Record<
  NonNullable<RevealProps['from']>,
  string
> = {
  bottom: 'translate-y-8',
  left: '-translate-x-8',
  right: 'translate-x-8',
  none: 'translate-y-0',
};

/**
 * Mount-triggered fade + slide entrance.
 *
 * It no longer waits for IntersectionObserver or scroll position.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = 'bottom',
  immediate = false,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(
    0.9,
    immediate,
  );

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-out-expo will-change-transform',
        inView
          ? 'translate-x-0 translate-y-0 opacity-100'
          : cn('opacity-0', OFFSETS[from]),
        className,
      )}
    >
      {children}
    </div>
  );
}
