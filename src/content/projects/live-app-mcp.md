---
title: "Live App MCP"
summary: "A Claude skill that wraps any running local app in a generated MCP server so Claude can read and drive the live UI, used for rapid tool prototyping."
year: 2026
status: "complete"
role: "Solo developer"
categories: ["AI", "Systems", "Tools"]
stack: ["MCP", "Python", "HTTP/REST", "Claude Code skills", "JavaScript"]
featured: false
order: 13
related: ["tts-studio"]
cover: "Illustration: Claude Code sends a command over MCP and the open app changes."
image: "/images/live-app-mcp.svg"
imageCredit: "Illustration made for this site"
---

## Overview

Live App MCP is a Claude Code skill: a recipe plus conventions that make an app Claude-controllable while it keeps running. The user says "do X to what I'm looking at" and Claude changes the open UI within about 1-2 seconds, with a banner saying what it did. I use it for rapid prototyping of small tools, for example Voice Studio ([TTS Studio](/projects/tts-studio)), where Claude tunes voices live while I listen.

## Architecture

![Live App MCP architecture: Claude Code talks MCP over stdio to app_mcp.py, which talks HTTP to the app server (state GET/PUT with base_rev, /api/rev, /api/view). The browser UI polls /api/rev every 1.5 seconds and posts /api/view.](/images/diagrams/live-app-mcp.svg "Live App MCP architecture")
The MCP server is a separate stdio process (`mcp` 2.x `MCPServer`). It never imports the app (which may hold GPU models); it only talks to the app's HTTP API. Claude Code launches it after a one-time `claude mcp add` at user scope.

## Protocol: how the generated server attaches

The skill adds four small things to the target app's server:

1. **Revision counter**: bumped on every save; `GET /api/rev` returns `{n, by, note}`.
2. **Optimistic concurrency**: saves carry `base_rev`; a stale write gets HTTP 409. Saves also carry `by` (page or claude) and a human-readable `note`.
3. **View reporting**: the UI posts what is on screen (tab, selected item, cursor, selection) to `/api/view`, so "this" and "current" resolve to something concrete.
4. **Action endpoints** for anything that previously existed only as a UI button.

On the UI side it keeps its own revision, polls `/api/rev`, reloads state when the revision changes and `by` is not the page, and shows a dismissable banner with the note. A 409 triggers a reload and a message instead of overwriting Claude's edit.

## Tools exposed

Generated per app, but the shape is consistent:

- `get_view`: current screen context.
- Read tools with full detail, including quality metrics.
- Batched edit tools (many changes in one save) built on a single `edit(fn, note)` helper: GET rev, GET state, mutate, PUT with `base_rev`, retry on 409.
- Action tools (render, generate, export) that return metrics.
- An audition/variants tool plus a `choose_*` tool.
- `notify(message)` to talk to the user inside the UI.

Tools default their target to the current view. Domain knowledge (what parameters mean, what a good result looks like) goes in the server `instructions` and tool docstrings, so Claude can judge results itself.

## Process

The skill's workflow is: survey the app, patch the server, patch the UI, write the MCP server, register it, then verify (restart, hit `/api/rev` and `/api/view`, make one visible test edit and have the user confirm the banner). A per-app skill is written afterwards for future sessions.

## Outcome

Used to build the Voice Studio control layer and as the pattern for other small tools.
<!-- TODO: verify which other tools used this pattern; add iteration-speed claims only if measured -->
