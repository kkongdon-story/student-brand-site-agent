# 개인 브랜드 홈페이지 만들기 에이전트

이 저장소는 **AI로 나만의 개인 브랜드 홈페이지를 만들기 위한 수업용 에이전트**입니다.

코딩을 잘 몰라도 괜찮습니다. 이 에이전트는 바로 홈페이지를 만들기 전에, 먼저 여러분에게 필요한 질문을 하나씩 던집니다. 그 답을 모아서 브랜드 정리, 디자인 방향, 참고 사이트 분석, 이미지 방향, 홈페이지 구성까지 차례대로 잡아줍니다.

목표는 단순히 예쁜 페이지 하나를 만드는 것이 아닙니다.

처음 보는 사람이 나를 이해하고, 상담 신청이나 자료 신청 같은 다음 행동까지 할 수 있는 **개인 브랜드 명함 페이지**를 만드는 것이 목표입니다.

## 이걸로 무엇을 하나요?

수업에서는 아래 흐름으로 진행합니다.

1. 내가 어떤 사람인지 정리합니다.
2. 어떤 사람에게 보여줄 홈페이지인지 정합니다.
3. 참고하고 싶은 멋진 사이트나 이미지를 고릅니다.
4. AI가 이해할 수 있는 디자인 문서인 `DESIGN.md`를 만듭니다.
5. Codex에게 그 문서를 넘겨 홈페이지를 만듭니다.
6. 마우스 반응, 스크롤 움직임, 모바일 화면, 링크 공유 설정을 확인합니다.
7. GitHub와 Vercel을 이용해 실제 링크로 배포합니다.

## 수업 전에 준비할 것

아래 계정이나 프로그램은 미리 준비해두면 좋습니다.

- Codex 또는 사용할 AI 코딩 도구 로그인
- GitHub 계정 로그인
- Vercel 계정 로그인
- Node.js 설치
- Git 설치

잘 모르겠다면 수업 중에 강사 안내를 따라오면 됩니다. 이 README는 “무엇을 눌러야 하지?” 하고 막힐 때 보는 안내서입니다.

## 설치 방법

먼저 이 저장소를 내 컴퓨터로 가져옵니다.

```bash
git clone https://github.com/kkongdon-story/student-brand-site-agent.git
```

가져온 폴더로 이동합니다.

```bash
cd student-brand-site-agent
```

필요한 파일을 설치합니다.

```bash
npm install
```

이제 Codex가 사용할 수 있도록 에이전트 스킬을 설치합니다.

```bash
npm run install:skill
```

이미지 생성용 명령어도 설치합니다.

```bash
npm run install:image-cli
```

설치가 잘 되었는지 확인합니다.

```bash
npm run check:image-cli
```

여기까지 되면 기본 준비는 끝입니다.

## Codex에서 시작하는 방법

Codex를 열고 새 대화에서 아래 문장을 그대로 붙여넣으세요.

```text
Use the personal-brand-site skill.
I want to create a personal brand homepage.
Do not code yet. Start from Stage 1 brand materials and ask me one question at a time.
```

뜻은 이렇습니다.

- `personal-brand-site` 스킬을 사용해줘.
- 개인 브랜드 홈페이지를 만들고 싶어.
- 바로 코딩하지 말고, 1단계 브랜드 재료 정리부터 질문을 하나씩 해줘.

영어 문장이 어렵다면 아래처럼 한국어로 말해도 됩니다.

```text
personal-brand-site 스킬을 사용해서 개인 브랜드 홈페이지를 만들고 싶어.
바로 코딩하지 말고 1단계 브랜드 재료 정리부터 질문을 하나씩 해줘.
```

만약 Codex가 스킬을 자동으로 찾지 못하면 아래 경로를 같이 붙여넣으세요.

```text
~/.codex/skills/personal-brand-site/SKILL.md
```

## 수업에서 나오는 중요한 파일

처음 보면 파일 이름이 낯설 수 있습니다. 아래 정도만 알아두면 됩니다.

### `DESIGN.md`

AI에게 넘기는 디자인 지시서입니다.

“예쁘게 만들어줘”라고 말하면 결과가 흔해질 수 있습니다. 대신 `DESIGN.md`에는 색감, 분위기, 첫 화면, 버튼, 움직임, 섹션 순서 같은 내용을 구체적으로 적습니다.

쉽게 말하면 `DESIGN.md`는 **AI에게 주는 홈페이지 제작 계약서**입니다.

### `brand-materials.md`

내 브랜드 재료를 정리한 파일입니다.

예를 들면 이런 내용이 들어갑니다.

- 나는 누구인가
- 누구를 돕는가
- 어떤 문제를 해결해주는가
- 사람들이 왜 나를 찾아야 하는가
- 상담 링크는 무엇인가
- 인스타, 스레드, 블로그 주소는 무엇인가

### `reference-dna.md`

참고 사이트나 이미지를 보고 “무엇을 가져오고, 무엇은 피할지” 정리한 파일입니다.

그대로 베끼는 것이 아니라, 마음에 드는 감각을 AI가 이해할 수 있는 말로 바꾸는 단계입니다.

