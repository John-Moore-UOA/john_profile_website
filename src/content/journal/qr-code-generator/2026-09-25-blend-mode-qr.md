---
project: "qr-code-generator"
title: "Blending an image into the QR code with 3x3 sub-pixels"
date: 2026-09-25
session: "Session 1: Build"
summary: "I built a live-preview Flask QR app whose blend mode hides an image in the code by splitting each module into 3x3 sub-pixels, then exposed the same engine as a Claude skill."
facets: ["What I built"]
---

## What I did

The folder is not a git repo; file dates put the work on 25 September. I built a Flask app with a single page that re-renders on every control change. Modes are none, hollow (a cleared square) and blend. Blend splits each covered module into 3x3 sub-pixels: the centre carries the data and the other eight show the image, while finder, timing, alignment and format patterns stay solid. I added colour and gradients, size snapped to whole pixels per module, brightness, fit modes (cover, contain, squish, tile), a knockout for white backgrounds, and an optional zxing-cpp decode check. A `qr-code` Claude skill with `make_qr.py` calls the same `/api/qr` endpoint.

![PLACEHOLDER: screenshot of the app with a blended-logo QR code and the decode-check result](/placeholder.svg "Blend mode in the UI")

## Why — decisions and trade-offs

- **Centre sub-pixel carries the data.** A scanner samples the module centre, so the surrounding pixels are free to show the image. <!-- TODO: verify reasoning -->
- **Structural patterns stay solid** so the code remains detectable.
- **Auto error-correction H with an image,** overridable.
- **Snap size to whole pixels per module** to keep edges crisp.
- **Decode check built in** so scan success is reported, not assumed.
- **Skill calls the app's own API** rather than reimplementing, so Claude and the UI give identical output.

## What I learned / what broke

No failure log exists. Real scan reliability across phones is not recorded. <!-- TODO: verify where the codes were used and scan testing -->

## Next

Test more logos and error-correction levels.
