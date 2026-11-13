---
project: "realtime-study-dashboard"
title: "Ingesting several role-based LSL streams and adopting the real pipeline manifests"
date: 2026-07-03
session: "3-26 July"
summary: "I moved from one sensor stream to several, with per-stream link status, then re-synced the manifests to the sensor pipeline's confirmed source of truth and fixed rules keyed on channels that did not exist."
facets: ["What I built"]
---

## What I did

On 3 July I added ingestion of multiple role-based LSL streams with per-stream link status and NaN handling for absent channels, and changed the cognitive-load rule to target the channel by category because it had become categorical. On 16 July I re-vendored the pipeline manifests, added a `LevelBar` renderer for ordinal categoricals, made the emotion channel use circumplex quadrant labels, honoured a rolling `window_s` chart window, and rewrote two affect rules to target the real emotion channel. On 21 July I condensed the Session Monitor layout and grouped the pipeline signals into a titled panel. On 25 July I fixed multi-stream XDF recording and made session start not block on LiveKit.

![PLACEHOLDER: Screenshot of the Session Monitor with a level-bar cognitive load meter and the emotion quadrant](/placeholder.svg "Cognitive load and emotion renderers")

## Why — decisions and trade-offs

- **Per-stream link status** so one dead stream does not hide the others.
- **Level bar for ordinal categories** rather than the 2x2 quadrant, which suits Low < Medium < High.
- **Rolling window** so the visible span is fixed regardless of sample rate.
- **Defer to the pipeline's manifest.** The pipeline is a separate piece, so I treat its manifest as the source of truth rather than inventing placeholder labels.

## What I learned / what broke

Two real bugs. The affect rules had been keyed on a non-existent `affect` channel, so they never fired until rewritten. And once each sample carried only one stream's channels, the XDF writer stamped zeros into channels it did not carry, so recorded series alternated between real values and zero; the fix holds the last known value and writes no row for empty samples. Starting a session also hung when the egress was unhealthy, and an orphaned session then blocked every later start with a 409.

## Next

A larger redesign of the operator console for the study.
