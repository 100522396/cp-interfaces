// Destinations page script

document.addEventListener("DOMContentLoaded", function () {
  // Get all buy buttons
  const buyButtons = document.querySelectorAll(".btn-buy");

  buyButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      // Get card data
      const card = this.closest(".rich-card");
      const destino = card
        .querySelector(".location-row")
        .textContent.replace("📍", "")
        .trim();
      const region = card.querySelector("h2").textContent.trim();
      const precio = card
        .querySelector(".price-value")
        .textContent.replace("€", "")
        .trim();

      // Navigate to purchase page with params
      window.location.href = `compra.html?destino=${encodeURIComponent(
        destino
      )}&pais=${encodeURIComponent(region)}&precio=${precio}`;
    });
  });
});