### `image-brief.md`

홈페이지에 들어갈 이미지나 캐릭터를 만들기 위한 설명서입니다.

AI 이미지 생성 도구를 쓸 때 이 파일을 참고하면, 더 일관된 이미지를 만들 수 있습니다.

## 이미지 생성은 어떻게 되나요?

이 저장소에는 `imagen`, `imagegen`, `openai-image`라는 명령어를 쓸 수 있게 해주는 작은 도구가 들어 있습니다.

API 키가 없어도 수업은 진행할 수 있습니다. API 키가 없으면 실제 AI 이미지를 만들지는 않고, 대신 어떤 이미지를 만들어야 하는지 정리한 SVG 카드가 생성됩니다.

설치 확인:

```bash
npm run check:image-cli
```

이미지 명령어 설치:

```bash
npm run install:image-cli
```

예시:

```bash
imagen --prompt "personal brand character, editorial landing page hero" --out assets/character.svg
```

나중에 OpenAI 이미지 API 키가 있으면 실제 이미지 생성도 연결할 수 있습니다.

## 예제 확인하기

이 저장소에는 꽁돈 예제가 들어 있습니다.

```bash
npm run validate:example
```

이 명령어는 예제 `DESIGN.md`가 홈페이지 제작에 필요한 내용을 갖추고 있는지 확인합니다.

화면과 반응까지 확인하려면 아래 명령어를 실행합니다.

```bash
npm run qa:example
```

만약 Playwright 브라우저가 없다는 메시지가 나오면 아래 명령어를 한 번 실행하세요.

```bash
npx playwright install chromium
```

그 다음 다시 실행하면 됩니다.

```bash
npm run qa:example
```

## 폴더는 이렇게 보면 됩니다

```text
student-brand-site-agent/
  README.md
  PUBLISH.md
  skills/
    personal-brand-site/
      SKILL.md
      references/
      assets/templates/
  examples/
    kkongdon/
      brand-materials.md
      reference-dna.md
      DESIGN.md
      image-brief.md
      site/
  scripts/
  tools/
```

처음에는 전부 볼 필요 없습니다.

수강생은 보통 아래만 알면 됩니다.

- `README.md`: 지금 보고 있는 안내서
- `examples/kkongdon/`: 완성 예시
- `skills/personal-brand-site/SKILL.md`: Codex가 사용하는 에이전트 설명서

## 자주 막히는 부분

### `npm`이라는 명령어를 찾을 수 없다고 나와요

Node.js가 설치되지 않았거나, 설치 후 터미널을 다시 열지 않은 경우입니다.

Node.js를 설치한 뒤 터미널을 닫고 다시 열어보세요.

### Codex가 스킬을 못 찾는다고 해요

아래 명령어를 다시 실행하세요.

```bash
npm run install:skill
```

그래도 안 되면 Codex에 아래 경로를 직접 알려주세요.

```text
~/.codex/skills/personal-brand-site/SKILL.md
```

### 이미지 생성이 안 돼요

먼저 아래 명령어로 이미지 명령어가 설치되어 있는지 확인하세요.

```bash
npm run check:image-cli
```

API 키가 없어도 괜찮습니다. 수업에서는 이미지 방향을 잡는 것만으로도 충분히 진행할 수 있습니다.

### 홈페이지가 마음에 안 들어요

정상입니다. AI가 만든 첫 결과물은 최종본이 아니라 초안입니다.

이럴 때는 “더 예쁘게 해줘”라고 말하기보다 아래처럼 말하는 것이 좋습니다.

```text
첫 화면의 글자를 더 크게 해줘.
카드가 너무 많아 보여서 섹션을 더 넓고 시원하게 바꿔줘.
마우스를 올렸을 때 반응을 더 분명하게 만들어줘.
모바일에서도 글자가 겹치지 않게 확인해줘.
```

## 배포는 어떻게 하나요?

배포란 내 컴퓨터 안에 있는 홈페이지를 실제 링크로 만드는 것입니다.

수업에서는 보통 아래 흐름으로 갑니다.

1. GitHub에 내 홈페이지 코드를 올립니다.
2. Vercel에 GitHub 저장소를 연결합니다.
3. Vercel이 자동으로 링크를 만들어줍니다.
4. 그 링크를 스레드, 인스타, 카카오톡, 블로그에 공유합니다.

강사용 배포 안내는 아래 파일에 정리되어 있습니다.

```text
PUBLISH.md
```

## 이 수업의 핵심

AI에게 “홈페이지 만들어줘”라고만 말하면 결과가 흔해질 수 있습니다.

이 수업의 핵심은 내가 원하는 브랜드와 감각을 AI가 알아들을 수 있는 말로 바꾸는 것입니다.

그래서 우리는 바로 코딩하지 않습니다.

먼저 나를 정리하고, 참고할 감각을 고르고, `DESIGN.md`를 만든 다음, 그 문서를 기준으로 홈페이지를 제작합니다.

이 과정을 배우면 홈페이지뿐 아니라 상세페이지, 포트폴리오, 강의 소개 페이지, 자료 신청 페이지도 같은 방식으로 만들 수 있습니다.
