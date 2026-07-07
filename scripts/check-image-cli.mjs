#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const args = new Set(process.argv.slice(2));
const json = args.has("--json");

const candidates = [
  { name: "imagen", command: "imagen" },
  { name: "imagegen", command: "imagegen" },
  { name: "openai-image", command: "openai-image" }
];

function check(command) {
  const isWin = process.platform === "win32";
  const probe = isWin ? "where" : "command";
  const probeArgs = isWin ? [command] : ["-v", command];
  const result = spawnSync(probe, probeArgs, { encoding: "utf8", shell: !isWin });
  return {
    available: result.status === 0,
    path: result.status === 0 ? result.stdout.trim().split(/\r?\n/)[0] : null
  };
}

const checks = candidates.map((candidate) => ({
  ...candidate,
  ...check(candidate.command)
}));

const selected = checks.find((item) => item.available) || null;
const result = {
  ok: true,
  selected: selected ? selected.name : null,
  available: Boolean(selected),
  candidates: checks,
  nextStep: selected
    ? `Use ${selected.command} for local image generation.`
    : "No local image CLI found. Keep image prompts in image-brief.md and install or configure imagen/imagegen before live generation."
};

if (json) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(selected ? `found: ${selected.name} ${selected.path}` : result.nextStep);
}

