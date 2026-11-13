---
project: "masters-empathic-avatar"
title: "Making food change state, then importing the first character"
date: 2026-09-07
session: "Weeks 3-5"
summary: "A slow stretch: oven, bread, salt, eggs and pizza behaviours, then the first Character Creator avatar and a spawn system. Nothing was committed from 24 September to 13 October."
facets: ["Environment design", "Avatar design"]
---

## What I did

Added the oven (7 September), bread with morph changes, salt spreading and an egg on bread (9-11 September), and a pizza (15 September). On 17-18 September I imported the first character ("Char") and kept a "pre_avatar_change" snapshot, then added egg cracking and a spawn commit on 23 September.

![PLACEHOLDER: Screenshot of a food item before and after a state change (e.g. raw vs cooked pizza, or egg cracked on bread)](/placeholder.svg "Food that changes state")

## Why — decisions and trade-offs

- **Foods as state machines with visible stages** (raw, cooked), so the task system can read them and the participant can see them. <!-- TODO: verify reasoning -->
- **Snapshot before the avatar change.** The "pre_avatar_change" commit suggests I expected the character import to be disruptive. <!-- TODO: verify -->
- **Character Creator as the avatar source.** This is the pipeline the whole project uses later; why I chose it over alternatives is not in the repo. <!-- TODO: John to add why Character Creator / Reallusion -->

## What I learned / what broke

<!-- TODO: John to add. The commit log shows no detail, and nothing was committed from 24 September to 13 October. I do not know what filled that gap (coursework, reading, writing, supervisor meetings?). -->

## Next

Give the character a brain.
