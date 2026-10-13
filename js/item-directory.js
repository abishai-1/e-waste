// CleanEarth - Item Directory Controller
// Live search & waste stream filtering across 40+ household items in EN & TE.

(function () {
  "use strict";

  let currentFilter = "all";
  let searchQuery = "";

  function getBinMeta(bin) {
    switch (bin) {
      case "wet":
        return {
          cssClass: "bin-wet",
          badgeClass: "badge-wet",
          colorKey: "bin_wet_color",
          nameKey: "bin_wet"
        };
      case "dry":
        return {
          cssClass: "bin-dry",
          badgeClass: "badge-dry",
          colorKey: "bin_dry_color",
          nameKey: "bin_dry"
        };
      case "hazardous":
        return {
          cssClass: "bin-hazardous",
          badgeClass: "badge-hazardous",
          colorKey: "bin_hazardous_color",
          nameKey: "bin_hazardous"
        };
      case "ewaste":
        return {
          cssClass: "bin-ewaste",
          badgeClass: "badge-ewaste",
          colorKey: "bin_ewaste_color",
          nameKey: "bin_ewaste"
        };
      default:
        return {
          cssClass: "",
          badgeClass: "",
          colorKey: "",
          nameKey: ""
        };
    }
  }

  function filterItems() {
    const lang = window.getCurrentLang();
    const query = searchQuery.trim().toLowerCase();

    return DATA.items.filter(function (item) {
      // Filter by category
      if (currentFilter !== "all" && item.bin !== currentFilter) {
        return false;
      }
      // Filter by query (check both EN and TE names & tips)
      if (query.length > 0) {
        const enName = (item.name.en || "").toLowerCase();
        const teName = (item.name.te || "").toLowerCase();
        const enTip = (item.tip.en || "").toLowerCase();
        const teTip = (item.tip.te || "").toLowerCase();
        return enName.includes(query) || teName.includes(query) || enTip.includes(query) || teTip.includes(query);
      }
      return true;
    });
  }

  function renderDirectory() {
    const listContainer = document.getElementById("directory-list");
    const emptyState = document.getElementById("empty-state");
    const statusEl = document.getElementById("result-status");
    if (!listContainer) return;

    const lang = window.getCurrentLang();
    const filtered = filterItems();

    if (statusEl) {
      const countMsg = lang === "te"
        ? filtered.length + " వస్తువులు కనిపించాయి."
        : "Showing " + filtered.length + " items.";
      statusEl.textContent = countMsg;
    }

    if (filtered.length === 0) {
      listContainer.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    if (emptyState) emptyState.style.display = "none";

    const cardsHtml = filtered.map(function (item) {
      const meta = getBinMeta(item.bin);
      const itemName = item.name[lang] || item.name.en;
      const itemTip = item.tip[lang] || item.tip.en;
      const binColor = window.t(meta.colorKey);
      const binName = window.t(meta.nameKey);
      const tipLabel = window.t("dir_tip_label");

      return (
        '<article class="card item-card ' + meta.cssClass + '">' +
        '  <div class="item-header">' +
        '    <h3 class="item-name">' + window.escapeHtml(itemName) + '</h3>' +
        '    <span class="bin-badge ' + meta.badgeClass + '">' +
        '      <span>' + window.escapeHtml(binColor) + '</span> &bull; <span>' + window.escapeHtml(binName) + '</span>' +
        '    </span>' +
        '  </div>' +
        '  <p class="item-tip"><strong>' + window.escapeHtml(tipLabel) + '</strong> ' + window.escapeHtml(itemTip) + '</p>' +
        '</article>'
      );
    }).join("");

    listContainer.innerHTML = cardsHtml;
  }

  function setupEvents() {
    const searchInput = document.getElementById("item-search");
    if (searchInput) {
      searchInput.addEventListener("input", function (e) {
        searchQuery = e.target.value;
        renderDirectory();
      });
    }

    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        currentFilter = btn.getAttribute("data-filter");
        renderDirectory();
      });
    });
  }

  window.onLanguageChange = function () {
    renderDirectory();
  };

  document.addEventListener("DOMContentLoaded", function () {
    setupEvents();
    renderDirectory();
  });
})();
