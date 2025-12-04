/* script/otros-rincones.js */

document.addEventListener('DOMContentLoaded', () => {
    // Variables de estado
    let allCities = [];       // Aquí guardaremos todas las ciudades "aplanadas"
    let currentCities = [];   // Las ciudades que se muestran actualmente (filtradas)
    let itemsToShow = 8;      // Cuántas tarjetas mostramos inicialmente

    // Referencias al DOM (HTML)
    const gridContainer = document.getElementById('destinations-grid');
    const loadMoreBtn = document.getElementById('btn-load-more');
    const filterButtons = document.querySelectorAll('.filter-chip');

    // 1. CARGAR DATOS DEL JSON
    // Usamos fetch para leer el archivo que está en la misma carpeta 'src' (o relativo a ella)
    fetch('ciudades-del-mundo.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el JSON');
            }
            return response.json();
        })
        .then(data => {
            // El JSON viene anidado (Continente -> País -> Ciudad)
            // Necesitamos "aplanarlo" para tener una lista simple de ciudades
            allCities = flattenData(data);

            // Inicialmente mostramos todas
            currentCities = allCities;
            renderGrid();
        })
        .catch(error => console.error('Error:', error));


    // 2. FUNCIÓN PARA APLANAR EL JSON (Helper)
    // Transforma la estructura compleja en un array simple de objetos ciudad
    function flattenData(data) {
        const citiesArray = [];

        // Recorremos continentes
        data.continents.forEach(continent => {
            // Recorremos países
            continent.countries.forEach(country => {
                // Recorremos ciudades
                country.cities.forEach(city => {
                    // Creamos un objeto nuevo con todo lo necesario
                    citiesArray.push({
                        name: city.name,
                        description: city.description,
                        image: city.image.url, // URL de la imagen
                        country: country.name, // Añadimos el país
                        continent: continent.name, // Añadimos el continente para filtrar
                        price: city.price // Añadimos el precio
                    });
                });
            });
        });

        return citiesArray;
    }

    // 3. FUNCIÓN PARA PINTAR LAS TARJETAS (Render)
    function renderGrid() {
        // Limpiamos el grid actual
        gridContainer.innerHTML = '';

        // Cogemos solo las que toquen según el límite (paginación)
        const visibleCities = currentCities.slice(0, itemsToShow);

        // Generamos el HTML de cada tarjeta
        visibleCities.forEach(city => {
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
                            <button class="btn-buy" data-city="${city.name}" data-country="${city.country}" data-price="${city.price}">Comprar</button>
                        </div>
                    </div>
                </article>
            `;
            // Insertamos el HTML en el grid
            gridContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Agregar event listeners a los botones de compra
        const buyButtons = gridContainer.querySelectorAll('.btn-buy');
        buyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const city = e.target.getAttribute('data-city');
                const country = e.target.getAttribute('data-country');
                const price = e.target.getAttribute('data-price');

                // Navegar a compra.html con parámetros
                window.location.href = `compra.html?destino=${encodeURIComponent(city)}&pais=${encodeURIComponent(country)}&precio=${price}`;
            });
        });

        // Lógica del botón "Cargar más"
        // Si mostramos todas las que hay, ocultamos el botón
        if (visibleCities.length >= currentCities.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    // 4. LÓGICA DE LOS FILTROS
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Gestión visual de la clase 'active'
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Reiniciamos el contador de "ver más" al cambiar de filtro
            itemsToShow = 8;

            if (category === 'all') {
                currentCities = allCities;
            } else {
                // Filtramos por la propiedad 'continent' que añadimos al aplanar
                currentCities = allCities.filter(city => city.continent === category);
            }

            renderGrid();
        });
    });

    // 5. LÓGICA DEL BOTÓN CARGAR MÁS
    loadMoreBtn.addEventListener('click', () => {
        itemsToShow += 4; // Mostramos 4 más
        renderGrid();     // Volvemos a pintar
    });
});