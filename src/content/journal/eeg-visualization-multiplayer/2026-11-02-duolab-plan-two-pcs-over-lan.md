---
project: "eeg-visualization-multiplayer"
title: "Planning DuoLab: two PCs, local LSL, processed state over Netcode"
date: 2026-11-02
session: "Unity project start"
summary: "I set up the Unity multiplayer project from a VR template and wrote a plan with the main architecture decision: each PC runs its own LSL pipeline and only processed band powers travel over the network."
facets: ["What I built", "Process"]
---

## What I did

The first commit (2 November) was the project itself: a Unity 6 project based on a VR multiplayer template, with XR Interaction Toolkit, Netcode for GameObjects and Multiplayer Services. I copied its basic scene into an `EEG_DuoLab` scene and wrote a plan document, with each decision dated 2 November. The plan reuses ideas from my Masters project (LSL inlets, the emotion stream, the body IK scripts, the data logger) and from the web prototype (band-power maths, normalisation rules, a mock source).

![DuoLab architecture: PC A and PC B each run Unicorn EEG into LSL, a cognitive-load service and Unity (band power), and the two Unity instances exchange state through Netcode over the LAN.](/images/diagrams/eeg-duolab.svg "DuoLab architecture from the plan")

![An EEG cap on a head, seen from the side.](/images/masters/eeg-cap.png "The EEG cap each participant wears")
## Why — decisions and trade-offs

- **Do not send LSL over the network.** Multicast across subnets or university Wi-Fi is unreliable and has no session semantics. Raw 250 Hz samples stay local and are logged locally. The network carries band powers at about 10 Hz and cognitive-load state about every 10 s, which the plan estimates at under 2 KB/s per player.
- **Two PCs, same room, direct LAN.** One PC hosts and one joins by IP, so the Relay and Lobby services are not needed. Voice is deferred because players share a room.
- **Quest through Link on both PCs**, so there is no Android build and LSL, ML and Unity share a PC per player.
- **Resolve LSL inlets by exact stream name**, never by type, with names configured per PC. Otherwise an inlet could pick up the other PC's EEG stream on the same LAN.
- **A single `showOwnEEG` toggle** so early solo development can see its own cap and heatmap; later it becomes an experiment condition.
- **Environment responders deferred** to keep the first phases to networking, avatars, local LSL and networked physiology.

## What I learned / what broke

Nothing to run yet; this was planning. The plan lists items I could not do from the editor alone as a checklist for myself.

## Next

Design the first environment that reacts to physiological state.
