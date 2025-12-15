// script/session-manager.js
// Global session management - runs on all pages

(function () {
  "use strict";

  // Wait for DOM to be ready
  document.addEventListener("DOMContentLoaded", function () {
    updateUIBasedOnSession();
    setupLogoutButton();
    protectPrivatePages();
  });

  // Update UI based on session state
  function updateUIBasedOnSession() {
    var currentUser = AuthSystem.getCurrentUser();
    var userControls = document.querySelector(".user-controls");

    if (!userControls) return;

    if (currentUser) {
      // Logged in - show name and logout button
      updateLoggedInUI(userControls, currentUser);
    } else {
      // Not logged in - show Login/Register buttons
      updateLoggedOutUI(userControls);
    }
  }

  // UI when logged in
  function updateLoggedInUI(container, user) {
    // Find login/signup buttons
    var btnLogin = container.querySelector(".btn-login");
    var btnSignup = container.querySelector(".btn-signup");

    // Create welcome element if not exists
    var welcomeElement = container.querySelector(".user-welcome");
    if (!welcomeElement) {
      welcomeElement = document.createElement("div");
      welcomeElement.className = "user-welcome";

      // Insert before language toggle
      var langToggle = container.querySelector(".lang-toggle");
      if (langToggle) {
        container.insertBefore(welcomeElement, langToggle);
      } else {
        container.insertBefore(welcomeElement, container.firstChild);
      }
    }

    // Update content
    welcomeElement.innerHTML =
      '<span class="welcome-text">Hola, <strong>' +
      user.nombre +
      "</strong></span>" +
      '<button class="btn-logout" id="btn-logout">Cerrar sesión</button>';

    // Hide login/register buttons
    if (btnLogin) btnLogin.style.display = "none";
    if (btnSignup) btnSignup.style.display = "none";
  }

  // UI when NOT logged in
  function updateLoggedOutUI(container) {
    // Find and remove welcome element if exists
    var welcomeElement = container.querySelector(".user-welcome");
    if (welcomeElement) {
      welcomeElement.remove();
    }

    // Show login/register buttons
    var btnLogin = container.querySelector(".btn-login");
    var btnSignup = container.querySelector(".btn-signup");

    if (btnLogin) btnLogin.style.display = "";
    if (btnSignup) btnSignup.style.display = "";
  }

  // Setup logout button
  function setupLogoutButton() {
    // Use event delegation for logout button
    document.addEventListener("click", function (e) {
      if (e.target && e.target.id === "btn-logout") {
        e.preventDefault();

        if (confirm("¿Seguro que quieres cerrar sesión?")) {
          AuthSystem.logout();
          alert("Sesión cerrada correctamente");
          // Reload page to update UI
          window.location.reload();
        }
      }
    });
  }

  // Protect private pages (mi-cuenta)
  function protectPrivatePages() {
    // List of pages that require authentication
    var privatePaths = ["mi-cuenta.html"];
    var currentPage = window.location.pathname.split("/").pop();

    // If on private page and no session
    if (privatePaths.indexOf(currentPage) !== -1 && !AuthSystem.isLoggedIn()) {
      alert("Debes iniciar sesión para acceder a esta página");
      window.location.href = "login.html";
    }
  }
})();
