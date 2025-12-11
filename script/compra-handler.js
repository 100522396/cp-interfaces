// script/compra-handler.js
// Autocompleta los datos del usuario en la página de compra

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // Obtener usuario actual
    var currentUser = AuthSystem.getCurrentUser();
    
    // Solo autocompletar si hay usuario logueado
    if (!currentUser) {
      return; // No hay usuario, dejar campos vacíos
    }

    // Autocompletar campos con datos del usuario
    var nombreInput = document.getElementById('compra-nombre');
    if (nombreInput && currentUser.nombre) {
      nombreInput.value = currentUser.nombre;
    }

    var apellidosInput = document.getElementById('compra-apellidos');
    if (apellidosInput && currentUser.apellidos) {
      apellidosInput.value = currentUser.apellidos;
    }

    var emailInput = document.getElementById('compra-email');
    if (emailInput && currentUser.email) {
      emailInput.value = currentUser.email;
    }

    var telefonoInput = document.getElementById('compra-telefono');
    if (telefonoInput && currentUser.telefono) {
      telefonoInput.value = currentUser.telefono;
    }
  });
})();
