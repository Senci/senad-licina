# Senad Ličina: website and CV

One content file, two outputs: a motion website and a two-page A4 CV, both in German and English.
No framework and no libraries in the page. Bun runs the dev server; Playwright renders the CV PDFs and bakes the page into static HTML for search engines.

## Quick start

```
bun install
bun run dev
```

The site is then on http://127.0.0.1:3000 (`PORT=4000 bun run dev` to change the port). Opening `site/index.html` directly works too.

| URL | What |
|---|---|
| `/`, `/de` | Website in English or German. On `/` it follows the browser and moves the address to `/de` for German. `?lang=de` still works and is rewritten to `/de`. |
| `/?uv` | Website with the blacklight already on. |
| `/cv.html?lang=de` | The CV as a web page, print-ready. |

## Layout

```
site/                     everything that gets deployed
  content.js              ALL text, German and English. Edit here.
  index.html styles.css app.js    the website
  cv.html    cv.css     cv.js     the CV page
  cv/                     the rendered CV PDFs (linked from the website)
  assets/fonts/           Anton, Fira Sans, Caveat
  assets/img/             portrait, favicons, link-preview image
scripts/
  serve.mjs               static dev server for site/
  build-pdf.mjs           renders cv.html to PDF in both languages
  build-standalone.mjs    packs the website into one HTML file
  build-site.mjs          copies site/ to dist/site/ with the page baked to static HTML per language
  package.mjs             zips site/ for a Cloudflare Pages upload
  make-favicon.py         regenerates the SL favicons from the Anton font
dist/                     build output (standalone, site, zip), not tracked
```

## Commands

| Command | Does |
|---|---|
| `bun run dev` | Serves `site/` and restarts when `scripts/serve.mjs` changes. |
| `bun run setup` | Downloads the headless Chromium that `pdf` needs. Once, and again after a Playwright update. |
| `bun run pdf` | Writes `site/cv/Senad_Licina_CV_{DE,EN}.pdf`. |
| `bun run standalone` | Writes `dist/senad-licina-standalone.html`, fonts and portrait inlined. Good as a mail attachment. |
| `bun run site` | Writes `dist/site/`: `site/` plus the rendered page as static HTML, `index.html` (English) and `de.html` (German). |
| `bun run build` | `pdf`, `standalone`, then `site`. |
| `bun run package` | `pdf`, `site`, then zips `dist/site/` to `dist/senad-licina-cloudflare.zip` for a Cloudflare Pages upload. Needs `zip`. |

Without Bun: open `site/cv.html?lang=de` in Chrome and print to PDF (margins: none, background graphics: on).

## Editing content

1. Edit `site/content.js`. Website and CV both render from it, so every text exists once per language.
2. Run `bun run build`.
3. Check that each PDF still has two pages. The CV pages have a fixed height, so text that is too long runs into the page footer instead of flowing on.
4. Commit `site/` including the PDFs.

What lives where in `content.js`:

| Key | Used for |
|---|---|
| `meta.showNeuro` | `false` removes the AuDHD lines from website and CV. |
| `meta.website` | For example `"licina.eu"`. Printed in the CV header and footer when set. |
| `meta.phone` | CV only, never on the website. |
| `meta.links` | Profile icons in the website footer. `cv: true` also prints the link in the CV header. A new icon needs a `b-<name>` symbol in `index.html`. |
| `<lang>.sections` | Short section names for the top bar. |
| `<lang>.stack` | The stack diagram. `stack.ask` is the script for "Ask the stack". |
| `<lang>.path`, `<lang>.education` | Jobs, earlier roles, degrees. Website timeline and CV. |
| `<lang>.weird`, `<lang>.talk` | Website only. |
| `<lang>.notes` | The handwritten side notes that only show under blacklight. |
| `<lang>.cv` | CV-only text: profile, skills, languages, footer labels. |

A `\n` in a section title forces a line break there.

## How the site works

- **Two states.** Calm is studio grey and olive, taken from the portrait. Blacklight is the same page in fluorescent inks, with side notes that only show there. The switch is in the top bar and again in the Weird section.
- **Torch.** In the calm state, holding the mouse button anywhere shows the blacklight version in a circle around the pointer. Mouse only.
- **Hero.** The dot field starts scattered and settles into a lattice while the hero stays pinned for the first stretch of scrolling. The pointer disturbs it. A "Scroll" cue at the bottom shows there is more below.
- **Security.** The stack diagram has a third cross-cutting entry, the Security bar under all layers (third item in `stack.rails`). It is also in the CV figure, the request trace and the contact list.
- **Invisible ink.** Everything that only shows under blacklight or in the torch is set in a handwriting font (Caveat): the side notes (`notes` in `content.js`) and five couplets of the Free Software Song (words: Richard Stallman) scribbled under the sections (`meta.song`).
- **Ask the stack.** A scripted animation. It sends nothing anywhere and says so in its answer.
- **Sound.** Under blacklight, a Sound button starts a 145 bpm loop synthesized with Web Audio. There is no audio file, and it never starts by itself.
- **Top bar.** A progress line and the name of the current section.
- **Reduced motion.** With the system setting on, all animation is off and the hero is not pinned.
- **Search engines.** `app.js` writes title, description, canonical, link preview tags and schema.org `Person` data per language (`seo` and `meta.url`, `meta.knowsAbout` in `content.js`). `bun run site` bakes both languages into static HTML, so crawlers and link previews see the full text without running JavaScript. `hreflang` pairs `/` and `/de`; `robots.txt` and `sitemap.xml` sit in `site/`. The CV page and PDFs carry `noindex` because they hold the phone number.
- **No cookies, no tracking scripts, no external requests.** Fonts and icons are served from `site/`. The footer says so, and its "About this site" dialog lists what the page is made with, the credits, and the hosting (`about` in `content.js`). If an analytics script is ever added, both texts must change.

## Deploy

Deploy `dist/site/`, not `site/`: only the built copy has the static HTML and `de.html`. Cloudflare Pages serves `de.html` at `/de`; `site/_headers` sets the response headers there.

**Automatic:** every push to `master` runs `.github/workflows/deploy.yml`. It builds on GitHub Actions and uploads `dist/site/` with `wrangler pages deploy`. It needs, under Settings, Secrets and variables, Actions:

| Name | Kind | Value |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | secret | API token with the permission Account, Cloudflare Pages, Edit |
| `CLOUDFLARE_ACCOUNT_ID` | secret | Account ID from the Cloudflare dashboard |
| `CLOUDFLARE_PROJECT` | variable | Name of the Pages project |
| `CLOUDFLARE_BRANCH` | variable, optional | Production branch of the Pages project, `main` if unset |

Without them the workflow still builds and skips the upload.

**By hand:** `bun run package`, then upload `dist/senad-licina-cloudflare.zip` in the Pages project ("Upload assets").

## Credits

- Fonts: Anton, Fira Sans and Caveat, all under the SIL Open Font License. The licence texts are in `site/assets/fonts/`. Caveat is the 700 weight of the variable font from google/fonts, cut to Latin with `fonttools varLib.instancer` and `pyftsubset --flavor=woff`.
- Brand icons in the footer: outlines from Simple Icons (CC0).
- Handwritten lyrics: the Free Software Song, words by Richard Stallman. He and the FSF claim no copyright on it.
- Everything else, including the portrait and all text: Senad Ličina.
