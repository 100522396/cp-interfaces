// script/font-size.js
// Font size control for accessibility

(function () {
  "use strict";

  const STORAGE_KEY = "font-size-preference";
  const FONT_SIZES = {
    small: "font-size-small",
    medium: "font-size-medium",
    large: "font-size-large",
  };

  // Cycle order: small -> medium -> large -> small
  const SIZE_ORDER = ["small", "medium", "large"];

  // Init font size on page load
  function initFontSize() {
    // Get saved preference or use 'medium' by default
    const savedSize = localStorage.getItem(STORAGE_KEY) || "medium";

    // Apply saved size
    applyFontSize(savedSize);

    // Add event listener to button if it exists
    const btnFontSize = document.getElementById("btn-font-size");
    if (btnFontSize) {
      btnFontSize.addEventListener("click", cycleFontSize);
    }
  }

  // Cycle through 3 font sizes
  function cycleFontSize() {
    // Get current size
    const currentSize = localStorage.getItem(STORAGE_KEY) || "medium";

    // Get current index in array
    const currentIndex = SIZE_ORDER.indexOf(currentSize);

    // Calculate next index (go back to 0 at end)
    const nextIndex = (currentIndex + 1) % SIZE_ORDER.length;
    const nextSize = SIZE_ORDER[nextIndex];

    // Apply and save new size
    applyFontSize(nextSize);
    localStorage.setItem(STORAGE_KEY, nextSize);
  }

  // Apply font size to html and body
  function applyFontSize(size) {
    const html = document.documentElement;
    const body = document.body;

    // Remove all size classes from both elements
    Object.values(FONT_SIZES).forEach((className) => {
      html.classList.remove(className);
      body.classList.remove(className);
    });

    // Add selected size class to html (for zoom)
    if (FONT_SIZES[size]) {
      html.classList.add(FONT_SIZES[size]);
    }

    // Update button visually
    updateButton(size);
  }

  // Update button appearance based on current size
  function updateButton(size) {
    const btnFontSize = document.getElementById("btn-font-size");
    if (!btnFontSize) return;

    // Change button text based on size
    const sizeLabels = {
      small: "🔤 A",
      medium: "🔤 A",
      large: "🔤 A",
    };

    // Change descriptive title
    const sizeTitles = {
      small: "Tamaño pequeño - Clic para mediano",
      medium: "Tamaño mediano - Clic para grande",
      large: "Tamaño grande - Clic para pequeño",
    };

    btnFontSize.innerHTML = sizeLabels[size] || "🔤 A";
    btnFontSize.setAttribute(
      "title",
      sizeTitles[size] || "Cambiar tamaño de fuente"
    );

    // Add visual class to button to indicate state
    btnFontSize.className = "btn-font-size";
    if (size === "large") {
      btnFontSize.classList.add("active-large");
    } else if (size === "small") {
      btnFontSize.classList.add("active-small");
    }
  }

  // Run when DOM loads
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFontSize);
  } else {
    initFontSize();
  }
})();
