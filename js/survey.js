// CleanEarth - Community Survey Controller
// Saves submissions to localStorage array, displays real saved count,
// provides CSV download and clear records with confirmation dialog.

(function () {
  "use strict";

  const STORAGE_SURVEY_KEY = "cleanearth_survey_records";

  function getRecords() {
    try {
      const data = localStorage.getItem(STORAGE_SURVEY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveRecords(records) {
    try {
      localStorage.setItem(STORAGE_SURVEY_KEY, JSON.stringify(records));
    } catch (e) {}
  }

  function renderTable() {
    const records = getRecords();
    const countBadge = document.getElementById("response-count-badge");
    const tbody = document.getElementById("responses-tbody");

    if (countBadge) countBadge.textContent = records.length.toString();
    if (!tbody) return;

    if (records.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:1.5rem;" data-i18n="survey_no_records">' + window.t("survey_no_records") + '</td></tr>';
      return;
    }

    const html = records.map(function (rec) {
      const dateStr = new Date(rec.timestamp).toLocaleString();
      return (
        "<tr>" +
        "  <td>" + window.escapeHtml(dateStr) + "</td>" +
        "  <td>" + window.escapeHtml(rec.mode) + "</td>" +
        "  <td>" + window.escapeHtml(rec.area) + "</td>" +
        "  <td>" + window.escapeHtml(rec.age) + "</td>" +
        "  <td>" + window.escapeHtml(rec.segregates) + "</td>" +
        "  <td>" + window.escapeHtml(rec.barrier) + "</td>" +
        "  <td><strong>" + window.escapeHtml(rec.score.toString()) + " / 3</strong></td>" +
        "</tr>"
      );
    }).join("");

    tbody.innerHTML = html;
  }

  function handleSurveySubmit(e) {
    e.preventDefault();

    const ageSelect = document.getElementById("survey-age");
    const areaInput = document.getElementById("survey-area");
    const nameInput = document.getElementById("survey-name");
    const doubtsInput = document.getElementById("survey-doubts");

    let isValid = true;

    // Reset errors
    document.querySelectorAll(".form-error").forEach(function (el) {
      el.classList.remove("visible");
    });

    if (!ageSelect.value) {
      const err = document.getElementById("err-survey-age");
      if (err) {
        err.textContent = "Please select an age group.";
        err.classList.add("visible");
      }
      isValid = false;
    }

    if (!areaInput.value.trim()) {
      const err = document.getElementById("err-survey-area");
      if (err) {
        err.textContent = "Please enter area or village name.";
        err.classList.add("visible");
      }
      isValid = false;
    }

    const segRadio = document.querySelector('input[name="seg-current"]:checked');
    if (!segRadio) {
      const err = document.getElementById("err-survey-seg");
      if (err) {
        err.textContent = "Please indicate if you currently separate waste.";
        err.classList.add("visible");
      }
      isValid = false;
    }

    const barrierRadio = document.querySelector('input[name="barrier"]:checked');
    if (!barrierRadio) {
      const err = document.getElementById("err-survey-barrier");
      if (err) {
        err.textContent = "Please select the main barrier.";
        err.classList.add("visible");
      }
      isValid = false;
    }

    const sq1 = document.querySelector('input[name="sq1"]:checked');
    const sq2 = document.querySelector('input[name="sq2"]:checked');
    const sq3 = document.querySelector('input[name="sq3"]:checked');
    if (!sq1 || !sq2 || !sq3) {
      const err = document.getElementById("err-survey-q");
      if (err) {
        err.textContent = "Please complete all 3 awareness questions.";
        err.classList.add("visible");
      }
      isValid = false;
    }

    if (!isValid) return;

    // Calculate awareness score (Correct: Q1=yes, Q2=no, Q3=yes)
    let score = 0;
    if (sq1.value === "yes") score++;
    if (sq2.value === "no") score++;
    if (sq3.value === "yes") score++;

    const binsChecked = [];
    document.querySelectorAll('input[name="bins-used"]:checked').forEach(function (cb) {
      binsChecked.push(cb.value);
    });

    const modeRadio = document.querySelector('input[name="survey-mode"]:checked');
    const mode = modeRadio ? modeRadio.value : "before";

    const newRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      mode: mode,
      name: nameInput.value.trim() || "Anonymous",
      age: ageSelect.value,
      area: areaInput.value.trim(),
      segregates: segRadio.value,
      binsUsed: binsChecked,
      barrier: barrierRadio.value,
      score: score,
      doubts: doubtsInput ? doubtsInput.value.trim() : ""
    };

    const records = getRecords();
    records.unshift(newRecord);
    saveRecords(records);

    // Show success
    const banner = document.getElementById("survey-success-banner");
    if (banner) banner.style.display = "block";

    // Reset form
    document.getElementById("survey-form").reset();

    // Refresh volunteer table
    renderTable();

    // Scroll to success message
    banner.scrollIntoView({ behavior: "smooth" });
  }

  function downloadCSV() {
    const records = getRecords();
    if (records.length === 0) {
      alert("No survey records to export on this device.");
      return;
    }

    const headers = ["ID", "Timestamp", "Mode", "Name", "Age", "Area", "Segregates", "Bins_Used", "Barrier", "Score_Out_Of_3", "Doubts"];
    const rows = records.map(function (r) {
      return [
        r.id,
        '"' + r.timestamp + '"',
        '"' + r.mode + '"',
        '"' + r.name.replace(/"/g, '""') + '"',
        '"' + r.age + '"',
        '"' + r.area.replace(/"/g, '""') + '"',
        '"' + r.segregates + '"',
        '"' + (r.binsUsed || []).join(";") + '"',
        '"' + r.barrier + '"',
        r.score,
        '"' + (r.doubts || "").replace(/"/g, '""') + '"'
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(",")].concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "cleanearth_survey_responses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function clearRecords() {
    const confirmed = confirm(window.t("survey_clear_confirm"));
    if (confirmed) {
      saveRecords([]);
      renderTable();
    }
  }

  function setupEvents() {
    const form = document.getElementById("survey-form");
    if (form) {
      form.addEventListener("submit", handleSurveySubmit);
    }

    const csvBtn = document.getElementById("download-csv-btn");
    if (csvBtn) {
      csvBtn.addEventListener("click", downloadCSV);
    }

    const clearBtn = document.getElementById("clear-records-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", clearRecords);
    }
  }

  window.onLanguageChange = function () {
    renderTable();
  };

  document.addEventListener("DOMContentLoaded", function () {
    setupEvents();
    renderTable();
  });
})();
