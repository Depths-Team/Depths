# Depths User Flow Prototype

This folder contains a low-fidelity, clickable HTML Canvas prototype for the main progression screens in **Depths**.

## Start

Open `index.html` in a browser. Each rectangular button links to the appropriate HTML page.

Every screen uses a `1920 × 1080` canvas with a 16:9 aspect ratio. The canvas scales down responsively while keeping the same proportions.

## Core path

`Main Menu → Briefing → Surface Base → Dive Preparation → Gameplay HUD`

The gameplay screen uses the complete 16:9 canvas and does not assume that a pause screen exists. Two controls outside the canvas simulate confirmed gameplay outcomes:

- `Player Dead → Dive Result → Retry Dive / Return to Base`
- `Boss Defeated → Zone Choice → Return to Base / Go Deeper into Zone 2`

## Files

- `prototype.js`: all canvas drawing and button navigation
- `styles.css`: responsive 16:9 presentation
- One `.html` file per confirmed screen
