---
project: "masters-empathic-avatar"
title: "A no-AI training scene that records data like a real condition"
date: 2026-11-09
session: "Week 12"
summary: "I built a short fixed lemon-water training task with no AI, whose physiological and step data are logged exactly like a condition session, and landed the cook and order coaches."
facets: ["Study design and operator tooling", "Interaction design", "Data pipeline and logging"]
---

## What I did

10 November: wrote the training-scene design and plan, then implemented a grab gate on the trial interaction lock, a pure step flow with rewind, section labels and a step log, a pot, hob and cup, a lemon that cuts into two halves, a to-do board with a "not yet" label, and the white-room scene. On 12 November a large commit added the EVC cook and order coaches, help logic, the training runtime and study assets.

![PLACEHOLDER: Screenshot of the white training room with the to-do board, bench, pot and hob](/placeholder.svg "The training scene")

## Why — decisions and trade-offs

- **Familiarisation before the conditions.** The participant learns the main kitchen's interactions (open, grab, place, pour, press, cut) in one standing spot, so skill is not confounded with the condition. <!-- TODO: verify reasoning -->
- **No AI, no machine learning, no adaptation in training.** Nothing is used live, so the baseline of how people handle the interactions is clean.
- **Logged like a condition session.** The same baseline, same filename scheme and `events` labels (`baseline_training`, `training:01_get_pot` and so on) let training data be merged with the main data later.
- **Rigid step order with rewind**, and each step completes itself when the system sees it done.
- **Doors and drawers are always free**, only grabbing is gated.
- **A white room and a mirror** so the participant also sees their avatar. <!-- TODO: John to add why the mirror matters for the body conditions -->

## What I learned / what broke

Edge cases I planned to test by hand: grabbing early, re-pulling the pot after pouring, pressing the hob button at the wrong step, and lifting an empty cup. Whether the scene passes a full headset run is not recorded in the repo. <!-- TODO: John to add the outcome of the first full run -->

## Next

Pilot sessions to tune thresholds and decide whether physiological signals should act on the character. The cognitive-load service and its timing policy are specified but not finished.
