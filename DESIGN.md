# Design system: John Moore portfolio

A light-mode site in three colours. **Navy** is ink and the primary block colour, **sky** is the secondary colour and owns whole regions, **amber** is the accent that marks the one thing to do next. Type is Inter throughout. The recurring motif is a ribbed sky field that thins into the page ground.

Scene the design is built for: a recruiter or supervisor at a desk monitor in daylight, often an older reader, scanning for 30 seconds and then reading one project in depth. Hence light ground, navy ink, 18px body, large hit targets, no hidden content.

Source of truth: `src/styles/global.css` (tokens, shared components). Page-specific styles live in the `<style>` block of each `.astro` page.

## 1. Colour

### Pinned palette (client, never change the values)

| Token | Value | Role in the light world |
|---|---|---|
| `--bg` | `#0B1626` | Navy. Ink for headings; fill of navy blocks, the CV button, pressed states |
| `--bg-raised` | `#13233A` | Body ink on sky; raised surface inside navy blocks |
| `--line` | `#24405F` | Body copy ink (`--ink-2`); rules inside navy blocks |
| `--sky` | `#7EC8F2` | Secondary. Sky field, publications panel |
| `--sky-dim` | `#4A8DB8` | Hover outlines, list markers, dashed slot outline |
| `--white` | `#F4FAFF` | Page ground; heading ink inside navy blocks |
| `--text` | `#D6E4F0` | Body copy inside navy blocks |
| `--muted` | `#8AA3BA` | Captions inside navy blocks only (fails contrast on light) |
| `--amber` | `#FFB547` | Accent fill: primary button, marks |
| `--amber-hot` | `#FFCB7A` | Accent hover |
| `--amber-dim` | `#B87A24` | Accent pressed, hairline around amber dots |

### Derived light-mode tints (same family)

| Token | Value | Use |
|---|---|---|
| `--sky-deep` | `#62ADDA` | Top of the sky field |
| `--sky-soft` | `#B5DEF7` | Middle of the sky field, image slots |
| `--sky-wash` | `#E3F1FB` | Quiet band (Experience), chips, hovers, CV page ground |
| `--sky-ink` | `#1B5A87` | Links and course codes on light grounds (7:1 on ground) |
| `--ink-3` | `#4A6480` | Captions, dates (6.4:1 on ground, 5.3:1 on wash) |
| `--rule` | `#C4D9EA` | Hairlines and card outlines |
| `--surface` | `#FFFFFF` | Cards, CV sheet |

### Role tokens

Components read roles, never the raw palette: `--ground`, `--surface`, `--tint`, `--ink`, `--ink-2`, `--ink-3`, `--rule`, `--rule-strong`, `--link`, `--focus`.

Three scopes redefine the roles:

- **default (light)**: navy ink on `--white` ground.
- **`.navy`**: flips every role to the pinned dark tokens. Used for the Masters panel, Contact, the footer, the "Next project" block.
- **`.field`** and **`.pubs`**: sky surfaces. Ink stays navy; secondary text moves to `--bg-raised` / `--line`, because `--ink-3` fails on sky.

### Rules

- Amber is a fill or a mark, never text on a light ground (1.8:1). Amber text is allowed only inside `.navy`.
- White text is never set on sky; sky always carries navy ink (9.8:1).
- `--muted` and `--sky` as text colours belong to `.navy` only.
- Navy appears as a block at most once mid-page (Masters) and once to close (Contact + footer). Sky appears as a field at the top and once mid-page (Publications).
- Category colours (`[data-c]` -> `--cat`) are a 10px square swatch beside the label, never a fill or border: AI `#8E78E0`, HCI `#34A891`, XR `#3F9BD6`, Physiological Computing `#DE6C86`, Systems `#6F859C`, Tools `#CC9A2E`.

## 2. Type

Inter Variable for everything. IBM Plex Mono only for data: course codes, terms, years.

| Step | Size | Weight / leading / tracking | Where |
|---|---|---|---|
| Display | `clamp(3.6rem, 10.5vw, 6rem)` | 600 / 0.95 / -0.04em | Hero name |
| Close | `clamp(2.8rem, 7.5vw, 5rem)` | 600 / 1 / -0.04em | Contact heading |
| Page title | `clamp(2.6rem, 6vw, 4.5rem)` | 600 / 1.02 / -0.035em | Project and course h1 |
| Section | `clamp(2.3rem, 4.6vw, 3.4rem)` | 600 / 1.04 / -0.03em | Home h2 |
| Feature | `clamp(1.8rem, 3vw, 2.4rem)` | 600 / 1.12 / -0.03em | Masters title |
| Prose h2 | `2rem` | 600 / 1.12 / -0.025em | Article sections |
| Card / row title | `1.25rem - 1.35rem` | 650 / 1.25 - 1.35 | Cards, experience, column heads |
| Lede | `clamp(1.15rem, 1.9vw, 1.3rem)` | 400 / 1.5 | Hero lede, page summaries |
| Body | `1.125rem` | 400 / 1.65 | Default |
| Small | `0.9rem - 1rem` | 400 - 600 | Captions, dates, labels, chips |

