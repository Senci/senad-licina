/* Renders the two-page A4 CV from content.js. Print it from the browser,
   or run `bun run pdf` to write both language versions to site/cv/. */
(() => {
  const C = window.CONTENT, M = C.meta;
  const q = new URLSearchParams(location.search);
  const pick = (l) => ["de", "en"].find((x) => String(l || "").toLowerCase().startsWith(x));
  const lang = pick(q.get("lang")) || pick(navigator.language) || "en";
  const t = C[lang];
  const e = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  document.documentElement.lang = lang;
  document.title = `${M.name}, ${t.ui.cv}`;

  const job = (j, extra = "") => `
    <article class="job">
      <header><h3>${e(j.org)}</h3><span class="when">${e(j.period)}</span></header>
      <p class="role">${e(j.role)}${j.place ? ", " + e(j.place) : ""}</p>
      <ul>${j.points.map((p) => `<li>${e(p)}</li>`).join("")}</ul>${extra}
    </article>`;
  // the same stack diagram as on the website, as a figure
  const [idn, obs, sec] = t.stack.rails;
  const fig = `
    <figure class="fig">
      <figcaption>${e(t.stack.title)}</figcaption>
      <div class="fig__grid">
        <div class="fig__rail fig__rail--l"><span>${e(idn.name)}</span></div>
        ${t.stack.layers.map((l, i) => `<div class="fig__row" style="grid-row:${i + 1}"><b>${e(l.name)}</b><span>${e(l.tech.split(", ").slice(0, 4).join(", "))}</span></div>`).join("")}
        <div class="fig__rail fig__rail--r"><span>${e(obs.name)}</span></div>
        <div class="fig__rail fig__rail--b"><span>${e(sec.name)}</span></div>
      </div>
    </figure>`;
  const block = (title, body) => `<section class="block"><h2>${e(title)}</h2>${body}</section>`;
  const foot = (n) => `<footer class="pfoot"><span>${e(M.name)}${M.website ? ", " + e(M.website) : ""}</span><span>${e(t.cv.page)} ${n}/2</span></footer>`;

  const contact =
    [M.city, M.email, M.phone, M.website].filter(Boolean).map((x) => `<span>${e(x)}</span>`).join("") +
    M.links.filter((l) => l.cv).map((l) => `<a href="${e(l.url)}" target="_blank" rel="noopener">${e(l.url.replace(/^https:\/\/(www\.)?|\/$/g, ""))}</a>`).join("");
  const jobs = t.path.jobs;

  const page1 = `
  <div class="page">
    <header class="head">
      <div class="head__text">
        <h1>${e(M.name)}</h1>
        <p class="head__title">${e(t.title)}</p>
        <p class="head__contact">${contact}</p>
      </div>
      <img class="head__img" src="assets/img/portrait-640.webp" alt="">
    </header>
    <div class="cols">
      <main>
        <p class="profile">${e(t.cv.profile)}</p>
        <section class="block"><h2>${e(t.cv.experience)}</h2>${job(jobs[0], fig)}</section>
      </main>
      <aside>
        ${block(t.education.title, t.education.items.map((x) => `<div class="edu"><b>${e(x.title)}</b><span>${e(x.org)}</span><span class="when">${e(x.period)}</span>${x.note ? `<span class="muted">${e(x.note)}</span>` : ""}</div>`).join(""))}
        ${block(t.cv.skillsTitle, t.cv.skills.filter((s) => !s.page2).map((s) => `<div class="skill"><b>${e(s.h)}</b><span>${e(s.t)}</span></div>`).join(""))}
      </aside>
    </div>
    ${foot(1)}
  </div>`;

  const page2 = `
  <div class="page page--2">
    <div class="cols">
      <main>
        <section class="block"><h2>${e(t.cv.experience)}</h2>${jobs.slice(1).map((j) => job(j)).join("")}</section>
        ${block(t.path.earlierTitle, t.path.earlier.map((x) => `<div class="row"><span class="when">${e(x.period)}</span><span><b>${e(x.org)}</b>${x.org.endsWith(".") ? "" : "."} ${e(x.what)}</span></div>`).join(""))}
      </main>
      <aside>
        ${t.cv.skills.filter((s) => s.page2).map((s) => block(s.h, `<p>${e(s.t)}</p>`)).join("")}
        ${block(t.cv.languagesTitle, t.cv.languages.map(([a, b]) => `<div class="lng"><b>${e(a)}</b><span>${e(b)}</span></div>`).join(""))}
        ${M.showNeuro ? block(t.cv.howTitle, `<p>${e(t.cv.how)}</p>`) : ""}
        ${block(t.cv.buildTitle, t.cv.building.map(([a, b]) => `<div class="skill"><b>${e(a)}</b><span>${e(b)}</span></div>`).join(""))}
        ${block(t.cv.offTitle, `<p>${e(t.cv.off)}</p>`)}
      </aside>
    </div>
    ${foot(2)}
  </div>`;

  document.getElementById("cv").innerHTML = page1 + page2;
  const back = document.getElementById("back");
  back.textContent = t.ui.back; back.href = `index.html?lang=${lang}`;
  const pr = document.getElementById("print");
  pr.textContent = t.ui.print; pr.onclick = () => print();
  document.getElementById("l-" + lang).setAttribute("aria-current", "true");
})();
