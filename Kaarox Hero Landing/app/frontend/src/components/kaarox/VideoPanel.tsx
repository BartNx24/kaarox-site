import {
  CalendarCheck,
  Compass,
  Layers,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

import { VideoPanel } from './VideoPanel';
import { SearchPanel } from './UIPanels';
import { Reveal } from './Motion';

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
  return (
    <section
      aria-label="Whatever you’re looking for, start with Kaarox"
      className="relative isolate border-t border-border"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] top-1/2 -z-10 h-[65%] w-[50%] -translate-y-1/2 rounded-full bg-primary/[0.035] blur-[120px]"
      />

      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 items-center gap-16 px-6 py-24 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12 lg:py-32">
        {/* LEFT — all copy is visible immediately. */}
        <div className="relative z-30 min-w-0 lg:col-span-5 lg:pr-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_30%_50%,hsl(var(--background)/0.98)_0%,hsl(var(--background)/0.94)_48%,hsl(var(--background)/0.72)_68%,transparent_88%)]"
          />

          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              One place to start
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-5 max-w-[18ch] text-balance text-foreground">
              Whatever you’re looking for, start with{' '}
              <span className="text-primary">Kaarox</span>.
            </h2>
          </Reveal>

          {/* All industries are visible at the same time — no scroll staging. */}
          <div className="mt-9 flex flex-wrap gap-x-4 gap-y-3">
            {INDUSTRY_LINES.map((line, index) => (
              <span
                key={line}
                className={
                  index % 2 === 0
                    ? 'text-[clamp(1.6rem,3vw,2.5rem)] font-bold leading-none tracking-[-0.04em] text-foreground/80'
                    : 'kx-glow-text text-[clamp(1.6rem,3vw,2.5rem)] font-bold leading-none tracking-[-0.04em] text-primary'
                }
              >
                {line}
              </span>
            ))}
          </div>

          <Reveal delay={160}>
            <p className="mt-7 max-w-[42ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              Whatever you’re looking for, Kaarox helps you discover relevant
              people, services and opportunities in one connected place.
            </p>
          </Reveal>
        </div>

        {/* RIGHT — every media item is present immediately. */}
        <div className="relative z-10 min-w-0 lg:col-span-7 lg:pl-3">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {MEDIA.map((item) => (
              <div key={item.src} className="min-w-0">
                <VideoPanel
                  src={item.src}
                  scrim="soft"
                  rounded="rounded-[1.35rem] sm:rounded-[1.75rem]"
                  className="aspect-[9/14] w-full"
                />

                <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-7 w-full max-w-[20rem]">
            <SearchPanel />
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
    detail: 'Find providers that match what you need.',
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
    detail: 'Message providers directly when you’re ready.',
  },
  {
    icon: CalendarCheck,
    title: 'Book',
    detail: 'Request appointments with participating professionals.',
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
      className="relative border-t border-border bg-[hsl(120_9%_4.5%)]"
    >
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-14 px-6 py-24 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-32">
        {/* LEFT — no sticky scroll behaviour. */}
        <div className="lg:col-span-5">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              For customers
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h2 className="mt-5 text-balance text-foreground">
              Find what you need.
              <br />
              Find who does it best.
            </h2>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-muted-foreground">
              Describe what you’re looking for, explore relevant providers by
              industry and location, view their services and profiles, then
              connect directly.
            </p>
          </Reveal>

          <ul className="mt-10 space-y-5">
            {CUSTOMER_STEPS.map(({ icon: Icon, title, detail }, index) => (
              <Reveal key={title} delay={index * 70} from="left">
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="h-4 w-4" strokeWidth={2.1} />
                  </span>

                  <span className="flex flex-col">
                    <span className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-foreground">
                      {title}
                    </span>

                    <span className="mt-1 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
                      {detail}
                    </span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* RIGHT — all media is visible without waiting for scroll. */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
            <VideoPanel
              src="/assets/19473270-uhd_2160_3840_60fps.mp4"
              className="aspect-[9/14] w-full sm:row-span-2"
              rounded="rounded-[1.75rem]"
            />

            <VideoPanel
              src="/assets/9153869-hd_1080_1920_25fps.mp4"
              className="aspect-[9/11] w-full"
              rounded="rounded-[1.75rem]"
            />

            <VideoPanel
              src="/assets/8693756-uhd_2160_4096_24fps.mp4"
              className="aspect-[9/11] w-full"
              rounded="rounded-[1.75rem]"
            />

            <div>
              <div className="relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-secondary shadow-[0_34px_80px_-42px_hsl(120_20%_1%/0.95)]">
                <img
                  src="/assets/B_Share.jpeg"
                  alt="Kaarox business card sharing"
                  loading="eager"
                  className="block h-auto w-full object-contain"
                />
              </div>

              <p className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Share your business card
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
