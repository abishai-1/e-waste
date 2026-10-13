// CleanEarth - Eco Quiz Controller
// 10 multiple-choice questions, progress indicator, explanation reveal, final review, and restart logic in EN & TE.

(function () {
  "use strict";

  let currentIndex = 0;
  let selectedOption = null;
  let score = 0;
  let answered = false;
  let wrongAnswers = [];

  function initQuiz() {
    currentIndex = 0;
    selectedOption = null;
    score = 0;
    answered = false;
    wrongAnswers = [];

    document.getElementById("quiz-question-screen").style.display = "block";
    document.getElementById("quiz-completed-screen").style.display = "none";

    renderQuestion();
  }

  function renderQuestion() {
    const questions = DATA.quizQuestions;
    if (currentIndex >= questions.length) {
      showResults();
      return;
    }

    const q = questions[currentIndex];
    const lang = window.getCurrentLang();

    answered = false;
    selectedOption = null;

    // Progress bar and indicators
    const progressFill = document.getElementById("quiz-progress-fill");
    if (progressFill) {
      const pct = ((currentIndex + 1) / questions.length) * 100;
      progressFill.style.width = pct + "%";
    }

    const currentNum = document.getElementById("quiz-current-num");
    if (currentNum) currentNum.textContent = (currentIndex + 1).toString();

    const qText = document.getElementById("quiz-question-text");
    if (qText) qText.textContent = q.question[lang] || q.question.en;

    const optContainer = document.getElementById("quiz-options-container");
    if (optContainer) {
      optContainer.innerHTML = q.options.map(function (opt, idx) {
        const text = opt[lang] || opt.en;
        return (
          '<button class="quiz-option" type="button" data-index="' + idx + '" role="radio" aria-checked="false">' +
          '  <span class="option-marker">' + String.fromCharCode(65 + idx) + '.</span> ' +
          '  <span>' + window.escapeHtml(text) + '</span>' +
          '</button>'
        );
      }).join("");

      // Add click listeners to options
      const optButtons = optContainer.querySelectorAll(".quiz-option");
      optButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (answered) return;
          optButtons.forEach(function (b) {
            b.classList.remove("selected");
            b.setAttribute("aria-checked", "false");
          });
          btn.classList.add("selected");
          btn.setAttribute("aria-checked", "true");
          selectedOption = parseInt(btn.getAttribute("data-index"), 10);
        });
      });
    }

    // Hide explanation box and next button; show submit button
    const expBox = document.getElementById("quiz-explanation-box");
    if (expBox) expBox.style.display = "none";

    const submitBtn = document.getElementById("quiz-submit-btn");
    if (submitBtn) {
      submitBtn.style.display = "inline-flex";
      submitBtn.disabled = false;
    }

    const nextBtn = document.getElementById("quiz-next-btn");
    if (nextBtn) nextBtn.style.display = "none";
  }

  function submitAnswer() {
    if (selectedOption === null || answered) return;
    answered = true;

    const q = DATA.quizQuestions[currentIndex];
    const isCorrect = selectedOption === q.correctIndex;
    const lang = window.getCurrentLang();

    if (isCorrect) {
      score++;
    } else {
      wrongAnswers.push({
        question: q,
        chosenIndex: selectedOption
      });
    }

    // Highlight options
    const optButtons = document.querySelectorAll(".quiz-option");
    optButtons.forEach(function (btn) {
      const idx = parseInt(btn.getAttribute("data-index"), 10);
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add("correct-reveal");
      } else if (idx === selectedOption) {
        btn.classList.add("wrong-reveal");
      }
    });

    // Show explanation
    const expBox = document.getElementById("quiz-explanation-box");
    const expText = document.getElementById("quiz-explanation-text");
    if (expBox && expText) {
      expText.textContent = q.explanation[lang] || q.explanation.en;
      expBox.style.display = "block";
    }

    // Toggle buttons
    const submitBtn = document.getElementById("quiz-submit-btn");
    if (submitBtn) submitBtn.style.display = "none";

    const nextBtn = document.getElementById("quiz-next-btn");
    if (nextBtn) nextBtn.style.display = "inline-flex";
  }

  function showResults() {
    document.getElementById("quiz-question-screen").style.display = "none";
    const completedScreen = document.getElementById("quiz-completed-screen");
    completedScreen.style.display = "block";

    const finalScoreEl = document.getElementById("quiz-final-score");
    if (finalScoreEl) finalScoreEl.textContent = score.toString();

    const reviewSec = document.getElementById("quiz-review-section");
    const reviewList = document.getElementById("quiz-review-list");

    if (wrongAnswers.length === 0) {
      if (reviewSec) reviewSec.style.display = "none";
    } else {
      if (reviewSec) reviewSec.style.display = "block";
      const lang = window.getCurrentLang();
      const html = wrongAnswers.map(function (w) {
        const qText = w.question.question[lang] || w.question.question.en;
        const yourOpt = w.question.options[w.chosenIndex][lang] || w.question.options[w.chosenIndex].en;
        const correctOpt = w.question.options[w.question.correctIndex][lang] || w.question.options[w.question.correctIndex].en;
        const exp = w.question.explanation[lang] || w.question.explanation.en;

        return (
          '<div class="review-item">' +
          '  <p><strong>' + window.escapeHtml(qText) + '</strong></p>' +
          '  <p><span style="color:var(--bin-hazardous);">' + window.t("game_your_choice") + ' ' + window.escapeHtml(yourOpt) + '</span><br>' +
          '  <span style="color:var(--bin-wet); font-weight:600;">' + window.t("game_correct_choice") + ' ' + window.escapeHtml(correctOpt) + '</span></p>' +
          '  <p><small><strong>' + window.t("quiz_explanation") + '</strong> ' + window.escapeHtml(exp) + '</small></p>' +
          '</div>'
        );
      }).join("");
      if (reviewList) reviewList.innerHTML = html;
    }
  }

  function setupEvents() {
    const submitBtn = document.getElementById("quiz-submit-btn");
    if (submitBtn) {
      submitBtn.addEventListener("click", submitAnswer);
    }

    const nextBtn = document.getElementById("quiz-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        currentIndex++;
        renderQuestion();
      });
    }

    const restartBtn = document.getElementById("quiz-restart-btn");
    if (restartBtn) {
      restartBtn.addEventListener("click", initQuiz);
    }
  }

  window.onLanguageChange = function () {
    if (currentIndex < DATA.quizQuestions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    setupEvents();
    initQuiz();
  });
})();
