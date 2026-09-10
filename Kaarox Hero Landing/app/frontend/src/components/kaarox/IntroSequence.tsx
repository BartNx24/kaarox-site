import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ShareNetwork } from './ShareNetwork';

/**
 * The Kaarox opening sequence: a Prolonged Share in miniature.
 *
 * It is deliberately *not* a loading screen — no spinner, no percentage, no
 * network waiting. It runs on a fixed ~1.4s timeline and then dissolves,
 * expanding slightly so it reads as morphing into the hero device underneath.
 *
 * Plays once per browsing session and never for visitors who ask for reduced
 * motion.
 */

const SESSION_KEY = 'kaarox:intro-played';

/** Beat when the overlay begins to dissolve (ms after mount). */
const EXIT_AT = 1180;
/** Length of the dissolve. Total intro stays under ~1.5s. */
const EXIT_MS = 280;

/** Whether the opening sequence should run for this visitor, right now. */
export function shouldPlayIntro(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    if (window.sessionStorage.getItem(SESSION_KEY) === '1') return false;
  } catch {
    // Storage can be blocked (private mode); fall through and play once.
  }

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;

  return true;
}

export function IntroSequence({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // Non-fatal: the intro simply plays again in a fresh session.
    }

    // Freeze the page while the sequence owns the viewport.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const exitTimer = window.setTimeout(() => setExiting(true), EXIT_AT);
    const doneTimer = window.setTimeout(onDone, EXIT_AT + EXIT_MS);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-0 z-[70] flex items-center justify-center bg-background',
        'transition-[opacity,transform] ease-out-quart',
        exiting ? 'scale-[1.04] opacity-0' : 'scale-100 opacity-100',
      )}
      style={{ transitionDuration: `${EXIT_MS}ms` }}
    >
      <div className="page-aura pointer-events-none absolute inset-0" />

      {/* The stage scales up as it dissolves, handing off to the hero device. */}
      <div
        className={cn(
          'relative origin-center transition-transform ease-out-quart',
          'scale-[0.68] sm:scale-90 lg:scale-100',
          exiting && '!scale-[1.18]',
        )}
        style={{ transitionDuration: `${EXIT_MS}ms` }}
      >
        <ShareNetwork mode="intro" />
      </div>
    </div>
  );
}