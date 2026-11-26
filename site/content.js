/*
 * Single source of truth. The website (index.html) and the CV (cv.html)
 * both render from this file. Edit text here, then run `bun run pdf`
 * to rebuild the PDFs.
 */
window.CONTENT = {
  meta: {
    name: "Senad Ličina",
    email: "senad@licina.eu",
    phone: "+49 151 506 705 19", // shown on the CV only, never on the website
    city: "Hamburg",
    website: "", // e.g. "licina.eu". If set, it is printed on the CV.
    url: "https://licina.eu",
    repo: "https://github.com/Senci/senad-licina", // linked from the "About this site" dialog // canonical origin for search engines and link previews; English at /, German at /de
    // search engines: topics for the structured data (schema.org Person.knowsAbout)
    knowsAbout: ["Artificial intelligence", "Large language models", "AI adoption in small and mid-sized companies", "On-premises AI", "Microsoft 365 Copilot", "Retrieval-augmented generation", "LLM inference", "vLLM", "Kubernetes", "GitOps", "Linux", "Infrastructure as code", "Keycloak", "Single sign-on", "IT security", "BSI IT-Grundschutz", "Observability"],
    // profile links in the website footer (icon = a b-<name> symbol in index.html); cv: true also prints the link in the CV header
    links: [
      { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/senad-licina/", cv: true },
      { label: "GitHub", icon: "github", url: "https://github.com/senci", cv: true },
      { label: "Stack Overflow", icon: "stackoverflow", url: "https://stackoverflow.com/users/1139383/sen%C4%8Di" },
      { label: "Hugging Face", icon: "huggingface", url: "https://huggingface.co/s3nci" },
      { label: "SoundCloud", icon: "soundcloud", url: "https://soundcloud.com/s3nci" },
    ],
    // the Free Software Song (words: Richard Stallman), handwritten into the page margins, visible under blacklight only
    song: [
      ["Join us now and share the software;", "You'll be free, hackers, you'll be free."],
      ["Hoarders can get piles of money,", "That is true, hackers, that is true."],
      ["But they cannot help their neighbors;", "That's not good, hackers, that's not good."],
      ["When we have enough free software", "At our call, hackers, at our call,"],
      ["We'll kick out those dirty licenses", "Ever more, hackers, ever more."],
    ],
    showNeuro: true, // false removes the AuDHD lines from site and CV
    cvFiles: { en: "cv/Senad_Licina_CV_EN.pdf", de: "cv/Senad_Licina_CV_DE.pdf" },
  },

  /* ------------------------------------------------------------ EN */
  en: {
    ui: {
      cv: "CV",
      contact: "Contact",
      blacklight: "Blacklight",
      skip: "Skip to content",
      downloadCv: "Download CV (PDF)",
      writeMe: "Write to me",
      explore: "Explore the stack",
      print: "Print or save as PDF",
      back: "Back to the website",
      sound: "Sound",
      langSwitch: "Auf Deutsch umschalten",
      scroll: "Scroll",
      torch: "Hold the mouse button anywhere: blacklight torch",
      foot: "No cookies. No tracking scripts. No framework.",
    },
    about: {
      link: "About this site",
      title: "About this site",
      close: "Close",
      source: "Source code on GitHub",
      sections: [
        { h: "Made with", items: [
          "Hand-written HTML, CSS and JavaScript. No framework, no libraries in the page.",
          "Bun serves it during development. Playwright prints the CV PDFs from the same content file as this page.",
          "Written together with coding agents (Claude). I decide, they type.",
        ] },
        { h: "Type and icons", items: [
          "Anton, Fira Sans and the handwriting Caveat, all under the SIL Open Font License, served from this site.",
          "Interface icons are drawn by hand for this page.",
          "Profile logos: outlines from Simple Icons (CC0). The logos belong to their owners.",
        ] },
        { h: "Lyrics and sound", items: [
          "The handwriting you find under blacklight is the Free Software Song. Words by Richard Stallman, to the Bulgarian folk tune Sadi moma bela loza. He and the Free Software Foundation claim no copyright on it.",
          "The beat under blacklight is synthesized in your browser. No audio file is loaded.",
        ] },
        { h: "Photo and text", items: ["Portrait and all text: Senad Ličina."] },
        { h: "Hosting and statistics", items: [
          "Hosted on Cloudflare. To deliver the page, Cloudflare processes your IP address and counts requests. I look at those totals.",
          "The page sets no cookies, runs no tracking script and loads nothing from other domains.",
        ] },
      ],
    },
    sections: { start: "Start", stack: "Stack", origin: "2012", path: "Path", weird: "Weird", talk: "Contact" }, // short names for the top bar
    title: "AI Platform and Infrastructure Lead",
    seo: {
      title: "Senad Ličina: AI platforms and AI adoption, Hamburg",
      description: "AI platform and infrastructure lead in Hamburg. AI for mid-sized companies: Microsoft 365 Copilot or private models on your own hardware. Start small, measure.",
    },
    hero: {
      headline: ["I run AI where", "the cloud isn't", "allowed."],
      sub: "AI Platform and Infrastructure Lead in Hamburg. I build and operate private AI platforms: language models on our own GPUs, on Kubernetes, behind single sign-on, in networks that never see the internet. And I help companies start small: one use case, standard tools, a result you can measure.",
    },
    start: {
      title: "Start small. Measure. Then decide.",
      intro: "AI does not have to start with GPU servers. Most companies get the first return from one clear use case on a standard tool they often already pay for. I pick the cheapest setup your data allows.",
      items: [
        { h: "Answers from your documents", t: "Handbooks, contracts, product data, the wiki. People ask in plain language and get the passage with its source." },
        { h: "Mail and tickets", t: "Reply drafts, sorted inboxes, summaries of long threads. People check and send, the model types." },
        { h: "Meetings and minutes", t: "Transcript, decisions and to-dos from every call, filed where the team already works." },
        { h: "Quotes and paperwork", t: "Data from PDFs and forms into the ERP, offers compared, documents checked against a list." },
      ],
      stepsTitle: "How it goes",
      steps: [
        "A workshop: one use case, and the number it has to beat.",
        "A pilot on a standard tool, with real users, in weeks.",
        "Scale it if the number moved. Stop it if it did not.",
      ],
      tools: "Standard where it fits: Microsoft 365 Copilot, ChatGPT Enterprise, Azure OpenAI or Mistral with EU hosting. Own hardware where it has to be.",
    },
    stack: {
      title: "The stack I run",
      intro: "Eight layers, zero cloud APIs, one person responsible. Most people in AI work on one of these layers. I own all of them, from the rack to the person typing a question. Pick a layer, or follow one question through.",
      ask: {
        label: "Follow one question",
        placeholder: "Where do I find the onboarding guide?", // also the question used when the field is left empty
        send: "Go",
        title: "Request path",
        // [layer id, what happens there]; played top to bottom
        steps: [
          ["people", "A colleague types a question. One assistant for the whole company, not one per team."],
          ["identity", "Keycloak checks who is asking. One front door, federated with Active Directory."],
          ["platform", "Retrieval over Confluence, Jira and the knowledge bases. It names its sources, or says it found nothing."],
          ["security", "What comes back is treated as data, not as instructions. A model with tools is an attack surface."],
          ["inference", "An open-weight model, quantized to fit the hardware and benchmarked before anyone used it."],
          ["cluster", "Scheduled on Kubernetes, built to work with no internet at all."],
          ["metal", "Our own GPUs in our own rack. There is no cloud API to fall back on."],
          ["observability", "Tokens per second land on the same dashboard as disk space."],
        ],
        answer: "No model answered this. The trace above is a script. The real assistant sits on our own hardware behind single sign-on, and this website cannot reach it. That is the point.",
      },
      layers: [
        {
          id: "people",
          name: "People",
          tech: "Coding agents, agent skills, guidelines, training",
          text: "I am the one colleagues ask. I set up coding agents and shared skills for the team, write the rules for using them safely, and sit down with whoever is stuck until it works.",
        },
        {
          id: "platform",
          name: "AI platform",
          tech: "Open WebUI, RAG, tool calling, MCP, prompt-injection controls",
          text: "One internal assistant for the whole company, with 300+ users. Chat, retrieval over Confluence, Jira and our knowledge bases, and tool use. It names its sources and says so when it found nothing.",
        },
        {
          id: "inference",
          name: "Model serving",
          tech: "vLLM, SGLang, Qwen, NVFP4 quantization, OpenAI-compatible API",
          text: "Open-weight models, quantized to fit the hardware. I benchmark serving engines and quantizations before anything reaches users, and I watch tokens per second the way other people watch uptime.",
        },
        {
          id: "cluster",
          name: "Cluster",
          tech: "Kubernetes (RKE2), Rancher Fleet GitOps, Harvester, Longhorn, Helm, Ansible, Packer",
          text: "Kubernetes on hyperconverged hardware, built so that it works with no internet at all. Everything is code, and the automation is boring on purpose.",
        },
        {
          id: "metal",
          name: "Metal",
          tech: "NVIDIA RTX PRO 6000 Blackwell servers, on-prem, air-gap capable",
          text: "Our own GPU servers in our own racks. No SaaS, no cloud API, no data leaving the building. This constraint is what makes every layer above it interesting.",
        },
      ],
      rails: [
        {
          id: "identity",
          name: "Identity",
          tech: "Keycloak, OIDC, SAML, Active Directory, RADIUS, OpenBao (Vault)",
          text: "Keycloak federated with Active Directory is the single front door to the AI platform and internal apps. Secrets live in a central vault, not in wikis. I have done this since my bachelor thesis: an OAuth 2.0 single sign-on for the university's Active Directory, started when the RFC was barely out.",
        },
        {
          id: "observability",
          name: "Observability",
          tech: "Prometheus, Loki, Grafana, Alloy",
          text: "Metrics and logs from Linux, Windows and Kubernetes in one self-hosted stack. GPU throughput sits on the same dashboards as disk space.",
        },
        {
          id: "security",
          name: "Security",
          tech: "SELinux enforcing, rootless containers, private PKI, hardening baselines (BSI, CIS, STIG), BSI 200-3 risk analysis, CVE triage",
          text: "The floor everything else stands on. Hosts run SELinux in enforcing mode, containers run rootless, certificates come from our own PKI and secrets never sit in a repository. I write the risk analyses, measure hardening against BSI, CIS and STIG baselines, check every relevant CVE against what we actually run, and treat a language model with tools as what it is: an attack surface.",
        },
      ],
    },
    origin: {
      year: "2012",
      title: "I enrolled in an AI degree when nobody asked for one.",
      text: [
        "Intelligent Adaptive Systems at Universität Hamburg: neural networks, machine learning, robotics. In 2012 that was a niche choice with unclear job prospects.",
        "So I spent the next decade on the unglamorous half: banking APIs, CI/CD, Kubernetes, GDPR, teams, production at night. Now the two halves are one job, and I have both.",
      ],
    },
    path: {
      title: "Where I have been",
      jobs: [
        {
          period: "2025 – now",
          org: "Plath GmbH",
          place: "Hamburg",
          role: "Tech Lead, AI Platform and Infrastructure",
          points: [
            "AI lead for the company. I built and run the internal AI platform (300+ users): chat, retrieval over Confluence, Jira and knowledge bases, and tool use, on models we host ourselves.",
            "LLM inference on our own NVIDIA Blackwell GPU servers with vLLM and quantized open-weight models. Engines and quantizations are benchmarked before rollout, throughput is monitored in Grafana.",
            "All of it on-prem and air-gap capable. No SaaS, no cloud APIs. Kubernetes (RKE2 on Harvester), automated with Ansible.",
            "Identity and security: Keycloak single sign-on federated to Active Directory. SELinux enforcing, rootless containers, our own PKI, central secrets management, risk analyses to BSI 200-3.",
            "Self-hosted observability for Linux, Windows and Kubernetes with Prometheus, Loki, Grafana and Grafana Alloy.",
            "First contact for colleagues on anything AI: coding agents, shared skills and standards, security concepts for tool use and web search.",
          ],
        },
        {
          period: "2019 – now",
          org: "Geoparadise Inc.",
          place: "Panama",
          role: "Tech Lead and IT Consultant",
          points: [
            "IT strategy, upgrades and infrastructure for a cultural and community organisation. I lead a globally distributed team.",
            "Built, deployed and host the in-house software (Directus, PostgreSQL, React, Vue) and extended Odoo.",
            "Set up and ran servers and networks on site in the jungle, and trained the people who keep them running.",
          ],
        },
        {
          period: "2018 – 2025",
          org: "Ličina & Helms",
          place: "Hamburg",
          role: "Senior Software Engineer, freelance",
          points: [
            "GDPR-compliant auditing software for a law firm and a social media monitoring tool (Django, Vue).",
            "GDPR-compliant conferencing and collaboration platform together.biz for Coco GmbH (Directus, React).",
          ],
        },
        {
          period: "2020 – 2022",
          org: "Wallis GmbH",
          place: "",
          role: "Senior Software Engineer",
          points: [
            "Built a banking API to the PSD2 standard in Spring Boot.",
            "Moved the team from Jenkins to GitLab CI/CD and built the Kubernetes infrastructure on Azure.",
            "Raised test coverage (JUnit, Cypress, Cucumber).",
          ],
        },
        {
          period: "2016 – 2020",
          org: "Sparkassen Innovation Hub",
          place: "Hamburg",
          role: "Senior Software Engineer",
          points: [
            "PSD2 expert for ahoi: one API to accounts at German banks, whatever data centre or interface (PSD2, HBCI/FinTS) is behind them.",
            "Implemented the EU and German specs as they came out, the bank connectors per data centre and the public API (OpenAPI, generated clients).",
            "Modernised the stack and CI/CD, trained colleagues, gave talks.",
          ],
        },
      ],
      earlierTitle: "Earlier",
      earlier: [
        { period: "2016 – 2018", org: "Timecake Factory GmbH", what: "Progressive web app for a social calendar with an animated vector UI (Vue, Laravel)" },
        { period: "2013 – 2016", org: "Star Finanz GmbH", what: "Banking software in Java and JavaScript, plus Objective-C and C++" },
        { period: "2012 – 2013", org: "Digital Pioneers N.V.", what: "First backend of the Stuffle marketplace app (Symfony)" },
        { period: "2011 – 2012", org: "Renewable Energy Technology Centre", what: "Funding database for renewable energy projects (Django)" },
        { period: "2010 – 2011", org: "Universität Hamburg", what: "Led exercise groups in software engineering (Java)" },
      ],
    },
    education: {
      title: "Education",
      items: [
        { period: "2012 – 2016", title: "M.Sc. Intelligent Adaptive Systems", org: "Universität Hamburg, international programme", note: "Neural networks, machine learning, robotics, big data" },
        { period: "2007 – 2013", title: "B.Sc. Informatik", org: "Universität Hamburg", note: "Thesis: oauth-infrz, OAuth 2.0 single sign-on for the department's Active Directory" },
      ],
    },
    weird: {
      title: "Weird.\nIt's a feature, not a bug!",
      intro: "Normal people built the systems everyone now wants to replace. Here is what you get with me.",
      neuro: {
        h: "AuDHD",
        t: "My brain collects patterns, locks on to a problem for hours and refuses vague instructions. Language models need exactly that from whoever steers them.",
      },
      items: [
        { h: "Psytrance", t: "I produce and DJ it, and I write audio and signal-processing code on the side. Arranging eight minutes at 145 bpm is systems design with a kick drum." },
        { h: "A Tetris cabinet", t: "Two players, laser-cut, RP2040 and a wall of WS2812B LEDs. I am building it because it should exist." },
        { h: "Jungle ops", t: "I have run servers and networks in the Panamanian rainforest. Your data centre has air conditioning. You will be fine." },
        { h: "Six languages", t: "German, English, Bosnian/Croatian/Serbian, French, Spanish, some Portuguese. Plus the ones with compilers." },
        { h: "Chaos since 2009", t: "On Linux since 2007. Chaos events since Hacking at Random in 2009, and FOSDEM for the free software. Crypto and security are a habit for me, not a compliance checkbox." },
        { h: "Jack of all trades", t: "More than a decade of writing it all by hand: backend, frontend, mobile, firmware, audio and signal processing. Coding agents do the typing now. I still know when they are wrong." },
      ],
      cta: "There is a second layer to this page. Switch on the blacklight.",
      ctaOff: "Enough. Lights back on.",
    },
    talk: {
      title: "Talk to me if",
      items: [
        "you want to start with AI without turning it into a big project, and want to know which standard tool is enough.",
        "you need language models running on your own hardware, and they must not phone home.",
        "your AI project is stuck between a demo and something compliance will sign.",
        "you want SSO, access control and audit around AI from someone who has built both sides.",
        "your AI has to pass a security review: hardened hosts, a written risk analysis and an answer to prompt injection.",
        "you want a team that works with coding agents instead of talking about them.",
      ],
      closing: "I answer email.",
    },
    notes: {
      hero: "also: 145 bpm",
      start: "no GPU rack required",
      portrait: "yes, the shirt is the brand colour",
      stack: "turtles all the way down, but documented",
      origin: "before it was cool. it was never cool.",
      path: "nobody plans a CV like this. good.",
      talk: "bring weird problems",
    },
    cv: {
      profileTitle: "Profile",
      profile: "I build and run private AI platforms: language models on our own GPUs, on Kubernetes, behind single sign-on, in networks that never see the internet. I studied AI at Universität Hamburg from 2012, then spent more than a decade shipping production software for banks, law firms and startups. I know how the models work, and I know how to keep the system under them alive and secure.",
      experience: "Experience",
      skillsTitle: "Skills",
      skills: [
        { h: "AI platform", t: "LLM serving (vLLM, SGLang), LLM gateways (LiteLLM), Open WebUI, RAG, tool calling, MCP, n8n, coding agents and agent skills, quantization, benchmarking" },
        { h: "Infrastructure", t: "Linux since 2007 (RHEL/Rocky, Ubuntu, Debian, SUSE), Kubernetes (RKE2, Rancher, Fleet, Helm), Harvester, Podman, Docker, Ansible, Packer, OpenTofu (Terraform), GitLab CI/CD, Azure" },
        { h: "Security and identity", t: "SELinux, rootless containers, PKI, OpenBao (Vault), hardening (BSI, CIS, STIG), risk analysis (BSI 200-3), CVE triage, Keycloak, OAuth 2.0, OIDC, SAML, Active Directory, RADIUS, GDPR, PSD2" },
        { h: "Observability", t: "Prometheus, Alertmanager, Loki, Grafana, Grafana Alloy" },
        { h: "Software", t: "TypeScript (Vue, React, Node), Python (Django), Java (Spring Boot), PHP (Symfony, Laravel), C++ (audio, signal processing), PostgreSQL", page2: true },
      ],
      languagesTitle: "Languages",
      languages: [
        ["German", "native"],
        ["English", "fluent, TOEFL"],
        ["Bosnian/Croatian/Serbian", "fluent"],
        ["French", "intermediate"],
        ["Spanish", "intermediate"],
        ["Portuguese", "basic"],
      ],
      howTitle: "How I work",
      how: "AuDHD. I see patterns fast, go deep for hours and have no patience for vague. It makes me very good with systems, and with the language models that now run on them.",
      offTitle: "Off the clock",
      off: "Psytrance producer and DJ. Chaos events since 2009, FOSDEM. Hydroponics, drones, long road trips.",
      buildTitle: "Currently building",
      building: [
        ["LOOPWAR", "Browser game in which music producers battle with the same samples. I build it with coding agents."],
        ["Tetris arcade cabinet", "Two players, laser-cut, RP2040, custom firmware."],
      ],
      page: "Page",
    },
  },

  /* ------------------------------------------------------------ DE */
  de: {
    ui: {
      cv: "Lebenslauf",
      contact: "Kontakt",
      blacklight: "Schwarzlicht",
      skip: "Zum Inhalt springen",
      downloadCv: "Lebenslauf laden (PDF)",
      writeMe: "Schreib mir",
      explore: "Stack ansehen",
      print: "Drucken oder als PDF sichern",
      back: "Zurück zur Website",
      sound: "Sound",
      langSwitch: "Switch to English",
      scroll: "Scrollen",
      torch: "Maustaste irgendwo gedrückt halten: Schwarzlicht-Lampe",
      foot: "Keine Cookies. Keine Tracking-Skripte. Kein Framework.",
    },
    about: {
      link: "Über diese Seite",
      title: "Über diese Seite",
      close: "Schließen",
      source: "Quellcode auf GitHub",
      sections: [
        { h: "Gebaut mit", items: [
          "Handgeschriebenes HTML, CSS und JavaScript. Kein Framework, keine Bibliotheken in der Seite.",
          "Bun liefert sie während der Entwicklung aus. Playwright druckt die Lebenslauf-PDFs aus derselben Inhaltsdatei wie diese Seite.",
          "Zusammen mit Coding Agents (Claude) geschrieben. Ich entscheide, sie tippen.",
        ] },
        { h: "Schrift und Icons", items: [
          "Anton, Fira Sans und die Handschrift Caveat, alle unter der SIL Open Font License, von dieser Seite ausgeliefert.",
          "Die Icons der Oberfläche sind für diese Seite von Hand gezeichnet.",
          "Profil-Logos: Umrisse aus Simple Icons (CC0). Die Logos gehören ihren Inhabern.",
        ] },
        { h: "Liedtext und Sound", items: [
          "Die Handschrift, die du im Schwarzlicht findest, ist der Free Software Song. Text von Richard Stallman, zur bulgarischen Volksmelodie Sadi moma bela loza. Er und die Free Software Foundation beanspruchen kein Urheberrecht daran.",
          "Der Beat im Schwarzlicht wird in deinem Browser erzeugt. Es wird keine Audiodatei geladen.",
        ] },
        { h: "Foto und Text", items: ["Porträt und alle Texte: Senad Ličina."] },
        { h: "Hosting und Statistik", items: [
          "Gehostet bei Cloudflare. Um die Seite auszuliefern, verarbeitet Cloudflare deine IP-Adresse und zählt Anfragen. Diese Summen sehe ich mir an.",
          "Die Seite setzt keine Cookies, führt kein Tracking-Skript aus und lädt nichts von anderen Domains.",
        ] },
      ],
    },
    sections: { start: "Einstieg", stack: "Stack", origin: "2012", path: "Weg", weird: "Weird", talk: "Kontakt" },
    title: "AI Platform und Infrastructure Lead",
    seo: {
      title: "Senad Ličina: KI-Plattformen und KI-Einstieg, Hamburg",
      description: "AI Platform und Infrastructure Lead in Hamburg. KI für den Mittelstand: Microsoft 365 Copilot oder eigene Modelle auf eigener Hardware. Klein anfangen, messen.",
    },
    hero: {
      headline: ["Ich betreibe KI,", "wo die Cloud", "nicht hin darf."],
      sub: "AI Platform und Infrastructure Lead in Hamburg. Ich baue und betreibe private KI-Plattformen: Sprachmodelle auf eigenen GPUs, auf Kubernetes, hinter Single Sign-on, in Netzen, die das Internet nie sehen. Und ich helfe Firmen, klein anzufangen: ein Anwendungsfall, Standardwerkzeuge, ein messbares Ergebnis.",
    },
    start: {
      title: "Klein anfangen. Messen. Dann entscheiden.",
      intro: "KI muss nicht mit GPU-Servern anfangen. Den ersten Nutzen holen die meisten Firmen aus einem klaren Anwendungsfall mit einem Standardwerkzeug, für das sie oft schon bezahlen. Ich wähle das günstigste Setup, das eure Daten erlauben.",
      items: [
        { h: "Antworten aus euren Dokumenten", t: "Handbücher, Verträge, Produktdaten, das Wiki. Mitarbeitende fragen in normaler Sprache und bekommen die Stelle samt Quelle." },
        { h: "Mails und Tickets", t: "Antwortentwürfe, sortierte Postfächer, Zusammenfassungen langer Verläufe. Menschen prüfen und senden, das Modell tippt." },
        { h: "Meetings und Protokolle", t: "Mitschrift, Entscheidungen und To-dos aus jedem Termin, abgelegt dort, wo das Team ohnehin arbeitet." },
        { h: "Angebote und Papierkram", t: "Daten aus PDFs und Formularen ins ERP, Angebote verglichen, Unterlagen gegen eine Checkliste geprüft." },
      ],
      stepsTitle: "So läuft es",
      steps: [
        "Ein Workshop: ein Anwendungsfall und die Zahl, die er schlagen muss.",
        "Ein Pilot mit einem Standardwerkzeug und echten Nutzern, in Wochen.",
        "Ausbauen, wenn sich die Zahl bewegt hat. Beenden, wenn nicht.",
      ],
      tools: "Standard, wo es passt: Microsoft 365 Copilot, ChatGPT Enterprise, Azure OpenAI oder Mistral mit EU-Hosting. Eigene Hardware, wo es sein muss.",
    },
    stack: {
      title: "Der Stack, den ich betreibe",
      intro: "Acht Ebenen, null Cloud-APIs, eine verantwortliche Person. Die meisten in der KI arbeiten auf einer dieser Ebenen. Ich verantworte alle, vom Rack bis zum Menschen, der eine Frage tippt. Wähl eine Ebene oder folge einer Frage durch den Stack.",
      ask: {
        label: "Einer Frage folgen",
        placeholder: "Wo finde ich den Onboarding-Leitfaden?",
        send: "Los",
        title: "Weg der Anfrage",
        steps: [
          ["people", "Jemand im Team tippt eine Frage. Ein Assistent für die ganze Firma, nicht einer pro Team."],
          ["identity", "Keycloak prüft, wer fragt. Eine Eingangstür, föderiert mit dem Active Directory."],
          ["platform", "Suche über Confluence, Jira und die Wissensdatenbanken. Er nennt seine Quellen oder sagt, dass er nichts gefunden hat."],
          ["security", "Was zurückkommt, gilt als Daten, nicht als Anweisung. Ein Modell mit Tools ist eine Angriffsfläche."],
          ["inference", "Ein offenes Modell, passend zur Hardware quantisiert und gebenchmarkt, bevor es jemand benutzt hat."],
          ["cluster", "Auf Kubernetes eingeplant, gebaut für den Betrieb ganz ohne Internet."],
          ["metal", "Eigene GPUs im eigenen Rack. Es gibt keine Cloud-API als Rückfallebene."],
          ["observability", "Tokens pro Sekunde landen auf demselben Dashboard wie der Plattenplatz."],
        ],
        answer: "Diese Frage hat kein Modell beantwortet. Der Weg oben ist ein Skript. Der echte Assistent steht auf eigener Hardware hinter Single Sign-on, und diese Website kommt nicht an ihn heran. Genau darum geht es.",
      },
      layers: [
        {
          id: "people",
          name: "Menschen",
          tech: "Coding Agents, Agent Skills, Leitlinien, Schulung",
          text: "Ich bin der, den die Kollegen fragen. Ich richte Coding Agents und gemeinsame Skills für das Team ein, schreibe die Regeln für den sicheren Umgang damit und setze mich dazu, bis es läuft.",
        },
        {
          id: "platform",
          name: "KI-Plattform",
          tech: "Open WebUI, RAG, Tool Calling, MCP, Schutz vor Prompt Injection",
          text: "Ein interner Assistent für die ganze Firma, mit über 300 Nutzern. Chat, Suche über Confluence, Jira und unsere Wissensdatenbanken, dazu Tools. Er nennt seine Quellen und sagt es, wenn er nichts gefunden hat.",
        },
        {
          id: "inference",
          name: "Model Serving",
          tech: "vLLM, SGLang, Qwen, NVFP4-Quantisierung, OpenAI-kompatible API",
          text: "Offene Modelle, passend zur Hardware quantisiert. Ich benchmarke Serving-Engines und Quantisierungen, bevor etwas bei den Nutzern landet, und beobachte Tokens pro Sekunde wie andere die Uptime.",
        },
        {
          id: "cluster",
          name: "Cluster",
          tech: "Kubernetes (RKE2), Rancher Fleet GitOps, Harvester, Longhorn, Helm, Ansible, Packer",
          text: "Kubernetes auf hyperkonvergenter Hardware, so gebaut, dass es ganz ohne Internet funktioniert. Alles ist Code, und die Automatisierung ist mit Absicht langweilig.",
        },
        {
          id: "metal",
          name: "Blech",
          tech: "NVIDIA RTX PRO 6000 Blackwell Server, On-Prem, Air-Gap-fähig",
          text: "Eigene GPU-Server in eigenen Racks. Kein SaaS, keine Cloud-API, keine Daten, die das Haus verlassen. Genau diese Einschränkung macht jede Ebene darüber interessant.",
        },
      ],
      rails: [
        {
          id: "identity",
          name: "Identität",
          tech: "Keycloak, OIDC, SAML, Active Directory, RADIUS, OpenBao (Vault)",
          text: "Keycloak mit Active-Directory-Föderation ist die eine Eingangstür zur KI-Plattform und zu internen Anwendungen. Secrets liegen in einem zentralen Vault, nicht im Wiki. Das mache ich seit meiner Bachelorarbeit: ein OAuth-2.0-Single-Sign-on für das Active Directory der Uni, begonnen, als der RFC gerade erschienen war.",
        },
        {
          id: "observability",
          name: "Observability",
          tech: "Prometheus, Loki, Grafana, Alloy",
          text: "Metriken und Logs aus Linux, Windows und Kubernetes in einem selbst gehosteten Stack. Der GPU-Durchsatz steht auf denselben Dashboards wie der Plattenplatz.",
        },
        {
          id: "security",
          name: "Security",
          tech: "SELinux enforcing, Rootless-Container, eigene PKI, Härtungs-Baselines (BSI, CIS, STIG), Risikoanalyse nach BSI 200-3, CVE-Triage",
          text: "Der Boden, auf dem alles andere steht. Hosts laufen mit SELinux im Enforcing-Modus, Container rootless, Zertifikate kommen aus der eigenen PKI, und Secrets liegen nie im Repository. Ich schreibe die Risikoanalysen, messe die Härtung an BSI-, CIS- und STIG-Baselines, prüfe jede relevante CVE gegen das, was bei uns wirklich läuft, und behandle ein Sprachmodell mit Tools als das, was es ist: eine Angriffsfläche.",
        },
      ],
    },
    origin: {
      year: "2012",
      title: "Ich habe KI studiert, als niemand danach gefragt hat.",
      text: [
        "Intelligent Adaptive Systems an der Universität Hamburg: neuronale Netze, maschinelles Lernen, Robotik. 2012 war das eine Nischenwahl mit unklaren Jobaussichten.",
        "Also habe ich zehn Jahre die unglamouröse Hälfte gemacht: Banking-APIs, CI/CD, Kubernetes, DSGVO, Teams, Produktion bei Nacht. Jetzt sind beide Hälften ein Job, und ich habe beide.",
      ],
    },
    path: {
      title: "Wo ich war",
      jobs: [
        {
          period: "2025 – heute",
          org: "Plath GmbH",
          place: "Hamburg",
          role: "Tech Lead, KI-Plattform und Infrastruktur",
          points: [
            "KI-Verantwortlicher im Unternehmen. Ich habe die interne KI-Plattform aufgebaut und betreibe sie (über 300 Nutzer): Chat, Suche über Confluence, Jira und Wissensdatenbanken sowie Tools, auf selbst gehosteten Modellen.",
            "LLM-Inferenz auf eigenen NVIDIA-Blackwell-GPU-Servern mit vLLM und quantisierten offenen Modellen. Engines und Quantisierungen werden vor dem Rollout gebenchmarkt, der Durchsatz in Grafana überwacht.",
            "Alles On-Prem und Air-Gap-fähig. Kein SaaS, keine Cloud-APIs. Kubernetes (RKE2 auf Harvester), automatisiert mit Ansible.",
            "Identität und Security: Single Sign-on mit Keycloak und Active-Directory-Föderation. SELinux enforcing, Rootless-Container, eigene PKI, zentrales Secrets-Management, Risikoanalysen nach BSI 200-3.",
            "Selbst gehostete Observability für Linux, Windows und Kubernetes mit Prometheus, Loki, Grafana und Grafana Alloy.",
            "Erster Ansprechpartner für Kollegen bei allem rund um KI: Coding Agents, gemeinsame Skills und Standards, Sicherheitskonzepte für Tools und Websuche.",
          ],
        },
        {
          period: "2019 – heute",
          org: "Geoparadise Inc.",
          place: "Panama",
          role: "Tech Lead und IT-Berater",
          points: [
            "IT-Strategie, Upgrades und Infrastruktur für eine Kultur- und Community-Organisation. Ich leite ein global verteiltes Team.",
            "Entwicklung, Deployment und Hosting der hauseigenen Software (Directus, PostgreSQL, React, Vue), dazu Erweiterungen für Odoo.",
            "Server und Netzwerke vor Ort im Dschungel aufgebaut und betrieben und die Leute geschult, die sie am Laufen halten.",
          ],
        },
        {
          period: "2018 – 2025",
          org: "Ličina & Helms",
          place: "Hamburg",
          role: "Senior Software Engineer, freiberuflich",
          points: [
            "DSGVO-konforme Auditing-Software für eine Anwaltskanzlei und ein Social-Media-Monitoring-Tool (Django, Vue).",
            "DSGVO-konforme Konferenz- und Kollaborationsplattform together.biz für die Coco GmbH (Directus, React).",
          ],
        },
        {
          period: "2020 – 2022",
          org: "Wallis GmbH",
          place: "",
          role: "Senior Software Engineer",
          points: [
            "Banking-API nach PSD2-Standard in Spring Boot entwickelt.",
            "Das Team von Jenkins auf GitLab CI/CD umgestellt und die Kubernetes-Infrastruktur auf Azure aufgebaut.",
            "Testabdeckung erhöht (JUnit, Cypress, Cucumber).",
          ],
        },
        {
          period: "2016 – 2020",
          org: "Sparkassen Innovation Hub",
          place: "Hamburg",
          role: "Senior Software Engineer",
          points: [
            "PSD2-Experte für ahoi: eine API für Konten bei deutschen Banken, unabhängig von Rechenzentrum und Schnittstelle (PSD2, HBCI/FinTS).",
            "EU- und deutsche Spezifikationen bei Erscheinen umgesetzt, dazu die Bankanbindung je Rechenzentrum und die öffentliche API (OpenAPI, generierte Clients).",
            "Stack und CI/CD modernisiert, Kollegen geschult, Vorträge gehalten.",
          ],
        },
      ],
      earlierTitle: "Davor",
      earlier: [
        { period: "2016 – 2018", org: "Timecake Factory GmbH", what: "Progressive Web App für einen sozialen Kalender mit animierter Vektor-UI (Vue, Laravel)" },
        { period: "2013 – 2016", org: "Star Finanz GmbH", what: "Banking-Software in Java und JavaScript, dazu Objective-C und C++" },
        { period: "2012 – 2013", org: "Digital Pioneers N.V.", what: "Erstes Backend der Marktplatz-App Stuffle (Symfony)" },
        { period: "2011 – 2012", org: "Renewable Energy Technology Centre", what: "Förderdatenbank für Projekte der erneuerbaren Energien (Django)" },
        { period: "2010 – 2011", org: "Universität Hamburg", what: "Übungsgruppenleiter für Softwareentwicklung (Java)" },
      ],
    },
    education: {
      title: "Ausbildung",
      items: [
        { period: "2012 – 2016", title: "M.Sc. Intelligent Adaptive Systems", org: "Universität Hamburg, internationaler Studiengang", note: "Neuronale Netze, maschinelles Lernen, Robotik, Big Data" },
        { period: "2007 – 2013", title: "B.Sc. Informatik", org: "Universität Hamburg", note: "Abschlussarbeit: oauth-infrz, OAuth-2.0-Single-Sign-on für das Active Directory des Fachbereichs" },
      ],
    },
    weird: {
      title: "Weird.\nIt's a feature, not a bug!",
      intro: "Normale Leute haben die Systeme gebaut, die jetzt alle ersetzen wollen. Das hier bekommst du mit mir.",
      neuro: {
        h: "AuDHS",
        t: "Mein Kopf sammelt Muster, verbeißt sich stundenlang in ein Problem und verweigert vage Ansagen. Genau das brauchen Sprachmodelle von dem, der sie steuert.",
      },
      items: [
        { h: "Psytrance", t: "Ich produziere und lege auf, und nebenbei programmiere ich Audio und Signalverarbeitung. Acht Minuten bei 145 bpm zu arrangieren ist Systemdesign mit Kickdrum." },
        { h: "Ein Tetris-Automat", t: "Zwei Spieler, lasergeschnitten, RP2040 und eine Wand aus WS2812B-LEDs. Ich baue ihn, weil es ihn geben sollte." },
        { h: "Dschungel-Ops", t: "Ich habe Server und Netzwerke im Regenwald von Panama betrieben. Dein Rechenzentrum hat eine Klimaanlage. Das wird schon." },
        { h: "Sechs Sprachen", t: "Deutsch, Englisch, Bosnisch/Kroatisch/Serbisch, Französisch, Spanisch, etwas Portugiesisch. Dazu die mit Compiler." },
        { h: "Chaos seit 2009", t: "Seit 2007 auf Linux. Chaos-Events seit der Hacking at Random 2009, dazu die FOSDEM für freie Software. Krypto und Security sind für mich Gewohnheit, kein Compliance-Häkchen." },
        { h: "Generalist", t: "Mehr als ein Jahrzehnt alles von Hand geschrieben: Backend, Frontend, Mobile, Firmware, Audio und Signalverarbeitung. Heute tippen Coding Agents. Ich merke trotzdem, wenn sie falsch liegen." },
      ],
      cta: "Diese Seite hat eine zweite Ebene. Mach das Schwarzlicht an.",
      ctaOff: "Genug. Licht wieder an.",
    },
    talk: {
      title: "Schreib mir, wenn",
      items: [
        "ihr mit KI anfangen wollt, ohne ein Großprojekt daraus zu machen, und wissen wollt, welches Standardwerkzeug reicht.",
        "Sprachmodelle auf eurer eigenen Hardware laufen sollen und nicht nach Hause telefonieren dürfen.",
        "euer KI-Projekt zwischen Demo und etwas feststeckt, das die Compliance unterschreibt.",
        "ihr SSO, Zugriffskontrolle und Audit rund um KI braucht, von jemandem, der beide Seiten gebaut hat.",
        "eure KI ein Security-Review bestehen muss: gehärtete Hosts, eine schriftliche Risikoanalyse und eine Antwort auf Prompt Injection.",
        "ihr ein Team wollt, das mit Coding Agents arbeitet, statt darüber zu reden.",
      ],
      closing: "Ich beantworte E-Mails.",
    },
    notes: {
      hero: "außerdem: 145 bpm",
      start: "ganz ohne GPU-Rack",
      portrait: "ja, das Shirt ist die Markenfarbe",
      stack: "Schildkröten bis ganz unten, aber dokumentiert",
      origin: "bevor es cool war. es war nie cool.",
      path: "so einen Lebenslauf plant keiner. gut so.",
      talk: "bring seltsame Probleme mit",
    },
    cv: {
      profileTitle: "Profil",
      profile: "Ich baue und betreibe private KI-Plattformen: Sprachmodelle auf eigenen GPUs, auf Kubernetes, hinter Single Sign-on, in Netzen, die das Internet nie sehen. KI habe ich ab 2012 an der Universität Hamburg studiert und danach über zehn Jahre produktive Software für Banken, Kanzleien und Start-ups gebaut. Ich weiß, wie die Modelle funktionieren, und ich weiß, wie man das System darunter am Leben und sicher hält.",
      experience: "Erfahrung",
      skillsTitle: "Kenntnisse",
      skills: [
        { h: "KI-Plattform", t: "LLM-Serving (vLLM, SGLang), LLM-Gateways (LiteLLM), Open WebUI, RAG, Tool Calling, MCP, n8n, Coding Agents und Agent Skills, Quantisierung, Benchmarking" },
        { h: "Infrastruktur", t: "Linux seit 2007 (RHEL/Rocky, Ubuntu, Debian, SUSE), Kubernetes (RKE2, Rancher, Fleet, Helm), Harvester, Podman, Docker, Ansible, Packer, OpenTofu (Terraform), GitLab CI/CD, Azure" },
        { h: "Security und Identität", t: "SELinux, Rootless-Container, PKI, OpenBao (Vault), Härtung (BSI, CIS, STIG), Risikoanalyse (BSI 200-3), CVE-Triage, Keycloak, OAuth 2.0, OIDC, SAML, Active Directory, RADIUS, DSGVO, PSD2" },
        { h: "Observability", t: "Prometheus, Alertmanager, Loki, Grafana, Grafana Alloy" },
        { h: "Software", t: "TypeScript (Vue, React, Node), Python (Django), Java (Spring Boot), PHP (Symfony, Laravel), C++ (Audio, Signalverarbeitung), PostgreSQL", page2: true },
      ],
      languagesTitle: "Sprachen",
      languages: [
        ["Deutsch", "Muttersprache"],
        ["Englisch", "fließend, TOEFL"],
        ["Bosnisch/Kroatisch/Serbisch", "fließend"],
        ["Französisch", "mittlere Kenntnisse"],
        ["Spanisch", "mittlere Kenntnisse"],
        ["Portugiesisch", "Grundkenntnisse"],
      ],
      howTitle: "Wie ich arbeite",
      how: "AuDHS. Ich erkenne Muster schnell, gehe stundenlang in die Tiefe und habe keine Geduld für Vages. Das macht mich sehr gut mit Systemen und mit den Sprachmodellen, die jetzt darauf laufen.",
      offTitle: "Nach Feierabend",
      off: "Psytrance-Produzent und DJ. Chaos-Events seit 2009, FOSDEM. Hydroponik, Drohnen, lange Roadtrips.",
      buildTitle: "Baue ich gerade",
      building: [
        ["LOOPWAR", "Browserspiel, in dem Musikproduzenten mit denselben Samples gegeneinander antreten. Ich baue es mit Coding Agents."],
        ["Tetris-Automat", "Zwei Spieler, lasergeschnitten, RP2040, eigene Firmware."],
      ],
      page: "Seite",
    },
  },
};
