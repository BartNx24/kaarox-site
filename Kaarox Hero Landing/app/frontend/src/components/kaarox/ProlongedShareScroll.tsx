import { Building2, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion, useScrollProgress } from './Motion';

/**
 * The Prolonged Share chapter — scroll-controlled, never looping.
 *
 * Every value below is a pure function of one number: how far the visitor has
 * travelled through the tall (210vh) section. Nothing runs on a timer, which
 * is precisely what lets the whole sequence reverse gracefully when the
 * visitor scrolls back up.
 *
 * Choreography
 *   0.00        one card, held by "You"; opening statement
 *   0.14 - 0.34 a trail grows toward a new contact; the card travels
 *   0.40 - 0.60 a second trail extends into their circle
 *   0.66 - 0.84 a few more relevant nodes appear; the card lands again
 *   0.70 - 1.00 the network settles and the closing statement resolves
 *
 * Coordinates are plain pixels measured from the stage centre, shared between
 * the HTML nodes and the SVG trails so the two can never drift apart.
 */

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** Normalised progress of `value` across the [from, to] window. */
const range = (value: number, from: number, to: number) => clamp01((value - from) / (to - from));

type Point = { x: number; y: number };

const NODES = {
  a: { x: -214, y: -30, icon: User, label: 'You' },
  b: { x: -48, y: -134, icon: User, label: 'A new contact' },
  c: { x: 156, y: -12, icon: Users, label: 'Their circle' },
  d: { x: 26, y: 132, icon: Building2, label: 'Someone relevant' },
} satisfies Record<string, Point & { icon: typeof User; label: string }>;

/** The three hops, each with the scroll window that drives it. */
const HOPS = [
  { from: NODES.a, to: NODES.b, start: 0.14, end: 0.34 },
  { from: NODES.b, to: NODES.c, start: 0.4, end: 0.6 },
  { from: NODES.c, to: NODES.d, start: 0.66, end: 0.84 },
] as const;

/** Quiet nodes that widen the network late on, without crowding it. */
const AMBIENT = [
  { id: 'n1', x: -178, y: 124, at: 0.62 },
  { id: 'n2', x: 238, y: -132, at: 0.68 },
  { id: 'n3', x: 196, y: 146, at: 0.74 },
] as const;

/** Dim structural links, revealed with the ambient nodes. */
const MESH = [
  { id: 'm1', from: NODES.a, to: { x: -178, y: 124 } },
  { id: 'm2', from: NODES.c, to: { x: 238, y: -132 } },
  { id: 'm3', from: NODES.d, to: { x: 196, y: 146 } },
] as const;

const CAPTIONS = [
  {
    id: 'open',
    from: 0,
    to: 0.13,
    heading: (
      <>
        Share once.
        <br />
        Reach further.
      </>
    ),
    body: 'A connection doesn’t always have to end with the first person.',
  },
  {
    id: 'hop-1',
    from: 0.17,
    to: 0.37,
    heading: <>One share creates a new opportunity.</>,
  },
  {
    id: 'hop-2',
    from: 0.43,
    to: 0.63,
    heading: <>And the right connection can carry it further.</>,
  },
] as const;

/** Fades a block in over the first 4% of its window and out over the last 4%. */
function captionOpacity(progress: number, from: number, to: number) {
  return Math.min(range(progress, from, from + 0.04), 1 - range(progress, to, to + 0.04));
}

/** Position of the travelling card, plus which node it is currently resting on. */
function cardState(progress: number) {
  let point: Point = NODES.a;
  let lift = 0;
  let landedOn = 'a';

  for (const [index, hop] of HOPS.entries()) {
    const t = range(progress, hop.start, hop.end);
    if (t <= 0) break;

    // Ease-out so the card decelerates into each node rather than snapping.
    const eased = 1 - (1 - t) ** 3;
    point = {
      x: hop.from.x + (hop.to.x - hop.from.x) * eased,
      y: hop.from.y + (hop.to.y - hop.from.y) * eased,
    };
    // A shallow arc keeps the travel feeling physical, not diagrammatic.
    lift = Math.sin(Math.PI * t) * -22;
    if (t >= 1) landedOn = ['b', 'c', 'd'][index];
  }

  return { point, lift, landedOn };
}

