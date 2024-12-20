# README de la App de E-commerce

## Resumen

Esta aplicación es una plataforma de comercio electrónico diseñada para brindar una experiencia de usuario fluida. Incluye módulos de autenticación (login y sign-in), navegación avanzada, un carrito de compras, un buscador, y la capacidad de cambiar el idioma de la app. Actualmente, el módulo de sign-in no está funcional debido a la falta de una API para crear usuarios.

### Características principales

- **Autenticación**: Permite el login de usuarios para acceder a funciones avanzadas.
- **Navegación avanzada**: Cambia dinámicamente la estructura de navegación según el estado de autenticación.
- **Carrito de compras**: Permite agregar productos con cantidades personalizadas.
- **Soporte multilingüe**: La aplicación puede cambiar de idioma desde la sección de ajustes.
- **Perfil de usuario**: Visualización de información del usuario y opción para cerrar sesión.
- **Optimización de imágenes**: Uso de la librería `FastImage` para un mejor manejo de caché de imágenes.
- **Búsqueda optimizada**: Uso de debounce para optimizar las consultas de búsqueda.

---

## Estructura de navegación

1. **Navegación inicial**:
   - Se verifica si el usuario está autenticado. Si no lo está, se muestra un stack de autenticación.
2. **Navegación principal**:
   - **TabNavigator**:
     - Inicio.
     - Buscador.
     - Carrito.
   - **StackNavigator**:
     - Detalles de producto: permite agregar productos al carrito.
   - **DrawerNavigator**:
     - Configuración (ajustes de idioma).
     - Perfil (información del usuario y opción para cerrar sesión).

---

## Personalizaciones realizadas

- **Optimización de componentes**:
  - Uso de `React.memo` para evitar renders innecesarios.
  - Uso de `useMemo` para memorizar constantes y mejorar el rendimiento.
- **Soporte multilingüe**:
  - Implementación de traducción completa de la app.
- **Caché de imágenes**:
  - Uso de la librería `FastImage` para mejorar la carga y rendimiento de imágenes.

---

## Optimización de rendimiento

- **Optimización de navegación**:
  - Uso de navegación avanzada para evitar renders innecesarios.
- **Manejo eficiente de estado**:
  - Uso de Context API para el estado de autenticación.
  - Uso de Async Storage para persistencia de datos locales (usuario, carrito, idioma).
- **Búsqueda optimizada**:
  - Implementación de debounce para reducir el número de consultas innecesarias al realizar búsquedas.

---

## Manejo del estado

- **Context API**:
  - Usado para manejar el estado global de autenticación del usuario.
- **Async Storage**:
  - Almacena información del usuario, contenido del carrito y configuración de idioma.

---

## Retos enfrentados

1. **Problemas con permisos en macOS**:
   - Se requirieron permisos de administrador constantemente, y algunos ajustes se reseteaban de forma inesperada.
2. **Falta de tiempo**:
   - Limitaciones en el tiempo disponible debido a actividades fuera del horario laboral.
3. **Priorización**:
   - Se priorizó la funcionalidad y el diseño sobre herramientas de monitoreo.
4. **Curva de aprendizaje en navegación**:
   - Inicialmente confusa, pero se logró dominar la estructura.
5. **Falta de API adecuada**:
   - Dificultad para encontrar una API externa que cubriera todas las necesidades.

---

## Credenciales para prueba

- **Username**: `emilys`
- **Password**: `emilyspass`

---

## Instrucciones para correr la aplicación

1. Asegúrate de contar con la versión **Node.js v20.18.1**.
2. Ejecuta el comando:
   ```bash
   npm install
   ```
3. Inicia la aplicación en Android o iOS:
   - Android:
     ```bash
     npm run android
     ```
   - iOS:
     ```bash
     npm run ios
     ```
4. Asegúrate de tener configurados los emuladores correspondientes para el desarrollo.
