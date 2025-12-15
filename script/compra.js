// Purchase page script

document.addEventListener("DOMContentLoaded", function () {
  // Back button functionality
  const backButton = document.querySelector(".back-link");

  if (backButton) {
    backButton.addEventListener("click", function (event) {
      event.preventDefault();
      window.history.back();
    });
  }

  // Read URL params and fill form
  const urlParams = new URLSearchParams(window.location.search);
  const destino = urlParams.get("destino");
  const pais = urlParams.get("pais");
  const precio = urlParams.get("precio");

  if (destino && pais) {
    // Fill destination field
    const destinoInput = document.querySelector(
      'input[value="Bangkok, Tailandia"]'
    );
    if (destinoInput) {
      destinoInput.value = `${destino}, ${pais}`;
    }

    // Log the selected trip
    console.log(`Viaje seleccionado: ${destino}, ${pais} - €${precio}`);
  }
});

// Toggle for conditional sections
document.addEventListener("DOMContentLoaded", function () {
  // Allergies
  var checkAllergies = document.getElementById("check-allergies");
  var allergiesDetails = document.getElementById("allergies-details");
  if (checkAllergies && allergiesDetails) {
    checkAllergies.addEventListener("change", function () {
      allergiesDetails.style.display = this.checked ? "block" : "none";
    });
  }

  // Companions
  var checkCompanions = document.getElementById("check-companions");
  var companionsDetails = document.getElementById("companions-details");
  if (checkCompanions && companionsDetails) {
    checkCompanions.addEventListener("change", function () {
      companionsDetails.style.display = this.checked ? "block" : "none";
    });
  }

  // Pets
  var checkPets = document.getElementById("check-pets");
  var petsDetails = document.getElementById("pets-details");
  if (checkPets && petsDetails) {
    checkPets.addEventListener("change", function () {
      petsDetails.style.display = this.checked ? "block" : "none";
    });
  }

  // Dynamic companions forms
  var numCompanionsInput = document.getElementById("num-companions");
  var companionsFormsContainer = document.getElementById(
    "companions-forms-container"
  );

  if (numCompanionsInput && companionsFormsContainer) {
    numCompanionsInput.addEventListener("input", function () {
      companionsFormsContainer.innerHTML = "";
      var numCompanions = parseInt(this.value, 10);

      if (!isNaN(numCompanions) && numCompanions > 0) {
        for (var i = 1; i <= numCompanions; i++) {
          var nameGroup = document.createElement("div");
          nameGroup.className = "form-group";
          nameGroup.innerHTML = `
            <label>Nombre del acompañante ${i}</label>
            <input type="text" class="input-bg" />
          `;

          var surnameGroup = document.createElement("div");
          surnameGroup.className = "form-group";
          surnameGroup.innerHTML = `
            <label>Apellido del acompañante ${i}</label>
            <input type="text" class="input-bg" />
          `;

          companionsFormsContainer.appendChild(nameGroup);
          companionsFormsContainer.appendChild(surnameGroup);
        }
      }
    });
  }

  // Dynamic pets forms
  var numPetsInput = document.getElementById("num-pets");
  var petsFormsContainer = document.getElementById("pets-forms-container");

  if (numPetsInput && petsFormsContainer) {
    numPetsInput.addEventListener("input", function () {
      petsFormsContainer.innerHTML = "";
      var numPets = parseInt(this.value, 10);

      if (!isNaN(numPets) && numPets > 0) {
        for (var i = 1; i <= numPets; i++) {
          var petGroup = document.createElement("div");
          petGroup.className = "form-group";
          petGroup.innerHTML = `
            <label>Tipo de mascota ${i}</label>
            <select class="input-bg">
              <option value="">Selecciona...</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Otro</option>
            </select>
          `;

          petsFormsContainer.appendChild(petGroup);
        }
      }
    });
  }
});
