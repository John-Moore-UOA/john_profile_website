---
project: "webcam-conversational-agent"
title: "Unity as a thin client, with an editor simulation so it runs without a headset"
date: 2026-11-05
session: "Day 1: Unity client"
summary: "I built the Unity side (eye gaze and hand aim samplers, WebSocket client with clock sync, bench calibration, TTS playback) and an editor simulation with a scenario runner so the loop can be tested without wearing the headset."
facets: ["What I built"]
---

## What I did

After the server I added the ARAgent scene and XR rig with OpenXR eye gaze and Touch Pro input, gaze and aim samplers and a gate probe; a WebSocket client with protocol DTOs, clock sync and a sample streamer; bench objects, a registry, a bench frame and a calibration mode (pinch three marker centres, adjust boxes, save); TTS playback, a simple avatar and a debug overlay. A further commit added editor simulation (mouse as gaze, right mouse as pointing, typed text input), a simulated bench, a scenario runner and a session report. An optional position-refinement step (markers, SAM box prompts, a robotics model) runs after the scene check.

![PLACEHOLDER: Screenshot of the Unity debug overlay: gaze scatter, belief bars and timings panel over the bench](/placeholder.svg "Debug overlay")

## Why — decisions and trade-offs

- **Samples, not decisions, leave Unity.** Compact gaze and point samples stream to the server, which does referent resolution, so the logic can be tested in Python.
- **Editor simulation and a scenario runner**, because I cannot always wear the headset and I wanted repeatable tests of whole conversations. <!-- TODO: verify reasoning -->
- **A gate probe** that prints how often eye gaze and hand aim are valid once per second, so I can check the hardware assumptions before trusting any result.
- **Position refinement is optional** because the first positions come from a vision-language model's boxes, which are approximate. <!-- TODO: verify reasoning -->

## What I learned / what broke

Later fixes show two issues here: the simulation had to hand gaze and pointing back to the XR input once the headset became active, since the session starts after the component is enabled, and the Standalone XR loader had to be set to initialise on startup.

## Next

A camera and photo gallery mode, to test pointing at objects inside photos.
