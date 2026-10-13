// CleanEarth - Main Application Controller
// Handles: Theme toggle, Language toggle, Shared Header & Footer injection,
// Translation engine (data-i18n, data-i18n-placeholder, data-i18n-aria),
// and safe localStorage helpers.

(function () {
  "use strict";

  // Storage key constants
  const THEME_KEY = "cleanearth_theme";
  const LANG_KEY = "cleanearth_lang";

  // Safe localStorage helper
  function safeGet(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? val : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // Storage access blocked or quota exceeded
    }
  }

  // Active state
  let currentLang = safeGet(LANG_KEY, "en");
  if (currentLang !== "en" && currentLang !== "te") {
    currentLang = "en";
  }

  // Translation helper function t(key)
  window.t = function (key) {
    if (window.I18N && window.I18N[currentLang] && window.I18N[currentLang][key]) {
      return window.I18N[currentLang][key];
    }
    if (window.I18N && window.I18N.en && window.I18N.en[key]) {
      return window.I18N.en[key];
    }
    return key;
  };

  window.getCurrentLang = function () {
    return currentLang;
  };

  // Determine active page identifier from location
  function getActivePage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf("/") + 1).toLowerCase();
    if (!page || page === "" || page === "index.html") return "index.html";
    return page;
  }

  // Render navigation links
  function renderNavLinks(activePage) {
    const navItems = [
      { href: "index.html", key: "nav_home" },
      { href: "bin-guide.html", key: "nav_bin_guide" },
      { href: "item-directory.html", key: "nav_directory" },
      { href: "bin-it-right.html", key: "nav_game" },
      { href: "eco-quiz.html", key: "nav_quiz" },
      { href: "five-rs.html", key: "nav_five_rs" },
      { href: "footprint-calculator.html", key: "nav_calculator" },
      { href: "survey.html", key: "nav_survey" },
      { href: "pledge.html", key: "nav_pledge" },
      { href: "ewaste-centers.html", key: "nav_ewaste" },
      { href: "about.html", key: "nav_about" }
    ];

    return navItems
      .map(function (item) {
        const isCurrent = activePage === item.href;
        const currentAttr = isCurrent ? ' aria-current="page"' : "";
        return '<a href="' + item.href + '" data-i18n="' + item.key + '"' + currentAttr + ">" + window.t(item.key) + "</a>";
      })
      .join("");
  }

  // Inject Shared Header
  function injectHeader() {
    const headerContainer = document.getElementById("header-placeholder");
    if (!headerContainer) return;

    const activePage = getActivePage();
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    const headerHtml =
      '<a href="#main-content" class="skip-link" data-i18n="skip_content">' +
      window.t("skip_content") +
      "</a>" +
      '<header class="site-header" role="banner">' +
      '  <div class="container header-inner">' +
      '    <a href="index.html" class="site-brand" aria-label="CleanEarth">' +
      '      <span data-i18n="site_title">' + window.t("site_title") + '</span>' +
      '      <span class="brand-badge" data-i18n="site_badge">' + window.t("site_badge") + '</span>' +
      '    </a>' +
      '    <div class="header-controls">' +
      '      <button id="theme-toggle" class="toggle-btn" type="button" role="switch" aria-checked="' + isDark + '" aria-label="Toggle theme">' +
      '        <span id="theme-toggle-text" data-i18n="theme_toggle_label">' + window.t("theme_toggle_label") + '</span>' +
      '      </button>' +
      '      <button id="lang-toggle" class="toggle-btn" type="button" aria-label="Change language">' +
      '        <span id="lang-toggle-text">' + (currentLang === "en" ? "తెలుగు" : "English") + '</span>' +
      '      </button>' +
      '      <button id="menu-toggle" class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" data-i18n="menu">' +
      window.t("menu") +
      '      </button>' +
      '    </div>' +
      '    <nav id="main-nav" class="site-nav" role="navigation" aria-label="Main navigation">' +
      renderNavLinks(activePage) +
      '    </nav>' +
      '  </div>' +
      '</header>';

    headerContainer.innerHTML = headerHtml;
    attachHeaderEvents();
  }

  // Inject Shared Footer
  function injectFooter() {
    const footerContainer = document.getElementById("footer-placeholder");
    if (!footerContainer) return;

    const footerHtml =
      '<footer class="site-footer" role="contentinfo">' +
      '  <div class="container footer-inner">' +
      '    <p><strong data-i18n="site_title">CleanEarth</strong>, <span data-i18n="footer_tagline">' + window.t("footer_tagline") + '</span></p>' +
      '    <p class="municipal-note" data-i18n="municipal_note">' + window.t("municipal_note") + '</p>' +
      '    <p><a href="https://karrisubhash.github.io/clean/" target="_blank" rel="noopener noreferrer" data-i18n="footer_project_link_text">' + window.t("footer_project_link_text") + ' (https://karrisubhash.github.io/clean/)</a></p>' +
      '  </div>' +
      '</footer>';

    footerContainer.innerHTML = footerHtml;
  }

  // Attach Header Event Handlers
  function attachHeaderEvents() {
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        themeBtn.setAttribute("aria-checked", newTheme === "dark" ? "true" : "false");
        safeSet(THEME_KEY, newTheme);
      });
    }

    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      langBtn.addEventListener("click", function () {
        const newLang = currentLang === "en" ? "te" : "en";
        setLanguage(newLang);
      });
    }

    const menuBtn = document.getElementById("menu-toggle");
    const nav = document.getElementById("main-nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", function () {
        const expanded = menuBtn.getAttribute("aria-expanded") === "true";
        menuBtn.setAttribute("aria-expanded", (!expanded).toString());
        nav.classList.toggle("open");
      });
    }
  }

  // Language switcher engine
  function setLanguage(lang) {
    currentLang = lang;
    safeSet(LANG_KEY, lang);
    document.documentElement.setAttribute("lang", lang);

    // Update language toggle button text
    const langBtnText = document.getElementById("lang-toggle-text");
    if (langBtnText) {
      langBtnText.textContent = lang === "en" ? "తెలుగు" : "English";
    }

    // Apply translations across all data-i18n elements
    applyTranslations();

    // Notify any page-specific listeners
    if (typeof window.onLanguageChange === "function") {
      window.onLanguageChange(lang);
    }
  }

  // Translate all marked elements on page
  function applyTranslations() {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      const text = window.t(key);
      if (text) {
        el.textContent = text;
      }
    });

    const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
    placeholders.forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      const text = window.t(key);
      if (text) {
        el.setAttribute("placeholder", text);
      }
    });

    const ariaEls = document.querySelectorAll("[data-i18n-aria]");
    ariaEls.forEach(function (el) {
      const key = el.getAttribute("data-i18n-aria");
      const text = window.t(key);
      if (text) {
        el.setAttribute("aria-label", text);
      }
    });
  }

  // Safe text escaping utility
  window.escapeHtml = function (str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  };

  // Initialization on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", function () {
    // Ensure document lang attribute is set
    document.documentElement.setAttribute("lang", currentLang);

    injectHeader();
    injectFooter();
    applyTranslations();

    // Trigger initial page-specific rendering if defined
    if (typeof window.onLanguageChange === "function") {
      window.onLanguageChange(currentLang);
    }
  });
})();
