#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
function arg(name, fallback = null) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}

const target = arg("--target");
const out = arg("--out");

if (!target || !out) {
  console.error("Usage: node scripts/run-visual-qa.mjs --target <site-dir> --out <evidence-dir>");
  process.exit(2);
}

const siteDir = path.resolve(target);
const outDir = path.resolve(out);
const indexPath = path.join(siteDir, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error(`Missing site index: ${indexPath}`);
  process.exit(2);
}

fs.mkdirSync(outDir, { recursive: true });

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch (error) {
  const report = {
    pass: false,
    error: "playwright_missing",
    message: "Install Playwright to run browser QA.",
    detail: error.message
  };
  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
  console.error(report.message);
  process.exit(1);
}

const requiredPublishFiles = ["robots.txt", "sitemap.xml", "llms.txt"];

function fileExistsRelative(relativePath) {
  const normalized = path.normalize(relativePath).replace(/^[/\\]+/, "");
  const resolved = path.resolve(siteDir, normalized);
  const rel = path.relative(siteDir, resolved);
  return Boolean(rel && !rel.startsWith("..") && !path.isAbsolute(rel) && fs.existsSync(resolved));
}

function startServer(root) {
  const server = http.createServer((req, res) => {
    let rawPath;
    try {
      rawPath = decodeURIComponent((req.url || "/").split("?")[0]);
    } catch {
      res.writeHead(400);
      res.end("Bad request");
      return;
    }

    const raw = rawPath === "/" ? "/index.html" : rawPath;
    const requested = path.resolve(root, `.${raw}`);
    const relative = path.relative(root, requested);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    if (!fs.existsSync(requested) || fs.statSync(requested).isDirectory()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(requested);
    const type = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp"
    }[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    fs.createReadStream(requested).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({ server, url: `http://127.0.0.1:${address.port}/` });
    });
  });
}

async function scrollThrough(page, steps) {
  await page.evaluate(async (count) => {
    const height = document.documentElement.scrollHeight;
    for (let i = 0; i <= count; i += 1) {
      window.scrollTo(0, height * (i / count));
      await new Promise((resolve) => setTimeout(resolve, 180));
    }
    window.scrollTo(0, 0);
  }, steps);
  await page.waitForTimeout(300);
}

async function readPublishMetadata(page) {
  return page.evaluate(() => {
    const attr = (selector, name) => document.querySelector(selector)?.getAttribute(name)?.trim() || "";
    const text = (selector) => document.querySelector(selector)?.textContent?.trim() || "";
    return {
      title: document.title.trim(),
      metaDescription: attr("meta[name='description']", "content"),
      ogTitle: attr("meta[property='og:title']", "content"),
      ogDescription: attr("meta[property='og:description']", "content"),
      ogImage: attr("meta[property='og:image']", "content"),
      canonical: attr("link[rel='canonical']", "href"),
      jsonLdCount: document.querySelectorAll("script[type='application/ld+json']").length,
      h1: text("h1"),
      internalLinks: [...document.querySelectorAll("a[href^='#']")].map((link) => link.getAttribute("href")),
      externalLinks: [...document.querySelectorAll("a[href^='http://'], a[href^='https://']")].map((link) => link.getAttribute("href")),
      assetRefs: [
        ...[...document.querySelectorAll("img[src]")].map((node) => node.getAttribute("src")),
        ...[...document.querySelectorAll("script[src]")].map((node) => node.getAttribute("src")),
        ...[...document.querySelectorAll("link[href]")].map((node) => node.getAttribute("href")),
        attr("meta[property='og:image']", "content")
      ].filter(Boolean)
    };
  });
}

