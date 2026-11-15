---
project: "webcam-conversational-agent"
title: "A read-only debug viewer that shows each model's full context"
date: 2026-11-06
session: "Debug viewer and camera fixes"
summary: "I added a local debug page that captures every model call and its full prompt, with a Copy question button per turn, and fixed black webcam frames by turning auto exposure back on."
facets: ["What I built"]
---

## What I did

Task 16 added server-side capture of every model call (fast chat, Gemini scene check, deepen, lookup, STT, TTS) with exact requests, latency and first-token timing, plus a debug API and reference prompts. Task 17 added the debug page and a total-to-first-audio time per turn. Two fixes followed: keep camera auto exposure on and request MJPG (a manual exposure lock gave black frames on the Brio), with a `check_camera` tool, and enable Standalone XR initialisation on startup.

![Diagram of the debug page: a list of turns with one selected, the prompt parts that were sent to the fast model for that turn, timing chips for latency, time to first token and total to first audio, and a Copy question button.](/images/diagrams/webcam-debug-viewer.svg "Debug viewer (diagram)")

## Why — decisions and trade-offs

- **Local, live, read-only.** My answers were: local page only, full prompt text always, images behind a toggle that is off by default, and no live tuning.
- **No cost when nobody is watching.** Capture keeps references to strings already built, adds no model calls, and the debug socket only sends when a viewer is connected.
- **Bounded memory** with ring buffers of recent calls and turns, and everything also appended to a log file.
- **No secrets in captured prompts**, tested.
- **Copy question** puts a self-contained prompt with repo pointers on the clipboard, so I can paste it into Claude to debug a turn.
- **Auto exposure on.** The manual lock I had chosen to keep frames stable produced black images, so I reverted.

## What I learned / what broke

Black frames silently broke the scene check, since it found nothing; the `check_camera` tool and the README note about the privacy shutter came from that. The README also says a closed shutter gives black frames.

## Next

Webcam-only mode and a local perception model.
