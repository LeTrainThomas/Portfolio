/* =====================================================================
   PORTFOLIO — SCRIPT
   Lit config.js et construit les parties dynamiques du site.
   Aucun framework, aucune dépendance. Vous n'avez normalement pas
   besoin de modifier ce fichier : tout se règle dans config.js.
   ===================================================================== */
(function () {
  "use strict";

  var cfg = window.PORTFOLIO_CONFIG;
  var root = document.documentElement;
  if (!cfg) {
    // Sans configuration, le contenu statique de index.html reste affiché.
    console.warn("[Portfolio] config.js introuvable : contenu par défaut affiché.");
    return;
  }

  var identity = cfg.identity || {};
  var anim = cfg.animations || {};
  var hints = cfg.showPlaceholderHints !== false;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var animationsOn = anim.enabled !== false && !reducedMotion;
  if (anim.enabled === false) root.classList.add("no-anim");

  var ACCENTS = ["var(--pink)", "var(--turquoise)", "var(--lime)", "var(--violet)", "var(--yellow)", "var(--blue)"];
  var DEFAULT_PLACEHOLDER = "assets/placeholders/placeholder.svg";

  /* ------------------------------------------------------------------
     Outils
     ------------------------------------------------------------------ */
  function filled(v) { return typeof v === "string" && v.trim() !== ""; }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function pad(n) { return n < 10 ? "0" + n : String(n); }

  // Crée un élément : el("p", { class: "x", text: "..." }, [enfants])
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "text") node.textContent = v;
      else if (k === "class") node.className = v;
      else if (k === "style") node.setAttribute("style", v);
      else node.setAttribute(k, v === true ? "" : v);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return node;
  }

  // N'autorise que les liens http(s) et mailto (évite les liens dangereux ou factices)
  function safeUrl(url) {
    if (!filled(url)) return null;
    var u = url.trim();
    if (/^(https?:|mailto:)/i.test(u)) return u;
    if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return null; // autre protocole refusé
    return u; // chemin relatif
  }

  function externalLink(url, label, className) {
    var a = el("a", { href: url, class: className || null, target: "_blank", rel: "noopener noreferrer" }, [label]);
    a.appendChild(el("span", { class: "visually-hidden", text: " (s'ouvre dans un nouvel onglet)" }));
    a.appendChild(el("span", { "aria-hidden": "true", text: "↗" }));
    return a;
  }

  /* ------------------------------------------------------------------
     Images : chemin, cadrage, placeholder automatique, sans boucle
     ------------------------------------------------------------------ */
  function applyImage(img, opts, fallback) {
    opts = opts || {};
    var placeholder = filled(opts.placeholder) ? opts.placeholder : (fallback || DEFAULT_PLACEHOLDER);
    var src = filled(opts.src) ? opts.src.trim() : placeholder;

    if (opts.fit) img.style.setProperty("--fit", opts.fit);
    if (opts.position) img.style.setProperty("--pos", opts.position);

    img.classList.remove("is-missing");
    img.onerror = function () {
      if (img.dataset.fallback !== "done" && img.getAttribute("src") !== placeholder) {
        // 1er échec : on passe au placeholder
        img.dataset.fallback = "done";
        img.src = placeholder;
      } else {
        // Le placeholder lui-même est absent : on masque l'image (le cadre coloré reste)
        img.onerror = null;
        img.classList.add("is-missing");
      }
    };
    if (img.getAttribute("src") !== src) img.src = src;
    return img;
  }

  function frameImage(opts, fallback, extra) {
    var img = el("img", Object.assign({ alt: (opts && opts.alt) || "", width: "1200", height: "900", decoding: "async", loading: "lazy" }, extra || {}));
    applyImage(img, opts, fallback);
    return img;
  }

  /* ------------------------------------------------------------------
     1. Textes
     ------------------------------------------------------------------ */
  var projects = Array.isArray(cfg.projects) ? cfg.projects : [];
  var texts = {
    name: identity.name,
    role: identity.role,
    location: identity.location,
    shortBio: identity.shortBio,
    year: String(new Date().getFullYear()),
    ctaPrimary: cfg.hero && cfg.hero.ctaPrimary,
    ctaSecondary: cfg.hero && cfg.hero.ctaSecondary,
    projectCount: pad(projects.length),
    aboutTitle: cfg.about && cfg.about.title,
    contactTitle: cfg.contact && cfg.contact.title,
    contactIntro: cfg.contact && cfg.contact.intro
  };

  $all("[data-bind]").forEach(function (node) {
    var key = node.getAttribute("data-bind");
    if (key === "longBio") {
      node.textContent = "";
      (identity.longBio || []).filter(filled).forEach(function (p) { node.appendChild(el("p", { text: p })); });
      return;
    }
    if (!(key in texts)) return;
    var value = texts[key];
    if (filled(value)) { node.textContent = value; node.hidden = false; }
    else if (key === "location" || key === "role") node.hidden = true;
    else if (key === "contactIntro") node.textContent = "";
  });

  if (cfg.meta && filled(cfg.meta.pageTitle)) document.title = cfg.meta.pageTitle;

  /* ------------------------------------------------------------------
     2. Accueil : emplacements d'images
     ------------------------------------------------------------------ */
  var hero = cfg.hero || {};
  ["main", "left", "right", "foreground"].forEach(function (slot) {
    var wrap = $('[data-slot="' + slot + '"]');
    var opts = hero[slot];
    if (!wrap || !opts) return;
    if (opts.hidden) { wrap.hidden = true; wrap.style.display = "none"; return; }
    var img = wrap.querySelector(":scope > img");
    if (!img) return;
    if (slot === "main") img.alt = filled(opts.alt) ? opts.alt : "";
    applyImage(img, opts);
  });

  /* ------------------------------------------------------------------
     3. À propos : photo + CV
     ------------------------------------------------------------------ */
  var about = cfg.about || {};
  var aboutSlot = $('[data-slot="about"]');
  if (aboutSlot) {
    aboutSlot.classList.add("media-frame");
    var aboutImg = aboutSlot.querySelector("img");
    var photo = about.photo || {};
    // Texte alternatif uniquement si une vraie photo est fournie
    aboutImg.alt = filled(photo.src) && filled(photo.alt) ? photo.alt : "";
    applyImage(aboutImg, photo, "assets/placeholders/portrait.svg");
  }

  var cvBox = $("[data-cv]");
  var cv = cfg.cv || {};
  if (cvBox && filled(cv.file) && safeUrl(cv.file)) {
    var cvLink = el("a", { class: "btn btn--outline", href: safeUrl(cv.file), download: "" }, [cv.label || "Télécharger mon CV"]);
    cvLink.appendChild(el("span", { "aria-hidden": "true", text: "↓" }));
    cvBox.appendChild(cvLink);
    cvBox.hidden = false;
    // En ligne, on vérifie que le fichier existe vraiment ; sinon le bouton est retiré.
    if (/^https?:$/.test(location.protocol) && window.fetch) {
      fetch(cvLink.href, { method: "HEAD" }).then(function (r) {
        if (!r.ok) { cvBox.hidden = true; cvBox.textContent = ""; console.warn("[Portfolio] CV introuvable : " + cv.file); }
      }).catch(function () { /* réseau indisponible : on laisse le bouton */ });
    }
  }

  /* ------------------------------------------------------------------
     4. Compétences
     ------------------------------------------------------------------ */
  var skillsBox = $("[data-skills]");
  if (skillsBox) {
    (cfg.skills || []).forEach(function (group, i) {
      var items = (group.items || []).filter(filled);
      if (!filled(group.domain) && !items.length) return;
      skillsBox.appendChild(el("div", { class: "skill reveal", style: "--skill-accent:" + ACCENTS[i % ACCENTS.length] }, [
        el("span", { class: "skill__num", "aria-hidden": "true", text: pad(i + 1) }),
        el("h3", { class: "skill__domain", text: group.domain || "" }),
        el("ul", { class: "skill__items" }, items.map(function (s) { return el("li", { text: s }); }))
      ]));
    });
  }

  /* ------------------------------------------------------------------
     5. Contact et liens
     ------------------------------------------------------------------ */
  var contact = cfg.contact || {};
  var mailBox = $("[data-contact-mail]");
  var copyStatus = $("[data-copy-status]");
  var email = filled(contact.email) ? contact.email.trim() : "";

  if (mailBox) {
    mailBox.textContent = "";
    if (email) {
      var mailLink = el("a", { class: "contact__email", href: "mailto:" + email, text: email });
      var copyBtn = el("button", { class: "btn btn--outline", type: "button" }, ["Copier l'adresse"]);
      mailBox.appendChild(mailLink);
      mailBox.appendChild(copyBtn);
      copyBtn.addEventListener("click", function () { copyEmail(email); });
    } else if (hints) {
      mailBox.appendChild(el("p", { class: "hint", text: "[Adresse e-mail à renseigner dans config.js]" }));
    }
  }

  var statusTimer;
  function setStatus(msg) {
    if (!copyStatus) return;
    copyStatus.textContent = msg;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { copyStatus.textContent = ""; }, 5000);
  }

  function legacyCopy(text) {
    var ta = el("textarea", { readonly: "", "aria-hidden": "true", style: "position:fixed;top:0;left:-9999px;opacity:0" });
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function showManualCopy(text) {
    var existing = $(".contact__fallback");
    if (!existing) {
      existing = el("input", { class: "contact__fallback", type: "text", readonly: "", value: text, "aria-label": "Adresse e-mail à copier manuellement" });
      mailBox.appendChild(existing);
    }
    existing.focus();
    existing.select();
    setStatus("Copie automatique impossible. L'adresse est sélectionnée : copiez-la avec Ctrl+C (ou Cmd+C, ou un appui long).");
  }

  function copyEmail(text) {
    var done = function () { setStatus("Adresse copiée dans le presse-papiers."); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () {
        if (legacyCopy(text)) done(); else showManualCopy(text);
      });
    } else if (legacyCopy(text)) {
      done();
    } else {
      showManualCopy(text);
    }
  }

  var links = (cfg.links || []).filter(function (l) { return l && filled(l.label) && safeUrl(l.url); });
  var linksBox = $("[data-links]");
  var footerLinks = $("[data-footer-links]");
  if (linksBox) {
    if (links.length) {
      links.forEach(function (l) { linksBox.appendChild(el("li", {}, [externalLink(safeUrl(l.url), l.label)])); });
    } else if (hints) {
      linksBox.appendChild(el("li", { class: "hint", text: "[Liens professionnels à renseigner dans config.js]" }));
    } else {
      linksBox.hidden = true;
    }
  }
  if (footerLinks) {
    if (links.length) links.forEach(function (l) { footerLinks.appendChild(el("li", {}, [externalLink(safeUrl(l.url), l.label)])); });
    else footerLinks.hidden = true;
  }

  /* ------------------------------------------------------------------
     6. Projets + filtres
     ------------------------------------------------------------------ */
  var grid = $("[data-projects]");
  var emptyMsg = $("[data-projects-empty]");
  var filterBox = $("[data-filters]");
  var filterStatus = $("[data-filter-status]");
  var activeFilter = "all";

  projects.forEach(function (p, i) { p.__index = i; });

  function projectCard(p) {
    var i = p.__index;
    var cover = p.cover || {};
    var card = el("article", { class: "card", style: "--accent:" + ACCENTS[i % ACCENTS.length], "data-id": p.id });
    var media = el("div", { class: "card__media media-frame" }, [
      frameImage({ src: cover.src, alt: cover.alt, fit: cover.fit, position: cover.position, placeholder: cover.placeholder })
    ]);
    var meta = el("p", { class: "card__meta" }, [
      el("span", { class: "card__num", text: pad(i + 1) }),
      filled(p.category) ? el("span", { class: "card__cat", text: p.category }) : null,
      filled(p.year) ? el("span", { text: p.year }) : null
    ]);
    var btn = el("button", { class: "card__link", type: "button", "aria-haspopup": "dialog", text: p.title || "Projet" });
    btn.addEventListener("click", function () { openProject(p, btn); });
    card.appendChild(media);
    card.appendChild(el("div", { class: "card__body" }, [
      meta,
      el("h3", { class: "card__title" }, [btn]),
      filled(p.summary) ? el("p", { class: "card__summary", text: p.summary }) : null,
      el("span", { class: "card__cta", "aria-hidden": "true" }, ["Voir le projet ", el("span", { text: "→" })])
    ]));
    return card;
  }

  function renderProjects(revealNow) {
    if (!grid) return;
    grid.textContent = "";
    var list = projects.filter(function (p) { return activeFilter === "all" || p.category === activeFilter; });
    list.forEach(function (p) {
      var c = projectCard(p);
      if (revealNow) c.classList.add("reveal", "is-visible"); else c.classList.add("reveal");
      grid.appendChild(c);
    });
    if (emptyMsg) emptyMsg.hidden = list.length > 0;
    return list.length;
  }

  function setupFilters() {
    if (!filterBox) return;
    var cats = [];
    projects.forEach(function (p) { if (filled(p.category) && cats.indexOf(p.category) === -1) cats.push(p.category); });
    if (cats.length < 2) { filterBox.hidden = true; return; } // filtres inutiles
    var listBox = filterBox.querySelector(".filters__list");
    var all = [{ value: "all", label: "Tous", count: projects.length }].concat(cats.map(function (c) {
      return { value: c, label: c, count: projects.filter(function (p) { return p.category === c; }).length };
    }));
    all.forEach(function (f) {
      var b = el("button", { class: "filter", type: "button", "aria-pressed": f.value === "all" ? "true" : "false" }, [
        f.label, el("span", { class: "filter__count", "aria-hidden": "true", text: String(f.count) })
      ]);
      b.addEventListener("click", function () {
        activeFilter = f.value;
        $all(".filter", listBox).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        var n = renderProjects(true);
        if (filterStatus) filterStatus.textContent = n + (n > 1 ? " projets affichés" : " projet affiché");
      });
      listBox.appendChild(b);
    });
    filterBox.hidden = false;
  }

  var reset = $("[data-filter-reset]");
  if (reset) reset.addEventListener("click", function () {
    var first = $(".filter");
    if (first) first.click(); else { activeFilter = "all"; renderProjects(true); }
  });

  setupFilters();
  renderProjects(false);

  /* ------------------------------------------------------------------
     7. Modale projet
     ------------------------------------------------------------------ */
  var modal = $("#modale-projet");
  var modalBody = $("[data-modal-body]");
  var modalMeta = $("[data-modal-meta]");
  var lastTrigger = null;
  var supportsDialog = modal && typeof modal.showModal === "function";

  function infoBlock(label, content, wide) {
    if (!content) return null;
    var dd = el("dd");
    if (typeof content === "string") dd.textContent = content; else dd.appendChild(content);
    return el("div", { class: wide ? "is-wide" : null }, [el("dt", { text: label }), dd]);
  }

  function buildDetail(p) {
    var frag = document.createDocumentFragment();
    var head = el("header", { class: "project-detail__head" }, [
      el("h2", { class: "project-detail__title", id: "modal-title", tabindex: "-1", text: p.title || "Projet" }),
      filled(p.summary) ? el("p", { class: "project-detail__summary", text: p.summary }) : null
    ]);
    frag.appendChild(head);

    // Galerie : couverture en grand, puis images supplémentaires
    var images = [p.cover || {}].concat(p.gallery || []);
    var gallery = el("div", { class: "gallery" });
    images.forEach(function (img, k) {
      var frame = el("div", { class: "media-frame", style: "--accent:" + ACCENTS[(p.__index + k) % ACCENTS.length] }, [
        frameImage(img, null, { loading: k === 0 ? "eager" : "lazy" })
      ]);
      gallery.appendChild(el("figure", { class: "gallery__item" + (k === 0 ? " gallery__item--wide" : "") }, [
        frame,
        filled(img.caption) ? el("figcaption", { text: img.caption }) : null
      ]));
    });
    frag.appendChild(gallery);

    var tools = (p.tools || []).filter(filled);
    var toolsList = tools.length ? el("ul", { class: "tools" }, tools.map(function (t) { return el("li", { text: t }); })) : null;
    var info = el("dl", { class: "project-detail__info" }, [
      infoBlock("Contexte", filled(p.context) ? p.context : null),
      infoBlock("Rôle", filled(p.role) ? p.role : null),
      infoBlock("Démarche", filled(p.approach) ? p.approach : null, true),
      infoBlock("Outils", toolsList),
      infoBlock("Résultat", filled(p.result) ? p.result : null)
    ].filter(Boolean));
    frag.appendChild(info);

    var link = p.link && safeUrl(p.link.url);
    if (link) {
      frag.appendChild(el("p", { class: "project-detail__link" }, [externalLink(link, p.link.label || "Voir le projet en ligne", "btn btn--primary")]));
    }
    return frag;
  }

  function focusables(container) {
    return $all('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])', container)
      .filter(function (n) { return n.offsetParent !== null || n === document.activeElement; });
  }

  function trapTab(e, container) {
    if (e.key !== "Tab") return;
    var items = focusables(container);
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function openProject(p, trigger) {
    if (!modal) return;
    lastTrigger = trigger;
    modalBody.textContent = "";
    modalBody.appendChild(buildDetail(p));
    modalMeta.textContent = [pad(p.__index + 1), p.category, p.year].filter(filled).join("  ·  ");
    modalBody.scrollTop = 0;
    root.classList.add("has-overlay");
    modal.classList.remove("is-closing");
    if (supportsDialog) modal.showModal(); else modal.setAttribute("open", "");
    var title = $("#modal-title", modal);
    if (title) title.focus({ preventScroll: true });
  }

  var closing = false;
  function closeProject() {
    if (!modal || !modal.hasAttribute("open") || closing) return;
    var finish = function () {
      closing = false;
      modal.classList.remove("is-closing");
      if (supportsDialog) modal.close(); else modal.removeAttribute("open");
      root.classList.remove("has-overlay");
      if (lastTrigger && document.body.contains(lastTrigger)) lastTrigger.focus();
      else if (grid) grid.focus && grid.focus();
    };
    if (animationsOn) {
      closing = true;
      modal.classList.add("is-closing");
      setTimeout(finish, 240);
    } else {
      finish();
    }
  }

  if (modal) {
    $("[data-modal-close]", modal).addEventListener("click", closeProject);
    // Échap : on remplace la fermeture native par la nôtre (animation + focus)
    modal.addEventListener("cancel", function (e) { e.preventDefault(); closeProject(); });
    modal.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); closeProject(); }
      trapTab(e, modal);
    });
    // Clic sur le fond assombri
    modal.addEventListener("click", function (e) { if (e.target === modal) closeProject(); });
  }

  /* ------------------------------------------------------------------
     8. Navigation (en-tête + menu mobile)
     ------------------------------------------------------------------ */
  var header = $(".site-header");
  var toggle = $(".nav-toggle");
  var nav = $("#menu-principal");
  var mobileMQ = window.matchMedia("(max-width: 759px)");

  function setMenu(open, returnFocus) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.querySelector(".nav-toggle__label").textContent = open ? "Fermer" : "Menu";
    root.classList.toggle("has-overlay", open);
    if (open) { var first = nav.querySelector("a"); if (first) first.focus(); }
    else if (returnFocus) toggle.focus();
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true", true); });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && mobileMQ.matches) setMenu(false, false); // fermeture après sélection
    });
    document.addEventListener("keydown", function (e) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (e.key === "Escape") { setMenu(false, true); return; }
      trapTab(e, header);
    });
    var onMQ = function () { if (!mobileMQ.matches && nav.classList.contains("is-open")) setMenu(false, false); };
    if (mobileMQ.addEventListener) mobileMQ.addEventListener("change", onMQ); else mobileMQ.addListener(onMQ);
  }

  /* ------------------------------------------------------------------
     9. Défilement : en-tête, parallaxe légère
     ------------------------------------------------------------------ */
  var parallaxOn = animationsOn && anim.parallax !== false;
  var decor = {
    left: $(".hero__decor--left"),
    right: $(".hero__decor--right"),
    front: $(".hero__decor--front")
  };
  var desktopMQ = window.matchMedia("(min-width: 760px)");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 24);
    if (parallaxOn && desktopMQ.matches && y < window.innerHeight * 1.2) {
      if (decor.left) decor.left.style.transform = "translate3d(0," + (y * 0.12).toFixed(1) + "px,0)";
      if (decor.right) decor.right.style.transform = "translate3d(0," + (y * -0.08).toFixed(1) + "px,0)";
      if (decor.front) decor.front.style.transform = "translate3d(0," + (y * -0.05).toFixed(1) + "px,0)";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------
     10. Révélation des sections au défilement
     Le contenu n'est masqué QUE si tout est prêt ; sinon il reste visible.
     ------------------------------------------------------------------ */
  $all(".section__head, .filters, .about__text, .about__media, .contact > *").forEach(function (n) { n.classList.add("reveal"); });

  if (animationsOn && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $all(".reveal:not(.is-visible)").forEach(function (n) { io.observe(n); });
    root.classList.add("reveal-ready");
  }
})();
