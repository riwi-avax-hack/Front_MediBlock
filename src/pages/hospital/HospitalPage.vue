<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">Administrar Médicos</div>
        </q-card-section>

        <q-separator />

        <!-- Formulario para agregar o editar médicos -->
        <q-form @submit="submitDoctor" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">
              {{ editMode ? 'Editar Médico' : 'Agregar Médico' }}
            </div>

            <q-input
              v-model="doctor.name"
              label="Nombre Completo"
              filled
              required
            />
            <q-input
              v-model="doctor.specialty"
              label="Especialidad"
              filled
              required
            />
            <q-input v-model="doctor.phone" label="Teléfono" filled />
            <q-input
              v-model="doctor.email"
              label="Email"
              type="email"
              filled
              required
            />
          </q-card-section>

          <!-- Botones -->
          <q-card-section>
            <q-btn
              type="submit"
              :label="editMode ? 'Guardar Cambios' : 'Agregar Médico'"
              color="primary"
            />
            <q-btn
              v-if="editMode"
              flat
              label="Cancelar"
              @click="cancelEdit"
              color="negative"
            />
          </q-card-section>
        </q-form>

        <q-separator />

        <!-- Tabla de médicos -->
        <q-card-section>
          <div class="text-h6">Lista de Médicos</div>

          <q-table
            :rows="doctors"
            :columns="doctorColumns"
            row-key="id"
            no-data-label="No hay médicos registrados"
          >
            <template v-slot:body-cell-actions="props">
              <q-td align="right">
                <q-btn
                  icon="edit"
                  @click="editDoctor(props.row)"
                  color="primary"
                  flat
                  round
                />
                <q-btn
                  icon="delete"
                  @click="deleteDoctor(props.row.id)"
                  color="negative"
                  flat
                  round
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Interfaz para los datos de un médico
interface Doctor {
  id: number | null;
  name: string;
  specialty: string;
  phone: string;
  email: string;
}

// Lista de médicos inicial
const doctors = ref<Doctor[]>([
  {
    id: 1,
    name: 'Dr. Juan Pérez',
    specialty: 'Cardiología',
    phone: '123-456-7890',
    email: 'juan.perez@hospital.com',
  },
  {
    id: 2,
    name: 'Dra. Ana Martínez',
    specialty: 'Neurología',
    phone: '321-654-0987',
    email: 'ana.martinez@hospital.com',
  },
]);

// Datos del formulario del médico
const doctor = ref<Doctor>({
  id: null, // El ID será null cuando estás agregando un nuevo médico
  name: '',
  specialty: '',
  phone: '',
  email: '',
});

// Modo de edición
const editMode = ref(false);

// Columnas para la tabla de médicos
const doctorColumns = [
  { name: 'name', label: 'Nombre', align: 'left' as const, field: 'name' },
  {
    name: 'specialty',
    label: 'Especialidad',
    align: 'left' as const,
    field: 'specialty',
  },
  { name: 'phone', label: 'Teléfono', align: 'left' as const, field: 'phone' },
  { name: 'email', label: 'Email', align: 'left' as const, field: 'email' },
  { name: 'actions', label: 'Acciones', align: 'right' as const, field: '' },
];

// Función para agregar o editar un médico
function submitDoctor() {
  if (editMode.value) {
    // Guardar cambios en el médico existente
    const index = doctors.value.findIndex((d) => d.id === doctor.value.id);
    if (index !== -1) {
      doctors.value[index] = { ...doctor.value } as Doctor; // Actualizar los datos del médico
    }
  } else {
    // Agregar un nuevo médico
    const newDoctor: Doctor = { ...doctor.value, id: Date.now() }; // Generar ID único
    doctors.value.push(newDoctor);
  }

  // Resetear el formulario y salir del modo de edición
  resetForm();
}

// Función para eliminar un médico
function deleteDoctor(id: number) {
  doctors.value = doctors.value.filter((doctor) => doctor.id !== id);
}

// Función para editar un médico existente
function editDoctor(selectedDoctor: Doctor) {
  doctor.value = { ...selectedDoctor }; // Copiar los datos del médico seleccionado al formulario
  editMode.value = true; // Cambiar a modo de edición
}

// Función para cancelar la edición
function cancelEdit() {
  resetForm();
}

// Función para resetear el formulario
function resetForm() {
  doctor.value = { id: null, name: '', specialty: '', phone: '', email: '' }; // Limpiar los datos del formulario
  editMode.value = false; // Salir del modo de edición
}
</script>

<style scoped>
.q-page {
  max-width: 900px;
  margin: 0 auto;
}
</style>
