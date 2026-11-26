# Senad Ličina: website and CV

[![Deploy](https://github.com/Senci/senad-licina/actions/workflows/deploy.yml/badge.svg)](https://github.com/Senci/senad-licina/actions/workflows/deploy.yml)
[![CI](https://github.com/Senci/senad-licina/actions/workflows/ci.yml/badge.svg)](https://github.com/Senci/senad-licina/actions/workflows/ci.yml)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Flicina.eu&label=licina.eu)](https://licina.eu)
[![License: MIT](https://img.shields.io/github/license/Senci/senad-licina)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/Senci/senad-licina)](https://github.com/Senci/senad-licina/commits/main)
![No framework](https://img.shields.io/badge/framework-none-6b7d2a)
[![Built with Bun](https://img.shields.io/badge/built_with-Bun-black?logo=bun)](https://bun.sh)

Live at **[licina.eu](https://licina.eu)** (English) and **[licina.eu/de](https://licina.eu/de)** (German).

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
| `/?uv` | Website with the blacklight already on. The address follows the switch. |
| `/?sound` | Blacklight on, and the beat starts with the first click or key press (browsers block audio before that). The address follows the Sound button. |
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
  package.mjs             zips dist/site/ for a manual upload
  make-favicon.py         regenerates the SL favicons from the Anton font
dist/                     build output (standalone, site, zip), not tracked
.github/                  deploy and CI workflows, Lighthouse config, Dependabot
wrangler.jsonc            the Cloudflare Worker that serves dist/site/
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
| `bun run package` | `pdf`, `site`, then zips `dist/site/` to `dist/senad-licina-cloudflare.zip` for a manual upload in the Cloudflare dashboard. Needs `zip`. |

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
- **Sound.** Under blacklight, a Sound button starts a 145 bpm loop synthesized with Web Audio. There is no audio file, and it never starts without a click or key press. Its slot in the top bar grows from zero width when the blacklight turns on, so the items left of it glide instead of jumping.
- **Top bar.** A progress line and the name of the current section.
- **Reduced motion.** With the system setting on, all animation is off and the hero is not pinned.
- **Search engines.** `app.js` writes title, description, canonical, link preview tags and schema.org `Person` data per language (`seo` and `meta.url`, `meta.knowsAbout` in `content.js`). `bun run site` bakes both languages into static HTML, so crawlers and link previews see the full text without running JavaScript. `hreflang` pairs `/` and `/de`; `robots.txt` and `sitemap.xml` sit in `site/`. The CV page and PDFs carry `noindex` because they hold the phone number.
- **No cookies, no tracking scripts, no external requests.** Fonts and icons are served from `site/`. The footer says so, and its "About this site" dialog lists what the page is made with, the credits, and the hosting (`about` in `content.js`). If an analytics script is ever added, both texts must change.

## Deploy

The site runs as the Cloudflare Worker `licina` with static assets (`wrangler.jsonc`). Deploy `dist/site/`, not `site/`: only the built copy has the static HTML and `de.html`. The Worker serves `de.html` at `/de`; `site/_headers` sets the response headers.

**Automatic:** every push to `main` runs `.github/workflows/deploy.yml`. It builds on GitHub Actions and runs `wrangler deploy`. It needs two secrets under Settings, Secrets and variables, Actions:

| Secret | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | API token with the permission Account, Workers Scripts, Edit |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID from the Cloudflare dashboard |

Without them the workflow still builds and skips the deploy. Custom domains stay as set in the dashboard.

**By hand:** `bun run site`, then `bunx wrangler deploy` (logs in through the browser).

## Repository automation

| What | Where | Does |
|---|---|---|
| Deploy | `.github/workflows/deploy.yml` | Every push to `main`: build, deploy `dist/site/` to the Cloudflare Worker. |
| CI | `.github/workflows/ci.yml` | Every pull request: build, then Lighthouse on `/` and `/de`. Report links are in the job log. |
| Dependency updates | `.github/dependabot.yml` | Weekly grouped PRs for the bun lockfile and the pinned Actions. CI builds each one; merge by hand. |
| Security | repository settings | Dependabot alerts and security updates, secret scanning with push protection, CodeQL default setup. |

## Credits

- Fonts: Anton, Fira Sans and Caveat, all under the SIL Open Font License. The licence texts are in `site/assets/fonts/`. Caveat is the 700 weight of the variable font from google/fonts, cut to Latin with `fonttools varLib.instancer` and `pyftsubset --flavor=woff`.
- Brand icons in the footer: outlines from Simple Icons (CC0).
- Handwritten lyrics: the Free Software Song, words by Richard Stallman. He and the FSF claim no copyright on it.
- Everything else, including the portrait and all text: Senad Ličina.

## License

The code (HTML, CSS, JavaScript, scripts) is under the [MIT License](LICENSE). Take it apart, build your own site on it.

Not covered by MIT: the portrait, the CV, and the text in `site/content.js` are mine; all rights reserved. Swap in your own before you publish a fork. The fonts keep their SIL Open Font License.

## Star history

[![Star history chart](https://api.star-history.com/svg?repos=Senci/senad-licina&type=Date)](https://star-history.com/#Senci/senad-licina&Date)
