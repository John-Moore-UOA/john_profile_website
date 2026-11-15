---
title: "Capstone: Networked Device Platform"
summary: "Final-year multidisciplinary capstone: voltage and current sensors on electric carts stream through a filtering layer to a backend, and a React dashboard graphs every cart live, scores the teams and alerts when a cart goes over its class power limit."
year: 2025
role: "Software engineer, team member (SOFTENG 770)"
categories: ["Systems"]
stack: ["React", "Python", "Flask", "Raspberry Pi", "UDP", "WebSockets"]
order: 7
image: "/images/projects/capstone-device-platform/2.webp"
---

## Overview

A final-year capstone run as a small engineering company. Electrical, computer systems and software engineering students worked together on one brief: monitor a fleet of electric carts in real time during a competition, and make sure each team stays within the power limit for its cart class.

Each discipline owned one link in the chain, and the links had to agree on interfaces early so everyone could build in parallel.

![Power monitoring dashboard](/images/projects/capstone-device-platform/2.webp "Live current, voltage and power for a team, checked against its class power limit")

## How it fits together

- **Sensing (electrical team).** A voltage and current sensing board mounted on each cart, measuring the battery and motor draw and passing readings to an on-board Raspberry Pi.
- **Filtering and transport (computer systems team).** The Pi cleans the raw signal (smoothing, outlier rejection and calibration offsets per sensor), computes power, and sends packaged readings over the network. Devices announce themselves on the local network, so a new cart shows up without anyone typing in an IP address.
- **Backend (software team).** A Python service registers carts as they appear, stores the readings, works out scores, checks each cart against the limit for its class, and pushes live updates to the dashboard.
- **Frontend (software team).** A React dashboard for the organisers.

## The dashboard

This was the part I focused on.

- **Fleet view.** Every cart and sensor in one place, with connection status, so organisers can see at a glance which carts are live, stale or offline.
- **Live graphs.** Current, voltage and power for each cart, updating in real time, with the class limit drawn on the power chart.
- **Scoring.** Team scores calculated from the run data and shown as a leaderboard, so judging does not depend on someone reading numbers off a screen.
- **Limit alerts.** Each cart is assigned a class with a power limit. If a cart goes above it, the dashboard raises an alert straight away and logs the breach for the judges to review.
- **Device management.** Assign carts to teams and classes, rename sensors, and check calibration without touching the hardware.

![Capstone hardware and laptops on the lab bench](/images/projects/capstone-device-platform/1.webp "Testing on the lab bench")

## What I took from it

Working across disciplines means the interface between teams matters as much as the code. Agreeing on message formats, units and what "offline" means early saved a lot of pain at integration. I also learned how much of an "IoT" system is really discovery, networking and handling failures gracefully: a sensor dropping out mid-run should show as stale, not as a cart drawing zero power.

## Course

Completed as part of [SOFTENG 770 Capstone Project](/courses/softeng-770/).
