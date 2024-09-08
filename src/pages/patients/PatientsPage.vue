<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md">
      <q-card>
        <!-- Sección: Información personal -->
        <q-card-section>
          <div class="text-h6">Información del Paciente</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="row items-start">
          <q-avatar size="100px" class="q-mr-md">
            <img
              :src="authStore.getUserInfo?.picture || patient.photo"
              alt="Foto del Paciente"
            />
          </q-avatar>
          <div>
            <div><strong>Nombre:</strong> {{ patient.name }}</div>
            <div><strong>Edad:</strong> {{ patient.age }} años</div>
            <div><strong>Género:</strong> {{ patient.gender }}</div>
            <div><strong>Teléfono:</strong> {{ patient.phone }}</div>
            <div><strong>Email:</strong> {{ patient.email }}</div>
            <div><strong>Dirección:</strong> {{ patient.address }}</div>
          </div>
        </q-card-section>

        <!-- Sección: Datos médicos -->
        <q-card-section>
          <div class="text-h6">Información Médica</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div>
            <strong>Alergias:</strong>
            {{ patient.medical.allergies.join(', ') || 'Ninguna' }}
          </div>
          <div>
            <strong>Enfermedades Crónicas:</strong>
            {{ patient.medical.chronicDiseases.join(', ') || 'Ninguna' }}
          </div>
          <div>
            <strong>Medicamentos:</strong>
            {{ patient.medical.medications.join(', ') || 'Ninguno' }}
          </div>
        </q-card-section>

        <!-- Sección: Historial de visitas médicas -->
        <q-card-section>
          <div class="text-h6">Historial de Visitas Médicas</div>
        </q-card-section>

        <q-separator />

        <!-- Tabla desplegable con transiciones -->
        <q-card-section>
          <q-table
            :rows="patient.visits"
            :columns="visitColumns"
            row-key="date"
            no-data-label="No hay visitas médicas registradas"
            :rows-per-page-options="[5]"
          >
            <template v-slot:body="props">
              <q-tr :props="props" @click="props.expand = !props.expand">
                <q-td key="icon" :props="props">
                  <!-- Icono de desplegable con rotación -->
                  <q-icon
                    :name="props.expand ? 'expand_more' : 'chevron_right'"
                    class="cursor-pointer transition-rotate"
                    :style="{
                      transform: props.expand
                        ? 'rotate(90deg)'
                        : 'rotate(0deg)',
                    }"
                  />
                </q-td>
                <q-td key="date" :props="props">{{ props.row.date }}</q-td>
                <q-td key="reason" :props="props">{{ props.row.reason }}</q-td>
                <q-td key="doctor" :props="props">{{ props.row.doctor }}</q-td>
                <q-td key="diagnosis" :props="props">{{
                  props.row.diagnosis
                }}</q-td>
              </q-tr>

              <!-- Fila expandida con transiciones -->
              <q-slide-transition>
                <q-tr v-if="props.expand">
                  <q-td :colspan="visitColumns.length + 1">
                    <div class="q-pa-md">
                      <p><strong>Detalles adicionales:</strong></p>
                      <ul>
                        <li><strong>Fecha:</strong> {{ props.row.date }}</li>
                        <li><strong>Motivo:</strong> {{ props.row.reason }}</li>
                        <li><strong>Médico:</strong> {{ props.row.doctor }}</li>
                        <li>
                          <strong>Diagnóstico:</strong>
                          {{ props.row.diagnosis }}
                        </li>
                      </ul>
                    </div>
                  </q-td>
                </q-tr>
              </q-slide-transition>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();

// Datos de ejemplo del paciente
const patient = ref({
  photo: 'https://via.placeholder.com/100',
  name: 'Kevin Mejia Torres',
  age: 21,
  gender: 'Masculino',
  phone: '123-456-7890',
  email: 'juan.perez@email.com',
  address: '123 Calle Falsa, Ciudad, País',
  medical: {
    allergies: ['Polen', 'Penicilina'],
    chronicDiseases: ['Hipertensión'],
    medications: ['Lisinopril'],
  },
  visits: [
    {
      date: '2024-01-15',
      reason: 'Chequeo General',
      doctor: 'Dr. García',
      diagnosis: 'Buen estado de salud',
    },
    {
      date: '2023-12-10',
      reason: 'Dolor de cabeza',
      doctor: 'Dra. Martínez',
      diagnosis: 'Migraña',
    },
    {
      date: '2023-11-02',
      reason: 'Control de presión arterial',
      doctor: 'Dr. Rodríguez',
      diagnosis: 'Hipertensión controlada',
    },
  ],
});
// Columnas para la tabla de historial de visitas
const visitColumns = [
  { name: 'date', label: 'Fecha', align: 'left' as const, field: 'date' },
  { name: 'reason', label: 'Motivo', align: 'left' as const, field: 'reason' },
  { name: 'doctor', label: 'Médico', align: 'left' as const, field: 'doctor' },
  {
    name: 'diagnosis',
    label: 'Diagnóstico',
    align: 'left' as const,
    field: 'diagnosis',
  },
];
</script>

<style scoped>
.q-page {
  max-width: 800px;
  margin: 0 auto;
}

.transition-rotate {
  transition: transform 0.3s ease;
}
</style>
