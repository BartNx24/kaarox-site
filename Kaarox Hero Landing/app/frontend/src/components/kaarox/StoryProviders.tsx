import { cn } from '@/lib/utils';
import { VideoPanel } from './VideoPanel';
import {
  BookingPanel,
  DigitalCardPanel,
  MarketplacePanel,
  MessagePanel,
  SharePanel,
} from './UIPanels';
import { Reveal, useParallax, usePrefersReducedMotion, useScrollProgress } from './Motion';

/**
 * Chapters three, five, six and seven of the scroll story.
 *
 * Provider media paths below use the real files present in public/assets so the
 * service-provider chapter renders locally and in the production build.
 *
 * Each chapter also uses a different motion idea so the page never settles into
 * one repeated fade.
 */

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const range = (value: number, from: number, to: number) => clamp01((value - from) / (to - from));

/* -------------------------------------------------------------------------- */
/* Section 3 — For service providers                                          */
/* -------------------------------------------------------------------------- */

const PROVIDER_BEATS = [
  {
    src: '/assets/7383845-uhd_2160_3840_24fps.mp4',
    word: 'Your craft.',
    title: 'Show what you do.',
    detail:
      'Create a digital business card with your professional information, services and contact details.',
    panel: 'card' as const,
  },
  {
    src: '/assets/7019386-uhd_2160_4096_25fps.mp4',
    word: 'Your expertise.',
    title: 'Reach relevant people.',
    detail: 'Help users discover your business through industry and location.',
    panel: 'marketplace' as const,
  },
  {
    src: '/assets/7423511-uhd_2160_3840_30fps.mp4',
    word: 'Your business.',
    title: 'Turn discovery into connection.',
    detail: 'Receive enquiries, messages and booking requests from interested users.',
    panel: 'booking' as const,
  },
  {
    src: '/assets/8470010-uhd_2160_3840_25fps.mp4',
    word: 'Your reach.',
    title: 'Stay visible.',
    detail: 'Share your card and use eligible visibility tools to extend your reach.',
    panel: 'share' as const,
  },
];

/** The product panel that belongs to a given beat. */
function BeatPanel({ kind }: { kind: (typeof PROVIDER_BEATS)[number]['panel'] }) {
  if (kind === 'card') return <DigitalCardPanel />;
  if (kind === 'marketplace') return <MarketplacePanel />;
  if (kind === 'booking') return <BookingPanel />;
  return <SharePanel />;
}

