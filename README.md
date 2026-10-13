# CleanEarth - Community Service Project (CSP)

A multi-page, bilingual static website built for undergraduate Community Service Project (CSP) field work to help households in Andhra Pradesh, India, separate waste at source.

## Overview
- **Technology Stack:** Pure HTML5, CSS3, and vanilla JavaScript (zero frameworks, zero build tools, zero external JS libraries, zero backend).
- **Languages:** English and Natural Telugu (with instantaneous language switching and complete bilingual translation).
- **Theming:** Light mode and Dark mode with contrast compliance (>= 4.5:1), system preference detection, and anti-flash inline head execution.
- **Design Principles:** Flat design, strictly no gradients, no emojis, no scroll animations, no hype claims, no invented metrics.
- **Offline / Local Run:** Fully functional by opening `index.html` directly in any web browser, or hosted as-is on GitHub Pages.

---

## File Structure

```text
/
├── index.html                   (Home: Purpose, 4-bin framework, tools grid, why this project)
├── bin-guide.html               (Detailed guide: what goes in, what stays out, handling tips, examples)
├── item-directory.html          (40+ items directory with live search and bin filter buttons)
├── bin-it-right.html            (15-round sorting game: click, keys 1-4, desktop drag-and-drop, best score)
├── eco-quiz.html                (10 multiple-choice quiz questions with progress bar and explanations)
├── five-rs.html                 (Refuse, Reduce, Reuse, Repurpose, Recycle priority ladder)
├── footprint-calculator.html    (Household waste estimator with validation and breakdown bar)
├── survey.html                  (Field survey form, localStorage storage, volunteer CSV export, clear data)
├── pledge.html                  (Household pledge form, instant printable certificate with print stylesheet)
├── ewaste-centers.html          (8 sample demo recycling/collection centers with multi-filter and maps links)
├── about.html                   (Executive summary, problem statement, architecture, outreach, 8 photo slots)
├── css/
│   └── style.css                (Shared stylesheet with CSS variables for light/dark theming)
├── js/
│   ├── main.js                  (Shared header/footer injection, theme toggle, i18n engine, safe localStorage)
│   ├── i18n.js                  (Complete bilingual translation dictionary for English and Telugu)
│   ├── data.js                  (Master dataset: 40+ items, 10 quiz questions, 8 demo e-waste facilities)
│   ├── bin-guide.js             (Bin guide interactive population)
│   ├── item-directory.js        (Item directory search and filter logic)
│   ├── bin-it-right.js          (Bin It Right game mechanics and scoring)
│   ├── eco-quiz.js              (Eco quiz state management and review)
│   ├── footprint-calculator.js  (Footprint calculator factors and validation)
│   ├── survey.js                (Survey validation, local recording, and CSV generator)
│   ├── pledge.js                (Pledge handling and certificate generation)
│   └── ewaste-centers.js        (E-waste directory multi-filtering and map routing)
├── images/
│   └── README.md                (Guide to adding photo-1.jpg through photo-8.jpg)
└── README.md                    (This documentation)
```

---

## How to Run Locally

1. **Direct File Open (Offline):**
   - Double-click `index.html` in your file explorer, or right-click and open with Chrome, Edge, Firefox, or Safari.
   - All navigation, themes, language toggles, games, quizzes, and calculators work entirely client-side without any web server.

2. **Using a Local Static Server (Optional):**
   - If you have Python installed:
     ```bash
     python -m http.server 8000
     ```
     Then open `http://localhost:8000` in your browser.

---

## How to Deploy to GitHub Pages

1. Initialize git and commit files:
   ```bash
   git init
   git add .
   git commit -m "Initial CleanEarth CSP website release"
   ```
2. Create a repository on GitHub (e.g., `cleanearth` or `clean`).
3. Add remote and push to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Source**, choose **Deploy from a branch**.
   - Select the `main` branch and `/ (root)` folder, then click **Save**.
   - Your site will be live within 1 to 2 minutes at `https://<your-username>.github.io/<repo-name>/`.

---

## How to Add Field Photos

1. Take up to 8 field outreach photographs (recommended 4:3 or 16:9 aspect ratio, under 500KB each).
2. Name the files:
   - `photo-1.jpg`
   - `photo-2.jpg`
   - `photo-3.jpg`
   - `photo-4.jpg`
   - `photo-5.jpg`
   - `photo-6.jpg`
   - `photo-7.jpg`
   - `photo-8.jpg`
3. Place them into the `images/` directory.
4. When `about.html` is opened, the images will display in place of the fallback placeholder boxes.

---

## How to Edit or Add E-Waste Centers

All e-waste centers are defined in `js/data.js` inside the `DATA.ewasteFacilities` array:

```javascript
{
  id: "ew-9",
  name: { en: "Facility Name", te: "కేంద్రం పేరు" },
  type: "point", // "plant" (Recycling plant) or "point" (Collection point)
  district: "Visakhapatnam",
  district_te: "విశాఖపట్నం",
  address: { en: "Door No, Street, City PIN", te: "చిరునామా" },
  phone: "+91 99999 00009",
  hours: { en: "Mon to Sat 9:00 AM to 5:00 PM", te: "పని వేళలు" },
  acceptedItems: ["computers", "mobile_phones", "batteries", "appliances", "cables_chargers"]
}
```

Simply append or edit objects in this array. Filter dropdowns and search will update dynamically.

---

## How to Edit Translations

All strings are centralized in `js/i18n.js`:
- To modify or add an English string, edit `I18N.en.<key>`.
- To modify or add a Telugu string, edit `I18N.te.<key>`.
- In HTML files, any static element can be translated by adding `data-i18n="<key>"`.
- Input placeholders use `data-i18n-placeholder="<key>"`.
- Accessibility labels use `data-i18n-aria="<key>"`.
- In JavaScript files, call `window.t("<key>")` to retrieve the current translation.

### Glossary Standard Maintained:
- Wet waste = తడి చెత్త
- Dry waste = పొడి చెత్త
- Hazardous waste = ప్రమాదకర వ్యర్థాలు
- E-waste = ఇ-వ్యర్థాలు
- Recycle = రీసైకిల్
- Reduce = తగ్గించండి
- Reuse = తిరిగి వాడండి
- Refuse = నిరాకరించండి
- Repurpose = కొత్త ప్రయోజనానికి వాడండి
- Pledge = ప్రతిజ్ఞ
- Survey = సర్వే
- Quiz = క్విజ్

---

## How to Adjust Footprint Calculator Factors

All calculation factors are defined at the top of `js/footprint-calculator.js` inside the `CALC_CONFIG` object:

```javascript
const CALC_CONFIG = {
  WEEKS_PER_YEAR: 52,
  BATTERY_AVG_KG: 0.045,      // Weight per battery (kg)
  EWASTE_ITEM_AVG_KG: 0.40,   // Weight per electronic item (kg)
  PLASTIC_BAG_AVG_KG: 0.008,  // Weight per carry bag (kg)
  LIMITS: { ... }
};
```

Update these factors when official municipal or state pollution control board audit figures become available.

---

## Testing Verification Report

- **File Tree:** All 11 HTML pages, shared CSS, main script, data script, i18n dictionary, and page scripts are present and verified.
- **Bilingual Consistency:** Complete coverage with 0 missing translation keys across both languages.
- **Accessibility:** Skip link on all pages, role="switch" on theme button, semantic tags (`<header>`, `<main>`, `<footer>`, `<nav>`, `<details>`, `<article>`), visible focus indicators, and WCAG AA contrast.
- **Print Optimization:** Printable certificate with dedicated print stylesheet that isolates `#certificate-wrapper`.
