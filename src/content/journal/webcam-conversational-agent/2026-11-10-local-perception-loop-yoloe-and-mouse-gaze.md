---
project: "webcam-conversational-agent"
title: "A local YOLOE perception loop, with the mouse standing in for eye gaze"
date: 2026-11-10
session: "Perception loop"
summary: "I made the agent work with only a webcam: a local segmentation model tracks objects continuously, the mouse cursor replaces eye gaze in the same referent scorer, and a relational Gemini step deepens the hovered object."
facets: ["What I built", "Outcome"]
---

## What I did

First a commit of webcam-only mode with a live page and attention prototype. Then tasks T1 to T10 and a report: a prompt-free YOLOE segmentation model in its own spawned worker process using shared-memory frames and a motion gate; a track registry with stable ids, a label vote and re-identification; mouse gaze converted into per-object gaze angles so the existing scorer is unchanged; a `/live` page that draws masks, ids, names, focus and belief bars; a set-of-marks scene check where Gemini names each track id; lenses (general relational, painting, a historic-site stub) with a claim guard; and a replay tool. Per the report, pytest went from 234 to 259 passing.

![Diagram of the /live page: the webcam view with a coloured mask over each tracked object, each tagged with a track id and name, one object marked as the current focus, and a belief bar per track beside it.](/images/diagrams/webcam-live-page.svg "Live perception page (diagram)")

## Why — decisions and trade-offs

- **Separate worker process for the model**, because importing torch in the server clashed with the speech library's cuDNN DLLs (found in an earlier audit). The server never imports torch.
- **Mouse as gaze.** Cursor position becomes the same gaze angles Unity would send, so dwell, deixis windows and beliefs work unchanged and the same code can later take Quest Pro gaze.
- **Stable track ids** so each object's context pool stays attached despite flicker.
- **Motion-gated rate** (15 Hz when things move, every fourth frame otherwise) to leave GPU headroom for Ollama and Unity.
- **Claim guard** on Gemini's relational notes: drop specific claims that are not grounded.
- **Prompt-free labels with Gemini naming them**, rather than a fixed label list, to stay open-set.

## What I learned / what broke

Measured in the report (single dev machine, 8 GB GPU): the s-model ran about 25-33 ms per frame; the set-of-marks scene check took 16 s and named 10 of 16 tracks; a relational deepen took 8.2 s; the first fast-reply sentence arrived in about 0.5 s when hovering. The guard dropped two plausible Van Gogh claims because Gemini returned no source, so it may discard true facts. YOLOE's own labels are odd ("ktv", "remove"). Not yet tested: hands and occlusion, speed under motion, and the browser page with the shutter open.

## Next

Make the claim guard read grounding metadata, hide unnamed tracks from the fast prompt, and retest with the shutter open and a user study.
