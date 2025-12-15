// script/auth-system.js
// Auth system with localStorage

var AuthSystem = {
  // LocalStorage keys
  KEYS: {
    USERS: "users",
    CURRENT_USER: "currentUser",
  },

  // User functions

  // Get all registered users
  getUsers: function () {
    try {
      var data = localStorage.getItem(this.KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading users:", e);
      return [];
    }
  },

  // Save users array
  setUsers: function (users) {
    try {
      localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
      return true;
    } catch (e) {
      console.error("Error saving users:", e);
      return false;
    }
  },

  // Find user by email
  findUserByEmail: function (email) {
    var users = this.getUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        return users[i];
      }
    }
    return null;
  },

  // Check if email exists
  emailExists: function (email) {
    return this.findUserByEmail(email) !== null;
  },

  // Session functions

  // Get current logged in user
  getCurrentUser: function () {
    try {
      var data = localStorage.getItem(this.KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error reading session:", e);
      return null;
    }
  },

  // Set current user (login)
  setCurrentUser: function (user) {
    try {
      // Save only needed data (no password)
      var sessionData = {
        email: user.email,
        nombre: user.nombre,
        apellidos: user.apellidos,
        telefono: user.telefono,
        avatarDataUrl: user.avatarDataUrl || null,
      };
      localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(sessionData));
      return true;
    } catch (e) {
      console.error("Error saving session:", e);
      return false;
    }
  },

  // Logout
  logout: function () {
    try {
      localStorage.removeItem(this.KEYS.CURRENT_USER);
      return true;
    } catch (e) {
      console.error("Error logging out:", e);
      return false;
    }
  },

  // Check if user is logged in
  isLoggedIn: function () {
    return this.getCurrentUser() !== null;
  },

  // Validation functions

  // Validate email format
  isValidEmail: function (email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  // Validate password (min 6 chars)
  isValidPassword: function (password) {
    return password && password.length >= 6;
  },

  // Register functions

  // Register new user
  registerUser: function (userData) {
    // Validate email
    if (!this.isValidEmail(userData.email)) {
      return { success: false, error: "Email no válido" };
    }

    // Check if exists
    if (this.emailExists(userData.email)) {
      return { success: false, error: "El email ya está registrado" };
    }

    // Validate password
    if (!this.isValidPassword(userData.password)) {
      return {
        success: false,
        error: "La contraseña debe tener al menos 6 caracteres",
      };
    }

    // Create user
    var newUser = {
      email: userData.email,
      password: userData.password,
      nombre: userData.nombre || "",
      apellidos: userData.apellidos || "",
      telefono: userData.telefono || "",
      avatarDataUrl: userData.avatarDataUrl || null,
      createdAt: new Date().toISOString(),
    };

    // Save
    var users = this.getUsers();
    users.push(newUser);

    if (this.setUsers(users)) {
      // Auto-login after register
      this.setCurrentUser(newUser);
      return { success: true, user: newUser };
    } else {
      return { success: false, error: "Error al guardar el usuario" };
    }
  },

  // Login functions

  // Verify credentials and login
  login: function (email, password) {
    var user = this.findUserByEmail(email);

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    if (user.password !== password) {
      return { success: false, error: "Contraseña incorrecta" };
    }

    // Login
    if (this.setCurrentUser(user)) {
      return { success: true, user: user };
    } else {
      return { success: false, error: "Error al iniciar sesión" };
    }
  },
};
