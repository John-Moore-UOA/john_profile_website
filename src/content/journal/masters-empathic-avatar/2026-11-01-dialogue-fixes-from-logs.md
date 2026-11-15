---
project: "masters-empathic-avatar"
title: "Fixing dialogue by reading logs: answer in code, keep scripted lines out of history"
date: 2026-11-01
session: "Weeks 10-11"
summary: "A weekend of about 25 dialogue fixes from a session log: more questions answered by code, push-to-talk locked during key lines, and a cleaner fast-model prompt."
facets: ["Conversational logic", "Interaction design"]
---

## What I did

1-2 November: "can you hear me?", "how do I...?", "is this it?" and meta questions now get code-built answers; the favourite riddle accepts an early right guess and gives a clue after two misses; the fast prompt sees the board by section and number, then as a list rather than a place; scripted lines and old turns are kept out of the model's history; push-to-talk is locked while a phase intro or key line is said; pointing hits padded proxy colliders first.

![Diagram: a turn in the EVC session log where the model got it wrong is read back, and the fix moves that kind of question (can you hear me, how do I, is this it, questions about the session) to an answer built in code.](/images/diagrams/masters-log-to-fix.svg "From log to fix (diagram)")

## Why — decisions and trade-offs

- **A missing line caused a cascade.** The egg trial's empty reveal line meant "I have no idea" moved the stage forward silently, and the prompt then called the item "butter". Fix: a fallback reveal line and a logged warning so an empty line is never silent.
- **The board is a list, not a place.** The model had started treating "on the board" as a location, so the prompt now gives an ordered list and states that nothing is kept there.
- **Scripted lines stay out of the model's history** so it does not copy or contradict them.
- **"I don't know" after a clue is not a wrong guess**, which is kinder and avoids penalising honesty. <!-- TODO: verify reasoning, possibly an errorless-learning concern -->
- **Do not nag.** No assist cue right after the character has spoken or the participant has talked, and no door nagging during gathering.

## What I learned / what broke

Most "model errors" were really state errors in the task or trial data, found only by reading the log.

## Next

Replace one-line hints with structured help episodes.
