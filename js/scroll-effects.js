/**
 * Small scroll-triggered effects that need GSAP ScrollTrigger:
 * the process timeline's connecting line, and the marketing section's
 * animated bar chart. Safe to include on any page — each function
 * checks for its target before doing anything.
 */

document.addEventListener("DOMContentLoaded", () => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typeof gsap === "undefined") return;
  if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

  // Process connecting line
  const processTrack = document.querySelector(".process-track");
  const processLine = document.querySelector(".process-line-fg");
  if (processTrack && processLine) {
    if (reduced || typeof ScrollTrigger === "undefined") {
      gsap.set(processLine, { scaleX: 1 });
    } else {
      gsap.set(processLine, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(processLine, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: processTrack, start: "top 70%", end: "bottom 60%", scrub: true },
      });
    }
  }

  // Marketing bar chart
  const chartBars = document.querySelectorAll(".chart-bar");
  if (chartBars.length) {
    if (reduced || typeof ScrollTrigger === "undefined") {
      chartBars.forEach((bar) => bar.classList.add("is-visible"));
    } else {
      ScrollTrigger.create({
        trigger: chartBars[0].closest(".chart-bars"),
        start: "top 80%",
        once: true,
        onEnter: () => chartBars.forEach((bar, i) => {
          gsap.delayedCall(i * 0.08, () => bar.classList.add("is-visible"));
        }),
      });
    }
  }
});
