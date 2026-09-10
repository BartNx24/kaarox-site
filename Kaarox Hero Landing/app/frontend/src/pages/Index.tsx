import { useCallback, useEffect, useState } from 'react';
import { Hero } from '@/components/kaarox/Hero';
import { AppStoreButton } from '@/components/kaarox/AppStoreButton';
import { IntroSequence, shouldPlayIntro } from '@/components/kaarox/IntroSequence';
import { ProlongedShareScroll } from '@/components/kaarox/ProlongedShareScroll';
import { ForCustomersSection, RealLifeSection } from '@/components/kaarox/StoryDiscover';
import {
  CommunitySection,
  ForProvidersSection,
  IndustriesSection,
  TechnologySection,
} from '@/components/kaarox/StoryProviders';
import { Reveal } from '@/components/kaarox/Motion';

/**
 * The Kaarox landing page, told as one continuous scroll.
 *
 *   hero            the product, unchanged
 *   real life       footage mosaic + oversized category words
 *   customers       the journey, activity turning into interface
 *   providers       alternating footage with messaging opposite
 *   prolonged share the scroll-controlled centrepiece
 *   community       UI cards emerging from behind footage
 *   industries      masked windows expanding and contracting
 *   technology      a short atmospheric beat
 *   final CTA       back to the simplicity of the opening
 */
export default function Index() {
  // Decide before the first paint so the hero never flashes behind the intro.
  const [introPlaying, setIntroPlaying] = useState(() => shouldPlayIntro());
  const handleIntroDone = useCallback(() => setIntroPlaying(false), []);

  // The design is authored for the dark palette only.
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <main id="top" className="min-h-screen bg-background">
      {introPlaying && <IntroSequence onDone={handleIntroDone} />}

      {/* The hero mounts and plays its entrance immediately, underneath the
          overlay. By the time the intro dissolves the hero is already settled,
          which is what makes the hand-off feel seamless rather than staged. */}
      <Hero />

      <RealLifeSection />
      <ForCustomersSection />
      <ForProvidersSection />
      <ProlongedShareScroll />
      <CommunitySection />
      <IndustriesSection />
      <TechnologySection />

      {/* ---- Final CTA: back to the calm of the opening fold ---- */}
      <section
        id="download"
        className="relative overflow-x-clip border-t border-border"
      >
        <div aria-hidden="true" className="page-aura pointer-events-none absolute inset-0 -z-10" />

        <div className="mx-auto max-w-screen-xl px-6 py-28 text-center sm:px-8 lg:px-12 lg:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-[26ch] text-balance text-foreground">
              Your next connection
              <br />
              could start here.
            </h2>
          </Reveal>

          <Reveal delay={110}>
            <p className="mx-auto mt-7 max-w-[46ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              Discover services. Present what you offer. Connect with people who matter.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 flex justify-center">
              <AppStoreButton className="scale-110" />
            </div>
          </Reveal>

          <Reveal delay={290}>
            <div className="mt-16">
              <img
                src="/assets/kaarox-logo.png"
                alt="Kaarox"
                width={2222}
                height={983}
                loading="lazy"
                className="brand-mark mx-auto h-12 w-auto"
              />
              <p className="mt-5 text-lg font-semibold tracking-[-0.02em] text-foreground">
                Connect. Discover.{' '}
                <span className="kx-glow-text text-primary">Grow.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row sm:px-8 lg:px-12">
          <img
            src="/assets/kaarox-logo.png"
            alt="Kaarox"
            width={2222}
            height={983}
            loading="lazy"
            className="brand-mark h-9 w-auto"
          />

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
          >
            <a
              href="/blog/"
              className="transition-colors duration-200 ease-out-quart hover:md:text-foreground"
            >
              Blog
            </a>
            <a
              href="mailto:support@kaarox.com"
              className="transition-colors duration-200 ease-out-quart hover:md:text-foreground"
            >
              Support
            </a>
            <a
              href="/privacy.html"
              className="transition-colors duration-200 ease-out-quart hover:md:text-foreground"
            >
              Privacy
            </a>
            <a
              href="/terms.html"
              className="transition-colors duration-200 ease-out-quart hover:md:text-foreground"
            >
              Terms
            </a>
            <a
              href="/refund.html"
              className="transition-colors duration-200 ease-out-quart hover:md:text-foreground"
            >
              Refund
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kaarox. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}