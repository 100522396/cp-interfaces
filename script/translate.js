// Translation System for MoSinFron
// Handles ES/EN language switching with localStorage persistence

const translations = {
    es: {
        // Navigation
        'nav.destinos': 'Destinos',
        'nav.otros-rincones': 'Otros Rincones',
        'nav.comunidad': 'Comunidad',
        'nav.mi-cuenta': 'Mi Cuenta',
        'nav.compra': 'Compra',
        'nav.soporte': 'Soporte',

        // Auth buttons
        'btn.login': 'Iniciar sesión',
        'btn.signup': 'Únete',

        // Home page
        'home.subtitle': '¿MOCHILERO?',
        'home.title': 'LA AVENTURA<br />TE ESPERA',
        'home.section1-title': 'Destinos Populares',
        'home.section2-title': 'Otros Rincones',

        // Home cards
        'home.card1-kicker': 'ALPES NOCTURNOS',
        'home.card1-text': 'Descubre los mejores sitios para ver las estrellas en los Alpes',
        'home.card2-kicker': 'COSAS QUE HACER',
        'home.card2-text': 'Embárcate en una aventura tropical',
        'home.card3-kicker': 'GUÍA DE VIAJE',
        'home.card3-text': 'No te pierdas este destino increíble en el norte de Europa',
        'home.card4-kicker': 'ALTA MONTAÑA',
        'home.card4-text': 'Acampa en lo alto de las montañas Tibetanas',

        'home.card5-kicker': 'HIMALAYA',
        'home.card5-text': 'Gastronomía y mochileo por la cordillera del Himalaya',
        'home.card6-kicker': 'COSAS QUE HACER',
        'home.card6-text': 'Senderismo en las montañas noruegas',
        'home.card7-kicker': 'GUÍA DE VIAJE',
        'home.card7-text': 'Descubre la extraña ciudad con más mochileros de todo Asia',
        'home.card8-kicker': 'LUGARES',
        'home.card8-text': 'Aborda una aventura en canoa por el Lago Baikal',

        // Destinos page
        'destinos.title': 'Destinos Populares',
        'destinos.subtitle': 'Explora los lugares más increíbles del Mundo con nuestras experiencias cuidadosamente diseñadas',
        'destinos.continent1': 'Europa',
        'destinos.continent2': 'Asia',
        'destinos.continent3': 'América',
        'destinos.location1': 'España',
        'destinos.location2': 'Hong Kong',
        'destinos.location3': 'Nueva York',
        'destinos.desc1': 'Playas de arena blanca y aguas cristalinas en el paraíso caribeño',
        'destinos.desc2': 'Excursión en catamarán a la isla más hermosa del Caribe',
        'destinos.desc3': 'Descubre la historia y cultura en la primera ciudad de América',
        'destinos.duration': 'días',
        'destinos.from': 'desde',
        'destinos.btn-buy': 'Comprar',
        'destinos.btn-all': 'Ver Todos los Destinos',

        // Otros Rincones page
        'otros.title': 'Otros Rincones',
        'otros.filter-all': 'Todos',
        'otros.filter-europa': 'Europa',
        'otros.filter-asia': 'Asia',
        'otros.filter-africa': 'África',
        'otros.filter-oceania': 'Oceanía',
        'otros.filter-norte': 'América del Norte',
        'otros.filter-sur': 'América del Sur',
        'otros.btn-load': 'Cargar más destinos',

        // Compra page
        'compra.back': 'Volver',
        'compra.title': 'Completa tu reserva',
        'compra.section1': 'Datos del viaje',
        'compra.origen': 'Origen',
        'compra.destino': 'Destino',
        'compra.salida': 'Fecha de salida',
        'compra.regreso': 'Fecha de regreso',
        'compra.pasajeros': 'Número de pasajeros',

        'compra.section2': 'Datos personales',
        'compra.nombre': 'Nombre',
        'compra.apellidos': 'Apellidos',
        'compra.email': 'Correo electrónico',
        'compra.telefono': 'Número de teléfono',
        'compra.dni': 'DNI / Pasaporte',

        'compra.section3': '¿Algún pasajero tiene alergias o intolerancias alimentarias?',
        'compra.alergias-si': 'Sí, hay pasajeros con alergias',
        'compra.alergias-desc': 'Describe las alergias o intolerancias',

        'compra.section4': '¿Viajas con acompañantes?',
        'compra.acompanantes-si': 'Sí, viajo con acompañantes',
        'compra.cuantos': '¿Cuantos acompañantes tienes?',
        'compra.nombre-acomp': 'Nombre del acompañante 1',
        'compra.apellido-acomp': 'Apellido del acompañante 1',
        'compra.email-acomp': 'Correo electrónico del acompañante 1',

        'compra.section5': '¿Viajas con mascotas?',
        'compra.mascotas-si': 'Sí, viajo con mascotas',
        'compra.num-mascotas': '¿Número de mascotas?',
        'compra.tipo-mascota': '¿Tipo de mascota?',

        'compra.btn-pagar': 'Realizar pago',

        // Login page
        'login.title': 'Iniciar Sesión',
        'login.subtitle': 'Inicia sesión para acceder a tu cuenta de mochilero.',
        'login.email': 'Email',
        'login.password': 'Contraseña',
        'login.remember': 'Recuérdame',
        'login.forgot': 'Olvidé mi contraseña',
        'login.btn-login': 'Iniciar Sesión',
        'login.no-account': '¿Aún no tienes una cuenta?',
        'login.register-link': 'Regístrate',
        'login.or': 'O inicia sesión con',

        // Registro page
        'registro.title': 'Regístrate',
        'registro.subtitle': 'Vamos a dejar todo listo para que crees tu cuenta de mochilero',
        'registro.nombre': 'Nombre',
        'registro.apellidos': 'Apellidos',
        'registro.email': 'Email',
        'registro.telefono': 'Número de teléfono',
        'registro.password': 'Contraseña',
        'registro.confirm': 'Confirmar Contraseña',
        'registro.terms': 'Acepto los',
        'registro.terms-link': 'Términos',
        'registro.privacy': 'he leído la',
        'registro.privacy-link': 'Política de privacidad',
        'registro.btn-create': 'Crear cuenta',
        'registro.have-account': '¿Ya tienes una cuenta?',
        'registro.login-link': 'Inicia Sesión',
        'registro.or': 'O regístrate con',

        // Comunidad page
        'comunidad.tab1': 'Explorar',
        'comunidad.tab2': 'Mis Comunidades',
        'comunidad.tab3': 'Ajustes',
        'comunidad.sidebar1-title': 'Mis comunidades',
        'comunidad.sidebar2-title': 'Usuarios',
        'comunidad.sidebar3-title': 'Consejos Mochileros',
        'comunidad.privada': 'PRIVADA',
        'comunidad.publica': 'PÚBLICA',
        'comunidad.members': 'Members',
        'comunidad.input-placeholder': 'Comparte sus pensamientos ...',
        'comunidad.post-time': 'Hace 1 día',
        'comunidad.likes': 'likes',
        'comunidad.comments': 'comentarios',
        'comunidad.btn-like': 'Like',
        'comunidad.btn-comment': 'Comentar',
        'comunidad.btn-save': 'Guardar',
        'comunidad.btn-share': 'Share',

        // Mi Cuenta page
        'cuenta.btn-daltonico': 'Modo Daltónico',
        'cuenta.tab1': 'Cuenta',
        'cuenta.tab2': 'Historial',
        'cuenta.tab3': 'Métodos de pago',
        'cuenta.section-title': 'Cuenta',
        'cuenta.nombre': 'Nombre',
        'cuenta.email': 'Email',
        'cuenta.password': 'Contraseña',
        'cuenta.telefono': 'Número de teléfono',
        'cuenta.direccion': 'Dirección',
        'cuenta.nacimiento': 'Fecha de nacimiento',
        'cuenta.btn-edit': 'Editar',
        'cuenta.btn-add-email': 'Añadir otro email',

        // Soporte page
        'soporte.title': 'Preguntas frecuentes',
        'soporte.q1': '¿Cuál es vuestra política de cancelación?',
        'soporte.a1': 'Las cancelaciones realizadas con más de 15 días de antelación tienen reembolso del 100%. Entre 7-15 días: reembolso del 50%. Menos de 7 días: no hay reembolso. Las cancelaciones por causa de fuerza mayor se evalúan caso por caso. Te recomendamos contratar seguro de cancelación.',
        'soporte.q2': '¿Cómo puedo modificar mi reserva?',
        'soporte.a2': 'Puedes modificar tu reserva hasta 48 horas antes de la fecha de salida sin coste adicional. Accede a "Mi cuenta" > "Mis reservas" y selecciona la opción "Modificar". Los cambios de fecha o destino están sujetos a disponibilidad y posibles diferencias de precio.',
        'soporte.q3': '¿Qué documentación necesito para viajar?',
        'soporte.a3': 'Para viajes internacionales necesitas pasaporte con validez mínima de 6 meses. Algunos destinos requieren visado - consulta los requisitos específicos en nuestra sección de destinos. Para viajes nacionales, el DNI es suficiente. Revisa también si necesitas certificados de vacunación según el destino.',
        'soporte.q4': '¿Ofrecéis seguro de viaje?',
        'soporte.a4': 'Recomendamos encarecidamente contratar un seguro de viaje. Trabajamos con varias aseguradoras que ofrecen cobertura médica, de equipaje y cancelación. Puedes añadirlo durante el proceso de reserva o contratarlo por tu cuenta. El seguro no está incluido en el precio base del viaje.',

        // Footer
        'footer.home': 'HOME',
        'footer.destinos': 'DESTINOS',
        'footer.otros': 'OTROS RINCONES',
        'footer.comunidad': 'COMUNIDAD',
        'footer.cuenta': 'MI CUENTA',
        'footer.compra': 'COMPRA',
        'footer.soporte': 'SOPORTE',
    },

    en: {
        // Navigation
        'nav.destinos': 'Destinations',
        'nav.otros-rincones': 'Other Places',
        'nav.comunidad': 'Community',
        'nav.mi-cuenta': 'My Account',
        'nav.compra': 'Purchase',
        'nav.soporte': 'Support',

        // Auth buttons
        'btn.login': 'Sign In',
        'btn.signup': 'Join',

        // Home page
        'home.subtitle': 'BACKPACKER?',
        'home.title': 'ADVENTURE<br />AWAITS',
        'home.section1-title': 'Popular Destinations',
        'home.section2-title': 'Other Places',

        // Home cards
        'home.card1-kicker': 'NOCTURNAL ALPS',
        'home.card1-text': 'Discover the best places to stargaze in the Alps',
        'home.card2-kicker': 'THINGS TO DO',
        'home.card2-text': 'Embark on a tropical adventure',
        'home.card3-kicker': 'TRAVEL GUIDE',
        'home.card3-text': 'Don\'t miss this incredible destination in Northern Europe',
        'home.card4-kicker': 'HIGH MOUNTAINS',
        'home.card4-text': 'Camp high in the Tibetan mountains',

        'home.card5-kicker': 'HIMALAYA',
        'home.card5-text': 'Gastronomy and backpacking through the Himalayas',
        'home.card6-kicker': 'THINGS TO DO',
        'home.card6-text': 'Hiking in the Norwegian mountains',
        'home.card7-kicker': 'TRAVEL GUIDE',
        'home.card7-text': 'Discover the unique city with the most backpackers in all of Asia',
        'home.card8-kicker': 'PLACES',
        'home.card8-text': 'Embark on a canoe adventure on Lake Baikal',

        // Destinos page
        'destinos.title': 'Popular Destinations',
        'destinos.subtitle': 'Explore the world\'s most incredible places with our carefully designed experiences',
        'destinos.continent1': 'Europe',
        'destinos.continent2': 'Asia',
        'destinos.continent3': 'America',
        'destinos.location1': 'Spain',
        'destinos.location2': 'Hong Kong',
        'destinos.location3': 'New York',
        'destinos.desc1': 'White sand beaches and crystal clear waters in Caribbean paradise',
        'destinos.desc2': 'Catamaran excursion to the most beautiful Caribbean island',
        'destinos.desc3': 'Discover the history and culture in America\'s first city',
        'destinos.duration': 'days',
        'destinos.from': 'from',
        'destinos.btn-buy': 'Buy',
        'destinos.btn-all': 'View All Destinations',

        // Otros Rincones page
        'otros.title': 'Other Places',
        'otros.filter-all': 'All',
        'otros.filter-europa': 'Europe',
        'otros.filter-asia': 'Asia',
        'otros.filter-africa': 'Africa',
        'otros.filter-oceania': 'Oceania',
        'otros.filter-norte': 'North America',
        'otros.filter-sur': 'South America',
        'otros.btn-load': 'Load more destinations',

        // Compra page
        'compra.back': 'Back',
        'compra.title': 'Complete your booking',
        'compra.section1': 'Trip details',
        'compra.origen': 'Origin',
        'compra.destino': 'Destination',
        'compra.salida': 'Departure date',
        'compra.regreso': 'Return date',
        'compra.pasajeros': 'Number of passengers',

        'compra.section2': 'Personal information',
        'compra.nombre': 'First Name',
        'compra.apellidos': 'Last Name',
        'compra.email': 'Email address',
        'compra.telefono': 'Phone number',
        'compra.dni': 'ID / Passport',

        'compra.section3': 'Do any passengers have allergies or food intolerances?',
        'compra.alergias-si': 'Yes, there are passengers with allergies',
        'compra.alergias-desc': 'Describe allergies or intolerances',

        'compra.section4': 'Are you traveling with companions?',
        'compra.acompanantes-si': 'Yes, I am traveling with companions',
        'compra.cuantos': 'How many companions do you have?',
        'compra.nombre-acomp': 'Companion 1 first name',
        'compra.apellido-acomp': 'Companion 1 last name',
        'compra.email-acomp': 'Companion 1 email address',

        'compra.section5': 'Are you traveling with pets?',
        'compra.mascotas-si': 'Yes, I am traveling with pets',
        'compra.num-mascotas': 'Number of pets?',
        'compra.tipo-mascota': 'Pet type?',

        'compra.btn-pagar': 'Make payment',

        // Login page
        'login.title': 'Sign In',
        'login.subtitle': 'Sign in to access your backpacker account.',
        'login.email': 'Email',
        'login.password': 'Password',
        'login.remember': 'Remember me',
        'login.forgot': 'Forgot my password',
        'login.btn-login': 'Sign In',
        'login.no-account': 'Don\'t have an account yet?',
        'login.register-link': 'Sign Up',
        'login.or': 'Or sign in with',

        // Registro page
        'registro.title': 'Sign Up',
        'registro.subtitle': 'Let\'s get everything ready for you to create your backpacker account',
        'registro.nombre': 'First Name',
        'registro.apellidos': 'Last Name',
        'registro.email': 'Email',
        'registro.telefono': 'Phone number',
        'registro.password': 'Password',
        'registro.confirm': 'Confirm Password',
        'registro.terms': 'I accept the',
        'registro.terms-link': 'Terms',
        'registro.privacy': 'and have read the',
        'registro.privacy-link': 'Privacy Policy',
        'registro.btn-create': 'Create account',
        'registro.have-account': 'Already have an account?',
        'registro.login-link': 'Sign In',
        'registro.or': 'Or sign up with',

        // Comunidad page
        'comunidad.tab1': 'Explore',
        'comunidad.tab2': 'My Communities',
        'comunidad.tab3': 'Settings',
        'comunidad.sidebar1-title': 'My communities',
        'comunidad.sidebar2-title': 'Users',
        'comunidad.sidebar3-title': 'Backpacker Tips',
        'comunidad.privada': 'PRIVATE',
        'comunidad.publica': 'PUBLIC',
        'comunidad.members': 'Members',
        'comunidad.input-placeholder': 'Share your thoughts ...',
        'comunidad.post-time': '1 day ago',
        'comunidad.likes': 'likes',
        'comunidad.comments': 'comments',
        'comunidad.btn-like': 'Like',
        'comunidad.btn-comment': 'Comment',
        'comunidad.btn-save': 'Save',
        'comunidad.btn-share': 'Share',

        // Mi Cuenta page
        'cuenta.btn-daltonico': 'Colorblind Mode',
        'cuenta.tab1': 'Account',
        'cuenta.tab2': 'History',
        'cuenta.tab3': 'Payment methods',
        'cuenta.section-title': 'Account',
        'cuenta.nombre': 'Name',
        'cuenta.email': 'Email',
        'cuenta.password': 'Password',
        'cuenta.telefono': 'Phone number',
        'cuenta.direccion': 'Address',
        'cuenta.nacimiento': 'Date of birth',
        'cuenta.btn-edit': 'Edit',
        'cuenta.btn-add-email': 'Add another email',

        // Soporte page
        'soporte.title': 'Frequently Asked Questions',
        'soporte.q1': 'What is your cancellation policy?',
        'soporte.a1': 'Cancellations made more than 15 days in advance receive a 100% refund. Between 7-15 days: 50% refund. Less than 7 days: no refund. Cancellations due to force majeure are evaluated on a case-by-case basis. We recommend purchasing cancellation insurance.',
        'soporte.q2': 'How can I modify my booking?',
        'soporte.a2': 'You can modify your booking up to 48 hours before the departure date at no additional cost. Access "My Account" > "My Bookings" and select the "Modify" option. Date or destination changes are subject to availability and possible price differences.',
        'soporte.q3': 'What documentation do I need to travel?',
        'soporte.a3': 'For international travel you need a passport with a minimum validity of 6 months. Some destinations require a visa - check the specific requirements in our destinations section. For domestic travel, an ID is sufficient. Also check if you need vaccination certificates depending on the destination.',
        'soporte.q4': 'Do you offer travel insurance?',
        'soporte.a4': 'We strongly recommend purchasing travel insurance. We work with several insurers that offer medical, baggage, and cancellation coverage. You can add it during the booking process or purchase it on your own. Insurance is not included in the base price of the trip.',

        // Footer
        'footer.home': 'HOME',
        'footer.destinos': 'DESTINATIONS',
        'footer.otros': 'OTHER PLACES',
        'footer.comunidad': 'COMMUNITY',
        'footer.cuenta': 'MY ACCOUNT',
        'footer.compra': 'PURCHASE',
        'footer.soporte': 'SUPPORT',
    }
};

