---
project: "live-app-mcp"
title: "Optimistic revisions and a view endpoint make a running app drivable over MCP"
date: 2026-11-12
session: "Pattern extraction"
summary: "I distilled what I built for Voice Studio into a reusable skill: a revision counter with 409 conflicts, view reporting and a stdio MCP server that talks to the app over HTTP."
facets: ["Architecture", "Protocol: how the generated server attaches", "Tools exposed"]
---

## What I did

Neither location is a git repo; `SKILL.md` is dated 12 November, the day of the Voice Studio commit it uses as its reference implementation. The skill defines four server additions (revision counter, `base_rev` concurrency, `/api/view`, action endpoints), UI live sync (poll every 1.5 s, reload and banner when the change is not from the page), and a stdio MCP server using `mcp` 2.x `MCPServer` with batched edit tools, action tools, a variants tool and `notify`. It ends with a verification checklist. The `Claude_Skills` folder holds only an unrelated poster skill.

![Live App MCP architecture: Claude Code talks MCP over stdio to app_mcp.py, which talks HTTP to the app server (state GET/PUT with base_rev, /api/rev, /api/view). The browser UI polls /api/rev every 1.5 seconds and posts /api/view.](/images/diagrams/live-app-mcp.svg "Live App MCP data flow")
## Why — decisions and trade-offs

- **Never write the state file behind a running UI;** it would be overwritten at the next save, so all edits go through the API.
- **Optimistic concurrency (409) over locks.** A stale UI save reloads and tells the user instead of clobbering Claude's edit, and `edit(fn, note)` retries on 409. <!-- TODO: verify reasoning, no alternative recorded -->
- **Separate stdio process that never imports the app,** since the app may hold GPU models.
- **Polling over push.** Simple and robust at the cost of 1 to 2 s latency; WebSockets are not recorded as considered. <!-- TODO: verify reasoning -->
- **View reporting** makes "this" and "the current one" resolvable; tools default targets to the current view.
- **Domain knowledge in server `instructions` and docstrings** so Claude can judge results itself.

## What I learned / what broke

Windows gotchas recorded in the skill: set stdout to UTF-8, avoid patching HTML/JS through bash heredocs (escapes break), and check the port owner before starting a second copy. MCP tools only appear in the next Claude Code session after registration.

## Next

Apply the pattern to other small tools and note which ones used it. <!-- TODO: verify which tools -->
