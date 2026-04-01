# Letterpressed Ñ vintageprinting.eu
## Deployment & Maintenance Guide

---

## Project Structure

```
VintagePrinting/
??? index.html          ? Complete single-page website
??? style.css           ? All styles
??? images/             ? Site images (logos, press photos, gallery)
?   ??? logo-black.png
?   ??? logo-white.png
?   ??? press-nebiolo.jpg
?   ??? press-harry.jpg
?   ??? katerina.jpg
?   ??? hero-press.jpg
?   ??? hero-wedding.jpg
?   ??? gallery-01.jpg É gallery-21.jpg
??? admin/              ? Decap CMS (content management)
?   ??? index.html      ? CMS interface
?   ??? config.yml      ? CMS configuration
??? README.md           ? This file
```

---

## 1. Hostinger FTP Deployment

### Credentials needed (from Hostinger hPanel)
- **FTP Host**: (from hPanel ? Files ? FTP Accounts)
- **FTP Username**: (from hPanel)
- **FTP Password**: (set in hPanel)
- **Port**: 21 (or 22 for SFTP)
- **Remote directory**: `public_html/`

### Recommended FTP client: FileZilla (free)
1. Download FileZilla from https://filezilla-project.org
2. Open FileZilla ? File ? Site Manager ? New Site
3. Enter your FTP credentials above
4. Connect and navigate to `public_html/`
5. **DELETE** or archive the old WordPress files first (wp-admin/, wp-content/, etc.)
6. Upload ALL files from this `VintagePrinting/` folder into `public_html/`

### Files to upload:
```
index.html      ? public_html/index.html
style.css       ? public_html/style.css
images/         ? public_html/images/   (entire folder)
admin/          ? public_html/admin/    (entire folder)
```

### After upload, verify at:
- https://www.vintageprinting.eu          (homepage)
- https://www.vintageprinting.eu/admin/   (CMS Ñ needs setup, see below)

---

## 2. Snipcart Setup

Snipcart handles the online shop. Setup takes about 10 minutes.

1. Create a free account at https://snipcart.com
2. In your Snipcart dashboard ? Account ? API Keys
3. Copy your **Public API Key**
4. Open `index.html` and find this line near the bottom:
   ```
   data-api-key="YOUR_SNIPCART_PUBLIC_API_KEY"
   ```
5. Replace `YOUR_SNIPCART_PUBLIC_API_KEY` with your actual key
6. In Snipcart dashboard ? Domains & URLs ? add `vintageprinting.eu`
7. Set currency to **EUR** in Snipcart settings
8. Set up payment (Stripe recommended Ñ Cyprus supported)

**Note:** Snipcart charges 1.5% per transaction (or $20/month if you do more than ~Û1300/month in sales). For ~5Ð10 orders/year this is essentially free.

---

## 3. Contact Form Setup

The contact form currently uses a `mailto:` fallback (opens the user's email client). 

For a proper server-side form (recommended), choose one of:

**Option A Ñ Formspree (easiest, free tier)**
1. Sign up at https://formspree.io
2. Create a new form ? get your form endpoint (e.g. `https://formspree.io/f/xabcdefg`)
3. In `index.html`, find `handleSubmit` function
4. Replace the mailto block with:
   ```javascript
   fetch('https://formspree.io/f/YOUR_FORM_ID', {
     method: 'POST', body: data
   }).then(() => {
     document.getElementById('formSuccess').style.display = 'block';
     form.reset();
   });
   ```

**Option B Ñ Hostinger PHP mailer**
Create `contact.php` in `public_html/` and point the form action to it.
Contact Hostinger support Ñ they can provide a PHP mail template.

---

## 4. Decap CMS Setup (Content Management)

Decap CMS lets Katerina update gallery images, text, and products via a web interface at `/admin/`.

**For Hostinger hosting without Netlify, the simplest approach is:**

### Option A Ñ Sveltia CMS (drop-in replacement, works with GitHub)
1. In `admin/index.html`, replace the Decap script tag with:
   ```html
   <script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
   ```
2. Connect your GitHub repo in `admin/config.yml`
3. Use GitHub OAuth for login

### Option B Ñ Local editing only
1. Edit content directly in `index.html` using any text editor
2. Re-upload changed files via FTP
3. This is perfectly fine given the low update frequency

### Option C Ñ Netlify (free tier, enables full CMS)
1. Push files to a GitHub repository
2. Connect repo to Netlify (free at https://netlify.com)
3. Enable Netlify Identity
4. The CMS at `/admin/` will work fully out of the box

---

## 5. Google Maps

The contact section includes a Google Maps embed. The current src uses approximate coordinates.

For an exact embed:
1. Go to https://maps.google.com
2. Search for "Salaminos 29, Limassol, Cyprus"
3. Click Share ? Embed a map ? Copy HTML
4. In `index.html`, replace the `<iframe src="..."` in the contact section

---

## 6. SEO & Analytics

- **Google Search Console**: Add site at https://search.google.com/search-console
- **Google Analytics**: Create GA4 property, add tracking snippet before `</head>` in index.html
- **Meta tags**: Already configured in `<head>` Ñ update `og:image` once site is live

---

## 7. Instagram Handle

Currently set to `@letterpressed_cy` Ñ update in two places in `index.html`:
- The contact section `<a href="https://instagram.com/letterpressed_cy">`
- The footer social link

---

## 8. Quick Content Edits (without CMS)

Open `index.html` in any text editor and search for:
- `About text` ? find the about section paragraphs
- `Gallery` ? find the gallery section to add/remove images
- `Shop` ? find the shop section to add/remove products
- `Footer` ? find the footer for copyright, address, links

---

## 9. SSL / HTTPS

Hostinger provides free SSL via Let's Encrypt.
In hPanel ? Security ? SSL ? Install SSL Certificate ? select domain ? Install.
The site will then be accessible at `https://www.vintageprinting.eu`.

---

## Support

For technical help: **ikolotas@gmail.com** (Siso)  
For content updates: Edit directly in index.html or set up CMS as above.

*Built April 2026. Stack: HTML/CSS/JS + Snipcart + Decap CMS.*
