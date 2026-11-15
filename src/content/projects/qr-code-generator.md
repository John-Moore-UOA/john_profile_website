---
title: "QR Code Generator"
summary: "A Flask web app for stylised, still-scannable QR codes with hollow or dithered image blending and gradients, also packaged as a Claude skill."
year: 2026
status: "complete"
role: "Solo developer"
categories: ["Tools"]
stack: ["Python", "Flask", "JavaScript", "zxing-cpp"]
featured: false
order: 19
cover: "A blended-logo QR code beside the generator UI."
image: "/images/qr-code-generator.jpg"
---

## Overview

A small single-page Flask app where every control change updates the QR preview live.

## What I built

- Image modes: none, hollow (cleared square), and blend, where each covered module is split into 3x3 sub-pixels: the centre carries data and the other eight show the image, while finder, timing and alignment patterns stay solid.
- Colour, gradients, size snapped to whole pixels per module, brightness and fit controls.
- Optional decode check (zxing-cpp) that reports whether the result actually scans.
- A Claude Code skill (`qr-code`) that calls the same `/api/qr` engine, so asking Claude for a QR code with a logo gives identical output.

![The QR generator in the browser with live controls beside the preview.](/images/qr-ui.png "The generator UI")

![A QR code with the Empathic Computing Lab logo blended into it.](/images/qr-blend.png "A blended-logo code that still scans")

## Outcome

Working tool.
<!-- TODO: verify where the codes were used (posters, etc.) -->
