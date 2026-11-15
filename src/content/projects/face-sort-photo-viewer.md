---
title: "Face Sorting & Photo Viewer"
summary: "Detect, embed and cluster faces across a personal photo library, with a React/Flask viewer for browsing photos, collections and people."
year: 2025
role: "Solo developer"
categories: ["AI", "Tools"]
stack: ["Python", "YOLO", "ONNX Runtime", "OpenCV", "React", "Flask"]
order: 18
cover: "Faces grouped into one cluster per person, with the photos each person appears in."
image: "/images/face-sort.svg"
imageCredit: "Illustration made for this site"
---

## Overview

The idea was a self-hosted "People" view like the big photo apps, without sending photos anywhere. Faces are detected, cropped into aligned chips, turned into embeddings and compared, so the same person groups together across years of photos. A small React and Flask viewer sits on top for browsing photos, collections and people.

## What I learned

Embedding quality matters far more than clustering cleverness, and normalising face crops is half the battle.
