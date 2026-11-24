# Senad Ličina: CV and website

One content file, two outputs: a motion website and a two-page CV, both in German and English.

```
site/
  index.html   styles.css   app.js    the website (no framework, no build step)
  cv.html      cv.css       cv.js     the CV as a web page, A4, print-ready
  content.js                          ALL text, DE and EN. Edit here.
  cv/                                 the rendered PDFs
  assets/                             fonts (Anton, Fira Sans, both OFL) and the portrait
scripts/
  serve.mjs                           static dev server for site/
  build-pdf.mjs                       renders cv.html to PDF in both languages
  build-standalone.mjs                packs the website into a single HTML file
dist/senad-licina-standalone.html     the packed website
```

## Run it

```
bun install
bun run dev            # serves site/ on http://127.0.0.1:3000 (PORT= to change)
```

Or just open `site/index.html`. Useful URLs: `?lang=de`, `?lang=en`, `?uv` (starts with the blacklight on).

## Change something

1. Edit `site/content.js`. Website and CV both read from it.
2. `bunx playwright install chromium` (once), then `bun run pdf`.
3. `bun run standalone` if you want the single-file version again.

Without Bun: open `site/cv.html?lang=de` in Chrome and print to PDF (margins: none, background graphics: on).

Switches in `content.js > meta`:

- `showNeuro: false` removes the AuDHD lines from the website and the CV.
- `website: "licina.eu"` prints your URL in the CV footer and header.
- `linkedin` is linked in the website footer and the CV header. Empty string removes it.
- The phone number is only ever used in the CV, never on the website.

## Check before you send it anywhere

These came from your old CV and from what I know about your current work. Confirm them:

- **Plath start year.** Set to 2025. Your old CV did not list Plath, so this is an estimate.
- **Geoparadise and Ličina & Helms** are listed as ongoing ("now"), as in your old CV.
- **Sparkassen Innovation Hub** is 2016 to 2020. Your German draft said 2020 to 2022, which looked like a copy of the Wallis dates.
- **Plath details.** Hardware, Harvester/RKE2, the internal assistant: make sure you may name these publicly. Internal product names are deliberately left out.
- **Numbers are missing.** Users on the platform, tokens per second, GPUs, team size, anything you saved or sped up. Two or three real figures in the Plath bullets will do more than any redesign.

## Deploy

`site/` is static. Push it to GitHub Pages, Netlify, Cloudflare Pages or any web server. A public site run from Germany needs an Impressum.

## Design notes

- Grey is the studio backdrop of the portrait, olive is the shirt. The portrait is cut out (`assets/img/portrait.webp`).
- Blacklight is the second state: same page, fluorescent inks, side notes that only show under UV, and a 145 bpm pulse in the dot field.
- The hero field is a lattice (order) with turbulence passing through it (chaos). The pointer disturbs it.
