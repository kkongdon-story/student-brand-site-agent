# Publish Guide

Use GitHub for distribution. It gives students one stable URL, version history, issue tracking, and a simple update path.

## Recommended Repository Shape

Publish `student-brand-site-agent` as its own repository. Do not publish the entire `kkongdon-manager` workspace.

Recommended repo name:

```text
student-brand-site-agent
```

## Before Commit

Run the checks:

```bash
npm install
npm run check:image-cli
npm run validate:example
npm run qa:example
```

Review the example site screenshots:

```text
../.omo/evidence/C003-visual-qa/desktop.png
../.omo/evidence/C003-visual-qa/mobile.png
```

If the example site will be deployed as a public demo, replace `https://example.com/` in:

- `examples/kkongdon/site/index.html`
- `examples/kkongdon/site/robots.txt`
- `examples/kkongdon/site/sitemap.xml`
- `examples/kkongdon/site/llms.txt`

If it remains a template/demo inside the repo, keeping the placeholder is acceptable.

## First Push

From this folder:

```bash
cd "C:/Users/js480/OneDrive/바탕 화면/1_Projects/kkongdon-manager/student-brand-site-agent"
git init
git add .
git commit -m "Package the personal brand site agent for student distribution"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/student-brand-site-agent.git
git push -u origin main
```

## Student Install

Students can clone the repo and install the skill locally:

```bash
git clone https://github.com/YOUR_ACCOUNT/student-brand-site-agent.git
cd student-brand-site-agent
npm install
npm run install:skill
npm run install:image-cli
```

If the skill already exists:

```bash
npm run install:skill -- --force
```

## Classroom Flow

1. Ask Codex to use `personal-brand-site`.
2. Start from Stage 1 brand materials.
3. Move to reference DNA and image assets.
4. Generate `DESIGN.md`.
5. Build the static site.
6. Run browser QA.
7. Replace deployed URL placeholders.
8. Publish to GitHub/Vercel.
