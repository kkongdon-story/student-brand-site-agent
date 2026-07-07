# DESIGN.md - 꽁돈 개인 브랜드 홈페이지 디자인 계약서

## 1. Website Purpose

강의 신청, 협업 문의, 자료 탐색으로 이어지는 개인 브랜드 명함형 웹사이트를 만든다.

## 2. Brand Materials

꽁돈은 어려운 AI를 내 일에 맞게 같이 찾아주고, 바로 써먹을 수 있는 자료와 시스템으로 바꿔주는 사람이다. 대상은 AI가 궁금하지만 챗봇 검색 이상으로는 익숙하지 않은 사람이다. 제공하는 것은 쉬운 강의, 실습 자료, 개인 상황에 맞는 AI 도구 선택 안내이며, 신뢰 근거는 꽁꽁 사고반, 100명 커뮤니티, 오프라인 강의, 자료/프로그램 배포 경험이다.

## 3. Hero Copy

Primary: 당신에게 필요한 AI를 같이 찾아드립니다.

Secondary: 검색에서 멈춘 AI를 내 일의 자료, 강의, 시스템으로 바꾸는 사람.

CTA: 카카오톡으로 상담하기

## 4. Reference DNA

밝은 종이 배경, 큰 한글 타이포그래피, 캐릭터 중심 첫 화면, 떠 있는 키워드, hover/click/scroll 반응을 사용한다. 레퍼런스 캐릭터와 구성은 그대로 복제하지 않는다.

## 5. Visual Direction

AI SaaS보다 창작자 작업실과 작은 AI 실험실 사이의 느낌. 브라운 잉크 라인, 그린 포인트, 종이 질감, 손으로 정리한 듯한 섹션 구성을 사용한다.

## 6. Image Assets

- `assets/kkongdon-character.svg`: 임시 로컬 벡터 마스코트. 실제 수업에서는 로컬 image CLI로 `kkongdon-character.png`를 생성해 교체한다.
- `assets/og-image.svg`: 샘플용 OG 미리보기 이미지. 실제 수업에서는 로컬 image CLI로 브랜드별 OG 이미지를 생성해 교체한다.

## 7. Color System

- background: #f6efe2
- ink: #251812
- brown: #8a5a32
- green: #3f6f4f
- red accent: #c94b37
- line: rgba(37, 24, 18, 0.22)

## 8. Typography

시스템 sans-serif를 사용한다. Hero는 48-86px 범위의 큰 한글 문장, 본문은 16-18px로 읽기 쉽게 둔다. 글자 간격은 0으로 둔다.

## 9. Layout

상단 nav, full viewport hero, proof strip, point-of-view scroll sections, lecture/cooperation CTA, resources/projects, contact footer로 구성한다. 카드 남발을 피하고 섹션을 넓게 쓴다.

## 10. Section Detail

1. Hero: 큰 문장, 캐릭터, 떠 있는 키워드, 카카오톡 CTA
2. About: 누구를 돕는지
3. Point of View: AI를 내 언어로 바꾸는 관점
4. Lecture / Collaboration: 강의와 협업
5. Resources / Projects: 프로그램과 자료
6. Contact: 카카오톡, 스레드, 블로그

## 11. Motion and Interaction

Hover: CTA와 프로젝트 항목이 살짝 떠오른다.

Click: 키워드 칩을 누르면 hero 문장이 바뀐다.

Scroll: 섹션이 화면에 들어올 때 reveal 클래스가 붙고 progress bar가 증가한다.

## 12. Components

- Sticky nav
- Hero CTA
- Floating keyword chips
- Proof rail
- Project list
- Contact buttons

## 13. Responsive Rules

모바일에서는 hero를 한 열로 쌓고, 글자는 36px 이하로 줄인다. 버튼 텍스트는 줄바꿈 없이 들어가야 한다. 가로 스크롤은 없어야 한다.

## 14. SEO / OG / GEO

Title: 꽁돈 - 당신에게 필요한 AI를 같이 찾아드립니다

Description: AI를 쉽게 배우고 내 일에 맞게 실행하도록 돕는 꽁돈의 강의, 자료, 협업 홈페이지.

OG title/description/image placeholder, canonical placeholder, JSON-LD Person schema, `robots.txt`, `sitemap.xml`, `llms.txt`, tracking insertion comment를 포함한다.

## 15. Implementation Files

- `index.html`
- `styles.css`
- `script.js`
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `README.md`

## 16. QA Acceptance Criteria

- desktop screenshot exists
- mobile screenshot exists
- hover interaction detected
- click interaction detected
- scroll reveal detected
- metadata present
- no horizontal overflow on mobile

## 17. Must Not Drift

- SaaS 대시보드처럼 만들지 않는다.
- 캐릭터를 저품질 placeholder로 방치하지 않는다.
- 움직임 없는 정적 명함으로 끝내지 않는다.
- 없는 경력이나 수치를 추가하지 않는다.
