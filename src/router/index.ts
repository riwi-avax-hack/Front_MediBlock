import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { useAuthStore } from 'src/stores/auth';

// Definimos el router aquí fuera para poder exportarlo
let Router: ReturnType<typeof createRouter>;

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : createWebHistory;

  Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Guard de autenticación
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    authStore.loadToken();

    // Comprobar si hay un token en la URL
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');

      if (token) {
        authStore.setToken(token);
        window.location.hash = ''; // Limpiar el hash
        next('/'); // Redirigir a la página principal
        return;
      }
    }

    // Verificar si la ruta requiere autenticación
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next('/login'); // Redirigir al login si no está autenticado
    } else if (to.path === '/login' && authStore.isAuthenticated) {
      next('/'); // Redirigir a la página principal si ya está autenticado
    } else {
      next(); // Continuar normalmente
    }
  });

  return Router;
});

// Exportar la instancia del router
export { Router };
