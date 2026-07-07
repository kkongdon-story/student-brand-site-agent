#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const VERSION = "0.1.0";
const DEFAULT_SIZE = "1024x1024";
const OPENAI_ENDPOINT = "https://api.openai.com/v1/images/generations";
const DEFAULT_VERTEX_LOCATION = "us-central1";

function parseArgs(argv) {
  const args = {
    prompt: "",
    out: "",
    provider: "auto",
    model: "",
    size: DEFAULT_SIZE,
    quality: "medium",
    format: "",
    background: "auto",
    project: "",
    location: DEFAULT_VERTEX_LOCATION,
    aspectRatio: "1:1",
    negativePrompt: "",
    requireAi: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--prompt" || token === "-p") args.prompt = argv[++index] || "";
    else if (token === "--prompt-file") args.prompt = readText(argv[++index] || "");
    else if (token === "--out" || token === "-o") args.out = argv[++index] || "";
    else if (token === "--provider") args.provider = argv[++index] || "auto";
    else if (token === "--model") args.model = argv[++index] || "";
    else if (token === "--size") args.size = argv[++index] || DEFAULT_SIZE;
    else if (token === "--quality") args.quality = argv[++index] || "medium";
    else if (token === "--format") args.format = argv[++index] || "";
    else if (token === "--background") args.background = argv[++index] || "auto";
    else if (token === "--project") args.project = argv[++index] || "";
    else if (token === "--location") args.location = argv[++index] || DEFAULT_VERTEX_LOCATION;
    else if (token === "--aspect-ratio") args.aspectRatio = argv[++index] || "1:1";
    else if (token === "--negative-prompt") args.negativePrompt = argv[++index] || "";
    else if (token === "--require-ai") args.requireAi = true;
    else if (token === "--version" || token === "-v") {
      console.log(VERSION);
      process.exit(0);
    } else if (token === "--help" || token === "-h") {
      printHelp();
      process.exit(0);
    } else if (!args.prompt) {
      args.prompt = token;
    }
  }

  return args;
}

function readText(file) {
  if (!file) return "";
  return fs.readFileSync(path.resolve(file), "utf8").trim();
}

function printHelp() {
  console.log(`kkongdon local image CLI ${VERSION}

Usage:
  imagegen --prompt "brand character, paper texture" --out assets/character.svg
  imagen --prompt-file image-brief.md --out assets/character.svg
  openai-image --prompt "social preview" --out assets/og-image.png --require-ai

Options:
  --prompt, -p       Prompt text.
  --prompt-file      Read prompt from a file.
  --out, -o          Output file. Defaults to generated-image.svg without API keys.
  --provider         auto, openai, or placeholder. Default: auto.
  --model            Image model. OpenAI default: gpt-image-1.5. Vertex example: imagegeneration@002.
  --size             1024x1024, 1024x1536, or 1536x1024. Default: 1024x1024.
  --quality          low, medium, or high. Default: medium.
  --format           png, webp, jpeg, or svg. Default follows --out extension.
  --background       auto, transparent, opaque. Passed to OpenAI when supported.
  --project          Google Cloud project for --provider vertex.
  --location         Google Cloud Vertex AI region. Default: us-central1.
  --aspect-ratio     Vertex Imagen aspect ratio. Default: 1:1.
  --negative-prompt  Vertex Imagen negative prompt.
  --require-ai       Fail instead of creating a local placeholder when no API key exists.

Environment:
  OPENAI_API_KEY     Enables real OpenAI image generation.
  GOOGLE_CLOUD_PROJECT or VERTEX_AI_PROJECT
                    Enables Vertex project detection.
  GOOGLE_CLOUD_LOCATION or VERTEX_AI_LOCATION
                    Overrides the default Vertex region.
  GOOGLE_ACCESS_TOKEN
                    Optional Vertex bearer token. Otherwise the CLI tries gcloud.

No-key fallback:
  Without OPENAI_API_KEY, this CLI creates an SVG prompt card so lectures can continue
  without API setup. Use --require-ai when you need a real AI-generated image.

Imagen 2 / Vertex AI:
  imagen --provider vertex --model imagegeneration@002 --project my-gcp-project \\
    --prompt "brand character, editorial web hero" --out assets/character.png --require-ai`);
}

