import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { AppStoreButton } from './AppStoreButton';
import { Reveal } from './Motion';

const CAPABILITIES = [
  'Digital business cards',
  'Service discovery',
  'Posts and hubs',
  'Bookings',
  'Marketplace listings',
];

type HeroMedia = {
  src: string;
  alt: string;
  label: string;
  type: 'image' | 'video';
};

const HERO_MEDIA: HeroMedia[] = [
  {
    src: '/assets/Recording2.mov',
    alt: 'Kaarox app in motion',
    label: 'In motion',
    type: 'video',
  },
  {
    src: '/assets/P_Shared.jpeg',
    alt: 'Share digital cards with Kaarox',
    label: 'Share',
    type: 'image',
  },
  {
    src: '/assets/Industries.jpeg',
    alt: 'Discover industries and services on Kaarox',
    label: 'Discover',
    type: 'image',
  },
  {
    src: '/assets/Circles.jpeg',
    alt: 'Kaarox Circles and communities',
    label: 'Circles',
    type: 'image',
  },
  {
    src: '/assets/PersonalCard.jpeg',
    alt: 'Kaarox personal digital card',
    label: 'Digital card',
    type: 'image',
  },
  {
    src: '/assets/Booking1.jpeg',
    alt: 'Book services through Kaarox',
    label: 'Bookings',
    type: 'image',
  },
];

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function HeroMediaItem({
  item,
  active,
}: {
  item: HeroMedia;
  active: boolean;
}) {
  const mediaClassName =
    'block h-full w-full rounded-[1.7rem] object-contain object-center sm:rounded-[2rem] lg:rounded-[2.6rem]';

  if (item.type === 'video') {
    return (
      <video
        src={item.src}
        muted
        loop
        playsInline
        autoPlay={active}
        preload="metadata"
        aria-label={item.alt}
        className={mediaClassName}
      />
    );
  }

  return (
    <img
      src={item.src}
      alt={item.alt}
      draggable={false}
      loading={active ? 'eager' : 'lazy'}
      className={mediaClassName}
    />
  );
}

