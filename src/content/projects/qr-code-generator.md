---
title: "QR Code Generator"
summary: "A Flask web app for stylised, still-scannable QR codes with hollow or dithered image blending and gradients, also packaged as a Claude skill."
year: 2026
status: "complete"
role: "Solo developer"
categories: ["Tools"]
stack: ["Python", "Flask", "JavaScript", "zxing-cpp"]
featured: false
order: 80
cover: "A QR code with a logo blended into it, next to the live-preview controls."
---

## Overview

A small single-page Flask app where every control change updates the QR preview live.

## What I built

- Image modes: none, hollow (cleared square), and blend, where each covered module is split into 3x3 sub-pixels: the centre carries data and the other eight show the image, while finder, timing and alignment patterns stay solid.
- Colour, gradients, size snapped to whole pixels per module, brightness and fit controls.
- Optional decode check (zxing-cpp) that reports whether the result actually scans.
- A Claude Code skill (`qr-code`) that calls the same `/api/qr` engine, so asking Claude for a QR code with a logo gives identical output.

![PLACEHOLDER: screenshot of the app with a blended-logo QR code](/placeholder.svg "QR generator UI")

## Outcome

Working tool.
<!-- TODO: verify where the codes were used (posters, etc.) -->
