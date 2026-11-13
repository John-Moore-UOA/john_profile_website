---
title: "Empathic Computing Lab Website"
summary: "A work-in-progress rebuild of the lab's website: an Astro static front end fed by a custom CMS."
year: 2026
status: "in-progress"
role: "Developer"
categories: ["Systems", "Tools"]
stack: ["Astro", "Next.js", "TypeScript", "Cloud Run", "Turso", "Cloudflare R2"]
featured: false
order: 60
cover: "Screenshot of the new lab website home page."
---

## Overview

A redesign of the Empathic Computing Lab website, built from Miro mockups. The public site is a static Astro front end that bundles a snapshot of content from a separate CMS.

## What I built

- Astro front end implementing the mockup design system (cards, category badges, stat blocks, news, events, presentations, publications).
- A Next.js CMS with collections for news, events and presentations.
- Hosting setup: CMS on Cloud Run with a Turso database and R2 uploads; the site resolves upload URLs against the CMS snapshot.
- Parity tests against the existing site content.

![PLACEHOLDER: Diagram: CMS (Cloud Run + Turso + R2) -> content snapshot -> Astro build -> static site](/placeholder.svg "ECL website architecture")

## Outcome

In progress.
<!-- TODO: verify launch status, what is left, and whether the CMS is live -->
