---
project: "ecl-website"
title: "Putting a headless Payload CMS behind the existing content client over REST"
date: 2026-10-22
session: "CMS"
summary: "I planned and built a Payload CMS where every visitor-facing string, link and image is a CMS field, and made Astro read it through a REST adapter."
facets: ["What I built"]
---

## What I did

I added the Payload website template as a baseline, wrote a plan and content inventory, moved hard-coded UI text and navigation into the content model, stripped the template to a CMS skeleton, added every content collection plus site and page globals, wired a rebuild hook after published changes, and seeded the database from the Astro placeholder content. Astro then read from Payload through a `CONTENT_SOURCE=payload` switch.

![CMS to site data flow: Payload admin, REST API, a payload adapter, the ContentClient interface, then Astro views. A separate path: the afterChange hook calls a deploy hook, which triggers a rebuild.](/images/diagrams/ecl-cms-flow.svg "CMS to site data flow")
## Why — decisions and trade-offs

- **Headless, REST adapter.** Astro runs on Cloudflare Workers, which cannot load Payload's in-process Local API, so a REST adapter maps documents into the existing content types and components stay unchanged.
- **SQLite locally, production DB left open.** The template was half-switched to a Worker-only database adapter that cannot run scripts locally; the schema is database-agnostic so the production choice was deferred.
- **Granularity rule.** Anything a visitor can read or click is a CMS field; only CSS, component structure and route structure stay in code. No page builder.
- **Taxonomy labels stay in code for now,** because their values double as URL filter keys and drive logic; flagged as a follow-up.
- **"Renders identically" defined by the parity suite** run against the CMS source.
- <!-- TODO: John to confirm why Payload was chosen over other CMSs -->

## What I learned / what broke

The template arrived with a Next.js frontend I do not use, so the plan treats Payload as admin and API only. Rich text needed two small converters between Astro's blocks and Lexical, with unsupported nodes dropped with a warning.

## Next

Host the CMS and decide how the deployed site gets content without calling the CMS at runtime.
