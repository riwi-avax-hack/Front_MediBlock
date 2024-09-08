<template>
  <div
    class="q-pa-md"
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      margin: 0 auto;
      background: linear-gradient(135deg, #0d47a1, #002171);
      justify-content: center;
    "
  >
    <q-card style="width: 500px">
      <q-card-section>
        <div class="text-h6 text-center">Iniciar Sesión</div>
        <div
          style="display: flex; align-items: center; justify-content: center"
        >
          <img
            src="../../assets/logo-removebg.png"
            spinner-color="white"
            style="height: 150px; max-width: 150px; text-align: center"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <!-- Formulario de login con usuario y contraseña -->
        <q-form @submit="handleLogin">
          <q-input
            v-model="username"
            label="Usuario"
            filled
            required
            :rules="[(val) => !!val || 'El campo es requerido']"
          />
          <q-input
            v-model="password"
            label="Contraseña"
            type="password"
            filled
            required
            :rules="[(val) => !!val || 'El campo es requerido']"
          />
          <q-btn
            type="submit"
            label="Iniciar sesión"
            color="primary"
            class="full-width q-mt-md"
          />
        </q-form>

        <!-- Texto para redirigir a la página de registro -->
        <div class="q-mt-md text-center">
          <router-link to="/register" class="register-link">
            ¿No tienes una cuenta aún? <strong>Regístrate</strong>
          </router-link>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <!-- Botón para iniciar sesión con Google -->
        <q-btn
          @click="redirectToGoogle"
          label="Iniciar sesión con Google"
          color="primary"
          class="full-width"
          icon="account_circle"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'login-page',
});

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');

async function handleLogin() {
  if (username.value && password.value) {
    await authStore.login({ email: username.value, password: password.value });
    router.push('/');
  } else {
    console.error('Campos incompletos');
  }
}

function redirectToGoogle() {
  const googleAuthUrl =
    'https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=221195599762-neb9eb6vk2adgeh2bu6vou1bsqh3ugle.apps.googleusercontent.com&redirect_uri=https://avalanche.kevinmejia.com.co/landing&scope=email profile';
  window.location.href = googleAuthUrl;
}

function getTokenFromUrl() {
  const hash = window.location.hash;

  if (hash) {
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get('access_token');

    if (token) {
      console.log('Token obtenido:', token);
      authStore.setToken(token);
    } else {
      console.error('No se encontró token en la URL');
    }
  }
}

// Cargar el token de Google si ya existe
onMounted(() => {
  authStore.loadToken();
  getTokenFromUrl();
});
</script>

<style scoped>
.full-width {
  width: 100%;
}

.register-link {
  color: #757575; /* Gris claro */
  font-size: 14px;
}

.register-link:hover {
  color: #000; /* Color más oscuro al hacer hover */
}
</style>
