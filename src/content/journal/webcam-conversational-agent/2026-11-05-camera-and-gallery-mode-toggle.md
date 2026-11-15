---
project: "webcam-conversational-agent"
title: "Camera and gallery mode as a toggle that leaves the base agent untouched"
date: 2026-11-05T03:00:00Z
session: "Camera mode"
summary: "I added an optional virtual camera and photo gallery where pointing at an object in a photo highlights it on the real bench, built so that with the toggle off nothing in the base agent changes."
facets: ["What I built"]
---

## What I did

Tasks 12 to 15, each with a short report. The server builds a photo pipeline: the virtual camera's view frustum is intersected with the bench plane, mapped into webcam pixels with the bench calibration, and the webcam frame is warped into a "photo". Gallery selection, similarity groups and a highlight were added, then a Unity camera with a viewfinder, shutter and photo receiver, then a gallery panel, photo pointing and a highlight renderer, with a fixture photo and end-to-end test. Gallery focus overrides dwell so pointing in a photo works like gazing at the object.

![Diagram of the photo pipeline: the virtual camera's view frustum is intersected with the bench plane, mapped into webcam pixels with the bench calibration, the frame is warped into a photo, and the photo goes to a gallery panel where pointing at an object counts as gazing at it.](/images/diagrams/webcam-camera-gallery.svg "Camera and gallery mode (diagram)")

## Why — decisions and trade-offs

- **Toggle, off by default.** With the mode off there are no new active objects, no new messages and unchanged scorer weights, and the existing tests pass unchanged. This kept the base agent safe while I experimented.
- **Photos come from the webcam, not the headset.** Quest passthrough pixels are not available to a PC app over Link, so a photo is the webcam's view of the same area, geometrically matched to the virtual camera.
- **Granularity toggle**: highlight this object, objects of the same type, or the same category, decided by Gemini type groups.
- **Photo crops go to Gemini** when the gallery is open, so "what's this?" is about the pointed object.
- Open design questions were answered with the recommended option in a questions page. <!-- TODO: John to add any answers that differed from the recommendations -->

## What I learned / what broke

I did not record specific failures in the commit messages. The mapping from photo pixels back to bench coordinates depends entirely on calibration accuracy, which I have no measurements for. <!-- TODO: add calibration error if measured -->

## Next

A debug page that shows exactly what context each model received.
