/**
 * cms.js — Letterpressed / vintageprinting.eu
 * Fetches content from _data/ files in the GitHub repo and populates the DOM.
 * Falls back silently to hardcoded HTML if any fetch fails.
 */
(function () {
  'use strict';

  const REPO_RAW = 'https://raw.githubusercontent.com/Letterpressed/vintageprinting-eu/main';

  // ── Frontmatter parser ───────────────────────────────────────────────────
  function parseFrontmatter(text) {
    const match = text.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---/);
    if (!match) return { body: text, data: {} };
    const body = text.slice(match[0].length).trim();
    const data = {};
    match[1].split(/\r?\n/).forEach(function (line) {
      var colon = line.indexOf(':');
      if (colon === -1) return;
      var key = line.slice(0, colon).trim();
      var val = line.slice(colon + 1).trim().replace(/^"|"$/g, '');
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      else if (val !== '' && !isNaN(val)) val = Number(val);
      data[key] = val;
    });
    return { body: body, data: data };
  }

  // ── Fetch helpers ────────────────────────────────────────────────────────
  function fetchJSON(path) {
    return fetch(REPO_RAW + path).then(function (res) {
      if (!res.ok) throw new Error('fetch failed: ' + path);
      return res.json();
    });
  }

  function fetchMD(path) {
    return fetch(REPO_RAW + path).then(function (res) {
      if (!res.ok) throw new Error('fetch failed: ' + path);
      return res.text().then(parseFrontmatter);
    });
  }

  // File lists — must match what was committed to _data/
  var GALLERY_SLUGS = [];
  for (var g = 1; g <= 21; g++) {
    GALLERY_SLUGS.push('/gallery-' + (g < 10 ? '0' + g : '' + g) + '.md');
  }
  var PRODUCT_SLUGS  = ['/art-print.md', '/thank-you-cards.md', '/gift-tags.md'];
  var SERVICE_SLUGS  = ['/wedding-stationery.md', '/business-cards.md', '/custom-prints.md', '/graphic-design.md'];

  // ── DOM helpers ──────────────────────────────────────────────────────────
  function setText(sel, val) {
    var el = document.querySelector(sel);
    if (el && val != null) el.textContent = val;
  }
  function setHTML(sel, val) {
    var el = document.querySelector(sel);
    if (el && val != null) el.innerHTML = val;
  }

  // ── Apply settings ───────────────────────────────────────────────────────
  function applySettings(s) {
    setText('.nav__logo-text', s.site_title);
    setText('.footer__brand-name', s.site_title);

    var phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink && s.phone) {
      phoneLink.textContent = s.phone;
      phoneLink.href = 'tel:' + s.phone.replace(/\s/g, '');
    }
    var emailLink = document.querySelector('a[href^="mailto:info@"]');
    if (emailLink && s.email) {
      emailLink.textContent = s.email;
      emailLink.href = 'mailto:' + s.email;
    }
    var igLink = document.querySelector('a[href*="instagram.com"]');
    if (igLink && s.instagram) igLink.textContent = s.instagram;

    // Address — first .contact__info-item p
    var addrEl = document.querySelector('.contact__info-item p');
    if (addrEl && s.address1) addrEl.innerHTML = s.address1 + '<br>' + (s.address2 || '');

    if (s.site_title) {
      document.title = s.site_title + ' | Letterpress Printing Studio \u2014 Limassol, Cyprus';
    }
  }

  // ── Apply hero ───────────────────────────────────────────────────────────
  function applyHero(h) {
    setText('.hero .eyebrow', h.eyebrow);

    var titleEl = document.querySelector('.hero__title');
    if (titleEl && h.title1 && h.title2) {
      titleEl.innerHTML = h.title1 + ' <em>' + h.title2 + '</em><br>Tells a Story';
    }
    setText('.hero__subtitle', h.subtitle);

    var ctas = document.querySelectorAll('.hero__actions a');
    if (ctas[0] && h.cta1_text) { ctas[0].textContent = h.cta1_text; ctas[0].href = h.cta1_link || '#'; }
    if (ctas[1] && h.cta2_text) { ctas[1].textContent = h.cta2_text; ctas[1].href = h.cta2_link || '#'; }

    // Hero background — set via inline style on #heroBg (the div that gets CSS background-image)
    var heroBg = document.getElementById('heroBg');
    if (heroBg && h.image) heroBg.style.backgroundImage = 'url(' + h.image + ')';
  }

  // ── Apply about ──────────────────────────────────────────────────────────
  function applyAbout(a) {
    var imgEl = document.querySelector('.about__image-wrap img');
    if (imgEl && a.photo) imgEl.src = a.photo;

    var paras = document.querySelectorAll('.about__text > p');
    if (paras[0] && a.para1) paras[0].textContent = a.para1;
    if (paras[1] && a.para2) paras[1].textContent = a.para2;
    if (paras[2] && a.para3) paras[2].textContent = a.para3;

    // Press cards
    var cards = document.querySelectorAll('.press-card');
    var presses = [a.nebiolo, a.harry];
    cards.forEach(function (card, i) {
      var p = presses[i];
      if (!p) return;
      var img  = card.querySelector('.press-card__img');
      var name = card.querySelector('.press-card__name');
      var era  = card.querySelector('.press-card__era');
      var desc = card.querySelector('p');
      if (img  && p.photo) img.src = p.photo;
      if (name && p.title) name.textContent = p.title;
      if (era  && p.era)   era.textContent  = p.era;
      if (desc && p.desc)  desc.textContent = p.desc;
    });
  }

  // ── Apply services ───────────────────────────────────────────────────────
  function applyServices(svcs) {
    if (!svcs.length) return;
    var grid = document.querySelector('.services__grid');
    if (!grid) return;
    svcs.sort(function (a, b) { return (a.order || 99) - (b.order || 99); });
    grid.innerHTML = svcs.map(function (s) {
      return '<div class="service-card">'
        + '<span class="service-card__icon">' + (s.icon || '&#9670;') + '</span>'
        + '<h3 class="service-card__title">' + s.title + '</h3>'
        + '<p>' + s.description + '</p>'
        + '</div>';
    }).join('');
  }

  // ── Apply gallery ────────────────────────────────────────────────────────
  function applyGallery(items) {
    if (!items.length) return;
    var grid = document.getElementById('galleryGrid');
    if (!grid) return;
    items.sort(function (a, b) { return (a.order || 99) - (b.order || 99); });
    grid.innerHTML = items.map(function (item, idx) {
      return '<div class="gallery__item" onclick="openLightbox(' + idx + ')">'
        + '<img src="' + item.image + '" alt="' + (item.alt || item.title || '') + '" loading="lazy">'
        + '</div>';
    }).join('');
    // Store for lightbox
    window._cmsGallery = items;
  }

  // ── Apply products ───────────────────────────────────────────────────────
  function applyProducts(prods) {
    if (!prods.length) return;
    var grid = document.querySelector('.shop__grid');
    if (!grid) return;
    prods.sort(function (a, b) { return (a.order || 99) - (b.order || 99); });
    var inStock = prods.filter(function (p) { return p.in_stock !== false; });
    grid.innerHTML = inStock.map(function (p) {
      return '<div class="product-card">'
        + '<img src="' + p.image + '" alt="' + p.title + '" class="product-card__img" loading="lazy">'
        + '<div class="product-card__body">'
        + '<h3 class="product-card__name">' + p.title + '</h3>'
        + '<p class="product-card__price">&euro;' + p.price + '</p>'
        + '<button class="snipcart-add-item"'
        + ' data-item-id="' + p.product_id + '"'
        + ' data-item-price="' + p.price + '"'
        + ' data-item-url="/"'
        + ' data-item-name="' + p.title + '"'
        + ' data-item-description="' + (p.description || '') + '"'
        + ' data-item-image="' + p.image + '">Add to Cart</button>'
        + '</div></div>';
    }).join('');
  }

  // ── Patch lightbox to work with CMS gallery ──────────────────────────────
  function patchLightbox() {
    var origOpen  = window.openLightbox;
    var origShift = window.shiftLightbox;

    window.openLightbox = function (index) {
      var gallery = window._cmsGallery;
      if (gallery && gallery[index]) {
        var item = gallery[index];
        var lb   = document.getElementById('lightbox');
        var img  = document.getElementById('lightboxImg');
        img.src  = item.image;
        img.alt  = item.alt || item.title || '';
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
        window._cmsLightboxIdx = index;
        return;
      }
      if (origOpen) origOpen(index);
    };

    window.shiftLightbox = function (dir) {
      var gallery = window._cmsGallery;
      if (gallery) {
        var next = ((window._cmsLightboxIdx || 0) + dir + gallery.length) % gallery.length;
        window.openLightbox(next);
        return;
      }
      if (origShift) origShift(dir);
    };
  }

  // ── Main ─────────────────────────────────────────────────────────────────
  function init() {
    var allFetches = [
      fetchJSON('/_data/settings.json'),
      fetchJSON('/_data/hero.json'),
      fetchJSON('/_data/about.json')
    ];

    GALLERY_SLUGS.forEach(function (s) { allFetches.push(fetchMD('/_data/gallery' + s)); });
    PRODUCT_SLUGS.forEach(function (s) { allFetches.push(fetchMD('/_data/products' + s)); });
    SERVICE_SLUGS.forEach(function (s) { allFetches.push(fetchMD('/_data/services' + s)); });

    var gStart = 3;
    var pStart = gStart + GALLERY_SLUGS.length;
    var sStart = pStart + PRODUCT_SLUGS.length;

    Promise.allSettled(allFetches).then(function (results) {
      var settings = results[0];
      var hero     = results[1];
      var about    = results[2];

      var galleryResults = results.slice(gStart, pStart);
      var productResults = results.slice(pStart, sStart);
      var serviceResults = results.slice(sStart);

      function fulfilled(r) { return r.status === 'fulfilled'; }
      function toData(r)    { return r.value.data; }

      if (fulfilled(settings)) applySettings(settings.value);
      if (fulfilled(hero))     applyHero(hero.value);
      if (fulfilled(about))    applyAbout(about.value);

      var galleryItems = galleryResults.filter(fulfilled).map(toData);
      var productItems = productResults.filter(fulfilled).map(toData);
      var serviceItems = serviceResults.filter(fulfilled).map(toData);

      if (galleryItems.length) applyGallery(galleryItems);
      if (serviceItems.length) applyServices(serviceItems);
      if (productItems.length) applyProducts(productItems);

      patchLightbox();

    }).catch(function (err) {
      console.warn('[cms.js] error:', err);
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
