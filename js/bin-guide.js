// CleanEarth - Bin Guide Controller
// Populates what goes in, what does not go in, handling tips, and household examples in EN & TE.

(function () {
  "use strict";

  const GUIDE_DATA = {
    wet: {
      in: {
        en: [
          "Vegetable and fruit peels, seeds, and stalks",
          "Leftover cooked food and rotten produce (drained)",
          "Used tea leaves, tea bags, and coffee grounds",
          "Egg shells and tender coconut coir",
          "Dry leaves, cut flowers, and garden trimmings"
        ],
        te: [
          "కూరగాయలు మరియు పండ్ల తొక్కలు, విత్తనాలు మరియు కాడలు",
          "మిగిలిన వండిన ఆహారం మరియు కుళ్ళిన పదార్థాలు (నీరు తీసివేసినవి)",
          "వాడిన టీ పొడి, టీ బ్యాగులు మరియు కాఫీ వ్యర్థాలు",
          "కోడిగుడ్డు పెంకులు మరియు కొబ్బరి పీచు",
          "ఎండిన ఆకులు, పూలు మరియు తోట వ్యర్థాలు"
        ]
      },
      out: {
        en: [
          "Plastic grocery bags, pouches, and wrappers",
          "Batteries, electronics, or broken glass",
          "Sanitary pads, diapers, or bandages",
          "Chemical cleaning bottles or engine oil"
        ],
        te: [
          "ప్లాస్టిక్ క్యారీ బ్యాగులు, కవర్లు మరియు ర్యాపర్లు",
          "బ్యాటరీలు, ఎలక్ట్రానిక్స్ లేదా పగిలిన గాజు ముక్కలు",
          "శానిటరీ ప్యాడ్లు, డైపర్లు లేదా కట్లు",
          "రసాయన క్లీనర్లు లేదా ఇంజిన్ ఆయిల్"
        ]
      },
      handling: {
        en: "Keep organic waste unbagged or use paper/newspaper lining. Drain liquids into the drain first to reduce leachate and bad smells.",
        te: "సేంద్రీయ వ్యర్థాలను ప్లాస్టిక్ కవర్లు లేకుండా ఉంచండి. దుర్వాసన రాకుండా అదనపు నీటిని ముందుగానే తొలగించండి."
      },
      examples: {
        en: ["Banana peel", "Potato peel", "Cooked rice", "Tea leaves", "Egg shells", "Coconut shell", "Dry leaves", "Tomato scraps"],
        te: ["అరటి తొక్క", "బంగాళాదుంప తొక్క", "వండిన అన్నం", "టీ పొడి", "గుడ్డు పెంకులు", "కొబ్బరి చిప్ప", "ఎండిన ఆకులు", "టమాటా వ్యర్థాలు"]
      }
    },
    dry: {
      in: {
        en: [
          "Newspapers, magazines, flyers, notebooks, and office paper",
          "Cardboard delivery cartons and brown paper bags",
          "Clean PET bottles, plastic shampoo jars, and buckets",
          "Rinsed milk packets and dry snack wrappers",
          "Metal beverage cans, food tins, and clean aluminum foil",
          "Clean, unbroken glass jars and bottles"
        ],
        te: [
          "వార్తాపత్రికలు, పుస్తకాలు, నోట్‌బుక్‌లు మరియు ఆఫీస్ కాగితాలు",
          "కార్డ్‌బోర్డ్ డెలివరీ బాక్సులు మరియు బ్రౌన్ పేపర్ సంచులు",
          "శుభ్రమైన ప్లాస్టిక్ వాటర్ బాటిళ్లు, షాంపూ డబ్బాలు మరియు బకెట్లు",
          "కడిగి ఆరబెట్టిన పాల ప్యాకెట్లు మరియు పొడి స్నాక్ కవర్లు",
          "లోహపు డబ్బాలు, టిన్నులు మరియు అల్యూమినియం ఫాయిల్",
          "శుభ్రమైన గాజు సీసాలు మరియు పాత్రలు"
        ]
      },
      out: {
        en: [
          "Food-stained greasy pizza boxes or gravy-soaked paper",
          "Wet vegetable peels or leftover foods",
          "Batteries, tube lights, or chemical cleaners",
          "Soiled tissues and sanitary napkins"
        ],
        te: [
          "నూనె లేదా ఆహార మరకలు అంటిన పిజ్జా బాక్సులు లేదా కాగితాలు",
          "తడి కూరగాయల తొక్కలు లేదా వండిన ఆహారం",
          "బ్యాటరీలు, ట్యూబ్‌లైట్లు లేదా రసాయనాలు",
          "వాడిన టిష్యూలు మరియు శానిటరీ నాప్‌కిన్లు"
        ]
      },
      handling: {
        en: "Keep items clean and dry. Rinse food and milk containers briefly to prevent bad smells and paper contamination. Flatten boxes to save space.",
        te: "వస్తువులను పొడిగా మరియు శుభ్రంగా ఉంచండి. ఆహార డబ్బాలను కడిగి ఆరబెట్టండి. స్థలం ఆదా చేయడానికి అట్టపెట్టెలను చదును చేయండి."
      },
      examples: {
        en: ["Newspaper", "Cardboard box", "PET water bottle", "Milk packet (rinsed)", "Steel can", "Glass bottle", "Biscuit wrapper", "Old notebook"],
        te: ["వార్తాపత్రిక", "కార్డ్‌బోర్డ్ బాక్స్", "ప్లాస్టిక్ వాటర్ బాటిల్", "పాల ప్యాకెట్ (కడిగినది)", "లోహపు టిన్", "గాజు సీసా", "బిస్కెట్ కవర్", "పాత నోట్‌బుక్"]
      }
    },
    hazardous: {
      in: {
        en: [
          "AA/AAA alkaline batteries and button cells",
          "Fluorescent tube lights, CFLs, and broken glass",
          "Expired medical tablets, syrups, and ointments",
          "Paint tins, thinners, varnishes, and pesticide containers",
          "Sanitary pads, diapers, and soiled medical cotton (wrapped)"
        ],
        te: [
          "సాధారణ బ్యాటరీ సెల్లు మరియు చిన్న బటన్ సెల్స్",
          "ట్యూబ్‌లైట్లు, CFL బల్బులు మరియు పగిలిన గాజు ముక్కలు",
          "గడువు ముగిసిన మందులు మరియు సిరప్‌లు",
          "పెయింట్ డబ్బాలు, వార్నిష్ మరియు పురుగుమందుల సీసాలు",
          "శానిటరీ ప్యాడ్లు, డైపర్లు మరియు రక్తపు దూది (చుట్టినవి)"
        ]
      },
      out: {
        en: [
          "Ordinary dry cardboard or clean paper",
          "Regular kitchen wet food waste",
          "Functional laptops or smart phones (those are e-waste)"
        ],
        te: [
          "సాధారణ పొడి కాగితం లేదా అట్టపెట్టెలు",
          "వంటగది తడి ఆహార వ్యర్థాలు",
          "పనిచేసే ల్యాప్‌టాప్‌లు లేదా ఫోన్లు (అవి ఇ-వ్యర్థాలు)"
        ]
      },
      handling: {
        en: "Wrap broken glass and sharp blades securely in thick cardboard. Wrap sanitary waste in newspaper and mark with a red dot. Store chemicals in original sealed bottles.",
        te: "పగిలిన గాజు ముక్కలను మందపాటి అట్టపెట్టెలో చుట్టండి. శానిటరీ వ్యర్థాలను వార్తాపత్రికలో చుట్టి ఎరుపు గుర్తు వేయండి. రసాయనాలను మూత గట్టిగా పెట్టి ఉంచండి."
      },
      examples: {
        en: ["Used battery", "CFL bulb", "Expired medicine", "Paint tin", "Sanitary pad (wrapped)", "Broken glass", "Cooking oil", "Pesticide can"],
        te: ["వాడిన బ్యాటరీ", "CFL బల్బు", "గడువు ముగిసిన మందులు", "పెయింట్ డబ్బా", "శానిటరీ ప్యాడ్", "పగిలిన గాజు ముక్కలు", "వాడిన వంట నూనె", "పురుగుమందుల సీసా"]
      }
    },
    ewaste: {
      in: {
        en: [
          "Old smartphones, keypad phones, and tablets",
          "Phone chargers, USB cables, and power adapters",
          "Computer keyboards, mice, and circuit boards",
          "Power banks and electronic desk calculators",
          "Small household electronics like electric irons and kettles"
        ],
        te: [
          "పాత స్మార్ట్‌ఫోన్లు, కీప్యాడ్ ఫోన్లు మరియు టాబ్లెట్లు",
          "ఫోన్ ఛార్జర్లు, USB కేబుల్స్ మరియు అడాప్టర్లు",
          "కంప్యూటర్ కీబోర్డులు, మౌస్ మరియు సర్క్యూట్ బోర్డులు",
          "పవర్ బ్యాంకులు మరియు ఎలక్ట్రానిక్ కాలిక్యులేటర్లు",
          "చిన్న గృహోపకరణాలు (ఇస్త్రీ పెట్టెలు, ఎలక్ట్రిక్ కెటిల్స్ మొదలైనవి)"
        ]
      },
      out: {
        en: [
          "Wet organic kitchen waste",
          "Paper, cardboard, or plastic food wrappers",
          "Chemical pesticides or expired syrups"
        ],
        te: [
          "వంటగది తడి సేంద్రీయ వ్యర్థాలు",
          "కాగితం, కార్డ్‌బోర్డ్ లేదా ప్లాస్టిక్ కవర్లు",
          "రసాయన పురుగుమందులు లేదా మందులు"
        ]
      },
      handling: {
        en: "Do not break screens or crush batteries. Never burn cables or open circuits at home. Deposit at authorized municipal drop-off centres or collection drives.",
        te: "స్క్రీన్లను పగలగొట్టవద్దు, బ్యాటరీలను నలపవద్దు. కేబుల్స్ కాల్చడం లేదా విడదీయడం చేయరాదు. అధీకృత ఇ-వ్యర్థాల సేకరణ కేంద్రాలకే ఇవ్వండి."
      },
      examples: {
        en: ["Old mobile phone", "Charger cable", "Earphones", "Keyboard", "Power bank", "Electronic calculator", "Electric iron", "Wi-Fi router"],
        te: ["పాత మొబైల్ ఫోన్", "ఛార్జర్ కేబుల్", "ఇయర్‌ఫోన్లు", "కీబోర్డ్", "పవర్ బ్యాంక్", "ఎలక్ట్రానిక్ కాలిక్యులేటర్", "ఇస్త్రీ పెట్టె", "వై-ఫై రూటర్"]
      }
    }
  };

  function renderList(targetId, items) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = items.map(function (item) {
      return "<li>" + window.escapeHtml(item) + "</li>";
    }).join("");
  }

  function renderTags(targetId, tags) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = tags.map(function (tag) {
      return '<span class="example-tag">' + window.escapeHtml(tag) + "</span>";
    }).join("");
  }

  function renderGuide(lang) {
    const safeLang = (lang === "te") ? "te" : "en";

    // Wet
    renderList("wet-in-list", GUIDE_DATA.wet.in[safeLang]);
    renderList("wet-out-list", GUIDE_DATA.wet.out[safeLang]);
    const wetH = document.getElementById("wet-handling");
    if (wetH) wetH.textContent = GUIDE_DATA.wet.handling[safeLang];
    renderTags("wet-examples", GUIDE_DATA.wet.examples[safeLang]);

    // Dry
    renderList("dry-in-list", GUIDE_DATA.dry.in[safeLang]);
    renderList("dry-out-list", GUIDE_DATA.dry.out[safeLang]);
    const dryH = document.getElementById("dry-handling");
    if (dryH) dryH.textContent = GUIDE_DATA.dry.handling[safeLang];
    renderTags("dry-examples", GUIDE_DATA.dry.examples[safeLang]);

    // Hazardous
    renderList("haz-in-list", GUIDE_DATA.hazardous.in[safeLang]);
    renderList("haz-out-list", GUIDE_DATA.hazardous.out[safeLang]);
    const hazH = document.getElementById("haz-handling");
    if (hazH) hazH.textContent = GUIDE_DATA.hazardous.handling[safeLang];
    renderTags("haz-examples", GUIDE_DATA.hazardous.examples[safeLang]);

    // E-waste
    renderList("ewaste-in-list", GUIDE_DATA.ewaste.in[safeLang]);
    renderList("ewaste-out-list", GUIDE_DATA.ewaste.out[safeLang]);
    const ewH = document.getElementById("ewaste-handling");
    if (ewH) ewH.textContent = GUIDE_DATA.ewaste.handling[safeLang];
    renderTags("ewaste-examples", GUIDE_DATA.ewaste.examples[safeLang]);
  }

  window.onLanguageChange = function (lang) {
    renderGuide(lang);
  };

  document.addEventListener("DOMContentLoaded", function () {
    renderGuide(window.getCurrentLang());
  });
})();
