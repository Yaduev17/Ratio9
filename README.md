# RATIO9 — Vanilla HTML / CSS / JS build

## Quick edits (no coding needed)

**Phone / email / studio address / social links** — open
[`js/data.js`](js/data.js) in any text editor (Notepad works). Right at
the top is a block called `siteConfig` with clearly labeled lines like:

```js
email: "hello@ratio9.studio",
phone: { display: "+1 234 567 8900", href: "+12345678900" },
location: "Dubai, UAE",
```

Change the text between the quote marks and save — that one file
updates the number/email/address everywhere it appears on the site
(every page's footer, plus the Contact page). You don't need to touch
any `.html` file for these.

**Team members** — open [`about.html`](about.html) and search for
`team-grid`. Each person is one `<article class="team-card">` block
with their photo, name, role, short bio and links, all in plain HTML.
To **remove** someone, delete their whole `<article>...</article>`
block. To **add** someone, copy an existing block, paste it below the
last one, and swap the photo path, name, role, bio and links. To
**change a photo**, either replace the file in `assets/` and keep the
same filename, or point `src="..."` at a new filename in `assets/`
(don't use a full `C:\...` file path — it only works on your own PC;
use a relative path like `assets/yourphoto.jpg` instead).

**SEO note**: every page's `<head>` also has a block of business info wrapped
in `<script type="application/ld+json">` (this is what lets Google show
rich results — it's not visible on the page). It repeats the phone, email
and address from `siteConfig` in `js/data.js` as plain JSON, because this
site has no build step to keep the two in sync automatically. **If you
change the phone/email/address in `js/data.js`, also update the matching
`"telephone"`, `"email"` and `"address"` values inside that JSON-LD block
on every page** (Find & Replace across all `.html` files in your editor is
the fastest way). The cities in `serviceAreas` (`js/data.js`) work the same
way — they're echoed inside the JSON-LD `"areaServed"` list on every page
and inside `locations.html`'s page content.

---


Same site as the React version, rebuilt with plain HTML, CSS and
JavaScript — no build step, no npm install. Every nav link is a real
page (not a hash anchor):

| Page | File |
|---|---|
| Home | `index.html` |
| Services | `services.html` |
| Work (archive + filtering) | `work.html` |
| Project detail | `project.html?slug=nexora-digital` (etc.) |
| About + Team | `about.html` |
| Process | `process.html` |
| Contact | `contact.html` |

## Running it

Because every page uses **relative paths** (`css/style.css`,
`js/main.js`, `services.html`, …) you can open `index.html` directly
in a browser by double-clicking it — no server required. That said, a
local server gives a slightly more accurate preview (some browsers are
stricter about local file permissions), so if you have one handy:

```bash
# any of these work — pick whichever you have installed
npx serve .
python -m http.server 8000
# then open http://localhost:8000
```

## Editing content

**Images live directly in each page's HTML now** — not in a JS data
file — specifically so you can find and swap `<img src="...">` by hand
at deployment time:

- **Team photos** → `about.html`, inside `#team-grid`
- **Portfolio thumbnails** → `work.html` (`#portfolio-grid`) and
  `index.html` (`#featured-projects`) — both contain the same cards
- **Project case-study images** → `project-skytrav.html` (hero image
  + gallery)
- **Hero background slides** → `index.html`, inside `.hero-bg`

Everything **not** image-related still lives in **`js/data.js`**:

- `siteConfig` — email, phone, address, socials, "trusted by" logos
- `services` — the 9 service cards
- `processStages` — the 5 process steps

### Current real content — and what's still a placeholder

- **Team** (`about.html`): Yadu Krishnan E V and Akshay CP, with their
  real photos hotlinked from their own sites (`yaduev.in` and
  `akshaycp.online`). **Before launch, download both images and host
  them locally** (e.g. `assets/team/`) — hotlinking someone else's
  site is fragile (their image can move or the site can go down) and
  isn't something to rely on in production.
- **Portfolio**: SkyTrav (`project-skytrav.html`) is a real case study
  with real screenshots pulled from `skytrav.in`. The four
  Akshay‑CP‑credited cards (Footwear Drop, Travel Reel, Fintech App,
  AI Short Film) use their **real project titles** but a **placeholder
  thumbnail image** — I don't have direct access to his exported
  project files, only his public site pages, so each card is marked
  with a `TODO` comment in the HTML and links out to
  [behance.net/akshay_cp](https://www.behance.net/akshay_cp) for now.
  Swap in the real exports and point the cards to internal
  `project-*.html` pages (copy `project-skytrav.html` as a starting
  template) whenever you have the assets.

## The "9" mark

- **Font**: now set via the `--font-nine` CSS variable in
  `css/style.css` — currently `'Clash Display', 'Poppins', sans-serif`.
  Poppins (bold/black weight) is the free fallback loaded from Google
  Fonts; add the licensed Clash Display file and it'll pick that up
  automatically (see the "Fonts" note below). To try a different font
  entirely, just change that one variable.
- **Floating animation**: in `js/hero.js`, `initNineFloat()` — a slow
  vertical drift plus a very subtle scale breathe, no rotation (the
  earlier rotation read as jittery at this size). Adjust the `y`
  distance, `scale` amount, or `duration` there to taste.


## How it's wired together

- **`js/data.js`** — non-image content (contact info, services,
  process), loaded first on every page.
- **`js/render.js`** — renders services and process steps from that
  data (icons/text only — no photos, so nothing here needs hand
  editing at deployment time).
- **`js/main.js`** — shared behavior on every page: sticky nav,
  mobile menu, Lenis smooth scroll wired to GSAP's ticker, the
  generic `[data-reveal]` scroll-in animation, and filling in
  contact details/socials from `siteConfig` wherever they appear
  (e.g. in the footer, which is duplicated across every page since
  there's no template/include system in plain HTML).
- **`js/hero.js`** — homepage-only: the auto-advancing background
  slider, the entrance animation, and the "9" mark's float.
- **`js/portfolio.js`** — Work page: shows/hides the (static) project
  cards by category when a filter button is clicked. It no longer
  renders the cards themselves — those are real HTML now.
- **`js/contact-form.js`** — validates the contact form and calls
  `submitContactForm()`, which is intentionally isolated at the top
  of the file so you can point it at a real backend later without
  touching anything else.
- **`js/scroll-effects.js`** — GSAP ScrollTrigger bits: the Process
  page's animated connecting line, and the homepage marketing bar
  chart.

GSAP, ScrollTrigger and Lenis are loaded from CDN (`cdnjs`/`jsdelivr`)
via `<script>` tags at the bottom of each page — an internet
connection is needed the first time a page loads for the animations
to work, same as any CDN-based site.

## Before launch

1. **Real imagery/video.** Every image currently points at
   `picsum.photos` placeholders. Swap the URLs in `js/data.js` (and
   the hero slide `<img>` tags in `index.html`) for real photography,
   and give the showreel `<video><source src="…">` a real file.
2. **Fonts.** The "9" mark and headings use `Space Grotesk` (a free
   Google Font, already linked). If you get the licensed **Clash
   Display** family from fontshare.com, drop the woff2 into
   `assets/fonts/` and add an `@font-face` rule at the top of
   `css/style.css` — the `--font-nine` and `--font-display` variables
   already list `'Clash Display'` first, so it'll pick it up
   automatically once the file exists.
3. **Contact form backend.** `js/contact-form.js` → `submitContactForm()`.
4. **Domain.** `sitemap.xml` and the Open Graph tags assume
   `ratio9.studio` — update once you have a real domain.

## Why this avoids the earlier Vite errors

This build intentionally has none of the moving parts that caused the
React/Vite issues you ran into — no `npm install`, no bundler alias
resolution, no build tool version drift. Every `<script src="js/...">`
tag is just a plain file the browser loads directly.
