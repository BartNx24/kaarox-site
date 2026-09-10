---
last_updated: 2026-09-03T10:59:22Z
status: active
---

# Project Context

## Project Overview

Kaarox landing page — a premium single-page hero for a mobile app covering digital business cards, service-provider discovery, networking, communities, messaging, bookings and marketplace listings.

## Key Decisions
| Date | Decision | By | Rationale |
|------|----------|-----|-----------|
| 2026-09-03 | Frontend-only shadcn/Vite template, no backend | Alex | Static marketing hero, no data or auth needed |
| 2026-09-03 | Real uploaded screenshots + MP4 as the only interface visuals | Alex | User explicitly forbade a fabricated Kaarox UI |
| 2026-09-03 | Dark register with lime accent as the sole saturated colour | Alex | Matches the app logo, reads high-end rather than SaaS-generic |

## Constraints

- Never fabricate Kaarox interface screens; use only `public/assets` uploads.
- Design guidelines: Brand register. Background `hsl(120 8% 5%)`, card `hsl(120 7% 8%)`, all neutrals tinted to hue 120 at 5-8% saturation; single accent lime `hsl(113 100% 62%)` (#54FF3D) held under 10% of surface. Typography: Schibsted Grotesk, fluid `clamp()` h1 up to 6.5rem, tight tracking (-0.045em). Motion: ease-out-expo/quart only, 200-800ms, staggers under 500ms.
- Whitespace-first: one dominant idea per fold. No phone/device mockup anywhere — the focal element is a layered composition of real Kaarox UI panels over vertical footage.
- Text and media never share space: headings and body copy always live in their own grid column or a scrimmed safe strip. Only UI panels may be layered over footage, never body copy.
- No gradient text, no glassmorphism as a default surface, no identical card grids.


