/**
 * ============================================================================
 *  EVERYTHING BELOW IS PLAIN TEXT — SAFE TO EDIT, NO CODING KNOWLEDGE NEEDED.
 * ============================================================================
 *  This file feeds EVERY page on the site at once (home, services, process,
 *  contact, and the footer on every page) — that's why phone/email/address
 *  aren't just typed into the HTML files: change it once here instead of
 *  hunting through 8 different HTML files.
 *
 *  Only ever change the text between the "" quote marks. Don't remove
 *  commas, colons or curly braces { } — the page will break if you do.
 *
 *  Team member photos/bios are NOT here — those live directly in
 *  about.html (search for "team-grid") since you asked to edit those by
 *  hand in plain HTML. See the comment above #team-grid in about.html.
 * ============================================================================
 */

const siteConfig = {
  // ↓↓↓ CHANGE YOUR CONTACT DETAILS HERE ↓↓↓
  email: "hello@ratio9.in",
  phone: { display: "+91 8281 700 662", href: "+918281700662" }, // "href" = same number, digits only (no spaces/symbols), used for the click-to-call link
  location: "Kozhikode / Kochi", // shown in the footer + contact page; can be a full address too, e.g. "123 Business Bay, Dubai, UAE"
  socials: [
    // Set each url to your real profile link. Leave as "#" to hide the broken-link warning but keep the label showing.
    { label: "Instagram", url: "#" },
    { label: "Behance", url: "#" },
    { label: "YouTube", url: "#" },
    { label: "LinkedIn", url: "#" },
  ],
  trustedBy: ["LUMEN", "VERTEX", "SYNQ", "APEX", "NEXORA"], // logos/names in the "trusted by" strip on the homepage — edit, add, or remove entries freely

  // Cities shown on the Locations page and in the footer's "serving" line —
  // used for local SEO, so keep real place names only.
  serviceAreas: ["Kozhikode", "Kochi", "Malappuram", "Thrissur", "Palakkad", "Kannur", "Coimbatore", "Chennai", "Mangalore"],
};

const services = [
  { id: "web", number: "01", title: "Web Design & Development", description: "Websites and web apps engineered for performance, built on modern, scalable front ends.", icon: "web" },
  { id: "uiux", number: "02", title: "UI/UX Design", description: "User-centered interfaces that make complex products feel effortless to use.", icon: "uiux" },
  { id: "branding", number: "03", title: "Graphic Design & Branding", description: "Strategic identity systems and visual language that carry a brand across every touchpoint.", icon: "branding" },
  { id: "motion", number: "04", title: "Motion Graphics & Animation", description: "Stunning motion, animation and visual effects that bring static ideas to life.", icon: "motion" },
  { id: "film", number: "05", title: "Film & Video Production", description: "Cinematic video production that tells brand stories with intention and craft.", icon: "film" },
  { id: "photography", number: "06", title: "Photography", description: "Commercial, product and creative photography with an editorial eye.", icon: "photo" },
  { id: "marketing", number: "07", title: "Digital Marketing", description: "Strategy, content and campaigns engineered for growth and measurable engagement.", icon: "marketing" },
  { id: "ai", number: "08", title: "AI Creative", description: "AI-assisted visuals, video and content production that accelerates the creative process.", icon: "ai" },
  { id: "architecture", number: "09", title: "Architecture & Visualization", description: "Architectural design and photoreal 3D visualization, offered alongside our core practice.", icon: "architecture", secondary: true },
];


const processStages = [
  { number: "01", title: "Discover", stage: "discover", duration: "Week 1", description: "We study the brand, the market and the audience before a single pixel is placed." },
  { number: "02", title: "Define", stage: "define", duration: "Week 1–2", description: "Strategy, scope and success metrics are locked so the whole team is aligned." },
  { number: "03", title: "Design", stage: "design", duration: "Week 2–4", description: "Concepts, systems and prototypes take shape across design and motion." },
  { number: "04", title: "Develop", stage: "develop", duration: "Week 4–7", description: "Engineering brings the design to life as a fast, resilient, production build." },
  { number: "05", title: "Deliver", stage: "deliver", duration: "Week 8+", description: "We launch, measure and refine, staying close to the results after go-live." },
];



