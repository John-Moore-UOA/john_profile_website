---
project: "masters-empathic-avatar"
title: "A first AI character, with the rule that code decides and the model phrases"
date: 2026-10-12
session: "Week 8"
summary: "The first AI commit added the EVC character runtime, a facial-mocap sender and a speech sidecar in one large drop, alongside the design rules that kept the model on a short leash."
facets: ["System architecture", "Conversational logic", "Avatar behaviour"]
---

## What I did

The commit on 14 October ("AI") brought in the Empathic Virtual Character code under `Assets/EVC`, avatar control (clip player, look-at), facial motion capture from a webcam, and a local speech server. It is a very large commit, so it was probably several weeks of local work landing at once. <!-- TODO: verify what was built before this commit -->

![PLACEHOLDER: Screenshot of the character standing in the kitchen with the debug overlay visible](/placeholder.svg "First AI character in the kitchen")

## Why — decisions and trade-offs

The research-plan notes set the principles I kept coming back to:

- **No new model call for each idea.** New concepts land as deterministic code plus authored lines, because one small model on one GPU is shared by two loops.
- **Discrete before continuous.** A few named states a therapist could read as a table, rather than a many-weight probabilistic model.
- **Every feature has an off switch**, so each study condition is a set of switches.
- **Log first, act second.** New appraisals run in shadow mode and only write to the log until checked against pilots.
- **Freeze the numbers before the study**, set from pilot data, rather than tuned on gut feel.
- **The model phrases, code chooses.** This stops the character hallucinating task facts and keeps the study logic auditable.

I considered letting the model choose strategies directly and rejected it as hard to ablate and hard to explain. <!-- TODO: verify reasoning -->

## What I learned / what broke

<!-- TODO: John to add what the first working conversation looked like and what failed. -->

## Next

Real physiological input, and play-testing the whole loop.
