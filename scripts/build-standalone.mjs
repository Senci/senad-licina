// Packs the website into one self-contained HTML file (fonts and images inlined).
// Handy for sending the page as an attachment. Usage: npm run standalone
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "site");
const read = (f) => fs.readFileSync(path.join(site, f), "utf8");
const uri = (f, mime) => `data:${mime};base64,${fs.readFileSync(path.join(site, f)).toString("base64")}`;

let css = read("styles.css").replace(/url\("(assets\/fonts\/[^"]+)"\)/g, (_, f) => `url("${uri(f, "font/woff")}")`);
let html = read("index.html")
  .replace('<link rel="stylesheet" href="styles.css">', () => `<style>${css}</style>`)
  .replace('<script src="content.js"></script>', () => `<script>${read("content.js")}</script>`)
  .replace('<script src="app.js"></script>', () => `<script>${read("app.js")}</script>`)
  .replace(/src="assets\/img\/portrait\.webp" srcset="[^"]*" sizes="[^"]*"/, () => `src="${uri("assets/img/portrait.webp", "image/webp")}"`)
  .replace(/<link rel="icon"[^>]*>/, "")
  .replace(/<meta property="og:image"[^>]*>/, "");

const out = path.resolve(site, "..", "dist");
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "senad-licina-standalone.html"), html);
console.log("wrote dist/senad-licina-standalone.html", (html.length / 1024).toFixed(0) + " KB");
