---
title: "Empathic Virtual Character: A VR Cooking Study with Physiological Sensing"
summary: "My Masters project: an AI-driven embodied character that coaches a participant through VR cooking tasks, with EEG/GSR sensing, study conditions and operator tooling."
year: 2026
status: "in-progress"
role: "Masters researcher and sole developer"
categories: ["XR", "AI", "Physiological Computing"]
stack: ["Unity 6", "C#", "XR Interaction Toolkit", "LSL", "Python", "Ollama / vLLM / Gemini", "Character Creator", "Whisper + TTS"]
featured: true
order: 1
related: ["realtime-study-dashboard"]
cover: "A wide VR screenshot from the headset view of the apartment kitchen: the embodied character standing across the counter, the recipe whiteboard on the wall, and the participant's own avatar visible in the mirror. Warm, even lighting."
---

<!-- TODO: verify year (first commit is 2026-08-24; the Masters may have started earlier), role wording, and whether anything has been published or presented. -->

## Overview

This is my Masters research project at the Empathic Computing Lab, University of Auckland. A participant makes meals in a virtual apartment kitchen in VR while an AI-driven embodied character coaches them. The character talks, listens, looks, points and offers help at moments chosen by code, with a language model supplying wording.

Around the character sits the machinery of a controlled study: four cooking trials, a training scene, three body conditions, scripted interruptions, EEG and skin-conductance sensing over Lab Streaming Layer, logging, and an operator dashboard (V-CORE) for the facilitator. The detailed design is in the [system reference](/reference/masters-empathic-avatar), and the decisions behind it are in the design journal.

![PLACEHOLDER: Hero shot from the participant's headset view: the character in the apartment kitchen with the recipe whiteboard behind it, mid-conversation with a subtitle line at the bottom](/placeholder.svg "The participant's view of the character in the kitchen")

## Why

<!-- TODO: John to write the research motivation and question: why an empathic embodied character for guided task support, why physiological sensing, why cooking, and the rehabilitation angle. The design notes imply a rehabilitation-style setting (errorless learning, named strategies) but do not state the thesis question. -->

The design notes do show the stance I took: the character should help at the right time and in the right way, and it should never tell the participant what the sensors think of them.

## Where it stands

- The kitchen, four trial definitions, food and appliance behaviour, and the training scene are built.
- The character handles speech in and out, gaze, pointing, help episodes, planning and scanning strategies, and timed cooking.
- The operator dashboard link and CSV logging are in place.
- The cognitive-load model service, its marker stream and the physiology-driven policy are specified but not finished.
- Next: pilot sessions to tune thresholds, then the study. <!-- TODO: John to add pilot count, ethics status, participant plan and dates; no results exist yet. -->
