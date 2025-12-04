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
});
