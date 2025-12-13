// script/session-manager.js
// Gestión de sesión global - se ejecuta en todas las páginas

(function () {
  "use strict";

  // Esperar a que el DOM esté listo
  document.addEventListener("DOMContentLoaded", function () {
    updateUIBasedOnSession();
    setupLogoutButton();
    protectPrivatePages();
  });

  // Actualizar la UI según el estado de sesión
  function updateUIBasedOnSession() {
    var currentUser = AuthSystem.getCurrentUser();
    var userControls = document.querySelector(".user-controls");

    if (!userControls) return;

    if (currentUser) {
      // Usuario logueado - mostrar nombre y botón de logout
      updateLoggedInUI(userControls, currentUser);
    } else {
      // Usuario no logueado - mostrar botones de Login/Registro
      updateLoggedOutUI(userControls);
    }
  }

  // UI cuando está logueado
  function updateLoggedInUI(container, user) {
    // Buscar botones de login/signup
    var btnLogin = container.querySelector(".btn-login");
    var btnSignup = container.querySelector(".btn-signup");

    // Crear elemento de bienvenida si no existe
    var welcomeElement = container.querySelector(".user-welcome");
    if (!welcomeElement) {
      welcomeElement = document.createElement("div");
      welcomeElement.className = "user-welcome";

      // Insertar antes del toggle de idioma
      var langToggle = container.querySelector(".lang-toggle");
      if (langToggle) {
        container.insertBefore(welcomeElement, langToggle);
      } else {
        container.insertBefore(welcomeElement, container.firstChild);
      }
    }

    // Actualizar contenido
    welcomeElement.innerHTML =
      '<span class="welcome-text">Hola, <strong>' +
      user.nombre +
      "</strong></span>" +
      '<button class="btn-logout" id="btn-logout">Cerrar sesión</button>';

    // Ocultar botones de login/registro
    if (btnLogin) btnLogin.style.display = "none";
    if (btnSignup) btnSignup.style.display = "none";
  }

  // UI cuando NO está logueado
  function updateLoggedOutUI(container) {
    // Buscar y eliminar elemento de bienvenida si existe
    var welcomeElement = container.querySelector(".user-welcome");
    if (welcomeElement) {
      welcomeElement.remove();
    }

    // Mostrar botones de login/registro
    var btnLogin = container.querySelector(".btn-login");
    var btnSignup = container.querySelector(".btn-signup");

    if (btnLogin) btnLogin.style.display = "";
    if (btnSignup) btnSignup.style.display = "";
  }

  // Configurar botón de logout
  function setupLogoutButton() {
    // Usar delegación de eventos para el botón de logout
    document.addEventListener("click", function (e) {
      if (e.target && e.target.id === "btn-logout") {
        e.preventDefault();

        if (confirm("¿Seguro que quieres cerrar sesión?")) {
          AuthSystem.logout();
          alert("Sesión cerrada correctamente");
          // Recargar la página para actualizar la UI
          window.location.reload();
        }
      }
    });
  }

  // Proteger páginas privadas (mi-cuenta)
  function protectPrivatePages() {
    // Lista de páginas que requieren autenticación
    var privatePaths = ["mi-cuenta.html"];
    var currentPage = window.location.pathname.split("/").pop();

    // Si estamos en una página privada y no hay sesión
    if (privatePaths.indexOf(currentPage) !== -1 && !AuthSystem.isLoggedIn()) {
      alert("Debes iniciar sesión para acceder a esta página");
      window.location.href = "login.html";
    }
  }
})();
