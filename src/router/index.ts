import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { useAuthStore } from 'src/stores/auth';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : createWebHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Deja esto tal cual, los cambios se hacen en quasar.conf.js
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Añadir el guard de autenticación
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // Comprobar si hay un token en la URL (Google redirige con #access_token)
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      const params = new URLSearchParams(hash.substring(1)); // Eliminar el #
      const token = params.get('access_token');

      if (token) {
        authStore.setToken(token); // Guardar el token en Pinia
        window.location.hash = ''; // Limpiar el hash de la URL
        next('/'); // Redirigir a la página principal
        return;
      }
    }

    // Verificar si la ruta requiere autenticación
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      // Si no está autenticado, redirigir a la página de login
      next('/login');
    } else if (to.path === '/login' && authStore.isAuthenticated) {
      // Si está autenticado e intenta ir al login, redirigir a la página de inicio
      next('/');
    } else {
      // Si está autenticado o no se requiere autenticación, continuar
      next();
    }
  });

  return Router;
});
