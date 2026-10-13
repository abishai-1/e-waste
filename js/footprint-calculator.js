// CleanEarth - Household Waste Footprint Calculator Controller
// All calculation factors are explicitly placed in the CONFIG object below.
// NOTE: These are ASSUMED PLACEHOLDER FACTORS for educational reference,
// to be replaced with locally verified municipal empirical values in the future.

const CALC_CONFIG = {
  // Assumed placeholder factors (weights and conversion multipliers)
  WEEKS_PER_YEAR: 52,
  BATTERY_AVG_KG: 0.045,      // Assumed 45 grams per alkaline battery cell
  EWASTE_ITEM_AVG_KG: 0.40,   // Assumed 400 grams per small electronics/cable item
  PLASTIC_BAG_AVG_KG: 0.008,  // Assumed 8 grams per plastic carry bag

  // Validation limits
  LIMITS: {
    members: { min: 1, max: 25 },
    wetKg: { min: 0, max: 150 },
    dryKg: { min: 0, max: 150 },
    batteries: { min: 0, max: 100 },
    electronics: { min: 0, max: 50 },
    bags: { min: 0, max: 100 }
  }
};

(function () {
  "use strict";

  let lastCalculation = null;

  function setupSlider() {
    const slider = document.getElementById("seg-pct");
    const valBadge = document.getElementById("slider-val");
    if (slider && valBadge) {
      slider.addEventListener("input", function () {
        valBadge.textContent = slider.value + "%";
      });
    }
  }

  function validateInput(id, min, max, errId) {
    const input = document.getElementById(id);
    const errEl = document.getElementById(errId);
    if (!input || !errEl) return null;

    const val = parseFloat(input.value);
    if (isNaN(val) || val < min) {
      errEl.textContent = window.t("calc_err_positive");
      errEl.classList.add("visible");
      return null;
    }
    if (val > max) {
      errEl.textContent = window.t("calc_err_limit");
      errEl.classList.add("visible");
      return null;
    }

    errEl.classList.remove("visible");
    return val;
  }

  function calculate() {
    const members = validateInput("members", CALC_CONFIG.LIMITS.members.min, CALC_CONFIG.LIMITS.members.max, "err-members");
    const wetKg = validateInput("wet-kg", CALC_CONFIG.LIMITS.wetKg.min, CALC_CONFIG.LIMITS.wetKg.max, "err-wet");
    const dryKg = validateInput("dry-kg", CALC_CONFIG.LIMITS.dryKg.min, CALC_CONFIG.LIMITS.dryKg.max, "err-dry");
    const batteries = validateInput("batteries", CALC_CONFIG.LIMITS.batteries.min, CALC_CONFIG.LIMITS.batteries.max, "err-batteries");
    const electronics = validateInput("electronics", CALC_CONFIG.LIMITS.electronics.min, CALC_CONFIG.LIMITS.electronics.max, "err-electronics");
    const bags = validateInput("bags", CALC_CONFIG.LIMITS.bags.min, CALC_CONFIG.LIMITS.bags.max, "err-bags");

    const segPctEl = document.getElementById("seg-pct");
    const segPct = segPctEl ? parseInt(segPctEl.value, 10) : 0;

    if (members === null || wetKg === null || dryKg === null || batteries === null || electronics === null || bags === null) {
      return;
    }

    // Annual estimations using assumed factors
    const annualWetKg = wetKg * CALC_CONFIG.WEEKS_PER_YEAR;
    const bagsKgYear = bags * CALC_CONFIG.WEEKS_PER_YEAR * CALC_CONFIG.PLASTIC_BAG_AVG_KG;
    const annualDryKg = (dryKg * CALC_CONFIG.WEEKS_PER_YEAR) + bagsKgYear;
    const annualHazKg = batteries * CALC_CONFIG.BATTERY_AVG_KG;
    const annualEwasteKg = electronics * CALC_CONFIG.EWASTE_ITEM_AVG_KG;

    const totalKg = annualWetKg + annualDryKg + annualHazKg + annualEwasteKg;
    const segFraction = segPct / 100;
    const segregatedKg = totalKg * segFraction;
    const unsegregatedKg = totalKg * (1 - segFraction);

    lastCalculation = {
      totalKg: totalKg,
      segregatedKg: segregatedKg,
      unsegregatedKg: unsegregatedKg,
      annualWetKg: annualWetKg,
      annualDryKg: annualDryKg,
      annualHazKg: annualHazKg,
      annualEwasteKg: annualEwasteKg,
      bagsPerWeek: bags,
      segPct: segPct
    };

    renderResults();
  }

  function renderResults() {
    if (!lastCalculation) return;

    const resultsBox = document.getElementById("results-box");
    if (!resultsBox) return;

    resultsBox.style.display = "block";

    // Text metrics
    document.getElementById("res-total-kg").textContent = lastCalculation.totalKg.toFixed(1);
    document.getElementById("res-seg-kg").textContent = lastCalculation.segregatedKg.toFixed(1);
    document.getElementById("res-unseg-kg").textContent = lastCalculation.unsegregatedKg.toFixed(1);

    document.getElementById("val-wet-kg").textContent = lastCalculation.annualWetKg.toFixed(1);
    document.getElementById("val-dry-kg").textContent = lastCalculation.annualDryKg.toFixed(1);
    document.getElementById("val-haz-kg").textContent = lastCalculation.annualHazKg.toFixed(2);
    document.getElementById("val-ewaste-kg").textContent = lastCalculation.annualEwasteKg.toFixed(2);

    // Update breakdown bar percentages
    const t = lastCalculation.totalKg > 0 ? lastCalculation.totalKg : 1;
    const pWet = Math.max(1, (lastCalculation.annualWetKg / t) * 100);
    const pDry = Math.max(1, (lastCalculation.annualDryKg / t) * 100);
    const pHaz = Math.max(0.5, (lastCalculation.annualHazKg / t) * 100);
    const pEw = Math.max(0.5, (lastCalculation.annualEwasteKg / t) * 100);

    const barWet = document.getElementById("bar-wet");
    const barDry = document.getElementById("bar-dry");
    const barHaz = document.getElementById("bar-haz");
    const barEwaste = document.getElementById("bar-ewaste");

    if (barWet) barWet.style.width = pWet.toFixed(1) + "%";
    if (barDry) barDry.style.width = pDry.toFixed(1) + "%";
    if (barHaz) barHaz.style.width = pHaz.toFixed(1) + "%";
    if (barEwaste) barEwaste.style.width = pEw.toFixed(1) + "%";

    // Suggest action based on inputs
    const sugText = document.getElementById("calc-suggested-text");
    const lang = window.getCurrentLang();

    let suggestion = "";
    if (lastCalculation.bagsPerWeek > 5) {
      suggestion = lang === "te"
        ? "నిరాకరించండి (Refuse): మీ కుటుంబం వారానికి " + lastCalculation.bagsPerWeek + " ప్లాస్టిక్ క్యారీ బ్యాగులను వాడుతోంది. కూరగాయల మార్కెట్ మరియు కిరాణా కొనుగోళ్లకు మీతో పాటు వస్త్ర సంచిని తీసుకెళ్లడం ద్వారా ఈ ప్లాస్టిక్ చెత్తను పూర్తిగా నివారించవచ్చు."
        : "Refuse: Your household uses " + lastCalculation.bagsPerWeek + " plastic bags weekly. Carrying a reusable cloth bag when shopping will completely stop this plastic waste from entering your home.";
    } else if (lastCalculation.segPct < 50) {
      suggestion = lang === "te"
        ? "వేరు చేయండి (Segregate): ప్రస్తుత విభజన శాతం " + lastCalculation.segPct + "% మాత్రమే. వంటగది తడి చెత్తను మరియు పొడి కాగితం/ప్లాస్టిక్‌ను విడిగా ఉంచడం ప్రారంభించండి; దీనివల్ల సుమారు " + lastCalculation.unsegregatedKg.toFixed(0) + " కిలోల చెత్త డంపింగ్ యార్డుకు చేరకుండా రీసైకిల్ అవుతుంది."
        : "Segregate: Your reported segregation is " + lastCalculation.segPct + "%. Keeping wet food scraps and dry recyclables in separate bins will prevent around " + lastCalculation.unsegregatedKg.toFixed(0) + " kg of mixed waste from ending up in dumpsites.";
    } else {
      suggestion = lang === "te"
        ? "తగ్గించండి & తిరిగి వాడండి (Reduce & Reuse): మీ ఇంట్లో చెత్త విభజన బాగా జరుగుతోంది. తదుపరి దశగా వంటగది వ్యర్థాలతో కంపోస్ట్ తయారు చేయడం మరియు పాత డబ్బాలను తిరిగి వాడటం ప్రారంభించండి."
        : "Reduce & Reuse: Your household maintains good segregation practices. Take the next step by composting wet waste at home and repurposing sturdy containers for kitchen storage.";
    }

    if (sugText) sugText.textContent = suggestion;
  }

  function setupEvents() {
    setupSlider();
    const form = document.getElementById("calc-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        calculate();
      });
    }
  }

  window.onLanguageChange = function () {
    if (lastCalculation) {
      renderResults();
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    setupEvents();
  });
})();
