---
project: "talkinghead-hr"
title: "Starting a high-fidelity talking-head scene for a fake heart-rate study"
date: 2026-11-11
session: "Project setup (11 Nov)"
summary: "I created the Unity VR project and an HDHead scene as the base for a planned study on whether spoofed heart-rate feedback on a talking avatar is believable; nothing else is implemented yet."
facets: ["Overview", "What I built"]
---

## What I did

The repository has one commit (11 November, "Initial check-in") that holds a Unity VR template project with the XR Interaction Toolkit samples. An `HDHead` scene and Character Creator tools project files exist in the working folder but the HDHead scene is not in that commit. There is no study logic, no heart-rate source and no data yet.

![PLACEHOLDER: Screenshot of the HDHead scene in Unity with the high-fidelity head in front of the XR rig](/placeholder.svg "HDHead scene")

## Why — decisions and trade-offs

- **High-fidelity head.** The planned question is whether a heart-rate cue can be faked convincingly, and how perceived heart rate shifts trust, so the avatar needs to look like a believable person. <!-- TODO: verify reasoning -->
- **Character Creator pipeline**, which I already use in other projects, for the avatar and its facial blendshapes.
- **Real versus spoofed cue.** The plan is that the cue is sometimes real and sometimes spoofed, but the design, conditions and measures are still undecided. <!-- TODO: John to add design, hypotheses, conditions and measures -->

## What I learned / what broke

Nothing yet. This is project scaffolding, and the repository gives no evidence beyond the scene setup.

## Next

Decide the study design and conditions, choose the source and display of the heart-rate cue, and build the playback with the avatar.
