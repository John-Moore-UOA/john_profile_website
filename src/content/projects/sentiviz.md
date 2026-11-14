---
title: "SentiViz"
summary: "A narrative and sentiment analysis system that turns a story into an explorable 3D landscape: a train journey through emotion-themed environments."
year: 2025
role: "Team member (COMPSCI 715)"
categories: ["AI", "HCI"]
stack: ["FastAPI", "React", "Three.js", "MongoDB", "Python"]
order: 5
image: "/images/projects/sentiviz/1.webp"
---

## Overview

Built for COMPSCI 715. The idea: instead of a sentiment chart, you ride through a story. Text is broken into acts, scenes and events, analysed for sentiment, characters and themes, and the emotional arc becomes terrain, with valleys for lows, peaks for highs and environments that match the mood.

![SentiViz 3D narrative landscape](/images/projects/sentiviz/1.webp "Riding through a story's emotional landscape")

![SentiViz environment view](/images/projects/sentiviz/2.webp "Emotion-themed environments")

![SentiViz terrain view](/images/projects/sentiviz/3.webp "Terrain generated from the emotional arc")

![SentiViz analysis view](/images/projects/sentiviz/4.webp "Story analysis feeding the scene")

![Early 2D SentiViz prototype](/images/projects/sentiviz/5.webp "The early 2D prototype")

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/V2BLQiVeYXM" title="SentiViz demo" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

## What I took from it

Designing the data model (story, act, scene, event) was the real work; the visualisation followed once the structure was right.
