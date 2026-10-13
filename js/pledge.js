// CleanEarth - Pledge Controller
// Validates pledge form, renders personalized certificate in selected language,
// and invokes window.print() for paper or PDF saving.

(function () {
  "use strict";

  let lastPledgeData = null;

  function renderCertificate() {
    if (!lastPledgeData) return;

    const wrapper = document.getElementById("certificate-wrapper");
    if (!wrapper) return;

    wrapper.style.display = "block";

    document.getElementById("cert-name-display").textContent = lastPledgeData.name;
    document.getElementById("cert-area-display").textContent = lastPledgeData.area;
    document.getElementById("cert-date-display").textContent = lastPledgeData.date;

    const actionsListEl = document.getElementById("cert-actions-display");
    if (actionsListEl) {
      actionsListEl.innerHTML = lastPledgeData.actionKeys.map(function (key) {
        return "<li>" + window.escapeHtml(window.t(key)) + "</li>";
      }).join("");
    }

    wrapper.scrollIntoView({ behavior: "smooth" });
  }

  function handlePledgeSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById("pledge-name");
    const areaInput = document.getElementById("pledge-area");
    const actionCheckboxes = document.querySelectorAll('input[name="pledge-action"]:checked');

    let isValid = true;

    // Reset errors
    document.querySelectorAll(".form-error").forEach(function (el) {
      el.classList.remove("visible");
    });

    if (!nameInput.value.trim()) {
      const err = document.getElementById("err-pledge-name");
      if (err) {
        err.textContent = window.t("pledge_err_name");
        err.classList.add("visible");
      }
      isValid = false;
    }

    if (!areaInput.value.trim()) {
      const err = document.getElementById("err-pledge-area");
      if (err) {
        err.textContent = "Please enter your area or locality.";
        err.classList.add("visible");
      }
      isValid = false;
    }

    if (actionCheckboxes.length === 0) {
      const err = document.getElementById("err-pledge-actions");
      if (err) {
        err.textContent = window.t("pledge_err_select");
        err.classList.add("visible");
      }
      isValid = false;
    }

    if (!isValid) return;

    const actionKeyMap = {
      act1: "pledge_act_1",
      act2: "pledge_act_2",
      act3: "pledge_act_3",
      act4: "pledge_act_4",
      act5: "pledge_act_5"
    };

    const actionKeys = [];
    actionCheckboxes.forEach(function (cb) {
      if (actionKeyMap[cb.value]) {
        actionKeys.push(actionKeyMap[cb.value]);
      }
    });

    const currentDate = new Date().toLocaleDateString(
      window.getCurrentLang() === "te" ? "te-IN" : "en-IN",
      { year: "numeric", month: "long", day: "numeric" }
    );

    lastPledgeData = {
      name: nameInput.value.trim(),
      area: areaInput.value.trim(),
      actionKeys: actionKeys,
      date: currentDate
    };

    renderCertificate();
  }

  function setupEvents() {
    const form = document.getElementById("pledge-form");
    if (form) {
      form.addEventListener("submit", handlePledgeSubmit);
    }

    const printBtn = document.getElementById("print-cert-btn");
    if (printBtn) {
      printBtn.addEventListener("click", function () {
        window.print();
      });
    }
  }

  window.onLanguageChange = function () {
    if (lastPledgeData) {
      // Refresh date string in active language locale
      lastPledgeData.date = new Date().toLocaleDateString(
        window.getCurrentLang() === "te" ? "te-IN" : "en-IN",
        { year: "numeric", month: "long", day: "numeric" }
      );
      renderCertificate();
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    setupEvents();
  });
})();
