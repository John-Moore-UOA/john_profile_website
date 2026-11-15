---
title: "ECL Hackathon 2025"
summary: "Empathic coffee coasters that light up when a colleague is having a coffee, backed by a vector-database social graph that nudges people who would enjoy talking to take a break together."
year: 2025
role: "Hackathon team"
categories: ["Tools", "AI"]
stack: ["Vue 3", "Vite", "Python", "Vector database", "ESP32", "LEDs"]
related: ["ecl-website"]
order: 10
cover: "Two coffee coasters glowing together, with a network of lab members above them."
image: "/images/ecl-hackathon.svg"
imageCredit: "Illustration made for this site"
---

## Overview

A lab hackathon project about the small social moments that get lost when everyone is heads-down. We built **empathic coffee coasters**: each person has a coaster at their desk, and when someone puts a fresh coffee down on theirs, the coasters of people the system thinks they would enjoy chatting with glow softly. The idea is a low-pressure invitation to get a coffee and talk, without a message or a meeting invite.

## How it works

- **The coasters.** A small microcontroller with a weight sensor and an LED ring. Putting a full mug down counts as "having a coffee"; the coaster reports it to the server, and it lights up when it receives an invitation.
- **Who gets invited.** Each person has a profile built from their research interests, current projects and availability. These are embedded and stored in a vector database, so the system can find people whose work is close enough to have something to talk about, or different enough to be interesting.
- **A social network that grows.** Every coffee break that actually happens strengthens the link between those people. Over time the system builds a network of who talks to whom, and it gently favours pairs who have not spoken in a while, so the same small groups don't always end up together.
- **Not too often.** Schedules are checked so invitations only go to people who are free, and a cooldown keeps the coasters from becoming a distraction.
- **A web dashboard.** A Vue front end over a Python API shows the network, lets people set their interests and availability, and has a "do not disturb" switch.

## What we learned

Most of the work went into making it feel kind rather than intrusive: a soft glow instead of a notification, no record of who ignored an invitation, and easy ways to opt out. A coaster turned out to be a good interface for this because it is ambient and asks for nothing.
