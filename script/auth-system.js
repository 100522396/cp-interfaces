// script/auth-system.js
// Sistema central de autenticación con localStorage

var AuthSystem = {
  // Claves para localStorage
  KEYS: {
    USERS: 'users',
    CURRENT_USER: 'currentUser'
  },

  // === GESTIÓN DE USUARIOS ===
  
  // Obtener todos los usuarios registrados
  getUsers: function() {
    try {
      var data = localStorage.getItem(this.KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error al leer usuarios:', e);
      return [];
    }
  },

  // Guardar array de usuarios
  setUsers: function(users) {
    try {
      localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
      return true;
    } catch (e) {
      console.error('Error al guardar usuarios:', e);
      return false;
    }
  },

  // Buscar usuario por email
  findUserByEmail: function(email) {
    var users = this.getUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        return users[i];
      }
    }
    return null;
  },

  // Verificar si email ya existe
  emailExists: function(email) {
    return this.findUserByEmail(email) !== null;
  },

  // === GESTIÓN DE SESIÓN ===

  // Obtener usuario actual (sesión activa)
  getCurrentUser: function() {
    try {
      var data = localStorage.getItem(this.KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error al leer sesión:', e);
      return null;
    }
  },

  // Iniciar sesión (guardar usuario actual)
  setCurrentUser: function(user) {
    try {
      // Guardar solo datos necesarios (sin contraseña)
      var sessionData = {
        email: user.email,
        nombre: user.nombre,
        apellidos: user.apellidos,
        telefono: user.telefono,
        avatarDataUrl: user.avatarDataUrl || null
      };
      localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(sessionData));
      return true;
    } catch (e) {
      console.error('Error al guardar sesión:', e);
      return false;
    }
  },

  // Cerrar sesión
  logout: function() {
    try {
      localStorage.removeItem(this.KEYS.CURRENT_USER);
      return true;
    } catch (e) {
      console.error('Error al cerrar sesión:', e);
      return false;
    }
  },

  // Verificar si hay sesión activa
  isLoggedIn: function() {
    return this.getCurrentUser() !== null;
  },

  // === VALIDACIONES ===

  // Validar formato de email
  isValidEmail: function(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  // Validar contraseña (mínimo 6 caracteres)
  isValidPassword: function(password) {
    return password && password.length >= 6;
  },

  // === REGISTRO ===

  // Registrar nuevo usuario
  registerUser: function(userData) {
    // Validar email
    if (!this.isValidEmail(userData.email)) {
      return { success: false, error: 'Email no válido' };
    }

    // Verificar si ya existe
    if (this.emailExists(userData.email)) {
      return { success: false, error: 'El email ya está registrado' };
    }

    // Validar contraseña
    if (!this.isValidPassword(userData.password)) {
      return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
    }

    // Crear usuario
    var newUser = {
      email: userData.email,
      password: userData.password,
      nombre: userData.nombre || '',
      apellidos: userData.apellidos || '',
      telefono: userData.telefono || '',
      avatarDataUrl: userData.avatarDataUrl || null,
      createdAt: new Date().toISOString()
    };

    // Guardar
    var users = this.getUsers();
    users.push(newUser);
    
    if (this.setUsers(users)) {
      // Auto-login tras registro
      this.setCurrentUser(newUser);
      return { success: true, user: newUser };
    } else {
      return { success: false, error: 'Error al guardar el usuario' };
    }
  },

  // === LOGIN ===

  // Verificar credenciales e iniciar sesión
  login: function(email, password) {
    var user = this.findUserByEmail(email);
    
    if (!user) {
      return { success: false, error: 'Usuario no encontrado' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Contraseña incorrecta' };
    }

    // Iniciar sesión
    if (this.setCurrentUser(user)) {
      return { success: true, user: user };
    } else {
      return { success: false, error: 'Error al iniciar sesión' };
    }
  }
};
