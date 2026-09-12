# TapLink NFC — Website Source

A production-ready marketing website for a custom NFC & QR products
business, built entirely with **HTML5, CSS3 and vanilla JavaScript**.

There is **no build step, no framework, no server-side language, and no
Python.** Every file in this folder is exactly what gets uploaded to your
host — you can open any `.html` file in a text editor right now and see the
real markup that ships. This README explains the folder structure, how to
configure the site with your real business details, how to preview it, how
to deploy it to a free host, and how to make common edits safely (since
there's no generator doing it for you — every page is a real, independent
file).

---

## 1. What's in this folder

```
taplink-nfc-site/
├── styles.css                # All site styling, one file
├── script.js                 # All site behavior — SITE_CONFIG lives at the top
├── robots.txt
├── sitemap.xml
├── manifest.json
├── index.html
├── products.html
├── google-review-card.html
├── nfc-business-card.html
├── nfc-review-stand.html
├── nfc-social-card.html
├── nfc-menu.html
├── qr-products.html
├── custom-nfc-solutions.html
├── how-it-works.html
├── about.html
├── contact.html
├── faq.html
├── privacy-policy.html
├── terms.html
├── 404.html
└── assets/
    ├── icons/       # empty — reserved for any extra UI icons you add
    ├── images/       # empty — reserved for general site imagery
    └── products/     # SVG placeholder art — see section 5
```

16 real HTML pages, each a complete, self-contained document. Every page
`<link>`s the same `styles.css` and `<script>`s the same `script.js`, and
each has its own `<title>`, meta description, canonical URL, Open Graph
tags and JSON-LD structured data already written in.

---

## 2. Quick start — preview it locally

Because the pages reference absolute paths (`/styles.css`, `/script.js`,
`/assets/...`), they need to be served from the project's root folder,
not just opened as a bare `file://` link — a couple of things (mainly the
stylesheet and script) won't load if you just double-click `index.html`.

Pick whichever of these you already have installed. None are required to
deploy — they're only for looking at the site before you upload it.

**No install at all:** skip local preview and deploy straight to a free
host (section 3) — most of them give you a live URL within seconds of
uploading, which is often faster than setting up a local server anyway.

**VS Code:** install the free "Live Server" extension, right-click
`index.html` → "Open with Live Server".

**Node.js, if you have it:**
```bash
npx serve .
```
then open the URL it prints.

**PHP, if you have it:**
```bash
php -S localhost:8000
```
then open `http://localhost:8000/index.html`.

Any other static file server works the same way — the only requirement is
that it serves this folder as the web root.

---

## 3. Deploying to a free host

This site is plain static files, which is exactly what every free static
host wants. No build command, no install command, no environment variables
required.

### Netlify (drag-and-drop, easiest)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole `taplink-nfc-site` folder onto the page.
3. You get a live URL immediately. Add a custom domain later under **Site
   settings → Domain management** if you want.

### Cloudflare Pages
1. Create a project → "Direct Upload" (no Git needed).
2. Upload the folder contents.
3. Build command: leave blank. Output directory: `/` (project root).

### Vercel
1. `vercel` CLI or the dashboard's drag-and-drop deploy both work.
2. Framework preset: choose "Other" / no framework.
3. Build command: leave blank. Output directory: `.`

### GitHub Pages
1. Push this folder's contents to a GitHub repo (root of the repo, or a
   `/docs` folder — either works).
2. Repo → **Settings → Pages** → choose the branch/folder → Save.
3. Your site publishes at `https://<username>.github.io/<repo>/`.
   Because GitHub Pages serves from a sub-path unless you use a custom
   domain, double-check the absolute `/styles.css`-style paths still
   resolve — if your repo isn't served from a domain root, either add a
   custom domain (recommended) or change the absolute paths to relative
   ones (see the note in section 7).

### Surge.sh
```bash
npx surge ./taplink-nfc-site
```
Follow the prompts — you get a live `.surge.sh` URL instantly.

All five options are free for a site this size.

---

## 4. Required setup before you launch

There are exactly three places with real information to fill in. Do these
first — everything else is optional polish.

