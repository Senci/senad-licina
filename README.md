# Senad Ličina: website and CV

One content file, two outputs: a motion website and a two-page A4 CV, both in German and English.
No framework and no build step for the site itself. Bun is only used for the dev server and for rendering the PDFs.

## Quick start

```
bun install
bun run dev
```

The site is then on http://127.0.0.1:3000 (`PORT=4000 bun run dev` to change the port). Opening `site/index.html` directly works too.

| URL | What |
|---|---|
| `/?lang=de`, `/?lang=en` | Website in one language. Without `lang` it follows the browser. |
| `/?uv` | Website with the blacklight already on. |
| `/cv.html?lang=de` | The CV as a web page, print-ready. |

## Layout

```
site/                     everything that gets deployed
  content.js              ALL text, German and English. Edit here.
  index.html styles.css app.js    the website
  cv.html    cv.css     cv.js     the CV page
  cv/                     the rendered CV PDFs (linked from the website)
  assets/fonts/           Anton, Fira Sans
  assets/img/             portrait, favicons, link-preview image
scripts/
  serve.mjs               static dev server for site/
  build-pdf.mjs           renders cv.html to PDF in both languages
  build-standalone.mjs    packs the website into one HTML file
  make-favicon.py         regenerates the SL favicons from the Anton font
dist/                     output of `bun run standalone`, not tracked
```

## Commands

| Command | Does |
|---|---|
| `bun run dev` | Serves `site/` and restarts when `scripts/serve.mjs` changes. |
| `bun run setup` | Downloads the headless Chromium that `pdf` needs. Once, and again after a Playwright update. |
| `bun run pdf` | Writes `site/cv/Senad_Licina_CV_{DE,EN}.pdf`. |
| `bun run standalone` | Writes `dist/senad-licina-standalone.html`, fonts and portrait inlined. Good as a mail attachment. |
| `bun run build` | `pdf`, then `standalone`. |

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
| `<lang>.numbers` | The band of large figures under the hero. |
| `<lang>.stack` | The stack diagram. `stack.ask` is the script for "Ask the stack". |
| `<lang>.path`, `<lang>.education` | Jobs, earlier roles, degrees. Website timeline and CV. |
| `<lang>.weird`, `<lang>.talk` | Website only. |
| `<lang>.notes` | The handwritten side notes that only show under blacklight. |
| `<lang>.cv` | CV-only text: profile, skills, languages, footer labels. |

A `\n` in a section title forces a line break there.

## How the site works

- **Two states.** Calm is studio grey and olive, taken from the portrait. Blacklight is the same page in fluorescent inks, with side notes that only show there. The switch is in the top bar and again in the Weird section.
- **Torch.** In the calm state, holding the mouse button anywhere shows the blacklight version in a circle around the pointer. Mouse only.
- **Hero.** The dot field starts scattered and settles into a lattice while the hero stays pinned for the first stretch of scrolling. The pointer disturbs it.
- **Ask the stack.** A scripted animation. It sends nothing anywhere and says so in its answer.
- **Sound.** Under blacklight, a Sound button starts a 145 bpm loop synthesized with Web Audio. There is no audio file, and it never starts by itself.
- **Top bar.** A progress line and the name of the current section.
- **Reduced motion.** With the system setting on, all animation is off and the hero is not pinned.
- **No trackers, no cookies, no external requests.** Fonts and icons are served from `site/`.

## Deploy

`site/` is static: GitHub Pages, Netlify, Cloudflare Pages or any web server. Before it goes public:

- **Impressum.** A public site run from Germany needs one. There is none yet.
- **Domain.** Set `meta.website`, and make `og:image` in `index.html` an absolute URL, otherwise link previews show no image.
- **Phone number.** It is in `content.js` and in the PDFs, so it is public as soon as the repository or the site is.

## Open content checks

Facts that were estimated or carried over from an older CV and are not confirmed yet:

- [ ] Plath start year is set to 2025.
- [ ] Geoparadise and Ličina & Helms are listed as ongoing.
- [ ] Sparkassen Innovation Hub is 2016 to 2020. An older draft said 2020 to 2022.
- [ ] Plath details (hardware, Harvester/RKE2, the internal assistant) may be named publicly.
- [ ] The thesis is described as single sign-on for "the department's Active Directory".
- [ ] The numbers band has no platform figures yet (GPUs, users, tokens per second). Real ones would be stronger than the current four.

## Credits

- Fonts: Anton and Fira Sans, both under the SIL Open Font License. The licence texts are in `site/assets/fonts/`.
- Brand icons in the footer: outlines from Simple Icons (CC0).
- Everything else, including the portrait and all text: Senad Ličina.
