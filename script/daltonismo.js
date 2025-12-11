// script/daltonismo.js
// Manejo del modo daltónico (deuteranopia) para accesibilidad

(function() {
  'use strict';

  const STORAGE_KEY = 'deuteranopia-mode';
  const BODY_CLASS = 'deuteranopia-mode';
  
  // Inicializar el modo al cargar la página
  function initDaltonismoMode() {
    // Verificar si hay preferencia guardada
    const isDeuteranopiaEnabled = localStorage.getItem(STORAGE_KEY) === 'true';
    
    if (isDeuteranopiaEnabled) {
      document.body.classList.add(BODY_CLASS);
      updateButtonText(true);
    }
    
    // Agregar event listener al botón si existe
    const btnDaltonico = document.querySelector('.btn-accessibility');
    if (btnDaltonico) {
      btnDaltonico.addEventListener('click', toggleDaltonismoMode);
    }
  }
  
  // Toggle del modo daltónico
  function toggleDaltonismoMode() {
    const isCurrentlyEnabled = document.body.classList.contains(BODY_CLASS);
    
    if (isCurrentlyEnabled) {
      // Desactivar modo deuteranopia
      document.body.classList.remove(BODY_CLASS);
      localStorage.setItem(STORAGE_KEY, 'false');
      updateButtonText(false);
    } else {
      // Activar modo deuteranopia
      document.body.classList.add(BODY_CLASS);
      localStorage.setItem(STORAGE_KEY, 'true');
      updateButtonText(true);
    }
  }
  
  // Actualizar texto del botón según el estado
  function updateButtonText(isEnabled) {
    const btnDaltonico = document.querySelector('.btn-accessibility');
    if (btnDaltonico) {
      const textElement = btnDaltonico.querySelector('[data-i18n]');
      if (textElement) {
        if (isEnabled) {
          textElement.textContent = 'Modo Normal';
          // Mantener traducción si existe
          if (textElement.dataset.i18n) {
            textElement.dataset.originalI18n = textElement.dataset.i18n;
            textElement.removeAttribute('data-i18n');
          }
        } else {
          textElement.textContent = 'Modo Daltónico';
          // Restaurar traducción
          if (textElement.dataset.originalI18n) {
            textElement.dataset.i18n = textElement.dataset.originalI18n;
          }
        }
      } else {
        // Si no hay elemento con data-i18n, actualizar directamente
        btnDaltonico.innerHTML = isEnabled ? '👁️ Modo Normal' : '👁️ Modo Daltónico';
      }
    }
  }
  
  // Ejecutar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDaltonismoMode);
  } else {
    initDaltonismoMode();
  }
})();