### 4.1 `script.js` — your WhatsApp number and contact details

Open `script.js` and edit the object at the very top:

```js
const SITE_CONFIG = {
  businessName: "TapLink NFC",        // → your real business name
  whatsappNumber: "923001234567",      // → your real WhatsApp number
  phone: "",                           // optional — landline or alt number
  email: "hello@example.com",          // → your real email
  city: "",
  region: "",
  country: "Pakistan",
  website: "https://www.example.com",  // → your real domain
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  linkedin: "https://linkedin.com/"
};
```

**`whatsappNumber` format matters:** digits only, country code first, no
`+`, no spaces, no dashes. A number you'd normally write as
`+92 300 1234567` becomes `923001234567`.

Every "Order on WhatsApp" button, the floating WhatsApp bubble, and the
contact form all read from this one value — there's no other hardcoded
number anywhere in the code.

> `instagram` / `facebook` / `linkedin` / `email` in this object are kept
> for consistency and any future scripting, but the footer's actual visible
> email address and social links are written directly into each page's
> HTML (see 4.3 below) — update both places so they match.

### 4.2 Your domain, in every page's `<head>`

Each `.html` file has a `<link rel="canonical">`, Open Graph tags
(`og:url`, `og:image`, etc.) and JSON-LD structured data that reference
`https://www.example.com`. Since there's no generator, this has to be
updated with a find-and-replace across all 16 files.

**Fastest way — command line (Mac/Linux, or Windows with Git Bash/WSL):**
```bash
cd taplink-nfc-site
grep -rl "https://www.example.com" *.html *.xml *.txt | \
  xargs sed -i 's#https://www.example.com#https://YOURDOMAIN.com#g'
```
(On macOS, `sed -i` needs an empty backup extension: `sed -i '' 's#...#...#g'`.)

**No command line — VS Code:** press `Ctrl+Shift+H` (or `Cmd+Shift+H` on
Mac) to open "Replace in Files", search for `https://www.example.com`,
replace with your real domain, and check "*.html, *.xml, *.txt" isn't
excluded. Click "Replace All".

**No editor tools at all:** open each `.html` file, `Ctrl+F` for
`example.com`, and replace every match by hand. Tedious but works — there
are roughly 3–4 occurrences per page (canonical link, `og:url`, `og:image`,
and inside the JSON-LD block).

Also update the domain in:
- `robots.txt` (the `Sitemap:` line)
- `sitemap.xml` (every `<loc>` entry — there's a comment at the top marking
  where to change it)

### 4.3 Business name, email and socials in the footer

The footer (bottom of every page) has your brand name, email address and
social icons written directly into the HTML. Since every page repeats this
block, use the same find-and-replace approach as above:

| Find | Replace with |
|---|---|
| `TapLink NFC` | your real business name (appears in the header logo, footer, and page titles) |
| `hello@example.com` | your real email |
| `https://instagram.com/` | your real Instagram URL |
| `https://facebook.com/` | your real Facebook URL |
| `https://linkedin.com/` | your real LinkedIn URL |

All of these appear identically across all 16 pages, so a global
find-and-replace (VS Code's "Replace in Files", or the `sed` command from
4.2 with a different search/replace pair) is much faster and safer than
editing each page by hand.

---

## 5. Replacing the placeholder product art

Everything under `assets/products/` is hand-drawn SVG line art standing in
for real product photography — a card icon, a stand icon, a QR icon, and so
on, plus the hero illustration used on the homepage. They're deliberately
simple so the site works and looks intentional immediately, but they are
placeholders, not your actual products.

To swap in real photos:

1. Photograph or render your actual cards/stands/tags. Square-ish or 4:3
   images work best with the existing layout (the CSS uses
   `object-fit: contain` in `.product-card__media` and
   `.product-hero__media`, so images won't distort — they'll just be
   letterboxed if the aspect ratio is very different).
2. Save them as `.webp` (add a `.jpg` fallback if you need older-browser
   support) with descriptive filenames, for example:
   - `nfc-google-review-card.webp`
   - `nfc-google-review-stand.webp`
   - `custom-nfc-business-card.webp`
   - `nfc-menu-card.webp`
   - `qr-review-stand.webp`
