# Project entry format

Each project is one Markdown file: `src/content/projects/<slug>.md`.

## Frontmatter (YAML, all keys required unless marked optional)

```yaml
---
title: "Human readable title"
summary: "One sentence, max ~160 chars. What it is + the outcome. Plain words, no hype."
year: 2025                 # number, year started
status: "complete"         # one of: complete | in-progress | prototype | planned
role: "Solo developer"     # your role, short
categories: ["XR", "HCI"]  # 1-3 from: AI | HCI | XR | Physiological Computing | Systems | Tools
stack: ["Unity", "C#", "LSL"]   # 3-8 concrete technologies
featured: false            # true only for the Masters project
order: 50                  # lower = earlier in list (masters = 1)
related: []                # optional: slugs of related projects
links:                     # optional; omit keys you don't have
  github: "https://github.com/..."
  demo: "https://..."
cover: "What the cover image should show (instruction to John)."
---
```

## Body

Use `##` sections. Keep it factual, first person ("I built…"), short paragraphs.
Default skeleton (skip sections with no evidence; never invent results):

```
## Overview        what it is, in 2-4 sentences
## Why             motivation / research question (brief; mark TODO if unknown)
## What I built    bullets or short subsections of the actual pieces
## Process         optional dated journal entries: ### 2025-03 — Title
## Outcome         what works, what was learned, what's next
```

## Image placeholders

Where an image would help, insert exactly:

```
![PLACEHOLDER: precise description of the screenshot/diagram John should provide](/placeholder.svg "Caption shown under the figure")
```

For architecture diagrams, describe boxes and arrows in the alt text
(e.g. "Diagram: Unity client -> LiveKit SFU -> Python dashboard; LSL stream from EEG into Unity").

Mark anything uncertain with `<!-- TODO: verify ... -->`. Do not fabricate numbers, participants or findings.

# Journal entries (blog per week / session)

File: `src/content/journal/<project-slug>/<YYYY-MM-DD>-<short-slug>.md`

```yaml
---
project: "masters-empathic-avatar"
title: "Giving the character a fast and a slow brain"
date: 2026-09-07          # start of the week/session
session: "Week 3"
summary: "One or two sentences: what changed this week and the key decision."
facets: ["Conversational logic", "System architecture"]  # names of System reference sections touched
---
```

Body sections (keep each short; journal voice, first person):

```
## What I did
## Why — decisions and trade-offs     (the justification; alternatives considered)
## What I learned / what broke
## Next
```

Image placeholders as above. Mark inferred reasoning with `<!-- TODO: verify reasoning -->`.

# System reference

`src/content/reference/<project-slug>.md` — the detailed "what" of every facet. Overview page links to its sections.
