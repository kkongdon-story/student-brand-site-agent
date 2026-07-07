# Student Brand Site Agent

This package contains a Codex/Claude-compatible skill for building personal-brand websites with students.

It guides four stages:

1. Brand materials
2. Reference DNA and image assets
3. `DESIGN.md` contract
4. Static HTML/CSS/JS build, browser QA, and publishing checks

## Quick Start

```bash
npm install
npm run install:skill
npm run install:image-cli
npm run validate:example
npm run qa:example
```

If Playwright browsers are missing, run:

```bash
npx playwright install chromium
```

## Local Image CLI

The lecture flow assumes students can use a local image-generation command without writing API code.

Check the local image command surface:

```bash
npm run check:image-cli
```

Supported command names are `imagen`, `imagegen`, and `openai-image`. This repo includes a safe local adapter at `tools/local-image-cli/`. Without an API key it creates SVG prompt cards; with `OPENAI_API_KEY` it can call the OpenAI Images API. For Google Imagen 2, use the Vertex AI provider with `--provider vertex --model imagegeneration@002` after Google Cloud authentication is configured.

Install the local adapter:

```bash
npm run install:image-cli
```

Imagen 2 example:

```bash
imagen --provider vertex --model imagegeneration@002 --project YOUR_GCP_PROJECT_ID --location us-central1 --prompt "personal brand character, editorial landing page hero" --out assets/character.png --require-ai
```

## Important Paths

- Skill entry: `skills/personal-brand-site/SKILL.md`
- Templates: `skills/personal-brand-site/assets/templates/`
- Kkongdon example: `examples/kkongdon/`
- QA scripts: `scripts/`

## Using The Agent In Codex

After installation, start a Codex thread with:

```text
Use the personal-brand-site skill.
I want to create a personal brand homepage.
Do not code yet. Start from Stage 1 brand materials and ask me one question at a time.
```

If the skill is not auto-detected, paste the local skill path:

```text
~/.codex/skills/personal-brand-site/SKILL.md
```

## Distribution

Publish this folder as its own GitHub repository. Do not publish the full parent workspace.

See `PUBLISH.md` for the first push, student install, and classroom flow.
