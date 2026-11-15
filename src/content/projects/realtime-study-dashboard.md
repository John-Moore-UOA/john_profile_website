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
cover: "The operator dashboard before a headset connects: context, VR feed and signal panels."
image: "/images/dashboard/unconnected.png"
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

![Dashboard architecture: sensors to LSL to the backend (rule engine, recorder), which talks to Unity over WebSocket. The Unity camera goes through a LiveKit SFU to the operator dashboard.](/images/diagrams/dash-overview.svg "Dashboard architecture")
## Operator controls

The console is built for a therapist or experimenter who is watching a live session and may need to step in.

- **Manual controls.** A panel to change the participant's room (lighting, for example) with a preview beside what the headset currently shows, so a change can be checked before it is applied.
- **Assistance cues.** Per-step buttons that appear in the headset, such as highlighting an object or repeating the hint.
- **Notes and report.** Timestamped notes grouped by phase, and a session report that can include the notes and an AI summary.
- **An adaptive mode.** A switch for an auto-adaptive environment, with ranges for each scene object. This was designed but is not finished.
<!-- TODO: verify which of these controls are live in study sessions -->

![First design iteration of the operator view.](/images/dashboard/first-iteration.png "First design iteration (July)")

![Ranges for the adaptive environment.](/images/dashboard/adaptive-ranges.png "Settings for the adaptive environment")


## Outcome

The system runs end to end.
<!-- TODO: verify use in actual study sessions and participant counts -->
