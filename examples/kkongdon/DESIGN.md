# DESIGN.md - 꽁돈 개인 브랜드 홈페이지 디자인 계약서

## 1. Website Purpose

강의 신청, 협업 문의, 자료 탐색으로 이어지는 개인 브랜드 명함형 웹사이트를 만든다. 방문자가 꽁돈의 관점과 자료를 빠르게 이해한 뒤 카카오톡 상담 또는 스레드 팔로우로 이동하게 하는 브랜드 창구다.

## 2. Brand Materials

꽁돈은 어려운 AI를 내 일에 맞게 같이 찾아주고, 바로 써먹을 수 있는 자료와 시스템으로 바꿔주는 사람이다. 대상은 AI가 궁금하지만 챗봇 검색 이상으로는 익숙하지 않은 사람이다. 제공하는 것은 쉬운 강의, 실습 자료, 개인 상황에 맞는 AI 도구 선택 안내이며, 신뢰 근거는 꽁꽁 사고반, 100명 커뮤니티, 오프라인 강의, 자료/프로그램 배포 경험이다.

## 3. Hero Copy

Primary: 당신에게 필요한 AI를 같이 찾아드립니다.

Secondary: 검색에서 멈춘 AI를 내 일의 자료, 강의, 시스템으로 바꾸는 사람.

CTA: 카카오톡으로 상담하기

## 4. Reference DNA

레퍼런스는 밝은 종이 배경, 큰 한글 타이포그래피, 캐릭터 중심 첫 화면, 떠 있는 키워드, hover/click/scroll 반응을 증거로 사용한다. reference를 그대로 copy하거나 clone하지 않고, 문화 포스터 같은 첫인상과 인터랙티브한 키워드 반응만 꽁돈 브랜드에 맞게 번역한다. drift 방지를 위해 SaaS 대시보드형 카드 레이아웃과 랜덤 그라데이션은 피한다.

## 5. Reference Evidence Pack

Reference: Structure reference
Source URL or file: `assets/reference-structure.png` 또는 수업 중 선택한 랜딩 페이지 URL
Capture: 첫 화면과 상담 CTA가 보이는 섹션을 screenshot으로 저장한다.
Liked section: 큰 문장, 넓은 여백, 첫 화면에서 행동 버튼이 보이는 구조.
Bring: hero-as-poster 구조, 한 문장 중심 메시지, CTA 반복 위치.
Avoid: 글자, 캐릭터, 색 배치를 그대로 복제하거나 copy하지 않는다.
AI-readable material: screenshot plus memo, layout rhythm, component name, CTA position.
Design language: full-bleed hero, sticky nav, final contact band.
Prompt asset: hero section prompt에 구조 참고로 연결한다.

Reference: Mood reference
Source URL or file: `assets/reference-mood.png` 또는 종이 질감/문화 포스터형 이미지 폴더
Capture: 배경 질감, 라인 굵기, 포인트 컬러가 보이는 viewport를 캡처한다.
Liked section: 밝은 종이 배경과 손으로 정리한 듯한 편집감.
Bring: 브라운 잉크 라인, 그린 포인트, 부드러운 질감, 친근한 실험실 분위기.
Avoid: stock photo 느낌, 흐릿한 어두운 배경, 흔한 AI gradient hero.
AI-readable material: color palette, material texture memo, typography description.
Design language: independent magazine meets small AI workshop.
Prompt asset: visual system prompt와 image prompt에 연결한다.

Reference: Motion / component reference
Source URL or file: `assets/reference-motion.png` 또는 hover/click/scroll 예시 URL
Capture: 마우스를 올렸을 때, 누른 뒤, 스크롤했을 때의 변화가 보이는 화면.
Liked section: 키워드 칩과 CTA가 눌렀을 때 즉시 반응하는 작은 장면.
Bring: hover lift, click state copy swap, scroll reveal, progress bar.
Avoid: 과한 WebGL, 성능을 해치는 무거운 효과, 모바일에서 겹치는 모션.
AI-readable material: motion description, component behavior, code idea.
Design language: transform and opacity animation with reduced-motion fallback.
Prompt asset: interaction prompts에 연결한다.

