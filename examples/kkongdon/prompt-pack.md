# Prompt Pack

## Design-First Super Prompt

GOAL: Create a personal brand homepage for 꽁돈 that turns AI beginners into KakaoTalk consultation, Threads follow, or resource exploration.

FORMAT: Static, beginner-editable `index.html`, `styles.css`, and `script.js`. Keep content and layout understandable for a non-developer.

LAYOUT: Sticky nav, hero-as-poster, proof rail, scrolling point-of-view sections, lecture/collaboration CTA band, resources/projects list, and contact footer.

TYPE SYSTEM: Large Korean hero sentence, clear body copy, section headings with editorial weight, letter spacing 0, and mobile-safe line breaks.

COLOR + MATERIAL: Warm paper background `#f6efe2`, ink text `#251812`, brown line `#8a5a32`, green accent `#3f6f4f`, red accent `#c94b37`, thin hand-drawn feeling lines.

IMAGERY / UI STYLE: Friendly AI guide character or workshop object generated with local image CLI. Use it as a memorable brand signal, not as a low-quality placeholder.

COPY: Keep the core line "당신에게 필요한 AI를 같이 찾아드립니다." Do not invent awards, clients, numbers, or testimonials.

CONSTRAINTS: Must include hover, click, scroll, responsive rules, SEO/OG/GEO basics, and reduced-motion support.

NEGATIVE PROMPT: No generic purple AI gradient, no stock photo atmosphere, no copied reference character, no card-heavy SaaS dashboard, no empty "premium modern" wording, no static page without visible interaction, no unreadable mobile hero, no invented proof.

## Section Prompts

### Hero

Build a first viewport that feels like a cultural poster for a personal AI guide. Use one huge Korean sentence, one supporting sentence, a KakaoTalk CTA, floating keyword chips, and a memorable character or object visual.

### About / Point of View

Explain that 꽁돈 helps people move from AI search to practical tools, materials, and systems. Keep the tone direct and friendly.

### Offer / Collaboration

Show lecture, collaboration, and consultation as approachable next actions. Use clear labels and avoid corporate jargon.

### Proof / Projects / Resources

Show 강의 경험, 꽁꽁 사고반, 100명 커뮤니티, and distributed resources/programs as concrete proof. Do not overstate unknown numbers.

### Contact / Final CTA

End with KakaoTalk open chat, Threads, Instagram, and Naver blog links. The final CTA should feel like a natural invitation, not a hard sales banner.

## Interaction Prompts

### Hover

CTA buttons and project/resource items should lift 2-4px, shift color, or reveal a small line detail using transform and opacity.

### Click

Keyword chips should change selected state and swap the hero support sentence so the page feels alive.

### Scroll

Use IntersectionObserver to reveal sections and update a simple scroll progress bar. Prefer transform and opacity.

### Reduced Motion

For `prefers-reduced-motion`, remove translate, blur, and parallax. Keep content visible and state changes usable.

## Image Prompts

### Main Character / Portrait / Object

Friendly Korean AI guide character for a personal brand homepage, warm paper texture, ink linework, green accent, editorial poster composition, not childish, not corporate, not stock.

### OG Image

Readable social preview image with the phrase "당신에게 필요한 AI를 같이 찾아드립니다", warm paper background, small character or object, strong contrast.

### Texture / Supporting Visuals

Subtle paper grain and hand-drawn line accents. Keep it lightweight and not visually noisy.

## Revision Prompts

### Make It More Distinctive

Keep the brand copy and responsive rules. Make the first viewport more poster-like, increase typography confidence, reduce generic cards, and add one memorable interaction.

### Make It More Responsive

Keep the visual direction. Fix mobile text wrapping, remove horizontal overflow, stack hero elements cleanly, and verify desktop/mobile screenshots.

### Improve Motion Without Hurting Performance

Keep motion transform/opacity based. Add staggered reveals and clearer click states, but include reduced-motion behavior.

### Preserve Brand While Changing Style

Do not change brand proof, CTA links, or core copy. Only adjust color/material, layout rhythm, or motion intensity according to the selected reference evidence.
