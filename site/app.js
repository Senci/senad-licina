/* Senad Ličina. No framework, no build step. Text lives in content.js. */
(() => {
  const C = window.CONTENT;
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

  /* ---------------------------------------------------------- language */
  const params = new URLSearchParams(location.search);
  const pick = (l) => ["de", "en"].find((x) => String(l || "").toLowerCase().startsWith(x));
  let lang = pick(params.get("lang")) || pick(navigator.language) || "en";
  let selected = "platform"; // which part of the stack is open
  let uv = false;

  function render() {
    const t = C[lang];
    root.lang = lang;
    document.title = `${C.meta.name}. ${t.title}, ${C.meta.city}`;

    $$("[data-t]").forEach((el) => {
      const v = get(t, el.dataset.t);
      if (v != null) el.textContent = v;
    });
    $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));

    $("#hero-h").innerHTML = t.hero.headline.map((l) => `<span class="ln"><span>${esc(l)}</span></span>`).join("");
    $("#hero-sub").textContent = t.hero.sub;
    $("#uv2 span").textContent = t.weird[uv ? "ctaOff" : "cta"];

    const mail = `mailto:${C.meta.email}`;
    $("#cta-mail").href = mail;
    $("#mail").href = mail;
    $("#mail").textContent = C.meta.email;
    $("#cta-cv").href = $("#cta-cv2").href = C.meta.cvFiles[lang];
    $("#nav-cv").href = `cv.html?lang=${lang}`;
    $("#links").innerHTML = C.meta.links.map((l) => `<a href="${esc(l.url)}" rel="me noopener" aria-label="${esc(l.label)}" title="${esc(l.label)}"><svg class="ico ico--brand" viewBox="0 0 24 24" aria-hidden="true"><use href="#b-${esc(l.icon)}"/></svg></a>`).join("");

    renderStack(t);

    $("#origin-text").innerHTML = t.origin.text.map((p) => `<p>${esc(p)}</p>`).join("");

    $("#timeline").innerHTML =
      t.path.jobs
        .map(
          (j, i) => `
        <article class="job${i === 0 ? " job--first" : ""}">
          <div class="job__when">${esc(j.period)}</div>
          <div>
            <h3 class="job__org">${esc(j.org)}</h3>
            <p class="job__role">${esc(j.role)}${j.place ? ", " + esc(j.place) : ""}</p>
            <ul>${j.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          </div>
        </article>`
        )
        .join("") +
      `<div class="earlier"><h3>${esc(t.path.earlierTitle)}</h3>${t.path.earlier
        .map((e) => `<div class="row"><span>${esc(e.period)}</span><b>${esc(e.org)}</b><span>${esc(e.what)}</span></div>`)
        .join("")}</div>
       <div class="earlier"><h3>${esc(t.education.title)}</h3>${t.education.items
         .map((e) => `<div class="row"><span>${esc(e.period)}</span><b>${esc(e.title)}</b><span>${esc(e.org)}${e.note ? ". " + esc(e.note) : ""}</span></div>`)
         .join("")}</div>`;

    const odd = (o, cls = "") => `<div class="odd ${cls}"><h3>${esc(o.h)}</h3><p>${esc(o.t)}</p></div>`;
    $("#weird-list").innerHTML = (C.meta.showNeuro ? odd(t.weird.neuro, "odd--neuro") : "") + t.weird.items.map((o) => odd(o)).join("");

    $("#talk-list").innerHTML = t.talk.items.map((i) => `<li>${esc(i)}</li>`).join("");
    measureTokens();
    if (sec) setSection(sec, true);
  }

  /* -------------------------------------------------------- the stack */
  function renderStack(t) {
    const d = $("#diagram");
    const [idn, obs] = t.stack.rails;
    d.innerHTML =
      `<button type="button" class="rail rail--l" data-id="${idn.id}">${esc(idn.name)}</button>` +
      t.stack.layers.map((l, i) => `<button type="button" class="layer" style="grid-row:${i + 1}" data-id="${l.id}"><span>${esc(l.name)}</span><small>${esc(l.tech.split(",").slice(0, 2).join(","))}</small></button>`).join("") +
      `<button type="button" class="rail rail--r" data-id="${obs.id}">${esc(obs.name)}</button>` +
      `<div class="tokens" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => {
        const c = ["var(--olive)", "var(--hot)", "var(--cool)"][i % 3];
        return `<i style="--x:${4 + ((i * 37) % 92)}%;--d:${3.2 + (i % 5) * 0.7}s;--delay:${-(i * 0.61).toFixed(2)}s;--c:${c}"></i>`;
      }).join("")}</div>`;
    $$("button", d).forEach((b) => b.addEventListener("click", () => select(b.dataset.id, true)));
    select(selected, false);
  }
  function select(id, animate) {
    selected = id;
    const t = C[lang].stack;
    const item = [...t.layers, ...t.rails].find((x) => x.id === id) || t.layers[1];
    $$("#diagram button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.id === item.id)));
    const el = $("#detail");
    el.innerHTML = `<h3>${esc(item.name)}</h3><p>${esc(item.text)}</p><p class="tech">${esc(item.tech)}</p>`;
    if (animate && !reduced) {
      el.classList.remove("swap");
      void el.offsetWidth;
      el.classList.add("swap");
    }
  }
  function measureTokens() {
    const tk = $(".tokens");
    if (tk) tk.style.setProperty("--h", tk.offsetHeight + "px");
  }

  /* -------------------------------------------------------- blacklight */
  function setUV(on, ev) {
    const apply = () => {
      uv = on;
      root.dataset.uv = on ? "on" : "off";
      $("#uv").setAttribute("aria-checked", String(on));
      $("#uv2").setAttribute("aria-pressed", String(on));
      $("#uv2 span").textContent = C[lang].weird[on ? "ctaOff" : "cta"];
      if (reduced) requestAnimationFrame(frame);
      $('meta[name="theme-color"]').content = on ? "#10062A" : "#D9D5D0";
      const ico = $('link[rel="icon"]'); // absent in the standalone build
      if (ico) ico.href = `assets/img/favicon${on ? "-uv" : ""}.svg`;
    };
    if (document.startViewTransition && !reduced) {
      const r = ev && ev.currentTarget ? ev.currentTarget.getBoundingClientRect() : null;
      root.style.setProperty("--vx", (r ? r.left + r.width / 2 : innerWidth - 60) + "px");
      root.style.setProperty("--vy", (r ? r.top + r.height / 2 : 30) + "px");
      document.startViewTransition(apply);
    } else apply();
  }
  $("#uv").addEventListener("click", (e) => setUV(!uv, e));
  $("#uv2").addEventListener("click", (e) => setUV(!uv, e));
  if (params.has("uv")) setUV(true);

  $$(".lang button").forEach((b) =>
    b.addEventListener("click", () => {
      lang = b.dataset.lang;
      const p = new URLSearchParams(location.search);
      p.set("lang", lang);
      try { history.replaceState(null, "", "?" + p + location.hash); } catch (_) {}
      render();
    })
  );

  /* ------------------------------------------------ hero field: chaos and order
     A lattice of points (order). A wave of turbulence drifts through it and the
     pointer disturbs it (chaos). Under blacklight the balance tips. */
  const cv = $("#field");
  const ctx = cv.getContext("2d");
  const hero = $(".hero");
  let W = 0, H = 0, pts = [], mx = -9999, my = -9999, running = true, lastBeat = 0;

  function build() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const gap = W < 700 ? 22 : 30;
    pts = [];
    for (let y = gap / 2; y < H; y += gap)
      for (let x = gap / 2; x < W; x += gap) pts.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, k: (Math.random() * 3) | 0, c: 0 });
  }

  function frame(t) {
    if (running) {
      ctx.clearRect(0, 0, W, H);
      const base = uv ? 0.55 : 0;
      const wave = ((t * 0.00007) % 1.7) - 0.35;
      let kick = 0;
      if (uv && t - lastBeat > 60000 / 145) { lastBeat = t; kick = 1.6; }
      const cols = uv ? ["#C8FF2E", "#FF3EC8", "#37E8FF"] : ["#191B14", "#4A5632", "#191B14"];
      ctx.globalCompositeOperation = uv ? "lighter" : "source-over";
      for (let k = 0; k < 3; k++) {
        ctx.fillStyle = cols[k];
        for (const p of pts) {
          if (p.k !== k) continue;
          const u = (p.hx / W) * 0.75 + (p.hy / H) * 0.25;
          const dw = (u - wave) / 0.11;
          const dx = p.x - mx, dy = p.y - my;
          let c = base + Math.exp(-dw * dw) * 0.9 + Math.exp(-(dx * dx + dy * dy) / 16000) * 1.2;
          if (c > 1) c = 1;
          p.c += (c - p.c) * 0.08;
          const a = Math.sin(p.x * 0.006 + t * 0.0004) * Math.cos(p.y * 0.007 - t * 0.0003) * 6.283;
          const pull = 0.012 + 0.07 * (1 - p.c);
          p.vx = (p.vx + Math.cos(a) * p.c * 0.42 + (p.hx - p.x) * pull) * 0.9;
          p.vy = (p.vy + Math.sin(a) * p.c * 0.42 + (p.hy - p.y) * pull) * 0.9;
          if (kick) { const ex = p.x - W * 0.5, ey = p.y - H * 0.55, d = Math.hypot(ex, ey) + 1; p.vx += (ex / d) * kick; p.vy += (ey / d) * kick; }
          p.x += p.vx; p.y += p.vy;
          const s = 1.5 + p.c * 1.9;
          ctx.globalAlpha = uv ? 0.35 + p.c * 0.55 : 0.26 + p.c * 0.5;
          ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        }
      }
      ctx.globalAlpha = 1;
    }
    if (!reduced) requestAnimationFrame(frame);
  }

  hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
  hero.addEventListener("pointerleave", () => { mx = my = -9999; });
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }).observe(hero);

  /* ------------------------------------------------- scroll-linked bits */
  const tl = $("#timeline");
  const secEl = $("#sec");
  const secs = ["stack", "origin", "path", "weird", "talk"].map((id) => document.getElementById(id));
  let sec = null;
  function onScroll() {
    const r = tl.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
    tl.style.setProperty("--p", p.toFixed(4));
    root.style.setProperty("--sp", Math.min(1, scrollY / Math.max(1, root.scrollHeight - innerHeight)).toFixed(4));
    const cur = secs.filter((s) => s.getBoundingClientRect().top < innerHeight * 0.4).pop();
    setSection(cur ? cur.id : null);
  }
  function setSection(id, force) {
    if (id === sec && !force) return;
    sec = id;
    secEl.hidden = !id;
    if (!id) return;
    secEl.textContent = C[lang].sections[id];
    secEl.href = "#" + id;
    if (!reduced && !force) { secEl.classList.remove("swap"); void secEl.offsetWidth; secEl.classList.add("swap"); }
  }
  addEventListener("scroll", onScroll, { passive: true });

  // the year rewinds from today to 2012, once
  const yearEl = $("#year");
  new IntersectionObserver(([e], io) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    if (reduced) return;
    const from = new Date().getFullYear(), to = 2012, t0 = performance.now(), dur = 1500;
    (function tick(now) {
      const k = Math.min(1, (now - t0) / dur), ease = 1 - Math.pow(1 - k, 3);
      yearEl.textContent = Math.round(from + (to - from) * ease);
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }, { threshold: 0.5 }).observe(yearEl);

  /* --------------------------------------------------------------- go */
  render();
  build();
  onScroll();
  document.body.classList.add("intro");
  setTimeout(() => document.body.classList.remove("intro"), 2600);
  requestAnimationFrame(frame);
  let rz;
  addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { build(); measureTokens(); onScroll(); if (reduced) requestAnimationFrame(frame); }, 150); });
})();
