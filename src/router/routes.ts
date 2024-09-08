import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('pages/patients/PatientsPage.vue'), // Componente que se cargará en "/"
      },
      {
        path: '/medical/add-history',
        component: () => import('pages/medical/MedicalPage.vue'), // Componente que se cargará en "/"
      },
      {
        path: '/medical/search-patients',
        component: () => import('pages/medical/SearchPatientPage.vue'), // Componente que se cargará en "/"
      },
      {
        path: '/hospital/medicals',
        component: () => import('pages/hospital/HospitalPage.vue'), // Componente que se cargará en "/"
      },
    ],
  },
  {
    path: '/login',
    component: () => import('pages/auth/Login.vue'),
  },
  {
    path: '/landing',
    component: () => import('pages/IndexPage.vue'),
  },

  {
    path: '/register',
    component: () => import('pages/sign-up/UserRegistration.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
