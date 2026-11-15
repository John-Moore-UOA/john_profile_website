---
title: "Empathic Computing Lab Website"
summary: "A work-in-progress rebuild of the lab's website: an Astro static front end fed by a custom CMS."
year: 2026
status: "in-progress"
role: "Developer"
categories: ["Systems", "Tools"]
stack: ["Astro", "Next.js", "TypeScript", "Cloud Run", "Turso", "Cloudflare R2"]
featured: false
order: 17
cover: "The Empathic Computing Lab website home page: dark hero with the lab name and tagline."
image: "/images/ecl-website.jpg"
imageCredit: "Screenshot of ecl.gideon-moore.com"
---

## Overview

A redesign of the Empathic Computing Lab website, built from Miro mockups. The public site is a static Astro front end that bundles a snapshot of content from a separate CMS.

## What I built

- Astro front end implementing the mockup design system (cards, category badges, stat blocks, news, events, presentations, publications).
- A Next.js CMS with collections for news, events and presentations.
- Hosting setup: CMS on Cloud Run with a Turso database and R2 uploads; the site resolves upload URLs against the CMS snapshot.
- Parity tests against the existing site content.

![ECL website hosting: an editor saves in the Payload CMS on Cloud Run with Turso and R2, a content snapshot is fetched at build time, Astro prerenders HTML and deploys it as a static site on a Cloudflare Worker. A rebuild hook from the CMS triggers the build on each save.](/images/diagrams/ecl-hosting.svg "ECL website architecture")
## Outcome

In progress.
<!-- TODO: verify launch status, what is left, and whether the CMS is live -->
