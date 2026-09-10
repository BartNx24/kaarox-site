import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from './Motion';

/**
 * A vertical footage window, tuned for a long scrolling page.
 *
 * Performance contract — several of these live on the page at once, so:
 * - the `<video>` element (and therefore the network request) is only created
 *   once the panel is within 500px of the viewport; before that a lightweight
 *   poster image stands in;
 * - playback is paused whenever the panel leaves the viewport, so offscreen
 *   footage never occupies a decoder;
 * - callers can additionally force a pause via `playing` to keep only the
 *   focused clips of a montage running;
 * - under `prefers-reduced-motion` the poster is shown and nothing ever plays.
 *
 * The poster path is derived from the clip path, matching how the assets were
 * encoded (`clip-x.mp4` -> `clip-x-poster.jpg`).
 */

type VideoPanelProps = {
  /** Path to the web-optimised clip inside `public/assets`. */
  src: string;
  /** Set false to keep the clip paused even while visible. */
  playing?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Corner treatment, overridable for full-bleed backgrounds. */
  rounded?: string;
  /** Strength of the bottom scrim that keeps nearby copy legible. */
  scrim?: 'soft' | 'strong' | 'none';
};

const SCRIMS: Record<NonNullable<VideoPanelProps['scrim']>, string> = {
  soft: 'bg-gradient-to-t from-background/70 via-background/10 to-transparent',
  strong: 'bg-gradient-to-t from-background via-background/55 to-background/25',
  none: 'hidden',
};

export function VideoPanel({
  src,
  playing = true,
  className,
  style,
  rounded = 'rounded-3xl',
  scrim = 'soft',
}: VideoPanelProps) {
  const poster = src.replace(/\.mp4$/, '-poster.jpg');
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  // Arm the source only when the panel is nearly on screen.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') {
      setArmed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setArmed(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '500px 0px' },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Track actual visibility so offscreen clips stop decoding.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setVisible(entry.isIntersecting)),
      { threshold: 0.04 },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (visible && playing && !reduced) {
      void video.play().catch(() => {
        /* Autoplay can be refused; the poster frame remains. */
      });
    } else {
      video.pause();
    }
  }, [visible, playing, reduced, armed]);

  return (
    <div
      ref={hostRef}
      style={style}
      aria-hidden="true"
      className={cn('relative overflow-hidden bg-secondary', rounded, className)}
    >
      {armed && !reduced ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
      ) : (
        <img src={poster} alt="" loading="lazy" className="h-full w-full object-cover" />
      )}

      <span className={cn('pointer-events-none absolute inset-0', SCRIMS[scrim])} />
      <span className={cn('pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/60', rounded)} />
    </div>
  );
}