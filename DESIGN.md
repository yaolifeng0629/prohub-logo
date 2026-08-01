---
name: ProHub Logo Generator
description: A focused browser workspace for composing and exporting text-based logos.
colors:
  canvas: "#f3f6fb"
  surface: "#ffffff"
  surface-muted: "#f8fafc"
  ink: "#172033"
  ink-muted: "#5d6b82"
  line: "#d9e1ee"
  line-strong: "#c1ccdd"
  accent: "#2563eb"
  accent-strong: "#1d4ed8"
  accent-soft: "#e8efff"
typography:
  title:
    fontFamily: "var(--font-geist-sans), Segoe UI, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.25
  body:
    fontFamily: "var(--font-geist-sans), Segoe UI, sans-serif"
    fontSize: "0.875rem"
    lineHeight: 1.55
  label:
    fontFamily: "var(--font-geist-sans), Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.25
rounded:
  sm: "6px"
  md: "8px"
spacing:
  compact: "8px"
  control: "12px"
  section: "20px"
  panel: "28px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
  button-secondary:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 10px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 11px"
---

# Design System: ProHub Logo Generator

## Overview

**Creative North Star: "The Quiet Marking Desk"**

This is an operating workspace, not a marketing page. The logo canvas owns the visual center; the editor remains precise, calm, and visibly responsive to change. Strong blue is reserved for an active action or selected value, leaving the user-created logo free to establish its own color identity.

The desktop interface keeps preview and editing visible together. On mobile, the preview stays complete above a compact command row while the controls become the scrollable work area.

**Key Characteristics:**
- A single visual focal point: the generated mark.
- Quiet neutral surfaces with a narrowly used operational accent.
- Compact controls with readable labels and complete keyboard focus states.

## Colors

Cool white and pale blue-gray surfaces keep the application receding behind the logo, while blue identifies the actionable state.

### Primary
- **Operational Blue:** the primary action, selected values, and focus affordances.
- **Deep Operational Blue:** hover and pressed emphasis for the primary action.

### Neutral
- **Workspace Canvas:** the preview surround and application background.
- **Clean Surface:** editor, toolbar, and modal base.
- **Quiet Surface:** inactive segmented controls and modal footer.
- **Ink:** headings and active control text.
- **Muted Ink:** labels, helper text, and dimensions.
- **Structural Line:** panel and section separation.

**The One Accent Rule.** Use blue to identify the current action or selection, never to compete with the user-created logo.

## Typography

**Display Font:** none. This product has no display role because the generated logo is the focal artifact.

**Body Font:** `var(--font-geist-sans), Segoe UI, sans-serif`.

**Character:** Compact, high-contrast, and practical. Weight and proximity establish hierarchy rather than decorative type styling.

### Hierarchy
- **Title:** the product name and major control groups.
- **Body:** concise control context and modal explanations.
- **Label:** field names, slider values, and metadata.

**The Generated Mark Rule.** Never introduce interface typography that visually outranks the logo preview.

## Layout

Desktop uses a two-column editor: a flexible preview workspace and a 392-460px control column. The workspace is divided into command bar, centered canvas, and low-priority footer. Control groups use deliberate section borders and 20-28px internal spacing rather than nested cards.

At 767px and below, the application becomes a two-row workspace: the preview and command bar stay together above a scrollable editor. At 360px and below, field grids stack and preview padding contracts so the default 256px canvas remains whole.

## Elevation & Depth

The system is flat by default. The only lifted object is the logo canvas or modal, where a soft vertical shadow establishes its working plane. Section boundaries use a line rather than a duplicate shadow.

**The Canvas Plane Rule.** Elevation is reserved for the visual output and interruption states, never routine settings groups.

## Shapes

Controls use gently curved edges: 6px for buttons and fields, 8px for modal and canvas framing. Color swatches are square controls with a small 6px radius. Pills are reserved for slider tracks only.

## Components

### Buttons
- **Shape:** compactly rounded (6px) with at least a 36px interactive height.
- **Primary:** blue fill for export and a selected state.
- **Hover / Focus:** border or background shifts on hover; a three-pixel blue focus ring for keyboard navigation.
- **Secondary / Ghost:** white or quiet-surface backgrounds for reset, presets, and cancellation.

### Inputs / Fields
- **Style:** white field with a one-pixel structural border and a 6px radius.
- **Focus:** blue border and an offset soft focus ring.
- **Error / Disabled:** disabled icon controls use muted ink; no error state is currently exposed by the product.

### Signature Component: Logo Canvas

The logo canvas is centered in the workspace with a restrained shadow and clips to its 8px frame. It scales to the available preview space without being cropped on narrow devices.

## Do's and Don'ts

### Do:
- **Do** keep the logo preview as the first visual priority at every viewport.
- **Do** use the shared tokens and 6px/8px shape scale for new controls.
- **Do** preserve visible labels for text fields, selects, sliders, and color controls.

### Don't:
- **Don't** add decorative cards around each control group.
- **Don't** use multiple bright interface accents beside a user-configurable logo.
- **Don't** rely on hover or color alone to express an action or selected state.
