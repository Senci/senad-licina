// Copies site/ to dist/site/ and bakes the rendered page into static HTML for search engines and
// link previews: English as index.html (/), German as de.html (/de). app.js still runs on top.
// Usage: bun run site (needs `bun run setup` once)
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dir, "..");
const site = path.join(root, "site");
const out = path.join(root, "dist", "site");
fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(site, out, { recursive: true });

// last content change: page dateModified (structured data) and sitemap lastmod
const git = Bun.spawnSync(["git", "log", "-1", "--format=%cs", "--", "site"], { cwd: root });
const modified = git.stdout.toString().trim() || new Date().toISOString().slice(0, 10);
const sitemap = path.join(out, "sitemap.xml");
fs.writeFileSync(sitemap, fs.readFileSync(sitemap, "utf8").replaceAll("</loc>", `</loc>\n    <lastmod>${modified}</lastmod>`));

const browser = await chromium.launch();
for (const [lang, file] of [["en", "index.html"], ["de", "de.html"]]) {
  const page = await browser.newPage({ reducedMotion: "reduce" }); // no intro animation, no scattered dots
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(pathToFileURL(path.join(site, "index.html")).href + `?lang=${lang}`);
  await page.evaluate(() => document.fonts.ready);
  if (errors.length) throw new Error(`${lang}: ${errors.join("; ")}`);
  const html = await page.evaluate((modified) => {
    const m = Object.assign(document.createElement("meta"), { name: "last-modified", content: modified });
    document.querySelector('meta[name="description"]').after(m);
    const ld = document.getElementById("ld");
    ld.textContent = JSON.stringify({ ...JSON.parse(ld.textContent), dateModified: modified });
    // drop runtime state so the baked page starts like the source page
    const r = document.documentElement;
    for (const a of ["style", "class", "data-uv"]) r.removeAttribute(a);
    document.body.removeAttribute("class");
    document.querySelectorAll("h2.rise").forEach((h) => h.removeAttribute("class")); // words stay visible without JS
    document.querySelectorAll(".job.on").forEach((j) => j.classList.remove("on"));
    document.querySelectorAll("canvas").forEach((c) => { c.removeAttribute("width"); c.removeAttribute("height"); });
    return "<!doctype html>\n" + r.outerHTML;
  }, modified);
  fs.writeFileSync(path.join(out, file), html);
  console.log("wrote", path.relative(root, path.join(out, file)), (html.length / 1024).toFixed(0) + " KB");
  await page.close();
}
await browser.close();
