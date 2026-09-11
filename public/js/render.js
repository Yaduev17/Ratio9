/**
 * Render helpers for the sections that are still data-driven: Services
 * (vector icons, no photos) and Process (text only). Team and Portfolio
 * are NOT rendered from here anymore — those contain real photography,
 * so their markup (including every <img> tag) is written directly into
 * about.html / work.html / index.html / the individual project-*.html
 * pages, so you can find and swap image src attributes by hand at
 * deployment time without touching JavaScript.
 */

const SERVICE_ICON_PATHS = {
  web: "M3 5h18M3 5v14h18V5M3 5l4 4M7 9h10",
  uiux: "M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 14h7v6H4z",
  branding: "M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z",
  motion: "M4 12a8 8 0 1116 0M4 12a8 8 0 008 8M4 12H2m2 0l2-2m-2 2l2 2",
  film: "M3 6h18v12H3zM3 10h18M8 6v4M14 6v4",
  photo: "M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 100-8 4 4 0 000 8z",
  marketing: "M3 17l6-6 4 4 8-8M21 7v6M21 7h-6",
  ai: "M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2M9 12a3 3 0 106 0 3 3 0 00-6 0z",
  architecture: "M4 21V9l8-6 8 6v12M9 21v-8h6v8",
};

/** Slightly different accent per card so the grid doesn't read as one flat sheet. */
const SERVICE_ACCENTS = ["lime", "violet", "lime", "violet", "lime", "violet", "lime", "violet", "lime"];

function serviceIconSvg(icon) {
  const d = SERVICE_ICON_PATHS[icon] || SERVICE_ICON_PATHS.web;
  return `<svg class="service-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="${d}" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

/** Renders the service cards into the given container element. */
function renderServices(container, { reveal = true } = {}) {
  if (!container) return;
  container.innerHTML = services
    .map(
      (s, i) => `
    <article class="service-card${s.secondary ? " is-secondary" : ""}" data-accent="${SERVICE_ACCENTS[i % SERVICE_ACCENTS.length]}"${reveal ? " data-reveal-card" : ""}>
      <span class="service-card-ghost-number" aria-hidden="true">${s.number}</span>
      <div class="service-card-top">
        <span class="service-icon-badge">${serviceIconSvg(s.icon)}</span>
        <span class="service-number">${s.number}</span>
      </div>
      <div>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
      </div>
      <div class="service-more">
        Learn more
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <span class="service-underline"></span>
    </article>`
    )
    .join("");
}

const PROCESS_ICON_PATHS = {
  discover: '<circle cx="10" cy="10" r="6.5" stroke="currentColor" stroke-width="1.4"/><path d="M14.7 14.7L20 20" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  define: '<circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
  design: '<path d="M4 20l.9-3.9L15.6 5.4a1.8 1.8 0 012.6 0l.4.4a1.8 1.8 0 010 2.6L8 19.1 4 20z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M14 7l3 3" stroke="currentColor" stroke-width="1.4"/>',
  develop: '<path d="M9 8l-5 4 5 4M15 8l5 4-5 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
  deliver: '<path d="M12 2.5c2.8 1.9 4.5 5.4 4.5 9 0 2-.9 3.9-1.9 5l-2.6 2.6-2.6-2.6c-1-1.1-1.9-3-1.9-5 0-3.6 1.7-7.1 4.5-9z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M8.8 15.5L6 18.3M15.2 15.5L18 18.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="12" cy="10.5" r="1.6" stroke="currentColor" stroke-width="1.4"/>',
};

function processIconSvg(stage) {
  const inner = PROCESS_ICON_PATHS[stage] || PROCESS_ICON_PATHS.discover;
  return `<svg class="process-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">${inner}</svg>`;
}

/** Renders the process stages plus the animated connecting line. */
function renderProcess(container) {
  if (!container) return;
  container.innerHTML = processStages
    .map(
      (stage) => `
    <div class="process-stage" data-stage data-reveal>
      <span class="process-dot"></span>
      <div class="process-stage-card">
        <span class="process-stage-ghost-number" aria-hidden="true">${stage.number}</span>
        <div class="process-stage-top">
          <span class="process-icon-badge">${processIconSvg(stage.stage)}</span>
          <p class="number">${stage.number}</p>
        </div>
        <h3>${stage.title}</h3>
        <p>${stage.description}</p>
        ${stage.duration ? `<span class="process-duration">${stage.duration}</span>` : ""}
      </div>
    </div>`
    )
    .join("");
}
