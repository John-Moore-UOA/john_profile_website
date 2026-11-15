---
project: "harness-gemini"
title: "A staged Gemini harness so Claude reads one brief instead of the whole codebase"
date: 2026-11-13
session: "Build"
summary: "I built a self-contained Gemini agent on cloud credits that explores code and literature in stages and hands Claude Code a single judged brief through two skills."
facets: ["What I built", "Why"]
---

## What I did

The folder is not a git repo, so this is reconstructed from file dates (all 13 November) and the plan. `PLAN.md` set the stages: task, codebase summary (cached), literature search, six parallel personas without tools, and a judge that writes `40_brief.md`. The build order was: `gem.ps1` launcher with headless and prompt-file modes, a read-only policy, model aliases (bulk, cheap, synth), sub-agents (`code-reader`, `lit-scout`), orchestrator stages in `brainstorm.py`, then the `gemini-brainstorm` and `gemini-research` skills installed by junctions. Runs produced research notes on one of my other projects.

![Harness pipeline: a Claude Code skill calls brainstorm.py, which runs a cached codebase stage, a literature stage, six personas in parallel and a judge, and writes 40_brief.md.](/images/diagrams/harness-pipeline.svg "Harness pipeline")
## Why — decisions and trade-offs

- **Offload reading to save Claude usage.** Claude only reads the final brief file, not the intermediate stages.
- **Read-only policy on the target code,** writes allowed only inside the harness folder, and secrets files denied so keys are never sent to the model.
- **Junctions into the skills folder** so teardown is two `rmdir` commands and deleting the folder; nothing else is global.
- **Cheaper models for bulk stages, a stronger one only for the judge.** <!-- TODO: verify reasoning -->
- **Personas for diversity** (architect, ML theorist, HCI, security, skeptic, practitioner, wildcard) before synthesis.
- **Stable last-line JSON contract** so a calling skill can parse status, brief path and manual downloads.

## What I learned / what broke

Paywalled papers cannot be fetched automatically, so the harness writes a `_NEED_MANUAL_DOWNLOAD.md` for DOIs I fetch with university access. The last build step in the plan, a cost check against billing, has no recorded result. <!-- TODO: verify whether the cost check was done and any savings -->

## Next

Check cost against billing and decide whether to keep or tear down the harness.
