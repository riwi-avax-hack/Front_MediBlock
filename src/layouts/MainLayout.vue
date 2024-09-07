<template>
  <div>
    <h3>Inicia sesión con Google</h3>
    <GoogleLogin
      @success="onSuccess"
      @error="onError"
      prompt
      auto-login
      client-id="221195599762-neb9eb6vk2adgeh2bu6vou1bsqh3ugle.apps.googleusercontent.com"
    />
  </div>
</template>

<script setup lang="ts">
import { GoogleLogin } from 'vue3-google-login';
// Definir el tipo para la respuesta exitosa de Google
interface GoogleLoginResponse {
  credential: string;
  select_by: string;
}

// Definir el tipo para los errores de Google Login
interface GoogleLoginError {
  error: string;
  details: string;
}

// Función para manejar el inicio de sesión exitoso
function onSuccess(response: GoogleLoginResponse) {
  console.log('Inicio de sesión exitoso:', response);
  // Aquí puedes manejar el token JWT o los datos del usuario
}

// Función para manejar los errores de inicio de sesión
function onError(error: GoogleLoginError) {
  console.error('Error en el inicio de sesión:', error);
}
</script>
