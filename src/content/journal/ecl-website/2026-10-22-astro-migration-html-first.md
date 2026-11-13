---
project: "ecl-website"
title: "Migrating the React SPA to Astro so every route ships real HTML"
date: 2026-10-22
session: "Session 1: Astro migration"
summary: "I rebuilt the existing React single-page site as an Astro project, keeping routes, look and the content-client seam, and pinned the old behaviour as parity tests first."
facets: ["What I built"]
---

## What I did

I snapshotted the existing repo, wrote route-parity and "HTML-first" test suites against the old React app, then scaffolded an Astro project and ported it in stages: layout, navbar and footer without a React runtime, prerendered static pages, prerendered detail pages with an `.ics` endpoint, and on-demand filtered list pages. I finished with Cloudflare config, error pages, no-JS fallbacks and a written record of the decisions.

![PLACEHOLDER: Diagram: old React SPA (empty div + JS bundle) vs new Astro build (prerendered HTML per route, small islands for copy-link)](/placeholder.svg "Before and after: what the browser receives")

## Why — decisions and trade-offs

- **Astro over keeping the SPA.** The SPA's HTML was an empty root div with the page title set client-side, so link-preview scrapers would show a generic title for shared news, event and publication links. Most of the site is content rendering with only a handful of interactive widgets. <!-- TODO: verify reasoning; this is taken from the plan's rationale, confirm it was your own motivation -->
- **Tests before code.** Writing the parity suite first made "same pages, same URLs" executable rather than a promise.
- **Filters as links and GET forms.** The five filterable list pages render on demand so they can read the query string; filter pills and pagination became plain links, so they work without client state.
- **Extensionless paths, no trailing slash.** Canonical and served paths stay exactly as before, so no URL churn.
- **Keep the content-client seam.** Pages fetch through the existing `ContentClient` and pass props to the existing components, so a CMS can be swapped in later without touching views.

## What I learned / what broke

The first "no React on /about" check could not actually fail, so I strengthened it to also assert there is no client script request and no inline script mentioning React. The default output produced `/about.html`-style paths, which needed explicit config to match the old URLs.

## Next

Remove the research-areas pages, add video and image galleries, then plan a CMS behind the content-client seam.
