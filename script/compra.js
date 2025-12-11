// Script para la página de compra

document.addEventListener('DOMContentLoaded', function () {
    // Funcionalidad del botón de volver
    const backButton = document.querySelector('.back-link');

    if (backButton) {
        backButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevenir comportamiento por defecto del enlace
            window.history.back(); // Volver a la página anterior
        });
    }

    // Leer parámetros de URL y rellenar el formulario
    const urlParams = new URLSearchParams(window.location.search);
    const destino = urlParams.get('destino');
    const pais = urlParams.get('pais');
    const precio = urlParams.get('precio');

    if (destino && pais) {
        // Rellenar campo de destino
        const destinoInput = document.querySelector('input[value="Bangkok, Tailandia"]');
        if (destinoInput) {
            destinoInput.value = `${destino}, ${pais}`;
        }

        // Opcional: Mostrar el precio en algún lugar del formulario
        // Por ahora, el precio se puede usar para cálculos futuros
        console.log(`Viaje seleccionado: ${destino}, ${pais} - €${precio}`);
    }
});

// Toggle functionality for conditional sections
document.addEventListener('DOMContentLoaded', function() {
  // Alergias
  var checkAllergies = document.getElementById('check-allergies');
  var allergiesDetails = document.getElementById('allergies-details');
  if (checkAllergies && allergiesDetails) {
    checkAllergies.addEventListener('change', function() {
      allergiesDetails.style.display = this.checked ? 'block' : 'none';
    });
  }

  // Acompañantes
  var checkCompanions = document.getElementById('check-companions');
  var companionsDetails = document.getElementById('companions-details');
  if (checkCompanions && companionsDetails) {
    checkCompanions.addEventListener('change', function() {
      companionsDetails.style.display = this.checked ? 'block' : 'none';
    });
  }

  // Mascotas
  var checkPets = document.getElementById('check-pets');
  var petsDetails = document.getElementById('pets-details');
  if (checkPets && petsDetails) {
    checkPets.addEventListener('change', function() {
      petsDetails.style.display = this.checked ? 'block' : 'none';
    });
  }
});
