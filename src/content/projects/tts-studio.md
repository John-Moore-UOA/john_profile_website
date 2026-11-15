---
title: "TTS Studio"
summary: "A local browser studio for writing, rendering and tuning character voice lines with open TTS models, controllable by Claude."
year: 2026
status: "complete"
role: "Solo developer"
categories: ["AI", "Tools"]
stack: ["Python", "Chatterbox", "Qwen3-TTS", "Whisper", "MCP", "HTML/JS"]
featured: false
order: 6
spotlight: true
related: ["live-app-mcp"]
cover: "The Studio Story tab: lines, emotion arc and render queue."
image: "/images/tts-studio.png"
---

## Overview

TTS Studio is a local, browser-based tool for writing and rendering character voice lines. It runs entirely on my own machine (no cloud APIs) using Chatterbox voice cloning, with optional Qwen3-TTS and Kokoro engines.

## Why

<!-- TODO: verify motivation (e.g. voice assets for studies/prototypes) -->
I wanted a fast loop for designing character voices and tuning delivery without paying per-clip cloud costs.

## What I built

- Story tab: stories made of lines, per-line settings, emotion arc, take history, export (WAV / MP4 / zip).
- Voice tab: voice library, voice designer (describe a voice in words), record or upload a reference clip.
- Render queue with live tokens/s, and a Whisper word-accuracy plus pitch check on every take, with optional auto-retakes.
- An MCP server (`studio_mcp.py`) so Claude can drive the open Studio live; see [Live App MCP](/projects/live-app-mcp).


## Outcome

Works end to end on Windows with an 8 GB GPU. Shared as-is as a personal tool.
<!-- TODO: add where voices from this were used, if any -->
