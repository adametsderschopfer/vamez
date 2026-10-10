---
name: Vamez
description: An author's engineering monograph.
colors:
  primary: '#254deb'
  page-background: '#e5e5e0'
  surface: '#f4f4f0'
  soft: '#d8d8d3'
  ink: '#141414'
  ink-muted: '#565652'
  line: '#babbb4'
  primary-text: '#fff'
  dark-primary: '#adc0ff'
  dark-page-background: '#171717'
  dark-surface: '#222'
  dark-soft: '#2c2c2a'
  dark-ink: '#f0f0e9'
  dark-ink-muted: '#b0b0a8'
  dark-line: '#474743'
typography:
  display:
    fontFamily: "'Golos Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: 'clamp(3.25rem, 9vw, 8rem)'
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: '-0.04em'
  display-mobile:
    fontFamily: "'Golos Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: 'clamp(2.5rem, 8.7vw, 3.5rem)'
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: '-0.04em'
  headline:
    fontFamily: "'Golos Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: 'clamp(2.5rem, 4.9vw, 4.5rem)'
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: '-0.035em'
  title:
    fontSize: 'clamp(1.25rem, 2.1vw, 1.9rem)'
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: '-0.025em'
  lead:
    fontSize: 'clamp(1rem, 1.4vw, 1.125rem)'
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontSize: '0.875rem'
    fontWeight: 500
rounded:
  square: '0'
spacing:
  compact: '0.5rem'
  regular: '1rem'
  roomy: '1.5rem'
  page-gutter: 'clamp(1.25rem, 4vw, 4rem)'
  section-space: 'clamp(3rem, 7vw, 7rem)'
  grid-gap: 'clamp(1rem, 2vw, 2rem)'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-text}'
    rounded: '{rounded.square}'
    padding: '1rem 1.5rem'
    height: '3.75rem'
  button-primary-hover:
    backgroundColor: 'color-mix(in srgb, var(--card-accent) 85%, var(--ink))'
  site-control:
    textColor: '{colors.ink}'
    rounded: '{rounded.square}'
    padding: '0'
    size: '2.75rem'
  navigation:
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    height: '2.75rem'
  contact-row:
    textColor: '{colors.ink}'
    padding: '1.25rem 0'
    height: '4.75rem'
  archive-filter:
    textColor: '{colors.ink}'
    rounded: '{rounded.square}'
    padding: '0.65rem 1rem'
    height: '2.75rem'
  archive-filter-selected:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-text}'
  archive-row:
    textColor: '{colors.ink}'
    rounded: '{rounded.square}'
    padding: 'clamp(1.5rem, 2.5vw, 2rem) 1rem'
  article-tag:
    backgroundColor: '{colors.soft}'
    textColor: '{colors.ink}'
    rounded: '{rounded.square}'
    padding: '0.45rem 0.7rem'
---

# Design System: Vamez

## Overview

**Creative North Star: "The Engineering Monograph"**

Vamez gives an author and engineer a direct, material presence. Concrete gray, dense black typography and a cobalt action create the character of a pragmatic engineering publication. Scale, whitespace and thin rules carry the composition.

The system is brutal, beautiful, simple and pragmatic. Surfaces remain open; typography establishes hierarchy. Content appears immediately, and controls express their purpose without decoration.

**Key Characteristics:**

- Heavy Cyrillic and Latin typography from one family.
- Open sections with thin functional separators.
- Square controls and a restrained cobalt accent.
- Responsive columns that become a clear reading sequence.
- Immediate theme changes and visible keyboard focus.

## Colors

The light palette combines concrete, paper and ink; the dark palette reverses contrast while retaining the same functional hierarchy. The frontmatter records exact source values.

### Primary

- **Cobalt:** primary contact action, brand punctuation, selected archive filters and interactive feedback.
- **Pale cobalt:** dark-theme replacement for the accent; its foreground changes to ink.

### Neutral

- **Concrete:** page background; **paper:** archive hover, article and error surfaces.
- **Soft concrete:** control hover and article tags.
- **Ink:** primary type; **muted ink:** supporting copy and metadata; **rule:** section and row separators.
- **White:** light-theme primary action text. Dark-theme primary text uses the light palette's ink token.
- Dark neutral counterparts map to the same CSS roles through `data-theme='dark'`.

**The Action Color Rule.** Accent color marks interaction and feedback; it does not become a decorative section background.

## Typography

**Display Font:** Golos Text, with the system sans-serif fallback recorded above.
**Body Font:** the same Golos Text family. Cyrillic and Latin variable fonts are self-hosted, covering weights 400–900; the license is in `app/assets/fonts/OFL.txt`.

The family is industrial and compact. Display headings use heavy weight and tight tracking; supporting copy uses ordinary mixed case and generous line spacing.

