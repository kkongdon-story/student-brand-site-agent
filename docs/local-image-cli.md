# Local Image CLI

The lecture package installs three command aliases:

- `imagen`
- `imagegen`
- `openai-image`

They all run the same safe local adapter.

## No API Key Mode

Without `OPENAI_API_KEY`, the CLI creates an SVG prompt card. This keeps the class flow working even when students do not have API keys yet.

```bash
imagegen --prompt "personal brand character, paper texture, friendly AI guide" --out assets/character.svg
```

## Real OpenAI Image Mode

Set `OPENAI_API_KEY`, then request a real generated image:

```bash
openai-image --prompt "personal brand character, paper texture, friendly AI guide" --out assets/character.png --require-ai
```

The adapter calls the OpenAI Images API with a GPT Image model. The default model is `gpt-image-1.5`.

## Google Imagen 2 / Vertex AI Mode

Imagen 2 is not a local no-key model. It runs through Google Cloud Vertex AI, so the machine needs a Google Cloud project, billing/API access, and authentication.

One-time setup:

```bash
gcloud auth login
gcloud config set project YOUR_GCP_PROJECT_ID
```

Then generate with the Vertex provider:

```bash
imagen --provider vertex \
  --model imagegeneration@002 \
  --project YOUR_GCP_PROJECT_ID \
  --location us-central1 \
  --prompt "personal brand character, editorial landing page hero, refined web design" \
  --out assets/character.png \
  --require-ai
```

Useful environment variables:

```bash
GOOGLE_CLOUD_PROJECT=YOUR_GCP_PROJECT_ID
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_ACCESS_TOKEN=...
```

If `GOOGLE_ACCESS_TOKEN` is not set, the CLI tries `gcloud auth print-access-token`.

For classes, keep `--require-ai` off when you want a safe fallback SVG instead of stopping the flow.

## Useful Options

```bash
imagegen --prompt-file image-brief.md --out assets/og-image.svg
openai-image --prompt-file image-brief.md --out assets/og-image.png --size 1536x1024 --quality high --require-ai
imagen --provider vertex --model imagegeneration@002 --prompt-file image-brief.md --out assets/character.png --aspect-ratio 16:9 --require-ai
```

## Model Note

Use `imagegeneration@002` when you specifically want Imagen 2 through Vertex AI. Newer Imagen models can be passed through `--model` when the Google Cloud project has access.
