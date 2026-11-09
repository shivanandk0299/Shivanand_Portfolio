/* ==========================================================================
   SHIVANAND KALASHETTI — HIGH-LEVEL PORTFOLIO ENGINE
   Vanilla ES6+ • Zero Dependencies • Resilient & Accessible
   ========================================================================== */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function getConfig() {
    return window.PORTFOLIO_CONFIG || {};
  }

  function safeText(value, fallback = "") {
    return typeof value === "string" ? value : fallback;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function safeExternalUrl(value) {
    if (typeof value !== "string") return "";
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
    } catch {
      return "";
    }
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  }

  function getSafeStorage(key, fallback = "") {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key) || fallback;
      }
    } catch {
      // Storage access blocked or restricted
    }
    return fallback;
  }

  function setSafeStorage(key, value) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Storage access blocked or restricted
    }
  }

  function openExternal(url) {
    if (!url) return;
    try {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      window.open(url, "_blank");
    }
  }

  /* --------------------------------------------------------------------------
     Toast Notification System
     -------------------------------------------------------------------------- */
  function showToast(message, icon = "✓") {
    const container = $("#toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span class="toast-icon" aria-hidden="true">${escapeHtml(icon)}</span> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.25s ease";
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  /* --------------------------------------------------------------------------
     Reading Progress & Header Scroll
     -------------------------------------------------------------------------- */
  function setupScrollProgress() {
    const bar = $("#reading-progress");
    const header = $("#site-header");

    function update() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      if (bar) bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      if (header) header.classList.toggle("scrolled", scrollY > 15);
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* --------------------------------------------------------------------------
     Bengaluru (IST) Real-time Clock
     -------------------------------------------------------------------------- */
  function setupLiveClock() {
    const heroClock = $("#bengaluru-time");
    const footerClock = $("#footer-ist-clock");

    function tick() {
      const now = new Date();
      const istString = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

      if (heroClock) heroClock.textContent = `${istString} IST (UTC+5:30)`;
      if (footerClock) footerClock.textContent = `Bengaluru, IN · ${istString} IST`;
    }

    tick();
    setInterval(tick, 1000);
  }

  /* --------------------------------------------------------------------------
     Theme Accent Switcher
     -------------------------------------------------------------------------- */
  function setupThemeAccents() {
    const buttons = $$(".accent-btn");
    const stored = getSafeStorage("shivanand_theme_accent", "lime");

    function applyAccent(accent) {
      document.documentElement.setAttribute("data-theme-accent", accent);
      setSafeStorage("shivanand_theme_accent", accent);
      buttons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.accent === accent);
      });
    }

    applyAccent(stored);

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const accent = btn.dataset.accent;
        if (accent) {
          applyAccent(accent);
          showToast(`Theme accent changed to ${accent.toUpperCase()}`);
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     Profile & Hero Data Binding
     -------------------------------------------------------------------------- */
  function setupProfile() {
    const config = getConfig();
    const profile = config.profile || {};

    setText("hero-name", safeText(profile.name));
    setText("hero-role", safeText(profile.role));
    setText("profile-status", safeText(profile.status));
    setText("hero-location", safeText(profile.location));
    setText("hero-education", safeText(profile.education));
    setText("hero-description", safeText(profile.bio));

    if (profile.name) {
      document.title = `${profile.name} — Software Engineering Portfolio`;
    }

    // About copy paragraphs
    const about = $("#about-copy");
    if (about && Array.isArray(profile.about) && profile.about.length) {
      about.replaceChildren(...profile.about.map((paragraph) => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        return p;
      }));
    }

    // Education details
    const edu = config.education || {};
    setText("education-period", `${safeText(edu.start).toUpperCase()} — ${safeText(edu.end).toUpperCase()}`);
    setText("education-degree", safeText(edu.degree));
    setText("education-discipline", safeText(edu.discipline));
    setText("education-institution", safeText(edu.institution));
    setText("education-location", safeText(edu.location));
    setText("education-status", safeText(edu.status));

    // Social & Contact links
    const links = $("#contact-links");
    if (links) {
      const items = [
        { url: profile.githubUrl, label: "GitHub Profile" },
        { url: profile.linkedinUrl, label: "LinkedIn Profile" },
        { url: profile.publicEmail && `mailto:${profile.publicEmail}`, label: "Direct Email", email: true }
      ].filter((item) => item.email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.publicEmail || "") : safeExternalUrl(item.url));

      if (items.length) {
        links.innerHTML = items.map((item) => {
          const href = item.email ? `mailto:${encodeURIComponent(profile.publicEmail)}` : safeExternalUrl(item.url);
          const target = item.email ? "" : ' target="_blank" rel="noopener noreferrer"';
          return `<a class="contact-social" href="${escapeHtml(href)}"${target}>${escapeHtml(item.label)} ↗</a>`;
        }).join("");
      }
    }

    // Resume link toggle
    const resumePath = safeText(profile.resumePath).trim();
    if (resumePath && !resumePath.includes("YOUR_") && !resumePath.includes("placeholder")) {
      const link = $("#hero-resume-link");
      if (link) {
        link.href = resumePath;
        link.setAttribute("download", `${safeText(profile.name, "Resume").replace(/\s+/g, "_")}_Resume.pdf`);
        link.hidden = false;
      }
    }

    // Sync configured GitHub URLs to all relevant buttons
    const ghUrl = safeExternalUrl(profile.githubUrl) || "https://github.com/shivanandk0299";
    ["hero-github-link", "header-github-link", "quick-visit-github", "footer-github-link"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = ghUrl;
    });
  }

    
    
    /* --------------------------------------------------------------------------
     Hero Space Orbit Mission Control
     -------------------------------------------------------------------------- */
  function setupOrbitMission() {
    /* live IST clock */
    const clockEl = document.getElementById("orb-clock");
    if (clockEl) {
      const tick = () => {
        const d = new Date();
        clockEl.textContent = d.toLocaleTimeString("en-IN", {
          hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
        });
      };
      tick();
      setInterval(tick, 1000);
    }
  }



  /* --------------------------------------------------------------------------
     Projects Showcase & Interactive Architecture Modal
     -------------------------------------------------------------------------- */
  function renderProjects() {
    const root = $("#projects-grid");
    const config = getConfig();
    const projects = config?.projects;
    if (!root || !Array.isArray(projects)) return;

    root.innerHTML = projects.map((p) => {
      const img = safeText(p.image);
      const safeImg = /^assets\/[a-zA-Z0-9_./-]+\.(svg|png|jpe?g|webp)$/i.test(img) ? img : "";
      const githubUrl = safeExternalUrl(p.githubUrl);
      const demoUrl = safeExternalUrl(p.demoUrl);

      const actionLinks = [
        `<button class="modal-open-btn" type="button" data-project-id="${escapeHtml(p.id)}">Deep Dive Architecture ↗</button>`,
        githubUrl ? `<a class="project-link" href="${escapeHtml(githubUrl)}" target="_blank" rel="noopener noreferrer">Source Code ↗</a>` : "",
        demoUrl ? `<a class="project-link" href="${escapeHtml(demoUrl)}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>` : ""
      ].filter(Boolean).join("");

      return `
        <article class="project-card reveal is-visible" data-category="${escapeHtml(p.category || "other")}" data-title="${escapeHtml(p.title.toLowerCase())}" data-tags="${escapeHtml((p.tags || []).join(" ").toLowerCase())}">
          <div class="project-visual">
            <div class="project-visual-top">
              <span class="project-kicker">${escapeHtml(p.badge || p.eyebrow || "Engineering")}</span>
              <span class="project-status">${escapeHtml(p.status || "Completed")}</span>
            </div>
            ${safeImg ? `<img class="project-image" src="${escapeHtml(safeImg)}" alt="${escapeHtml(p.alt || p.title)}" loading="lazy" width="600" height="340">` : `<div class="project-placeholder" aria-hidden="true">&lt;/&gt;</div>`}
          </div>
          <div class="project-content">
            <p class="project-eyebrow">${escapeHtml(p.eyebrow || "Engineering Project")}</p>
            <h3>${escapeHtml(p.title)}</h3>
            <p class="project-description">${escapeHtml(p.description)}</p>
            <div class="project-tags">
              ${(p.tags || []).map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`).join("")}
            </div>
            <div class="project-actions">
              ${actionLinks}
            </div>
          </div>
        </article>
      `;
    }).join("");

    const count = $("#project-count");
    if (count) count.textContent = `${String(projects.length).padStart(2, "0")} PROJECTS`;

    setupProjectModal();
  }

  function setupProjectFilters() {
    const filters = $$(".filter-chip");
    const searchInput = $("#project-search-input");
    const cards = $$(".project-card");
    const count = $("#project-count");

    let currentFilter = "all";
    let currentQuery = "";

    function filterCards() {
      let visible = 0;
      cards.forEach((card) => {
        const cat = card.dataset.category || "";
        const title = card.dataset.title || "";
        const tags = card.dataset.tags || "";

        const matchesCat = currentFilter === "all" || cat === currentFilter;
        const matchesQuery = !currentQuery || title.includes(currentQuery) || tags.includes(currentQuery);

        const show = matchesCat && matchesQuery;
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (count) count.textContent = `${String(visible).padStart(2, "0")} ${visible === 1 ? "PROJECT" : "PROJECTS"}`;
    }

    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter || "all";
        filters.forEach((c) => {
          const sel = c === btn;
          c.classList.toggle("active", sel);
          c.setAttribute("aria-pressed", String(sel));
        });
        filterCards();
      });
    });

    searchInput?.addEventListener("input", (e) => {
      currentQuery = (e.target.value || "").trim().toLowerCase();
      filterCards();
    });
  }

  /* --------------------------------------------------------------------------
     Project Architecture Modal Dialog
     -------------------------------------------------------------------------- */
  function setupProjectModal() {
    const modal = $("#project-modal");
    const backdrop = $("#modal-backdrop");
    const closeBtn = $("#close-project-modal");
    if (!modal) return;

    function closeModal() {
      modal.removeAttribute("open");
      document.body.style.overflow = "";
    }

    function openModal(projectId) {
      const config = getConfig();
      const project = config?.projects?.find((p) => p.id === projectId);
      if (!project) return;

      setText("modal-project-title", project.title);
      setText("modal-project-eyebrow", project.eyebrow);
      setText("modal-project-status", project.status);
      setText("modal-project-description", project.description);
      setText("modal-project-arch", project.architecture || "Modular Input → Execution Pipeline → Verified Output");

      const highlightsList = $("#modal-project-highlights");
      if (highlightsList) {
        highlightsList.innerHTML = (project.highlights || [
          "Engineered using first-principles system architecture.",
          "High performance with minimal memory overhead.",
          "Documented with unit tests and clear API contracts."
        ]).map((h) => `<li>${escapeHtml(h)}</li>`).join("");
      }

      const tagsContainer = $("#modal-project-tags");
      if (tagsContainer) {
        tagsContainer.innerHTML = (project.tags || []).map((t) => `<span class="project-tag">${escapeHtml(t)}</span>`).join("");
      }

      const actions = $("#modal-project-actions");
      if (actions) {
        const gh = safeExternalUrl(project.githubUrl);
        const demo = safeExternalUrl(project.demoUrl);
        actions.innerHTML = [
          gh ? `<a class="button button-primary" href="${escapeHtml(gh)}" target="_blank" rel="noopener noreferrer">GitHub Repository ↗</a>` : "",
          demo ? `<a class="button button-outline" href="${escapeHtml(demo)}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>` : "",
          `<button class="button button-quiet" type="button" id="modal-inner-close">Close Details</button>`
        ].filter(Boolean).join("");

        $("#modal-inner-close")?.addEventListener("click", closeModal);
      }

      modal.setAttribute("open", "");
      document.body.style.overflow = "hidden";
    }

    $$(".modal-open-btn").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.dataset.projectId));
    });

    closeBtn?.addEventListener("click", closeModal);
    backdrop?.addEventListener("click", closeModal);
    modal.addEventListener("cancel", (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  /* --------------------------------------------------------------------------
     Command Palette (⌘K / Ctrl+K)
     -------------------------------------------------------------------------- */
  function setupCommandPalette() {
    const dialog = $("#command-palette-dialog");
    const backdrop = $("#cmd-backdrop");
    const closeBtn = $("#close-command-palette");
    const input = $("#command-palette-input");
    const results = $("#cmd-results");
    const openBtns = [$("#open-command-palette"), $("#hero-cmd-btn")].filter(Boolean);

    if (!dialog || !input || !results) return;

    const commands = [
      { id: "about", icon: "👤", label: "Jump to About Section", shortcut: "G A", action: () => { location.href = "#about"; } },
      { id: "skills", icon: "⚡", label: "Jump to Technical Arsenal", shortcut: "G S", action: () => { location.href = "#focus"; } },
      { id: "projects", icon: "🚀", label: "Jump to Projects Showcase", shortcut: "G P", action: () => { location.href = "#projects"; } },
      { id: "radar", icon: "📐", label: "Jump to Architectural Benchmarks", shortcut: "G R", action: () => { location.href = "#radar"; } },
      { id: "journey", icon: "🎓", label: "Jump to Education & Journey", shortcut: "G J", action: () => { location.href = "#education"; } },
      { id: "contact", icon: "✉️", label: "Jump to Contact Terminal", shortcut: "G C", action: () => { location.href = "#contact"; } },
      {
        id: "github",
        icon: "🐙",
        label: "Open GitHub Profile (@shivanandk0299)",
        shortcut: "G H",
        action: () => {
          const ghUrl = getConfig()?.profile?.githubUrl || "https://github.com/shivanandk0299";
          openExternal(ghUrl);
        }
      },
      { id: "copy-email", icon: "📋", label: "Copy Email Address", shortcut: "C E", action: () => { $("#quick-copy-email")?.click(); } },
      { id: "run-sim", icon: "▶️", label: "Dispatch Architecture Simulation", shortcut: "R", action: () => { location.href = "#hero"; $("#run-code-button")?.click(); } },
      { id: "theme-lime", icon: "🟢", label: "Set Theme: Acid Lime", shortcut: "T 1", action: () => { $(".accent-btn[data-accent='lime']")?.click(); } },
      { id: "theme-cyan", icon: "🔵", label: "Set Theme: Electric Cyan", shortcut: "T 2", action: () => { $(".accent-btn[data-accent='cyan']")?.click(); } },
      { id: "theme-violet", icon: "🟣", label: "Set Theme: Cyber Violet", shortcut: "T 3", action: () => { $(".accent-btn[data-accent='violet']")?.click(); } },
      { id: "theme-amber", icon: "🟡", label: "Set Theme: Sunset Amber", shortcut: "T 4", action: () => { $(".accent-btn[data-accent='amber']")?.click(); } }
    ];

    let selectedIndex = 0;
    let filtered = [...commands];

    function renderList() {
      results.innerHTML = filtered.map((c, i) => `
        <div class="cmd-item ${i === selectedIndex ? "selected" : ""}" role="menuitem" data-index="${i}">
          <div class="cmd-item-left">
            <span class="cmd-item-icon" aria-hidden="true">${c.icon}</span>
            <span>${escapeHtml(c.label)}</span>
          </div>
          <span class="cmd-item-shortcut">${escapeHtml(c.shortcut)}</span>
        </div>
      `).join("");

      $$(".cmd-item", results).forEach((el) => {
        el.addEventListener("click", () => {
          const idx = Number(el.dataset.index);
          const cmd = filtered[idx];
          closePalette();
          if (cmd?.action) cmd.action();
        });
      });
    }

    function openPalette() {
      dialog.setAttribute("open", "");
      input.value = "";
      filtered = [...commands];
      selectedIndex = 0;
      renderList();
      input.focus();
      document.body.style.overflow = "hidden";
    }

    function closePalette() {
      dialog.removeAttribute("open");
      document.body.style.overflow = "";
    }

    openBtns.forEach((btn) => btn.addEventListener("click", openPalette));
    closeBtn?.addEventListener("click", closePalette);
    backdrop?.addEventListener("click", closePalette);

    input.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      filtered = commands.filter((c) => c.label.toLowerCase().includes(q));
      selectedIndex = 0;
      renderList();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % filtered.length;
        renderList();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + filtered.length) % filtered.length;
        renderList();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[selectedIndex];
        closePalette();
        if (cmd?.action) cmd.action();
      } else if (e.key === "Escape") {
        closePalette();
      }
    });

    // Global keyboard listener (Cmd+K / Ctrl+K) & Navigation Shortcuts (G H, G P, etc.)
    let keyBuffer = "";
    let bufferTimer = null;

    window.addEventListener("keydown", (e) => {
      // Toggle palette on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialog.hasAttribute("open")) closePalette();
        else openPalette();
        return;
      }

      // If user is currently typing in an input or textarea, skip global shortcuts
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.isContentEditable)) {
        return;
      }

      // If palette is open, skip two-key shortcuts
      if (dialog.hasAttribute("open")) return;

      const char = e.key.toLowerCase();
      if (char === "g") {
        keyBuffer = "g";
        clearTimeout(bufferTimer);
        bufferTimer = setTimeout(() => { keyBuffer = ""; }, 1200);
      } else if (keyBuffer === "g") {
        clearTimeout(bufferTimer);
        keyBuffer = "";
        if (char === "h") {
          const ghUrl = getConfig()?.profile?.githubUrl || "https://github.com/shivanandk0299";
          openExternal(ghUrl);
        } else if (char === "p") {
          location.href = "#projects";
        } else if (char === "a") {
          location.href = "#about";
        } else if (char === "s") {
          location.href = "#focus";
        } else if (char === "c") {
          location.href = "#contact";
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     Navigation & Mobile Menu
     -------------------------------------------------------------------------- */
  function setupNavigation() {
    const toggle = $("#menu-toggle");
    const nav = $("#site-nav");
    const navLinks = $$(".nav-link");

    toggle?.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      nav?.classList.toggle("open", open);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        toggle?.setAttribute("aria-expanded", "false");
        nav?.classList.remove("open");
      });
    });

    const sections = ["about", "focus", "projects", "radar", "education", "contact"]
      .map((id) => document.getElementById(id)).filter(Boolean);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active", active);
          });
        });
      }, { rootMargin: "-25% 0px -65% 0px" });

      sections.forEach((s) => observer.observe(s));
    }
  }

  /* --------------------------------------------------------------------------
     Contact Form & Quick Email Copy
     -------------------------------------------------------------------------- */
  function setupContact() {
    const copyEmailBtn = $("#quick-copy-email");
    const emailDisplay = $("#quick-email-display");
    const form = $("#contact-form");
    const messageInput = $("#contact-message");
    const charCounter = $("#char-counter");
    const feedback = $("#form-feedback");
    const prepared = $("#prepared-message");
    const output = $("#message-output");
    const copyMessageBtn = $("#copy-message");
    const mailLink = $("#open-mail");

    copyEmailBtn?.addEventListener("click", async () => {
      const email = emailDisplay?.textContent.trim() || getConfig()?.profile?.publicEmail || "shivanand.s.k.8678@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        showToast("Email address copied to clipboard!");
      } catch {
        showToast("Press Ctrl+C to copy email");
      }
    });

    messageInput?.addEventListener("input", () => {
      const len = messageInput.value.length;
      if (charCounter) charCounter.textContent = `${len} / 500`;
    });

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const formData = new FormData(form);
      const data = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        subject: String(formData.get("subject") || "").trim(),
        message: String(formData.get("message") || "").trim()
      };

      const formatted = `To: Shivanand Kalashetti\nSubject: ${data.subject}\nFrom: ${data.name} <${data.email}>\n\nMessage:\n${data.message}`;

      if (output) output.value = formatted;
      if (prepared) prepared.hidden = false;

      if (mailLink) {
        const mailtoSubject = encodeURIComponent(data.subject);
        const mailtoBody = encodeURIComponent(`${data.message}\n\n--\nFrom: ${data.name} (${data.email})`);
        const targetEmail = getConfig()?.profile?.publicEmail || "shivanand.s.k.8678@gmail.com";
        mailLink.href = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
        mailLink.hidden = false;
      }

      if (feedback) {
        feedback.hidden = false;
        feedback.classList.remove("error");
        feedback.textContent = "Your message has been compiled below. You can copy it or launch your email client immediately.";
      }

      showToast("Message compiled and ready!");
    });

    copyMessageBtn?.addEventListener("click", async () => {
      if (!output) return;
      try {
        await navigator.clipboard.writeText(output.value);
        showToast("Message copied to clipboard!");
      } catch {
        output.select();
        showToast("Select and copy the text above");
      }
    });
  }

  /* --------------------------------------------------------------------------
     Scroll Reveals
     -------------------------------------------------------------------------- */
  function setupReveals() {
    document.documentElement.classList.add("js-ready");
    const reveals = $$(".reveal");

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveals.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });

    reveals.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     Initialization
     -------------------------------------------------------------------------- */
  function init() {
    const modules = [
      ["reveals", setupReveals],
      ["clock", setupLiveClock],
      ["theme", setupThemeAccents],
      ["scroll", setupScrollProgress],
      ["profile", setupProfile],
      ["projects", renderProjects],
      ["filters", setupProjectFilters],
      ["orbitMission", setupOrbitMission],
      ["commandPalette", setupCommandPalette],
      ["nav", setupNavigation],
      ["contact", setupContact]
    ];

    modules.forEach(([name, fn]) => {
      try {
        fn();
      } catch (err) {
        console.error(`[Portfolio] Error in ${name}:`, err);
      }
    });

    try {
      const year = $("#current-year");
      if (year) year.textContent = String(new Date().getFullYear());
    } catch {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
