import {
  CalendarCheck,
  Compass,
  Layers,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { VideoPanel } from './VideoPanel';
import { SearchPanel } from './UIPanels';

import {
  Reveal,
  usePrefersReducedMotion,
  useScrollProgress,
} from './Motion';

const clamp01 = (value: number) =>
  Math.min(1, Math.max(0, value));

const range = (
  value: number,
  from: number,
  to: number,
) => clamp01((value - from) / (to - from));

/* -------------------------------------------------------------------------- */
/* Section 1 — Whatever you're looking for                                    */
/* -------------------------------------------------------------------------- */

const INDUSTRY_LINES = [
  'Beauty.',
  'Sport.',
  'Business.',
  'Automotive.',
  'Wellness.',
  'Services.',
  'Communities.',
  'And more.',
];

/**
 * These use files that actually exist in /public/assets.
 *
 * Beauty:
 * 7291762...
 *
 * Sport:
 * 10340703...
 *
 * Automotive:
 * 8470010...
 */
const MEDIA = [
  {
    src: '/assets/7291762-uhd_2160_3840_25fps.mp4',
    label: 'Beauty',
  },
  {
    src: '/assets/10340703-uhd_2160_4096_25fps.mp4',
    label: 'Sport',
  },
  {
    src: '/assets/8470010-uhd_2160_3840_25fps.mp4',
    label: 'Automotive',
  },
] as const;

export function RealLifeSection() {
  const { ref, progress } =
    useScrollProgress<HTMLElement>();

  const reduced = usePrefersReducedMotion();

  const p = reduced ? 0.5 : progress;

  const lineIndex = Math.min(
    INDUSTRY_LINES.length - 1,
    Math.floor(p * INDUSTRY_LINES.length),
  );

  const focus = Math.min(
    MEDIA.length - 1,
    Math.floor(p * MEDIA.length),
  );

  return (
    <section
      ref={ref}
      aria-label="Whatever you’re looking for, start with Kaarox"
      className="relative isolate border-t border-border lg:h-[260vh]"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Sticky desktop viewport                                             */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          relative
          lg:sticky
          lg:top-0
          lg:flex
          lg:h-screen
          lg:items-center
          lg:overflow-hidden
        "
      >
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-[5%]
            top-1/2
            -z-10
            h-[65%]
            w-[50%]
            -translate-y-1/2
            rounded-full
            bg-primary/[0.035]
            blur-[120px]
          "
        />

        <div
          className="
            mx-auto
            grid
            w-full
            max-w-screen-xl
            grid-cols-1
            items-center
            gap-16
            px-6
            py-24

            sm:px-8

            lg:grid-cols-12
            lg:gap-14
            lg:px-12
            lg:py-0
          "
        >
          {/* =============================================================== */}
          {/* LEFT — TEXT SAFE ZONE                                           */}
          {/* =============================================================== */}

          <div
            className="
              relative
              z-30
              min-w-0
              lg:col-span-5
              lg:pr-4
            "
          >
            {/* Dark safety field behind copy.

                This prevents moving media/glows from visually competing with
                the typography even if the composition changes later. */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -inset-x-8
                -inset-y-10
                -z-10
                rounded-[3rem]

                bg-[radial-gradient(circle_at_30%_50%,hsl(var(--background)/0.98)_0%,hsl(var(--background)/0.94)_48%,hsl(var(--background)/0.72)_68%,transparent_88%)]
              "
            />

            <Reveal>
              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-primary
                "
              >
                One place to start
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h2
                className="
                  mt-5
                  max-w-[18ch]
                  text-balance
                  text-foreground
                "
              >
                Whatever you’re looking for,
                start with{' '}
                <span className="text-primary">
                  Kaarox
                </span>
                .
              </h2>
            </Reveal>

            {/* -------------------------------------------------------------- */}
            {/* Animated industry word                                        */}
            {/* -------------------------------------------------------------- */}

            <div
              aria-hidden="true"
              className="
                relative
                mt-10
                h-[clamp(3rem,6vw,4.75rem)]
                w-full
                overflow-visible
              "
            >
              {INDUSTRY_LINES.map(
                (line, index) => {
                  const active =
                    index === lineIndex;

                  return (
                    <span
                      key={line}
                      style={{
                        opacity: active ? 1 : 0,

                        transform: `translate3d(
                          0,
                          ${active ? 0 : 18}px,
                          0
                        )`,
                      }}
                      className={cn(
                        `
                          absolute
                          inset-x-0
                          top-0
                          whitespace-nowrap
                          font-bold
                          leading-none
                          tracking-[-0.045em]

                          text-[clamp(2.4rem,5vw,4.15rem)]

                          transition-[opacity,transform]
                          duration-500
                          ease-out-expo
                        `,

                        index % 2 === 0
                          ? 'text-foreground/80'
                          : 'kx-glow-text text-primary',
                      )}
                    >
                      {line}
                    </span>
                  );
                },
              )}
            </div>

            <Reveal delay={160}>
              <p
                className="
                  mt-7
                  max-w-[42ch]
                  text-base
                  leading-relaxed
                  text-muted-foreground

                  sm:text-lg
                "
              >
                Whatever you’re looking for,
                Kaarox helps you discover relevant
                people, services and opportunities
                in one connected place.
              </p>
            </Reveal>

            {/* -------------------------------------------------------------- */}
            {/* Scroll-position dots                                          */}
            {/* -------------------------------------------------------------- */}

            <div
              aria-hidden="true"
              className="
                mt-10
                hidden
                items-center
                gap-2
                lg:flex
              "
            >
              {MEDIA.map((item, index) => (
                <span
                  key={item.label}
                  className="flex items-center"
                >
                  <span
                    className={cn(
                      `
                        h-1
                        rounded-full
                        transition-all
                        duration-500
                        ease-out-expo
                      `,

                      index === focus
                        ? 'w-9 bg-primary'
                        : 'w-3 bg-border',
                    )}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* =============================================================== */}
          {/* RIGHT — MEDIA-ONLY COLUMN                                       */}
          {/* =============================================================== */}

          <div
            className="
              relative
              z-10
              min-w-0
              lg:col-span-7
              lg:pl-3
            "
          >
            <div
              className="
                relative
                isolate
                mx-auto
                flex

                h-[48vh]
                w-full

                items-center
                justify-center

                gap-3

                sm:h-[56vh]
                sm:gap-4

                lg:h-[65vh]
                lg:gap-5
              "
            >
              {/* ------------------------------------------------------------ */}
              {/* Media cards                                                  */}
              {/* ------------------------------------------------------------ */}

              {MEDIA.map((item, index) => {
                const active =
                  index === focus;

                const drift = reduced
                  ? 0
                  : (p - 0.5) *
                    (index % 2 === 0
                      ? -42
                      : 34);

                return (
                  <VideoPanel
                    key={item.src}
                    src={item.src}
                    playing={active}
                    scrim="soft"
                    rounded="
                      rounded-[1.35rem]
                      sm:rounded-[1.75rem]
                    "
                    style={{
                      transform: `
                        translate3d(
                          0,
                          ${drift}px,
                          0
                        )
                        scale(
                          ${active ? 1 : 0.88}
                        )
                      `,

                      opacity: active
                        ? 1
                        : 0.34,

                      zIndex: active
                        ? 2
                        : 1,
                    }}
                    className={cn(
                      `
                        h-full
                        min-w-0
                        flex-1
                        max-w-[13rem]

                        transition-[opacity,transform]
                        duration-700
                        ease-out-expo

                        will-change-transform

                        lg:max-w-[16rem]
                      `,
                    )}
                  />
                );
              })}

              {/* ------------------------------------------------------------ */}
              {/* SEARCH CARD                                                  */}
              {/* ------------------------------------------------------------ */}

              <div
                aria-hidden="true"
                style={{
                  opacity: reduced
                    ? 1
                    : range(
                        p,
                        0.12,
                        0.32,
                      ),
                }}
                className="
                  pointer-events-none

                  absolute

                  bottom-[2%]
                  left-1/2

                  z-40

                  hidden

                  w-[18rem]
                  max-w-[calc(100%-2rem)]

                  -translate-x-1/2

                  transition-opacity
                  duration-500
                  ease-out-quart

                  sm:block

                  lg:bottom-[0%]
                  lg:w-[20rem]
                "
              >
                {/* Separate wrapper creates another local stacking context. */}
                <div className="relative z-50">
                  <SearchPanel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 2 — For customers                                                  */
/* -------------------------------------------------------------------------- */

const CUSTOMER_STEPS = [
  {
    icon: Compass,
    title: 'Discover',
    detail:
      'Find providers that match what you need.',
  },

  {
    icon: Layers,
    title: 'Explore',
    detail:
      'See services, business information and digital cards before you connect.',
  },

  {
    icon: MessageCircle,
    title: 'Connect',
    detail:
      'Message providers directly when you’re ready.',
  },

  {
    icon: CalendarCheck,
    title: 'Book',
    detail:
      'Request appointments with participating professionals.',
  },

  {
    icon: Sparkles,
    title: 'Stay connected',
    detail:
      'Join hubs, discover posts and explore marketplace listings within Kaarox.',
  },
];

export function ForCustomersSection() {
  return (
    <section
      aria-label="For customers"
      className="
        relative
        border-t
        border-border
        bg-[hsl(120_9%_4.5%)]
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-screen-xl
          grid-cols-1
          gap-14
          px-6
          py-24
          sm:px-8
          lg:grid-cols-12
          lg:gap-12
          lg:px-12
          lg:py-32
        "
      >
        {/* =============================================================== */}
        {/* LEFT — customer explanation                                     */}
        {/* =============================================================== */}

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-primary
                "
              >
                For customers
              </span>
            </Reveal>

            <Reveal delay={90}>
              <h2
                className="
                  mt-5
                  text-balance
                  text-foreground
                "
              >
                Find what you need.
                <br />
                Find who does it best.
              </h2>
            </Reveal>

            <Reveal delay={170}>
              <p
                className="
                  mt-6
                  max-w-[42ch]
                  text-lg
                  leading-relaxed
                  text-muted-foreground
                "
              >
                Describe what you’re looking for, explore relevant providers by
                industry and location, view their services and profiles, then
                connect directly.
              </p>
            </Reveal>

            <ul className="mt-10 space-y-5">
              {CUSTOMER_STEPS.map(
                ({ icon: Icon, title, detail }, index) => (
                  <Reveal
                    key={title}
                    delay={index * 70}
                    from="left"
                  >
                    <li
                      className="
                        flex
                        items-start
                        gap-4
                      "
                    >
                      <span
                        className="
                          mt-0.5
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-accent
                          text-accent-foreground
                        "
                      >
                        <Icon
                          className="h-4 w-4"
                          strokeWidth={2.1}
                        />
                      </span>

                      <span className="flex flex-col">
                        <span
                          className="
                            text-[0.9375rem]
                            font-semibold
                            tracking-[-0.01em]
                            text-foreground
                          "
                        >
                          {title}
                        </span>

                        <span
                          className="
                            mt-1
                            max-w-[36ch]
                            text-sm
                            leading-relaxed
                            text-muted-foreground
                          "
                        >
                          {detail}
                        </span>
                      </span>
                    </li>
                  </Reveal>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* =============================================================== */}
        {/* RIGHT — ONLY THE 3 REQUESTED MEDIA ASSETS                        */}
        {/* 1) 15161779_2160_3840_30fps.mp4                                 */}
        {/* 2) 9153869-hd_1080_1920_25fps.mp4                               */}
        {/* 3) B_Share.jpeg                                                  */}
        {/* =============================================================== */}

        <div className="lg:col-span-7">
          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              sm:gap-7
            "
          >
            {/* Main customer/lifestyle footage */}
            <Reveal>
              <VideoPanel
                src="/assets/19473270-uhd_2160_3840_60fps.mp4"
                className="
                  aspect-[9/14]
                  w-full
                  sm:row-span-2
                "
                rounded="rounded-[1.75rem]"
              />
            </Reveal>

            {/* Second customer footage */}
            <Reveal delay={100}>
              <VideoPanel
                src="/assets/9153869-hd_1080_1920_25fps.mp4"
                className="
                  aspect-[9/11]
                  w-full
                "
                rounded="rounded-[1.75rem]"
              />
            </Reveal>

            {/* Sport footage */}
            <Reveal delay={140}>
              <VideoPanel
                src="/assets/8693756-uhd_2160_4096_24fps.mp4"
                className="
                  aspect-[9/11]
                  w-full
                "
                rounded="rounded-[1.75rem]"
              />
            </Reveal>

            {/* Real Kaarox B_Share screenshot — full screenshot, no crop */}
            <Reveal delay={200}>
              <div className="relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-secondary shadow-[0_34px_80px_-42px_hsl(120_20%_1%/0.95)]">
                <img
                  src="/assets/B_Share.jpeg"
                  alt="Kaarox business card sharing"
                  loading="lazy"
                  className="
                    block
                    h-auto
                    w-full
                    object-contain
                  "
                />
              </div>

              <p
                className="
                  mt-3
                  text-[0.6875rem]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-muted-foreground
                "
              >
                Share your business card
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