function inferFormat(out, explicitFormat, provider) {
  if (explicitFormat) return explicitFormat.replace(/^\./, "").toLowerCase();
  const ext = path.extname(out || "").replace(/^\./, "").toLowerCase();
  if (ext) return ext === "jpg" ? "jpeg" : ext;
  return provider === "placeholder" ? "svg" : "png";
}

function resolveProvider(args) {
  if (args.provider !== "auto") return args.provider;
  return process.env.OPENAI_API_KEY ? "openai" : "placeholder";
}

function defaultOut(provider, format) {
  return `generated-image.${provider === "placeholder" ? "svg" : format || "png"}`;
}

function ensurePrompt(prompt) {
  const clean = (prompt || "").trim();
  if (!clean) {
    console.error("Missing prompt. Pass --prompt or --prompt-file.");
    process.exit(2);
  }
  return clean;
}

function ensureParent(file) {
  fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
}

function runCommand(command, args) {
  const direct = spawnSync(command, args, {
    encoding: "utf8",
    windowsHide: true
  });
  if (direct.status === 0) return cleanCommandOutput(direct.stdout);

  const shellCommand = [command, ...args.map(quoteShellArg)].join(" ");
  const viaShell = spawnSync(shellCommand, {
    encoding: "utf8",
    windowsHide: true,
    shell: true
  });
  if (viaShell.status !== 0) return "";
  return cleanCommandOutput(viaShell.stdout);
}

function quoteShellArg(value) {
  return `"${String(value).replace(/"/g, '\\"')}"`;
}

function cleanCommandOutput(value) {
  const clean = (value || "").trim();
  return clean === "(unset)" ? "" : clean;
}

function resolveVertexProject(args) {
  if (args.project) return args.project;
  if (process.env.GOOGLE_CLOUD_PROJECT) return process.env.GOOGLE_CLOUD_PROJECT;
  if (process.env.VERTEX_AI_PROJECT) return process.env.VERTEX_AI_PROJECT;
  return runCommand("gcloud", ["config", "get-value", "project"]);
}

function resolveVertexLocation(args) {
  return args.location || process.env.GOOGLE_CLOUD_LOCATION || process.env.VERTEX_AI_LOCATION || DEFAULT_VERTEX_LOCATION;
}

function resolveGoogleAccessToken() {
  if (process.env.GOOGLE_ACCESS_TOKEN) return process.env.GOOGLE_ACCESS_TOKEN;
  return runCommand("gcloud", ["auth", "print-access-token"]);
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapWords(text, maxChars) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 9);
}

