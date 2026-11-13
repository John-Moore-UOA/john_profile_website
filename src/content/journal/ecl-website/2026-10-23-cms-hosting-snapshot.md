---
project: "ecl-website"
title: "Hosting the CMS on Cloud Run and bundling a content snapshot into the site"
date: 2026-10-23
session: "Session 3: Hosting"
summary: "I put the CMS on Cloud Run with Turso and R2 and made the public site build against a bundled snapshot, so the deployed site never calls the CMS."
facets: ["What I built"]
---

## What I did

I added Turso database support with migrations, S3-compatible (R2) media storage, a standalone Next output with a Dockerfile, and a small Worker that puts the CMS on a custom domain in front of Cloud Run. On the site side I added a build-time CMS snapshot bundled into the Worker and resolved upload URLs against the snapshot's CMS origin. I also made events show times in their own timezone and gave presentations their own page and collection.

![PLACEHOLDER: Diagram: CMS (Cloud Run + Turso + R2) -> snapshot at build time -> Astro Worker; editor save -> rebuild hook](/placeholder.svg "Hosting topology")

## Why — decisions and trade-offs

- **Snapshot instead of runtime calls.** The public site stays static and fast and keeps working if the CMS is down. <!-- TODO: verify reasoning -->
- **Rebuild hook POSTs during the save.** Cloud Run throttles CPU when idle, so a deferred POST would not reliably run.
- **Staging worker name** so a deploy cannot replace the live React worker.
- **Schema push only for local file databases;** Turso uses migrations.

## What I learned / what broke

Idle-CPU throttling on Cloud Run changed how the rebuild hook had to be sent. Launch status of the CMS and the public site is not recorded in the repo. <!-- TODO: verify whether the CMS is live -->

## Next

Finish remaining content work, check the live cut-over and decide what stays deferred.
