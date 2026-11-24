// Serves site/ on localhost. Usage: bun run dev (PORT=3000 by default)
import path from "node:path";

const root = path.resolve(import.meta.dir, "..", "site");
const server = Bun.serve({
  hostname: "127.0.0.1",
  port: Number(process.env.PORT ?? 3000),
  async fetch(req) {
    const pathname = decodeURIComponent(new URL(req.url).pathname);
    const file = path.join(root, pathname.endsWith("/") ? pathname + "index.html" : pathname);
    if (!file.startsWith(root + path.sep)) return new Response("Forbidden", { status: 403 });
    const body = Bun.file(file);
    return (await body.exists()) ? new Response(body) : new Response("Not found", { status: 404 });
  },
});
console.log(`serving site/ on ${server.url}`);