function writePlaceholder(prompt, out) {
  const lines = wrapWords(prompt, 48);
  const lineSvg = lines
    .map((line, index) => `<text x="80" y="${190 + index * 38}" fill="#251812" font-family="Arial, sans-serif" font-size="26">${escapeXml(line)}</text>`)
    .join("\n  ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" role="img" aria-labelledby="title desc">
  <title id="title">Local image prompt card</title>
  <desc id="desc">A placeholder image generated locally from a text prompt.</desc>
  <rect width="1200" height="900" fill="#f6efe2"/>
  <rect x="38" y="38" width="1124" height="824" rx="28" fill="none" stroke="#251812" stroke-width="8"/>
  <circle cx="990" cy="170" r="82" fill="#3f6f4f"/>
  <path d="M945 170c28 32 69 32 97 0" fill="none" stroke="#f6efe2" stroke-width="9" stroke-linecap="round"/>
  <circle cx="962" cy="145" r="10" fill="#f6efe2"/>
  <circle cx="1018" cy="145" r="10" fill="#f6efe2"/>
  <text x="80" y="105" fill="#8a5a32" font-family="Arial, sans-serif" font-size="30" font-weight="700">LOCAL PLACEHOLDER</text>
  <text x="80" y="150" fill="#251812" font-family="Arial, sans-serif" font-size="38" font-weight="900">Replace with AI image when ready</text>
  ${lineSvg}
  <text x="80" y="815" fill="#8a5a32" font-family="Arial, sans-serif" font-size="22">Generated by imagegen fallback. Set OPENAI_API_KEY and use --require-ai for real image generation.</text>
</svg>
`;
  ensureParent(out);
  fs.writeFileSync(path.resolve(out), svg, "utf8");
  return {
    provider: "placeholder",
    out: path.resolve(out),
    note: "No API key was used. This is a local SVG prompt card, not an AI-generated image."
  };
}

async function writeOpenAiImage(prompt, args, out, format) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set.");
  }

  const model = args.model || "gpt-image-1.5";
  const body = {
    model,
    prompt,
    n: 1,
    size: args.size,
    quality: args.quality
  };
  if (format && ["png", "webp", "jpeg"].includes(format)) body.output_format = format;
  if (args.background && args.background !== "auto") body.background = args.background;

  const response = await fetch(OPENAI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload.error?.message || response.statusText || "OpenAI image request failed.";
    throw new Error(message);
  }

  const item = payload.data?.[0];
  ensureParent(out);
  if (item?.b64_json) {
    fs.writeFileSync(path.resolve(out), Buffer.from(item.b64_json, "base64"));
  } else if (item?.url) {
    const imageResponse = await fetch(item.url);
    if (!imageResponse.ok) throw new Error(`Could not download generated image: ${imageResponse.status}`);
    fs.writeFileSync(path.resolve(out), Buffer.from(await imageResponse.arrayBuffer()));
  } else {
    throw new Error("OpenAI response did not include b64_json or url image data.");
  }

  return {
    provider: "openai",
    model,
    out: path.resolve(out),
    usage: payload.usage || null
  };
}

function findBase64Image(value) {
  if (!value || typeof value !== "object") return "";
  if (typeof value.bytesBase64Encoded === "string") return value.bytesBase64Encoded;
  if (typeof value.imageBytes === "string") return value.imageBytes;
  if (typeof value.b64_json === "string") return value.b64_json;
  for (const nested of Object.values(value)) {
    if (Array.isArray(nested)) {
      for (const item of nested) {
        const found = findBase64Image(item);
        if (found) return found;
      }
    } else if (nested && typeof nested === "object") {
      const found = findBase64Image(nested);
      if (found) return found;
    }
  }
  return "";
}

async function writeVertexImage(prompt, args, out) {
  const project = resolveVertexProject(args);
  const location = resolveVertexLocation(args);
  const token = resolveGoogleAccessToken();
  const model = args.model || "imagegeneration@002";

  if (!project) {
    throw new Error("Google Cloud project is not configured. Pass --project or set GOOGLE_CLOUD_PROJECT.");
  }
  if (!token) {
    throw new Error("Google Cloud access token is not available. Run gcloud auth login, or set GOOGLE_ACCESS_TOKEN.");
  }

  const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:predict`;
  const parameters = { sampleCount: 1 };
  if (args.aspectRatio) parameters.aspectRatio = args.aspectRatio;
  if (args.negativePrompt) parameters.negativePrompt = args.negativePrompt;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters
    })
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload.error?.message || response.statusText || "Vertex AI Imagen request failed.";
    throw new Error(message);
  }

  const imageBase64 = findBase64Image(payload.predictions?.[0] || payload);
  if (!imageBase64) {
    throw new Error("Vertex AI response did not include base64 image data.");
  }

  ensureParent(out);
  fs.writeFileSync(path.resolve(out), Buffer.from(imageBase64, "base64"));

  return {
    provider: "vertex",
    model,
    project,
    location,
    out: path.resolve(out)
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const prompt = ensurePrompt(args.prompt);
  const provider = resolveProvider(args);
  const format = inferFormat(args.out, args.format, provider);
  const out = args.out || defaultOut(provider, format);

  if (provider === "placeholder") {
    if (args.requireAi) {
      console.error("No AI provider is configured. Set OPENAI_API_KEY or remove --require-ai.");
      process.exit(1);
    }
    const result = writePlaceholder(prompt, out.endsWith(".svg") ? out : `${out}.svg`);
    console.log(JSON.stringify({ ok: true, ...result }, null, 2));
    return;
  }

  if (!["openai", "vertex"].includes(provider)) {
    console.error(`Unsupported provider: ${provider}. Use auto, openai, vertex, or placeholder.`);
    process.exit(2);
  }

  try {
    const result = provider === "vertex"
      ? await writeVertexImage(prompt, args, out)
      : await writeOpenAiImage(prompt, args, out, format);
    console.log(JSON.stringify({ ok: true, ...result }, null, 2));
  } catch (error) {
    if (args.requireAi) {
      console.error(error.message);
      process.exitCode = 1;
      return;
    }
    const fallbackOut = out.endsWith(".svg") ? out : `${out}.svg`;
    const result = writePlaceholder(prompt, fallbackOut);
    console.log(JSON.stringify({ ok: true, fallbackFrom: provider, error: error.message, ...result }, null, 2));
  }
}

main();
