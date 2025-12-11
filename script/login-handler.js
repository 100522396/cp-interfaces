// script/login-handler.js
// Manejo del formulario de login

(function() {
  'use strict';

  // Esperar a que el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('.login-form');
    if (!form) return; // Si no estamos en la página de login, salir

    // Elementos del formulario
    var emailInput = document.getElementById('login-email');
    var passwordInput = document.getElementById('login-password');
    var rememberCheckbox = document.getElementById('remember');

    // Manejo del envío del formulario
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Obtener valores
      var email = emailInput ? emailInput.value.trim() : '';
      var password = passwordInput ? passwordInput.value : '';

      // Validaciones básicas
      if (!email) {
        alert('Por favor, introduce tu email');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!password) {
        alert('Por favor, introduce tu contraseña');
        if (passwordInput) passwordInput.focus();
        return;
      }

      // Intentar iniciar sesión
      var result = AuthSystem.login(email, password);

      if (result.success) {
        alert('¡Bienvenido/a de nuevo!');
        // Redirigir a la página principal
        window.location.href = 'index.html';
      } else {
        alert('Error: ' + result.error);
        // Limpiar contraseña
        if (passwordInput) {
          passwordInput.value = '';
          passwordInput.focus();
        }
      }
    });
  });
})();