## 6. Visual Direction

AI SaaS보다 창작자 작업실과 작은 AI 실험실 사이의 느낌. 브라운 잉크 라인, 그린 포인트, 종이 질감, 손으로 정리한 듯한 섹션 구성을 사용한다. 배경은 따뜻한 종이색, 본문은 진한 잉크색, 포인트는 초록과 작은 레드로 제한한다. 분위기는 친근하지만 허술하지 않고, 정보는 명확하지만 교재처럼 딱딱하지 않게 간다.

## 7. Design System Constraints

Visual archetype: independent magazine + friendly AI workshop. Layout archetype: hero-as-poster에서 시작해 scrolling manifesto와 resource gallery로 이어지는 구조. Type scale은 hero 48-86px, section heading 28-42px, body 16-18px로 둔다. Spacing rhythm은 섹션마다 충분한 상하 여백을 주되 카드 남발 없이 넓은 bands로 나눈다. Color/material은 종이 배경, 잉크 라인, 그린 포인트, 작은 레드 강조를 쓴다. Component rules는 둥근 버튼 남발 대신 선, 칩, proof rail, contact buttons를 쓴다. Motion rules는 hover, click, scroll 모두 transform/opacity 중심으로 만들고 reduced-motion에서는 애니메이션 없이 읽히게 한다. Generic AI default인 보라 그라데이션, 무의미한 glass cards, stock hero, 카드형 SaaS 레이아웃은 금지한다.

## 8. Prompt Pack

GOAL: AI 입문자가 꽁돈을 이해하고 상담 또는 자료 탐색으로 이동하는 개인 브랜드 홈페이지를 만든다.
FORMAT: beginner-editable static HTML/CSS/JS with `index.html`, `styles.css`, `script.js`.
LAYOUT: sticky nav, hero-as-poster, proof rail, scrolling point-of-view, lecture/collaboration band, resource gallery, contact footer.
TYPE SYSTEM: 큰 한글 hero, 읽기 쉬운 본문, letter spacing 0, 과감하지만 모바일에서 깨지지 않는 반응형 크기.
COLOR + MATERIAL: #f6efe2 paper background, #251812 ink, #8a5a32 brown, #3f6f4f green, #c94b37 red accent, thin ink lines.
IMAGERY / UI STYLE: local image CLI로 만든 친근한 캐릭터 또는 작업실 오브젝트, 낮은 품질 placeholder 금지.
COPY: Primary hero와 상담 CTA를 반복하되 과장된 경력이나 없는 숫자는 쓰지 않는다.
CONSTRAINTS: reference evidence를 직접 복제하지 말고 bring/avoid만 반영한다. desktop/mobile 모두 overflow가 없어야 한다.
NEGATIVE PROMPT: generic AI SaaS gradient, random glowing cards, copied reference layout, low-quality mascot, interaction-free static page, invented proof, unreadable mobile hero 금지.

Section prompts: Hero는 한 문장과 캐릭터가 먼저 보이는 포스터처럼 만든다. About은 누구를 돕는지 말한다. Perspective는 AI를 내 언어로 바꾸는 관점을 보여준다. Offer는 강의와 협업을 묶는다. Resources는 배포한 자료와 프로젝트를 보여준다. Contact는 카카오톡, 스레드, 블로그로 끝난다.

Interaction prompts: Hover는 CTA와 프로젝트 항목이 살짝 떠오르게 한다. Click은 키워드 칩을 누르면 hero 문장이 바뀌게 한다. Scroll은 섹션 reveal과 progress bar로 진행감을 만든다. Reduced motion에서는 transform과 blur를 제거하고 상태 변화만 유지한다.

## 9. Image Assets

- `assets/kkongdon-character.svg`: 임시 로컬 벡터 마스코트. 실제 수업에서는 로컬 image CLI로 `assets/kkongdon-character.png`를 생성해 교체한다.
- `assets/og-image.svg`: 샘플용 OG 미리보기 이미지. 실제 수업에서는 로컬 image CLI로 브랜드별 OG 이미지를 생성해 교체한다.
- `assets/reference-structure.png`: 구조 참고 screenshot 또는 캡처 예정 파일.

