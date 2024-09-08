<template>
  <div class="q-pa-md" style="max-width: 800px; margin: 0 auto">
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Registro de Entidad Médica</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmitEntity">
          <q-input v-model="entity.nit" label="Nit de la Entidad" outlined />
          <q-input v-model="entity.country" label="País de operación" outlined />

          <q-btn type="submit" label="Registrar Entidad" color="primary" class="q-mt-md" />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      entity: {
        nit: '',
        country: ''
      }
    }
  },
  methods: {
    onSubmitEntity() {
      // logic to register entity
      console.log('Entidad médica registrada:', this.entity)
    }
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
