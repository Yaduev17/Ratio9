/**
 * Hero-only behavior: auto-advancing background slider, entrance
 * animation for the headline/CTAs, and the idle float/rotate on the
 * signature "9" mark. Loaded only on index.html.
 */

const HERO_AUTO_ADVANCE_MS = 3000;

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dots button");
  if (!slides.length) return;

  let active = 0;

  function show(index) {
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    active = index;
  }

  dots.forEach((dot, i) => dot.addEventListener("click", () => show(i)));

  window.setInterval(() => {
    show((active + 1) % slides.length);
  }, HERO_AUTO_ADVANCE_MS);
}

function initHeroEntrance() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lines = document.querySelectorAll(".hero-headline .line");
  const eyebrow = document.querySelector(".hero-eyebrow");
  const sub = document.querySelector(".hero-sub");
  const actions = document.querySelector(".hero-actions");
  const nine = document.querySelector(".nine-wrap");

  if (reduced || typeof gsap === "undefined") {
    [eyebrow, sub, actions, nine, ...lines].forEach((el) => el && (el.style.opacity = "1"));
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  gsap.set(nine, { opacity: 0, scale: 0.9, y: 20 });

  if (eyebrow) tl.from(eyebrow, { opacity: 0, y: 16, duration: 0.6 });
  if (lines.length) tl.from(lines, { opacity: 0, y: 48, duration: 0.9, stagger: 0.12 }, "-=0.25");
  if (sub) tl.from(sub, { opacity: 0, y: 20, duration: 0.7 }, "-=0.5");
  if (actions) tl.from(actions, { opacity: 0, y: 16, duration: 0.6 }, "-=0.45");
  if (nine) tl.to(nine, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power4.out" }, "-=1.1");
}

function initNineFloat() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nine = document.querySelector(".nine-wrap");
  if (reduced || !nine || typeof gsap === "undefined") return;

  // A slow, gentle vertical drift plus a very subtle scale breathing —
  // deliberately no rotation, which read as jittery at this size.
  gsap.to(nine, {
    y: -10,
    duration: 5.5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
  gsap.to(nine, {
    scale: 1.015,
    transformOrigin: "50% 50%",
    duration: 5.5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 0.4,
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  initHeroEntrance();
  initNineFloat();
});
