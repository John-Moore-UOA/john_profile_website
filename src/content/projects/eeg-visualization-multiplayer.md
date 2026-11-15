---
title: "Shared EEG Visualisation in Multiplayer VR"
summary: "A two-person VR world where each player's live EEG-derived state shapes the shared environment, built on Unity, LSL and Netcode for GameObjects."
year: 2026
status: "in-progress"
role: "Solo developer"
categories: ["XR", "Physiological Computing", "HCI"]
stack: ["Unity", "C#", "LSL", "Netcode for GameObjects", "Python", "Three.js"]
featured: false
order: 4
spotlight: true
related: []
cover: "The scalp topography view: a 3D head with electrode positions and a band-power heatmap."
image: "/images/eeg-viz.png"
---

## Overview

A multiplayer Unity VR project in which two people each wear an EEG headset (Unicorn) and see each other's brain-derived state visualised in a shared virtual world. The first scene is "Mood Forest", where weather, wind and sky respond to a player's state.

## Why

I wanted to see how physiological signals can be made visible between two people in a shared space. <!-- TODO: verify research question / planned study -->

## What I built

- Per-PC pipeline: Unicorn EEG -> LSL -> band-power calculation (5 bands x 8 channels, ~10 Hz) plus a Python cognitive-load/emotion service.
- Networking: processed band powers and state are synced over Netcode (Relay/LAN) rather than sending raw LSL, so the traffic is small. Raw data is logged locally.
- Avatars and environment driven by the partner's state (Mood Forest: wind, terrain, grass, sky, weather).
- A second world, "Stain World", with its own explainer page. <!-- TODO: verify what Stain World is for -->

![EEG multiplayer overview: EEG headset to LSL to Unity (band power), then Netcode and Relay carrying processed state to the partner Unity, which changes the avatar and environment.](/images/diagrams/eeg-overview.svg "System overview: two PCs, each with a local LSL pipeline, exchanging processed state")
## Process

### 2026-10 — Web prototype

First version was a single-page Three.js viewer showing EEG band power on a procedural 3D head with 10-20 electrode glows and a scalp heatmap. A Python `bridge.py` (pylsl + websockets) streamed LSL to the browser, with a mock mode. The bridge was verified; the front-end page was not finished before I paused it.

### 2026-11 — Multiplayer Unity version

Moved to Unity with a VR multiplayer template (XR Interaction Toolkit, Netcode, Vivox voice), so two people could share the visualisation in VR. Added the Mood Forest design and environment.

## Outcome

Pipeline design and first scenes exist. <!-- TODO: add what has been tested with real EEG/two users, and results -->
