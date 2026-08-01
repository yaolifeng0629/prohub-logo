# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Inferred from the current product documentation: people who need a simple, no-registration browser tool to create a text-based logo and export it for web or print use.

## Product Purpose

ProHub Logo Generator lets a visitor compose a two-part text logo, preview changes immediately, and download the result in one or more image formats. Success is a usable logo file without an account or a separate design application.

## Positioning

The product keeps the logo workflow in a single browser surface: text, font, color, dimensions, presets, preview, and export are available together with no sign-up step.

## Operating Context

The editor is used as a focused, short task. Visitors change text and visual settings, compare the canvas preview, then export PNG, JPG, SVG, or WebP. Keyboard shortcuts support undo, redo, and quick PNG export on desktop-class devices.

## Capabilities and Constraints

- Two text fields with a ten-character limit each.
- Font family, weight, size, spacing, corner radius, colors, transparent PNG background, preset sizes, and custom dimensions.
- Real-time canvas preview, undo/redo history, preset styles, and reset.
- Batch export for PNG, JPG, SVG, and WebP; PNG can preserve a transparent background.
- The current implementation is entirely client-side. It has no account flow, saved projects, collaboration, or remote asset library.

## Brand Commitments

- The product name is ProHub Logo Generator.
- Existing product copy is Chinese-first and the document language follows that interface.
- The generated logo remains the visual focal point; surrounding controls must not compete with the canvas.

## Evidence on Hand

- Product capabilities and export formats: `README.md`.
- Current user interface and visual tokens: `src/app/page.tsx`, `src/app/globals.css`, and `src/components/`.
- Logo preview and export renderer: `src/lib/logo-renderer.ts`.
- No customer testimonials, usage metrics, pricing, or brand assets beyond the existing local public files are represented in the repository.

## Product Principles

- Keep editing and export immediate and local.
- Preserve a clear separation between the generated logo and the editing interface.
- Make each active control legible without requiring a tutorial.
- Preserve output quality and format flexibility over decorative interface treatment.
