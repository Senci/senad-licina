/*
 * Single source of truth. The website (index.html) and the CV (cv.html)
 * both render from this file. Edit text here, then run `npm run pdf`
 * to rebuild the PDFs.
 */
window.CONTENT = {
  meta: {
    name: "Senad Ličina",
    email: "senad@licina.eu",
    phone: "+49 151 506 705 19", // shown on the CV only, never on the website
    city: "Hamburg",
    website: "", // e.g. "licina.eu". If set, it is printed on the CV.
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
      print: "Print or save as PDF",
      back: "Back to the website",
    },
    title: "AI Platform and Infrastructure Lead",
    hero: {
      headline: ["I run AI where", "the cloud isn't", "allowed."],
      sub: "Senad Ličina, Hamburg. I build and operate private AI platforms: language models on our own GPUs, on Kubernetes, behind single sign-on, in networks that never see the internet. I studied AI in 2012. It is not a rebrand.",
    },
    stack: {
      title: "The stack I run",
      intro: "Most people in AI work on one of these layers. I am responsible for all of them, from the rack to the person typing a question. Pick a layer.",
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
          text: "One internal assistant for the whole company. Chat, retrieval over Confluence, Jira and our knowledge bases, and tool use. It names its sources and says so when it found nothing.",
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
          tech: "Kubernetes (RKE2), Harvester, Longhorn, Helm, Ansible",
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
          tech: "Keycloak, OIDC, SAML, Active Directory, RADIUS, OpenBao",
          text: "Keycloak federated with Active Directory is the single front door to the AI platform and internal apps. I am extending it to network access through Fortinet and RADIUS. Secrets live in OpenBao, not in wikis.",
        },
        {
          id: "observability",
          name: "Observability",
          tech: "Prometheus, Loki, Grafana, Alloy",
          text: "Metrics and logs from Linux, Kubernetes and a Windows Server fleet in one self-hosted stack. GPU throughput sits on the same dashboards as disk space.",
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
            "AI lead for the company. I built and run the internal AI platform: chat, retrieval over Confluence, Jira and knowledge bases, and tool use, on models we host ourselves.",
            "LLM inference on our own NVIDIA Blackwell GPU servers with vLLM and quantized open-weight models. Engines and quantizations are benchmarked before rollout, throughput is monitored in Grafana.",
            "All of it on-prem and air-gap capable. No SaaS, no cloud APIs. Kubernetes (RKE2 on Harvester), automated with Ansible.",
            "Single sign-on with Keycloak federated to Active Directory, now being extended to network access (Fortinet, RADIUS). Secrets in OpenBao.",
            "Self-hosted observability with Prometheus, Loki and Grafana, including Grafana Alloy rolled out to the Windows Server fleet.",
            "First contact for colleagues on anything AI: coding agents, shared skills and standards, security concepts for tool use and web search, hands-on help.",
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
          period: "2018 – now",
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
            "Raised test coverage across Spring Boot, Nuxt and Vue projects (JUnit, Cypress, Cucumber).",
          ],
        },
        {
          period: "2016 – 2020",
          org: "Sparkassen Innovation Hub",
          place: "Hamburg",
          role: "Senior Software Engineer",
          points: [
            "The team's PSD2 expert: built the bank side (ASPSP) and the client applications that consume banking APIs.",
            "Modernised the tech stack, maintained CI/CD, trained colleagues and gave talks on new technology (Vue, Express, Koa, Spring Boot).",
          ],
        },
      ],
      earlierTitle: "Earlier",
      earlier: [
        { period: "2016 – 2018", org: "Timecake Factory GmbH", what: "Progressive web app for a social calendar with an animated vector UI (Vue, Laravel)" },
        { period: "2013 – 2016", org: "Star Finanz GmbH", what: "Banking software in Java and JavaScript, plus Objective-C and C++" },
        { period: "2012 – 2013", org: "Digital Pioneers N.V.", what: "First backend of the Stuffle marketplace app (Symfony)" },
        { period: "2011 – 2012", org: "Renewable Energy Technology Centre", what: "Funding database for renewable energy projects (Django)" },
        { period: "2010 – 2011", org: "Universität Hamburg", what: "Tutor for software engineering courses (Java)" },
      ],
    },
    education: {
      title: "Education",
      items: [
        { period: "2012 – 2016", title: "M.Sc. Intelligent Adaptive Systems", org: "Universität Hamburg, international programme", note: "Neural networks, machine learning, robotics, big data" },
        { period: "2007 – 2013", title: "B.Sc. Informatik", org: "Universität Hamburg", note: "" },
      ],
    },
    weird: {
      title: "Weird is a feature",
      intro: "Normal people built the systems everyone now wants to replace. Here is what you get with me.",
      neuro: {
        h: "AuDHD",
        t: "My brain collects patterns, locks on to a problem for hours and refuses vague instructions. Language models need exactly that from whoever steers them.",
      },
      items: [
        { h: "Psytrance", t: "I produce and DJ it. Arranging eight minutes at 145 bpm is systems design with a kick drum." },
        { h: "A Tetris cabinet", t: "Two players, laser-cut, RP2040 and a wall of WS2812B LEDs. I am building it because it should exist." },
        { h: "Jungle ops", t: "I have run servers and networks in the Panamanian rainforest. Your data centre has air conditioning. You will be fine." },
        { h: "Six languages", t: "German, English, Bosnian/Croatian/Serbian, French, Spanish, some Portuguese. Plus the ones with compilers." },
      ],
      cta: "There is a second layer to this page. Switch on the blacklight.",
    },
    talk: {
      title: "Talk to me if",
      items: [
        "you need language models running on your own hardware, and they must not phone home.",
        "your AI project is stuck between a demo and something compliance will sign.",
        "you want SSO, access control and audit around AI from someone who has built both sides.",
        "you want a team that works with coding agents instead of talking about them.",
      ],
      closing: "I answer email.",
    },
    notes: {
      hero: "also: 145 bpm",
      portrait: "yes, the shirt is the brand colour",
      stack: "turtles all the way down, but documented",
      origin: "before it was cool. it was never cool.",
      path: "nobody plans a CV like this. good.",
      talk: "bring weird problems",
    },
    cv: {
      profileTitle: "Profile",
      profile: "I build and run private AI platforms: language models on our own GPUs, on Kubernetes, behind single sign-on, in networks that never see the internet. I studied AI at Universität Hamburg from 2012, then spent more than a decade shipping production software for banks, law firms and startups. I know how the models work, and I know how to keep the system under them alive.",
      experience: "Experience",
      skillsTitle: "Skills",
      skills: [
        { h: "AI platform", t: "LLM serving (vLLM, SGLang), Open WebUI, RAG, tool calling, MCP, coding agents and agent skills, quantization, benchmarking" },
        { h: "Infrastructure", t: "Kubernetes (RKE2, Helm), Harvester, Docker, Ansible, Linux, GitLab CI/CD, Azure" },
        { h: "Identity and security", t: "Keycloak, OIDC, SAML, Active Directory, LDAP, RADIUS, OpenBao, GDPR, PSD2" },
        { h: "Observability", t: "Prometheus, Loki, Grafana, Alloy" },
        { h: "Software", t: "TypeScript (Vue, React, Node), Python (Django), Java (Spring Boot), PHP (Symfony, Laravel), PostgreSQL" },
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
      off: "Psytrance producer and DJ. Hydroponics, drones, long road trips.",
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
      print: "Drucken oder als PDF sichern",
      back: "Zurück zur Website",
    },
    title: "AI Platform und Infrastructure Lead",
    hero: {
      headline: ["Ich betreibe KI,", "wo die Cloud", "nicht hin darf."],
      sub: "Senad Ličina, Hamburg. Ich baue und betreibe private KI-Plattformen: Sprachmodelle auf eigenen GPUs, auf Kubernetes, hinter Single Sign-on, in Netzen, die das Internet nie sehen. KI habe ich 2012 studiert. Das ist kein Rebranding.",
    },
    stack: {
      title: "Der Stack, den ich betreibe",
      intro: "Die meisten in der KI arbeiten auf einer dieser Ebenen. Ich verantworte alle, vom Rack bis zum Menschen, der eine Frage tippt. Wähl eine Ebene.",
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
          text: "Ein interner Assistent für die ganze Firma. Chat, Suche über Confluence, Jira und unsere Wissensdatenbanken, dazu Tools. Er nennt seine Quellen und sagt es, wenn er nichts gefunden hat.",
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
          tech: "Kubernetes (RKE2), Harvester, Longhorn, Helm, Ansible",
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
          tech: "Keycloak, OIDC, SAML, Active Directory, RADIUS, OpenBao",
          text: "Keycloak mit Active-Directory-Föderation ist die eine Eingangstür zur KI-Plattform und zu internen Anwendungen. Ich erweitere sie gerade auf den Netzwerkzugang über Fortinet und RADIUS. Secrets liegen in OpenBao, nicht im Wiki.",
        },
        {
          id: "observability",
          name: "Observability",
          tech: "Prometheus, Loki, Grafana, Alloy",
          text: "Metriken und Logs aus Linux, Kubernetes und einer Windows-Server-Flotte in einem selbst gehosteten Stack. Der GPU-Durchsatz steht auf denselben Dashboards wie der Plattenplatz.",
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
            "KI-Verantwortlicher im Unternehmen. Ich habe die interne KI-Plattform aufgebaut und betreibe sie: Chat, Suche über Confluence, Jira und Wissensdatenbanken sowie Tools, auf selbst gehosteten Modellen.",
            "LLM-Inferenz auf eigenen NVIDIA-Blackwell-GPU-Servern mit vLLM und quantisierten offenen Modellen. Engines und Quantisierungen werden vor dem Rollout gebenchmarkt, der Durchsatz in Grafana überwacht.",
            "Alles On-Prem und Air-Gap-fähig. Kein SaaS, keine Cloud-APIs. Kubernetes (RKE2 auf Harvester), automatisiert mit Ansible.",
            "Single Sign-on mit Keycloak und Active-Directory-Föderation, aktuell erweitert auf den Netzwerkzugang (Fortinet, RADIUS). Secrets in OpenBao.",
            "Selbst gehostete Observability mit Prometheus, Loki und Grafana, inklusive Rollout von Grafana Alloy auf die Windows-Server-Flotte.",
            "Erster Ansprechpartner für Kollegen bei allem rund um KI: Coding Agents, gemeinsame Skills und Standards, Sicherheitskonzepte für Tools und Websuche, praktische Hilfe.",
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
          period: "2018 – heute",
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
            "Testabdeckung in Spring-Boot-, Nuxt- und Vue-Projekten erhöht (JUnit, Cypress, Cucumber).",
          ],
        },
        {
          period: "2016 – 2020",
          org: "Sparkassen Innovation Hub",
          place: "Hamburg",
          role: "Senior Software Engineer",
          points: [
            "PSD2-Experte im Team: die Bankseite (ASPSP) und die Client-Anwendungen gebaut, die Banking-APIs nutzen.",
            "Tech-Stack modernisiert, CI/CD betreut, Kollegen geschult und Vorträge über neue Technologien gehalten (Vue, Express, Koa, Spring Boot).",
          ],
        },
      ],
      earlierTitle: "Davor",
      earlier: [
        { period: "2016 – 2018", org: "Timecake Factory GmbH", what: "Progressive Web App für einen sozialen Kalender mit animierter Vektor-UI (Vue, Laravel)" },
        { period: "2013 – 2016", org: "Star Finanz GmbH", what: "Banking-Software in Java und JavaScript, dazu Objective-C und C++" },
        { period: "2012 – 2013", org: "Digital Pioneers N.V.", what: "Erstes Backend der Marktplatz-App Stuffle (Symfony)" },
        { period: "2011 – 2012", org: "Renewable Energy Technology Centre", what: "Förderdatenbank für Projekte der erneuerbaren Energien (Django)" },
        { period: "2010 – 2011", org: "Universität Hamburg", what: "Tutor für Softwareentwicklung (Java)" },
      ],
    },
    education: {
      title: "Ausbildung",
      items: [
        { period: "2012 – 2016", title: "M.Sc. Intelligent Adaptive Systems", org: "Universität Hamburg, internationaler Studiengang", note: "Neuronale Netze, maschinelles Lernen, Robotik, Big Data" },
        { period: "2007 – 2013", title: "B.Sc. Informatik", org: "Universität Hamburg", note: "" },
      ],
    },
    weird: {
      title: "Seltsam ist ein Feature",
      intro: "Normale Leute haben die Systeme gebaut, die jetzt alle ersetzen wollen. Das hier bekommst du mit mir.",
      neuro: {
        h: "AuDHS",
        t: "Mein Kopf sammelt Muster, verbeißt sich stundenlang in ein Problem und verweigert vage Ansagen. Genau das brauchen Sprachmodelle von dem, der sie steuert.",
      },
      items: [
        { h: "Psytrance", t: "Ich produziere und lege auf. Acht Minuten bei 145 bpm zu arrangieren ist Systemdesign mit Kickdrum." },
        { h: "Ein Tetris-Automat", t: "Zwei Spieler, lasergeschnitten, RP2040 und eine Wand aus WS2812B-LEDs. Ich baue ihn, weil es ihn geben sollte." },
        { h: "Dschungel-Ops", t: "Ich habe Server und Netzwerke im Regenwald von Panama betrieben. Dein Rechenzentrum hat eine Klimaanlage. Das wird schon." },
        { h: "Sechs Sprachen", t: "Deutsch, Englisch, Bosnisch/Kroatisch/Serbisch, Französisch, Spanisch, etwas Portugiesisch. Dazu die mit Compiler." },
      ],
      cta: "Diese Seite hat eine zweite Ebene. Mach das Schwarzlicht an.",
    },
    talk: {
      title: "Schreib mir, wenn",
      items: [
        "Sprachmodelle auf eurer eigenen Hardware laufen sollen und nicht nach Hause telefonieren dürfen.",
        "euer KI-Projekt zwischen Demo und etwas feststeckt, das die Compliance unterschreibt.",
        "ihr SSO, Zugriffskontrolle und Audit rund um KI braucht, von jemandem, der beide Seiten gebaut hat.",
        "ihr ein Team wollt, das mit Coding Agents arbeitet, statt darüber zu reden.",
      ],
      closing: "Ich beantworte E-Mails.",
    },
    notes: {
      hero: "außerdem: 145 bpm",
      portrait: "ja, das Shirt ist die Markenfarbe",
      stack: "Schildkröten bis ganz unten, aber dokumentiert",
      origin: "bevor es cool war. es war nie cool.",
      path: "so einen Lebenslauf plant keiner. gut so.",
      talk: "bring seltsame Probleme mit",
    },
    cv: {
      profileTitle: "Profil",
      profile: "Ich baue und betreibe private KI-Plattformen: Sprachmodelle auf eigenen GPUs, auf Kubernetes, hinter Single Sign-on, in Netzen, die das Internet nie sehen. KI habe ich ab 2012 an der Universität Hamburg studiert und danach über zehn Jahre produktive Software für Banken, Kanzleien und Start-ups gebaut. Ich weiß, wie die Modelle funktionieren, und ich weiß, wie man das System darunter am Leben hält.",
      experience: "Erfahrung",
      skillsTitle: "Kenntnisse",
      skills: [
        { h: "KI-Plattform", t: "LLM-Serving (vLLM, SGLang), Open WebUI, RAG, Tool Calling, MCP, Coding Agents und Agent Skills, Quantisierung, Benchmarking" },
        { h: "Infrastruktur", t: "Kubernetes (RKE2, Helm), Harvester, Docker, Ansible, Linux, GitLab CI/CD, Azure" },
        { h: "Identität und Sicherheit", t: "Keycloak, OIDC, SAML, Active Directory, LDAP, RADIUS, OpenBao, DSGVO, PSD2" },
        { h: "Observability", t: "Prometheus, Loki, Grafana, Alloy" },
        { h: "Software", t: "TypeScript (Vue, React, Node), Python (Django), Java (Spring Boot), PHP (Symfony, Laravel), PostgreSQL" },
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
      off: "Psytrance-Produzent und DJ. Hydroponik, Drohnen, lange Roadtrips.",
      buildTitle: "Baue ich gerade",
      building: [
        ["LOOPWAR", "Browserspiel, in dem Musikproduzenten mit denselben Samples gegeneinander antreten. Ich baue es mit Coding Agents."],
        ["Tetris-Automat", "Zwei Spieler, lasergeschnitten, RP2040, eigene Firmware."],
      ],
      page: "Seite",
    },
  },
};