3. Drop them into `assets/products/`.
4. In each `.html` file, find the `<img>` tag(s) pointing at the old
   placeholder (e.g. `src="/assets/products/card-icon.svg"`) and change the
   `src` to your new filename. Update the `alt` text too if the new photo
   shows something more specific than the placeholder icon did.
5. Product cards appear on multiple pages (homepage grid, `products.html`,
   `qr-products.html`, and each product's own "related products" section)
   — if you want a single product's image updated everywhere it appears,
   you'll need to repeat the change on each page it's used, since there's
   no shared template generating them.
6. Swap the Open Graph image too — search each `.html` file for
   `og:image` and `twitter:image` (currently pointing at
   `tap-connection-hero.svg`) and point it at a real 1200×630 JPG/PNG once
   you have one. Social previews render more reliably with a raster image
   than an SVG on some platforms.

---

## 6. Filling in the blanks in Terms & Privacy

`terms.html` and `privacy-policy.html` intentionally contain bracketed
placeholders like `[Add your payment terms here]`, plus a
`[add date before publishing]` "last updated" line. These weren't invented
because they're legal/business specifics only you can decide — payment
methods, shipping and returns policy, and so on. Open both files, search for
square brackets, and replace them with your real policy text.

---

## 7. Making common edits (no generator — direct file edits)

Every page is a standalone file. There's no build script regenerating them,
which means two things: you can edit any single page freely without
worrying about breaking others, **and** anything that appears on every
page (header, footer, nav, WhatsApp button) has to be changed on every page
individually if you want it updated everywhere.

### Editing something that appears on ONE page
Just open that `.html` file and edit the text directly. Standard HTML — no
special syntax, no template tags.

### Editing something that appears on ALL pages (nav links, footer, header)
Use "Replace in Files" (VS Code: `Ctrl+Shift+H` / `Cmd+Shift+H`) across
`*.html`, or the `sed` one-liner from section 4.2, targeting the exact text
you want to change. Test on one file first if you're not fully sure the
search text is unique enough, then apply to all.

### Adding a new product
1. Duplicate the product-card block on `products.html` (look for
   `<div class="product-card" data-category="...">`) and paste it in the
   grid.
2. Update its name, description, image, category, and the WhatsApp link
   (`data-wa-message="..."` attribute) inside the copied block.
3. If you want it to also show on the homepage's featured grid or on
   `qr-products.html`, copy the same block there too.
4. If it deserves its own full landing page (like `nfc-menu.html`), the
   fastest way is to duplicate the closest existing product page (e.g.
   copy `nfc-business-card.html` to `nfc-new-product.html`) and edit its
   content, since all product pages already share the same section
   structure (hero, how-it-works, benefits, destinations, customization,
   ideal-for, FAQ, related products, CTA).
5. Add a link to the new page from `products.html`, the footer, and
   anywhere else relevant, plus a new `<url>` entry in `sitemap.xml`.

### Adding a brand-new page
1. Copy the closest existing page as a starting point (e.g. copy
   `about.html` for a simple content page, or one of the product pages for
   something with a hero + sections structure).
2. Update `<title>`, meta description, canonical URL, and Open Graph tags
   in the `<head>`.
3. Update the JSON-LD `BreadcrumbList` block near the top of the `<main>`
   if you're keeping breadcrumbs.
4. Add a nav link for it in the header/footer across all pages if it
   should be reachable from the main menu (see "Editing something that
   appears on ALL pages" above).
5. Add it to `sitemap.xml`.

### Changing colors, fonts or spacing
Everything is controlled from CSS variables at the top of `styles.css`
under `:root` — change a value once there and it updates across the whole
site, since every page shares this one file:

```css
--bg: #FAFAF8;         /* page background */
--ink: #16181B;         /* primary text / dark surfaces */
--accent: #146356;      /* the one brand accent color, used sparingly */
--font-display: "Space Grotesk", "Segoe UI", Arial, sans-serif;  /* headings */
--font-body: "Inter", "Segoe UI", Arial, sans-serif;             /* body text */
```

### If you deploy somewhere that doesn't serve from the domain root
(e.g. GitHub Pages without a custom domain, where your site lives at
`https://username.github.io/repo-name/` instead of the root). The absolute
paths used throughout (`/styles.css`, `/script.js`, `/assets/...`,
`/index.html` in links) assume the site is served from `/`. If it isn't,
either:
- add a custom domain in your host's settings (recommended — also fixes
  the canonical URLs from section 4.2 needing to match), or
- do a global find-and-replace changing leading `/` in `href`/`src`
  attributes to relative paths (e.g. `/styles.css` → `styles.css`,
  `/products.html` → `products.html`). Be careful to only touch actual
  `src="/..."` and `href="/..."` attributes, not the `https://...` URLs in
  meta tags — a careless global replace of just `/` will break those too.

---

## 8. Adding a backend to the contact form (optional)

Right now, `contact.html`'s form doesn't send data to any server —
submitting it builds a WhatsApp message from what was typed and opens
`wa.me` with it pre-filled (see `wireContactForm()` in `script.js`). This
needs zero backend and was the preferred approach for this site.

If you'd rather also collect submissions on a server (e.g. into an email
inbox or spreadsheet), there's a marked integration point inside
`wireContactForm()` in `script.js`:

