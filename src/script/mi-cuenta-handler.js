// script/mi-cuenta-handler.js
// Updates the account page with logged in user data

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // Get current user
    var currentUser = AuthSystem.getCurrentUser();

    if (!currentUser) {
      // If no user, redirect to login
      window.location.href = "login.html";
      return;
    }

    // Update profile avatar
    var profileAvatar = document.getElementById("profile-avatar");
    if (profileAvatar && currentUser.avatarDataUrl) {
      profileAvatar.src = currentUser.avatarDataUrl;
    }

    // Update full name
    var profileName = document.getElementById("profile-name");
    if (profileName) {
      var nombreCompleto = currentUser.nombre + " " + currentUser.apellidos;
      profileName.textContent = nombreCompleto;
    }

    // Update email
    var profileEmail = document.getElementById("profile-email");
    if (profileEmail) {
      profileEmail.textContent = currentUser.email;
    }

    // Update details section
    var detailNombre = document.getElementById("detail-nombre");
    if (detailNombre) {
      detailNombre.textContent =
        currentUser.nombre + " " + currentUser.apellidos;
    }

    var detailEmail = document.getElementById("detail-email");
    if (detailEmail) {
      detailEmail.textContent = currentUser.email;
    }

    var detailTelefono = document.getElementById("detail-telefono");
    if (detailTelefono) {
      detailTelefono.textContent = currentUser.telefono || "No especificado";
    }

    // Avatar change functionality

    var btnEditAvatar = document.getElementById("btn-edit-avatar");
    var avatarFileInput = document.getElementById("avatar-file-input");
    var profileAvatar = document.getElementById("profile-avatar");

    // Click button to open file selector
    if (btnEditAvatar && avatarFileInput) {
      btnEditAvatar.addEventListener("click", function (e) {
        e.preventDefault();
        avatarFileInput.click();
      });
    }

    // When file selected, update avatar
    if (avatarFileInput && profileAvatar) {
      avatarFileInput.addEventListener("change", function () {
        var file = this.files[0];

        if (!file) return;

        // Validate file type
        var validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (validTypes.indexOf(file.type) === -1) {
          alert("Por favor, sube una imagen en formato JPG, PNG o WEBP");
          return;
        }

        // Validate size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert("La imagen es demasiado grande. Máximo 5MB");
          return;
        }

        // Read file and convert to base64
        var reader = new FileReader();
        reader.onload = function (e) {
          var newAvatarUrl = e.target.result;

          // Update image on page
          profileAvatar.src = newAvatarUrl;

          // Save to localStorage
          // 1. Update currentUser
          currentUser.avatarDataUrl = newAvatarUrl;
          AuthSystem.setCurrentUser(currentUser);

          // 2. Update in users array
          var users = AuthSystem.getUsers();
          for (var i = 0; i < users.length; i++) {
            if (users[i].email === currentUser.email) {
              users[i].avatarDataUrl = newAvatarUrl;
              break;
            }
          }
          AuthSystem.setUsers(users);

          alert("¡Foto de perfil actualizada correctamente!");
        };

        reader.onerror = function () {
          alert("Error al leer la imagen. Inténtalo de nuevo");
        };

        reader.readAsDataURL(file);
      });
    }
  });
})();
