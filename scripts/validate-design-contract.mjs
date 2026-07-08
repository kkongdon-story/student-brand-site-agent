#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/validate-design-contract.mjs <DESIGN.md>");
  process.exit(2);
}

const abs = path.resolve(file);
if (!fs.existsSync(abs)) {
  console.error(`Missing DESIGN.md: ${file}`);
  process.exit(2);
}

const text = fs.readFileSync(abs, "utf8").replace(/\r\n/g, "\n");

const requiredSections = [
  "Website Purpose",
  "Brand Materials",
  "Hero Copy",
  "Reference DNA",
  "Reference Evidence Pack",
  "Visual Direction",
  "Design System Constraints",
  "Prompt Pack",
  "Image Assets",
  "Color System",
  "Typography",
  "Layout",
  "Section Detail",
  "Motion and Interaction",
  "Components",
  "Responsive Rules",
  "SEO / OG / GEO",
  "Implementation Files",
  "QA Acceptance Criteria",
  "Must Not Drift"
];

const sectionRules = {
  "Website Purpose": {
    minChars: 45,
    any: [/신청|문의|상담|브랜드|협업|자료|contact|lead|booking|inquiry/i]
  },
  "Brand Materials": {
    minChars: 120,
    any: [/대상|누구|audience|target/i, /제공|돕|offer|service/i, /근거|경험|proof|trust/i]
  },
  "Hero Copy": {
    minChars: 45,
    all: [/Primary\s*:/i, /Secondary\s*:/i, /CTA\s*:/i]
  },
  "Reference DNA": {
    minChars: 90,
    any: [/레퍼런스|reference|inspiration/i, /복제|copy|clone|drift|훔치/i]
  },
  "Reference Evidence Pack": {
    minChars: 220,
    all: [/Source URL|source|출처|file|파일/i, /Capture|screenshot|캡처|스크린샷/i, /Bring|가져|borrow|adapt/i, /Avoid|피하|금지|copy/i, /AI-readable|AI가 읽|component|motion|palette|code idea/i],
    minMatches: { pattern: /Reference\s*:|###\s+Reference|레퍼런스\s*:/gi, count: 2, label: "at least 2 reference evidence cards" }
  },
  "Visual Direction": {
    minChars: 80,
    any: [/배경|질감|texture|mood|tone|분위기/i, /색|color|palette|포인트/i]
  },
  "Design System Constraints": {
    minChars: 180,
    all: [/visual archetype|비주얼 아키타입|시각 원형|editorial|studio|poster|lab|magazine/i, /layout archetype|레이아웃 아키타입|hero|scroll|sticky|split|gallery/i, /spacing|간격|rhythm|리듬/i, /type|font|타이포/i, /motion|animation|reduced-motion|움직임/i, /generic|AI\s*default|흔한|카드 남발|gradient/i]
  },
  "Prompt Pack": {
    minChars: 220,
    all: [/GOAL\s*:/i, /FORMAT\s*:/i, /LAYOUT\s*:/i, /TYPE SYSTEM\s*:/i, /COLOR\s*\+\s*MATERIAL\s*:/i, /NEGATIVE PROMPT\s*:/i, /Section|섹션/i, /Interaction|hover|click|scroll|인터랙션/i]
  },
  "Image Assets": {
    minChars: 50,
    all: [/assets\/[\w./-]+\.(png|jpg|jpeg|webp|svg)/i],
    any: [/생성|교체|로컬|local|image|character|og/i]
  },
  "Color System": {
    minChars: 45,
    minMatches: { pattern: /#[0-9a-f]{3,8}\b/gi, count: 3, label: "at least 3 hex colors" }
  },
  Typography: {
    minChars: 45,
    any: [/font|type|타이포|본문|hero|px/i]
  },
  Layout: {
    minChars: 80,
    any: [/hero|nav|section|footer|CTA|contact|상단|섹션/i]
  },
  "Section Detail": {
    minChars: 90,
    minMatches: { pattern: /^\s*(?:[-*]|\d+\.)\s+/gm, count: 4, label: "at least 4 section bullets" }
  },
  "Motion and Interaction": {
    minChars: 75,
    all: [/hover/i, /click/i, /scroll/i]
  },
  Components: {
    minChars: 45,
    minMatches: { pattern: /^\s*[-*]\s+/gm, count: 3, label: "at least 3 component bullets" }
  },
  "Responsive Rules": {
    minChars: 55,
    all: [/mobile|모바일/i],
    any: [/가로 스크롤|overflow|줄바꿈|responsive|반응형/i]
  },
  "SEO / OG / GEO": {
    minChars: 100,
    all: [/Title\s*:/i, /Description\s*:/i, /OG/i, /canonical/i, /JSON-LD/i, /robots\.txt/i, /sitemap\.xml/i, /llms\.txt/i]
  },
  "Implementation Files": {
    minChars: 45,
    all: [/index\.html/i, /styles\.css/i, /script\.js/i, /robots\.txt/i, /sitemap\.xml/i, /llms\.txt/i]
  },
  "QA Acceptance Criteria": {
    minChars: 80,
    all: [/desktop|데스크톱/i, /mobile|모바일/i, /hover/i, /click/i, /scroll/i, /metadata|메타/i, /overflow|가로 스크롤/i]
  },
  "Must Not Drift": {
    minChars: 60,
    minMatches: { pattern: /^\s*[-*]\s+/gm, count: 3, label: "at least 3 drift guardrails" }
  }
};

const vagueOnlyPatterns = [
  /^\s*(좋게|예쁘게|멋지게|고급스럽게|감각적으로|알아서|최대한|트렌디하게)[\s.!?。]*$/i,
  /^\s*(nice|beautiful|cool|premium|trendy|modern|make it good)[\s.!?]*$/i
];
const placeholderPatterns = [
  /TODO|TBD|lorem ipsum|<fill|채워|나중에|미정|정해야 함|추후 작성|placeholder only/i
];

function normalizeTitle(title) {
  return title.replace(/^\d+\.?\s*/, "").trim();
}

function parseSections(markdown) {
  const headings = [...markdown.matchAll(/^##\s+(.+)$/gm)].map((match) => ({
    title: normalizeTitle(match[1]),
    index: match.index,
    endOfHeading: match.index + match[0].length
  }));
  const sections = new Map();
  for (let i = 0; i < headings.length; i += 1) {
    const current = headings[i];
    const next = headings[i + 1];
    const body = markdown.slice(current.endOfHeading, next ? next.index : markdown.length).trim();
    sections.set(current.title, body);
  }
  return sections;
}

function countMatches(body, pattern) {
  const matches = body.match(pattern);
  return matches ? matches.length : 0;
}

const sections = parseSections(text);
const errors = [];

for (const section of requiredSections) {
  const body = sections.get(section);
  const rules = sectionRules[section] || { minChars: 40 };
  if (body == null) {
    errors.push(`Missing section: ${section}`);
    continue;
  }

  const compact = body.replace(/\s+/g, " ").trim();
  if (compact.length < rules.minChars) {
    errors.push(`${section}: body is too short (${compact.length}/${rules.minChars} chars)`);
  }
  if (placeholderPatterns.some((pattern) => pattern.test(compact))) {
    errors.push(`${section}: contains placeholder language`);
  }
  if (vagueOnlyPatterns.some((pattern) => pattern.test(compact))) {
    errors.push(`${section}: too vague to implement`);
  }
  if (rules.all) {
    for (const pattern of rules.all) {
      if (!pattern.test(body)) errors.push(`${section}: missing required pattern ${pattern}`);
    }
  }
  if (rules.any) {
    for (const pattern of rules.any) {
      if (!pattern.test(body)) errors.push(`${section}: missing expected detail ${pattern}`);
    }
  }
  if (rules.minMatches) {
    const found = countMatches(body, rules.minMatches.pattern);
    if (found < rules.minMatches.count) {
      errors.push(`${section}: needs ${rules.minMatches.label}, found ${found}`);
    }
  }
}

if (errors.length) {
  console.error("DESIGN contract validation failed.");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`DESIGN contract validation passed: ${file}`);
