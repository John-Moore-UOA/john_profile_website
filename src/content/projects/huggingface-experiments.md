---
title: "Hugging Face & ComfyUI Experiments"
summary: "A playground for open image models: face parsing and segmentation with Hugging Face transformers, and node-based generation pipelines in ComfyUI."
year: 2025
role: "Solo"
categories: ["AI"]
stack: ["Python", "PyTorch", "Hugging Face Transformers", "ComfyUI", "SegFormer"]
order: 9
image: "/images/projects/huggingface-experiments.webp"
---

## Overview

A space for getting hands-on with open models rather than APIs. On one side, face parsing: segmenting a face into regions (skin, eyes, hair) as groundwork for avatar and face-aware work. On the other, ComfyUI graphs combining IP-Adapter, face swapping and style nodes to see how far local image generation can be steered.

## What I took from it

How the Hugging Face ecosystem fits together (processors, models, devices), and that a node graph is a very good way to reason about a generation pipeline before writing code for one.
