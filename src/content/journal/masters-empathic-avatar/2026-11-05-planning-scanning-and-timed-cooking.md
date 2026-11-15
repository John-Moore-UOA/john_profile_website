---
project: "masters-empathic-avatar"
title: "Naming the strategies: planning, scanning and timed cooking with a cue ladder"
date: 2026-11-05
session: "Week 11 (part 2)"
summary: "I designed planning and scanning strategies as small state machines, a merged Prepare and Cook phase, and timed cooking where the character cues on a known clock."
facets: ["Conversational logic", "Study design and operator tooling", "Environment design"]
---

## What I did

Wrote the spec and implementation plan on 5 November (design only that day; no code commits). The spec covers a planning strategy (which item do we start first, what goes on the plate first), a scanning strategy for shelves of look-alike items, a merged Prepare + Cook phase that opens with planning, timed cooking with auto-off before anything burns, and a single High/Low cognitive state.

![Timed cooking cue ladder along a timeline: suggestion, then direction, then a done window, then auto-off. Each rung only fires if the participant has not yet acted.](/images/diagrams/masters-cook-ladder.svg "Timed cooking cue ladder")
## Why — decisions and trade-offs

- **Strategies as small pure-C# state machines** behind one interface, run by the existing episode runner. I chose this over refactoring the runner so a new strategy costs one file and one case.
- **Planning reuses the order coach** rather than being rebuilt, since it already freezes the world, judges in code and gives hints.
- **Planning and scanning use no model.** Planning judges by keyword and scanning is forced and sequential, so every line is a template.
- **The character announces the strategy by name** for now, to test it. <!-- TODO: verify whether this stays in the study -->
- **Scanning is forced, not offered**, and starts on opening the shelf (or the first grab if it was already open), so it is not abrupt.
- **Off-plan is allowed** with one gentle reminder, then it is the participant's call.
- **Auto-off and darkening** so food cannot burn, because the clock is known and the system controls it.

## What I learned / what broke

Open risks I noted: the oven swaps the raw pizza for a cooked object, so timing settings must carry across; speech recognition spellings vary, hence a "sounds like" guard.

## Next

A training scene, then pilots.
