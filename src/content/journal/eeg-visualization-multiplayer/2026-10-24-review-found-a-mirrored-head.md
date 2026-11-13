---
project: "eeg-visualization-multiplayer"
title: "Review round: the specification itself had a mirrored head"
date: 2026-10-24
session: "Prototype, session 2"
summary: "A validation and design review of the Three.js build found that my own spec drew the left hemisphere on the wrong side, and that the head did not read as a head. I changed the colour scale and face geometry from the evidence."
facets: ["What I built", "Process"]
---

<!-- TODO: verify date and ordering. The prototype is not under git; the review documents are dated 2026-10-24, the context note says paused 2026-10-24 and says index.html was not started, but a large index.html and a studio folder exist in the directory. I could not reconcile these. -->

## What I did

A coder pass built `index.html` against the design spec, logging 23 deviations with a reason each. A validation pass then ran headless-browser tests: console errors, electrode positions in each camera preset, end-to-end data checks, a hostile WebSocket server, a window resize storm, hidden tabs, and a real Ctrl+C sent to the bridge on Windows. A design pass critiqued screenshots and proposed a patch for the head.

![PLACEHOLDER: Screenshot of the Three.js head with electrode glows and scalp heatmap, front and profile views](/placeholder.svg "Prototype head after the review")

## Why — decisions and trade-offs

- **The mirror bug was in the spec.** With +Y up and +Z toward the nose in Three.js, the subject's right is the -X side, so my convention put odd-numbered electrodes (Fp1, C3, O1) on the wrong side. The coder followed the spec faithfully, so the fix belongs in the spec.
- **Default colour scale changed** from the amber "Ember" to a "Dusk" ramp, because with Ember a small 4.7 to 21 power range read as one flat orange ball. Both stayed available and both passed the colour validator.
- **Face geometry reworked** because squeezing the face into the sphere's underside gave a recessed, alien look.
- **Abstract rather than more realistic.** The review proposed a smooth dark head with a rim light and glowing contour lines below the scalp, rather than adding realism. <!-- TODO: verify whether this was adopted -->

## What I learned / what broke

An icosahedron "detail" value behaves linearly in this Three.js version, so the spec's values gave a skull of about 500 triangles and aliased the heatmap away. Electrodes at the horizon bloomed into glare blobs. I had not expected a convention bug to survive from spec to build; the independent validation pass is what caught it.

## Next

I paused the web prototype here and moved to a shared two-person VR version in Unity.
