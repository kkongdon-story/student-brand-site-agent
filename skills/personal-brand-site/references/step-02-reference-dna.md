# Stage 2 - Reference Evidence and Prompt Assets

Goal: turn taste into AI-readable design evidence, not a loose inspiration list.

This stage upgrades the student's reference work into two files:

- `reference-dna.md`: what the references prove and what should be borrowed or avoided.
- `prompt-pack.md`: reusable prompts for the full page, key sections, and interactions.

## Two Modes

### Automatic Mode

Use this when the student does not know where to search or says "find references for me."

Inputs:

- Stage 1 brand materials
- Desired visitor action
- Student's rough taste words, such as Hongdae, editorial, premium, playful, cinematic, calm, bold, handmade, or experimental

Process:

1. Recommend 3 reference directions only: structure, mood, and motion/component.
2. For each direction, give a search source or candidate site category, then explain why it fits the brand.
3. If browsing or screenshots are available, capture the first viewport plus one useful section. If capture is not available, record the exact capture task for the student.
4. Convert each reference into bring/avoid/design-language notes.
5. Produce a `prompt-pack.md` that can be pasted into Codex later.

Output:

```text
# Reference DNA - Automatic Mode

## Brand Direction Read From Stage 1
## Reference Pack
## Capture Manifest
## AI-Readable Materials
## Bring
## Avoid
## Visual Archetype
## Layout Archetype
## Design Language For DESIGN.md
## Prompt Asset Summary
```

### Manual Mode

Use this when the student provides a landing page URL, screenshot, image folder, or pasted reference notes.

Ask one question at a time:

1. Which exact part do you like most: first screen, typography, spacing, color, image, button, scroll, or overall mood?
2. What should your site borrow strongly?
3. What must not be copied?
4. How strong should motion feel: subtle, expressive, playful, cinematic, or experimental?
5. What image device is needed: character, portrait, photo, video, object, collage, or abstract texture?

Translate the answer into:

| Dimension | Required Notes |
| --- | --- |
| Color | background, accent, contrast, material |
| Type | scale, weight, Korean/English mood, hierarchy |
| Spacing | dense, airy, editorial, grid, full-bleed |
| Layout | hero, sections, asymmetry, nav, footer |
| CTA | wording, position, repeated moments |
| Component | nav, button, card, proof rail, gallery, contact block |
| Image role | hero, character, mascot, proof, texture, OG |
| Cursor | hover, magnetic, trail, press, none |
| Scroll | reveal, pin, parallax, section snap, progress |
| Motion | duration, easing, stagger, transform, reduced-motion fallback |
| Bring | what to adapt into this brand |
| Avoid | what would be imitation, mismatch, or generic AI design |

## Reference Pack Rule

Every selected reference must become a small evidence card.

```text
Reference:
Source URL or file:
Capture:
Liked section:
Bring:
Avoid:
AI-readable material:
Design language:
Prompt asset:
```

The `AI-readable material` field must say what the builder can actually consume:

- URL only
- screenshot path
- screenshot plus memo
- color palette
- typography description
- component name
- motion description
- code idea

## Prompt Asset Rule

The stage must produce `prompt-pack.md`. Use this structure:

```text
# Prompt Pack

## Design-First Super Prompt
GOAL:
FORMAT:
LAYOUT:
TYPE SYSTEM:
COLOR + MATERIAL:
IMAGERY / UI STYLE:
COPY:
CONSTRAINTS:
NEGATIVE PROMPT:

## Section Prompts
## Interaction Prompts
## Image Prompts
## Revision Prompts
```

The super prompt should be clear enough that another AI can recreate the direction without reading the whole chat. It must include a negative prompt that blocks generic AI defaults, weak placeholders, copied references, and low-quality image usage.

## High-End Design Guardrails

Use these guardrails when the student wants a site that feels more designed than a basic AI template:

- Define a visual archetype, such as editorial studio, independent magazine, cultural poster, boutique lab, cinematic diary, or productized personal brand.
- Define a layout archetype, such as hero-as-poster, split editorial hero, scrolling manifesto, sticky proof stack, section-by-section scrollytelling, or gallery-first page.
- Name the design system constraints: type scale, spacing rhythm, border radius, line weight, button treatment, image treatment, and motion intensity.
- Ban generic defaults: random gradients, card-heavy SaaS layouts, vague "modern premium" language, stock-photo atmosphere, unresponsive hero text, and interaction-free static pages.
- Prefer transform and opacity animation. Add reduced-motion behavior for visitors who disable animation.

## Reference Rule

The agent must not say "make it like this site." It must say exactly which visual and interaction decisions should be translated into the student's brand.
