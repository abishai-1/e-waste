// CleanEarth - Bin It Right Game Controller
// 15 shuffled rounds, keyboard 1-4, clicks, drag & drop, immediate feedback, best score in localStorage.

(function () {
  "use strict";

  const STORAGE_BEST_KEY = "cleanearth_bin_game_best";
  const TOTAL_ROUNDS = 15;

  let gamePool = [];
  let currentIndex = 0;
  let score = 0;
  let waitingForNext = false;
  let wrongAnswers = [];

  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  function getBestScore() {
    try {
      const val = localStorage.getItem(STORAGE_BEST_KEY);
      return val ? parseInt(val, 10) : 0;
    } catch (e) {
      return 0;
    }
  }

  function saveBestScore(newScore) {
    try {
      const current = getBestScore();
      if (newScore > current) {
        localStorage.setItem(STORAGE_BEST_KEY, newScore.toString());
      }
    } catch (e) {}
  }

  function initGame() {
    gamePool = shuffle(DATA.items).slice(0, TOTAL_ROUNDS);
    currentIndex = 0;
    score = 0;
    waitingForNext = false;
    wrongAnswers = [];

    document.getElementById("play-screen").style.display = "block";
    document.getElementById("game-over-screen").style.display = "none";
    document.getElementById("feedback-banner").className = "feedback-banner";

    updateHeaderIndicators();
    showCurrentItem();
  }

  function updateHeaderIndicators() {
    const roundEl = document.getElementById("round-indicator");
    const scoreEl = document.getElementById("score-indicator");
    const bestEl = document.getElementById("best-score-indicator");

    if (roundEl) roundEl.textContent = (currentIndex + 1).toString();
    if (scoreEl) scoreEl.textContent = score.toString();
    if (bestEl) bestEl.textContent = getBestScore().toString();
  }

  function showCurrentItem() {
    if (currentIndex >= TOTAL_ROUNDS) {
      finishGame();
      return;
    }

    waitingForNext = false;
    const currentItem = gamePool[currentIndex];
    const lang = window.getCurrentLang();
    const itemName = currentItem.name[lang] || currentItem.name.en;

    const nameEl = document.getElementById("item-name");
    if (nameEl) nameEl.textContent = itemName;

    // Reset feedback banner
    const feedbackBanner = document.getElementById("feedback-banner");
    if (feedbackBanner) {
      feedbackBanner.className = "feedback-banner";
      feedbackBanner.style.display = "none";
    }

    // Enable bin buttons
    const binBtns = document.querySelectorAll(".game-bin-btn");
    binBtns.forEach(function (btn) {
      btn.disabled = false;
    });

    updateHeaderIndicators();
  }

  function handleAnswer(selectedBin) {
    if (waitingForNext || currentIndex >= TOTAL_ROUNDS) return;
    waitingForNext = true;

    const currentItem = gamePool[currentIndex];
    const isCorrect = selectedBin === currentItem.bin;
    const lang = window.getCurrentLang();

    // Disable bin buttons during feedback
    const binBtns = document.querySelectorAll(".game-bin-btn");
    binBtns.forEach(function (btn) {
      btn.disabled = true;
    });

    const feedbackBanner = document.getElementById("feedback-banner");
    const titleEl = document.getElementById("feedback-title");
    const reasonEl = document.getElementById("feedback-reason");

    const correctColor = window.t("bin_" + currentItem.bin + "_color");
    const correctBinName = window.t("bin_" + currentItem.bin);
    const itemTip = currentItem.tip[lang] || currentItem.tip.en;

    if (isCorrect) {
      score++;
      feedbackBanner.className = "feedback-banner correct";
      titleEl.textContent = window.t("game_feedback_correct");
      reasonEl.textContent = correctColor + " (" + correctBinName + "): " + itemTip;
    } else {
      feedbackBanner.className = "feedback-banner wrong";
      titleEl.textContent = window.t("game_feedback_wrong");
      reasonEl.textContent = window.t("game_correct_choice") + " " + correctColor + " (" + correctBinName + "). " + itemTip;

      wrongAnswers.push({
        item: currentItem,
        chosen: selectedBin
      });
    }

    feedbackBanner.style.display = "block";
    updateHeaderIndicators();
    saveBestScore(score);
  }

  function nextItem() {
    currentIndex++;
    if (currentIndex >= TOTAL_ROUNDS) {
      finishGame();
    } else {
      showCurrentItem();
    }
  }

  function finishGame() {
    saveBestScore(score);

    document.getElementById("play-screen").style.display = "none";
    const gameOverScreen = document.getElementById("game-over-screen");
    gameOverScreen.style.display = "block";

    const finalVal = document.getElementById("final-score-val");
    if (finalVal) finalVal.textContent = score.toString();

    const wrongContainer = document.getElementById("wrong-answers-container");
    const wrongList = document.getElementById("wrong-answers-list");

    if (wrongAnswers.length === 0) {
      if (wrongContainer) wrongContainer.style.display = "none";
    } else {
      if (wrongContainer) wrongContainer.style.display = "block";
      const lang = window.getCurrentLang();
      const listHtml = wrongAnswers.map(function (w) {
        const iName = w.item.name[lang] || w.item.name.en;
        const cBinName = window.t("bin_" + w.item.bin);
        const yBinName = window.t("bin_" + w.chosen);
        const tip = w.item.tip[lang] || w.item.tip.en;

        return (
          '<div class="review-item">' +
          '  <strong>' + window.escapeHtml(iName) + '</strong><br>' +
          '  <span style="color:var(--bin-hazardous);">' + window.t("game_your_choice") + ' ' + window.escapeHtml(yBinName) + '</span> &bull; ' +
          '  <span style="color:var(--bin-wet); font-weight:600;">' + window.t("game_correct_choice") + ' ' + window.escapeHtml(cBinName) + '</span><br>' +
          '  <small>' + window.escapeHtml(tip) + '</small>' +
          '</div>'
        );
      }).join("");
      if (wrongList) wrongList.innerHTML = listHtml;
    }
  }

  function setupInteractions() {
    // 1. Click on bin buttons
    const binBtns = document.querySelectorAll(".game-bin-btn");
    binBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const bin = btn.getAttribute("data-bin");
        handleAnswer(bin);
      });
    });

    // 2. Next Item button
    const nextBtn = document.getElementById("next-item-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", nextItem);
    }

    // 3. Play again button
    const restartBtn = document.getElementById("restart-game-btn");
    if (restartBtn) {
      restartBtn.addEventListener("click", initGame);
    }

    // 4. Keyboard Shortcuts: 1 = Wet, 2 = Dry, 3 = Hazardous, 4 = E-waste, Enter/Space = Next
    window.addEventListener("keydown", function (e) {
      if (waitingForNext) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          nextItem();
        }
        return;
      }

      if (e.key === "1") {
        handleAnswer("wet");
      } else if (e.key === "2") {
        handleAnswer("dry");
      } else if (e.key === "3") {
        handleAnswer("hazardous");
      } else if (e.key === "4") {
        handleAnswer("ewaste");
      }
    });

    // 5. Desktop Drag and Drop
    const itemBox = document.getElementById("item-box");
    if (itemBox) {
      itemBox.addEventListener("dragstart", function (e) {
        if (waitingForNext) {
          e.preventDefault();
          return;
        }
        e.dataTransfer.setData("text/plain", "sorting-item");
      });
    }

    binBtns.forEach(function (btn) {
      btn.addEventListener("dragover", function (e) {
        e.preventDefault();
        btn.classList.add("drag-over");
      });

      btn.addEventListener("dragleave", function () {
        btn.classList.remove("drag-over");
      });

      btn.addEventListener("drop", function (e) {
        e.preventDefault();
        btn.classList.remove("drag-over");
        const bin = btn.getAttribute("data-bin");
        handleAnswer(bin);
      });
    });
  }

  window.onLanguageChange = function () {
    if (currentIndex < TOTAL_ROUNDS && !waitingForNext) {
      showCurrentItem();
    } else if (currentIndex < TOTAL_ROUNDS && waitingForNext) {
      // Refresh current feedback in newly chosen language
      const currentItem = gamePool[currentIndex];
      const lang = window.getCurrentLang();
      const reasonEl = document.getElementById("feedback-reason");
      const correctColor = window.t("bin_" + currentItem.bin + "_color");
      const correctBinName = window.t("bin_" + currentItem.bin);
      const itemTip = currentItem.tip[lang] || currentItem.tip.en;
      if (reasonEl) reasonEl.textContent = correctColor + " (" + correctBinName + "): " + itemTip;
    } else {
      finishGame();
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    setupInteractions();
    initGame();
  });
})();
