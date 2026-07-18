// ===== SITE CONFIG =====
const siteConfig = {
  name: "Bidhyut Bapary",
  subtitle: "Aspiring Developer | Tech Enthusiast",
  location: "Barguna, Bangladesh",
  email: "bidhyut@email.com",
  phone: "+880 1XXX XXXXXX",
  about:
    "Passionate about technology and innovation, I am a determined student from Barguna, Bangladesh, aiming to build a strong career in the tech field. I love solving problems, learning new technologies, and creating digital experiences that matter.",
  skills: [
    { name: "HTML & CSS", pct: 80, icon: "code-2" },
    { name: "JavaScript", pct: 55, icon: "file-code" },
    { name: "Computer Office Apps", pct: 85, icon: "monitor" },
    { name: "Electrical Installation", pct: 90, icon: "zap" },
    { name: "Problem Solving", pct: 70, icon: "lightbulb" },
    { name: "Communication", pct: 75, icon: "message-circle" },
  ],
  projects: [
    {
      title: "Portfolio Website",
      desc: "A personal branding site showcasing skills, education, and projects — built from scratch.",
      emoji: "🌐",
      live: "https://bidhyut-bapary.github.io/portfolio_website/",
      github: "https://github.com/bidhyut-bapary/portfolio_website",
    },
    {
      title: "Cooperative Society Site",
      desc: "A management website for a local cooperative society with member data and reporting features.",
      emoji: "🏛️",
      live: "#",
      github: "#",
    },
    {
      title: "Coming Soon",
      desc: "Exciting new projects are in the pipeline. Stay tuned for updates as I continue building.",
      emoji: "🚀",
      live: null,
      github: null,
    },
  ],
};

// ===== DEFAULT CONFIG FOR ELEMENT SDK =====
const defaultConfig = {
  hero_name: siteConfig.name,
  hero_subtitle: siteConfig.subtitle,
  about_description: siteConfig.about,
  contact_email: siteConfig.email,
  contact_phone: siteConfig.phone,
  background_color: "#020617",
  surface_color: "#0f172a",
  text_color: "#e2e8f0",
  primary_action_color: "#3b82f6",
  secondary_action_color: "#22c55e",
  font_family: "Poppins",
  font_size: 16,
};

// ===== BUILD DYNAMIC SECTIONS =====
function buildSkills() {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = "";
  siteConfig.skills.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = `glass skill-card sr sr-delay-${(i % 4) + 1}`;
    card.innerHTML = `<div class="skill-icon"><i data-lucide="${s.icon}" style="width:20px;height:20px"></i></div><div class="skill-header"><h4>${s.name}</h4><span class="skill-pct">${s.pct}%</span></div><div class="skill-bar"><div class="skill-fill" data-pct="${s.pct}"></div></div>`;
    grid.appendChild(card);
  });
}

function buildProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";
  siteConfig.projects.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = `glass project-card sr sr-delay-${(i % 3) + 1}`;
    const links = [];
    if (p.live)
      links.push(
        `<a href="${p.live}" class="live" target="_blank" rel="noopener noreferrer">Live Demo</a>`,
      );
    if (p.github)
      links.push(
        `<a href="${p.github}" class="gh" target="_blank" rel="noopener noreferrer">GitHub</a>`,
      );
    card.innerHTML = `<div class="project-img">${p.emoji}</div><div class="project-body"><h4>${p.title}</h4><p>${p.desc}</p>${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}</div>`;
    grid.appendChild(card);
  });
}

buildSkills();
buildProjects();

// ===== TYPING ANIMATION =====
let typingPhrases = [
  siteConfig.subtitle,
  "Student from Bangladesh",
  "Always Learning",
];
let phraseIdx = 0,
  charIdx = 0,
  deleting = false;
const typingEl = document.getElementById("typingText");

function typeStep() {
  const phrase = typingPhrases[0] || siteConfig.subtitle;
  if (!deleting) {
    typingEl.textContent = phrase.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx >= phrase.length) {
      deleting = true;
      setTimeout(typeStep, 1800);
      return;
    }
    setTimeout(typeStep, 60);
  } else {
    typingEl.textContent = phrase.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx <= 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % typingPhrases.length;
      typingPhrases.unshift(typingPhrases.splice(phraseIdx, 1)[0]);
      setTimeout(typeStep, 400);
      return;
    }
    setTimeout(typeStep, 30);
  }
}
typeStep();

lucide.createIcons();
// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);
function observeAll() {
  document.querySelectorAll(".sr").forEach((el) => observer.observe(el));
}
observeAll();

// ===== SKILL BAR ANIMATION =====
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.pct + "%";
      }
    });
  },
  { threshold: 0.3 },
);
document
  .querySelectorAll(".skill-fill")
  .forEach((el) => skillObserver.observe(el));

// ===== SCROLL TO TOP =====
const scrollBtn = document.getElementById("scrollTop");
document.addEventListener("scroll", () => {
  scrollBtn.classList.toggle("show", window.scrollY > 400);
});
scrollBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// ===== THEME TOGGLE =====
const themeBtn = document.getElementById("themeToggle");
let darkMode = true;
themeBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("light-mode", !darkMode);
  themeBtn.innerHTML = `<i data-lucide="${darkMode ? "moon" : "sun"}" style="width:16px;height:16px"></i>`;
  lucide.createIcons();
});

