# Chat 002 Ñ Design Revision: Video Hero + Editorial Layout
## Letterpressed / vintageprinting.eu
**Date:** 15 April 2026
**Participants:** Siso (Isidoros Kolotas), Claude (Cowork)
**Session type:** Design revision based on Katerina's reference sites

---

## Reference Sites Studied

1. **www.papira.ro** Ñ Romanian letterpress studio
   - Oversized full-width serif headlines
   - Justified body text (editorial feel)
   - Clean 2-column product grid (papira style)
   - Ultra-minimal centred footer with image above
   - SALE / OUT OF STOCK circular badge overlays on products

2. **www.fjoravenue.com** Ñ Brand design studio
   - Full-bleed video hero, muted/atmospheric, minimal centred CTA button
   - Editorial split-panel rows: image | text stacked vertically
   - Beige/cream throughout, black & white photography
   - Very restrained typography Ñ small labels, generous whitespace

---

## Changes Made

### Hero (major change)
- Replaced CSS background-image hero with `<video>` element
- `autoplay muted loop playsinline`
- Poster image (`images/hero-press.jpg`) shows until video file is added
- Video source: `images/hero-video.mp4` Ñ Katerina to drop file in when ready
- Removed heavy text overlay Ñ now just location byline + single centred CTA button
- Scroll indicator moved to bottom centre

### Typographic Statement (new section)
- Full-width oversized serif headline between hero and about
- 'Letterpress / Printing' in Cormorant Garamond at ~11rem desktop
- Italic gold 'Printing'
- Location byline in small caps below

### About Section (major restructure)
- Replaced card/grid layout with 4 editorial split-panel rows
- Row 1: Katerina portrait | Studio story text
- Row 2: Work-in-progress image | 'Pressed by Hand' craft text (reversed)
- Row 3: Nebiolo press photo | Nebiolo history (left/right)
- Row 4: Harry press photo | Harry history (reversed)
- All images marked PLACEHOLDER with HTML comments
- Hover: subtle image zoom on each row

### Services (updated style)
- Numbered 01Ð04 with large ghost numbers in gold/faint
- Grid with internal borders (charcoal dark background kept)
- Left-aligned text (not justified) for readability on dark bg

### Footer (major change)
- Added full-width image above footer body (papira.ro style)
- Footer body: fully centred, two nav rows (main nav + secondary info)
- Stripped back to minimal Ñ no columns, no social icons block

### CSS Changes
- `p { text-align: justify }` Ñ all body text justified
- `ed-meta`, `gallery__intro`, `contact__lead` forced left-align override
- Editorial row responsive: stacks to single column on mobile
- Video fallback: `hero__video-fallback` shows hero-press.jpg if no .mp4

---

## What Katerina Needs to Provide

| Asset | Where it goes | Notes |
|---|---|---|
| Studio/press video | `images/hero-video.mp4` | Any length, landscape, ideally press in action |
| Studio atmosphere shot | Row 1 image (currently katerina.jpg) | Portrait or atmosphere |
| Close-up of printing | Row 2 image (currently hero-wedding.jpg) | Ink, paper, hands at press |
| Nebiolo hero photo | `images/press-nebiolo.jpg` | Already there Ñ confirm |
| Harry hero photo | `images/press-harry.jpg` | Already there Ñ confirm |
| Footer feature image | `images/gallery-17.jpg` (placeholder) | Beautiful product/studio close-up |

---

## Outstanding (carried from Chat 001)
- [ ] Snipcart API key
- [ ] Formspree form setup
- [ ] Exact Google Maps embed
- [ ] FTP upload to Hostinger
- [ ] SSL on Hostinger
- [ ] Confirm Instagram handle

---

*Next chat: Review with Katerina, then Hostinger deployment*
