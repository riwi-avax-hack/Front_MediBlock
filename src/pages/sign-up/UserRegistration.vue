<template>
  <div class="q-pa-md" style="max-width: 800px; margin: 0 auto">
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Registro de Usuario</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmitUser">
          <q-input v-model="user.name" label="Nombre" outlined />
          <q-input v-model="user.email" label="Correo Electrónico" type="email" outlined />
          <q-input v-model="user.password" label="Contraseña" type="password" outlined />
          <q-btn type="submit" label="Registrar Usuario" color="primary" class="q-mt-md" />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      },
    }
  },
  methods: {
    onSubmitUser() {
      // logic to register user
      console.log('Usuario registrado:', this.user)
    },
  }
}
</script>

<style scoped>
.q-mb-md {
  margin-bottom: 16px;
}

.q-pa-md {
  padding: 16px;
}
</style>
