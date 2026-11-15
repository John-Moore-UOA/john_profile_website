---
project: "song-sorter"
title: "A local lyric review loop where a person makes every call"
date: 2026-08-18
session: "Lyric review"
summary: "I built a Dockerised song library with local transcription, music analysis and a model-assisted lyric check, and kept the final decision with the reviewer."
facets: ["What I built"]
---

## What I did

Over 18 and 19 August I built the app as a FastAPI backend with a SQLite library and a built frontend, packaged in Docker and calling Ollama on the host (`qwen3.5:9b`). The pipeline has five stages. Acquire resolves a pasted Spotify link and downloads YouTube candidates with yt-dlp. Transcribe runs faster-whisper to get numbered, time-stamped lines. Analyse uses librosa for BPM, key (Krumhansl-Schmuckler profiles), energy and loudness, then maps those numbers to a mood and a tempo bucket. Check sends the lyrics with the user's knowledge base to the model and stores the flags it returns. Export writes a PDF songbook index.

![The Song Sorter song page with waveform, mood and tempo controls, and time-synced lyrics.](/images/song-sorter.png "A song under review")

## Why — decisions and trade-offs

- **The model flags, it does not judge.** The prompt calls it an assistant, asks for strict JSON, and says a false flag wastes the reviewer's trust. An empty list is a valid answer.
- **Only flag what the knowledge base covers.** The model is told not to invent concerns, so the rules are the reviewer's and not the model's.
- **Review feeds the rules.** Accepting a flag stores the line as a negative example, and a false positive stores it as a positive one, so calibration improves with use. <!-- TODO: verify reasoning -->
- **Mood is derived, not detected.** An editable table maps tempo and energy to a label, so it is explainable and can be changed.
- **The whole knowledge base goes into one prompt.** With a small knowledge base it fits in a 16k context, so I deferred retrieval until it is needed.
- **Whisper without voice-activity filtering.** The speech filter kept about 7% of a pop track and dropped the rest, so it is off for songs. Turning off conditioning on previous text also stopped it looping on repeated choruses.
- **Local everything.** Transcription, analysis and the model all run on the home machine.

## What I learned / what broke

Running a second process against the SQLite file while the container used it gave a "disk I/O error" at startup, because WAL mode across the Windows bind mount fails. The fix was to checkpoint the WAL and switch the journal mode, and to never run a host server against the live database. Reasoning models also spent their whole output budget thinking, so thinking is turned off for the check.

## Next

Try the check on a real set of rules and measure how many flags reviewers accept, then see whether the same loop works for a parent's own rules.
