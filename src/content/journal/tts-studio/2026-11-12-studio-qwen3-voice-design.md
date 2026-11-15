---
project: "tts-studio"
title: "Adding Qwen3-TTS as a second engine in its own venv, with voice design"
date: 2026-11-12
session: "Studio"
summary: "I turned the cache tooling into a browser Studio and added Qwen3-TTS (voice design from a description) as an out-of-process second engine that swaps with Chatterbox on an 8 GB card."
facets: ["What I built", "Why"]
---

## What I did

The 12 November commit adds the Studio server and page (stories, takes, scratch tabs, Whisper scoring), a voice tab with a designer and dated voice library, a bottom render-queue dock with tokens per second and cancel, an MCP server and CLI so Claude can drive the Studio, requirements files, a model setup script and a "set this project up" section in `CLAUDE.md`. Work before the commit may span several days; only the commit date is in git. <!-- TODO: verify when the Studio work started -->

![Diagram of the Studio Voice tab: a voice designer where a voice is described and designed, a dated voice library, and a render-queue dock along the bottom showing queued renders, tokens per second and a cancel button.](/images/diagrams/tts-voice-tab.svg "Voice designer and render dock (diagram)")

## Why — decisions and trade-offs

- **Qwen3-TTS in a separate runtime** (`qwen_server.py`, own venv, port 8092) because its package pins a different transformers version than Chatterbox needs.
- **One engine in VRAM at a time,** swapped under a lock, to fit an 8 GB GPU.
- **Qwen3-TTS replaces Fish S2** as the second engine. <!-- TODO: John to add why Fish S2 was dropped -->
- **Whisper word match plus pitch on every take** so quality is judged by numbers as well as by ear.
- **MCP control layer** so "render this line angrier" works in the open page; see [Live App MCP](/projects/live-app-mcp).
- **User data git-ignored** (voices, takes, exports, logs, weights).

## What I learned / what broke

`qwen-tts` drops extra generate arguments, so progress and cancel are injected by wrapping the talker's generate call; Chatterbox progress comes from wrapping its sampler's tqdm. The main venv is named `.env` for historical reasons, which is easy to mistake for a dotenv file.

## Next

Use the Studio for real character voices and record where they end up. <!-- TODO: verify -->
