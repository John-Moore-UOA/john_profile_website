---
title: "Song Sorter"
summary: "A local, Dockerised library for sorting songs by mood, tempo and key, with an AI lyric check that flags lines against rules you write and leaves every decision to a person."
year: 2026
status: "in-progress"
role: "Solo developer"
categories: ["AI", "Tools"]
stack: ["Python", "FastAPI", "SQLite", "Docker", "Ollama", "faster-whisper", "librosa", "yt-dlp"]
featured: false
order: 6.5
cover: "The Song Sorter song page: waveform, mood and tempo controls and time-synced lyrics beside the review tools."
image: "/images/song-sorter.png"
---

## Overview

Song Sorter is a self-hosted app for keeping a large song library organised and reviewable. Paste a Spotify link and it finds the audio, transcribes the lyrics, measures the music (tempo, key, energy), and files the song under a mood and tempo. Everything runs on the home machine: the lyric work uses a local model through Ollama, so nothing about what is being listened to is sent to a cloud service.

The screenshot shows a song page: the waveform with chorus markers, the derived mood and tempo, time-synced lyrics, and the review controls.

## What I built

- **Acquire.** Paste many Spotify links. Each is resolved to a track, YouTube candidates are searched and downloaded, each candidate is transcribed and analysed, and a local model picks the candidate that best matches the track's metadata.
- **Transcribe.** Local speech-to-text (faster-whisper) turns the audio into numbered, time-stamped lyric lines.
- **Analyse.** BPM, key, energy and loudness are measured from the audio. Mood is not "detected": it is derived from those numbers through a small, editable table (slow and quiet reads as Reflective, slow and loud as Anthemic, and so on).
- **Sort and filter.** Songs are grouped into buckets by mood, tempo band, key and duration, and can be put into setlists.
- **Lyric check.** A knowledge base of topics the user writes (each with a stance, a severity, and examples of lines that should and should not be flagged) is sent with the numbered lyrics to the local model, which returns flags pointing at specific lines, with a reason and a confidence. See the section below.
- **Export.** A printable PDF songbook index, grouped by mood, key, tempo, length or alphabet.
- Background job queue with visible progress for the slow steps (download, transcribe, analyse, check).

## A possible use: parental guidance

I built the lyric check for a different job (screening songs against a written set of guidelines), but the shape of it carries over to something a parent might want: a way to review a child's playlist without reading every lyric sheet, and without handing the decision to a rating website.

- **The rules are the parent's.** A topic is plain text plus examples ("references to drug use: flag this line, but not that one"). There is no built-in idea of what is acceptable, so a family sets its own.
- **The model points; a person decides.** The model never blocks a song. It flags lines, and the reviewer accepts, dismisses, or marks a false positive. The system prompt tells it to be conservative, because a wrong flag costs the reviewer's trust.
- **Review teaches the rules.** An accepted flag becomes a "should be flagged" example for that topic and a false positive becomes a "this is fine" example, so the checker improves for that household. A reviewer can also flag a line the model missed.
- **It stays on the home machine.** Lyrics, flags and listening history live in a local database and are judged by a local model.
- **Mood and tempo filters help in the other direction.** The same library can be filtered to calm, slow songs for bedtime or upbeat ones for a car trip.

This is a direction, not a finished feature: the knowledge base and review loop exist, but nothing has been tuned or tested for children's content, and a language model will miss things and over-flag others. It is meant to speed a parent's review, not replace it.

<!-- TODO: verify what the original theology-check use was for and whether to name it on the page -->

## Outcome

A working local app with an acquire, transcribe, analyse and review loop. The folder is not on this machine any more (only the Docker image remains), so no repository link is shown.
<!-- TODO: verify status, whether a repo exists, and any real-world use -->
