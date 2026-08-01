---
name: ProHub Logo Generator
description: A preview-led studio for composing, comparing, and exporting text logos.
colors:
  studio: "#1b1c1a"
  studio-raised: "#242521"
  paper: "#f4f4ed"
  paper-raised: "#ffffff"
  paper-muted: "#e8e8df"
  ink: "#181914"
  ink-muted: "#5f625a"
  line: "#cfcec4"
  line-strong: "#a6a59b"
  accent: "#dc4b36"
  accent-strong: "#b93627"
  accent-soft: "#f9d9d2"
  success: "#167354"
  studio-ink: "#f7f6ef"
  studio-muted: "#a8aaa1"
  field-hover: "#77786f"
  slider-track: "#c5c4bb"
  canvas-shadow: "rgba(0, 0, 0, 0.34)"
  control-shadow: "rgba(105, 30, 21, 0.28)"
  floating-shadow: "rgba(0, 0, 0, 0.22)"
  modal-backdrop: "rgba(9, 10, 9, 0.72)"
typography:
  display:
    fontFamily: "var(--font-geist-sans), Segoe UI, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 850
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "var(--font-geist-sans), Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 850
    lineHeight: 1.2
  body:
    fontFamily: "var(--font-geist-sans), Segoe UI, sans-serif"
    fontSize: "0.875rem"
    lineHeight: 1.45
  label:
    fontFamily: "var(--font-geist-sans), Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 750
    lineHeight: 1.25
  meta:
    fontFamily: "var(--font-geist-mono), monospace"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.2
  micro:
    fontFamily: "var(--font-geist-sans), Segoe UI, sans-serif"
    fontSize: "0.5625rem"
    fontWeight: 700
    lineHeight: 1.1
  compact:
    fontFamily: "var(--font-geist-sans), Segoe UI, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 750
    lineHeight: 1.15
  small:
    fontFamily: "var(--font-geist-sans), Segoe UI, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.35
  subtitle:
    fontFamily: "var(--font-geist-sans), Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 850
    lineHeight: 1.2
  dialog:
    fontFamily: "var(--font-geist-sans), Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 850
    lineHeight: 1.2
  mobile-display:
    fontFamily: "var(--font-geist-sans), Segoe UI, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 850
    lineHeight: 1.12
  logo-output:
    fontFamily: "Arial, sans-serif"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: 1
rounded:
  xs: "2px"
  keyboard: "3px"
  sm: "4px"
  canvas: "2px"
  md: "10px"
  pill: "999px"
spacing:
  compact: "8px"
  control: "14px"
  section: "24px"
  panel: "28px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper-raised}"
    rounded: "{rounded.sm}"
    padding: "0 15px"
  button-secondary:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
  input:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 11px"
  preset-rail:
    backgroundColor: "{colors.studio-raised}"
    textColor: "{colors.studio-ink}"
    rounded: "{rounded.sm}"
    padding: "4px 7px"
---

# Design System: ProHub Logo Generator

## Overview

**Creative North Star: "The Identity Console"**

The product is a focused operating workspace for creating a text mark, not a generic form or a marketing page. A graphite studio field holds the output at working scale while a paper-toned editor provides deliberate contrast for settings. The logo remains the only oversized visual object.

The desktop experience keeps output, preset exploration, history, and editing in one frame. On small screens the canvas stays first, while the brand and 40px command targets move into a compact two-line control bar above the scrolling editor.

**Key Characteristics:**
- A dark production stage against a light editing surface.
- Coral identifies committed actions and the selected state; user-selected logo colors remain independent.
- Preview is live by default and explicitly identifies comparison mode when showing a pre-preset configuration.

## Colors

Graphite and warm paper create the two working planes; coral is narrowly reserved for operational emphasis.

### Primary
- **Signal Coral:** primary export, active preset edge, focus affordances, slider thumbs, and section icons.
- **Pressed Coral:** hover and pressed treatment for a committed action.
- **Soft Coral:** selected size and low-intensity operational backgrounds.

### Secondary
- **Download Green:** successful export state only.

### Neutral
- **Graphite Studio:** application background and preview surround.
- **Raised Studio:** toolbar hover, preview stage, and preset context.
- **Warm Paper:** editor and dialog base.
- **Raised Paper:** fields and ordinary controls.
- **Paper Tint:** modal footer and quiet control surfaces.
- **Ink / Muted Ink:** primary control text and labels.
- **Studio Ink / Studio Muted:** dark-surface labels and dimensional metadata.

