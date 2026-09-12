/* ==========================================================================
   TAPLINK NFC — script.js
   Update SITE_CONFIG once and every page (WhatsApp buttons, footer, JSON-LD
   hooks) reads from it. No other file should hardcode the phone number.
   ========================================================================== */

const SITE_CONFIG = {
  businessName: "TapLink NFC",
  whatsappNumber: "9231889736006", // digits only, country code first, no + or spaces
  phone: "",
  email: "m.uzairmangi@gmai.com",
  city: "",
  region: "",
  country: "Pakistan",
  website: "https://www.example.com",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  linkedin: "https://linkedin.com/"
};

/* -------------------------------------------------------------------------
   WhatsApp helpers
   ------------------------------------------------------------------------- */
function buildWhatsAppLink(message) {
  const base = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

function wireWhatsAppButtons() {
  document.querySelectorAll("[data-wa-message]").forEach((el) => {
    const message = el.getAttribute("data-wa-message");
    el.setAttribute("href", buildWhatsAppLink(message));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
  // Any plain WhatsApp CTA with no specific message gets a sensible default.
  document.querySelectorAll('[data-wa-default]').forEach((el) => {
    el.setAttribute(
      "href",
      buildWhatsAppLink("Hello, I'd like to know more about your custom NFC & QR products.")
    );
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
}

/* -------------------------------------------------------------------------
   Sticky / compact header
   ------------------------------------------------------------------------- */
function wireHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("is-compact", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* -------------------------------------------------------------------------
   Mobile navigation
   ------------------------------------------------------------------------- */
function wireMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".mobile-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

/* -------------------------------------------------------------------------
   FAQ accordion
   ------------------------------------------------------------------------- */
function wireFaqAccordion() {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = document.getElementById(btn.getAttribute("aria-controls"));
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      btn.setAttribute("aria-expanded", String(!isOpen));
      if (answer) {
        answer.style.maxHeight = isOpen ? "0px" : `${answer.scrollHeight}px`;
      }
    });
  });
}

/* -------------------------------------------------------------------------
   Product filtering (products.html)
   ------------------------------------------------------------------------- */
function wireProductFilter() {
  const chips = document.querySelectorAll(".filter-chip");
  const cards = document.querySelectorAll("[data-category]");
  if (!chips.length || !cards.length) return;

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const category = chip.getAttribute("data-filter");

      cards.forEach((card) => {
        const matches = category === "all" || card.getAttribute("data-category") === category;
        card.style.display = matches ? "" : "none";
      });
    });
  });
}

/* -------------------------------------------------------------------------
   Reveal-on-scroll (one subtle entrance, not per-card hover)
   ------------------------------------------------------------------------- */
function wireReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length || !("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((t) => observer.observe(t));
}

/* -------------------------------------------------------------------------
   Back-to-top
   ------------------------------------------------------------------------- */
function wireBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("is-visible", window.scrollY > 700),
    { passive: true }
  );
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* -------------------------------------------------------------------------
   Contact form -> WhatsApp message
   ------------------------------------------------------------------------- */
function wireContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const business = (data.get("business") || "").toString().trim();
    const contact = (data.get("contact") || "").toString().trim();
    const product = (data.get("product") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const lines = [
      `Hello, my name is ${name || "[name]"}.`,
      business ? `Business: ${business}.` : null,
      product ? `I'm interested in: ${product}.` : null,
      message ? `Message: ${message}` : null,
      contact ? `You can reach me at: ${contact}.` : null
    ].filter(Boolean);

    window.open(buildWhatsAppLink(lines.join(" ")), "_blank", "noopener,noreferrer");
  });

  // Integration point: if you later add a backend or a service like
  // Formspree, POST `data` there instead of / in addition to opening
  // WhatsApp. Example:
  // fetch("https://formspree.io/f/YOUR_ID", { method: "POST", body: data });
}

/* -------------------------------------------------------------------------
   Footer year
   ------------------------------------------------------------------------- */
function wireFooterYear() {
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* -------------------------------------------------------------------------
   Smooth scroll for same-page anchors (skip already-native browsers)
   ------------------------------------------------------------------------- */
function wireAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  wireWhatsAppButtons();
  wireHeaderScroll();
  wireMobileNav();
  wireFaqAccordion();
  wireProductFilter();
  wireReveal();
  wireBackToTop();
  wireContactForm();
  wireFooterYear();
  wireAnchorScroll();
});
