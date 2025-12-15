// script/daltonismo.js
// Colorblind mode (deuteranopia) for accessibility

(function () {
  "use strict";

  const STORAGE_KEY = "deuteranopia-mode";
  const BODY_CLASS = "deuteranopia-mode";

  // Init mode on page load
  function initDaltonismoMode() {
    // Check saved preference
    const isDeuteranopiaEnabled = localStorage.getItem(STORAGE_KEY) === "true";

    if (isDeuteranopiaEnabled) {
      document.body.classList.add(BODY_CLASS);
      updateButtonText(true);
    }

    // Add event listener to button if it exists
    const btnDaltonico = document.querySelector(".btn-accessibility");
    if (btnDaltonico) {
      btnDaltonico.addEventListener("click", toggleDaltonismoMode);
    }
  }

  // Toggle colorblind mode
  function toggleDaltonismoMode() {
    const isCurrentlyEnabled = document.body.classList.contains(BODY_CLASS);

    if (isCurrentlyEnabled) {
      // Disable deuteranopia mode
      document.body.classList.remove(BODY_CLASS);
      localStorage.setItem(STORAGE_KEY, "false");
      updateButtonText(false);
    } else {
      // Enable deuteranopia mode
      document.body.classList.add(BODY_CLASS);
      localStorage.setItem(STORAGE_KEY, "true");
      updateButtonText(true);
    }
  }

  // Update button text based on state
  function updateButtonText(isEnabled) {
    const btnDaltonico = document.querySelector(".btn-accessibility");
    if (btnDaltonico) {
      const textElement = btnDaltonico.querySelector("[data-i18n]");
      if (textElement) {
        if (isEnabled) {
          textElement.textContent = "Modo Normal";
          // Keep translation if exists
          if (textElement.dataset.i18n) {
            textElement.dataset.originalI18n = textElement.dataset.i18n;
            textElement.removeAttribute("data-i18n");
          }
        } else {
          textElement.textContent = "Modo Daltónico";
          // Restore translation
          if (textElement.dataset.originalI18n) {
            textElement.dataset.i18n = textElement.dataset.originalI18n;
          }
        }
      } else {
        // No data-i18n element, update directly
        btnDaltonico.innerHTML = isEnabled
          ? "👁️ Modo Normal"
          : "👁️ Modo Daltónico";
      }
    }
  }

  // Run when DOM loads
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDaltonismoMode);
  } else {
    initDaltonismoMode();
  }
})();
