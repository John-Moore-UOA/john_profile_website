---
title: "YouTube Channel LLM Augmenter"
summary: "Pull a channel's audio, segment and transcribe it locally, and build a corpus an LLM can draw on to answer with that creator's knowledge."
year: 2025
role: "Solo"
categories: ["AI", "Tools"]
stack: ["Python", "yt-dlp", "Whisper", "Hugging Face Transformers"]
order: 20
cover: "A video becomes audio, then a transcript, which an LLM uses to answer questions."
image: "/images/youtube-augmenter.svg"
imageCredit: "Illustration made for this site"
---

## Overview

The idea was to give an LLM the knowledge of a specific YouTube channel. Audio is downloaded, split on silence, transcribed with a local speech model, and gathered into a corpus ready for retrieval.

## What I took from it

Speech-to-text is now good enough that the hard part is data hygiene: chunking, normalising audio and keeping track of where every line came from.
