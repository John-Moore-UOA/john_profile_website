---
project: "masters-empathic-avatar"
title: "Replacing the Wizard of Oz with a real cognitive-load model on LSL"
date: 2026-10-19
session: "Week 9"
summary: "On 21 October I revised the plan: physiology is real, there is no wizard, and the conditions are body modes. I also wrote the LSL pipeline design, an avatar IK review and the salad trial design."
facets: ["Physiological sensing", "Study design and operator tooling", "Avatar design", "System architecture"]
---

## What I did

Commits that week were save points ("save state 19", "pre layout changes"), but most of the thinking was in documents dated 21-22 October: a design for a cognitive-load model service on Lab Streaming Layer, a revision of the research plan (documents 10-16), a read-only review of the player avatar, IK and speech, and a third trial design (vegetable soup and juice).

![Planned cognitive-load pipeline: synthetic EEG and GSR on LSL plus Unity game-state markers feed a model service, which publishes a prediction stream on LSL to the Unity EVC and dashboard.](/images/diagrams/masters-cogload-plan.svg "Planned cognitive-load pipeline")
## Why — decisions and trade-offs

- **Reuse an existing lab model** (a Random Forest from an earlier lab study) instead of training my own, to get data flowing end to end before real sensors were available. It reads the raw sensor streams, never Unity's re-published copies.
- **Calibrate on the black-screen baseline**, which Unity marks via an LSL marker stream. A short dev baseline is padded to 30 s so the model always has enough data.
- **Synthetic sensors first.** Success meant the pipeline runs, not that predictions are meaningful. Meaningfulness waits for real data.
- **Treat a modest-accuracy classifier with caution.** The revised plan has physiology decide when and how the character acts, while the task decides what it says, and the character never mentions physiological state. <!-- TODO: verify the accuracy figures in the notes before quoting them -->
- **Drop the Wizard of Oz.** The character is always the AI, and study conditions become body modes. <!-- TODO: John to add why this changed -->
- **Matched trials.** The salad trial copies the shape of the others (Gather, Prepare, Cook, Serve; one riddle item, one missing item) so conditions stay comparable.

## What I learned / what broke

The avatar review flagged unit confusion: the XR rig is scaled 1.5x, so real, world and avatar metres differ. Several findings are marked as needing editor verification.

## Next

Play-test the full loop and fix what the logs show.
