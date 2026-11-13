---
project: "masters-empathic-avatar"
title: "Moving the odd answers out of the 2B model and into code"
date: 2026-10-26
session: "Week 10 (part 1)"
summary: "Play-test logs showed that every strange reply came from a turn that fell through to the small language model, so I added a recipe-talk stage, gaze and pointing, a live caption and code-resolved questions."
facets: ["Conversational logic", "Interaction design", "Avatar behaviour"]
---

## What I did

27-28 October was a burst of about 40 commits after play-tests. Highlights:

- A **recipe talk** at the start of Gather: scripted welcome, a short talk about a bad item and the "favourite" riddle item, then a wrap-up. Doors, drawers and items are locked during it.
- **Gaze and pointing** (head gaze plus controller rays) so "this" and "in there" can be resolved, and "what am I looking at?" answered from gaze.
- A head-locked **live caption** of what the participant says, a **Quest mic** default with partial transcripts, and a "Speaking disabled" caption while push-to-talk is locked.
- A **head-level indicator** during the black baseline.
- Code-resolved questions: "the last item", "the third one", "is it in here?", "what else?", "what is next?".
- Door, knife and dropped-item fixes.

![PLACEHOLDER: Screenshot from the headset view showing the live caption of the participant's speech at the bottom of the view](/placeholder.svg "Live caption of the participant's speech")

## Why — decisions and trade-offs

- **Evidence from logs.** In the 28 October log, every line that came from code was correct and every odd line came from a turn that fell through to the model. So each fix moved a decision into code or narrowed what the model could say, rather than adding prompt instructions.
- **No prompt pleading.** Highlighting is an ability, not speech: no line says who makes something glow, only "The X is glowing now" in the passive.
- **Gaze is soft evidence.** Quest 3 has no eye tracking, so head gaze stands in, and looking never makes the character act on its own, because looking is not intending (the "Midas touch" problem).
- **Lock the world during the recipe talk** so the model has nothing to drift to; earlier the talk wandered to "grab the egg first".
- **Caption of speech.** I added it so I (and later the participant) can see what was heard when recognition fails. <!-- TODO: verify reasoning -->

## What I learned / what broke

The Quest mic was silent because the speech sidecar defaulted to the first "Oculus" device, which only carries audio while Link is active and its input is set to the headset. A slow-model request holding the only model slot once made every reply time out. The gaze system was typechecked but not yet run in the headset when I wrote its spec.

## Next

Make the character's speech faster with cached voice lines, and stop the slow loop blocking the fast one.
