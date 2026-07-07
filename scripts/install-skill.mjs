#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const args = process.argv.slice(2);

function argValue(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : "";
}

const force = args.includes("--force");
const source = path.resolve("skills/personal-brand-site");
const target = path.resolve(
  argValue("--target") || path.join(os.homedir(), ".codex", "skills", "personal-brand-site")
);

if (!fs.existsSync(path.join(source, "SKILL.md"))) {
  console.error(`Missing source skill: ${source}`);
  process.exit(2);
}

if (fs.existsSync(target) && !force) {
  console.error(`Target already exists: ${target}`);
  console.error("Re-run with --force to replace it, or pass --target <path>.");
  process.exit(1);
}

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.cpSync(source, target, { recursive: true, force: true });

console.log(JSON.stringify({
  ok: true,
  source,
  target,
  next: `Use the skill from ${path.join(target, "SKILL.md")}`
}, null, 2));
