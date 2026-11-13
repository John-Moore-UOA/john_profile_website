---
title: "Real-time Study Dashboard"
summary: "The operator dashboard for the Masters project: live physiological streams, a participant VR video mirror over LiveKit, and a rule engine."
year: 2025
status: "in-progress"
role: "Solo developer"
categories: ["Physiological Computing", "XR", "Systems"]
stack: ["Python", "FastAPI", "React", "LiveKit", "LSL", "WebSocket", "Unity"]
featured: false
order: 3
related: ["masters-empathic-avatar"]
cover: "Dashboard screenshot: signal charts beside the live participant VR view."
---

## Overview

This is the operator dashboard for the [Masters project](/projects/masters-empathic-avatar). It sits between a physiological-sensing pipeline and the Unity VR runtime, so the experimenter can watch the participant's signals and view and interact with the running study live.

## Why

<!-- TODO: verify wording of research motivation -->
Running a study blind to the participant's state is limiting. The operator needs live signals, context and control in one place.

## What I built

- **Streaming data**: Lab Streaming Layer signals ingested in the backend and charted live; the dashboard renders whatever channels the pipeline declares (schema-driven).
- **LiveKit**: the participant's VR view is mirrored to the dashboard through a LiveKit SFU, with server-side Egress recording.
- **Rule engine**: declarative rules evaluate live signals and send object-status change requests to Unity over WebSocket; rules can be authored in the browser.
- **Recording**: sessions saved as XDF, SQLite and video.
- Five versioned contracts (signal schema, rule grammar, object-status, VR context, Unity behaviour) keep indicators, rules and VR environments swappable.
- Mock signal pipeline and mock Unity client for hardware-free testing.

![PLACEHOLDER: Diagram: sensors -> LSL -> backend (rule engine, recorder) <-> WebSocket <-> Unity; Unity camera -> LiveKit SFU -> dashboard](/placeholder.svg "Dashboard architecture")

## Outcome

The system runs end to end.
<!-- TODO: verify use in actual study sessions and participant counts -->
