---
title: "Webcam Conversational Agent (Fast/Slow Loop)"
summary: "A speech agent that sees a bench of objects through a webcam, tracks what you attend to, and answers with a fast local model backed by a slow cloud model."
year: 2026
status: "in-progress"
role: "Solo developer"
categories: ["AI", "HCI"]
stack: ["Python", "Ollama", "Gemini", "faster-whisper", "Kokoro TTS", "YOLOE", "Unity"]
featured: false
order: 10
related: []
cover: "Screenshot of the live page: webcam view with object masks, track ids and belief bars."
---

## Overview

A conversational agent you talk to about physical objects in front of a webcam. It started as a Quest Pro mixed-reality prototype (hence the folder name AR_Image_speech) and now has a webcam-only mode, so it is not AR. A local Python server handles speech, vision, referent resolution and logging.

## Why

Answers need to be fast to feel conversational but also well grounded. <!-- TODO: verify research motivation / study plan -->

## What I built

**Fast/slow loop architecture**

- Fast loop: a small local model via Ollama replies right away, streamed sentence by sentence and spoken by TTS. It uses cached context (object cards and scene-check hooks as a fixed prompt prefix) so replies start quickly.
- Slow loop: Gemini (Vertex AI) runs in the background. It does the scene check that names the objects, looks things up, and checks or deepens claims, feeding verified notes back to the fast loop.

![PLACEHOLDER: Diagram: webcam + mic + gaze/pointing -> server -> fast loop (Ollama) -> TTS reply; slow loop (Gemini) -> scene check, lookups, verified notes -> fast loop context](/placeholder.svg "Fast and slow loops")

**Other pieces**

- Speech in (faster-whisper with word timestamps) and out (Kokoro TTS), with barge-in.
- Referent resolution: which object "that" means, from gaze or pointing (mouse gaze in webcam mode) scored into per-object beliefs at 10 Hz.
- Perception (latest work): a YOLOE worker with stable track ids, set-of-marks scene check, and lenses (relational, painting).
- Live debug page, session logging and an analysis report; Unity client for Quest Pro eye and hand input.

## Outcome

Working end-to-end in desktop/webcam mode with tests and a scenario runner. <!-- TODO: add user-study results, latency numbers if wanted -->
