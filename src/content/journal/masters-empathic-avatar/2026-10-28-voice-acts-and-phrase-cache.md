---
project: "masters-empathic-avatar"
title: "Letting the fast model pick short voice acts from a pre-rendered cache"
date: 2026-10-28
session: "Week 10 (part 2)"
summary: "I built a Chatterbox speech sidecar with a catalogue of pre-rendered lines and changed the fast loop to choose typed acts, so most replies play instantly and the model has less to get wrong."
facets: ["Conversational logic", "System architecture"]
---

## What I did

On 28 October I wrote the voice-act cache plan, then built it in a handful of commits: a `evc_chatterbox` sidecar (a copy of the Piper-based one), serving catalogue hits from cached audio, importing the catalogue into Unity with a logged hit rate, a phase-scoped act menu, schema-constrained replies with a streaming parser, and an `ActMode` knob on the fast loop. I also shortened speech and added new avatar skins.

![PLACEHOLDER: Diagram: fast LLM picks an act id (e.g. find.where egg) -> realiser -> cached WAV in the Chatterbox sidecar, or live render on a miss; session log records hit rate](/placeholder.svg "Voice-act cache flow")

## Why — decisions and trade-offs

- **Acts instead of sentences.** The model chooses from a vocabulary of short typed acts (for example `find.where` with an item slot) rather than writing free text. This fits the rule that code decides and the model only phrases, and it shrinks what can go wrong. <!-- TODO: verify this was also about latency vs just safety -->
- **Caching is an external, manual pipeline.** Lines are rendered offline with the voice model, and a report turns logged misses into the next catalogue, so Unity only imports a manifest. This keeps Unity simple and lets me improve coverage between sessions.
- **A duplicate sidecar instead of editing the old one.** The Piper server stays untouched as a fallback.
- **Misses render live** with the same voice, so coverage gaps cost latency, not silence.

## What I learned / what broke

The manifest is the contract between the sidecar and Unity, so any change to it breaks both. I have not measured the real hit rate yet; the log records it for pilots. <!-- TODO: John to add measured hit rate if known -->

## Next

Add a cloud option for the slow loop and tighten the dialogue.
