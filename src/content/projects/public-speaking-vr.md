---
title: "Lying Audiences: VR Public Speaking"
summary: "A Unity VR prototype testing how fake versus true audience-attention cues affect a speaker, with full session logging. Built, not yet run with participants."
year: 2026
status: "prototype"
role: "Solo developer"
categories: ["XR", "HCI"]
stack: ["Unity", "C#", "XR Interaction Toolkit", "LSL", "Quest 3S"]
featured: false
order: 12
related: []
cover: "Illustration of a VR headset above a seated audience."
image: "/images/public-speaking-vr.svg"
imageCredit: "Illustration made for this site"
---

## Overview

A VR public-speaking study prototype. A participant gives three short talks to five seated placeholder audience members. Each member's attention depends on where the speaker looks (head-gaze lock), and body language always shows true attention. A coloured aura above each member is the manipulated cue.

## Why

To test how audience feedback, including misleading feedback, affects a speaker. <!-- TODO: verify exact research questions and hypotheses -->

## What I built

- Three aura conditions: hidden (body only), true (congruent), fake-high (incongruent), counterbalanced with a Latin square across 24 participant files.
- Gaze-driven attention model, audience prefab and body language.
- Experimenter tools: setup screen, state machine, topic cards and timers, overlay.
- In-VR questionnaire loaded from JSON.
- Logging: CSV for frames, events and questionnaire, plus a session JSON; LSL marker sender and stubs for physiology and speech.
- Runs on Quest 3S via Link, or in desktop debug mode without a headset.

![Diagram of the experimenter PC window in three parts: a setup screen (participant file, Latin square condition order, quick test), the session state (block, condition, topic card and timer, questionnaire stage), and the experimenter overlay with its keys and end panel.](/images/diagrams/ps-experimenter-view.svg "Experimenter view (diagram)")

## Outcome

All planned tasks are implemented and compile. It has not yet been run in Unity or with participants, so expect tuning. <!-- TODO: update once piloted -->
