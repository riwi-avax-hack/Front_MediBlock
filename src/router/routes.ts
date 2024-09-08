import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('pages/auth/Login.vue'),
  },
  {
    path: '/user-register',
    component: () => import('pages/sign-up/UserRegistration.vue'),
  },
  {
    path: '/entity-register',
    component: () => import('pages/sign-up/EntityRegistration.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