function HeroScreenshots() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = HERO_MEDIA.length;

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1, total));
    }, 6500);

    return () => window.clearInterval(timer);
  }, [paused, total]);

  const visible = useMemo(
    () => [
      {
        index: wrapIndex(activeIndex - 1, total),
        position: 'left' as const,
      },
      {
        index: activeIndex,
        position: 'center' as const,
      },
      {
        index: wrapIndex(activeIndex + 1, total),
        position: 'right' as const,
      },
    ],
    [activeIndex, total],
  );

  return (
    <div
      aria-label="Kaarox automatic app carousel"
      className="relative h-full w-full min-w-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Glow follows the carousel instead of covering the text on phones. */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[72%]
          w-[88%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-primary/[0.10]
          blur-[72px]
          sm:w-[76%]
          sm:blur-[95px]
          lg:left-[58%]
          lg:h-[78%]
          lg:w-[72%]
          lg:blur-[125px]
        "
      />

      {/*
        Mobile/tablet: the cards are centered inside their own block below the
        copy, so they can never sit on top of the heading or paragraph.
        Desktop: the original wider three-card composition is restored.
      */}
      {visible.map(({ index, position }) => {
        const item = HERO_MEDIA[index];
        const isCenter = position === 'center';

        return (
          <button
            key={`${position}-${item.src}`}
            type="button"
            aria-label={
              isCenter
                ? `${item.label}, current slide`
                : `Show ${item.label}`
            }
            onClick={() => setActiveIndex(index)}
            className={cn(
              `
                absolute
                top-1/2
                overflow-visible
                bg-transparent
                p-0
                outline-none
                drop-shadow-[0_24px_42px_rgba(0,0,0,0.42)]
                transition-[left,right,transform,opacity,width,height,filter]
                duration-[850ms]
                ease-out-expo
                focus-visible:ring-2
                focus-visible:ring-primary
                lg:drop-shadow-[0_38px_70px_rgba(0,0,0,0.55)]
                lg:duration-[1100ms]
              `,
              position === 'center' &&
                `
                  left-1/2
                  z-20
                  h-[86%]
                  w-[64%]
                  -translate-x-1/2
                  -translate-y-1/2
                  opacity-100
                  sm:h-[88%]
                  sm:w-[52%]
                  md:w-[46%]
                  lg:left-[58%]
                  lg:h-[80%]
                  lg:w-[38%]
                `,
              position === 'left' &&
                `
                  left-[1%]
                  z-10
                  h-[68%]
                  w-[43%]
                  -translate-y-1/2
                  -rotate-[3deg]
                  opacity-45
                  sm:left-[6%]
                  sm:h-[72%]
                  sm:w-[35%]
                  md:left-[10%]
                  md:w-[31%]
                  lg:left-[22%]
                  lg:h-[66%]
                  lg:w-[30%]
                  lg:-rotate-[4deg]
                  lg:opacity-60
                  lg:blur-[0.4px]
                `,
              position === 'right' &&
                `
                  right-[1%]
                  z-10
                  h-[68%]
                  w-[43%]
                  -translate-y-1/2
                  rotate-[3deg]
                  opacity-45
                  sm:right-[6%]
                  sm:h-[72%]
                  sm:w-[35%]
                  md:right-[10%]
                  md:w-[31%]
                  lg:right-[1%]
                  lg:h-[66%]
                  lg:w-[30%]
                  lg:rotate-[4deg]
                  lg:opacity-60
                  lg:blur-[0.4px]
                `,
            )}
          >
            <div
              className={cn(
                `
                  relative
                  h-full
                  w-full
                  overflow-hidden
                  rounded-[1.7rem]
                  bg-transparent
                  sm:rounded-[2rem]
                  lg:rounded-[2.6rem]
                `,
                !isCenter && 'opacity-90',
              )}
            >
              <HeroMediaItem item={item} active={isCenter} />

              {isCenter && (
                <div className="absolute inset-x-0 bottom-0 z-10 p-2.5 text-center sm:p-4 sm:text-left">
                  <span
                    className="
                      inline-flex
                      max-w-full
                      rounded-full
                      border
                      border-primary/20
                      bg-black/60
                      px-3
                      py-1.5
                      text-[0.58rem]
                      font-semibold
                      uppercase
                      tracking-[0.13em]
                      text-primary
                      backdrop-blur-xl
                      sm:px-3.5
                      sm:text-[0.65rem]
                      sm:tracking-[0.16em]
                    "
                  >
                    {item.label}
                  </span>
                </div>
              )}
            </div>
          </button>
        );
      })}

      {/* Navigation stays centered on phones and moves with the desktop layout. */}
      <div
        className="
          absolute
          bottom-0
          left-1/2
          z-30
          flex
          -translate-x-1/2
          items-center
          gap-2
          rounded-full
          border
          border-border/80
          bg-background/80
          px-3
          py-2
          backdrop-blur-xl
          sm:bottom-[1%]
          sm:py-2.5
          lg:bottom-[5%]
          lg:left-[58%]
        "
        aria-label="Carousel navigation"
      >
        {HERO_MEDIA.map((item, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={item.src}
              type="button"
              aria-label={`Show ${item.label}`}
              aria-current={active ? 'true' : undefined}
              onClick={() => setActiveIndex(index)}
              className={cn(
                `
                  h-1.5
                  rounded-full
                  transition-all
                  duration-500
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                `,
                active
                  ? 'w-8 bg-primary'
                  : 'w-2.5 bg-border hover:bg-muted-foreground/60',
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="page-aura pointer-events-none absolute inset-0 -z-20"
      />

      {/*
        Desktop only: keep the cinematic carousel behind/alongside the copy.
        On phones and tablets the carousel is rendered in normal document flow
        below the text, which removes the text/media collision completely.
      */}
      <div
        aria-hidden="false"
        className="
          pointer-events-auto
          absolute
          inset-x-0
          top-[72px]
          z-0
          hidden
          h-[820px]
          lg:block
        "
      >
        <div className="mx-auto h-full w-full max-w-[1500px]">
          <HeroScreenshots />
        </div>
      </div>

      {/* Desktop readability gradient only. It no longer covers mobile media. */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          z-10
          hidden
          w-[67%]
          bg-[linear-gradient(90deg,hsl(var(--background))_0%,hsl(var(--background)/0.98)_32%,hsl(var(--background)/0.82)_52%,hsl(var(--background)/0.34)_70%,transparent_100%)]
          lg:block
        "
      />

      {/* Header */}
      <header className="relative z-40 mx-auto flex max-w-screen-xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-7 lg:px-12">
        <Reveal from="none" delay={0} immediate>
          <a
            href="#top"
            aria-label="Kaarox home"
            className="inline-flex items-center"
          >
            <img
              src="/assets/kaarox-logo.png"
              alt="Kaarox"
              className="brand-mark h-10 max-w-[150px] object-contain sm:h-12 sm:max-w-none"
            />
          </a>
        </Reveal>

        <Reveal from="none" delay={90} immediate>
          <a
            href="#download"
            className="
              hidden
              rounded-full
              border
              border-border
              bg-background/65
              px-5
              py-2.5
              text-sm
              font-semibold
              text-foreground
              backdrop-blur-xl
              transition-colors
              hover:border-primary
              hover:text-primary
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:ring-offset-2
              focus-visible:ring-offset-background
              sm:inline-flex
            "
          >
            Get the app
          </a>
        </Reveal>
      </header>

      <div
        className="
          relative
          z-30
          mx-auto
          w-full
          max-w-screen-xl
          px-5
          pb-16
          pt-12
          sm:px-8
          sm:pb-20
          sm:pt-14
          lg:flex
          lg:min-h-[790px]
          lg:items-center
          lg:px-12
          lg:pb-24
          lg:pt-12
        "
      >
        <div className="relative z-30 min-w-0 w-full max-w-[38rem] lg:w-[48%]">
          <Reveal delay={120} immediate>
            <span
              className="
                inline-flex
                max-w-full
                items-center
                gap-2.5
                rounded-full
                border
                border-border
                bg-background/80
                px-3.5
                py-1.5
                text-[0.68rem]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-muted-foreground
                backdrop-blur-xl
                sm:px-4
                sm:text-xs
                sm:tracking-[0.16em]
              "
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="min-w-0 break-words">Now on iPhone</span>
            </span>
          </Reveal>

          <Reveal delay={200} immediate>
            <h1
              className="
                mt-6
                max-w-full
                break-words
                text-[clamp(3rem,15vw,4.75rem)]
                font-semibold
                leading-[0.92]
                tracking-[-0.045em]
                text-foreground
                sm:text-[clamp(4rem,10vw,6rem)]
                sm:leading-[0.9]
                lg:text-[clamp(4.8rem,6.4vw,7rem)]
              "
            >
              Connect.
              <br />
              Discover.
              <br />
              <span className="text-primary">Grow.</span>
            </h1>
          </Reveal>

          <Reveal delay={280} immediate>
            <p
              className="
                mt-6
                w-full
                max-w-[36ch]
                break-words
                text-base
                leading-7
                text-muted-foreground
                sm:mt-7
                sm:text-xl
                sm:leading-relaxed
              "
            >
              Kaarox brings services, professionals and opportunities into one
              connected place. Discover what you need, connect with the people
              behind it, and build relationships that go further.
            </p>
          </Reveal>

          <Reveal delay={360} immediate>
            <div className="mt-7 max-w-full sm:mt-9">
              <AppStoreButton />
            </div>
          </Reveal>

          <Reveal delay={440} immediate>
            <ul
              className="
                mt-8
                flex
                max-w-full
                flex-wrap
                gap-x-5
                gap-y-3
                text-sm
                font-medium
                leading-5
                text-muted-foreground
                sm:mt-10
                sm:gap-x-6
              "
            >
              {CAPABILITIES.map((item) => (
                <li key={item} className="flex min-w-0 items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Phone/tablet carousel: completely separate from the text. */}
        <div
          className="
            relative
            z-20
            mx-auto
            mt-10
            h-[430px]
            w-full
            max-w-[620px]
            sm:mt-12
            sm:h-[560px]
            md:h-[620px]
            lg:hidden
          "
        >
          <HeroScreenshots />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="hairline relative z-30 mx-auto h-px max-w-screen-xl"
      />
    </section>
  );
}