## 10. Color System

- background: #f6efe2
- ink: #251812
- brown: #8a5a32
- green: #3f6f4f
- red accent: #c94b37
- line: #d8c8ae

배경은 종이색, 본문과 선은 ink/brown, CTA와 중요한 상태 변화는 green/red accent를 사용한다. 색은 너무 많이 늘리지 않고 섹션마다 같은 규칙을 반복한다.

## 11. Typography

시스템 sans-serif를 사용한다. Hero는 48-86px 범위의 큰 한글 문장, 본문은 16-18px로 읽기 쉽게 둔다. Section heading은 28-42px 안에서 유지한다. 글자 간격은 0으로 둔다. 한글 문장이 버튼이나 hero에서 넘치면 줄바꿈과 max-width로 해결한다.

## 12. Layout

상단 nav, full viewport hero, proof strip, point-of-view scroll sections, lecture/cooperation CTA, resources/projects, contact footer로 구성한다. 카드 남발을 피하고 섹션을 넓게 쓴다. hero는 poster처럼 보이고, 중간 섹션은 manifesto처럼 읽히며, 자료 영역은 gallery처럼 스캔 가능하게 만든다.

## 13. Section Detail

1. Hero: 큰 문장, 캐릭터, 떠 있는 키워드, 카카오톡 CTA
2. About: 누구를 돕는지
3. Point of View: AI를 내 언어로 바꾸는 관점
4. Lecture / Collaboration: 강의와 협업
5. Resources / Projects: 프로그램과 자료
6. Contact: 카카오톡, 스레드, 블로그

## 14. Motion and Interaction

Hover: CTA와 프로젝트 항목이 살짝 떠오르고 선색 또는 배경색이 바뀐다.

Click: 키워드 칩을 누르면 hero 문장이 바뀌고 선택 상태가 보인다.

Scroll: 섹션이 화면에 들어올 때 reveal 클래스가 붙고 progress bar가 증가한다.

Reduced motion: `prefers-reduced-motion`에서는 reveal 이동과 blur를 제거하고 opacity 변화 또는 즉시 표시만 사용한다.

## 15. Components

- Sticky nav
- Hero CTA
- Floating keyword chips
- Proof rail
- Project list
- Contact buttons

## 16. Responsive Rules

모바일에서는 hero를 한 열로 쌓고, 글자는 36px 이하로 줄인다. 버튼 텍스트는 줄바꿈 없이 들어가거나 자연스럽게 두 줄로 정리되어야 한다. 가로 스크롤은 없어야 한다. 캐릭터와 키워드 칩은 화면을 침범하지 않게 순서대로 쌓는다.

## 17. SEO / OG / GEO

Title: 꽁돈 - 당신에게 필요한 AI를 같이 찾아드립니다

Description: AI를 쉽게 배우고 내 일에 맞게 실행하도록 돕는 꽁돈의 강의, 자료, 협업 홈페이지.

OG: 꽁돈 - 당신에게 필요한 AI를 같이 찾아드립니다 / AI를 내 일에 맞게 쓰도록 돕는 개인 브랜드 홈페이지 / `assets/og-image.svg`

Canonical: `https://example.com`

JSON-LD: Person schema with sameAs links for Threads, Instagram, Naver blog, and KakaoTalk contact.

Required files: `robots.txt`, `sitemap.xml`, `llms.txt`.

## 18. Implementation Files

- `index.html`
- `styles.css`
- `script.js`
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `README.md`

## 19. QA Acceptance Criteria

- desktop screenshot exists
- mobile screenshot exists
- hover interaction detected
- click interaction detected
- scroll reveal detected
- reference evidence and prompt pack present
- metadata present
- no horizontal overflow on mobile
- reduced-motion keeps the page readable

## 20. Must Not Drift

- SaaS 대시보드처럼 만들지 않는다.
- 캐릭터를 저품질 placeholder로 방치하지 않는다.
- 움직임 없는 정적 명함으로 끝내지 않는다.
- 없는 경력이나 수치를 추가하지 않는다.
- reference를 그대로 copy하지 않고 꽁돈의 브랜드 언어로 바꾼다.
