#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("skills/personal-brand-site/vendor/mengto-skills");

const required = [
  "LICENSE-MengTo-Skills",
  "README.md",
  "stitched-full-page-capture/SKILL.md",
  "html-to-interaction-prompts/SKILL.md",
  "design-first-ui-prompting/SKILL.md",
  "high-end-visual-design/SKILL.md",
  "landing-page/SKILL.md",
  "animation-on-scroll/SKILL.md",
  "cinematic-scroll-storytelling/SKILL.md",
  "optimize-web-animations/SKILL.md"
];

const errors = [];

for (const rel of required) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    errors.push(`Missing vendored MengTo skill file: ${rel}`);
    continue;
  }

  const stat = fs.statSync(abs);
  if (!stat.isFile() || stat.size < 50) {
    errors.push(`Vendored MengTo skill file is unexpectedly small: ${rel}`);
  }
}

const licensePath = path.join(root, "LICENSE-MengTo-Skills");
if (fs.existsSync(licensePath)) {
  const license = fs.readFileSync(licensePath, "utf8");
  if (!license.includes("MIT License") || !license.includes("Copyright (c) 2026 Meng To")) {
    errors.push("Vendored MengTo license notice is missing expected MIT attribution.");
  }
}

if (errors.length) {
  console.error("Vendored MengTo skill validation failed.");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Vendored MengTo skill validation passed: ${required.length} files`);