```js
// Integration point: if you later add a backend or a service like
// Formspree, POST `data` there instead of / in addition to opening
// WhatsApp. Example:
// fetch("https://formspree.io/f/YOUR_ID", { method: "POST", body: data });
```

Uncomment and point that `fetch()` at your form endpoint — Formspree (free
tier available, no backend needed on your side), a serverless function, or
your own API. `data` is already a `FormData` object built from the form's
fields, ready to send.

---

## 9. Accessibility & performance notes (already handled)

- Keyboard focus is visible everywhere (`:focus-visible` in `styles.css`).
- `prefers-reduced-motion` disables the reveal-on-scroll animation and
  smooth-scroll for anyone with that OS setting on.
- The mobile nav toggle and FAQ accordion buttons use proper
  `aria-expanded` / `aria-controls` wiring.
- Product and hero images use `loading="lazy"` where they sit below the
  fold, and every image has descriptive `alt` text.
- `font-display: swap` is set on the Google Fonts `<link>`, with system
  font fallbacks specified, to avoid invisible-text flashes.

If you add new images, keep specifying `width`/`height` attributes (as the
existing markup does) to avoid layout shift, and keep new below-the-fold
images `loading="lazy"`.

---

## 10. Pre-launch checklist

- [ ] `whatsappNumber` in `script.js` is your real number, digits only
- [ ] Domain updated in every page's canonical/OG/JSON-LD tags, plus
      `robots.txt` and `sitemap.xml` (section 4.2)
- [ ] Business name, email and social links updated in the footer across
      all pages (section 4.3)
- [ ] Real logo and product photos have replaced the placeholder SVGs
      (section 5)
- [ ] Bracketed placeholders in `terms.html` and `privacy-policy.html` are
      filled in (section 6)
- [ ] Site previewed on an actual free host (section 3) — links, WhatsApp
      buttons and images all confirmed working on the live URL, not just
      locally

---

## 11. Troubleshooting

**Styles look broken / unstyled page when I open the file directly.**
You opened it as a bare `file://` link. Serve the folder with a local
server (section 2), or just deploy it (section 3) and check the live URL —
absolute paths resolve correctly once served from a proper root.

**WhatsApp button goes to a "number not found" page.**
`whatsappNumber` in `script.js` still has the placeholder value, or is
formatted with a `+`, spaces, or dashes. It must be digits only, country
code first — e.g. `923001234567`, not `+92 300 1234567`.

**I changed something on one page but it didn't show up on another page
that looks the same.**
There's no shared template — every page is an independent file. Anything
that repeats across pages (header, footer, nav) needs to be changed on
each page, ideally via a global find-and-replace (section 7).

**GitHub Pages site loads but nothing is styled and links 404.**
You're being served from a sub-path (`/repo-name/`) rather than the domain
root, and this site's absolute paths assume the root. Add a custom domain,
or switch the paths to relative (see the note at the end of section 7).
