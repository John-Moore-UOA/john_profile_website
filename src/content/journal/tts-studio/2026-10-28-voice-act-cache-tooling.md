---
project: "tts-studio"
title: "Pre-rendering voice acts into a cache so a shared GPU never speaks live"
date: 2026-10-28
session: "Voice-act cache"
summary: "I built tooling to pre-render a catalogue of character lines, so lines play instantly instead of being synthesised on a GPU shared with Unity and a headset."
facets: ["What I built", "Why"]
---

## What I did

I imported the repo, moved the cache manifest to a second schema with voice "acts", act sources and `--base` reuse, added a miss report (`cache_report.py`) and a first act source, and wrote `CACHE_GUIDE.md` as an authoring loop for Claude Code to follow. I also fixed the report so it only counts act and cache lines at the start of a log event.

![Cache authoring loop: session logs go to cache_report, which finds misses; misses become act sources and sentence lists; build_cache renders them into a catalogue folder served by the sidecar.](/images/diagrams/tts-cache-loop.svg "Cache authoring loop")
## Why — decisions and trade-offs

- **Render ahead, pick at runtime.** The guide states a live render took 3 to 29 s in the 29 October sessions, because the GPU is shared with Unity, the headset and Ollama. A fast LLM picks from catalogued acts, which play instantly; a free sentence does not.
- **Turn free replies into acts.** Frequent misses become acts so the model can pick rather than write them.
- **Catalogues are immutable.** Logs and existing output folders are read-only; a new catalogue exists only when someone runs the build.
- **Instructions written for Claude Code.** The loop is documented as steps an agent can run rather than automatic behaviour. <!-- TODO: verify reasoning -->

## What I learned / what broke

The miss report originally over-counted because it matched lines anywhere in a log event; anchoring to the start of an event fixed it. I have no hit-rate numbers recorded here. <!-- TODO: add measured hit rate after the cache was used -->

## Next

Build the interactive Studio around the same engine.