Nothing readable is set below 0.82rem. Prose measure is 68ch. No uppercase tracked labels on the site (the CV sheet's section heads are the one exception, as a print convention).

## 3. Space, shape, depth

- Container `--max: 74rem`, gutter `clamp(1rem, 4vw, 3rem)`.
- Section rhythm `clamp(3.5rem, 7.5vw, 6rem)` top and bottom; section head to content `clamp(2rem, 5vw, 3.25rem)`.
- Radii: `--r-s 8px` (rows, code), `--r-m 16px` (cards, images, slots), `--r-l 24px` (navy and sky panels), `999px` (buttons, nav, chips, filters).
- Depth: `--shadow-s` on cards at rest, `--shadow` on hover and on panels. Always navy-tinted with offset and blur. Outlines are `inset 0 0 0 1px var(--rule)` box-shadows.
- Structure lines: a 2px navy rule opens a column or list (courses, experience, toolkit, prose h2); 1px `--rule` separates rows.

## 4. Components

- **Sky field (`.field`)**: vertical gradient `--sky-deep` -> `--sky` -> `--sky-soft` -> `--ground`, a 1px vertical rib pattern masked out toward the bottom, and two soft light patches that drift slowly (off under reduced motion). Home hero (min-height `min(54rem, 96svh)`) and the head of every project and course page (`.page-head`).
- **Nav**: sticky, 4.5rem. Brand with amber square mark; section links in a white pill group, current section is a navy pill; CV is a navy pill button (`.btn.ink`). On the home page the bar starts transparent over the sky and turns solid over the first 12rem of scroll (scroll-driven animation, solid fallback). Links collapse below 860px, leaving brand and CV.
- **Buttons (`.btn`)**: pill, min-height 2.85rem. Default amber fill with navy text (one per view); `.ink` navy fill; `.ghost` white with a navy hairline (transparent with sky hairline inside `.navy`).
- **Hero fact line (`.hero-facts`, `.facts`)**: hairline with a 9rem x 3px navy segment at its left end, three or four label/value pairs beneath.
- **Masters panel (`.masters.navy`)**: rounded navy block. Heading row with amber square mark and intro text, hairline, then image slot left and title, summary, amber "Read the design log" pill right.
- **Project card (`.card`)**: white, 16px radius, image slot 16:10 on top, then category swatches, title, summary, year. Hover lifts 3px and underlines the title in amber.
- **Filters**: pill buttons with category swatch; pressed is navy.
- **Publications (`.pubs`)**: solid sky panel with ribs, year in mono, title large in navy.
- **Course rows (`.area a`)**: code (mono, sky-ink) / name / term; hover is a sky-wash row.
- **Experience (`.xp`)**: on the sky-wash band; date column 10.5rem, then title, organisation, note. Education sits beside it as white cards.
- **Toolkit (`.skills`)**: four columns under 2px navy rules, items as sky-wash chips.
- **Contact (`.contact.navy`)**: full-bleed navy close, amber CV button, sky links; the footer continues in navy.
- **Image slots (`.slot-field`, `.fig-slot .slot`, `.ph`)**: pale ribbed sky, dashed sky-dim outline in articles, a white "Image to come" pill with an amber dot, and the brief of the owed image in navy text. Produced by `src/lib/rehype-figures.mjs` in articles.
- **Figures (`.fig`)**: 16px radius image, caption prefixed "Fig. n" in navy.
- **Project page**: sky head, then a sticky white spec card (Year, Role, Areas, Stack chips, Links) with an "On this page" list, beside the prose. Ends with Related rows and a navy "Next project" block with an amber arrow.
- **CV page**: sky-wash ground, white sheet with a hairline and soft shadow, navy rules, amber square before each section head. Print styles strip nav, footer and shadow.

## 5. Browser surfaces and states

- Selection: navy on light, amber inside `.navy`. Caret navy. Scrollbar sky-dim on sky-wash.
- Focus ring: 2px navy, 3px offset; amber inside `.navy`.
- Links: sky-ink with 1px underline, navy with 2px underline on hover.
- Motion: nav solidify on scroll, slow light drift in the sky field, 3px card lift, arrow nudge. All transform or colour, `cubic-bezier(0.16, 1, 0.3, 1)`, disabled where reduced motion is requested.

## 6. Do not

- No dark page grounds, no serif or decorative faces, no gradient text, no kicker labels above headings, no project status badges, no Three.js.
- No new hues outside the navy / sky / amber family apart from the six category swatches.