/** One provider beat: footage on one side, messaging opposite it. */
function ProviderBeat({
  beat,
  flipped,
}: {
  beat: (typeof PROVIDER_BEATS)[number];
  flipped: boolean;
}) {
  const { ref, offset } = useParallax<HTMLDivElement>(44);
  const reduced = usePrefersReducedMotion();
  const shift = reduced ? 0 : offset;

  return (
    <div
      ref={ref}
      className={cn(
        'relative grid grid-cols-1 items-center gap-9 lg:grid-cols-12 lg:gap-10',
        flipped && 'lg:[&>*:first-child]:order-2',
      )}
    >
      {/* Media column — the oversized word stays inside this column. */}
      <div className="relative lg:col-span-6">
        <span
          aria-hidden="true"
          style={{ transform: `translate3d(0, ${shift * -0.55}px, 0)` }}
          className={cn(
            'pointer-events-none absolute top-1/2 z-0 hidden -translate-y-1/2 whitespace-nowrap font-bold leading-none',
            'tracking-[-0.05em] text-foreground/[0.07] text-[clamp(3rem,6vw,5.5rem)] will-change-transform lg:block',
            flipped ? 'right-[-4%]' : 'left-[-4%]',
          )}
        >
          {beat.word}
        </span>

        <Reveal from={flipped ? 'right' : 'left'}>
          <div className="relative mx-auto w-full max-w-[24rem] lg:max-w-none">
            <VideoPanel
              src={beat.src}
              style={{ transform: `translate3d(0, ${shift * -0.16}px, 0)` }}
              className="relative z-10 aspect-[9/12] w-full will-change-transform"
              rounded="rounded-[1.75rem]"
            />

            {/* A real Kaarox panel anchored to the footage, not over the copy. */}
            <div
              aria-hidden="true"
              className={cn(
                'absolute bottom-5 z-20 w-[62%] max-w-[15rem]',
                flipped ? 'right-[-6%]' : 'left-[-6%]',
              )}
            >
              <BeatPanel kind={beat.panel} />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Text column — separate grid cell, never overlapped. */}
      <div className={cn('relative z-10 lg:col-span-6', flipped ? 'lg:pr-6' : 'lg:pl-6')}>
        <Reveal delay={120} from={flipped ? 'left' : 'right'}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary lg:hidden">
            {beat.word}
          </span>
          <h3 className="mt-3 max-w-[24ch] text-[clamp(1.5rem,2.4vw,2.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-foreground lg:mt-0">
            {beat.title}
          </h3>
          <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {beat.detail}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

export function ForProvidersSection() {
  return (
    <section
      aria-label="For service providers"
      className="relative overflow-x-clip border-t border-border bg-[hsl(120_10%_3%)]"
    >
      <div className="mx-auto max-w-screen-xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="max-w-[46rem]">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              For service providers
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h2 className="mt-5 text-balance text-foreground">
              Your work deserves
              <br />
              to be <span className="text-primary">discovered</span>.
            </h2>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
              Build your professional presence on Kaarox, present what you offer and make it easier
              for the right people to find and contact you.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-24 lg:mt-24 lg:space-y-32">
          {PROVIDER_BEATS.map((beat, index) => (
            <ProviderBeat key={beat.title} beat={beat} flipped={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 5 — Connection is bigger than business                             */
/* -------------------------------------------------------------------------- */

const CIRCLE_CARDS = [
  {
    title: 'Posts',
    detail: 'Share updates and discover what people in your network are talking about.',
    media: '/assets/Recording3.mov',
    mediaType: 'video' as const,
  },
  {
    title: 'Hubs',
    detail: 'Connect around industries, activities and shared interests.',
    media: '/assets/Circles.jpeg',
    mediaType: 'image' as const,
  },
];

export function CommunitySection() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const reduced = usePrefersReducedMotion();
  const p = reduced ? 1 : progress;

  return (
    <section
      ref={ref}
      aria-label="Connection is bigger than business"
      className="relative border-t border-border lg:h-[190vh]"
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:items-center lg:overflow-hidden">
        {/* Footage sits behind everything and is heavily scrimmed, so the copy
            reads against a near-solid dark field rather than moving imagery. */}
        <VideoPanel
          src="/assets/10071335-uhd_2160_4096_25fps.mp4"
          scrim="strong"
          rounded="rounded-none"
          className="absolute inset-0 h-full w-full opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60"
        />

        <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 py-24 sm:px-8 lg:px-12 lg:py-0">
          <div className="max-w-[42rem]">
            <Reveal>
              <h2 className="text-balance text-foreground">
                Find a service.
                <br />
                Join a conversation.
                <br />
                Build a <span className="text-primary">circle</span>.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                Kaarox isn’t only about finding a provider. Posts, hubs, messaging and shared
                interests give people more ways to connect around what matters to them.
              </p>
            </Reveal>
          </div>

          {/* Large, safe-area community cards.
              Text is kept inside the card and is always visible; only the card's
              entrance position moves slightly with scroll. */}
          <div className="mx-auto mt-10 grid w-full max-w-[70rem] grid-cols-1 gap-7 md:grid-cols-2 lg:mt-12 lg:gap-8">
            {CIRCLE_CARDS.map((card, index) => {
              const t = range(p, 0.08 + index * 0.10, 0.30 + index * 0.10);
              const lift = reduced ? 0 : (1 - t) * 34;

              return (
                <div
                  key={card.title}
                  style={{
                    opacity: 1,
                    transform: `translate3d(0, ${lift}px, 0)`,
                  }}
                  className="
                    relative
                    min-w-0
                    overflow-hidden
                    rounded-[2rem]
                    border
                    border-border/80
                    bg-card/95
                    shadow-[0_32px_80px_-44px_rgba(0,0,0,0.95)]
                    backdrop-blur-xl
                    transition-transform
                    duration-700
                    ease-out-expo
                    will-change-transform
                  "
                >
                  {/* Media stays large, but its height is capped so the writing
                      remains visible inside the viewport/safe area. */}
                  <div className="relative h-[19rem] overflow-hidden bg-secondary sm:h-[22rem] lg:h-[24rem]">
                    {card.mediaType === 'video' ? (
                      <video
                        src={card.media}
                        muted
                        loop
                        autoPlay
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <img
                        src={card.media}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover object-top"
                      />
                    )}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/90 to-transparent"
                    />
                  </div>

                  {/* Always-visible copy */}
                  <div className="relative z-20 px-6 pb-7 pt-5 sm:px-7 sm:pb-8">
                    <h3 className="text-2xl font-semibold tracking-[-0.025em] text-card-foreground lg:text-[1.8rem]">
                      {card.title}
                    </h3>

                    <p className="mt-3 max-w-[38ch] text-base leading-relaxed text-muted-foreground lg:text-[1.05rem]">
                      {card.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 6 — Different worlds, one Kaarox experience                        */
/* -------------------------------------------------------------------------- */

/**
 * Six real media files from public/assets.
 * Scroll progress is divided into six equal stages so every media item gets a
 * clear focus point before the sticky section releases.
 */
const MONTAGE = [
  {
    src: '/assets/9314158-uhd_2160_3840_25fps.mp4',
    label: 'Home & outdoor services',
    shortLabel: 'LOCAL SERVICES',
  },
  {
    src: '/assets/10071335-uhd_2160_4096_25fps.mp4',
    label: 'Hospitality & social experiences',
    shortLabel: 'HOSPITALITY',
  },
  {
    src: '/assets/7019386-uhd_2160_4096_25fps.mp4',
    label: 'Automotive specialists',
    shortLabel: 'AUTOMOTIVE',
  },
  {
    src: '/assets/15161779_2160_3840_30fps.mp4',
    label: 'Events & experiences',
    shortLabel: 'EVENTS',
  },
  {
    src: '/assets/13790629-uhd_2160_3840_24fps.mp4',
    label: 'Outdoor recreation & activities',
    shortLabel: 'OUTDOOR',
  },
  {
    src: '/assets/10340703-uhd_2160_4096_25fps.mp4',
    label: 'Sports, coaching & racquet activities',
    shortLabel: 'SPORT',
  },
] as const;

export function IndustriesSection() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const reduced = usePrefersReducedMotion();

  /**
   * Give each media item an equal scroll segment.
   * Example with six items:
   * 0–1/6   => Local services
   * 1/6–2/6 => Hospitality
   * ...
   * 5/6–1   => Sport
   *
   * This prevents the sticky section from releasing before the final clip has
   * had its own focus interval.
   */
  // Reserve a small lead-in and lead-out so the sticky section does not
  // release while a media stage is still changing.
  const rawProgress = Math.min(1, Math.max(0, reduced ? 0.5 : progress));
  const stageProgress = reduced
    ? 0.5
    : Math.min(0.9999, Math.max(0, (rawProgress - 0.04) / 0.90));

  const segment = 1 / MONTAGE.length;
  const focusIndex = Math.min(
    MONTAGE.length - 1,
    Math.floor(stageProgress / segment),
  );

  const segmentStart = focusIndex * segment;
  const segmentProgress = reduced
    ? 0.5
    : Math.min(
        1,
        Math.max(
          0,
          (stageProgress - segmentStart) / segment,
        ),
      );

  return (
    <section
      ref={ref}
      aria-label="Different worlds, one Kaarox experience"
      className="
        relative
        isolate
        border-t
        border-border
        bg-[hsl(120_9%_4%)]
        lg:h-[380vh]
      "
    >
      <div
        className="
          relative
          lg:sticky
          lg:top-0
          lg:flex
          lg:h-screen
          lg:min-h-0
          lg:items-center
          lg:justify-center
          lg:overflow-hidden
        "
      >
        {/* Subtle atmosphere — always behind both copy and media. */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-[8%]
            top-1/2
            -z-10
            h-[60%]
            w-[55%]
            -translate-y-1/2
            rounded-full
            bg-primary/[0.035]
            blur-[130px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            w-full
            max-w-screen-xl
            px-6
            py-16
            sm:px-8
            lg:px-12
            lg:py-4
          "
        >
          {/* ============================================================= */}
          {/* SAFE TEXT AREA                                                */}
          {/* ============================================================= */}

          <div className="relative z-40 max-w-[47rem]">
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -inset-x-8
                -inset-y-7
                -z-10
                rounded-[3rem]
                bg-[radial-gradient(circle_at_left,hsl(var(--background)/1)_0%,hsl(var(--background)/0.98)_50%,hsl(var(--background)/0.8)_72%,transparent_94%)]
              "
            />

            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Across everyday life
              </span>
            </Reveal>

            <Reveal delay={70}>
              <h2 className="mt-4 max-w-[18ch] text-balance text-foreground">
                Different worlds.
                <br />
                One place to{' '}
                <span className="text-primary">
                  connect them
                </span>
                .
              </h2>
            </Reveal>

            <Reveal delay={130}>
              <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                From local and outdoor services to hospitality, automotive specialists,
                events, recreation and sports, Kaarox helps people discover relevant
                providers, activities and opportunities through one connected experience.
              </p>
            </Reveal>
          </div>

          {/* ============================================================= */}
          {/* SIX MEDIA WINDOWS                                             */}
          {/* ============================================================= */}

          <div
            className="
              relative
              z-10
              mt-7
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:mt-7
              lg:grid-cols-6
              lg:gap-3
            "
          >
            {MONTAGE.map((item, index) => {
              const active = index === focusIndex;

              /*
               * The active window gets a small controlled lift and scale.
               * Other windows remain visible, so the section never becomes a
               * row of nearly-black placeholders.
               */
              const activeScale = reduced ? 1 : active ? 1.035 : 0.975;
              const activeLift =
                reduced || !active
                  ? 0
                  : -8 - Math.sin(segmentProgress * Math.PI) * 4;

              return (
                <div
                  key={item.src}
                  className="
                    relative
                    min-w-0
                    overflow-hidden
                    rounded-[1.5rem]
                    border
                    border-border/80
                    bg-card
                    shadow-[0_24px_60px_-42px_rgba(0,0,0,0.95)]
                  "
                  style={{
                    opacity: active ? 1 : 0.62,
                    transform: `translate3d(0, ${activeLift}px, 0) scale(${activeScale})`,
                    transition:
                      'opacity 420ms ease, transform 560ms cubic-bezier(0.22,1,0.36,1)',
                    zIndex: active ? 3 : 1,
                  }}
                >
                  <VideoPanel
                    src={item.src}
                    playing={reduced ? false : active}
                    scrim="none"
                    rounded="rounded-none"
                    className="
                      h-[20rem]
                      w-full
                      sm:h-[22rem]
                      lg:h-[32vh]
                      xl:h-[34vh]
                    "
                  />

                  {/* Permanent gradient ensures the label always stays readable. */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-x-0
                      bottom-0
                      h-36
                      bg-gradient-to-t
                      from-black/95
                      via-black/55
                      to-transparent
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      z-20
                      p-4
                      lg:p-3
                      xl:p-4
                    "
                  >
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-primary xl:text-[0.65rem]">
                      {item.shortLabel}
                    </span>

                    <p className="mt-1.5 text-sm font-semibold leading-snug text-white xl:text-base">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============================================================= */}
          {/* ACTIVE STAGE / SCROLL POSITION                                */}
          {/* ============================================================= */}

          <div
            aria-live="polite"
            className="
              relative
              z-40
              mx-auto
              mt-3
              flex
              max-w-[46rem]
              flex-col
              items-center
              justify-center
              gap-2
              text-center
            "
          >
            <span className="kx-glow-text text-sm font-bold uppercase tracking-[0.24em] text-primary sm:text-base">
              {MONTAGE[focusIndex].shortLabel}
            </span>

            {/* Six progress marks make the stopping points obvious. */}
            <div
              aria-hidden="true"
              className="flex items-center justify-center gap-2"
            >
              {MONTAGE.map((item, index) => (
                <span
                  key={item.shortLabel}
                  className={
                    index === focusIndex
                      ? 'h-1 w-8 rounded-full bg-primary transition-all duration-300'
                      : 'h-1 w-3 rounded-full bg-border transition-all duration-300'
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 7 — Technology, kept short and atmospheric                         */
/* -------------------------------------------------------------------------- */

export function TechnologySection() {
  return (
    <section aria-label="Built around relevance" className="relative border-t border-border">
      <div className="relative isolate overflow-hidden">
        <VideoPanel
          src="/assets/clip-technology.mp4"
          scrim="strong"
          rounded="rounded-none"
          className="absolute inset-0 h-full w-full opacity-30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,hsl(120_10%_4%/0.72),hsl(120_10%_4%/0.96))]"
        />

        <div className="relative mx-auto max-w-screen-xl px-6 py-28 text-center sm:px-8 lg:px-12 lg:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-[30ch] text-balance text-foreground">
              Built around relevance.
              <br />
              Designed around <span className="text-primary">people</span>.
            </h2>
          </Reveal>

          <Reveal delay={130}>
            <p className="mx-auto mt-7 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              Technology should make connection easier, not more complicated. Kaarox brings
              discovery, professional identity and communication together in one experience.
            </p>
          </Reveal>

          <Reveal delay={210}>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-2">
              <MessagePanel />
              <SharePanel />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}