---
last_updated: 2026-09-03T10:59:22Z
---

# Requirements & Progress

## Requirements Overview

Premium, Apple-grade hero landing page for the Kaarox mobile app: logo, headline "Connect. Discover. Grow.", supporting copy, App Store button, realistic smartphone animating through the real Kaarox screens, subtle floating UI, entrance + scroll effects, generous whitespace, desktop and mobile responsive. Hard constraint: only user-supplied screenshots and the screen recording may be used as interface visuals.

## User Stories

- As a visitor, I immediately understand what Kaarox does and can download it from the App Store.
- As a visitor, I see the genuine Kaarox interface in motion inside a realistic phone.
- As a mobile visitor, the page stays uncrowded and the device remains the focus.

## Task Breakdown

- [x] Inspect and label the 4 uploaded assets, copy them into `public/assets`
- [x] Build the dark lime design system (palette from the logo, Schibsted Grotesk, keyframes)
- [x] Motion primitives: Reveal, parallax, in-view, reduced-motion
- [x] Realistic smartphone with cross-fading real screens + screen recording
- [x] Subtle floating UI chips around the device
- [x] Hero composition: logo, headline, supporting text, App Store button
- [x] Closing CTA band + footer
- [x] Responsive desktop/tablet/mobile pass
- [x] Lint + build verification
- [x] UI rendering check
- [x] First-session intro animation (~1.4s, once per session, reduced-motion aware)
- [x] Reusable Prolonged Share network graphic (hub, person nodes, travelling card)
- [x] In-page Prolonged Share section revealed on scroll
- [x] Restrained scroll motion: parallax depth + subtle phone tilt
- [x] Harden reveal detection so no section can stay invisible
- [x] Transcode the 7 uploaded 4K clips to web-optimised 720p + posters
- [x] Rebuild floating cards: 4 on desktop, explicit exclusion zone, no clipped text
- [x] Section 1 — real life footage mosaic with oversized category words
- [x] Section 2 — for customers: journey + footage turning into app screens
- [x] Section 3 — for service providers: alternating footage/messaging
- [x] Section 4 — scroll-controlled Prolonged Share chapter (sticky, reversible)
- [x] Section 5 — community UI cards emerging from behind footage
- [x] Section 6 — industry montage with masked expanding windows
- [x] Section 7 — short atmospheric technology beat
- [x] Final CTA returning to the calm of the opening fold
- [x] Remove the phone entirely (delete PhoneShowcase/FloatingElements, no device frame left)
- [x] Rebuild the hero around layered floating Kaarox UI panels over one video
- [x] Encode the 4 extra uploads (wellness/outdoor, local pets, service garage, lifestyle moto)
- [x] Fix "Whatever you're looking for": two-column layout, media can never cover the copy
- [x] Spread the 11 clips so no footage dominates or repeats as a lead visual
- [x] Expand industry messaging to Beauty/Sport/Business/Automotive/Wellness/Services/Communities
- [x] Keep at most one decoding video per composition for mobile performance
- [x] Final lint + build + rendering check on the phone-free page

## Progress Log
- Analyzed uploads: logo (#54FF3D lime), Discover/search screen, "Run" Dubaï listing, digital-card profile, 9.5s 416x848 recording.
- Copied assets to `public/assets` with descriptive names; extracted video poster frame at 1.2s.
- Replaced template theme with Kaarox dark palette; added float/drift/progress keyframes.
- Implemented hero, phone showcase, floating chips, App Store CTA, landing page.
- Fixed above-the-fold reveals to animate on mount (logo/copy/CTA were invisible on first paint).
- Pulled floating-chip offsets inside the device column to stop right-edge clipping; tightened vertical rhythm.
- Aligned copy with the live Kaarox site: Prolonged Share, posts and hubs, marketplace listings, industry-based discovery; added footer support/legal links.
- Lint + production build pass clean; UI rendering check passed.
- Reworked floating cards: anchored to the phone's centre line (half-width + gap) so they can never sit behind the device; icon stacked above text for full-width copy; fixed card width; staggered fade/slide entrance after the hero; parallax at 40% of the phone's speed for depth; 6 cards at xl, 2 at lg, none below.
- Added the intro sequence: fixed ~1.4s timeline, no spinner or percentage, `sessionStorage` key `kaarox:intro-played` so it plays once per session, skipped entirely under `prefers-reduced-motion`, scroll locked then dissolved.
- Hero now mounts and animates immediately underneath the overlay, so the intro dissolves onto an already-settled hero instead of a blank stage.
- Extracted `ShareNetwork` as a reusable graphic shared by the intro and the new Prolonged Share section (loop mode replays once in view).
- Reveal detection now combines an IntersectionObserver, an on-mount position measurement and a short timeout, so content can never remain stuck at `opacity: 0`.
- Lint + production build pass clean; hero and Prolonged Share section both verified in the rendering check.
- Transcoded the 7 uploaded 4K verticals to 720p/24fps H.264 (each 10-45MB -> under 700KB) with matching poster frames; originals are never shipped.
- `VideoPanel` owns web performance: the `<video>` element is only created within 500px of the viewport, playback pauses offscreen, callers can force-pause unfocused clips of a montage, and reduced motion resolves to the poster.
- Floating cards rebuilt to spec: 4 on desktop, 3 on tablet, none on mobile; anchored outside a 172px exclusion zone either side of the phone centre, with fixed generous widths so no title or subtitle clips.
- Added `useScrollProgress`, and built the Prolonged Share chapter as a 210vh sticky section driven purely by scroll position — so it never loops and reverses gracefully on scroll-up.
- Each new chapter uses a distinct motion idea (footage mosaic, journey column, alternating beats, emerging UI cards, masked expanding windows) rather than one repeated fade.
- Wrote real Privacy / Terms / Refund static pages plus a shared `legal.css` in the Kaarox dark identity, and removed the footer link that had no destination — every footer link now resolves in `dist`.
- Hero device stage now goes full-width from `md` so the floating cards' exclusion zone is never clipped on tablet.
- Final lint + production build pass clean; `dist` contains `/`, `/blog/`, `privacy.html`, `terms.html`, `refund.html`.
- Deleted `PhoneShowcase.tsx` and `FloatingElements.tsx`; a repo-wide search confirms zero remaining references, so no device frame exists anywhere on the page.
- Hero rebuilt as a layered composition: one vertical clip plus real Kaarox UI panels (search, Prolonged Share, digital card, booking) drifting at different parallax depths.
- "Whatever you're looking for" is now a strict two-column grid — copy in columns 1-5, footage in 6-12 — sticky only from `lg`, and the animated industry line sits inside the text column, so media is structurally unable to cover the heading at any width.
- The 4 new clips are spread as lead visuals: wellness/outdoor in chapter 1, local pets in the customer grid and community backdrop, service garage and lifestyle moto in the provider beats and montage.
- Industry montage widened to 7 windows (Beauty, Sport, Business, Automotive, Wellness, Services, Communities) with the focused label rendered in its own strip below the media.
- Performance: every composition decodes at most one video at a time — the montage plays only the window nearest the scroll focus, all others resolve to their poster.
- Screen panels are cropped to a 4:3 inset so real captures read as interface blocks rather than phone-shaped mockups.

