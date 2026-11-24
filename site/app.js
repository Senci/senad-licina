/* Senad Ličina. No framework, no build step. Text lives in content.js. */
(() => {
  const C = window.CONTENT;
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = matchMedia("(max-width: 800px)");
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

  /* ---------------------------------------------------------- language */
  const params = new URLSearchParams(location.search);
  const pick = (l) => ["de", "en"].find((x) => String(l || "").toLowerCase().startsWith(x));
  let lang = pick(params.get("lang")) || pick(navigator.language) || "en";
  let selected = "platform"; // which part of the stack is open
  let uv = false;
  let sec = null; // section named in the top bar
  let jobs = [];

  $("#about-open").addEventListener("click", () => { $("#about").showModal(); $("#about").scrollTop = 0; }); // focus lands on Close at the end, so scroll back up
  $("#about").addEventListener("click", (e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }); // click on the backdrop

  function render() {
    const t = C[lang];
    root.lang = lang;
    document.title = `${C.meta.name}. ${t.title}, ${C.meta.city}`;

    $$("[data-t]").forEach((el) => {
      const v = get(t, el.dataset.t);
      if (v != null) el.textContent = v;
    });
    $("#about-h").textContent = t.about.title;
    $("#about-body").innerHTML = t.about.sections.map((s) => `<h3>${esc(s.h)}</h3><ul>${s.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`).join("");
    // section headings rise word by word when they scroll in
    $$("main h2[data-t]").forEach((h) => {
      h.classList.add("rise");
      let i = 0; // "\n" in a title is a forced line break
      h.innerHTML = h.textContent.split("\n").map((ln) => ln.split(" ").map((w) => `<span class="w"><span style="--i:${i++}">${esc(w)}</span></span>`).join(" ")).join("<br>");
      if (reduced) h.classList.add("in");
      else riseIO.observe(h);
    });
    $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));

    $("#hero-h").innerHTML = t.hero.headline.map((l) => `<span class="ln"><span>${esc(l)}</span></span>`).join("");
    $("#hero-sub").textContent = t.hero.sub;
    $("#uv2 span").textContent = t.weird[uv ? "ctaOff" : "cta"];
    $("#nums").innerHTML = t.numbers.map((x) => `<div class="num"><b data-n="${Number(x.n)}">${Number(x.n)}</b><span>${esc(x.l)}</span></div>`).join("");
    $("#ask-q").placeholder = t.stack.ask.placeholder;
    $("#uv").title = t.ui.blacklight;

    const mail = `mailto:${C.meta.email}`;
    $("#cta-mail").href = mail;
    $("#mail").href = mail;
    $("#mail").textContent = C.meta.email;
    $("#cta-cv").href = $("#cta-cv2").href = C.meta.cvFiles[lang];
    $("#nav-cv").href = `cv.html?lang=${lang}`;
    $("#links").innerHTML = C.meta.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="me noopener" aria-label="${esc(l.label)}" title="${esc(l.label)}"><svg class="ico ico--brand" viewBox="0 0 24 24" aria-hidden="true"><use href="#b-${esc(l.icon)}"/></svg></a>`).join("");

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
    jobs = $$("#timeline .job");

    const odd = (o, cls = "") => `<div class="odd ${cls}"><h3>${esc(o.h)}</h3><p>${esc(o.t)}</p></div>`;
    $("#weird-list").innerHTML = (C.meta.showNeuro ? odd(t.weird.neuro, "odd--neuro") : "") + t.weird.items.map((o) => odd(o)).join("");

    $("#talk-list").innerHTML = t.talk.items.map((i) => `<li>${esc(i)}</li>`).join("");
    measureTokens();
    if (sec) setSection(sec, true);
    onScroll();
  }
  const riseIO = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); riseIO.unobserve(e.target); } }), { threshold: 0.3 });

  /* -------------------------------------------------------- the stack */
  const detail = $("#detail");
  const stackBody = $(".stack__body");
  let askRun = 0; // bumped to cancel a running request animation

  function renderStack(t) {
    askRun++;
    stackBody.append(detail); // it may sit inside the diagram (mobile accordion)
    const d = $("#diagram");
    const [idn, obs, sec] = t.stack.rails;
    d.innerHTML =
      `<button type="button" class="rail rail--l" data-id="${idn.id}">${esc(idn.name)}</button>` +
      t.stack.layers.map((l, i) => `<button type="button" class="layer" style="grid-row:${i + 1}" data-id="${l.id}"><span>${esc(l.name)}</span><small>${esc(l.tech.split(",").slice(0, 2).join(","))}</small></button>`).join("") +
      `<button type="button" class="rail rail--r" data-id="${obs.id}">${esc(obs.name)}</button>` +
      `<button type="button" class="rail rail--b" data-id="${sec.id}">${esc(sec.name)}</button>` +
      `<div class="tokens" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => {
        const c = ["var(--olive)", "var(--hot)", "var(--cool)"][i % 3];
        return `<i style="--x:${4 + ((i * 37) % 92)}%;--d:${3.2 + (i % 5) * 0.7}s;--delay:${-(i * 0.61).toFixed(2)}s;--c:${c}"></i>`;
      }).join("")}</div>`;
    $$("button", d).forEach((b) => b.addEventListener("click", () => select(b.dataset.id, true)));
    select(selected, false);
  }
  function select(id, animate) {
    askRun++;
    selected = id;
    const t = C[lang].stack;
    const item = [...t.layers, ...t.rails].find((x) => x.id === id) || t.layers[1];
    $$("#diagram button").forEach((b) => { b.classList.remove("hit"); b.setAttribute("aria-pressed", String(b.dataset.id === item.id)); });
    detail.innerHTML = `<h3>${esc(item.name)}</h3><p>${esc(item.text)}</p><p class="tech">${esc(item.tech)}</p>`;
    placeDetail();
    if (animate && !reduced) {
      detail.classList.remove("swap");
      void detail.offsetWidth;
      detail.classList.add("swap");
    }
  }
  // desktop: beside the diagram. mobile: an accordion, directly under the pressed layer
  function placeDetail() {
    const b = mobile.matches && $('#diagram [aria-pressed="true"]');
    if (b) b.after(detail);
    else stackBody.append(detail);
  }
  mobile.addEventListener("change", placeDetail);
  function measureTokens() {
    const tk = $(".tokens");
    if (tk) tk.style.setProperty("--h", tk.offsetHeight + "px");
  }

  // "Ask the stack": a scripted request travels through every layer, then an answer streams back
  const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));
  $("#ask").addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = $("#ask-q");
    const q = input.value.trim();
    if (!q) return;
    const run = ++askRun;
    const t = C[lang].stack;
    const names = Object.fromEntries([...t.layers, ...t.rails].map((x) => [x.id, x.name]));
    const btn = (id) => $(`#diagram [data-id="${id}"]`);
    $$("#diagram button").forEach((b) => { b.classList.remove("hit"); b.setAttribute("aria-pressed", "false"); });
    stackBody.append(detail);
    detail.classList.remove("swap");
    detail.innerHTML = `<h3>${esc(t.ask.title)}</h3><p class="ask__q">&gt; ${esc(q)}</p><ol class="trace"></ol><p class="ask__a"></p>`;
    if (mobile.matches) detail.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
    const trace = $(".trace", detail), ans = $(".ask__a", detail);
    for (const [id, text] of t.ask.steps) {
      await wait(480);
      if (run !== askRun) return;
      btn(id).classList.add("hit");
      trace.insertAdjacentHTML("beforeend", `<li><b>${esc(names[id])}</b><span>${esc(text)}</span></li>`);
    }
    await wait(500);
    ans.classList.add("typing");
    for (const word of t.ask.answer.split(" ")) {
      if (run !== askRun) return;
      ans.append(word + " ");
      await wait(55);
    }
    ans.classList.remove("typing");
    input.value = "";
  });

  /* -------------------------------------------------------- blacklight */
  function setUV(on, ev) {
    const apply = () => {
      uv = on;
      root.dataset.uv = on ? "on" : "off";
      $("#uv").setAttribute("aria-checked", String(on));
      $("#uv2").setAttribute("aria-pressed", String(on));
      $("#uv2 span").textContent = C[lang].weird[on ? "ctaOff" : "cta"];
      $("#snd").hidden = !on;
      if (!on) sound(false);
      if (reduced) requestAnimationFrame(frame);
      $('meta[name="theme-color"]').content = on ? "#10062A" : "#D9D5D0";
      const ico = $('link[rel="icon"]'); // absent in the standalone build
      if (ico) ico.href = `assets/img/favicon${on ? "-uv" : ""}.svg`;
    };
    torchOff();
    if (document.startViewTransition && !reduced) {
      const r = ev && ev.currentTarget ? ev.currentTarget.getBoundingClientRect() : null;
      root.style.setProperty("--vx", (r ? r.left + r.width / 2 : innerWidth - 60) + "px");
      root.style.setProperty("--vy", (r ? r.top + r.height / 2 : 30) + "px");
      document.startViewTransition(apply).finished.catch(() => {}); // an aborted transition still applies the state
    } else apply();
  }
  $("#uv").addEventListener("click", (e) => setUV(!uv, e));
  $("#uv2").addEventListener("click", (e) => setUV(!uv, e));

  $$(".lang button").forEach((b) =>
    b.addEventListener("click", () => {
      lang = b.dataset.lang;
      const p = new URLSearchParams(location.search);
      p.set("lang", lang);
      try { history.replaceState(null, "", "?" + p + location.hash); } catch (_) {}
      render();
    })
  );

  /* ------------------------------------------------------------- torch
     In the calm state, holding the mouse button turns the pointer into a UV lamp:
     a blacklight copy of the page, clipped to a circle around it. */
  const main = $("#main");
  let layer = null, ring = null, ctx2 = null, torch = false, down = null, downTimer = 0, tx = 0, ty = 0;
  function torchOn() {
    if (uv || torch || !down) return;
    torch = true;
    layer = document.createElement("div");
    layer.className = "uvlayer";
    layer.dataset.uv = "on";
    layer.setAttribute("aria-hidden", "true");
    layer.inert = true;
    for (const ch of main.children) layer.append(ch.cloneNode(true));
    $$("[id]", layer).forEach((el) => el.removeAttribute("id"));
    $$("[aria-live]", layer).forEach((el) => el.removeAttribute("aria-live"));
    $$(".swap", layer).forEach((el) => el.classList.remove("swap"));
    const c2 = $("canvas", layer);
    if (c2) { ctx2 = c2.getContext("2d"); ctx2.setTransform(dpr, 0, 0, dpr, 0, 0); }
    ring = document.createElement("div");
    ring.className = "torch";
    document.body.append(layer, ring);
    torchMove(down.x, down.y);
    void layer.offsetWidth;
    layer.classList.add("on");
    ring.classList.add("on");
    root.classList.add("torching");
    getSelection().removeAllRanges();
  }
  function torchMove(x, y) {
    tx = x; ty = y;
    layer.style.setProperty("--tx", x + "px");
    layer.style.setProperty("--ty", y + scrollY + "px");
    ring.style.transform = `translate(${x}px, ${y}px)`;
  }
  function torchOff() {
    clearTimeout(downTimer);
    down = null;
    if (!torch) return;
    torch = false;
    const l = layer, r = ring;
    layer = ring = ctx2 = null;
    l.classList.remove("on");
    r.classList.remove("on");
    root.classList.remove("torching");
    setTimeout(() => { l.remove(); r.remove(); }, reduced ? 0 : 320);
  }
  addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || uv) return;
    if (e.target.closest("a, button, input, label, .top")) return;
    down = { x: e.clientX, y: e.clientY };
    downTimer = setTimeout(torchOn, 140); // a plain click does nothing
  });
  addEventListener("pointermove", (e) => {
    if (torch) torchMove(e.clientX, e.clientY);
    else if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) torchOff(); // that is a text selection
  });
  ["pointerup", "pointercancel", "blur", "contextmenu", "dragstart"].forEach((ev) => addEventListener(ev, torchOff));

  /* ------------------------------------------------------------- sound
     Opt-in, blacklight only: a synthesized 145 bpm kick and rolling bass (Web Audio, no file).
     The dot field kicks on the audio clock while it plays. */
  const BEAT = 60 / 145;
  let ac = null, out = null, noise = null, sndOn = false, sndTimer = 0, nextBeat = 0, beatNo = 0, due = [];
  function voice(type, t, f0, f1, fDur, peak, dur, filter) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + fDur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let node = o;
    if (filter) {
      const lp = ac.createBiquadFilter();
      lp.type = "lowpass"; lp.Q.value = 7;
      lp.frequency.setValueAtTime(filter, t);
      lp.frequency.exponentialRampToValueAtTime(140, t + dur);
      node = o.connect(lp);
    }
    node.connect(g).connect(out);
    o.start(t); o.stop(t + dur + 0.02);
  }
  function hat(t) {
    const s = ac.createBufferSource(), hp = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = noise;
    hp.type = "highpass"; hp.frequency.value = 7500;
    g.gain.setValueAtTime(0.11, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
    s.connect(hp).connect(g).connect(out);
    s.start(t); s.stop(t + 0.06);
  }
  function schedule() {
    while (nextBeat < ac.currentTime + 0.15) {
      voice("sine", nextBeat, 160, 44, 0.1, 0.95, 0.24);
      const note = beatNo % 16 > 13 ? 61.74 : 46.25; // F#1, lifting to B1 at the end of every fourth bar
      for (let i = 1; i < 4; i++) voice("sawtooth", nextBeat + (i * BEAT) / 4, note, 0, 0, 0.42, 0.1, 1100);
      hat(nextBeat + BEAT / 2);
      due.push(nextBeat);
      nextBeat += BEAT;
      beatNo++;
    }
  }
  function sound(on) {
    if (on === sndOn) return;
    sndOn = on;
    $("#snd").setAttribute("aria-pressed", String(on));
    clearInterval(sndTimer);
    if (!on) {
      out.gain.cancelScheduledValues(ac.currentTime);
      out.gain.setTargetAtTime(0, ac.currentTime, 0.04);
      setTimeout(() => { if (!sndOn) ac.suspend(); }, 300);
      return;
    }
    if (!ac) {
      ac = new (window.AudioContext || window.webkitAudioContext)();
      out = ac.createGain();
      const comp = ac.createDynamicsCompressor();
      out.connect(comp).connect(ac.destination);
      noise = ac.createBuffer(1, ac.sampleRate * 0.06, ac.sampleRate);
      const d = noise.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    ac.resume();
    out.gain.cancelScheduledValues(ac.currentTime);
    out.gain.setValueAtTime(0, ac.currentTime);
    out.gain.linearRampToValueAtTime(0.5, ac.currentTime + 0.4);
    due = []; beatNo = 0;
    nextBeat = ac.currentTime + 0.1;
    schedule();
    sndTimer = setInterval(schedule, 25);
  }
  $("#snd").addEventListener("click", () => sound(!sndOn));
  document.addEventListener("visibilitychange", () => { if (document.hidden) sound(false); });

  /* ------------------------------------------------ hero field: chaos and order
     A lattice of points (order). It starts scattered and settles as you scroll
     the pinned hero. A wave of turbulence drifts through it and the pointer
     disturbs it. Under blacklight the balance tips. */
  const cv = $("#field");
  const ctx = cv.getContext("2d");
  const hero = $(".hero");
  const pin = $(".pin");
  const UVCOLS = ["#C8FF2E", "#FF3EC8", "#37E8FF"];
  let W = 0, H = 0, dpr = 1, pts = [], mx = -9999, my = -9999, running = true, lastBeat = 0, boot = reduced ? 0 : 1;

  function build() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const gap = W < 700 ? 22 : 30;
    pts = [];
    for (let y = gap / 2; y < H; y += gap)
      for (let x = gap / 2; x < W; x += gap) {
        // scattered start: the lattice has to be earned
        const sx = boot ? x + (Math.random() - 0.5) * 220 : x, sy = boot ? y + (Math.random() - 0.5) * 220 : y;
        pts.push({ hx: x, hy: y, x: sx, y: sy, vx: 0, vy: 0, k: (Math.random() * 3) | 0, c: 0, ds: 1.5, ma: 1 });
      }
    mPts = []; mChars = []; mNext = performance.now() + 1800; mBeats = 0;
  }

  // The scattered dots keep writing the Free Software Song (lyrics: Richard Stallman, 1993) line by line,
  // typed letter by letter, in a 5x7 dot matrix between the top bar and the headline. Lines scroll up like lyrics.
  const GLYPHS = {
    A: "01110100011000111111100011000110001", B: "11110100011000111110100011000111110", C: "01110100011000010000100001000101110",
    D: "11110100011000110001100011000111110", E: "11111100001000011110100001000011111", F: "11111100001000011110100001000010000",
    G: "01110100011000010111100011000101111", H: "10001100011000111111100011000110001", I: "11111001000010000100001000010011111",
    J: "00111000100001000010000101001001100", K: "10001100101010011000101001001010001", L: "10000100001000010000100001000011111",
    M: "10001110111010110101100011000110001", N: "10001110011010110011100011000110001", O: "01110100011000110001100011000101110",
    P: "11110100011000111110100001000010000", Q: "01110100011000110001101011001001101", R: "11110100011000111110101001001010001",
    S: "01111100001000001110000010000111110", T: "11111001000010000100001000010000100", U: "10001100011000110001100011000101110",
    V: "10001100011000110001100010101000100", W: "10001100011000110101101011101110001", X: "10001100010101000100010101000110001",
    Y: "10001100010101000100001000010000100", Z: "11111000010001000100010001000011111", "'": "00100001000100000000000000000000000",
    ",": "00000000000000000000001000010001000", ".": "00000000000000000000000000000000100", "!": "00100001000010000100001000000000100",
    ";": "00000001000000000000001000010001000",
  };
  const SONG = `Join us now and share the software;
You'll be free, hackers, you'll be free.
Join us now and share the software;
You'll be free, hackers, you'll be free.

Hoarders can get piles of money,
That is true, hackers, that is true.
But they cannot help their neighbors;
That's not good, hackers, that's not good.

When we have enough free software
At our call, hackers, at our call,
We'll kick out those dirty licenses
Ever more, hackers, ever more.

Join us now and share the software;
You'll be free, hackers, you'll be free.
Join us now and share the software;
You'll be free, hackers, you'll be free.
`.toUpperCase().split("\n"); // an empty entry is a pause between verses
  const CHAR_MS = 42; // typewriter pace
  let mPts = [], mIdx = 0, mNext = 0, mBeats = 0, mChars = [], mLineT = 0, mStep = 0;
  function messageTick(t) {
    if (t < mNext) { mBeats = 0; return; }
    if (sndOn && !mBeats) return; // with the sound on, a line starts on the beat
    if (mIdx === 0 && mPts.length) release(mPts, 1); // the song starts over
    const text = SONG[mIdx];
    if (text) compose(text, t);
    mIdx = (mIdx + 1) % SONG.length;
    mNext = t + (text ? text.length * CHAR_MS + 2400 : mIdx ? 1200 : 4500); // time to read a line before the next one pushes it up
    mBeats = 0;
  }
  // Lays one line out at the bottom of the band between top bar and headline; older lines scroll up and leave.
  function compose(text, t) {
    const words = text.split(" ");
    const small = W < 700;
    const pad = parseFloat(getComputedStyle(hero).paddingLeft) || 20;
    const avail = W - 2 * pad;
    const top = $(".top").offsetHeight + 6, bottom = $("#hero-h").getBoundingClientRect().top - hero.getBoundingClientRect().top - 10;
    const step = Math.min(7, avail / (small ? 125 : 251), (bottom - top) / 6); // desktop: every line fits one row. phone: lines wrap
    const pitch = step * (small ? 9 : 10);
    if (step < 2.1) return;
    const max = avail / step, rows = [[]];
    let used = -1;
    words.forEach((w, i) => {
      const u = w.length * 6;
      if (used + u > max && rows[rows.length - 1].length) { rows.push([]); used = -1; }
      rows[rows.length - 1].push(i);
      used += u + 4;
    });
    // scroll what is there up by the height of the new line
    for (const p of mPts) { p.my -= rows.length * pitch; p.ry -= rows.length * pitch; p.ma = 0.4; }
    release(mPts.filter((p) => p.ry < top - 1), 2);
    const ink = uv ? mIdx % 3 : 1; // olive in the calm state, a different fluorescent ink per line under blacklight
    const free = pts.filter((p) => !p.m).map((p) => [Math.random(), p]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
    mChars = []; mLineT = t; mStep = step;
    rows.forEach((row, r) => {
      const y = bottom - (rows.length - 1 - r) * pitch - 6 * step;
      let x = pad;
      for (const wi of row) {
        [...words[wi]].forEach((ch) => {
          const at = t + mChars.length * CHAR_MS;
          mChars.push([x, y]);
          [...(GLYPHS[ch] || "")].forEach((bit, i) => {
            const p = bit === "1" && free.pop();
            if (!p) return;
            p.m = true; p.k0 = p.k; p.k = ink; p.ma = 1;
            p.mx = x + (i % 5) * step; p.my = y + ((i / 5) | 0) * step; p.ry = y; p.cx = x; p.sp = step; p.on = false;
            p.ms = Math.max(1.6, step * 0.52);
            p.t0 = at + Math.random() * 50;
            mPts.push(p);
          });
          x += 6 * step;
        });
        mChars.push([x, y]); // the space
        x += 4 * step;
      }
    });
  }
  // how: 0 = just let go, 1 = burst outward, 2 = drift off upward
  function release(list, how) {
    const cx = list.reduce((s, p) => s + p.mx, 0) / (list.length || 1), cy = list.reduce((s, p) => s + p.my, 0) / (list.length || 1);
    for (const p of list) {
      p.m = false; p.k = p.k0; p.ma = 1;
      if (how === 1) {
        const a = Math.atan2(p.my - cy, (p.mx - cx) * 0.35) + (Math.random() - 0.5) * 1.2, v = 5 + Math.random() * 10;
        p.vx += Math.cos(a) * v; p.vy += Math.sin(a) * v;
      } else if (how === 2) { p.vx += (Math.random() - 0.5) * 9; p.vy -= 2 + Math.random() * 7; }
    }
    mPts = mPts.filter((p) => p.m);
  }

  function frame(t) {
    if (running) {
      ctx.clearRect(0, 0, W, H);
      if (!reduced) messageTick(t);
      const base = Math.max(uv ? 0.55 : 0, boot);
      const wave = ((t * 0.00007) % 1.7) - 0.35;
      let kick = 0;
      if (sndOn) { while (due.length && due[0] <= ac.currentTime) { due.shift(); kick = 1.6; mBeats++; } }
      else if (uv && t - lastBeat > 60000 / 145) { lastBeat = t; kick = 1.6; }
      const cols = uv ? UVCOLS : ["#191B14", "#4A5632", "#191B14"];
      const calm = 1 - boot * 0.85; // while scattered: weak pull home, fainter dots so the headline stays readable
      ctx.globalCompositeOperation = uv ? "lighter" : "source-over";
      for (let k = 0; k < 3; k++) {
        ctx.fillStyle = cols[k];
        for (const p of pts) {
          if (p.k !== k) continue;
          const u = (p.hx / W) * 0.75 + (p.hy / H) * 0.25;
          const dw = (u - wave) / 0.11;
          const dx = p.x - mx, dy = p.y - my, d2p = dx * dx + dy * dy;
          let c = base + Math.exp(-dw * dw) * 0.9 + Math.exp(-(dx * dx + dy * dy) / 16000) * 1.2;
          if (c > 1) c = 1;
          p.c += (c - p.c) * 0.08;
          const a = Math.sin(p.x * 0.006 + t * 0.0004) * Math.cos(p.y * 0.007 - t * 0.0003) * 6.283;
          // message dots are held on their letter at the top and released to the lattice as the hero settles
          const hold = p.m && t >= p.t0 ? 1 : 0;
          if (hold && !p.on) { p.on = true; p.x = p.cx + Math.random() * 5 * p.sp; p.y = p.ry + Math.random() * 7 * p.sp; p.vx = p.vy = 0; } // the cursor sprays the letter out
          const gx = hold ? p.hx + (p.mx - p.hx) * hold : p.hx, gy = hold ? p.hy + (p.my - p.hy) * hold : p.hy;
          const pull = hold ? 0.2 : (0.012 + 0.07 * (1 - p.c)) * calm;
          const turb = p.c * 0.42 * (1 - hold);
          p.vx = (p.vx + Math.cos(a) * turb + (gx - p.x) * pull) * 0.9;
          p.vy = (p.vy + Math.sin(a) * turb + (gy - p.y) * pull) * 0.9;
          if (hold && d2p < 8100) { const d = Math.sqrt(d2p) + 1, f = (1 - d / 90) * 2.4; p.vx += (dx / d) * f; p.vy += (dy / d) * f; } // the pointer pushes letters apart
          if (kick) { const ex = p.x - W * 0.5, ey = p.y - H * 0.55, d = Math.hypot(ex, ey) + 1; p.vx += (ex / d) * kick; p.vy += (ey / d) * kick; }
          p.x += p.vx; p.y += p.vy;
          const s = hold ? 1.5 + (p.ms - 1.5) * hold * (0.8 + 0.2 * Math.sin(t * 0.006 - p.mx * 0.02)) : 1.5 + p.c * 1.9 * (1 - boot * 0.6);
          p.ds = s;
          ctx.globalAlpha = Math.max(uv ? 0.35 + p.c * 0.55 : 0.26 + p.c * 0.5 * (1 - boot * 0.7), hold * p.ma);
          ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        }
      }
      if (mChars.length) {
        const i = Math.floor((t - mLineT) / CHAR_MS), end = i >= mChars.length;
        const [cx, cy] = mChars[Math.min(i, mChars.length - 1)];
        if (!end || Math.floor(t / 260) % 2) {
          ctx.globalAlpha = 0.8;
          ctx.fillStyle = uv ? UVCOLS[1] : "#4A5632";
          ctx.fillRect(cx + (end ? 4 * mStep : 0) - mStep * 0.3, cy - mStep * 0.3, 4.6 * mStep, 6.6 * mStep);
        }
      }
      ctx.globalAlpha = 1;
      if (ctx2) { // the torch copy shows the same field in blacklight inks
        ctx2.clearRect(0, 0, W, H);
        ctx2.globalCompositeOperation = "lighter";
        for (let k = 0; k < 3; k++) {
          ctx2.fillStyle = UVCOLS[k];
          for (const p of pts) {
            if (p.k !== k) continue;
            const s = Math.max(1.5 + p.c * 1.9, p.ds);
            ctx2.globalAlpha = 0.45 + p.c * 0.45;
            ctx2.fillRect(p.x - s / 2, p.y - s / 2, s, s);
          }
        }
      }
    }
    if (!reduced) requestAnimationFrame(frame);
  }

  hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
  hero.addEventListener("pointerleave", () => { mx = my = -9999; });
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }).observe(hero);

  /* ------------------------------------------------- scroll-linked bits */
  const tl = $("#timeline");
  const secEl = $("#sec");
  const yearEl = $("#year");
  const secs = ["stack", "origin", "path", "weird", "talk"].map((id) => document.getElementById(id));
  function onScroll() {
    // hero: chaos settles into order over the pinned stretch (or the first half screen where it is not pinned)
    if (!reduced) {
      const span = pin.offsetHeight - hero.offsetHeight;
      const k = clamp(scrollY / (span > 40 ? span * 0.85 : innerHeight * 0.5));
      boot = (1 - k) * (1 - k);
    }
    // timeline: the line grows, markers and years light up as it passes them
    const r = tl.getBoundingClientRect();
    const p = clamp((innerHeight * 0.6 - r.top) / r.height);
    root.style.setProperty("--p", p.toFixed(4));
    const lineY = r.top + p * r.height;
    jobs.forEach((j) => j.classList.toggle("on", j.getBoundingClientRect().top + 38 < lineY));
    // 2012 fills from the bottom while it crosses the screen
    root.style.setProperty("--fy", clamp((innerHeight * 0.92 - yearEl.getBoundingClientRect().top) / (innerHeight * 0.6)).toFixed(3));
    root.classList.toggle("scrolled", scrollY > 30);
    root.style.setProperty("--sp", clamp(scrollY / Math.max(1, root.scrollHeight - innerHeight)).toFixed(4));
    const cur = secs.filter((s) => s.getBoundingClientRect().top < innerHeight * 0.4).pop();
    setSection(cur ? cur.id : null);
    if (torch) torchMove(tx, ty);
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

  // run fn(k) with k easing from 0 to 1
  function tween(dur, fn) {
    const t0 = performance.now();
    (function tick(now) {
      const k = clamp((now - t0) / dur);
      fn(1 - Math.pow(1 - k, 3));
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }
  const once = (el, threshold, fn) =>
    new IntersectionObserver(([e], io) => { if (e.isIntersecting) { io.disconnect(); if (!reduced) fn(); } }, { threshold }).observe(el);
  // the year rewinds from today to 2012
  once(yearEl, 0.5, () => { const from = new Date().getFullYear(); tween(1500, (k) => { yearEl.textContent = Math.round(from + (2012 - from) * k); }); });
  // the numbers count in (zero counts down)
  once($("#nums"), 0.4, () =>
    tween(1200, (k) => $$("#nums b").forEach((b) => { const n = +b.dataset.n, from = n ? Math.max(0, n - 24) : 12; b.textContent = Math.round(from + (n - from) * k); }))
  );

  /* --------------------------------------------------------------- go */
  render();
  if (params.has("uv")) setUV(true);
  build();
  onScroll();
  document.body.classList.add("intro");
  setTimeout(() => document.body.classList.remove("intro"), 2600);
  requestAnimationFrame(frame);
  let rz;
  addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { torchOff(); build(); measureTokens(); onScroll(); if (reduced) requestAnimationFrame(frame); }, 150); });
})();
