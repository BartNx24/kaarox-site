import type { CSSProperties, ReactNode } from 'react';
import {
  Calendar,
  Check,
  MessageCircle,
  Search,
  Share2,
  Store,
} from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Kaarox UI panels.
 *
 * These panels intentionally avoid external image/media assets.
 * They use typography, icons and simple interface elements only,
 * which prevents missing poster/screenshot files from creating
 * broken media boxes on the production website.
 */

const LABEL =
  'text-[clamp(0.5rem,1.05vw,0.625rem)] font-semibold uppercase tracking-[0.16em] text-muted-foreground';

const TITLE =
  'text-[clamp(0.75rem,1.5vw,0.9375rem)] font-semibold tracking-[-0.01em] text-card-foreground';

const BODY =
  'text-[clamp(0.625rem,1.25vw,0.8125rem)] leading-snug text-muted-foreground';

type PanelProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  glow?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Shared panel                                                               */
/* -------------------------------------------------------------------------- */

export function Panel({
  children,
  className,
  style,
  glow = false,
}: PanelProps) {
  return (
    <div
      style={style}
      className={cn(
        `
          relative
          rounded-2xl
          border
          border-border/90
          bg-card/95
          p-[clamp(0.625rem,1.4vw,1rem)]
          shadow-[0_34px_64px_-34px_hsl(120_20%_1%/0.95)]
          backdrop-blur-xl
        `,
        className,
      )}
    >
      {glow && (
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -inset-5
            -z-10
            rounded-[2rem]
            bg-primary/[0.1]
            blur-2xl
          "
        />
      )}

      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Search                                                                     */
/* -------------------------------------------------------------------------- */

export function SearchPanel({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const results = [
    'Beauty',
    'Sport coaching',
  ];

  return (
    <Panel
      className={className}
      style={style}
      glow
    >
      <div
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-border/80
          bg-secondary/80
          px-2.5
          py-2
        "
      >
        <Search
          className="
            h-[clamp(0.75rem,1.5vw,0.9375rem)]
            w-[clamp(0.75rem,1.5vw,0.9375rem)]
            shrink-0
            text-primary
          "
          strokeWidth={2.3}
        />

        <span
          className="
            truncate
            text-[clamp(0.625rem,1.3vw,0.8125rem)]
            font-medium
            text-foreground
          "
        >
          What are you looking for?
        </span>
      </div>

      <ul className="mt-3 space-y-2">
        {results.map((industry) => (
          <li
            key={industry}
            className="
              flex
              items-center
              gap-2.5
              rounded-xl
              border
              border-border/60
              bg-secondary/45
              px-3
              py-2.5
            "
          >
            <span
              aria-hidden="true"
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-primary
              "
            />

            <span
              className={cn(
                'block truncate',
                TITLE,
              )}
            >
              {industry}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */
/* Digital card                                                               */
/* -------------------------------------------------------------------------- */

export function DigitalCardPanel({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Panel
      className={className}
      style={style}
      glow
    >
      <div className="flex items-center gap-3">
        <span
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-primary/25
            bg-primary/10
          "
        >
          <span
            className="
              text-sm
              font-bold
              text-primary
            "
          >
            K
          </span>
        </span>

        <span className="min-w-0 flex-1">
          <span className={LABEL}>
            Digital card
          </span>

          <span
            className={cn(
              'mt-1 block truncate',
              TITLE,
            )}
          >
            Your professional profile
          </span>
        </span>
      </div>

      <p
        className={cn(
          'mt-3 line-clamp-2',
          BODY,
        )}
      >
        Industry, location, services and contact
        details — in one shareable card.
      </p>

      <div className="mt-3 flex gap-2">
        <span
          className="
            flex-1
            truncate
            rounded-lg
            bg-primary
            px-2
            py-1.5
            text-center
            text-[clamp(0.5625rem,1.15vw,0.75rem)]
            font-semibold
            text-primary-foreground
          "
        >
          Services
        </span>

        <span
          className="
            flex-1
            truncate
            rounded-lg
            border
            border-border
            bg-secondary/70
            px-2
            py-1.5
            text-center
            text-[clamp(0.5625rem,1.15vw,0.75rem)]
            font-semibold
            text-foreground
          "
        >
          Message
        </span>
      </div>
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */
/* Booking                                                                    */
/* -------------------------------------------------------------------------- */

export function BookingPanel({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Panel
      className={className}
      style={style}
    >
      <div className="flex items-center gap-2">
        <span
          className="
            flex
            h-[clamp(1.5rem,2.9vw,1.875rem)]
            w-[clamp(1.5rem,2.9vw,1.875rem)]
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-accent
            text-accent-foreground
          "
        >
          <Calendar
            className="
              h-[clamp(0.6875rem,1.35vw,0.875rem)]
              w-[clamp(0.6875rem,1.35vw,0.875rem)]
            "
            strokeWidth={2.2}
          />
        </span>

        <span className="min-w-0 flex-1">
          <span className={LABEL}>
            Booking
          </span>

          <span
            className={cn(
              'mt-1 block truncate',
              TITLE,
            )}
          >
            Request sent
          </span>
        </span>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span
          className="
            truncate
            rounded-md
            border
            border-border
            bg-secondary/70
            px-1.5
            py-1
            text-[clamp(0.5rem,1.1vw,0.6875rem)]
            font-semibold
            text-foreground
          "
        >
          Saturday
        </span>

        <span
          className="
            truncate
            rounded-md
            border
            border-border
            bg-secondary/70
            px-1.5
            py-1
            text-[clamp(0.5rem,1.1vw,0.6875rem)]
            font-semibold
            text-foreground
          "
        >
          14:30
        </span>

        <span
          className="
            flex
            items-center
            gap-1
            truncate
            text-[clamp(0.5rem,1.1vw,0.6875rem)]
            font-semibold
            text-primary
          "
        >
          <Check
            className="h-2.5 w-2.5 shrink-0"
            strokeWidth={3}
          />

          Confirmed
        </span>
      </div>
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */
/* Messages                                                                   */
/* -------------------------------------------------------------------------- */

export function MessagePanel({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Panel
      className={className}
      style={style}
    >
      <div className="flex items-center gap-2">
        <MessageCircle
          className="
            h-[clamp(0.75rem,1.5vw,0.9375rem)]
            w-[clamp(0.75rem,1.5vw,0.9375rem)]
            shrink-0
            text-primary
          "
          strokeWidth={2.2}
        />

        <span className={LABEL}>
          Messages
        </span>
      </div>

      <p
        className="
          mt-2
          max-w-[92%]
          rounded-xl
          rounded-tl-sm
          bg-secondary/85
          px-2.5
          py-1.5
          text-[clamp(0.5625rem,1.2vw,0.78rem)]
          leading-snug
          text-foreground
        "
      >
        Is Saturday afternoon still available?
      </p>

      <p
        className="
          ml-auto
          mt-1.5
          max-w-[92%]
          rounded-xl
          rounded-tr-sm
          bg-accent
          px-2.5
          py-1.5
          text-[clamp(0.5625rem,1.2vw,0.78rem)]
          leading-snug
          text-accent-foreground
        "
      >
        Yes — I’ll hold 14:30 for you.
      </p>
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */
/* Marketplace                                                                */
/* -------------------------------------------------------------------------- */

export function MarketplacePanel({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Panel
      className={className}
      style={style}
    >
      <div className="flex items-center gap-3">
        <span
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-border
            bg-secondary
            text-primary
          "
        >
          <Store
            className="h-4 w-4"
            strokeWidth={2.2}
          />
        </span>

        <span className="min-w-0 flex-1">
          <span className={LABEL}>
            Marketplace
          </span>

          <span
            className={cn(
              'mt-1 block truncate',
              TITLE,
            )}
          >
            Listings near you
          </span>
        </span>
      </div>
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */
/* Prolonged Share panel                                                      */
/* -------------------------------------------------------------------------- */

export function SharePanel({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Panel
      className={className}
      style={style}
    >
      <div className="flex items-center gap-2">
        <Share2
          className="
            h-[clamp(0.75rem,1.5vw,0.9375rem)]
            w-[clamp(0.75rem,1.5vw,0.9375rem)]
            shrink-0
            text-primary
          "
          strokeWidth={2.2}
        />

        <span className="min-w-0 flex-1">
          <span className={LABEL}>
            Prolonged Share
          </span>

          <span
            className={cn(
              'mt-1 block truncate',
              TITLE,
            )}
          >
            Shared onward
          </span>
        </span>
      </div>

      <div className="mt-3 flex items-center">
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            className="flex items-center"
          >
            {item > 0 && (
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-5
                  bg-primary/55
                "
              />
            )}

            <span
              className={cn(
                `
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  text-[0.6rem]
                  font-bold
                `,
                item === 0
                  ? 'border-primary/60 bg-primary/15 text-primary'
                  : 'border-border bg-secondary text-muted-foreground',
              )}
            >
              {item + 1}
            </span>
          </span>
        ))}

        <span
          className="
            ml-3
            truncate
            text-[clamp(0.5rem,1.05vw,0.6875rem)]
            font-semibold
            text-primary
          "
        >
          +12 reached
        </span>
      </div>
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */
/* Screen panel                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Kept exported for compatibility with any existing imports.
 *
 * The old implementation loaded an image from `src`.
 * The media has been removed, so this now renders a neutral
 * Kaarox interface card instead of requesting an image asset.
 */
export function ScreenPanel({
  caption,
  className,
  style,
}: {
  src: string;
  caption?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        'relative',
        className,
      )}
    >
      <Panel>
        <div className="flex items-center gap-2">
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-primary
            "
          />

          <span className={LABEL}>
            Kaarox
          </span>
        </div>

        <div className="mt-3 space-y-2">
          <span
            className="
              block
              h-2
              w-[72%]
              rounded-full
              bg-secondary
            "
          />

          <span
            className="
              block
              h-2
              w-[54%]
              rounded-full
              bg-secondary
            "
          />

          <span
            className="
              block
              h-8
              w-full
              rounded-lg
              border
              border-border
              bg-secondary/60
            "
          />
        </div>
      </Panel>

      {caption && (
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
          {caption}
        </p>
      )}
    </div>
  );
}
