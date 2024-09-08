<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">Agregar Nueva Historia Clínica</div>
        </q-card-section>

        <q-separator />

        <!-- Formulario -->
        <q-form @submit="submitForm" class="q-gutter-md">
          <!-- Información del Paciente -->
          <q-card-section>
            <div class="text-h6">Información del Paciente</div>

            <q-input
              v-model="patient.name"
              label="Nombre Completo"
              filled
              required
            />
            <q-input
              v-model.number="patient.age"
              label="Edad"
              type="number"
              filled
              required
            />
            <q-select
              v-model="patient.gender"
              :options="genderOptions"
              label="Género"
              filled
              required
            />
            <q-input v-model="patient.phone" label="Teléfono" filled />
            <q-input
              v-model="patient.email"
              label="Email"
              type="email"
              filled
            />
          </q-card-section>

          <!-- Información Médica -->
          <q-card-section>
            <div class="text-h6">Información Médica</div>

            <q-input
              v-model="medical.allergies"
              label="Alergias (separadas por comas)"
              filled
            />
            <q-input
              v-model="medical.chronicDiseases"
              label="Enfermedades Crónicas (separadas por comas)"
              filled
            />
            <q-input
              v-model="medical.medications"
              label="Medicamentos (separados por comas)"
              filled
            />
          </q-card-section>

          <q-separator />

          <!-- Botón de Guardar -->
          <q-card-section>
            <q-btn
              type="submit"
              label="Guardar Historia Clínica"
              color="primary"
            />
          </q-card-section>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Datos del formulario
const patient = ref({
  name: '',
  age: null,
  gender: '',
  phone: '',
  email: '',
});

// Datos médicos del formulario
const medical = ref({
  allergies: '',
  chronicDiseases: '',
  medications: '',
});

// Opciones de género
const genderOptions = ['Masculino', 'Femenino', 'Otro'];

// Función para manejar el envío del formulario
function submitForm() {
  // Simular el almacenamiento de datos o enviar al backend
  const historiaClinica = {
    ...patient.value,
    medical: {
      allergies: medical.value.allergies.split(',').map((a) => a.trim()),
      chronicDiseases: medical.value.chronicDiseases
        .split(',')
        .map((d) => d.trim()),
      medications: medical.value.medications.split(',').map((m) => m.trim()),
    },
  };

  console.log('Historia Clínica Guardada:', historiaClinica);

  // Redirigir a otra página después de guardar
  router.push('/');
}
</script>

<style scoped>
.q-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>
