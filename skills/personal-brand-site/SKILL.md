---
name: personal-brand-site
description: Build a high-quality personal branding website agent flow for beginners. Use when a student wants to create a personal brand homepage, portfolio, lecture/consulting landing page, or "vibe-coded" website from brand materials, reference sites/screenshots, image assets, DESIGN.md, static HTML/CSS/JS, browser QA, and GitHub/Vercel publishing.
---

# Personal Brand Site

Use this skill as a staged website-making agent. Do not jump straight to code. The output quality comes from four gates:

1. Stage 1: Brand materials
2. Stage 2: Reference evidence, prompt assets, and image assets
3. Stage 3: DESIGN.md contract
4. Stage 4: Static site build, browser QA, and publish pack

## Operating Rules

- Ask one question at a time when the student's intent is unclear.
- Never invent achievements, client names, numbers, credentials, or links.
- Translate taste into web language: color, type, spacing, layout, component, CTA, cursor, scroll, motion, texture, image role.
- Treat references as evidence, not something to copy pixel-for-pixel.
- Treat strong prompts as reusable assets. Save section prompts, interaction prompts, and negative prompts instead of leaving them inside chat only.
- Prefer reference-backed design decisions over broad mood words. A URL alone is weak; URL plus screenshot, liked section, bring/avoid notes, and implementation language is strong.
- Use the vendored MengTo core skills for advanced reference capture, prompt structure, high-end visual guardrails, landing-page conversion logic, scroll motion, and animation performance. Do not expose all skill names to beginners; translate them into simple Korean guidance.
- Use static HTML/CSS/JS as the default output. Add GSAP or IntersectionObserver for scrollytelling and interaction.
- Require browser QA before saying the website is done.
- Use local image CLI first for images. If no local CLI is available, create the prompt and asset folder task instead of pretending image generation happened.

## Stage Routing

Read only the reference needed for the current stage:

- Brand intake: `references/step-01-brand-materials.md`
- Reference evidence, prompt assets, and image direction: `references/step-02-reference-dna.md`
- MengTo core skill routing: `references/mengto-core-skill-routing.md`
- Local image workflow: `references/step-02-image-assets.md`
- DESIGN.md contract: `references/step-03-design-contract.md`
- Website build and revision: `references/step-04-build-and-qa.md`
- Publishing and tracking: `references/publish-and-tracking.md`

When Stage 2, 3, or 4 needs stronger design or motion guidance, read the narrowest relevant vendored source skill from `vendor/mengto-skills/` after reading `references/mengto-core-skill-routing.md`.

Core vendored skills:

- `vendor/mengto-skills/stitched-full-page-capture/SKILL.md`
- `vendor/mengto-skills/html-to-interaction-prompts/SKILL.md`
- `vendor/mengto-skills/design-first-ui-prompting/SKILL.md`
- `vendor/mengto-skills/high-end-visual-design/SKILL.md`
- `vendor/mengto-skills/landing-page/SKILL.md`
- `vendor/mengto-skills/animation-on-scroll/SKILL.md`
- `vendor/mengto-skills/cinematic-scroll-storytelling/SKILL.md`
- `vendor/mengto-skills/optimize-web-animations/SKILL.md`

Use templates from `assets/templates/`:

- `student-intake.template.md`
- `reference-dna.template.md`
- `prompt-pack.template.md`
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
  prompt-pack.md
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
- `reference-dna.md` has a reference evidence pack: source, screenshot/capture plan, what to bring, what to avoid, and AI-readable material for each selected reference.
- `prompt-pack.md` has a design-first super prompt, section prompts, interaction prompts, and a negative prompt.
- The design direction names a visual archetype, layout archetype, design system constraints, and anti-generic guardrails.
- The image lane either produced assets or clearly recorded the local CLI/install task.
- The site has visible interaction: hover, click, and scroll-triggered change.
- Desktop and mobile screenshots exist.
- Metadata and publish files exist: title, description, OG title/description/image placeholder, canonical placeholder, JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt`.
