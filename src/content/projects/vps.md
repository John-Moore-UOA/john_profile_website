---
title: "Virtual Patient Simulator"
summary: "A tool for the Faculty of Medical and Health Sciences that lets educators build diagnosis scenarios and lets students practise them safely before they meet real patients."
year: 2023
role: "Developer"
categories: ["HCI", "Systems"]
stack: ["React", "Vite", "MongoDB", "Firebase", "Tailwind CSS"]
featured: false
order: 7.4
spotlight: true
links:
  github: "https://github.com/UoaWDCC/VPS"
  demo: "https://www.wdcc.co.nz/projects/vps/2026"
cover: "The Virtual Patient Simulator login screen."
image: "/images/vps.jpg"
imageCredit: "Screenshot via WDCC (wdcc.co.nz)"
---

<!-- TODO (John): confirm which features you built in 2023 and check the GitHub link. -->

## Overview

The Virtual Patient Simulator (VPS) is WDCC's longest-running project. Across six years, more than 60 students worked on it for the University of Auckland's Faculty of Medical and Health Sciences. Educators use it to author branching diagnosis scenarios, and students play through them: they ask questions, order tests and make decisions, with no risk to a real patient.

I joined as a developer in 2023, when the project was still growing its core features. It reached a finished, shippable state in 2026 and went through formal user trials with pharmacy students.

## Working with the faculty

Clinical educators know exactly how a good diagnosis conversation should go, and that's the expertise we were building around. Much of the work was translation: understanding how they teach, which mistakes they want students to make safely, and what they need to see afterwards. Then we turned that into screens and data.

- **Their teaching flow comes first.** The way scenarios branch matches how educators already structure cases, not a generic quiz model.
- **Authoring is as important as playing.** If educators can't build scenarios themselves, the tool doesn't get used, so the editor got the same care as the player.

## What I worked on

- Front-end features for scenario authoring and playback in React.
- Improvements to the UI and UX so scenarios were quicker to build and easier to follow.
- Bug fixes, and small improvements to how scenario data was stored in MongoDB.

![Diagram of the scenario editor: a branching graph of connected scenes with one scene selected, and a side panel listing that scene's dialogue options, each leading to a next scene.](/images/diagrams/vps-scenario-editor.svg "Educators build scenarios as connected scenes, matching how they already structure a case (diagram)")

## Outcome

VPS is now complete and in use, which is rare for a student-built tool. For me it was an early lesson in building for experts in another field: the best features came from listening to how the faculty teach, not from what seemed technically neat.
