---
project: "masters-empathic-avatar"
title: "Help as a rigid, frozen-world episode, with the model reduced to two judgements"
date: 2026-11-03
session: "Week 11 (part 1)"
summary: "I replaced fire-a-hint-and-carry-on with a help episode: when the participant seems stuck the world freezes and a scripted 'think it through' conversation runs, with the model only answering closed questions."
facets: ["Conversational logic", "Avatar behaviour", "Interaction design"]
---

## What I did

Wrote the design and plan on 3 November, then implemented in about 12 commits: logic types and a strategy resolver with CLI self-tests, a help gate, a feature card, judging a spoken place answer, the "think it through" strategy, an episode world lock, an episode runner, a code-gate-then-model help detector, and freezing for the missing-item and riddle talks. I also wrote a manual test sheet and an explainer page.

![PLACEHOLDER: Diagram of the episode flow: open line -> ask "where would you usually keep the X?" -> right / wrong / don't know -> fallback or done](/placeholder.svg "Think it through help episode")

## Why — decisions and trade-offs

- **Detector is a code gate, then a model judge.** Code decides whether the model is even allowed to judge (no progress for 10 s, nobody speaking, 20 s since last help); the model answers yes/no on a short feature card. Evidence like "opened three wrong places" is a line on the card, never a rule by itself.
- **The strategy is fixed by the trial, not chosen by the model.** This keeps it auditable and ablatable.
- **Every episode line is a template.** The model only judges yes/no and maps an unclear answer to one place id, so it has nothing to hallucinate.
- **Freeze everything, silence everything else.** No grabbing or opening during an episode, and only episode lines are spoken. This stops the participant and the character talking past each other.
- **One try before the fallback**, because of caution about errorless learning. <!-- TODO: John to confirm the rehabilitation reasoning -->
- **Asking for help starts an episode** and skips the judge.

## What I learned / what broke

All thresholds sit in one settings asset so they can be tuned during Play. They are starting values, not validated. <!-- TODO: John to add what pilots showed about the thresholds, if anything -->

## Next

Add planning and scanning strategies and timed cooking.
