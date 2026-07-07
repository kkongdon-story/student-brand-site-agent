---
name: personal-brand-site
description: Build a high-quality personal branding website agent flow for beginners. Use when a student wants to create a personal brand homepage, portfolio, lecture/consulting landing page, or "vibe-coded" website from brand materials, reference sites/screenshots, image assets, DESIGN.md, static HTML/CSS/JS, browser QA, and GitHub/Vercel publishing.
---

# Personal Brand Site

Use this skill as a staged website-making agent. Do not jump straight to code. The output quality comes from four gates:

1. Stage 1: Brand materials
2. Stage 2: Reference DNA and image assets
3. Stage 3: DESIGN.md contract
4. Stage 4: Static site build, browser QA, and publish pack

## Operating Rules

- Ask one question at a time when the student's intent is unclear.
- Never invent achievements, client names, numbers, credentials, or links.
- Translate taste into web language: color, type, spacing, layout, component, CTA, cursor, scroll, motion, texture, image role.
- Treat references as evidence, not something to copy pixel-for-pixel.
- Use static HTML/CSS/JS as the default output. Add GSAP or IntersectionObserver for scrollytelling and interaction.
- Require browser QA before saying the website is done.
- Use local image CLI first for images. If no local CLI is available, create the prompt and asset folder task instead of pretending image generation happened.

## Stage Routing

Read only the reference needed for the current stage:

- Brand intake: `references/step-01-brand-materials.md`
- Reference and image direction: `references/step-02-reference-dna.md`
- Local image workflow: `references/step-02-image-assets.md`
- DESIGN.md contract: `references/step-03-design-contract.md`
- Website build and revision: `references/step-04-build-and-qa.md`
- Publishing and tracking: `references/publish-and-tracking.md`

Use templates from `assets/templates/`:

- `student-intake.template.md`
- `reference-dna.template.md`
- `image-brief.template.md`
- `DESIGN.template.md`
- `QA-CHECKLIST.template.md`
- `GPTS-export.template.md`

## Default Output Package

For each student, create:

```text
student-site/
  brand-materials.md
  reference-dna.md
  image-brief.md
  DESIGN.md
  site/
    index.html
    styles.css
    script.js
    robots.txt
    sitemap.xml
    llms.txt
    README.md
  qa/
    desktop.png
    mobile.png
    report.json
```

## Completion Gate

Do not mark the work complete until these pass:

- `DESIGN.md` has brand, reference, image, motion, responsive, SEO/OG/GEO, file, and QA sections.
- The image lane either produced assets or clearly recorded the local CLI/install task.
- The site has visible interaction: hover, click, and scroll-triggered change.
- Desktop and mobile screenshots exist.
- Metadata and publish files exist: title, description, OG title/description/image placeholder, canonical placeholder, JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt`.

