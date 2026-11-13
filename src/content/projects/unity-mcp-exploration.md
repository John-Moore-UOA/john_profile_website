---
title: "Unity MCP Exploration"
summary: "Exploring MCP for Unity, an open-source bridge that lets AI agents drive the Unity Editor, and extending it with runtime C# compilation."
year: 2026
role: "Investigation and extension"
categories: ["AI", "XR", "Tools"]
stack: ["Unity", "C#", "MCP", "Roslyn", "Python"]
related: ["live-app-mcp"]
order: 15
---

## Overview

Most of my research projects are in Unity, so I wanted Claude working inside the Editor rather than only in text files. I investigated the open-source MCP for Unity bridge (not mine) to see how it maps editor actions to tools, then experimented with a custom tool that compiles and runs C# at runtime via Roslyn, so an agent can try code in a live scene.

## What I learned

How agent-to-editor bridges are structured. The ideas fed directly into my own [Live App MCP](/projects/live-app-mcp) pattern.
