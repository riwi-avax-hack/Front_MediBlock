<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <!-- Título de la cabecera -->
        <q-toolbar-title>
          <router-link to="/landing" class="register-link">
            <q-img
              src="../assets/logo-removebg.png"
              spinner-color="white"
              style="height: 60px; max-width: 60px"
            />
            <span class="textLog">MediBlock</span>
          </router-link>
        </q-toolbar-title>

        <div class="info-user">
          <p v-if="isAuthenticated" class="">{{ userInfo?.names }}</p>
          <p>Paciente</p>
        </div>

        <!-- Avatar con dropdown -->
        <q-btn v-if="isAuthenticated" flat round @click="handleChangeVisible">
          <q-avatar>
            <img :src="userInfo?.picture" alt="User Avatar" />
          </q-avatar>

          <!-- Dropdown con q-menu -->
          <q-menu v-model="menuVisible" anchor="bottom right" self="top right">
            <q-list>
              <q-item clickable v-ripple @click="logout">
                <q-item-section>Cerrar Sesión</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <!-- Contenido de la página -->
      <router-view />
    </q-page-container>

    <q-footer class="bg-primary text-white" elevated>
      <q-toolbar class="justify-between">
        <!-- Sección izquierda -->
        <div class="footer-left">
          <q-img
            src="../assets/logo-removebg.png"
            spinner-color="white"
            style="height: 60px; max-width: 60px"
          />
          <span class="q-ml-sm">MediBlock © 2024</span>
        </div>

        <!-- Sección central con enlaces -->
        <q-btn-group flat class="footer-links">
          <q-btn flat label="Pacientes" to="/" />
          <q-btn flat label="Medicos" to="/hospital/medicals" />
          <q-btn
            flat
            label="Entidades Hospitalarias"
            to="/medical/add-history"
          />
        </q-btn-group>

        <!-- Sección derecha con íconos sociales -->
        <div class="footer-right">
          <q-btn flat icon="mdi-facebook" dense round />
          <q-btn flat icon="mdi-twitter" dense round />
          <q-btn flat icon="mdi-linkedin" dense round />
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// Obtener estado de autenticación
const isAuthenticated = authStore.isAuthenticated;
const userInfo = authStore.userInfo;

const menuVisible = ref(false);

function logout() {
  authStore.logOut(router);
}

function handleChangeVisible() {
  console.log('holaa');
  menuVisible.value = true;
  console.log(menuVisible.value);
}
</script>

<style scoped lang="scss">
.info-user {
  p {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
  }
}

.textLog {
  font-size: 30px;
  font-weight: 500;
  color: white;
  text-decoration: none !important;
}
</style>
