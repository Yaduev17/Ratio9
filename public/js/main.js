/**
 * Shared behavior loaded on every page: sticky nav, mobile menu, Lenis
 * smooth scroll wired to GSAP's ticker, and a generic scroll-reveal
 * observer that any element with [data-reveal] or [data-reveal-card]
 * can opt into.
 */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenisInstance = null;

function initLenis() {
  if (prefersReducedMotion || typeof Lenis === "undefined") return;

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  if (typeof gsap !== "undefined") {
    // gsap.ticker reports elapsed time in SECONDS; Lenis expects a
    // millisecond timestamp. Multiplying by 1000 is required — without
    // it Lenis's internal delta-time calculation collapses and
    // scrolling appears to freeze.
    gsap.ticker.add((time) => lenisInstance.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (!toggle || !menu) return;

  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    if (lenisInstance) lenisInstance.start();
    if (typeof gsap !== "undefined") gsap.killTweensOf(menu);
    menu.style.clipPath = "inset(0 0 100% 0)";
  }

  function openMenu() {
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    // body alone isn't enough — Lenis drives scroll independently of
    // native overflow, so a swipe/scroll while the menu is opening can
    // race the clip-path animation and leave the menu looking stuck
    // half-open with the page showing through underneath.
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (lenisInstance) lenisInstance.stop();

    if (typeof gsap !== "undefined" && !prefersReducedMotion) {
      gsap.killTweensOf(menu);
      gsap.fromTo(
        menu,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.out" }
      );
      gsap.fromTo(
        menu.querySelectorAll("[data-menu-link]"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, delay: 0.2, ease: "power3.out" }
      );
    } else {
      menu.style.clipPath = "inset(0 0 0% 0)";
    }
  }

  toggle.addEventListener("click", () => {
    const willOpen = !menu.classList.contains("is-open");
    if (willOpen) openMenu();
    else closeMenu();
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const THEME_STORAGE_KEY = "ratio9-theme";

/**
 * Light/dark toggle. The actual theme is already applied before this runs
 * (see the inline script in <head> of every page, which sets data-theme
 * synchronously so there's no flash of the wrong theme) — this just wires
 * up the button to flip it and remember the choice.
 */
function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  function setLabel(theme) {
    toggle.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
  }
  setLabel(document.documentElement.getAttribute("data-theme") || "dark");

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    setLabel(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch (e) {
      /* localStorage unavailable (private browsing, etc.) — theme just won't persist */
    }
  });
}

/** Marks the current page's nav link with aria-current="page". */
function markActiveNavLink() {
  const current = document.body.dataset.page;
  if (!current) return;
  document.querySelectorAll(`[data-nav="${current}"]`).forEach((link) => {
    link.setAttribute("aria-current", "page");
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll("[data-reveal], [data-reveal-card]");
  if (!targets.length) return;

  if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
    targets.forEach((el) => el.classList.add("is-visible"));
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
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

function fillSiteInfo() {
  document.querySelectorAll("[data-site-email]").forEach((el) => {
    el.textContent = siteConfig.email;
    if (el.tagName === "A") el.href = `mailto:${siteConfig.email}`;
  });
  document.querySelectorAll("[data-site-phone]").forEach((el) => {
    el.textContent = siteConfig.phone.display;
    if (el.tagName === "A") el.href = `tel:${siteConfig.phone.href}`;
  });
  document.querySelectorAll("[data-site-location]").forEach((el) => {
    el.textContent = siteConfig.location;
  });

  const socialsEl = document.getElementById("footer-socials");
  if (socialsEl && typeof siteConfig !== "undefined") {
    socialsEl.innerHTML = siteConfig.socials
      .map((s) => `<a href="${s.url}" aria-label="${s.label}">${s.label}</a>`)
      .join("");
  }

  const trustEl = document.getElementById("hero-trustbar-brands");
  if (trustEl && typeof siteConfig !== "undefined") {
    trustEl.innerHTML = siteConfig.trustedBy.map((b) => `<span>${b}</span>`).join("");
  }

  document.querySelectorAll("[data-service-areas]").forEach((el) => {
    el.textContent = siteConfig.serviceAreas.join(", ");
  });
}

function setFooterYear() {
  const el = document.querySelector("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  initLenis();
  initNavbar();
  initThemeToggle();
  markActiveNavLink();
  initScrollReveal();
  fillSiteInfo();
  setFooterYear();
});
