// CleanEarth - E-Waste Facilities Controller
// Live filtering by search query, district, facility type, and accepted item.
// Bilingual output in English and natural Telugu.

(function () {
  "use strict";

  let searchQuery = "";
  let selectedDistrict = "all";
  let selectedType = "all";
  let selectedItem = "all";

  const ITEM_I18N_MAP = {
    computers: { en: "Computers", te: "కంప్యూటర్లు" },
    mobile_phones: { en: "Mobile phones", te: "మొబైల్ ఫోన్లు" },
    batteries: { en: "Batteries", te: "బ్యాటరీలు" },
    appliances: { en: "Appliances", te: "గృహోపకరణాలు" },
    cables_chargers: { en: "Cables and chargers", te: "కేబుల్స్ మరియు ఛార్జర్లు" }
  };

  function filterFacilities() {
    const query = searchQuery.trim().toLowerCase();

    return DATA.ewasteFacilities.filter(function (fac) {
      // District filter
      if (selectedDistrict !== "all" && fac.district !== selectedDistrict) {
        return false;
      }
      // Type filter
      if (selectedType !== "all" && fac.type !== selectedType) {
        return false;
      }
      // Accepted item filter
      if (selectedItem !== "all" && !fac.acceptedItems.includes(selectedItem)) {
        return false;
      }
      // Text query
      if (query.length > 0) {
        const enName = (fac.name.en || "").toLowerCase();
        const teName = (fac.name.te || "").toLowerCase();
        const enAddr = (fac.address.en || "").toLowerCase();
        const teAddr = (fac.address.te || "").toLowerCase();
        const enDist = (fac.district || "").toLowerCase();
        return enName.includes(query) || teName.includes(query) || enAddr.includes(query) || teAddr.includes(query) || enDist.includes(query);
      }
      return true;
    });
  }

  function renderFacilities() {
    const grid = document.getElementById("facilities-grid");
    const emptyState = document.getElementById("ewaste-empty");
    const countEl = document.getElementById("ewaste-result-count");
    if (!grid) return;

    const lang = window.getCurrentLang();
    const filtered = filterFacilities();

    if (countEl) {
      countEl.textContent = filtered.length + " " + window.t("ewaste_count_found");
    }

    if (filtered.length === 0) {
      grid.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    if (emptyState) emptyState.style.display = "none";

    const cardsHtml = filtered.map(function (fac) {
      const name = fac.name[lang] || fac.name.en;
      const addr = fac.address[lang] || fac.address.en;
      const hours = fac.hours[lang] || fac.hours.en;
      const district = lang === "te" ? (fac.district_te || fac.district) : fac.district;
      const isPlant = fac.type === "plant";
      const typeLabel = isPlant ? window.t("ewaste_type_plant") : window.t("ewaste_type_point");
      const badgeClass = isPlant ? "badge-plant" : "badge-point";

      // Build Google Maps query URL
      const mapsQuery = encodeURIComponent(fac.name.en + ", " + fac.address.en);
      const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + mapsQuery;

      const tagsHtml = fac.acceptedItems.map(function (itemKey) {
        const itemLabel = ITEM_I18N_MAP[itemKey] ? (ITEM_I18N_MAP[itemKey][lang] || ITEM_I18N_MAP[itemKey].en) : itemKey;
        return '<span class="tag-item">' + window.escapeHtml(itemLabel) + "</span>";
      }).join("");

      return (
        '<article class="card facility-card">' +
        '  <div>' +
        '    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.5rem;">' +
        '      <span class="facility-badge ' + badgeClass + '">' + window.escapeHtml(typeLabel) + '</span>' +
        '      <small style="color:var(--text-muted); font-weight:600;">' + window.escapeHtml(district) + '</small>' +
        '    </div>' +
        '    <h3 style="margin-bottom:0.4rem;">' + window.escapeHtml(name) + '</h3>' +
        '    <p style="font-size:0.92rem; color:var(--text-muted); margin-bottom:0.6rem;">' + window.escapeHtml(addr) + '</p>' +
        '    <p style="font-size:0.92rem; margin-bottom:0.4rem;"><strong>' + window.t("ewaste_hours_label") + '</strong> ' + window.escapeHtml(hours) + '</p>' +
        '    <p style="font-size:0.92rem; margin-bottom:0.6rem;"><strong>' + window.t("ewaste_phone_label") + '</strong> <a href="tel:' + window.escapeHtml(fac.phone) + '">' + window.escapeHtml(fac.phone) + '</a></p>' +
        '    <div style="margin-top:0.75rem;">' +
        '      <strong style="font-size:0.85rem; color:var(--text-muted);">' + window.t("ewaste_accepts_label") + '</strong>' +
        '      <div class="tag-cloud">' + tagsHtml + '</div>' +
        '    </div>' +
        '  </div>' +
        '  <div style="margin-top:0.75rem; padding-top:0.75rem; border-top:1px solid var(--border);">' +
        '    <a href="' + mapsUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="font-size:0.88rem; padding:0.45rem 0.85rem; width:100%;">' +
        window.t("ewaste_get_directions") +
        '    </a>' +
        '  </div>' +
        '</article>'
      );
    }).join("");

    grid.innerHTML = cardsHtml;
  }

  function setupEvents() {
    const searchInput = document.getElementById("ewaste-search");
    if (searchInput) {
      searchInput.addEventListener("input", function (e) {
        searchQuery = e.target.value;
        renderFacilities();
      });
    }

    const distSelect = document.getElementById("district-select");
    if (distSelect) {
      distSelect.addEventListener("change", function (e) {
        selectedDistrict = e.target.value;
        renderFacilities();
      });
    }

    const typeSelect = document.getElementById("type-select");
    if (typeSelect) {
      typeSelect.addEventListener("change", function (e) {
        selectedType = e.target.value;
        renderFacilities();
      });
    }

    const itemSelect = document.getElementById("item-filter-select");
    if (itemSelect) {
      itemSelect.addEventListener("change", function (e) {
        selectedItem = e.target.value;
        renderFacilities();
      });
    }
  }

  window.onLanguageChange = function () {
    renderFacilities();
  };

  document.addEventListener("DOMContentLoaded", function () {
    setupEvents();
    renderFacilities();
  });
})();
