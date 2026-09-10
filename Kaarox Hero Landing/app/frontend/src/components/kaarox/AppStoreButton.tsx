import { cn } from '@/lib/utils';

const APPLE_GLYPH =
  'M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z';

type AppStoreButtonProps = {
  href?: string;
  className?: string;
};

/** Primary acquisition CTA. Light surface on the dark page for maximum contrast. */
export function AppStoreButton({ href = '#download', className }: AppStoreButtonProps) {
  return (
    <a
      href={href}
      aria-label="Download Kaarox on the App Store"
      className={cn(
        'group inline-flex items-center gap-3.5 rounded-full bg-foreground px-6 py-3.5 text-background',
        'shadow-[0_18px_44px_-22px_hsl(120_6%_96%_/_0.5)]',
        'transition-[transform,background-color,box-shadow] duration-200 ease-out-quart',
        'hover:md:-translate-y-0.5 hover:md:shadow-[0_26px_56px_-24px_hsl(113_100%_62%_/_0.45)]',
        'active:translate-y-0 active:scale-[0.985]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 shrink-0 fill-current">
        <path d={APPLE_GLYPH} />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] opacity-70">
          Download on the
        </span>
        <span className="mt-1 text-lg font-semibold tracking-[-0.02em]">App Store</span>
      </span>
    </a>
  );
}