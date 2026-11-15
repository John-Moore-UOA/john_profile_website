---
project: "masters-empathic-avatar"
title: "Building the kitchen as a goal-checked task, not a set of props"
date: 2026-08-24
session: "Weeks 1-2"
summary: "The first two weeks went into a VR apartment kitchen whose objects (drawers, appliances, items) report their state to a recipe-goal system, so the study can judge task progress in code."
facets: ["Environment design", "Interaction design"]
---

## What I did

Created the Unity project on 24 August and had the apartment scene in by the 25th. Then I made the furniture usable: a toaster that highlights, drawers you pull and slide open, and drawer slots that hold items. On 31 August "RecipeGoalCompletion" started working, along with item respawning and the first multi-ingredient food (cheese, tomato, lettuce). The second week added a blender and a coffee machine.

![The apartment kitchen in the Unity editor.](/images/masters/kitchen.png "The kitchen scene in the Unity editor")

## Why — decisions and trade-offs

- **Recipe goals as data that objects report into.** Completion is judged by a goal system reading object state, rather than by scripts per recipe. This is what later lets the character know whether a step is right without asking a language model. <!-- TODO: verify reasoning; the commits only say "RecipeGoalCompletion Works" -->
- **Item respawning.** Participants will drop or lose items in VR, so an item that falls out of reach needs a way back. <!-- TODO: verify reasoning -->
- **Appliances one at a time** rather than a generic "machine" abstraction, because each (blender, coffee machine) has its own physical interaction. <!-- TODO: verify whether a shared appliance base was considered -->

## What I learned / what broke

A "fix scaling" commit on 26 August suggests early imported assets did not match real-world size, which matters when the participant reaches for things at arm's length. <!-- TODO: verify what exactly broke -->

## Next

More appliances and foods, then a character to put in the room.
