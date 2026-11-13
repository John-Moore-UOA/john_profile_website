---
title: "Lying Audiences: VR Public Speaking"
summary: "A Unity VR prototype testing how fake versus true audience-attention cues affect a speaker, with full session logging. Built, not yet run with participants."
year: 2026
status: "prototype"
role: "Solo developer"
categories: ["XR", "HCI"]
stack: ["Unity", "C#", "XR Interaction Toolkit", "LSL", "Quest 3S"]
featured: false
order: 30
related: []
cover: "Screenshot of the VR room with five seated audience members and coloured attention auras above their heads."
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

![PLACEHOLDER: Screenshot of the experimenter PC window showing the setup screen and session state](/placeholder.svg "Experimenter view")

## Outcome

All planned tasks are implemented and compile. It has not yet been run in Unity or with participants, so expect tuning. <!-- TODO: update once piloted -->
