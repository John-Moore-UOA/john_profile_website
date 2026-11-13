---
project: "realtime-study-dashboard"
title: "Replacing hand-rolled WebRTC with a LiveKit SFU and Egress"
date: 2026-06-19
session: "19-20 June"
summary: "I swapped the custom WebRTC signalling for a LiveKit SFU with server-side Egress recording, anchored to LSL time, and extracted the Unity client into a reusable package."
facets: ["What I built"]
---

## What I did

I added LiveKit, Egress and Redis to docker-compose, a token endpoint, and Egress recording orchestration anchored to the LSL clock. The frontend subscribes to LiveKit for the live mirror, and Unity gained a LiveKit publisher. Dockerfiles for backend and frontend followed. On 20 June I deleted the legacy WebRTC path, added video-synced signal playback in Data History with a two-point drift correction, and extracted the reusable Unity client into a `com.vcore.client` UPM package with a one-component launcher and a prefab. A LiveKit setup runbook and updated docs were written.

![PLACEHOLDER: Diagram: Unity spectator camera -> LiveKit SFU -> browser dashboard; SFU -> Track Egress -> .webm file; LSL timestamp anchored at egress start](/placeholder.svg "Video plane after the LiveKit migration")

## Why — decisions and trade-offs

- **SFU instead of custom signalling.** Maintaining my own broker and browser-upload recording had been the source of earlier bugs. An SFU gives one publisher, many subscribers and server-side recording. <!-- TODO: verify reasoning -->
- **Track Egress rather than Room Composite.** Room Composite failed in Docker (the commit says so) and needs headless Chrome; Track Egress avoids that.
- **Egress start is best-effort.** A recording failure must never abort a session.
- **LSL-anchored timestamps** so recorded video lines up with recorded signals; the drift correction uses two points rather than one.
- **UPM package** so the client can be dropped into other Unity projects, such as the main study.

## What I learned / what broke

Getting the SDK API right took four small fix commits (package name, `LiveKit.Proto` types, an ambiguous `RoomOptions`). In Docker, LSL stream discovery needed loopback unicast peers, and `lsl_api.cfg` has to be comment-free because liblsl does not support `#` comments.

## Next

Let rules trigger actions as well as status changes.
