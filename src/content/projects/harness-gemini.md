---
title: "Gemini Research Harness"
summary: "A self-contained Gemini-based research agent that does codebase reading and literature search for Claude Code, to save Claude usage."
year: 2026
status: "prototype"
role: "Solo developer"
categories: ["AI", "Tools"]
stack: ["Gemini", "Python", "PowerShell", "Node.js", "Claude Code skills"]
featured: false
order: 16
cover: "Illustration: one request fans out to six personas and a judge merges them into one brief."
image: "/images/harness-gemini.svg"
imageCredit: "Illustration made for this site"
---

## Overview

A temporary, self-contained harness that runs Gemini on Google Cloud credits as a research agent. It can be used interactively, one-shot, or called from Claude Code through two skills (`gemini-brainstorm`, `gemini-research`).

## Why

Codebase exploration and literature search eat context and usage. I offload that reading to Gemini and get back one compact brief.

## What I built

- `gem.ps1` launcher (interactive and headless modes, read-only policy on target code).
- Staged orchestrator: codebase summary, literature search, six parallel personas, then a judge brief.
- Sub-agents for code reading and literature scouting; model aliases for cost control.
- Claude skills linked in via junctions so teardown is one command.

![Harness pipeline: a Claude Code skill calls brainstorm.py, which runs a cached codebase stage, a literature stage, six personas in parallel and a judge, and writes 40_brief.md.](/images/diagrams/harness-pipeline.svg "Harness pipeline")
## Outcome

Working prototype used for planning and research.
<!-- TODO: verify any cost/usage savings; do not state numbers without data -->
