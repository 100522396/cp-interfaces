// script/comunidad-handler.js
// Community comments system with likes
// Uses localStorage for data

(function () {
  "use strict";

  // LocalStorage key
  var COMENTARIOS_KEY = "comunidadComentarios";

  // DOM elements
  var mensajeLogin;
  var nuevoComentarioSection;
  var listaComentarios;
  var sinComentarios;
  var comentarioTexto;
  var btnPublicar;
  var usuarioAvatar;

  // Init when DOM ready
  document.addEventListener("DOMContentLoaded", function () {
    // Get element references
    mensajeLogin = document.getElementById("mensaje-login");
    nuevoComentarioSection = document.getElementById(
      "nuevo-comentario-section"
    );
    listaComentarios = document.getElementById("lista-comentarios");
    sinComentarios = document.getElementById("sin-comentarios");
    comentarioTexto = document.getElementById("comentario-texto");
    btnPublicar = document.getElementById("btn-publicar");
    usuarioAvatar = document.getElementById("usuario-avatar");

    // Check we are on the right page
    if (!listaComentarios) {
      return;
    }

    // Setup UI based on session
    configurarUI();

    // Load and show comments
    renderizarComentarios();

    // Setup events
    if (btnPublicar) {
      btnPublicar.addEventListener("click", publicarComentario);
    }
  });

  // Setup UI based on login status
  function configurarUI() {
    var currentUser = AuthSystem.getCurrentUser();

    if (currentUser) {
      // Logged in - show form
      if (nuevoComentarioSection) {
        nuevoComentarioSection.style.display = "block";
      }
      if (mensajeLogin) {
        mensajeLogin.style.display = "none";
      }

      // Show user avatar if available
      if (usuarioAvatar && currentUser.avatarDataUrl) {
        usuarioAvatar.innerHTML =
          '<img src="' + currentUser.avatarDataUrl + '" alt="Avatar">';
      }
    } else {
      // Not logged in - show message
      if (nuevoComentarioSection) {
        nuevoComentarioSection.style.display = "none";
      }
      if (mensajeLogin) {
        mensajeLogin.style.display = "block";
      }
    }
  }

  // Get comments from localStorage
  function obtenerComentarios() {
    try {
      var data = localStorage.getItem(COMENTARIOS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading comments:", e);
      return [];
    }
  }

  // Save comments to localStorage
  function guardarComentarios(comentarios) {
    try {
      localStorage.setItem(COMENTARIOS_KEY, JSON.stringify(comentarios));
      return true;
    } catch (e) {
      console.error("Error saving comments:", e);
      return false;
    }
  }

  // Generate unique ID
  function generarId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Format date readable
  function formatearFecha(fechaISO) {
    var fecha = new Date(fechaISO);
    var ahora = new Date();
    var diff = ahora - fecha;

    // Less than 1 minute
    if (diff < 60000) {
      return "Hace un momento";
    }
    // Less than 1 hour
    if (diff < 3600000) {
      var minutos = Math.floor(diff / 60000);
      return "Hace " + minutos + (minutos === 1 ? " minuto" : " minutos");
    }
    // Less than 24 hours
    if (diff < 86400000) {
      var horas = Math.floor(diff / 3600000);
      return "Hace " + horas + (horas === 1 ? " hora" : " horas");
    }
    // Less than 7 days
    if (diff < 604800000) {
      var dias = Math.floor(diff / 86400000);
      return "Hace " + dias + (dias === 1 ? " día" : " días");
    }
    // More than 7 days - show date
    var opciones = { day: "numeric", month: "long", year: "numeric" };
    return fecha.toLocaleDateString("es-ES", opciones);
  }

  // Publish new comment
  function publicarComentario() {
    var currentUser = AuthSystem.getCurrentUser();

    // Check user is logged in
    if (!currentUser) {
      alert("Debes iniciar sesión para publicar comentarios");
      return;
    }

    // Get comment text
    var texto = comentarioTexto.value.trim();

    // Validate not empty
    if (texto === "") {
      alert("Por favor, escribe algo antes de publicar");
      comentarioTexto.focus();
      return;
    }

    // Create new comment
    var nuevoComentario = {
      id: generarId(),
      email: currentUser.email,
      nombre: currentUser.nombre || "Usuario",
      apellidos: currentUser.apellidos || "",
      avatarDataUrl: currentUser.avatarDataUrl || null,
      texto: texto,
      fecha: new Date().toISOString(),
      likes: [],
    };

    // Get existing comments and add new one
    var comentarios = obtenerComentarios();
    comentarios.push(nuevoComentario);

    // Save to localStorage
    if (guardarComentarios(comentarios)) {
      // Clear textarea
      comentarioTexto.value = "";

      // Render updated comments
      renderizarComentarios();
    } else {
      alert("Error al guardar el comentario. Inténtalo de nuevo.");
    }
  }

  // Toggle like on comment
  function toggleLike(comentarioId) {
    var currentUser = AuthSystem.getCurrentUser();

    // Check user is logged in
    if (!currentUser) {
      alert("Debes iniciar sesión para dar likes");
      return;
    }

    var comentarios = obtenerComentarios();
    var userEmail = currentUser.email;

    // Find the comment
    for (var i = 0; i < comentarios.length; i++) {
      if (comentarios[i].id === comentarioId) {
        var likes = comentarios[i].likes;
        var indexLike = likes.indexOf(userEmail);

        if (indexLike === -1) {
          // Has not liked - add
          likes.push(userEmail);
        } else {
          // Already liked - remove
          likes.splice(indexLike, 1);
        }

        // Save and render
        guardarComentarios(comentarios);
        renderizarComentarios();
        return;
      }
    }
  }

  // Sort comments by likes (most likes first)
  function ordenarPorLikes(comentarios) {
    return comentarios.sort(function (a, b) {
      return b.likes.length - a.likes.length;
    });
  }

  // Render all comments
  function renderizarComentarios() {
    var comentarios = obtenerComentarios();
    var currentUser = AuthSystem.getCurrentUser();
    var userEmail = currentUser ? currentUser.email : null;

    // Sort by likes
    comentarios = ordenarPorLikes(comentarios);

    // Clear list (except no comments message)
    var cards = listaComentarios.querySelectorAll(".comentario-card");
    for (var i = 0; i < cards.length; i++) {
      cards[i].remove();
    }

    // Show message if no comments
    if (comentarios.length === 0) {
      sinComentarios.style.display = "block";
      return;
    }

    // Hide no comments message
    sinComentarios.style.display = "none";

    // Create card for each comment
    for (var j = 0; j < comentarios.length; j++) {
      var com = comentarios[j];
      var card = crearComentarioCard(com, userEmail);
      listaComentarios.appendChild(card);
    }
  }

  // Create HTML element for comment
  function crearComentarioCard(comentario, userEmail) {
    var card = document.createElement("div");
    card.className = "comentario-card";
    card.setAttribute("data-id", comentario.id);

    // Check if current user has liked
    var hasDadoLike = userEmail && comentario.likes.indexOf(userEmail) !== -1;
    var likeClass = hasDadoLike ? "btn-like liked" : "btn-like";
    var likeIcon = hasDadoLike ? "❤️" : "🤍";

    // Create avatar
    var avatarHTML;
    if (comentario.avatarDataUrl) {
      avatarHTML = '<img src="' + comentario.avatarDataUrl + '" alt="Avatar">';
    } else {
      avatarHTML = '<span class="comentario-avatar-placeholder">👤</span>';
    }

    // Full name
    var nombreCompleto = comentario.nombre;
    if (comentario.apellidos) {
      nombreCompleto += " " + comentario.apellidos;
    }

    // Comment HTML
    card.innerHTML =
      '<div class="comentario-header">' +
      '<div class="comentario-avatar">' +
      avatarHTML +
      "</div>" +
      '<div class="comentario-info">' +
      '<span class="comentario-nombre">' +
      nombreCompleto +
      "</span>" +
      '<span class="comentario-fecha">' +
      formatearFecha(comentario.fecha) +
      "</span>" +
      "</div>" +
      "</div>" +
      '<p class="comentario-texto">' +
      comentario.texto +
      "</p>" +
      '<div class="comentario-footer">' +
      '<button class="' +
      likeClass +
      '" data-id="' +
      comentario.id +
      '">' +
      '<span class="like-icon">' +
      likeIcon +
      "</span>" +
      '<span class="like-count">' +
      comentario.likes.length +
      "</span>" +
      "</button>" +
      "</div>";

    // Add click event to like button
    var btnLike = card.querySelector(".btn-like");
    btnLike.addEventListener("click", function () {
      toggleLike(comentario.id);
    });

    return card;
  }
})();
