---
project: "eeg-visualization-multiplayer"
title: "Mood Forest: each player's alpha shapes their half of one shared forest"
date: 2026-11-04
session: "Design spec and first pass"
summary: "I wrote a design for Mood Forest where each player's baseline-normalised alpha score drives half of a forest and replaced the earlier Stain World, keeping all mappings in one settings asset for tuning with an expert."
facets: ["What I built", "Process"]
---

## What I did

On 4 November I wrote two design specs. "Stain World" lets the puzzle player's state spread a biome-coloured liquid from their seat while the observer's emotions are never read. "Mood Forest" replaces it: a score from -1 to 1 per player (0 is their resting baseline) shapes that player's half of a small forest, with a border through the shared table. Neutral is a green forest; one direction goes to autumn, falling leaves and a storm, the other to haze and then a still, misty forest. I then committed a first pass: the DuoLab scene, per-half leaf colour, canopy thinning, regrowth memory, an F1 debug panel and network slots. Stain World was disabled, not deleted.

![The DuoLab scene pushed towards autumn: orange leaves and a dark sky around a player seated at the puzzle table.](/images/eeg-mood-forest-autumn.png "Mood Forest pushed towards autumn")

## Why — decisions and trade-offs

- **Continuous visuals, discrete stages only for labels.** Stages with hysteresis and a dwell time are used for logging and events; the visuals follow the smoothed value directly, so noisy EEG moves the world slowly rather than flickering.
- **Everything tunable in one settings asset.** The spec says the mapping is provisional and will be re-tuned with an EEG expert, so tuning is curve editing rather than code.
- **Assumed meaning of the score.** I assumed it is baseline-normalised alpha power, with less alpha as the storm side and more alpha as the mist side, with a single flag to flip it. It may turn out to be frontal alpha asymmetry, in which case only the labels change. <!-- TODO: verify the final signal definition -->
- **Regrowth memory.** After a storm the leaves regrow as pale spring green instead of replaying autumn backwards, so the forest remembers what happened.
- **Absent player eases to neutral**, rather than freezing or showing mock data.
- **Pure C# core with EditMode tests**, separate from rendering.

## What I learned / what broke

The spec names a risk I had not resolved: thinning the canopy by alpha cutoff might shrink leaf clumps instead of dropping leaves, with a world-space noise dissolve as the fallback. <!-- TODO: John to say which approach shipped -->

## Next

Make the forest itself look right: wind, terrain, sky and weather.
