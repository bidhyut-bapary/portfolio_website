// ===== SITE CONFIG =====
const siteConfig = {
  name: "Bidhyut Bapary",
  subtitle: "Aspiring Developer | Tech Enthusiast",
  location: "Barishal, Bangladesh",
  email: "jit28935@gmail.com",
  phone: "+880 178 856 8379",
  about:
    "Passionate about technology and innovation, I am a determined student from Barishal, Bangladesh, aiming to build a strong career in the tech field. I love solving problems, learning new technologies, and creating digital experiences that matter.",
  skills: [
    { name: "HTML & CSS", pct: 85, icon: "code-2" },
    { name: "JavaScript", pct: 60, icon: "file-code" },
    { name: "Computer Office Apps", pct: 90, icon: "monitor" },
    { name: "Electrical Installation", pct: 95, icon: "zap" },
    { name: "Problem Solving", pct: 75, icon: "lightbulb" },
    { name: "Communication", pct: 80, icon: "message-circle" },
  ],
  projects: [
    {
      title: "Portfolio Website",
      desc: "A personal branding site showcasing skills, education, and projects — built from scratch.",
      emoji: "🌐",
      live: "https://bidhyut-bapary.github.io/portfolio_website/",
      github: "https://github.com/bidhyut-bapary/portfolio_website",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design"]
    },
    {
      title: "Cooperative Society Site",
      desc: "A management website for a local cooperative society with member data and reporting features.",
      emoji: "🏛️",
      live: "#",
      github: "#",
      tags: ["Database", "Web App", "UI Design"]
    },
    {
      title: "Coming Soon",
      desc: "Exciting new projects are in the pipeline. Stay tuned for updates as I continue building.",
      emoji: "🚀",
      live: null,
      github: null,
      tags: ["React", "TailwindCSS", "Node.js"]
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
  background_color: "#080b11",
  surface_color: "#111622",
  text_color: "#f8fafc",
  primary_action_color: "#6366f1",
  secondary_action_color: "#10b981",
  font_family: "Plus Jakarta Sans",
  font_size: 16,
};

// ===== BUILD DYNAMIC SECTIONS =====
function buildSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  siteConfig.skills.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = `glass skill-card sr sr-delay-${(i % 4) + 1}`;
    card.innerHTML = `
      <div class="skill-card-top">
        <div class="skill-icon">
          <i data-lucide="${s.icon}" style="width:20px;height:20px"></i>
        </div>
        <span class="skill-pct">${s.pct}%</span>
      </div>
      <div class="skill-header">
        <h4>${s.name}</h4>
      </div>
      <div class="skill-bar">
        <div class="skill-fill" data-pct="${s.pct}"></div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function buildProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  siteConfig.projects.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = `glass project-card sr sr-delay-${(i % 3) + 1}`;
    
    const links = [];
    if (p.live && p.live !== "#") {
      links.push(
        `<a href="${p.live}" class="btn-live" target="_blank" rel="noopener noreferrer">
          <i data-lucide="external-link" style="width:14px;height:14px"></i> Live Demo
         </a>`
      );
    }
    if (p.github && p.github !== "#") {
      links.push(
        `<a href="${p.github}" class="btn-gh" target="_blank" rel="noopener noreferrer">
          <i data-lucide="github" style="width:14px;height:14px"></i> GitHub
         </a>`
      );
    }

    const tagsHTML = p.tags 
      ? `<div class="project-tags">${p.tags.map(t => `<span class="project-tag-badge">${t}</span>`).join("")}</div>` 
      : "";

    card.innerHTML = `
      <div class="project-thumbnail">
        <div class="project-thumbnail-pattern"></div>
        <div class="project-emoji-wrapper">${p.emoji}</div>
      </div>
      <div class="project-body">
        ${tagsHTML}
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
        ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
      </div>
    `;
    grid.appendChild(card);
  });
}

buildSkills();
buildProjects();

// ===== TYPING ANIMATION =====
let typingPhrases = [
  siteConfig.subtitle,
  "Always Learning",
  "Based in Bangladesh"
];
let phraseIdx = 0,
  charIdx = 0,
  deleting = false;
const typingEl = document.getElementById("typingText");

function typeStep() {
  if (!typingEl) return;
  const phrase = typingPhrases[phraseIdx] || siteConfig.subtitle;
  if (!deleting) {
    typingEl.textContent = phrase.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx >= phrase.length) {
      deleting = true;
      setTimeout(typeStep, 2000);
      return;
    }
    setTimeout(typeStep, 65);
  } else {
    typingEl.textContent = phrase.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx <= 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % typingPhrases.length;
      setTimeout(typeStep, 450);
      return;
    }
    setTimeout(typeStep, 35);
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
  { threshold: 0.05, rootMargin: "0px 0px -50px 0px" },
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
  { threshold: 0.1 },
);

function observeSkills() {
  document
    .querySelectorAll(".skill-fill")
    .forEach((el) => skillObserver.observe(el));
}
observeSkills();

// ===== SCROLL TO TOP =====
const scrollBtn = document.getElementById("scrollTop");
if (scrollBtn) {
  document.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("show", window.scrollY > 400);
  });
  scrollBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

// ===== THEME TOGGLE =====
const themeBtn = document.getElementById("themeToggle");
let darkMode = true;
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("light-mode", !darkMode);
    themeBtn.innerHTML = `<i data-lucide="${darkMode ? "moon" : "sun"}" style="width:16px;height:16px"></i>`;
    lucide.createIcons();
    
    // Re-apply colors based on theme mode change
    const config = window.elementSdk?.getConfig() || {};
    applyConfig(config);
  });
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
    if (navLinks.classList.contains("open")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });
}

// ===== CONTACT FORM =====
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");
const btn = document.getElementById("submitBtn");

if (form && btn) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    btn.innerHTML = `<i class="btn-spinner"></i> Sending...`;
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        showToast("✅ Message sent successfully!");
        form.reset();
        
        // Trigger inputs blur to float labels back down
        form.querySelectorAll("input, textarea").forEach(input => {
          input.blur();
        });
      } else {
        showToast("❌ Failed to send message.");
      }
    } catch {
      showToast("⚠️ Network error occurred.");
    }

    btn.innerText = "Send Message";
    btn.disabled = false;
  });
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3500);
}

// ===== PRELOADER / WELCOME INTRO =====
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // Wait for the premium Welcome animation cycle to finish (approx 2.2 seconds) before hiding
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 2200);
  }
});

// ===== PROFILE IMAGE FALLBACK HANDLER =====
function initAvatarFallback() {
  const avatarImg = document.getElementById("avatarImage");
  const avatarInitials = document.getElementById("avatarInitials");
  if (avatarImg && avatarInitials) {
    avatarImg.addEventListener("load", () => {
      avatarInitials.style.display = "none";
      avatarImg.style.display = "block";
    });
    avatarImg.addEventListener("error", () => {
      avatarInitials.style.display = "flex";
      avatarImg.style.display = "none";
    });
    // If cache loaded immediately
    if (avatarImg.complete && avatarImg.naturalWidth > 0) {
      avatarInitials.style.display = "none";
      avatarImg.style.display = "block";
    }
  }
}
document.addEventListener("DOMContentLoaded", initAvatarFallback);
// Run immediately in case DOMContentLoaded already fired
initAvatarFallback();

// ===== APPLY CONFIG TO DOM =====
function applyConfig(cfg) {
  const c = { ...defaultConfig, ...cfg };

  // Text content
  const heroNameEl = document.getElementById("heroName");
  if (heroNameEl) heroNameEl.textContent = c.hero_name || defaultConfig.hero_name;

  const heroHeadingEl = document.getElementById("heroHeading");
  if (heroHeadingEl) {
    heroHeadingEl.innerHTML = `Hi, I'm <span class="gradient-text">${c.hero_name || defaultConfig.hero_name}</span>`;
  }

  const initials =
    (c.hero_name || "")
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "BB";

  const initialsEl = document.getElementById("avatarInitials");
  if (initialsEl) initialsEl.textContent = initials;

  typingPhrases = [
    c.hero_subtitle || defaultConfig.hero_subtitle,
    "Always Learning",
    "Based in Bangladesh"
  ];

  const aboutDescEl = document.getElementById("aboutDesc");
  if (aboutDescEl) aboutDescEl.textContent = c.about_description || defaultConfig.about_description;

  const aboutEmailEl = document.getElementById("aboutEmail");
  if (aboutEmailEl) aboutEmailEl.textContent = c.contact_email || defaultConfig.contact_email;

  const aboutPhoneEl = document.getElementById("aboutPhone");
  if (aboutPhoneEl) aboutPhoneEl.textContent = c.contact_phone || defaultConfig.contact_phone;

  const aboutLocationEl = document.getElementById("aboutLocation");
  if (aboutLocationEl) aboutLocationEl.textContent = siteConfig.location;

  const contactEmailEl = document.getElementById("contactEmail");
  if (contactEmailEl) contactEmailEl.textContent = c.contact_email || defaultConfig.contact_email;

  const contactPhoneEl = document.getElementById("contactPhone");
  if (contactPhoneEl) contactPhoneEl.textContent = c.contact_phone || defaultConfig.contact_phone;

  const footerTextEl = document.getElementById("footerText");
  if (footerTextEl) {
    footerTextEl.textContent = `© ${new Date().getFullYear()} ${c.hero_name || defaultConfig.hero_name}. Crafted with passion.`;
  }

  // Font
  const font = c.font_family || defaultConfig.font_family;
  document.body.style.fontFamily = `"${font}", "Inter", sans-serif`;

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
    root.style.setProperty(
      "--primary",
      c.primary_action_color || defaultConfig.primary_action_color,
    );
    root.style.setProperty(
      "--accent",
      c.secondary_action_color || defaultConfig.secondary_action_color,
    );
  } else {
    // Light mode base defaults, customizable or standard
    root.style.setProperty("--bg", "#f8fafc");
    root.style.setProperty("--bg2", "#ffffff");
    root.style.setProperty("--primary", "#4f46e5");
    root.style.setProperty("--accent", "#059669");
  }
  
  root.style.setProperty("--text", document.body.classList.contains("light-mode") ? "#0f172a" : (c.text_color || defaultConfig.text_color));
}

// ===== ELEMENT SDK INIT =====
window.elementSdk.init({
  defaultConfig,
  onConfigChange: async (config) => {
    applyConfig(config);
    // Re-render skills and projects dynamically since config might change text or structure
    buildSkills();
    buildProjects();
    observeAll();
    observeSkills();
    lucide.createIcons();
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
observeAll();
observeSkills();