// ===== HAMBURGER =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  if (navLinks.classList.contains("open")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    document.body.style.overflow = "auto";
  });
});
// ===== CONTACT FORM =====

const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");
const btn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  btn.innerText = "Sending...";
  btn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      successMsg.style.display = "block";
      form.reset();

      setTimeout(() => {
        successMsg.style.display = "none";
      }, 4000);
    } else {
      alert("❌ Failed to send!");
    }
  } catch {
    alert("⚠️ Network error!");
  }

  btn.innerText = "Send Message";
  btn.disabled = false;
});
// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

// ===== PRELOADER =====
window.addEventListener("load", () => {
  setTimeout(
    () => document.getElementById("preloader").classList.add("hidden"),
    600,
  );
});

// ===== APPLY CONFIG TO DOM =====
function applyConfig(cfg) {
  const c = { ...defaultConfig, ...cfg };

  // Text content
  document.getElementById("heroName").textContent =
    c.hero_name || defaultConfig.hero_name;
  document.getElementById("heroHeading").innerHTML =
    `Hi, I'm <span style="background:linear-gradient(135deg,var(--primary),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent">${c.hero_name || defaultConfig.hero_name}</span>`;
  const initials =
    (c.hero_name || "")
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "BB";
  document.getElementById("avatarInitials").textContent = initials;

  typingPhrases = [
    c.hero_subtitle || defaultConfig.hero_subtitle,
    "Student from Bangladesh",
    "Always Learning",
  ];

  document.getElementById("aboutDesc").textContent =
    c.about_description || defaultConfig.about_description;
  document.getElementById("aboutEmail").textContent =
    c.contact_email || defaultConfig.contact_email;
  document.getElementById("aboutPhone").textContent =
    c.contact_phone || defaultConfig.contact_phone;
  document.getElementById("aboutLocation").textContent = siteConfig.location;
  document.getElementById("contactEmail").textContent =
    c.contact_email || defaultConfig.contact_email;
  document.getElementById("contactPhone").textContent =
    c.contact_phone || defaultConfig.contact_phone;
  document.getElementById("footerText").textContent =
    `© 2025 ${c.hero_name || defaultConfig.hero_name}. Crafted with passion.`;

  // Font
  const font = c.font_family || defaultConfig.font_family;
  document.body.style.fontFamily = `${font}, Poppins, sans-serif`;

  // Font size
  const base = c.font_size || defaultConfig.font_size;
  document.documentElement.style.fontSize = base + "px";

  // Colors via CSS variables
  const root = document.documentElement;
  if (!document.body.classList.contains("light-mode")) {
    root.style.setProperty(
      "--bg",
      c.background_color || defaultConfig.background_color,
    );
    root.style.setProperty(
      "--bg2",
      c.surface_color || defaultConfig.surface_color,
    );
  }
  root.style.setProperty("--text", c.text_color || defaultConfig.text_color);
  root.style.setProperty(
    "--primary",
    c.primary_action_color || defaultConfig.primary_action_color,
  );
  root.style.setProperty(
    "--accent",
    c.secondary_action_color || defaultConfig.secondary_action_color,
  );
}

// ===== ELEMENT SDK INIT =====
window.elementSdk.init({
  defaultConfig,
  onConfigChange: async (config) => {
    applyConfig(config);
  },
  mapToCapabilities: (config) => ({
    recolorables: [
      {
        get: () => config.background_color || defaultConfig.background_color,
        set: (v) => {
          config.background_color = v;
          window.elementSdk.setConfig({ background_color: v });
        },
      },
      {
        get: () => config.surface_color || defaultConfig.surface_color,
        set: (v) => {
          config.surface_color = v;
          window.elementSdk.setConfig({ surface_color: v });
        },
      },
      {
        get: () => config.text_color || defaultConfig.text_color,
        set: (v) => {
          config.text_color = v;
          window.elementSdk.setConfig({ text_color: v });
        },
      },
      {
        get: () =>
          config.primary_action_color || defaultConfig.primary_action_color,
        set: (v) => {
          config.primary_action_color = v;
          window.elementSdk.setConfig({ primary_action_color: v });
        },
      },
      {
        get: () =>
          config.secondary_action_color || defaultConfig.secondary_action_color,
        set: (v) => {
          config.secondary_action_color = v;
          window.elementSdk.setConfig({ secondary_action_color: v });
        },
      },
    ],
    borderables: [],
    fontEditable: {
      get: () => config.font_family || defaultConfig.font_family,
      set: (v) => {
        config.font_family = v;
        window.elementSdk.setConfig({ font_family: v });
      },
    },
    fontSizeable: {
      get: () => config.font_size || defaultConfig.font_size,
      set: (v) => {
        config.font_size = v;
        window.elementSdk.setConfig({ font_size: v });
      },
    },
  }),
  mapToEditPanelValues: (config) =>
    new Map([
      ["hero_name", config.hero_name || defaultConfig.hero_name],
      ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
      [
        "about_description",
        config.about_description || defaultConfig.about_description,
      ],
      ["contact_email", config.contact_email || defaultConfig.contact_email],
      ["contact_phone", config.contact_phone || defaultConfig.contact_phone],
    ]),
});

lucide.createIcons();
