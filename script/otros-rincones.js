/* script/otros-rincones.js */

document.addEventListener("DOMContentLoaded", () => {
  // State variables
  let allCities = [];
  let currentCities = [];
  let itemsToShow = 8;

  // DOM references
  const gridContainer = document.getElementById("destinations-grid");
  const loadMoreBtn = document.getElementById("btn-load-more");
  const filterButtons = document.querySelectorAll(".filter-chip");

  // 1. LOAD JSON DATA
  fetch("ciudades-del-mundo.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el JSON");
      }
      return response.json();
    })
    .then((data) => {
      // JSON is nested, need to flatten it
      allCities = flattenData(data);

      // Initially show all
      currentCities = allCities;
      renderGrid();
    })
    .catch((error) => console.error("Error:", error));

  // 2. FLATTEN JSON FUNCTION
  function flattenData(data) {
    const citiesArray = [];

    // Loop continents
    data.continents.forEach((continent) => {
      // Loop countries
      continent.countries.forEach((country) => {
        // Loop cities
        country.cities.forEach((city) => {
          // Create new object with all needed data
          citiesArray.push({
            name: city.name,
            description: city.description,
            image: city.image.url,
            country: country.name,
            continent: continent.name,
            price: city.price,
          });
        });
      });
    });

    return citiesArray;
  }

  // 3. RENDER CARDS FUNCTION
  function renderGrid() {
    // Clear current grid
    gridContainer.innerHTML = "";

    // Get visible cities based on limit (pagination)
    const visibleCities = currentCities.slice(0, itemsToShow);

    // Generate HTML for each card
    visibleCities.forEach((city) => {
      const cardHTML = `
                <article class="card">
                    <div class="card-img-container">
                        <img src="${city.image}" class="card-img" alt="${city.name}">
                    </div>
                    <div class="card-content">
                        <span class="card-tag">${city.country}</span>
                        <h3 class="card-title">${city.name}</h3>
                        <p class="card-desc">${city.description}</p>
                        <div class="card-footer">
                            <span class="card-price">€${city.price}</span>
                            <button class="btn-buy" data-i18n="destinos.btn-buy" data-city="${city.name}" data-country="${city.country}" data-price="${city.price}">Comprar</button>
                        </div>
                    </div>
                </article>
            `;
      // Insert HTML in grid
      gridContainer.insertAdjacentHTML("beforeend", cardHTML);
    });

    // Add event listeners to buy buttons
    const buyButtons = gridContainer.querySelectorAll(".btn-buy");
    buyButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const city = e.target.getAttribute("data-city");
        const country = e.target.getAttribute("data-country");
        const price = e.target.getAttribute("data-price");

        // Navigate to purchase page with params
        window.location.href = `compra.html?destino=${encodeURIComponent(
          city
        )}&pais=${encodeURIComponent(country)}&precio=${price}`;
      });
    });

    // Re-apply translations to new buttons
    if (typeof translatePage === "function") {
      const currentLang = localStorage.getItem("language") || "es";
      translatePage(currentLang);
    }

    // Load more button logic
    // If showing all, hide button
    if (visibleCities.length >= currentCities.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-block";
    }
  }

  // 4. FILTERS LOGIC
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Handle active class
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.getAttribute("data-category");

      // Reset counter when changing filter
      itemsToShow = 8;

      if (category === "all") {
        currentCities = allCities;
      } else {
        // Filter by continent property we added when flattening
        currentCities = allCities.filter((city) => city.continent === category);
      }

      renderGrid();
    });
  });

  // 5. LOAD MORE BUTTON LOGIC
  loadMoreBtn.addEventListener("click", () => {
    itemsToShow += 4;
    renderGrid();
  });
});
