---
project: "realtime-study-dashboard"
title: "Adding fire-and-forget actions alongside object statuses"
date: 2026-06-21
session: "Actions and project catalog"
summary: "I added Contract 3c so a rule can issue a parameterless action as well as set an object status, plus a project-wide catalog so rules can target scenes that are not loaded."
facets: ["What I built"]
---

## What I did

I added the abstract-action contract (3c), rule-engine support for `then.action`, a `VCoreAction` Unity component, rule-builder UI to author and render actions, and `action_fired` events. A project-wide catalog of every ObjectStatus and VCoreAction is baked at build time so rules can be authored against not-yet-loaded scenes. I removed the leftover ZMQ transport stub.

![Diagram: in the rule builder a rule's THEN can run an action instead of setting an object status; the rule engine sends it to a VCoreAction component in the Unity scene and an action_fired event comes back. A project catalog baked at build time lists every status and action.](/images/diagrams/dash-action-rule.svg "Authoring an action rule (diagram)")

## Why — decisions and trade-offs

- **Actions are separate from statuses.** A status is a state you set; an action is a command with no parameters. Keeping them distinct keeps the grammar simple. <!-- TODO: verify reasoning -->
- **A catalog beside the live manifest.** The live manifest still drives dispatch and degradation, but authoring needs to know about objects across all scenes and prefabs.
- **Drop ZMQ.** Only the WebSocket transport was real; the stub was dead code.

## What I learned / what broke

A type-checking failure on the LiveKit client (mypy `no-untyped-call`) needed the client typed loosely. Otherwise this was a clean day.

## Next

Polish and Windows/Docker fixes, then connect real sensor streams.
