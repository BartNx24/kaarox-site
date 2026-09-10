---
last_updated: 2026-09-03T10:59:22Z
---

# Architecture Design

## System Overview

Single-page premium marketing site for the Kaarox mobile app. Static frontend only, no backend: the hero is the product, built around a realistic smartphone that cross-fades between real captured Kaarox screens and a real screen recording.

## Tech Stack

React 18 + TypeScript + Vite, Tailwind CSS, shadcn/ui, lucide-react icons, Schibsted Grotesk (Google Fonts). Motion is CSS keyframes + IntersectionObserver/rAF hooks — no animation library.

## Module Design
| Module | Responsibility | Key Files |
|--------|---------------|-----------|
| Page shell | Route `/`, forces dark palette, closing CTA + footer | `src/pages/Index.tsx` |
| Hero | Asymmetric 5/7 grid, brand bar, headline, CTA, device parallax | `src/components/kaarox/Hero.tsx` |
| UI panels | Search, digital card, booking, messaging, marketplace, share and screen panels — the hero's focal element now that the phone is gone | `src/components/kaarox/UIPanels.tsx` |
| Video delivery | Lazy mount within 500px, pause offscreen, caller-forced pause, poster under reduced motion | `src/components/kaarox/VideoPanel.tsx` |
| Motion primitives | `Reveal`, `useParallax`, `useInView`, `usePrefersReducedMotion` | `src/components/kaarox/Motion.tsx` |
| CTA | App Store download button | `src/components/kaarox/AppStoreButton.tsx` |
| Design tokens | Dark lime palette, fluid type scale, keyframes | `src/index.css`, `tailwind.config.ts` |

## Tech Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Interface visuals | User-uploaded screenshots + MP4 only | Requirement forbids inventing a fake Kaarox UI |
| Video handling | `<video muted loop playsInline>` inside slide 3, paused when off-screen slide | Autoplay-safe, avoids 4 videos decoding at once |
| Logo on dark bg | `mix-blend-mode: screen` on the PNG | Source PNG ships a black matte, not transparency |
| Animation stack | CSS keyframes + rAF parallax | Zero extra dependencies, cheap on mobile |
| Palette | Dark tinted neutrals (hue 120) + lime `#54FF3D` primary | Sampled from the real Kaarox logo |
| Reduced motion | All loops/parallax disabled via media query + hook | Accessibility |

## File Tree Plan

```
src/
  pages/Index.tsx
  components/kaarox/
    Hero.tsx
    PhoneShowcase.tsx
    FloatingElements.tsx
    AppStoreButton.tsx
    Motion.tsx
  index.css
public/assets/
  kaarox-logo.png, screen-discover.png, screen-listing.png,
  screen-profile.png, kaarox-demo.mp4, screen-demo-poster.jpg
```

## Implementation Guide

Slides live in the `SLIDES` array in `PhoneShowcase.tsx`; each entry declares its own dwell duration, which also drives the progress bar. Floating chips are `hidden` below `sm` and reduced to two on tablet so the phone owns small viewports.

