---
project: "webcam-conversational-agent"
title: "A fast local loop and a slow Gemini loop behind one Python server"
date: 2026-11-05T01:00:00Z
session: "Plan and server"
summary: "I planned a Quest Pro mixed-reality agent with a fast local model and a slow cloud model, and built the Python server first: speech, a referent scorer, a webcam bench calibration, context tiers and both loops."
facets: ["What I built"]
---

## What I did

On 5 November I wrote the architecture plan and committed the server in pieces: protocol, speech port, Gemini client and logging; a referent scorer with deixis extraction from transcripts; a camera source with ArUco bench calibration, a Gemini scene check and change detection; context tiers, the fast loop on Ollama with a grounding prompt and an out-of-character checker; then the slow loop (deepen, lookup, interest detection, injection policy) and session orchestration. The goal was an avatar that works out which physical object on a bench the user means ("what's this?") from eye gaze, a hand pointing ray and speech, and talks about it.

![Fast and slow loops: webcam, mic, gaze and pointing go to a Python server, which drives a fast Ollama loop that speaks via TTS. A slow Gemini loop does scene checks, lookups and verified notes that feed back into the fast loop context.](/images/diagrams/webcam-loops.svg "Planned fast/slow architecture")
## Why — decisions and trade-offs

- **One local Python server** owns the mic, speech, scorer, both models, TTS and logging, so Unity never holds a credential and Unity stays a thin input and rendering client.
- **Fast local model for replies, cloud model for understanding.** A small Ollama model (a 0.8B Qwen) answers right away; Gemini runs in the background to name objects, look things up and feed verified notes back.
- **Webcam first, behind a camera interface**, because the Quest Pro's camera pixels are not available to a PC app over Link (the plan marks this as a gate). A headset source stays a stub.
- **Open-set objects.** There is no hand-written corpus: Gemini finds, names and describes whatever is on the bench, and an authored corpus (for example paintings) is an optional overlay later.
- **Every model name, size and rate is config**, with separate configs for the dev GPU and the pilot GPU, so switching hardware needs no code change.
- **Reuse** of the speech server and Gemini setup from my Masters project.
- **No study conditions yet**; logging stays so conditions can be added as config flags.

## What I learned / what broke

Nothing broke in a way I can see in the history; the work is plan-driven and tested with unit tests. I have no latency numbers for this stage.

## Next

The Unity client: XR rig, gaze and aim samplers, WebSocket client, bench objects and calibration.
