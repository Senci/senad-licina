// Renders site/cv.html to PDF in both languages.
// Usage: bun install && bun run setup (once), then bun run pdf
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "site");
const browser = await chromium.launch();
for (const lang of ["en", "de"]) {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.join(root, "cv.html")).href + `?lang=${lang}`);
  await page.evaluate(() => document.fonts.ready);
  // a column that runs into the page footer is clipped or overprinted in the PDF: fail the build instead
  const over = await page.evaluate(() => [...document.querySelectorAll(".page")].flatMap((p, i) => {
    const foot = p.querySelector(".pfoot").getBoundingClientRect().top;
    return [...p.querySelectorAll(".cols > *")].filter((c) => c.lastElementChild && c.lastElementChild.getBoundingClientRect().bottom > foot - 2)
      .map((c) => `page ${i + 1} ${c.tagName.toLowerCase()} ends ${Math.round(c.lastElementChild.getBoundingClientRect().bottom - foot)}px into the footer`);
  }));
  if (over.length) throw new Error(`${lang}: ${over.join("; ")}`);
  const out = path.join(root, "cv", `Senad_Licina_CV_${lang.toUpperCase()}.pdf`);
  await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
  console.log("wrote", out);
  await page.close();
}
await browser.close();
