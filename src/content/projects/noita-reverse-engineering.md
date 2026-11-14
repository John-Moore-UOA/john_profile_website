---
title: "Reverse Engineering Noita"
summary: "Using the REA toolkit and Ghidra to map Noita's engine, recovering names and source structure to understand how its pixel simulation and Lua modding layer fit together."
year: 2026
role: "Solo investigation"
categories: ["Tools", "Systems"]
stack: ["Ghidra", "REA", "MCP", "Python", "Lua"]
order: 8
image: "/images/projects/noita-reverse-engineering.webp"
---

## Overview

Noita is a game where every pixel is simulated. I wanted to understand how an engine like that is actually organised, so I pointed an AI-assisted reverse-engineering toolkit (REA, not mine) at the game and treated it as a research problem.

## The idea

Rather than reading pseudocode function by function, the goal was to rebuild the map: recover names from RTTI, the Lua API and leftover debug strings, line the release build up against the developer build, and regroup tens of thousands of functions back into something close to the original source tree. Once that skeleton exists, questions about the simulation or the modding layer become searchable.

## What I learned

- Debug builds and assert strings are the richest source of meaning; matching them across builds does most of the naming work.
- Letting an agent drive Ghidra through MCP is great for bulk, mechanical recovery, but a human still has to decide what is worth understanding.
- A game's scripting API is a Rosetta stone: the Lua bindings anchor the rest of the engine.
