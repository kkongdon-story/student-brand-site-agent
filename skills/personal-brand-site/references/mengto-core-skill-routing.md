# MengTo Core Skill Routing

Use this routing file when the student wants a stronger result than a generic AI website. The vendored source skills live in `vendor/mengto-skills/`.

## Current Agent Flow

The personal brand site agent still runs in four stages:

1. Stage 1: Brand materials
2. Stage 2: Reference evidence, prompt assets, and image assets
3. Stage 3: DESIGN.md contract
4. Stage 4: Static site build, browser QA, and publish pack

The MengTo core skills strengthen stages 2-4.

## Core Technical Skills

| Local skill | Source file | Use in this agent |
| --- | --- | --- |
| Reference Capture | `vendor/mengto-skills/stitched-full-page-capture/SKILL.md` | Capture real website sections instead of trusting a single screenshot. Use for manual reference mode and gallery/reference homework. |
| Interaction Extraction | `vendor/mengto-skills/html-to-interaction-prompts/SKILL.md` | Turn an existing page or HTML reference into hover, click, scroll, and component prompts. Use when a student says "I like this movement." |
| Design-First Prompting | `vendor/mengto-skills/design-first-ui-prompting/SKILL.md` | Convert fuzzy taste into GOAL, FORMAT, LAYOUT, TYPE SYSTEM, COLOR + MATERIAL, CONSTRAINTS, and NEGATIVE PROMPT. Use before DESIGN.md. |
| High-End Visual Design | `vendor/mengto-skills/high-end-visual-design/SKILL.md` | Add anti-generic design rules, visual archetype, layout archetype, premium spacing, button structure, and motion rules. Use when the site feels like a template. |
| Landing Page Structure | `vendor/mengto-skills/landing-page/SKILL.md` | Keep the page focused on one audience, one offer, and one action. Use for hero, proof, FAQ, and CTA logic. |
| Scroll Reveal | `vendor/mengto-skills/animation-on-scroll/SKILL.md` | Add lightweight IntersectionObserver reveal behavior for beginner-editable static HTML/CSS/JS. Use by default for Stage 4. |
| Cinematic Scrollytelling | `vendor/mengto-skills/cinematic-scroll-storytelling/SKILL.md` | Use only when the student wants cinematic storytelling, sticky stacks, parallax, kinetic typography, or GSAP/Lenis. |
| Animation Performance | `vendor/mengto-skills/optimize-web-animations/SKILL.md` | Check that motion is not janky, respects reduced motion, pauses offscreen work, and remains mobile-safe. Use during QA. |

## Stage 2 Routing

Automatic mode:

1. Use `landing-page` to clarify one audience, one offer, one action.
2. Use `design-first-ui-prompting` to make the first prompt skeleton.
3. Use `high-end-visual-design` to define visual archetype, layout archetype, anti-patterns, and premium constraints.
4. Use `stitched-full-page-capture` when live URLs need screenshots.
5. Use `html-to-interaction-prompts` when a reference has movement or component behavior worth extracting.

Manual mode:

1. If the student gives a URL, capture first viewport, important sections, and one interaction or motion moment.
2. If the student gives screenshots, record the exact file paths and what each screenshot proves.
3. Convert evidence into `reference-dna.md`.
4. Convert reusable implementation language into `prompt-pack.md`.

## Stage 3 Routing

Use `design-first-ui-prompting` and `high-end-visual-design` to fill:

- `Reference Evidence Pack`
- `Design System Constraints`
- `Prompt Pack`
- `Motion and Interaction`
- `Must Not Drift`

Use `landing-page` to check:

- hero clarity
- single CTA
- proof near claims
- objection/FAQ needs
- final CTA

## Stage 4 Routing

Default motion:

- Use `animation-on-scroll` for simple section reveals.
- Use native CSS transitions for hover/click.
- Use transform and opacity before heavier animation tools.

Advanced motion:

- Use `cinematic-scroll-storytelling` only when the DESIGN.md requires pinned scenes, sticky stacks, parallax, kinetic typography, or scrubbed scroll timelines.
- If GSAP/Lenis is used, include a reduced-motion fallback and mobile simplification.

QA:

- Use `optimize-web-animations` to verify motion performance, reduced-motion behavior, and no unnecessary offscreen animation work.
- Browser QA must still produce desktop/mobile screenshots and `report.json`.

## Beginner Translation Rule

Do not expose the student to all technical names at once. Translate like this:

- `stitched-full-page-capture` -> "사이트 전체를 나눠서 캡처하는 방법"
- `design-first-ui-prompting` -> "AI가 이해하는 디자인 지시문 만들기"
- `high-end-visual-design` -> "흔한 AI 템플릿처럼 보이지 않게 막는 규칙"
- `animation-on-scroll` -> "스크롤할 때 자연스럽게 나타나는 효과"
- `cinematic-scroll-storytelling` -> "내려가면서 이야기가 펼쳐지는 홈페이지"
- `optimize-web-animations` -> "움직임이 버벅이지 않게 확인하는 법"
