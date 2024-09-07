<template>
  <div class="q-pa-md" style="max-width: 400px; margin: 0 auto">
    <q-card>
      <q-card-section>
        <div class="text-h6">Iniciar Sesión</div>
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

defineOptions({
  name: 'login-page',
});

const authStore = useAuthStore();

// Estados del formulario de usuario y contraseña
const username = ref('');
const password = ref('');

// Función para manejar el login tradicional
function handleLogin() {
  // Aquí implementarías la lógica para autenticar con el backend
  if (username.value && password.value) {
    console.log('Usuario:', username.value);
    console.log('Contraseña:', password.value);
    // Implementa tu lógica para validar las credenciales del usuario
  } else {
    console.error('Campos incompletos');
  }
}

// Redirigir a Google para autenticación
function redirectToGoogle() {
  const googleAuthUrl =
    'https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=221195599762-neb9eb6vk2adgeh2bu6vou1bsqh3ugle.apps.googleusercontent.com&redirect_uri=http://localhost:9000&scope=email profile';
  window.location.href = googleAuthUrl;
}

// Extraer el token de la URL después de redireccionar
function getTokenFromUrl() {
  const hash = window.location.hash;

  if (hash) {
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get('access_token');

    if (token) {
      console.log('Token obtenido:', token);
      authStore.setToken(token);
      getUserInfo(token);
    } else {
      console.error('No se encontró token en la URL');
    }
  }
}

// Obtener la información del usuario usando el token de Google
async function getUserInfo(token: string) {
  try {
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userInfo = await response.json();
    console.log('Información del usuario:', userInfo);
    authStore.setUserInfo(userInfo);
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
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
</style>
