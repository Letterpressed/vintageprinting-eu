# Chat 001 — Site Build
## Letterpressed / vintageprinting.eu
**Date:** 15 April 2026
**Participants:** Siso (Isidoros Kolotas), Claude (Cowork)
**Session type:** Build session — new website from scratch

---

## Brief Summary

Siso commissioned a complete new website for Katerina's letterpress studio to replace the existing WordPress site. Full build completed in one session.

---

## Key Decisions Made

- **Stack confirmed:** Custom HTML/CSS/JS + Decap CMS + Snipcart + Hostinger
- **Design direction:** Cream/charcoal/gold palette. Cormorant Garamond + Jost. Minimal luxury feel.
- **Single-page site** (all sections on index.html — simpler for Hostinger, no routing needed)
- **Gallery:** 21 images pulled from the 2018–2025 WordPress archive (257 originals on Desktop/uploads/)
- **Logos found:** `NEW-LOGO-FINAL-copy.png`, `letterpresselogoblack.png`, `letterpresselogowhite.png` — all in 2018/11/
- **Press photos:** `nebiolo.jpg` and `nebiolo2.jpg` (2018/12/), `IMG_4514.jpg` used for Harry
- **Katerina portrait:** `kat-2.jpg` (2018/12/)
- **Hero background:** `IMG_4509.jpg` (press at work, 2019/11/)
- **Snipcart API key:** NOT yet added — placeholder `YOUR_SNIPCART_PUBLIC_API_KEY` in index.html
- **Contact form:** Currently uses mailto: fallback — Formspree recommended for proper form handling
- **Instagram handle:** `@letterpressed_cy` — placeholder, to be confirmed by Katerina
- **Google Maps embed:** Approximate coordinates — needs exact embed from maps.google.com
- **Decap CMS:** Config written for Git Gateway backend. For Hostinger-only, local editing or Sveltia CMS recommended.

---

## Files Built

| File | Notes |
|---|---|
| `index.html` | 599 lines — complete single-page site |
| `style.css` | 727 lines — full responsive stylesheet |
| `admin/index.html` | Decap CMS interface |
| `admin/config.yml` | CMS collections: settings, hero, about, gallery, shop, services |
| `images/` | 30 images selected and renamed |
| `README.md` | Full deployment guide for Hostinger FTP |

**Project location:**
`/Users/sisos/Library/Mobile Documents/com~apple~CloudDocs/ConsuloOS_Native/Projects/VintagePrinting/`

---

## Image Inventory (selected from uploads)

| Filename | Source | Use |
|---|---|---|
| logo-black.png | 2018/11/NEW-LOGO-FINAL-copy.png | Main logo |
| logo-white.png | 2018/11/letterpresselogowhite.png | Light bg logo |
| logo-black-alt.png | 2018/11/letterpresselogoblack.png | Alt logo |
| press-nebiolo.jpg | 2018/12/nebiolo.jpg | Press card |
| press-nebiolo-2.jpg | 2018/12/nebiolo2.jpg | Spare |
| press-harry.jpg | 2019/11/IMG_4514.jpg | Press card |
| katerina.jpg | 2018/12/kat-2.jpg | About section |
| hero-press.jpg | 2019/11/IMG_4509.jpg | Hero background |
| hero-wedding.jpg | 2019/11/Happily-Ever-After.jpg | Spare hero |
| gallery-01..08 | 2018/12/letter-photo-495x400-1..8.jpg | Classic portfolio |
| gallery-09..12 | 2022/10/ | Recent work |
| gallery-13..15 | 2023/11/ | Recent work |
| gallery-16 | 2024/02/IMG_8152.jpg | Recent work |
| gallery-17..18 | 2024/10/ | Recent work |
| gallery-19..21 | 2025/10/ | Latest work |

---

## Shop Products (placeholder, ready for Snipcart)

| Product | ID | Price |
|---|---|---|
| Letterpress Art Print | art-print-01 | €35 |
| Thank-You Card Set (10) | thankyou-cards-10 | €55 |
| Gift Tag Set (6) | gift-tags-6 | €18 |

---

## Outstanding Actions (next sessions)

- [ ] **Snipcart account** — create at snipcart.com, get API key, insert into index.html
- [ ] **Formspree form** — set up at formspree.io, replace mailto: handler in index.html
- [ ] **Google Maps** — get exact embed for Salaminos 29, Limassol
- [ ] **Confirm Instagram handle** with Katerina
- [ ] **SSL on Hostinger** — enable Let's Encrypt via hPanel
- [ ] **FTP upload** to Hostinger public_html/ (FileZilla)
- [ ] **Review gallery** — Katerina to select/curate final 21 images
- [ ] **Snipcart products** — Katerina to confirm product list, prices, descriptions
- [ ] **Review copy** — especially About section paragraphs
- [ ] **Press Harry photo** — current image (IMG_4514) may not be Harry specifically — verify with Katerina
- [ ] **Logo** — confirm NEW-LOGO-FINAL-copy.png is the current logo version
- [ ] **Domain/DNS** — confirm vintageprinting.eu points to Hostinger (may need DNS update)

---

## Technical Notes for Future Sessions

- Images at `/Users/sisos/Desktop/uploads/` — full 257-image archive organised by year/month
- Always use `osascript` for Mac Mini file ops — never Bash tool
- Use `quoted form of` in AppleScript for paths with spaces
- Project syncs via iCloud Drive automatically
- No WordPress dependency in new build — clean HTML only

---

## Contact & Business Details (confirmed)

- **Brand:** Letterpressed (trading as vintageprinting.eu)
- **Address:** Salaminos 29, Limassol 3036, Cyprus
- **Phone:** +357 25 350 303
- **Email:** info@vintageprinting.eu
- **Hours:** Mon–Fri 9:00–13:00, by appointment
- **Founded:** 2012
- **Owner:** Katerina Papaphilotheou (graphic designer + letterpress printer)
- **Siso's connection:** Isidoros found the Nebiolo press next door

---

*Next chat: Deploy to Hostinger + Snipcart setup*