**The Output Color Rule.** Interface coral never becomes a second brand palette. The generated mark owns its own color choices.

## Typography

**Display Font:** `var(--font-geist-sans), Segoe UI, sans-serif`.
**Body Font:** `var(--font-geist-sans), Segoe UI, sans-serif`.
**Label/Mono Font:** `var(--font-geist-mono), monospace` for measurements, status, and compact controls.

**Character:** Sans-serif typography stays dense, robust, and utilitarian so it never competes with the mark. The logo renderer continues to use the visitor's chosen output font rather than inheriting interface type.

### Hierarchy
- **Display:** editor title at 850 / 1.625rem; one compact panel title only.
- **Title:** section headings at 850 / 1rem, paired with a 17px Lucide icon.
- **Body:** editable values and dialog copy at 0.875rem.
- **Label:** visible field names and slider values at 750 / 0.75rem.
- **Meta:** measurement and live status at 700 / 0.625rem in the mono face.

**The Mark-First Rule.** No interface heading exceeds the perceived importance of the canvas output.

## Layout

Desktop is a two-column studio: a flexible preview workspace beside a 390-460px editor. The workspace sequences a command rail, an unframed output stage, and a minimal footer. The editor scrolls independently and groups controls through separators, not cards.

At 767px and below, the canvas occupies the first row and the editor becomes the second scrolling row. At 380px and below, the brand and command bar split into two lines so every undo, redo, reset, export, and preset target remains at least 40px. At 360px, field and export option grids stack.

## Elevation & Depth

Depth is structural, not decorative. The canvas carries `0 20px 40px rgba(0, 0, 0, 0.34)`, the editor separates from the studio with `-18px 0 44px rgba(0, 0, 0, 0.18)`, and the modal uses `0 28px 72px rgba(0, 0, 0, 0.35)`. Routine control sections are flat and separated by a single line.

**The Plane Rule.** Elevation belongs to the output, the editor boundary, and interruptions, never to individual settings groups.

## Shapes

Controls use a precise 4px radius. The actual logo canvas uses a 2px crop to preserve the feel of an export surface, while dialogs and floating menus use 10px. Color swatches remain square. Fully rounded shapes are reserved for slider tracks and live-status dots.

## Components

### Buttons
- **Shape:** 36px minimum desktop height with a 4px radius; compact commands use 32px until the 380px breakpoint, where they are 40px.
- **Primary:** coral fill, white text, and a short downward press movement for export or completion.
- **Secondary / Ghost:** raised paper on the editor and transparent studio buttons on the dark rail.
- **Focus:** a 3px soft coral outline with a 2px offset.

### Inputs / Fields
- **Style:** white field, one-pixel structural stroke, 4px radius, and at least 42px height.
- **Focus:** coral stroke and `0 0 0 3px rgba(220, 75, 54, 0.13)`.
- **Disabled:** dark-studio commands recede using Studio Muted, never opacity-only meaning.

### Preset Rail
Thumbnail tiles show a real miniature P/H composition, not a generic color dot. A selected preset receives a coral inset edge. Applying a preset retains the preceding configuration for a non-destructive "对照原方案" preview state; the output status changes to `COMPARE` while export continues to use the current configuration.

### Signature Component: Live Canvas
The live canvas sits in a raised graphite stage with registration-corner geometry. A single 460ms `logo-settle` animation resolves canvas updates through scale, blur, and shadow; reduced-motion users receive the visible final state immediately.

### Export Dialog
The export dialog includes a bounded live preview and remains open after download begins. Its green completion state confirms the selected formats and gives a deliberate completion action instead of disappearing abruptly.

## Do's and Don'ts

### Do:
- **Do** keep the generated logo centered and visually larger than its controls.
- **Do** use Warm Paper for editable settings and Graphite Studio for output context.
- **Do** preserve visible labels for fields, select controls, sliders, color choices, and canvas state.
- **Do** keep the original pre-preset configuration available as a preview-only comparison.

### Don't:
- **Don't** add decorative cards around editor sections.
- **Don't** scatter additional saturated interface colors beside coral and export-success green.
- **Don't** reduce narrow-screen command targets below 40px.
- **Don't** let comparison preview alter the stored configuration or the exported file.
