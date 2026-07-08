# Stage 4 - Build and QA

Goal: build a beginner-editable static site and verify it on the real surface.

## Build Prompt Requirements

The builder must create:

- `index.html`
- `styles.css`
- `script.js`
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `README.md`

Default stack:

- Static HTML/CSS/JS
- GSAP if available through CDN
- IntersectionObserver fallback for scroll reveals

Use `DESIGN.md` as the contract and `prompt-pack.md` as the reusable prompt asset library. Do not improvise a new design direction if the prompt pack already names the visual archetype, layout archetype, section prompts, interaction prompts, and negative prompt.

## Interaction Minimum

- Hover: CTA or card movement
- Click: visible mode/detail/contact action response
- Scroll: section reveal or progress
- Reduced motion: page remains readable and usable when animation is disabled

## Reference Fidelity Minimum

- The first viewport should visibly reflect the selected structure or mood reference without copying it one-to-one.
- The builder must implement at least one motion/component idea from the reference evidence.
- The page must avoid banned generic defaults from the negative prompt.

## Revision Prompt Pattern

```text
Change:
- ...

Keep:
- DESIGN.md direction
- responsive layout
- SEO/OG/GEO basics
- beginner-editable file split

After editing, explain changed files and rerun QA.
```

## QA

Run:

```bash
node scripts/run-visual-qa.mjs --target examples/kkongdon/site --out qa/
```

Pass only when desktop/mobile screenshots and `report.json` exist and report `pass: true`.
