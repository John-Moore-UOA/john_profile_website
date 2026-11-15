---
project: "realtime-study-dashboard"
title: "Rebuilding the dashboard as an operator console with a task manifest"
date: 2026-08-10
session: "Operator console"
summary: "I rebuilt the frontend as an operator console with docked panels, per-step assistance cues and camera switching, and added a sixth contract so Unity declares the task steps."
facets: ["What I built"]
---

## What I did

On 10 August a large commit replaced the old screens with a console: header with session pill, context rail, feed stage, signal panels, state strips and slide-over panels. Follow-up commits made cameras subscribe properly and only render the selected spectator camera. On 19 October I added Contract 6 (Task Manifest: Unity declares phases, steps and assistance cues), the `assist_invoke`/`assist_clear` relay to Unity, a manifest-driven report template, a step guide and local run scripts. Per the redesign notes, backend tests went from 201 to 217 passing and frontend tests stood at 75. AI read-outs, beliefs and settings are simulated (marked SIM) until an agent service exists.

![The operator console before a headset connects: context rail, VR feed stage and docked signal panels.](/images/dashboard/unconnected.png "Operator console, waiting for a headset")

![Three details of the console: the manual controls panel, the save-report dialog with notes, and the step assistance cues.](/images/dashboard/console-controls.png "Manual controls, notes and report export, and assistance cues")

## Why — decisions and trade-offs

- **Unity declares the task steps**, since cues depend on the current step. This mirrors the existing camera-state plumbing (validate, cache, broadcast; relay verbatim), so the backend change is small.
- **The console works without Unity changes**: without a manifest it shows a demo plan marked SIM.
- **Mark simulated parts clearly** so a mock read-out is never mistaken for a model output.
- **Manifest-driven reports** where code fills facts and the model only writes marked blocks, constrained to a schema. <!-- TODO: verify reasoning -->

## What I learned / what broke

Camera feeds needed to stop rendering when not selected, and spectator feeds dropped from 1080p to 720p. <!-- TODO: John to add why (performance?) --> Several commit messages in this stretch are only "a" or "cooking", so some intent is not recoverable from the log.

## Next

Connect the simulated agent read-outs to a real agent service, and run the console in study sessions.
