// script/compra-handler.js
// Autocomplete user data in purchase page

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // Get current user
    var currentUser = AuthSystem.getCurrentUser();

    // Only autocomplete if user is logged in
    if (!currentUser) {
      return;
    }

    // Autocomplete fields with user data
    var nombreInput = document.getElementById("compra-nombre");
    if (nombreInput && currentUser.nombre) {
      nombreInput.value = currentUser.nombre;
    }

    var apellidosInput = document.getElementById("compra-apellidos");
    if (apellidosInput && currentUser.apellidos) {
      apellidosInput.value = currentUser.apellidos;
    }

    var emailInput = document.getElementById("compra-email");
    if (emailInput && currentUser.email) {
      emailInput.value = currentUser.email;
    }

    var telefonoInput = document.getElementById("compra-telefono");
    if (telefonoInput && currentUser.telefono) {
      telefonoInput.value = currentUser.telefono;
    }

    // Handle payment button
    var payButton = document.getElementById("btn-pay");
    if (payButton) {
      payButton.addEventListener("click", function () {
        // Validate form data
        var nombre = document.getElementById("compra-nombre").value;
        var apellidos = document.getElementById("compra-apellidos").value;
        var email = document.getElementById("compra-email").value;
        var telefono = document.getElementById("compra-telefono").value;

        if (!nombre || !apellidos || !email || !telefono) {
          alert("Por favor, completa todos los campos obligatorios.");
          return;
        }

        // Simulate payment
        alert("Pago realizado con éxito. ¡Gracias por tu compra!");
      });
    }
  });
})();
