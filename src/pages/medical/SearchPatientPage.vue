<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">Buscar Paciente por Cédula</div>
        </q-card-section>

        <q-separator />

        <!-- Input de autocompletar -->
        <q-input v-model="searchTerm" label="Buscar por Cédula" filled>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- Resultados del autocompletar -->
        <q-list v-if="filteredResults.length > 0" bordered>
          <q-item
            v-for="result in filteredResults"
            :key="result.id"
            clickable
            @click="goToDetail(result)"
          >
            <q-item-section>
              <q-item-label>{{ result.name }}</q-item-label>
              <q-item-label caption>{{ result.cedula }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator v-if="filteredResults.length > 0" />
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

// Definir la interfaz para un paciente
interface Patient {
  id: number;
  name: string;
  cedula: string;
  details: string;
}

// Simulación de una lista de pacientes
const patients = ref<Patient[]>([
  {
    id: 1,
    name: 'Juan Pérez',
    cedula: '12345678',
    details: 'Detalle de Juan Pérez',
  },
  {
    id: 2,
    name: 'Ana García',
    cedula: '87654321',
    details: 'Detalle de Ana García',
  },
  {
    id: 3,
    name: 'Luis Martínez',
    cedula: '45678912',
    details: 'Detalle de Luis Martínez',
  },
]);

// Término de búsqueda y resultados filtrados
const searchTerm = ref<string>(''); // Término de búsqueda es un string
const filteredResults = ref<Patient[]>([]); // Lista filtrada de pacientes

const router = useRouter();

// Escuchar los cambios en el término de búsqueda con un watcher
watch(searchTerm, (newVal) => {
  console.log(newVal);
  if (newVal.trim()) {
    filteredResults.value = patients.value.filter((patient) =>
      patient.cedula.includes(newVal)
    );
    console.log(filteredResults.value);
  } else {
    filteredResults.value = [];
  }
});

// Función para redirigir a la página de detalles
function goToDetail(patient: Patient) {
  router.push({ name: 'patientDetail', params: { id: patient.id } });
}
</script>

<style scoped>
.q-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>
