import type { CSSProperties, ReactNode } from 'react';
import { Calendar, Check, MapPin, MessageCircle, Search, Share2, Store } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Kaarox UI panels — the product surface of the page now that the device
 * mockup is gone.
 *
 * These are deliberately *abstracted* product panels rather than fabricated
 * full app screens: each one represents a capability that genuinely exists in
 * Kaarox (discovery, digital cards, bookings, messaging, marketplace listings,
 * Prolonged Share) using neutral, non-invented copy.
 *
 * Every panel is layout-agnostic — it accepts `className` and `style` so the
 * caller owns positioning. Type sizes are fluid (`clamp` against the viewport)
 * because the panels are sized in percentages inside their composition, so they
 * shrink on small screens without the copy overflowing.
 */

/* Shared type scale, kept in one place so all panels stay visually consistent. */
const LABEL = 'text-[clamp(0.5rem,1.05vw,0.625rem)] font-semibold uppercase tracking-[0.16em] text-muted-foreground';
const TITLE = 'text-[clamp(0.75rem,1.5vw,0.9375rem)] font-semibold tracking-[-0.01em] text-card-foreground';
const BODY = 'text-[clamp(0.625rem,1.25vw,0.8125rem)] leading-snug text-muted-foreground';

type PanelProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Soft lime halo, for the one or two panels that lead a composition. */
  glow?: boolean;
};

/** The shared card shell: dark glass, hairline border, real depth. */
export function Panel({ children, className, style, glow = false }: PanelProps) {
  return (
    <div
      style={style}
      className={cn(
        'relative rounded-2xl border border-border/90 bg-card/95 p-[clamp(0.625rem,1.4vw,1rem)]',
        'shadow-[0_34px_64px_-34px_hsl(120_20%_1%/0.95)] backdrop-blur-xl',
        className,
      )}
    >
      {glow && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-5 -z-10 rounded-[2rem] bg-primary/[0.1] blur-2xl"
        />
      )}
      {children}
    </div>
  );
}

/** Small square media thumbnail, reusing an already-encoded poster frame. */
function Thumb({ src, className }: { src: string; className?: string }) {
  return (
    <span
      className={cn(
        'block shrink-0 overflow-hidden rounded-lg border border-border/70 bg-secondary',
        className,
      )}
    >
      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
    </span>
  );
}

