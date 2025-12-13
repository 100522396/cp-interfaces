// script/comunidad-handler.js
// Sistema de comentarios con likes para la comunidad
// Usa localStorage para persistencia

(function () {
  "use strict";

  // Clave para localStorage
  var COMENTARIOS_KEY = "comunidadComentarios";

  // Elementos del DOM
  var mensajeLogin;
  var nuevoComentarioSection;
  var listaComentarios;
  var sinComentarios;
  var comentarioTexto;
  var btnPublicar;
  var usuarioAvatar;

  // Inicializar cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencias a elementos
    mensajeLogin = document.getElementById("mensaje-login");
    nuevoComentarioSection = document.getElementById(
      "nuevo-comentario-section"
    );
    listaComentarios = document.getElementById("lista-comentarios");
    sinComentarios = document.getElementById("sin-comentarios");
    comentarioTexto = document.getElementById("comentario-texto");
    btnPublicar = document.getElementById("btn-publicar");
    usuarioAvatar = document.getElementById("usuario-avatar");

    // Verificar que estamos en la página correcta
    if (!listaComentarios) {
      return;
    }

    // Configurar UI según estado de sesión
    configurarUI();

    // Cargar y mostrar comentarios
    renderizarComentarios();

    // Configurar eventos
    if (btnPublicar) {
      btnPublicar.addEventListener("click", publicarComentario);
    }
  });

  // Configurar UI según si el usuario está logueado o no
  function configurarUI() {
    var currentUser = AuthSystem.getCurrentUser();

    if (currentUser) {
      // Usuario logueado - mostrar formulario
      if (nuevoComentarioSection) {
        nuevoComentarioSection.style.display = "block";
      }
      if (mensajeLogin) {
        mensajeLogin.style.display = "none";
      }

      // Mostrar avatar del usuario si tiene
      if (usuarioAvatar && currentUser.avatarDataUrl) {
        usuarioAvatar.innerHTML =
          '<img src="' + currentUser.avatarDataUrl + '" alt="Avatar">';
      }
    } else {
      // Usuario no logueado - mostrar mensaje
      if (nuevoComentarioSection) {
        nuevoComentarioSection.style.display = "none";
      }
      if (mensajeLogin) {
        mensajeLogin.style.display = "block";
      }
    }
  }

  // Obtener comentarios de localStorage
  function obtenerComentarios() {
    try {
      var data = localStorage.getItem(COMENTARIOS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error al leer comentarios:", e);
      return [];
    }
  }

  // Guardar comentarios en localStorage
  function guardarComentarios(comentarios) {
    try {
      localStorage.setItem(COMENTARIOS_KEY, JSON.stringify(comentarios));
      return true;
    } catch (e) {
      console.error("Error al guardar comentarios:", e);
      return false;
    }
  }

  // Generar ID único simple
  function generarId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Formatear fecha de forma legible
  function formatearFecha(fechaISO) {
    var fecha = new Date(fechaISO);
    var ahora = new Date();
    var diff = ahora - fecha;

    // Menos de 1 minuto
    if (diff < 60000) {
      return "Hace un momento";
    }
    // Menos de 1 hora
    if (diff < 3600000) {
      var minutos = Math.floor(diff / 60000);
      return "Hace " + minutos + (minutos === 1 ? " minuto" : " minutos");
    }
    // Menos de 24 horas
    if (diff < 86400000) {
      var horas = Math.floor(diff / 3600000);
      return "Hace " + horas + (horas === 1 ? " hora" : " horas");
    }
    // Menos de 7 días
    if (diff < 604800000) {
      var dias = Math.floor(diff / 86400000);
      return "Hace " + dias + (dias === 1 ? " día" : " días");
    }
    // Más de 7 días - mostrar fecha
    var opciones = { day: "numeric", month: "long", year: "numeric" };
    return fecha.toLocaleDateString("es-ES", opciones);
  }

  // Publicar nuevo comentario
  function publicarComentario() {
    var currentUser = AuthSystem.getCurrentUser();

    // Verificar que hay usuario logueado
    if (!currentUser) {
      alert("Debes iniciar sesión para publicar comentarios");
      return;
    }

    // Obtener texto del comentario
    var texto = comentarioTexto.value.trim();

    // Validar que no esté vacío
    if (texto === "") {
      alert("Por favor, escribe algo antes de publicar");
      comentarioTexto.focus();
      return;
    }

    // Crear nuevo comentario
    var nuevoComentario = {
      id: generarId(),
      email: currentUser.email,
      nombre: currentUser.nombre || "Usuario",
      apellidos: currentUser.apellidos || "",
      avatarDataUrl: currentUser.avatarDataUrl || null,
      texto: texto,
      fecha: new Date().toISOString(),
      likes: [], // Array de emails que han dado like
    };

    // Obtener comentarios existentes y añadir el nuevo
    var comentarios = obtenerComentarios();
    comentarios.push(nuevoComentario);

    // Guardar en localStorage
    if (guardarComentarios(comentarios)) {
      // Limpiar textarea
      comentarioTexto.value = "";

      // Renderizar comentarios actualizados
      renderizarComentarios();
    } else {
      alert("Error al guardar el comentario. Inténtalo de nuevo.");
    }
  }

  // Dar o quitar like a un comentario
  function toggleLike(comentarioId) {
    var currentUser = AuthSystem.getCurrentUser();

    // Verificar que hay usuario logueado
    if (!currentUser) {
      alert("Debes iniciar sesión para dar likes");
      return;
    }

    var comentarios = obtenerComentarios();
    var userEmail = currentUser.email;

    // Buscar el comentario
    for (var i = 0; i < comentarios.length; i++) {
      if (comentarios[i].id === comentarioId) {
        var likes = comentarios[i].likes;
        var indexLike = likes.indexOf(userEmail);

        if (indexLike === -1) {
          // No ha dado like - añadir
          likes.push(userEmail);
        } else {
          // Ya ha dado like - quitar
          likes.splice(indexLike, 1);
        }

        // Guardar y renderizar
        guardarComentarios(comentarios);
        renderizarComentarios();
        return;
      }
    }
  }

  // Ordenar comentarios por número de likes (más likes primero)
  function ordenarPorLikes(comentarios) {
    return comentarios.sort(function (a, b) {
      return b.likes.length - a.likes.length;
    });
  }

  // Renderizar todos los comentarios
  function renderizarComentarios() {
    var comentarios = obtenerComentarios();
    var currentUser = AuthSystem.getCurrentUser();
    var userEmail = currentUser ? currentUser.email : null;

    // Ordenar por likes
    comentarios = ordenarPorLikes(comentarios);

    // Limpiar lista (excepto mensaje sin comentarios)
    var cards = listaComentarios.querySelectorAll(".comentario-card");
    for (var i = 0; i < cards.length; i++) {
      cards[i].remove();
    }

    // Mostrar mensaje si no hay comentarios
    if (comentarios.length === 0) {
      sinComentarios.style.display = "block";
      return;
    }

    // Ocultar mensaje sin comentarios
    sinComentarios.style.display = "none";

    // Crear card para cada comentario
    for (var j = 0; j < comentarios.length; j++) {
      var com = comentarios[j];
      var card = crearComentarioCard(com, userEmail);
      listaComentarios.appendChild(card);
    }
  }

  // Crear elemento HTML para un comentario
  function crearComentarioCard(comentario, userEmail) {
    var card = document.createElement("div");
    card.className = "comentario-card";
    card.setAttribute("data-id", comentario.id);

    // Determinar si el usuario actual ha dado like
    var hasDadoLike = userEmail && comentario.likes.indexOf(userEmail) !== -1;
    var likeClass = hasDadoLike ? "btn-like liked" : "btn-like";
    var likeIcon = hasDadoLike ? "❤️" : "🤍";

    // Crear avatar
    var avatarHTML;
    if (comentario.avatarDataUrl) {
      avatarHTML = '<img src="' + comentario.avatarDataUrl + '" alt="Avatar">';
    } else {
      avatarHTML = '<span class="comentario-avatar-placeholder">👤</span>';
    }

    // Nombre completo
    var nombreCompleto = comentario.nombre;
    if (comentario.apellidos) {
      nombreCompleto += " " + comentario.apellidos;
    }

    // HTML del comentario
    card.innerHTML =
      '<div class="comentario-header">' +
      '<div class="comentario-avatar">' +
      avatarHTML +
      "</div>" +
      '<div class="comentario-info">' +
      '<span class="comentario-nombre">' +
      escapeHTML(nombreCompleto) +
      "</span>" +
      '<span class="comentario-fecha">' +
      formatearFecha(comentario.fecha) +
      "</span>" +
      "</div>" +
      "</div>" +
      '<p class="comentario-texto">' +
      escapeHTML(comentario.texto) +
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

    // Añadir evento de click al botón de like
    var btnLike = card.querySelector(".btn-like");
    btnLike.addEventListener("click", function () {
      toggleLike(comentario.id);
    });

    return card;
  }
})();
