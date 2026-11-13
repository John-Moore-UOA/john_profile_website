---
project: "eeg-visualization-multiplayer"
title: "Web prototype: building the LSL bridge and wire contract before the 3D head"
date: 2026-10-24
session: "Prototype, session 1"
summary: "For the Three.js EEG head prototype I wrote and tested the LSL-to-WebSocket bridge and a design spec first, and set rules for the front end such as per-band normalisation and never silently falling back to mock data."
facets: ["What I built", "Process"]
---

<!-- TODO: verify date. The prototype folder is not a git repository. Its context note says "paused 2026-10-24", so I used that date; the real start date is unknown. -->

## What I did

The brief was a single-page Three.js viewer showing EEG band power on a procedural low-poly head with 10-20 electrodes that glow by band power, an interpolated scalp heatmap and a band dropdown. I started with the data layer. `bridge.py` reads an LSL EEG stream (or a mock generator), keeps a ring buffer per channel, computes band power with a Welch spectrum on a 2 s window, and broadcasts JSON over WebSocket at about 10 Hz. I wrote a test client and a fake 10-channel 256 Hz LSL outlet to check it. A design spec and a notes file on the bridge's wire-contract caveats came before any front-end code.

![PLACEHOLDER: Diagram: EEG headset -> LSL stream -> bridge.py (ring buffer, Welch PSD) -> WebSocket JSON at 10 Hz -> Three.js page (normalise, colour lookup, heatmap)](/placeholder.svg "Prototype data path")

## Why — decisions and trade-offs

- **Data separate from rendering.** A mock generator and a WebSocket source sit behind one interface, so the page can switch from mock to live without changes.
- **Two message shapes.** A full form with all bands and a flat per-band form for simple clients, distinguished by a `type` field.
- **Normalise per band with an adaptive range.** Absolute power spans orders of magnitude and delta dominates, so a fixed 0 to 1 scale would hide everything else.
- **Take channel names from the data**, so unexpected electrode names do not crash the page.
- **Never fall back to mock on a dropped connection**; show frozen, greyed values instead, so a dead feed cannot pass for live data.
- **Dark instrument look with colour only for data**, and a single colour lookup shared by heatmap, electrodes and legend. I had a separate design agent write the spec and a validation agent test it, so the build was challenged by two reviewers. <!-- TODO: verify reasoning -->

## What I learned / what broke

The bridge's maths checked out against a known case (a 10 Hz sine of amplitude 10 gives alpha power 50). Ctrl+C shutdown on Windows was written but not tested at that point.

## Next

Build the front end against the spec and have it reviewed.
