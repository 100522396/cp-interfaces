// script/font-size.js
// Control del tamaño de fuente para accesibilidad

(function() {
  'use strict';

  const STORAGE_KEY = 'font-size-preference';
  const FONT_SIZES = {
    small: 'font-size-small',
    medium: 'font-size-medium',
    large: 'font-size-large'
  };
  
  // El orden de ciclado: pequeño -> mediano -> grande -> pequeño
  const SIZE_ORDER = ['small', 'medium', 'large'];
  
  // Inicializar el tamaño de fuente al cargar la página
  function initFontSize() {
    // Obtener preferencia guardada o usar 'medium' por defecto
    const savedSize = localStorage.getItem(STORAGE_KEY) || 'medium';
    
    // Aplicar el tamaño guardado
    applyFontSize(savedSize);
    
    // Agregar event listener al botón si existe
    const btnFontSize = document.getElementById('btn-font-size');
    if (btnFontSize) {
      btnFontSize.addEventListener('click', cycleFontSize);
    }
  }
  
  // Ciclar entre los 3 tamaños de fuente
  function cycleFontSize() {
    // Obtener tamaño actual
    const currentSize = localStorage.getItem(STORAGE_KEY) || 'medium';
    
    // Obtener índice actual en el array
    const currentIndex = SIZE_ORDER.indexOf(currentSize);
    
    // Calcular siguiente índice (volver a 0 si llegamos al final)
    const nextIndex = (currentIndex + 1) % SIZE_ORDER.length;
    const nextSize = SIZE_ORDER[nextIndex];
    
    // Aplicar y guardar nuevo tamaño
    applyFontSize(nextSize);
    localStorage.setItem(STORAGE_KEY, nextSize);
  }
  
  // Aplicar tamaño de fuente al html y body
  function applyFontSize(size) {
    const html = document.documentElement;
    const body = document.body;
    
    // Remover todas las clases de tamaño de ambos elementos
    Object.values(FONT_SIZES).forEach(className => {
      html.classList.remove(className);
      body.classList.remove(className);
    });
    
    // Añadir la clase del tamaño seleccionado a html (para zoom)
    if (FONT_SIZES[size]) {
      html.classList.add(FONT_SIZES[size]);
    }
    
    // Actualizar el botón visualmente
    updateButton(size);
  }
  
  // Actualizar apariencia del botón según el tamaño actual
  function updateButton(size) {
    const btnFontSize = document.getElementById('btn-font-size');
    if (!btnFontSize) return;
    
    // Cambiar el texto del botón según el tamaño
    const sizeLabels = {
      small: '🔤 A',
      medium: '🔤 A',
      large: '🔤 A'
    };
    
    // Cambiar título descriptivo
    const sizeTitles = {
      small: 'Tamaño pequeño - Clic para mediano',
      medium: 'Tamaño mediano - Clic para grande',
      large: 'Tamaño grande - Clic para pequeño'
    };
    
    btnFontSize.innerHTML = sizeLabels[size] || '🔤 A';
    btnFontSize.setAttribute('title', sizeTitles[size] || 'Cambiar tamaño de fuente');
    
    // Añadir clase visual al botón para indicar estado
    btnFontSize.className = 'btn-font-size';
    if (size === 'large') {
      btnFontSize.classList.add('active-large');
    } else if (size === 'small') {
      btnFontSize.classList.add('active-small');
    }
  }
  
  // Ejecutar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFontSize);
  } else {
    initFontSize();
  }
})();
