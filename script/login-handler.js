// script/login-handler.js
// Login form handler

(function () {
  "use strict";

  // Wait for DOM to be ready
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector(".login-form");
    if (!form) return;

    // Form elements
    var emailInput = document.getElementById("login-email");
    var passwordInput = document.getElementById("login-password");
    var rememberCheckbox = document.getElementById("remember");

    // Handle form submit
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get values
      var email = emailInput ? emailInput.value.trim() : "";
      var password = passwordInput ? passwordInput.value : "";

      // Basic validations
      if (!email) {
        alert("Por favor, introduce tu email");
        if (emailInput) emailInput.focus();
        return;
      }

      if (!password) {
        alert("Por favor, introduce tu contraseña");
        if (passwordInput) passwordInput.focus();
        return;
      }

      // Try to login
      var result = AuthSystem.login(email, password);

      if (result.success) {
        alert("¡Bienvenido/a de nuevo!");
        // Redirect to home page
        window.location.href = "index.html";
      } else {
        alert("Error: " + result.error);
        // Clear password
        if (passwordInput) {
          passwordInput.value = "";
          passwordInput.focus();
        }
      }
    });
  });
})();
