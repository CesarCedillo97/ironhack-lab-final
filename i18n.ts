import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: {
      /* Pantalla de login */
      loginScreenHeader: 'Login',
      userNamePlaceHolder: 'Username',
      passwordPlaceHolder: 'Password',
      loginButton: 'Log in',
      registerQuestion: '¿Don´t have an account?',
      registerText: 'Register',
      genericErrorMessage: 'Invalid username or password',
      /* Pantalla de registro */
      registerScreenHeader: 'Register',
      /* Pantalla de inicio */
      homeScreenHeader: 'Home',
      products: 'Products',
      /* Pantalla de detalles */
      detailsScreenHeader: 'Product details',
      addToCart: 'Add to cart',
      productsAdded: 'products added to cart.',
      productsNotAddedError: 'We could´t add the product to cart',
      /* Pantalla de buscador */
      searchScreenHeader: 'Search products',
      productSearchTitle: 'Search products',
      productSearchPlaceholder: 'Search products...',
      gettingProducts: 'Getting products...',
      /* Pantalla de carrito */
      cartScreenHeader: 'Cart',
      total: 'Total',
      delete: 'Delete',
      stock: 'In stock:',
      /* Pantalla de perfil */
      profileScreenHeader: 'Profile',
      closeSession: 'Log out',
      /* Pantalla de configuración */
      settingsScreenHeader: 'Settings',
      changeLanguage: 'Change language',
      /* Generales */
      errorText: 'An error happened...',
      noContent: 'No content',
      loading: 'Loading...',
    },
  },
  es: {
    translation: {
      /* Pantalla de login */
      loginScreenHeader: 'Iniciar Sesión',
      userNamePlaceHolder: 'Nombre de usuario',
      passwordPlaceHolder: 'Contraseña',
      loginButton: 'Iniciar sesión',
      registerQuestion: '¿No tienes una cuenta?',
      registerText: 'Regístrate',
      genericErrorMessage: 'Nombre de usuario o contraseña incorrectos',
      /* Pantalla de registro */
      registerScreenHeader: 'Registrar',
      /* Pantalla de inicio */
      homeScreenHeader: 'Inicio',
      products: 'Productos',
      /* Pantalla de detalles */
      detailsScreenHeader: 'Detalles de producto',
      addToCart: 'Agregar al carrito',
      productsAdded: 'productos agregados al carrito.',
      productsNotAddedError: 'No se pudo agregar el producto al carrito.',
      /* Pantalla de buscador */
      searchScreenHeader: 'Buscar productos',
      productSearchTitle: 'Buscador de productos',
      productSearchPlaceholder: 'Busca productos...',
      gettingProducts: 'Obteniendo productos...',
      /* Pantalla de carrito */
      cartScreenHeader: 'Carrito',
      total: 'Total',
      delete: 'Eliminar',
      stock: 'En existencia:',
      /* Pantalla de perfil */
      profileScreenHeader: 'Perfil',
      closeSession: 'Cerrar sesión',
      /* Pantalla de configuración */
      settingsScreenHeader: 'Configuración',
      changeLanguage: 'Cambiar idioma',
      /* Generales */
      errorText: 'Ocurió un errro...',
      noContent: 'No hay contenido',
      loading: 'Cargando...',
    },
  },
};

i18n
  .use(initReactI18next) // Para usar i18next con React
  .init({
    resources, // Textos localizados
    lng: 'en', // Idioma por defecto
    fallbackLng: 'en', // Idioma alternativo si no se encuentra el idioma actual
    interpolation: {
      escapeValue: false, // React ya maneja el escape
    },
  });

export default i18n;
