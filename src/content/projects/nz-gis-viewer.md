---
title: "NZ 3D GIS Viewer"
summary: "A 3D fly-around viewer for New Zealand built from open GIS data: elevation, DOC tracks and huts, and cities, plus an automatic topo map maker."
year: 2026
role: "Solo developer"
categories: ["Tools", "Systems"]
stack: ["GIS", "Elevation / depth models", "DOC open data", "LINZ data", "3D rendering"]
order: 3.5
image: "/images/projects/nz-gis-viewer/1.webp"
cover: "Snow-capped alpine terrain with a glowing DOC track winding up the valley."
---

<!-- TODO (John): confirm the exact stack (renderer, language) -->

## Overview

New Zealand publishes a huge amount of free geographic data: national elevation and seafloor depth models, every DOC track and hut, roads, buildings and more. The idea was to pull as much of it as I could into one 3D world you can fly around, so you can see a tramping route in the shape of the land it crosses, or a city laid out over its terrain.

![Alpine valleys with DOC tracks highlighted](/images/projects/nz-gis-viewer/1.webp "DOC tracks traced through alpine terrain")

![A city grid with roads and building footprints over terrain](/images/projects/nz-gis-viewer/2.webp "A city built from open road and building footprint data")

![Wide 3D view of the landscape](/images/projects/nz-gis-viewer/3.webp "Flying across the terrain")

![Shaded relief of the South Island](/images/projects/nz-gis-viewer/6.webp "Early elevation work: shaded relief of the South Island")

## Auto topo map maker

Draw a zone anywhere and the viewer produces a printable topographic map of it, with contours generated from the elevation data.

![A drawn zone selected on the map](/images/projects/nz-gis-viewer/5.webp "Drawing a zone to map")

![The generated topo map for the zone](/images/projects/nz-gis-viewer/4.webp "The generated topographic map")

## Next

Slope and aspect map generation, so the same tool can flag avalanche-prone slopes and sun or shade aspects when planning alpine trips.
