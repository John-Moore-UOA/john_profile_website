---
project: "masters-empathic-avatar"
title: "The slow loop only proposes; one switch moves it to the cloud"
date: 2026-10-29
session: "Week 10 (part 3)"
summary: "I settled that only the fast loop speaks and the slow loop proposes help strategies, and added a toggle that runs the slow loop on a local 2B model or on cloud Gemini."
facets: ["System architecture", "Conversational logic"]
---

## What I did

Planned the fast/slow role split on 27 October, then on 29 October added a Gemini Vertex backend (request mapping with self-tests, a cached access token), a `SlowModelSwitch` that toggles local vLLM in Docker versus cloud and starts or stops the container, a 20 s floor for cloud requests, and a docs page. I also changed the Qwen models used.

![Diagram: a slow-loop request passes through the SlowModelSwitch, which routes it either to a local vLLM model in Docker (starting or stopping the container) or to Gemini on Vertex in the cloud, with a cached access token and a 20 second floor between requests.](/images/diagrams/masters-slow-switch.svg "The slow model toggle (diagram)")

## Why — decisions and trade-offs

- **Only the fast loop speaks.** The slow loop thinks about what the participant is doing and writes a proposal (including which help strategy suits them); the fast loop owns turn-taking and cooldowns. Before this, there were two separate help pipelines that only coordinated through a timestamp.
- **One 0-1 "need help" belief** fused in code, instead of a sum of module pressures that could exceed 1.
- **The slow loop can never slow the fast loop.** In one session a stuck slow request held the only model slot for 2 min 40 s and every reply timed out.
- **A local/cloud switch** so I can compare a small local model against a stronger cloud model without rewriting the brain. Cloud mode never starts the local model. <!-- TODO: John to add why Gemini was picked and whether latency or quality drove it -->
- **Provider quirks handled in the backend:** the cloud model rejects the minimal thinking level and counts thinking tokens against the output limit, so requests add headroom.

## What I learned / what broke

A cloud slow request was being cancelled by push-to-talk, which I fixed on 1 November.

## Next

Work through the dialogue problems seen in the latest log.
