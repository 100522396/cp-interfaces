// script/mi-cuenta-handler.js
// Actualiza la página de Mi Cuenta con los datos del usuario logueado

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // Obtener usuario actual
    var currentUser = AuthSystem.getCurrentUser();
    
    if (!currentUser) {
      // Si no hay usuario, la protección del session-manager debería redirigir
      // pero por si acaso, redirigimos aquí también
      window.location.href = 'login.html';
      return;
    }

    // Actualizar avatar en el header del perfil
    var profileAvatar = document.getElementById('profile-avatar');
    if (profileAvatar && currentUser.avatarDataUrl) {
      profileAvatar.src = currentUser.avatarDataUrl;
    }

    // Actualizar nombre completo en el header
    var profileName = document.getElementById('profile-name');
    if (profileName) {
      var nombreCompleto = currentUser.nombre + ' ' + currentUser.apellidos;
      profileName.textContent = nombreCompleto;
    }

    // Actualizar email en el header
    var profileEmail = document.getElementById('profile-email');
    if (profileEmail) {
      profileEmail.textContent = currentUser.email;
    }

    // Actualizar datos en la sección de detalles
    var detailNombre = document.getElementById('detail-nombre');
    if (detailNombre) {
      detailNombre.textContent = currentUser.nombre + ' ' + currentUser.apellidos;
    }

    var detailEmail = document.getElementById('detail-email');
    if (detailEmail) {
      detailEmail.textContent = currentUser.email;
    }

    var detailTelefono = document.getElementById('detail-telefono');
    if (detailTelefono) {
      detailTelefono.textContent = currentUser.telefono || 'No especificado';
    }

    // ===== FUNCIONALIDAD DE CAMBIO DE AVATAR =====
    
    var btnEditAvatar = document.getElementById('btn-edit-avatar');
    var avatarFileInput = document.getElementById('avatar-file-input');
    var profileAvatar = document.getElementById('profile-avatar');

    // Al hacer clic en el botón, abrir selector de archivo
    if (btnEditAvatar && avatarFileInput) {
      btnEditAvatar.addEventListener('click', function(e) {
        e.preventDefault();
        avatarFileInput.click();
      });
    }

    // Al seleccionar un archivo, actualizar avatar
    if (avatarFileInput && profileAvatar) {
      avatarFileInput.addEventListener('change', function() {
        var file = this.files[0];
        
        if (!file) return;

        // Validar tipo de archivo
        var validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (validTypes.indexOf(file.type) === -1) {
          alert('Por favor, sube una imagen en formato JPG, PNG o WEBP');
          return;
        }

        // Validar tamaño (máx 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('La imagen es demasiado grande. Máximo 5MB');
          return;
        }

        // Leer el archivo y convertir a base64
        var reader = new FileReader();
        reader.onload = function(e) {
          var newAvatarUrl = e.target.result;
          
          // Actualizar imagen en la página
          profileAvatar.src = newAvatarUrl;
          
          // Guardar en localStorage
          // 1. Actualizar en currentUser
          currentUser.avatarDataUrl = newAvatarUrl;
          AuthSystem.setCurrentUser(currentUser);
          
          // 2. Actualizar en el array de usuarios
          var users = AuthSystem.getUsers();
          for (var i = 0; i < users.length; i++) {
            if (users[i].email === currentUser.email) {
              users[i].avatarDataUrl = newAvatarUrl;
              break;
            }
          }
          AuthSystem.setUsers(users);
          
          alert('¡Foto de perfil actualizada correctamente!');
        };
        
        reader.onerror = function() {
          alert('Error al leer la imagen. Inténtalo de nuevo');
        };
        
        reader.readAsDataURL(file);
      });
    }
  });
})();
