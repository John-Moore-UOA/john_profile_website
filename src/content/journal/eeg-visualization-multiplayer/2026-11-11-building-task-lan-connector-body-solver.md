---
project: "eeg-visualization-multiplayer"
title: "Adding the building task, a LAN connector and a partner stand-in for solo testing"
date: 2026-11-11
session: "Building task and networking"
summary: "I added a block-building task with goals, a LAN connector, a game-state controller and a partner stand-in so one person can test the two-player flow, and revised the player body solver."
facets: ["What I built"]
---

## What I did

The 11 November commit adds a DuoLab building system: a catalog of block shapes and prefabs (including new J and Z pieces), three challenge goals (C1 to C3), materials for furniture and desks, and a build debug server. On the game side there is a game-state controller, a `PartnerStandIn`, a seat manager, and a LAN connector script (`DuoLabLanConnector`) for joining by IP. The physio sources and band-power calculator were adjusted, and the player body solver changed substantially (about 180 lines). Setup editor scripts were added to build the scene state.

![PLACEHOLDER: Screenshot of the DuoLab room: the build table with blocks, a goal shape, and the partner stand-in seated opposite](/placeholder.svg "Building task in DuoLab")

## Why — decisions and trade-offs

- **Direct LAN connector** follows the plan's decision to use IP and port with no Relay or Lobby, because both PCs are in the same room.
- **A stand-in for the partner** so the flow can be developed and tested solo before a second PC exists. <!-- TODO: verify reasoning -->
- **A task for the pair to do**, so the EEG states appear while people are doing something shared. <!-- TODO: verify why this building task was chosen -->
- **Editor setup scripts** so the scene can be rebuilt reproducibly rather than hand-wired. <!-- TODO: verify reasoning -->

## What I learned / what broke

The commit has no message beyond its title, so I cannot tell from the repository what bugs prompted the body-solver changes. <!-- TODO: John to add what was wrong with the body solver -->. I also have no record yet of a test with two real headsets and EEG.

## Next

Test with two PCs, connect the real band-power stream to the forest, and tune the mapping with an expert.
