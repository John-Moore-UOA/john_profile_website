---
project: "public-speaking-vr"
title: "Writing the spec, plan and compile check before building the Lying Audiences prototype"
date: 2026-11-11
session: "Planning (11 Nov, morning)"
summary: "I started the Lying Audiences prototype from a written spec and a resumable task plan, with a compile-check script, because agents could not drive the Unity editor."
facets: ["Overview", "What I built"]
---

## What I did

The project starts from a Unity VR template. The first commits added the spec, a standalone compile-check script, an implementation plan with a task list (T1 to T13), a `PROGRESS.md` tracker and an HTML export of the plan. The spec describes a VR public-speaking study prototype for a poster: five audience members whose attention drains and recovers with the speaker's head gaze, body language that is always truthful, and an aura whose honesty is the manipulation.

![PLACEHOLDER: Diagram: PLAN.md task chain T1-T13 with PROGRESS.md as the resume point and the compile check after each task](/placeholder.svg "Plan, track, compile-check loop")

## Why — decisions and trade-offs

- **Resumable by design.** The spec asks for a progress file and one task per pass, so work can continue from the first task that is not DONE in a fresh session after a usage limit.
- **Editor scripts generate every scene, prefab and asset.** Agents cannot drive the Unity editor, so I never hand-write scene or prefab files; one menu item rebuilds the scene.
- **A compile check outside Unity** (Unity's bundled compiler over all scripts, with editor and player passes) gates every task, and a grep bans legacy input calls and editor references in runtime code.
- **Prototype first.** The spec says fast prototyping with no polish passes; simple primitives stand in for audience members and 3D art is out of scope. EEG, physiology and speech analysis stay as stubs with interfaces.
- **Head gaze, not eye gaze**, because the Quest 3S has no eye tracking.
- **Plan exported to HTML before implementation**, so the plan survives if a session ends early.

## What I learned / what broke

The working tree showed about 140 unrelated template binaries as modified because of a Git LFS filter state, so the progress file says never to use `git add -A`; each task stages only its own paths.

## Next

Build the core contracts, scene builder, audience and gaze model.