// Get current language from localStorage or default to 'es'
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'es';
}

// Set language in localStorage
function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

// Translate the page
function translatePage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[lang][key];

        if (translation) {
            // Check if element has data-i18n-html attribute for HTML content
            if (element.hasAttribute('data-i18n-html')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        }
    });

    // Update language toggle button
    updateLanguageToggle(lang);
}

// Update the language toggle button state
function updateLanguageToggle(lang) {
    const esBtn = document.getElementById('lang-es');
    const enBtn = document.getElementById('lang-en');

    if (esBtn && enBtn) {
        if (lang === 'es') {
            esBtn.classList.add('active');
            enBtn.classList.remove('active');
        } else {
            enBtn.classList.add('active');
            esBtn.classList.remove('active');
        }
    }
}

// Switch language
function switchLanguage(lang) {
    setLanguage(lang);
    translatePage(lang);
}

// Initialize translation on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCurrentLanguage();
    translatePage(currentLang);

    // Add event listeners to language toggle buttons
    const esBtn = document.getElementById('lang-es');
    const enBtn = document.getElementById('lang-en');

    if (esBtn) {
        esBtn.addEventListener('click', () => switchLanguage('es'));
    }

    if (enBtn) {
        enBtn.addEventListener('click', () => switchLanguage('en'));
    }
});
