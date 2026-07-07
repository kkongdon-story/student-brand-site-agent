# DESIGN.md - Personal Brand Website Design Contract

## 1. Website Purpose

Write the concrete business purpose in one or two sentences. Include the next action the visitor should take, such as 상담, 신청, 문의, 예약, 자료 신청, 협업 제안, or newsletter signup.

## 2. Brand Materials

Define the person or brand in plain words. Include the audience, what you help them do, what you offer, and the trust proof that may safely appear on the page. Do not invent career history, numbers, awards, clients, or testimonials.

## 3. Hero Copy

Primary: the first sentence visitors must remember.

Secondary: one supporting sentence that explains the transformation or value.

CTA: the exact button label and destination.

## 4. Reference DNA

List the chosen reference URLs or screenshots, then translate them into web-design language. Name what to borrow, such as layout rhythm, typography scale, interaction style, material texture, spacing, or component behavior. Also name what must not be copied.

## 5. Visual Direction

Describe the page mood as implementable decisions: background material, contrast, dominant color, accent color, line weight, image treatment, density, and whether the page should feel editorial, studio-like, playful, brutalist, quiet, premium, or experimental.

## 6. Image Assets

- `assets/character.png`: how the local image CLI should generate or replace the main character, portrait, object, or hero visual.
- `assets/og-image.png`: how the local image CLI should generate the social preview image.
- `assets/reference-01.png`: optional screenshot or visual reference used only for design direction.

## 7. Color System

- background: #000000
- ink: #ffffff
- accent: #00ff99
- secondary: #777777
- line: #333333

Explain where each color appears. Use at least three concrete colors.

## 8. Typography

Define the type direction and sizes. Include hero scale, body size, heading hierarchy, font family approach, and whether text should be wide, compact, quiet, heavy, or editorial. Letter spacing should normally be 0.

## 9. Layout

Describe the full page structure in order. Include nav, hero, proof or story sections, offer or work sections, CTA section, and footer. Explain whether sections are full-bleed, split, stacked, grid-based, or scroll-telling.

## 10. Section Detail

1. Hero: visual, headline, CTA, and first interaction.
2. About: who this is for and why the visitor should care.
3. Perspective: the brand's point of view.
4. Offer or collaboration: what can be requested.
5. Work, resources, or projects: concrete proof.
6. Contact: links and final CTA.

## 11. Motion and Interaction

Hover: define what moves, changes color, glows, reveals, tilts, or shifts.

Click: define what visibly changes after clicking.

Scroll: define reveal timing, progress indicator, parallax, pinned section, or section transition.

## 12. Components

- Primary CTA
- Secondary link
- Navigation
- Image or character frame
- Project/resource item
- Contact block

## 13. Responsive Rules

Describe the mobile layout. Include how the hero stacks, how text sizes reduce, how buttons wrap, and the rule that there must be no horizontal overflow.

## 14. SEO / OG / GEO

Title: exact browser/search title.

Description: exact meta description.

OG: title, description, and image file.

Canonical: deployed URL placeholder or final deployed URL.

JSON-LD: Person, Organization, LocalBusiness, CreativeWork, or Course schema choice.

Required files: `robots.txt`, `sitemap.xml`, `llms.txt`.

## 15. Implementation Files

- `index.html`
- `styles.css`
- `script.js`
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `README.md`

## 16. QA Acceptance Criteria

- desktop screenshot exists
- mobile screenshot exists
- hover interaction changes a visible or computed style
- click interaction changes visible text or state
- scroll reveal or scroll progress works
- metadata, OG, canonical, JSON-LD, robots, sitemap, and llms files exist
- all local referenced assets exist
- no horizontal overflow on desktop or mobile

## 17. Must Not Drift

- Do not copy the reference site one-to-one.
- Do not leave generated images as low-quality placeholders.
- Do not end with a static page that has no hover, click, or scroll response.
- Do not invent credentials, career history, clients, or metrics.
