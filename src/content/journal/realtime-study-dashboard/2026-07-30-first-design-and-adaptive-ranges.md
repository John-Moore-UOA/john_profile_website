---
project: "realtime-study-dashboard"
title: "First design iteration, and ranges for the adaptive environment"
date: 2026-07-30
session: "First design"
summary: "I put the operator view into a first visual design and sketched a settings panel where an adaptive environment moves within therapist-set ranges."
facets: ["What I built"]
---

## What I did

On 30 July I took the dashboard from a set of panels to a first designed screen. It puts the clinical context on the left (the task, the step, the current instruction and progress), the participant's VR feed in the middle, and the physiological signals on the right with a cognitive-load bar and an emotional-state read-out. I also drew a settings panel for an "auto-adaptive environment" where each scene object (room brightness, background sound, distractor objects, background avatars) has a range the system may move within, set with a two-handled slider.

![First design iteration of the operator view: task context, VR feed and physiological panels on one screen.](/images/dashboard/first-iteration.png "First design iteration")

![The adaptive-environment panel: a range for room light, ambient sound, counter props and bystanders.](/images/dashboard/adaptive-ranges.png "Ranges for the adaptive environment")

## Why — decisions and trade-offs

- **Everything the operator needs in one screen**, so they never have to leave the live view to find the patient's state.
- **Ranges, not single values.** A therapist sets how far the environment may go, and the system chooses a level inside that range as the participant's state changes. <!-- TODO: verify reasoning -->
- **Clear on/off for the adaptive mode**, so the operator always knows whether the environment is changing on its own.
- **Simulated values are labelled.** Read-outs that do not come from a real model yet are marked as simulated.

## What I learned / what broke

I did not finish the ranges as a working feature: the panel was designed but the environment-changing logic was still to come. <!-- TODO: verify whether the adaptive ranges were ever wired to Unity -->

## Next

Rebuild the screen as the docked operator console, and test the ranges with a therapist.
