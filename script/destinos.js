// Script para la página de destinos

document.addEventListener('DOMContentLoaded', function () {
    // Obtener todos los botones de compra
    const buyButtons = document.querySelectorAll('.btn-buy');

    buyButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Prevenir navegación directa

            // Obtener datos de la tarjeta (card)
            const card = this.closest('.rich-card');
            const destino = card.querySelector('.location-row').textContent.replace('📍', '').trim();
            const region = card.querySelector('h2').textContent.trim();
            const precio = card.querySelector('.price-value').textContent.replace('€', '').trim();

            // Navegar a compra.html con parámetros
            window.location.href = `compra.html?destino=${encodeURIComponent(destino)}&pais=${encodeURIComponent(region)}&precio=${precio}`;
        });
    });
});
