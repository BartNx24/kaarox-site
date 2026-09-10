import type { ReactNode } from 'react';
import { Building2, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * The Prolonged Share graphic: a Kaarox card leaving the hub and hopping from
 * one person to the next, leaving thin glowing lime trails behind it.
 *
 * The same geometry powers two surfaces so the intro and the in-page section
 * read as the same object:
 * - `intro` — a one-shot choreography (~1.05s) used by the opening sequence.
 * - `loop`  — a slow, endless version revealed on scroll inside the page.
 *
 * All coordinates are plain pixels measured from the stage centre, which keeps
 * the CSS keyframe paths and the SVG trails perfectly in sync. The stage has a
 * fixed 320x300 footprint and is scaled down on small viewports.
 */

export type NetworkMode = 'intro' | 'loop';

/** Peers the card travels to, in visiting order. */
const PEERS = [
  { id: 'b', x: 108, y: -72, icon: User, label: 'Client', delay: 180 },
  { id: 'c', x: 94, y: 84, icon: Users, label: 'Community', delay: 250 },
  { id: 'd', x: -110, y: 26, icon: Building2, label: 'Provider', delay: 320 },
] as const;

/** Quiet nodes that make the network feel wider than the three hops. */
const AMBIENT = [
  { id: 'e', x: -78, y: -88, delay: 380 },
  { id: 'f', x: 10, y: 116, delay: 430 },
] as const;

/** Glowing trails, drawn as the card completes each hop. */
const TRAILS = [
  { id: 't1', x1: 0, y1: 0, x2: 108, y2: -72, delay: 380 },
  { id: 't2', x1: 108, y1: -72, x2: 94, y2: 84, delay: 640 },
  { id: 't3', x1: 94, y1: 84, x2: -110, y2: 26, delay: 860 },
] as const;

/** Dim structural links that light up once the hops are done. */
const MESH = [
  { id: 'm1', x1: 0, y1: 0, x2: -78, y2: -88 },
  { id: 'm2', x1: 0, y1: 0, x2: 10, y2: 116 },
  { id: 'm3', x1: -110, y1: 26, x2: -78, y2: -88 },
  { id: 'm4', x1: 108, y1: -72, x2: 10, y2: 116 },
] as const;

/** Absolute node positioner — the animated child handles scale/opacity. */
function NodeSlot({
  x,
  y,
  children,
  className,
}: {
  x: number;
  y: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('absolute left-1/2 top-1/2', className)}
      style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
    >
      {children}
    </div>
  );
}

type ShareNetworkProps = {
  mode: NetworkMode;
  /** Loop mode only: start the choreography once the section is in view. */
  active?: boolean;
  className?: string;
};

export function ShareNetwork({ mode, active = true, className }: ShareNetworkProps) {
  const isIntro = mode === 'intro';
  const running = isIntro || active;

  return (
    <div className={cn('kx-stage', className)} aria-hidden="true">
      {/* Trails and mesh, in a centred viewBox so SVG shares the node coords. */}
      <svg
        viewBox="-160 -150 320 300"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        {MESH.map((line) => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            className={cn('kx-trail kx-trail-idle', running && 'kx-a-net')}
            style={{ animationDelay: `${isIntro ? 1040 : 700}ms` }}
          />
        ))}

        {TRAILS.map((line) => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            pathLength={1}
            className={cn('kx-trail', running && 'kx-a-draw')}
            style={{ animationDelay: `${line.delay}ms` }}
          />
        ))}
      </svg>

      {/* Hub — the Kaarox mark the card originates from. */}
      <NodeSlot x={0} y={0} className="z-10">
        <div className={cn('relative', running && 'kx-a-mark')}>
          <span className="absolute -inset-3 rounded-[1.4rem] bg-primary/10 blur-md" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/45 bg-card shadow-[0_0_28px_hsl(113_100%_62%/0.28)]">
            <img
              src="/assets/kaarox-logo.png"
              alt=""
              width={2222}
              height={983}
              className="brand-mark h-4 w-auto"
            />
          </span>
        </div>
      </NodeSlot>

      {/* Peers the card reaches. */}
      {PEERS.map(({ id, x, y, icon: Icon, label, delay }) => (
        <NodeSlot key={id} x={x} y={y} className="z-10">
          <div
            className={cn('relative', running && 'kx-a-pop')}
            style={{ animationDelay: `${delay}ms` }}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card shadow-[0_10px_24px_-14px_hsl(120_20%_2%/0.9)]">
              <Icon className="h-[1.05rem] w-[1.05rem] text-primary" strokeWidth={2.1} />
            </span>
            {mode === 'loop' && (
              <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {label}
              </span>
            )}
          </div>
        </NodeSlot>
      ))}

      {/* Quiet edge-of-network nodes. */}
      {AMBIENT.map(({ id, x, y, delay }) => (
        <NodeSlot key={id} x={x} y={y}>
          <span
            className={cn(
              'block h-6 w-6 rounded-full border border-border/70 bg-secondary',
              running && 'kx-a-pop',
            )}
            style={{ animationDelay: `${delay}ms` }}
          />
        </NodeSlot>
      ))}

      {/* The travelling Kaarox card. */}
      <div
        className={cn(
          'absolute left-1/2 top-1/2 z-20 opacity-0',
          running && (isIntro ? 'kx-a-card-intro' : 'kx-a-card-loop'),
        )}
        style={isIntro ? undefined : { animationDelay: '620ms' }}
      >
        <span className="flex h-9 w-14 items-center justify-center rounded-[0.6rem] border border-primary/70 bg-[hsl(120_7%_10%)] shadow-[0_0_20px_hsl(113_100%_62%/0.5)]">
          <img
            src="/assets/kaarox-logo.png"
            alt=""
            width={2222}
            height={983}
            className="brand-mark h-2.5 w-auto"
          />
        </span>
      </div>
    </div>
  );
}