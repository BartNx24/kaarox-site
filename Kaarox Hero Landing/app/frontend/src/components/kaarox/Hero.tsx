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

const asset = (name: string) =>
  `${import.meta.env.BASE_URL}assets/${name}`;

const HERO_MEDIA: HeroMedia[] = [
  {
    src: asset('Recording2.mov'),
    alt: 'Kaarox app in motion',
    label: 'In motion',
    type: 'video',
  },
  {
    src: asset('P_Shared.jpeg'),
    alt: 'Share digital cards with Kaarox',
    label: 'Share',
    type: 'image',
  },
  {
    src: asset('Industries.jpeg'),
    alt: 'Discover industries and services on Kaarox',
    label: 'Discover',
    type: 'image',
  },
  {
    src: asset('Circles.jpeg'),
    alt: 'Kaarox Circles and communities',
    label: 'Circles',
    type: 'image',
  },
  {
    src: asset('PersonalCard.jpeg'),
    alt: 'Kaarox personal digital card',
    label: 'Digital card',
    type: 'image',
  },
  {
    src: asset('Booking1.jpeg'),
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
    'block h-full w-full select-none object-contain object-center';

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

  const total = HERO_MEDIA.length;

  // Automatically move to the next media item every 7 seconds.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        wrapIndex(current + 1, total)
      );
    }, 7000);

    return () => window.clearInterval(timer);
  }, [total]);

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
      aria-label="Kaarox app preview carousel"
      className="relative h-full w-full min-w-0"
    >
      {/* Soft glow stays behind the devices, not over the page copy. */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[47%]
          h-[68%]
          w-[82%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-primary/[0.13]
          blur-[80px]
          sm:h-[72%]
          sm:w-[76%]
          sm:blur-[105px]
          lg:h-[72%]
          lg:w-[82%]
          lg:blur-[125px]
        "
      />

      {/* Thin decorative halo gives the composition one clear visual center. */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[47%]
          h-[78%]
          w-[64%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-[3.25rem]
          border
          border-primary/10
          opacity-70
          sm:w-[58%]
          lg:w-[62%]
        "
      />

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
                top-[47%]
                p-0
                outline-none
                transition-[left,right,transform,opacity,width,height,filter]
                duration-[800ms]
                ease-out-expo
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-4
                focus-visible:ring-offset-background
              `,
              position === 'center' &&
                `
                  left-1/2
                  z-30
                  h-[82%]
                  w-[58%]
                  -translate-x-1/2
                  -translate-y-1/2
                  opacity-100
                  sm:h-[84%]
                  sm:w-[49%]
                  md:w-[45%]
                  lg:h-[86%]
                  lg:w-[46%]
                `,
              position === 'left' &&
                `
                  left-[4%]
                  z-10
                  h-[60%]
                  w-[37%]
                  -translate-y-1/2
                  -rotate-[5deg]
                  scale-[0.96]
                  opacity-55
                  blur-[0.25px]
                  hover:opacity-80
                  sm:left-[7%]
                  sm:h-[64%]
                  sm:w-[32%]
                  md:left-[9%]
                  md:w-[30%]
                  lg:left-[1%]
                  lg:h-[66%]
                  lg:w-[33%]
                `,
              position === 'right' &&
                `
                  right-[4%]
                  z-20
                  h-[60%]
                  w-[37%]
                  -translate-y-1/2
                  rotate-[5deg]
                  scale-[0.96]
                  opacity-55
                  blur-[0.25px]
                  hover:opacity-80
                  sm:right-[7%]
                  sm:h-[64%]
                  sm:w-[32%]
                  md:right-[9%]
                  md:w-[30%]
                  lg:right-[1%]
                  lg:h-[66%]
                  lg:w-[33%]
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
                  rounded-[2.15rem]
                  border
                  bg-[#070a08]
                  p-[5px]
                  shadow-[0_28px_80px_rgba(0,0,0,0.48)]
                  sm:rounded-[2.55rem]
                  sm:p-[6px]
                `,
                isCenter
                  ? 'border-white/15 shadow-[0_36px_100px_rgba(0,0,0,0.58),0_0_55px_rgba(53,255,52,0.09)]'
                  : 'border-white/10',
              )}
            >
              <div
                className="
                  relative
                  h-full
                  w-full
                  overflow-hidden
                  rounded-[1.85rem]
                  bg-black
                  sm:rounded-[2.2rem]
                "
              >
                <HeroMediaItem
                  item={item}
                  active={isCenter}
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.06]"
                />

                {isCenter && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4">
                    <span
                      className="
                        inline-flex
                        rounded-full
                        border
                        border-primary/20
                        bg-black/70
                        px-3
                        py-1.5
                        text-[0.58rem]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-primary
                        shadow-lg
                        backdrop-blur-xl
                        sm:text-[0.64rem]
                        sm:tracking-[0.16em]
                      "
                    >
                      {item.label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}

      {/* Carousel navigation */}
      <div
        className="
          absolute
          bottom-[1%]
          left-1/2
          z-40
          flex
          -translate-x-1/2
          items-center
          gap-2
          rounded-full
          border
          border-white/10
          bg-background/85
          px-3.5
          py-2.5
          shadow-[0_14px_34px_rgba(0,0,0,0.28)]
          backdrop-blur-xl
          sm:bottom-[1.5%]
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
              aria-current={
                active ? 'true' : undefined
              }
              onClick={() =>
                setActiveIndex(index)
              }
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
                  : 'w-2.5 bg-white/15 hover:bg-white/30',
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

      {/* Header */}
      <header className="relative z-40 mx-auto flex max-w-screen-xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-7 lg:px-12">
        <Reveal from="none" delay={0} immediate>
          <a
            href="#top"
            aria-label="Kaarox home"
            className="inline-flex items-center"
          >
            <img
              src={asset('kaarox-logo.png')}
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
          grid
          w-full
          max-w-screen-xl
          items-center
          gap-10
          px-5
          pb-14
          pt-12
          sm:gap-12
          sm:px-8
          sm:pb-20
          sm:pt-14
          lg:min-h-[790px]
          lg:grid-cols-[0.9fr_1.1fr]
          lg:gap-8
          lg:px-12
          lg:pb-20
          lg:pt-8
          xl:grid-cols-[0.86fr_1.14fr]
          xl:gap-10
        "
      >
        <div className="relative z-30 min-w-0 w-full max-w-[37rem] lg:pr-4">
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
              <span className="min-w-0 break-words">
                Now on iPhone
              </span>
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
                lg:text-[clamp(4.7rem,5.8vw,6.7rem)]
              "
            >
              Connect.
              <br />
              Discover.
              <br />
              <span className="text-primary">
                Grow.
              </span>
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
              Kaarox brings services, professionals
              and opportunities into one connected
              place. Discover what you need, connect
              with the people behind it, and build
              relationships that go further.
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
                <li
                  key={item}
                  className="flex min-w-0 items-start gap-2"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/70" />

                  <span className="min-w-0 break-words">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal
          from="none"
          delay={240}
          immediate
        >
          <div
            className="
              relative
              z-20
              mx-auto
              h-[470px]
              w-full
              max-w-[640px]
              sm:h-[590px]
              md:h-[650px]
              lg:h-[690px]
              lg:max-w-[720px]
              xl:h-[720px]
            "
          >
            <HeroScreenshots />
          </div>
        </Reveal>
      </div>

      <div
        aria-hidden="true"
        className="hairline relative z-30 mx-auto h-px max-w-screen-xl"
      />
    </section>
  );
}
