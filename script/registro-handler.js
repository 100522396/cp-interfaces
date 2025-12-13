// script/registro-handler.js
// Manejo del formulario de registro

(function () {
  "use strict";

  // Esperar a que el DOM esté listo
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector(".register-form");
    if (!form) return; // Si no estamos en la página de registro, salir

    // Elementos del formulario
    var nombreInput = document.getElementById("reg-nombre");
    var apellidosInput = document.getElementById("reg-apellidos");
    var emailInput = document.getElementById("reg-email");
    var telefonoInput = document.getElementById("reg-telefono");
    var passwordInput = document.getElementById("reg-password");
    var confirmPasswordInput = document.getElementById("reg-confirm-password");
    var termsCheckbox = document.getElementById("terms");
    var submitButton = form.querySelector('button[type="submit"]');

    // Ya no deshabilitamos el botón, la validación se hace al enviar el formulario

    // Manejo del envío del formulario
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // PRIMERO: Validar términos y condiciones
      if (termsCheckbox && !termsCheckbox.checked) {
        alert("Debes aceptar los términos y condiciones para crear tu cuenta");
        termsCheckbox.focus();
        return;
      }

      // Obtener valores
      var nombre = nombreInput ? nombreInput.value.trim() : "";
      var apellidos = apellidosInput ? apellidosInput.value.trim() : "";
      var email = emailInput ? emailInput.value.trim() : "";
      var telefono = telefonoInput ? telefonoInput.value.trim() : "";
      var password = passwordInput ? passwordInput.value : "";
      var confirmPassword = confirmPasswordInput
        ? confirmPasswordInput.value
        : "";

      // Validaciones básicas
      if (!nombre) {
        alert("Por favor, introduce tu nombre");
        if (nombreInput) nombreInput.focus();
        return;
      }

      if (!apellidos) {
        alert("Por favor, introduce tus apellidos");
        if (apellidosInput) apellidosInput.focus();
        return;
      }

      if (!email) {
        alert("Por favor, introduce tu email");
        if (emailInput) emailInput.focus();
        return;
      }

      if (!AuthSystem.isValidEmail(email)) {
        alert("Por favor, introduce un email válido");
        if (emailInput) emailInput.focus();
        return;
      }

      if (!password) {
        alert("Por favor, introduce una contraseña");
        if (passwordInput) passwordInput.focus();
        return;
      }

      if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        if (passwordInput) passwordInput.focus();
        return;
      }

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        if (confirmPasswordInput) confirmPasswordInput.focus();
        return;
      }

      // Obtener avatar
      var avatarInput = document.getElementById("reg-avatar");
      var avatarFile =
        avatarInput && avatarInput.files && avatarInput.files.length > 0
          ? avatarInput.files[0]
          : null;

      // Validar avatar (opcional pero recomendado)
      if (avatarFile) {
        var validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (validTypes.indexOf(avatarFile.type) === -1) {
          alert("Por favor, sube una imagen en formato JPG, PNG o WEBP");
          return;
        }

        // Limite de tamaño: 5MB
        if (avatarFile.size > 5 * 1024 * 1024) {
          alert("La imagen es demasiado grande. Máximo 5MB");
          return;
        }
      }

      // Función para registrar con o sin avatar
      function performRegistration(avatarDataUrl) {
        var result = AuthSystem.registerUser({
          email: email,
          password: password,
          nombre: nombre,
          apellidos: apellidos,
          telefono: telefono,
          avatarDataUrl: avatarDataUrl || null,
        });

        if (result.success) {
          alert("¡Registro exitoso! Bienvenido/a " + nombre);
          window.location.href = "index.html";
        } else {
          alert("Error en el registro: " + result.error);
        }
      }

      // Si hay avatar, convertir a base64 primero
      if (avatarFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
          performRegistration(e.target.result);
        };
        reader.onerror = function () {
          alert("Error al leer la imagen. Inténtalo de nuevo");
        };
        reader.readAsDataURL(avatarFile);
      } else {
        // Sin avatar, registrar directamente
        performRegistration(null);
      }
    });
  });
})();
