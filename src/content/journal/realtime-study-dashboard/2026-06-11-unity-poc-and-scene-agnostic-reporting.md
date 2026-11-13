---
project: "realtime-study-dashboard"
title: "Making the Unity side scene-agnostic: VR context and behaviour as contracts"
date: 2026-06-11
session: "11-15 June"
summary: "I built a Unity proof-of-concept client, then added two more contracts (VR context and Unity behaviour) so any scene can describe itself and feed its own telemetry into the same pipeline as the sensors."
facets: ["What I built"]
---

## What I did

On 11 June I added a Unity 2022.3 project with ObjectStatus and StatusCollector components, a WebSocket client, a request dispatcher, a spectator camera and a sample scene, and fixed the first round of serialisation and signalling mismatches (snake_case to match the contract, nested ICE candidate format). The dashboard gained grouped signal panels, an editable rule manager and a Data History view with a chart and event log.

On 12 June I added Contract 4 (free-form VR context key/value fields shown in a live panel) and Contract 5 (behavioural channels from Unity ingested like sensor signals), plus a link-status watchdog that moves a silent stream from stale to offline. Behavioural metrics are declared per object and re-scanned on scene change; the manager persists across scene loads and re-handshakes. On 14-15 June came 1080p30 spectator streaming, recorded-video playback, a warnings log separate from rule firings, a frontend redesign, and a rebrand of the vendor-specific stream names to a neutral "sensor pipeline".

![PLACEHOLDER: Screenshot of the Session Monitor showing signal panels, the VR context panel and the participant video mirror](/placeholder.svg "Session Monitor after the scene-agnostic changes")

## Why — decisions and trade-offs

- **Unity describes itself.** Instead of the dashboard knowing about scenes, Unity declares its object statuses and behaviour metrics, so the same dashboard works across scenes and projects.
- **Behaviour through the same pipeline as sensors**, so it can be charted, used in rules and recorded without a second code path. I also removed behaviour channels from the sensor stream's manifest, so each source declares only its own.
- **Decoupled mock values from rule thresholds** so the mock client tests the plumbing rather than just triggering one rule.
- **Vendor-neutral naming**, so the dashboard is not tied to one device's stream. <!-- TODO: verify reasoning -->

## What I learned / what broke

The link-status watchdog oscillated between stale and offline after a stream went silent, and clients that connected late did not see current link state. Both needed explicit fixes (push cached state on connect, clear on disconnect). Several of the first WebRTC bugs came from the browser and Unity disagreeing on message shape.

## Next

The hand-rolled WebRTC path was fragile; look for a proper media server.