### Hierarchy

- **Display:** the home headline; use `display-mobile` at the 600px breakpoint.
- **Headline:** the approach section. Other major headings deliberately vary with their content: project strip `clamp(3rem, 6.5vw, 5.5rem)` at weight 700, contact `clamp(2.4rem, 4.4vw, 4.8rem)` at weight 700.
- **Title:** names in the capability list.
- **Lead:** introductory copy, normally limited to 42ch; the mobile hero uses 38ch.
- **Body:** capability explanations, limited to 40ch. Longer introductory paragraphs use line-height 1.65.
- **Label:** navigation. Controls use 0.75rem at weight 600; contact details use 0.875rem with line-height 1.4.

**The Single Family Rule.** Typography gains contrast through scale and weight within Golos Text rather than through extra display faces.

## Layout

The centered page has a maximum width of 88rem, including fluid horizontal gutters. Section space and ordinary gaps use the shared variables recorded above. Paragraph widths are constrained independently of the page width.

The home hero places identity, introduction and contact action in three columns. It becomes two columns at 900px and one at 600px. Approach, project strip and contact use an asymmetric 1.2fr/1fr division; approach and strip stack at 760px, contact at 900px. Header section links disappear at 600px while language and theme controls remain accessible.

Archive years use a narrow date column and a broad ruled list. At 900px the year becomes a normal heading above the list; at 560px category and arrow precede the project text. Filters wrap. The article overlay is bounded by page gutters and a maximum width of 49rem; its two-column reading layout stacks at 600px.

Keep page sections in separate components. Use scoped BEM-lite classes, shallow selectors and shared CSS variables for recurring dimensions.

## Elevation & Depth

There are no shadows in the active visual system. Thin rules, whitespace and flat tonal changes separate content. The development article overlay uses a fixed ink backdrop (`rgba(20, 20, 20, 0.7)`), without blur or a shadow.

**The Open Surface Rule.** Present content as open sections and ruled rows. Reserve filled neutral surfaces for temporary reading content, error content and interaction states.

## Shapes

Controls, tags, article surfaces and error surfaces have square corners. Borders are single-pixel functional rules. The brand favicon is a geometric V within a cobalt square. Interface arrows, theme symbols and copy affordances are SVG icons rather than text glyphs.

## Components

### Primary action

A square, solid action with a 3.75rem minimum height and balanced text/arrow spacing. Hover mixes the accent with ink; keyboard focus retains the global 2px current-color outline with a 5px offset. Contact navigation uses a real section anchor.

### Navigation and site controls

Navigation is ordinary mixed-case text with an underline on hover. The paired language and theme controls have 2.75rem targets, a one-pixel enclosing border and divider, and a soft neutral hover background. Theme changes are immediate. Preserve locale and theme cookies.

### Contact rows

An open list bounded by horizontal rules. Rows have a 4.75rem minimum height and 1.25rem vertical padding. The channel name is primary; the destination is muted and can wrap anywhere. Hover and focus turn the primary row content cobalt. Email copy feedback appears inline and is announced through a polite status region.

### Archive filters and rows

Filters are square outlined buttons with 2.75rem minimum targets and an accent-filled selected state. Project rows have no enclosing card; a neutral hover surface and accent title/arrow indicate action. Article technology tags are small, square, neutral labels.

### Article reading overlay

Development-only article content uses a square paper surface, a plain ink backdrop, a close button and scrollable content. Opening lasts 280ms with `cubic-bezier(0.22, 1, 0.36, 1)`; closing lasts 180ms with `cubic-bezier(0.4, 0, 1, 1)`. Reduced-motion users receive immediate changes. This overlay belongs to article reading, not contact navigation.

## Do's and Don'ts

### Do:

- **Do** use Golos Text, the shared palette and square geometry.
- **Do** let scale, whitespace and thin rules explain hierarchy.
- **Do** preserve readable Russian and English wrapping at small widths.
- **Do** keep keyboard focus, semantic landmarks and real anchor destinations.
- **Do** use motion only for functional navigation or article state changes, respecting reduced motion.

### Don't:

- **Don't** wrap ordinary content in decorative cards or grids.
- **Don't** add rounded controls, shadows or ornamental section backgrounds.
- **Don't** add typing effects, delayed reveals or decorative entrance animation.
- **Don't** turn contact navigation into a modal.
- **Don't** invent projects, achievements or client claims to fill the layout.

Source of truth: `app/assets/css/main.css`, mounted home/archive components and `app/error.vue`. Archive examples are available only in development; the public site presents a preparation notice. Component height tokens describe minimum target heights where the source uses `min-height`. Sidecar tonal ramps are generated preview metadata, not additional application tokens. Asset provenance is recorded in `docs/social-assets.md`.
