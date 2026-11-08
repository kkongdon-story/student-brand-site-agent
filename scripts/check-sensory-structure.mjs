import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const siteDir = resolve(root, "outputs/kkongdon-ai-brand-site/site");
const html = readFileSync(resolve(siteDir, "index.html"), "utf8");
const css = readFileSync(resolve(siteDir, "styles.css"), "utf8");
const js = readFileSync(resolve(siteDir, "script.js"), "utf8");

const checks = [
  {
    id: "word-hero",
    ok: html.includes("word-hero") && html.includes("data-word-cycle") && css.includes(".word-hero"),
    why: "hero must be built from large editorial word composition, not a normal paragraph headline"
  },
  {
    id: "media-reel",
    ok: html.includes("media-reel") && css.includes(".media-reel") && css.includes("@keyframes reel"),
    why: "a black moving media/work strip must arrive immediately after the hero"
  },
  {
    id: "work-strip",
    ok: html.includes("work-strip") && css.includes(".work-strip") && (html.match(/project-[a-z-]+\.png/g) || []).length >= 3,
    why: "real project screenshots must appear as inspectable proof, not decorative cards only"
  },
  {
    id: "chapter-black",
    ok: (html.match(/chapter-black/g) || []).length >= 2 && css.includes(".chapter-black"),
    why: "the page must alternate white and black editorial chapters like the reference rhythm"
  },
  {
    id: "no-generic-section-labels",
    ok: !/(0[1-9]\s*\/|Project\s+0[1-9]|SECTION\s+0[1-9])/i.test(html),
    why: "avoid template-like section numbering and generic project labels"
  },
  {
    id: "mobile-cjk-hero",
    ok: css.includes("@media (max-width: 720px)") && css.includes(".word-hero") && css.includes("word-line"),
    why: "mobile CSS must explicitly compact the Korean word composition"
  },
  {
    id: "interaction-hooks",
    ok: js.includes("data-word-cycle") && js.includes("media-reel") && js.includes("scroll-progress"),
    why: "JS must support word cycling, reel affordance, and scroll feedback"
  }
];

const failed = checks.filter((check) => !check.ok);

console.log(JSON.stringify({ pass: failed.length === 0, checks }, null, 2));

if (failed.length > 0) {
  console.error(`Sensory structure check failed: ${failed.map((check) => check.id).join(", ")}`);
  process.exit(1);
}