function localAssetStatus(refs) {
  return refs
    .filter((ref) => !/^https?:\/\//i.test(ref) && !ref.startsWith("#") && !ref.startsWith("data:"))
    .map((ref) => ({
      ref,
      exists: fileExistsRelative(ref.split("#")[0].split("?")[0])
    }));
}

function publishFilesStatus() {
  return requiredPublishFiles.map((name) => ({
    file: name,
    exists: fs.existsSync(path.join(siteDir, name)),
    nonEmpty: fs.existsSync(path.join(siteDir, name)) && fs.readFileSync(path.join(siteDir, name), "utf8").trim().length > 0
  }));
}

function validJsonLdBlocks(indexHtml) {
  const blocks = [...indexHtml.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  return blocks.map((block) => {
    try {
      JSON.parse(block[1]);
      return true;
    } catch {
      return false;
    }
  });
}

const { server, url } = await startServer(siteDir);
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await scrollThrough(page, 4);
  await page.screenshot({ path: path.join(outDir, "desktop.png"), fullPage: true });

  const cta = page.locator("[data-qa='primary-cta']").first();
  await cta.screenshot({ path: path.join(outDir, "hover-before.png") });
  const hoverBefore = await cta.evaluate((node) => {
    const style = window.getComputedStyle(node);
    const box = node.getBoundingClientRect();
    return {
      transform: style.transform,
      boxShadow: style.boxShadow,
      top: box.top,
      left: box.left
    };
  });
  await cta.hover();
  await page.waitForTimeout(250);
  await cta.screenshot({ path: path.join(outDir, "hover-after.png") });
  const hoverAfter = await cta.evaluate((node) => {
    const style = window.getComputedStyle(node);
    const box = node.getBoundingClientRect();
    return {
      transform: style.transform,
      boxShadow: style.boxShadow,
      top: box.top,
      left: box.left
    };
  });
  const hoverChanged =
    hoverBefore.transform !== hoverAfter.transform ||
    hoverBefore.boxShadow !== hoverAfter.boxShadow ||
    Math.abs(hoverBefore.top - hoverAfter.top) > 0.5 ||
    Math.abs(hoverBefore.left - hoverAfter.left) > 0.5;

  const clickTarget = page.locator("[data-qa='keyword-chip']").first();
  const textTarget = page.locator("[data-qa='hero-subtitle']").first();
  const clickBefore = (await textTarget.textContent())?.trim() || "";
  await clickTarget.click();
  await page.waitForTimeout(150);
  const clickAfter = (await textTarget.textContent())?.trim() || "";
  const clickChanged = Boolean(clickBefore && clickAfter && clickBefore !== clickAfter);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  const revealed = await page.locator(".is-visible").count();
  const progress = await page.locator("[data-qa='scroll-progress']").evaluate((node) => node.style.transform || "");
  const metadata = await readPublishMetadata(page);
  const internalLinkStatus = await page.evaluate((links) => links.map((href) => ({
    href,
    exists: href === "#" || Boolean(document.querySelector(href))
  })), metadata.internalLinks);
  const desktopOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    overflows: document.documentElement.scrollWidth > window.innerWidth + 2
  }));

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobile.goto(url, { waitUntil: "networkidle" });
  await scrollThrough(mobile, 3);
  await mobile.screenshot({ path: path.join(outDir, "mobile.png"), fullPage: true });
  const mobileOverflow = await mobile.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    overflows: document.documentElement.scrollWidth > window.innerWidth + 2
  }));

  const indexHtml = fs.readFileSync(indexPath, "utf8");
  const jsonLdValid = validJsonLdBlocks(indexHtml);
  const publishFiles = publishFilesStatus();
  const localAssets = localAssetStatus(metadata.assetRefs);
  const externalLinksValid = metadata.externalLinks.map((href) => ({
    href,
    valid: /^https:\/\/.+/i.test(href)
  }));

  const checks = {
    hoverDetected: hoverChanged,
    hoverBefore,
    hoverAfter,
    clickDetected: clickChanged,
    clickBefore,
    clickAfter,
    scrollRevealCount: revealed,
    scrollProgress: progress,
    metadata,
    jsonLdValid,
    publishFiles,
    internalLinkStatus,
    externalLinksValid,
    localAssets,
    desktopOverflow,
    mobileOverflow
  };

  const pass = Boolean(
    hoverChanged &&
    clickChanged &&
    revealed > 0 &&
    progress.includes("scaleX") &&
    metadata.title &&
    metadata.metaDescription &&
    metadata.ogTitle &&
    metadata.ogDescription &&
    metadata.ogImage &&
    /^https:\/\/.+/i.test(metadata.canonical) &&
    metadata.jsonLdCount > 0 &&
    jsonLdValid.every(Boolean) &&
    publishFiles.every((item) => item.exists && item.nonEmpty) &&
    internalLinkStatus.every((item) => item.exists) &&
    externalLinksValid.every((item) => item.valid) &&
    localAssets.every((item) => item.exists) &&
    !desktopOverflow.overflows &&
    !mobileOverflow.overflows
  );

  const report = {
    pass,
    url,
    checks,
    artifacts: {
      desktop: path.join(outDir, "desktop.png"),
      mobile: path.join(outDir, "mobile.png"),
      hoverBefore: path.join(outDir, "hover-before.png"),
      hoverAfter: path.join(outDir, "hover-after.png")
    },
    source: pathToFileURL(indexPath).href
  };
  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
  if (!report.pass) process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
