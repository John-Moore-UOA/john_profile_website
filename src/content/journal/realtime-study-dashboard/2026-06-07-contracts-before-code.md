---
project: "realtime-study-dashboard"
title: "Writing JSON-Schema contracts before any dashboard code"
date: 2026-06-07
session: "7-9 June (first sprint)"
summary: "I started the operator dashboard (V-CORE) by defining four JSON-Schema contracts and their validators, then built the event bus, rule engine, schema-driven UI and session recording on top of them."
facets: ["Overview", "What I built"]
---

## What I did

Over the first three days (7-9 June, 22 commits) I scaffolded a Python backend and a Vite/React frontend, then wrote four JSON-Schema contracts (signal schema, rule grammar, object-status manifest, status request) with valid and invalid golden examples. Python (pydantic) and TypeScript (ajv) validators were written against them, with a CI gate. On top of that went an async event bus, a manifest registry, ingestion adapters with stale detection, a rule engine, a WebSocket bridge, a FastAPI app and a first schema-driven dashboard. By 9 June I also had an XDF writer, a SQLite session store, a recorder, a first custom WebRTC video path, and end-to-end smoke tests using a mock signal pipeline and mock Unity client.

![PLACEHOLDER: Diagram: contracts folder (JSON Schema) -> Python validators and TypeScript validators; backend event bus -> rule engine -> WebSocket -> Unity; backend -> dashboard](/placeholder.svg "Contracts as the single source of truth between components")

## Why — decisions and trade-offs

- **Contracts first.** The architecture notes say the platform must stay plug-and-play, so sensors, rules and VR environments can be swapped independently. Defining the messages as schema first meant each side could be built and tested against golden examples before the others existed.
- **Schema-driven UI.** The dashboard renders whichever channels the pipeline declares, so a changed indicator does not need UI code changes.
- **Mocks early.** A mock pipeline and mock Unity client let me test the whole loop with no headset or EEG hardware. <!-- TODO: verify reasoning -->
- **Declarative rules, hot-reloaded and validated** rather than hard-coded logic, so rules can later be authored in the browser.

## What I learned / what broke

Small breakages came up straight away: pytest exiting with code 5 on an empty collection, a vitest config type error, a missing Vite proxy for the backend routes, and lint failures once the checks were wired in. I fixed each the same day.

## Next

Build a Unity proof-of-concept client that speaks these contracts, and get real video flowing.