/** Discovery: a query plus the results it resolves to. */
export function SearchPanel({ className, style }: { className?: string; style?: CSSProperties }) {
  const results = [
    { thumb: '/assets/clip-beauty-hair-poster.jpg', industry: 'Beauty', place: 'Dubai Marina' },
    { thumb: '/assets/clip-sport-tennis-poster.jpg', industry: 'Sport coaching', place: 'Jumeirah' },
  ];

  return (
    <Panel className={className} style={style} glow>
      <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/80 px-2.5 py-2">
        <Search
          className="h-[clamp(0.75rem,1.5vw,0.9375rem)] w-[clamp(0.75rem,1.5vw,0.9375rem)] shrink-0 text-primary"
          strokeWidth={2.3}
        />
        <span className="truncate text-[clamp(0.625rem,1.3vw,0.8125rem)] font-medium text-foreground">
          What are you looking for?
        </span>
      </div>

      <ul className="mt-2.5 space-y-2">
        {results.map((result) => (
          <li key={result.industry} className="flex items-center gap-2.5">
            <Thumb src={result.thumb} className="h-[clamp(1.75rem,3.4vw,2.25rem)] w-[clamp(1.75rem,3.4vw,2.25rem)]" />
            <span className="min-w-0 flex-1">
              <span className={cn('block truncate', TITLE)}>{result.industry}</span>
              <span className={cn('mt-0.5 flex items-center gap-1 truncate', BODY)}>
                <MapPin className="h-2.5 w-2.5 shrink-0" strokeWidth={2.4} />
                {result.place}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/** The digital business card, Kaarox's core provider object. */
export function DigitalCardPanel({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Panel className={className} style={style} glow>
      <div className="flex items-center gap-2.5">
        <Thumb
          src="/assets/screen-profile.png"
          className="h-[clamp(2.25rem,4.2vw,2.875rem)] w-[clamp(2.25rem,4.2vw,2.875rem)] rounded-xl [&>img]:object-top"
        />
        <span className="min-w-0 flex-1">
          <span className={LABEL}>Digital card</span>
          <span className={cn('mt-1 block truncate', TITLE)}>Your professional profile</span>
        </span>
      </div>

      <p className={cn('mt-2.5 line-clamp-2', BODY)}>
        Industry, location, services and contact details — in one shareable card.
      </p>

      <div className="mt-3 flex gap-2">
        <span className="flex-1 truncate rounded-lg bg-primary px-2 py-1.5 text-center text-[clamp(0.5625rem,1.15vw,0.75rem)] font-semibold text-primary-foreground">
          Services
        </span>
        <span className="flex-1 truncate rounded-lg border border-border bg-secondary/70 px-2 py-1.5 text-center text-[clamp(0.5625rem,1.15vw,0.75rem)] font-semibold text-foreground">
          Message
        </span>
      </div>
    </Panel>
  );
}

/** A booking request, in the state the customer leaves it in. */
export function BookingPanel({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <Panel className={className} style={style}>
      <div className="flex items-center gap-2">
        <span className="flex h-[clamp(1.5rem,2.9vw,1.875rem)] w-[clamp(1.5rem,2.9vw,1.875rem)] shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Calendar className="h-[clamp(0.6875rem,1.35vw,0.875rem)] w-[clamp(0.6875rem,1.35vw,0.875rem)]" strokeWidth={2.2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className={LABEL}>Booking</span>
          <span className={cn('mt-1 block truncate', TITLE)}>Request sent</span>
        </span>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="truncate rounded-md border border-border bg-secondary/70 px-1.5 py-1 text-[clamp(0.5rem,1.1vw,0.6875rem)] font-semibold text-foreground">
          Saturday
        </span>
        <span className="truncate rounded-md border border-border bg-secondary/70 px-1.5 py-1 text-[clamp(0.5rem,1.1vw,0.6875rem)] font-semibold text-foreground">
          14:30
        </span>
        <span className="flex items-center gap-1 truncate text-[clamp(0.5rem,1.1vw,0.6875rem)] font-semibold text-primary">
          <Check className="h-2.5 w-2.5 shrink-0" strokeWidth={3} />
          Confirmed
        </span>
      </div>
    </Panel>
  );
}

/** Direct messaging between a customer and a provider. */
export function MessagePanel({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <Panel className={className} style={style}>
      <div className="flex items-center gap-2">
        <MessageCircle
          className="h-[clamp(0.75rem,1.5vw,0.9375rem)] w-[clamp(0.75rem,1.5vw,0.9375rem)] shrink-0 text-primary"
          strokeWidth={2.2}
        />
        <span className={LABEL}>Messages</span>
      </div>

      <p className="mt-2 max-w-[92%] rounded-xl rounded-tl-sm bg-secondary/85 px-2.5 py-1.5 text-[clamp(0.5625rem,1.2vw,0.78rem)] leading-snug text-foreground">
        Is Saturday afternoon still available?
      </p>
      <p className="ml-auto mt-1.5 max-w-[92%] rounded-xl rounded-tr-sm bg-accent px-2.5 py-1.5 text-[clamp(0.5625rem,1.2vw,0.78rem)] leading-snug text-accent-foreground">
        Yes — I’ll hold 14:30 for you.
      </p>
    </Panel>
  );
}

/** A marketplace listing snippet. */
export function MarketplacePanel({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Panel className={className} style={style}>
      <div className="flex items-center gap-2.5">
        <Thumb
          src="/assets/clip-lifestyle-moto-poster.jpg"
          className="h-[clamp(2rem,3.8vw,2.5rem)] w-[clamp(2rem,3.8vw,2.5rem)]"
        />
        <span className="min-w-0 flex-1">
          <span className={cn('flex items-center gap-1', LABEL)}>
            <Store className="h-2.5 w-2.5 shrink-0" strokeWidth={2.4} />
            Marketplace
          </span>
          <span className={cn('mt-1 block truncate', TITLE)}>Listed near you</span>
        </span>
      </div>
    </Panel>
  );
}

/** Prolonged Share — a card that keeps travelling past the first contact. */
export function SharePanel({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <Panel className={className} style={style}>
      <div className="flex items-center gap-2">
        <Share2
          className="h-[clamp(0.75rem,1.5vw,0.9375rem)] w-[clamp(0.75rem,1.5vw,0.9375rem)] shrink-0 text-primary"
          strokeWidth={2.2}
        />
        <span className="min-w-0 flex-1">
          <span className={LABEL}>Prolonged Share</span>
          <span className={cn('mt-1 block truncate', TITLE)}>Shared onward</span>
        </span>
      </div>

      {/* The chain of people the card has reached. */}
      <div className="mt-2.5 flex items-center gap-1">
        {['/assets/screen-profile.png', '/assets/screen-discover.png', '/assets/screen-listing.png'].map(
          (src, index) => (
            <span key={src} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true" className="h-px w-2.5 bg-primary/60" />}
              <Thumb
                src={src}
                className="h-[clamp(1.125rem,2.2vw,1.5rem)] w-[clamp(1.125rem,2.2vw,1.5rem)] rounded-full [&>img]:object-top"
              />
            </span>
          ),
        )}
        <span className="ml-1 truncate text-[clamp(0.5rem,1.05vw,0.6875rem)] font-semibold text-primary">
          +12 reached
        </span>
      </div>
    </Panel>
  );
}

/** A real captured Kaarox screen, framed as an inset panel. */
export function ScreenPanel({
  src,
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
    <div style={style} className={cn('relative', className)}>
      {/* Cropped to a landscape-ish panel so a real captured screen reads as a
          layered Kaarox interface block rather than a phone-shaped mockup. */}
      <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-border/80 bg-secondary shadow-[0_40px_80px_-44px_hsl(120_20%_1%/0.95)]">
        <img
          src={src}
          alt={caption ?? ''}
          loading="lazy"
          className="block h-full w-full object-cover object-top"
        />
      </div>
      {caption && (
        <p className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  );
}