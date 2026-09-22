import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from './Motion';

/**
 * A vertical footage window.
 *
 * The media element is created immediately. It no longer waits for the panel
 * to approach the viewport before being rendered, so visitors never scroll to
 * an empty media frame.
 *
 * IntersectionObserver is used only to pause playback while a video is
 * offscreen. It does not control whether the media exists or is visible.
 */

type VideoPanelProps = {
  /** Path to the clip inside `public/assets`. */
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

const SCRIMS: Record<
  NonNullable<VideoPanelProps['scrim']>,
  string
> = {
  soft:
    'bg-gradient-to-t from-background/70 via-background/10 to-transparent',

  strong:
    'bg-gradient-to-t from-background via-background/55 to-background/25',

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
  const poster = src.replace(/\.mp4$/i, '-poster.jpg');

  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [visible, setVisible] = useState(false);

  const reduced = usePrefersReducedMotion();

  // Visibility only controls playback.
  // It does NOT control whether the media is rendered.
  useEffect(() => {
    const host = hostRef.current;

    if (
      !host ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.04,
        rootMargin: '120px 0px',
      },
    );

    observer.observe(host);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (visible && playing && !reduced) {
      void video.play().catch(() => {
        // Autoplay can be refused.
        // The poster remains visible.
      });
    } else {
      video.pause();
    }
  }, [visible, playing, reduced]);

  return (
    <div
      ref={hostRef}
      style={style}
      aria-hidden="true"
      className={cn(
        'relative overflow-hidden bg-secondary',
        rounded,
        className,
      )}
    >
      {reduced ? (
        <img
          src={poster}
          alt=""
          loading="eager"
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      )}

      <span
        className={cn(
          'pointer-events-none absolute inset-0',
          SCRIMS[scrim],
        )}
      />

      <span
        className={cn(
          'pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/60',
          rounded,
        )}
      />
    </div>
  );
}
