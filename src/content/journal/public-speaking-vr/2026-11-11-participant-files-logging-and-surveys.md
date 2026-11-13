---
project: "public-speaking-vr"
title: "Tasks 7-13 and staged surveys: a Latin square, JSON questionnaires and CSV logging"
date: 2026-11-11
session: "Build part 2 (T7-T13 and T14)"
summary: "I finished the experiment scaffolding: counterbalanced participant files, topic cards and timers, an in-VR questionnaire from JSON, CSV logging, LSL and physiology stubs, and an experimenter overlay, then added staged surveys and a performance tracker."
facets: ["What I built", "Outcome"]
---

## What I did

T7 added a setup screen, participant JSON files and a Latin square generator. T8 added the topic card and timers, T9 an in-VR questionnaire loaded from JSON, T10 a CSV logger (frames, events, questionnaire and a session JSON), T11 an LSL marker sender plus physiology and speech stubs, T12 an experimenter overlay and end panel, and T13 an integration audit and README. Later that day a larger commit (titled only "1/4 fable") added config assets, a performance tracker and tuning, and a design note describes staged surveys (pre-session, post-practice, post-block, post-session) read from a JSON file.

![PLACEHOLDER: Screenshot of the experimenter PC window showing the setup screen, session state and quick-test option](/placeholder.svg "Experimenter view")

## Why — decisions and trade-offs

- **Counterbalancing.** All six condition orders are cycled by participant number, and topics use a 4x4 Williams square, so 24 participant files cover every combination once.
- **Questionnaire re-read on every entry**, so item edits apply without rebuilding. If the file is missing or invalid, built-in defaults load.
- **Audience hidden during questionnaires**, so ratings are not taken while looking at the cue. <!-- TODO: verify reasoning -->
- **Quick-test mode** divides all durations by 10 so the whole flow can be exercised quickly.
- **LSL behind a scripting define**, and untested, so the project compiles without the LSL package installed.
- **Esc ignored at the End state** so end-panel data cannot be discarded by accident.
- **Log both sides of the manipulation**, with displayed attention logged as -1 when the aura is hidden.

## What I learned / what broke

The integration audit found an ordering bug: the session-started event must be raised before `session_start` is logged, or the logger's sink does not yet exist and the first row is lost. Desktop IMGUI panels also receive no input under the new Input System, so they take input through a helper. The tracker says the prototype awaits its first run in Unity. I have no participant data.

## Next

Run it in Unity, work through the test plan, tune values, and pilot with participants.
