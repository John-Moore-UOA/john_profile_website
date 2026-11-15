---
project: "public-speaking-vr"
title: "Tasks 1-6: attention model, gaze lock and the aura as the manipulated cue"
date: 2026-11-11T02:00:00Z
session: "Attention model"
summary: "I built the core of the prototype: config assets, attention model, scene builder with desktop mode, audience members with body language, head-gaze selection, the aura conditions and a session state machine."
facets: ["What I built"]
---

## What I did

Each task was one commit. T1 added the core enums, config ScriptableObjects, the attention model, a session log facade and a debug GUI. T2 added a scene builder, a clinical white and grey room, the XR rig and a desktop mode. T3 added the audience member prefab, body-language animation and an audience manager. T4 added head-gaze selection with a lock highlight. T5 added the aura shell, the condition maths and F5 to F7 debug keys. T6 added the game-state controller, instruction display and experimenter keys.

![Diagram of the VR room: five seated audience members, each with a coloured aura above their head as the attention cue, and the speaker in a headset whose head gaze locks onto one of them.](/images/diagrams/ps-audience-aura.svg "Audience with aura cues (diagram)")

## Why — decisions and trade-offs

- **Body language is always true; the aura is the manipulated cue.** The conditions are body-only, congruent aura and incongruent aura, with fake-high shown as an aura claiming engagement the body does not show.
- **The game-state controller knows only the audience and the instruction text.** Everything else (topic card, questionnaire, logger, overlay) subscribes to its events, so later tasks did not need to edit it.
- **Input System only.** The project uses the new input package, and the legacy `Input` class compiles but throws at runtime, so it is banned.
- **Desktop debug mode** with a separate camera and auto-detection of the headset, so the logic can be tested without wearing one. <!-- TODO: verify reasoning -->
- **Aura colour and alpha through a per-instance property block** on an existing unlit transparent material, so each member can differ without creating materials.
- **Flat generated materials** instead of the template's, to control wall brightness and aura contrast.

## What I learned / what broke

The tracker records small corrections as they arose, for example that the unlit material has no emission channel, so aura colour could only use the base colour. Everything so far only passes a compile check; none of it had been run in Unity at this point.

## Next

Setup screen, participant files, topic cards, questionnaire, logging.