export function ProlongedShareScroll() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const reduced = usePrefersReducedMotion();

  // Reduced motion resolves straight to the finished network.
  const p = reduced ? 1 : progress;
  const { point, lift, landedOn } = cardState(p);
  const meshOpacity = range(p, 0.62, 0.8);
  const finalOpacity = range(p, 0.7, 0.84);

  /** How lit a node is: dim until the card has reached it. */
  const nodeGlow = (id: string, arriveAt: number) =>
    id === 'a' ? 1 : range(p, arriveAt - 0.04, arriveAt);

  const ARRIVALS: Record<string, number> = { a: 0, b: 0.34, c: 0.6, d: 0.84 };

  return (
    <section
      ref={ref}
      aria-label="Prolonged Share"
      className="relative h-[210vh] border-t border-border bg-[hsl(120_10%_3.5%)]"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Subtle Kaarox-green radial glow over near-black. */}
        <div aria-hidden="true" className="kx-share-glow pointer-events-none absolute inset-0" />

        <div className="relative mx-auto w-full max-w-screen-xl px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Prolonged Share
            </span>

            {/* Captions share one grid cell so they cross-fade in place and
                never reflow the graphic underneath. */}
            <div className="relative mt-8 grid w-full max-w-[46rem] place-items-center text-center">
              {CAPTIONS.map((caption) => (
                <div
                  key={caption.id}
                  style={{ opacity: reduced ? 0 : captionOpacity(p, caption.from, caption.to) }}
                  className="col-start-1 row-start-1 transition-opacity duration-200 ease-out-quart"
                >
                  <h2 className="text-balance text-foreground">{caption.heading}</h2>
                  {caption.body && (
                    <p className="mx-auto mt-5 max-w-[42ch] text-lg leading-relaxed text-muted-foreground">
                      {caption.body}
                    </p>
                  )}
                </div>
              ))}

              {/* Closing statement. */}
              <div
                style={{ opacity: reduced ? 1 : finalOpacity }}
                className="col-start-1 row-start-1 transition-opacity duration-200 ease-out-quart"
              >
                <h2 className="text-balance text-foreground">That’s Prolonged Share.</h2>
                <p className="mx-auto mt-5 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                  Designed to help your digital business card continue reaching additional relevant
                  users beyond the first share, subject to your selected settings, limits and
                  availability.
                </p>
                <p className="mt-6 text-lg font-semibold tracking-[-0.02em] text-foreground">
                  Your card. Your network.{' '}
                  <span className="kx-glow-text text-primary">More possibilities.</span>
                </p>
              </div>
            </div>

            {/* ---- The network stage ---- */}
            <div className="mt-10 flex w-full justify-center lg:mt-12">
              <div
                aria-hidden="true"
                className="kx-share-stage origin-center scale-[0.5] sm:scale-[0.68] lg:scale-90 xl:scale-100"
              >
                <svg
                  viewBox="-300 -210 600 420"
                  className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                >
                  {MESH.map((line) => (
                    <line
                      key={line.id}
                      x1={line.from.x}
                      y1={line.from.y}
                      x2={line.to.x}
                      y2={line.to.y}
                      className="kx-mesh"
                      style={{ opacity: meshOpacity * 0.5 }}
                    />
                  ))}

                  {HOPS.map((hop, index) => {
                    const drawn = range(p, hop.start, hop.end);
                    return (
                      <line
                        key={`hop-${index}`}
                        x1={hop.from.x}
                        y1={hop.from.y}
                        x2={hop.to.x}
                        y2={hop.to.y}
                        pathLength={1}
                        strokeDasharray={1}
                        strokeDashoffset={1 - drawn}
                        className="kx-hop"
                      />
                    );
                  })}
                </svg>

                {/* People. Each stays dim until the card has reached it. */}
                {Object.entries(NODES).map(([id, node]) => {
                  const glow = nodeGlow(id, ARRIVALS[id]);
                  const isHost = landedOn === id;
                  return (
                    <div
                      key={id}
                      className="absolute left-1/2 top-1/2 z-10"
                      style={{ transform: `translate(-50%, -50%) translate(${node.x}px, ${node.y}px)` }}
                    >
                      <div
                        className="relative transition-transform duration-500 ease-out-expo"
                        style={{ transform: `scale(${isHost ? 1.06 : 1})` }}
                      >
                        <span
                          className="absolute -inset-2.5 rounded-full bg-primary/25 blur-md transition-opacity duration-500"
                          style={{ opacity: glow * (isHost ? 0.9 : 0.35) }}
                        />
                        <span
                          className="relative flex h-14 w-14 items-center justify-center rounded-full border bg-card transition-colors duration-500"
                          style={{
                            borderColor: `hsl(113 100% 62% / ${0.15 + glow * 0.6})`,
                            boxShadow: `0 0 26px hsl(113 100% 62% / ${glow * 0.3})`,
                          }}
                        >
                          <node.icon
                            className="h-5 w-5 transition-colors duration-500"
                            strokeWidth={1.9}
                            style={{ color: glow > 0.5 ? 'hsl(113 100% 62%)' : 'hsl(115 6% 46%)' }}
                          />
                        </span>
                        <span
                          className="absolute left-1/2 top-full mt-2.5 -translate-x-1/2 whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-[0.12em] transition-opacity duration-500"
                          style={{
                            opacity: 0.35 + glow * 0.65,
                            color: glow > 0.5 ? 'hsl(115 8% 78%)' : 'hsl(115 6% 42%)',
                          }}
                        >
                          {node.label}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Quiet nodes at the edge of the network. */}
                {AMBIENT.map((node) => {
                  const shown = range(p, node.at, node.at + 0.08);
                  return (
                    <span
                      key={node.id}
                      className="absolute left-1/2 top-1/2 block h-7 w-7 rounded-full border border-border/70 bg-secondary"
                      style={{
                        transform: `translate(-50%, -50%) translate(${node.x}px, ${node.y}px) scale(${0.6 + shown * 0.4})`,
                        opacity: shown * 0.85,
                      }}
                    />
                  );
                })}

                {/* The travelling Kaarox card. */}
                <div
                  className="absolute left-1/2 top-1/2 z-20"
                  style={{
                    transform: `translate(-50%, -50%) translate(${point.x}px, ${point.y + lift}px)`,
                  }}
                >
                  <span className="flex h-11 w-[4.25rem] items-center justify-center rounded-[0.7rem] border border-primary/70 bg-[hsl(120_7%_10%)] shadow-[0_0_24px_hsl(113_100%_62%/0.55)]">
                    <img
                      src="/assets/kaarox-logo.png"
                      alt=""
                      width={2222}
                      height={983}
                      className="brand-mark h-3 w-auto"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}