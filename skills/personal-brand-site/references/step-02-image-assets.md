# Stage 2B - Image Assets

Goal: create or request the visual assets needed for a site that does not feel like a generic AI template.

## Local CLI First

Detect a local image command before generating:

```bash
node scripts/check-image-cli.mjs --json
```

Supported command names:

- `imagen`
- `imagegen`
- `openai-image`

If no command exists, do not fake an image. Write the image prompt and asset task into `image-brief.md`.

## Asset Types

- Character or mascot
- Hero key visual
- OG image
- Section texture or object
- Background motion still

## Quality Loop

For every generated or provided asset, review:

1. Fits the brand one-line identity
2. Does not look like stock AI art
3. Works on dark and light backgrounds if needed
4. Has no broken Korean text
5. Has enough empty space for layout
6. Can be cropped for mobile

## Prompt Shape

```text
Use case:
Asset type:
Brand one-line:
Subject:
Style:
Composition:
Motion implication:
Palette:
Avoid:
Output filename:
```

