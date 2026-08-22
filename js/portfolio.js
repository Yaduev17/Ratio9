/**
 * Filters the portfolio grid by category. The project cards themselves
 * are written directly into work.html (real images, real content) —
 * this script only shows/hides them by their data-category attribute.
 * Loaded on work.html only.
 */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("portfolio-grid");
  const empty = document.getElementById("portfolio-empty");
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (!grid) return;

  const cards = Array.from(grid.children);

  function applyFilter(category) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function showMatching() {
      let visibleCount = 0;
      cards.forEach((card) => {
        const matches = category === "All" || card.dataset.category === category;
        card.style.display = matches ? "" : "none";
        if (matches) visibleCount++;
      });
      if (empty) empty.style.display = visibleCount === 0 ? "block" : "none";
    }

    if (reduced || typeof gsap === "undefined") {
      showMatching();
      return;
    }

    gsap.to(cards, {
      opacity: 0,
      y: 16,
      duration: 0.25,
      stagger: 0.015,
      ease: "power2.in",
      onComplete: () => {
        showMatching();
        const visibleCards = cards.filter((c) => c.style.display !== "none");
        gsap.fromTo(
          visibleCards,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out" }
        );
      },
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyFilter(btn.dataset.category);
    });
  });
});
