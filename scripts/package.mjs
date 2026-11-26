// Zips dist/site/ (from build-site.mjs) for a manual upload in the Cloudflare dashboard. Usage: bun run package (needs the zip command)
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dir, "..");
const out = path.join(root, "dist", "senad-licina-cloudflare.zip");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.rmSync(out, { force: true });
// run inside dist/site/ so index.html sits at the top level of the archive
const zip = Bun.spawnSync(["zip", "-r", "-q", "-X", out, ".", "-x", ".*", "*/.*"], { cwd: path.join(root, "dist", "site"), stderr: "inherit" });
if (zip.exitCode !== 0) process.exit(zip.exitCode ?? 1);
console.log("wrote dist/senad-licina-cloudflare.zip", (fs.statSync(out).size / 1024).toFixed(0) + " KB");
