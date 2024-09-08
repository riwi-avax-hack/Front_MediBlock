<template>
  <div class="q-pa-md" style="max-width: 800px; margin: 0 auto">
    <div class="text-h6 text-center">Registrate en MediBlock</div>
    <div style="display: flex; align-items: center; justify-content: center">
      <img
        src="../../assets/logo-removebg.png"
        spinner-color="white"
        style="height: 150px; max-width: 150px; text-align: center"
      />
    </div>
    <!-- Selección del tipo de registro -->
    <q-select
      v-model="userType"
      :options="userOptions"
      label="Seleccione el tipo de registro"
      outlined
      @update:model-value="console.log(userType)"
    />

    <div class="q-mt-md text-center">
      <router-link to="/login" class="register-link">
        ¿Ya tienes una cuenta? <strong>Inicia Sesion</strong>
      </router-link>
    </div>

    <!-- Formulario de paciente -->
    <q-card v-if="userType?.value === 'patient'" class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Registro de nuevo paciente</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSubmitPatient" ref="patientForm">
          <q-input
            v-model="patient.names"
            label="Nombres"
            outlined
            :rules="[
              (val) => !!val || 'Nombres son requeridos',
              (val) => /^[a-zA-Z\s]+$/.test(val) || 'Solo se permiten letras',
              (val) => val.length >= 3 || 'Mínimo 3 caracteres',
            ]"
          />

          <q-input
            v-model="patient.lastNames"
            label="Apellidos"
            outlined
            :rules="[
              (val) => !!val || 'Apellidos son requeridos',
              (val) => /^[a-zA-Z\s]+$/.test(val) || 'Solo se permiten letras',
              (val) => val.length >= 3 || 'Mínimo 3 caracteres',
            ]"
          />

          <q-input
            v-model="patient.email"
            label="Correo Electrónico"
            type="email"
            outlined
            :rules="[
              (val) => !!val || 'Correo es requerido',
              (val) => /.+@.+\..+/.test(val) || 'Debe ser un correo válido',
            ]"
          />

          <q-input
            v-model="patient.password"
            label="Contraseña"
            type="password"
            outlined
            :rules="[
              (val) => !!val || 'Contraseña es requerida',
              (val) => val.length >= 6 || 'Mínimo 6 caracteres',
            ]"
          />

          <q-input
            v-model="patient.phoneNumber"
            label="Número de teléfono"
            type="tel"
            outlined
            :rules="[
              (val) => !!val || 'Número de teléfono es requerido',
              (val) => /^[0-9]+$/.test(val) || 'Debe ser un número válido',
              (val) => val.length >= 10 || 'Mínimo 10 dígitos',
            ]"
          />

          <q-select
            v-model="documentType"
            :options="documentTypeOptions"
            label="Seleccione el tipo de documento"
            outlined
            @update:model-value="console.log(documentType)"
            :rules="[(val) => !!val || 'Tipo de documento es requerido']"
          />

          <q-input
            v-model="patient.documentNumber"
            label="Número de Documento"
            outlined
            :rules="[
              (val) => !!val || 'Número de documento es requerido',
              (val) => /^[0-9]+$/.test(val) || 'Debe ser un número válido',
            ]"
          />

          <q-select
            v-model="genderType"
            :options="genderOptions"
            label="Seleccione el genero de nacimiento"
            outlined
            @update:model-value="console.log(genderType)"
            :rules="[(val) => !!val || 'Genero es requerido']"
          />

          <q-input
            v-model="patient.dateBirthday"
            label="Fecha de nacimiento"
            type="date"
            outlined
            :rules="[(val) => !!val || 'Fecha de nacimiento es requerida']"
          />

          <q-input
            v-model="patient.country"
            label="País de residencia"
            outlined
            :rules="[(val) => !!val || 'País es requerido']"
          />

          <q-input
            v-model="patient.city"
            label="Ciudad de residencia"
            outlined
            :rules="[(val) => !!val || 'Ciudad es requerida']"
          />

          <q-btn
            type="submit"
            label="Registrar Usuario"
            color="primary"
            class="q-mt-md"
          />
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Formulario de entidad médica -->
    <q-card v-if="userType?.value === 'entity'" class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Registro de Entidad Médica</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSubmitEntity" ref="entityForm">
          <q-input
            v-model="entity.name"
            label="Nombre de la Entidad"
            outlined
            :rules="[
              (val) => !!val || 'Nombre es requerido',
              (val) => /^[a-zA-Z\s]+$/.test(val) || 'Solo se permiten letras',
              (val) => val.length >= 3 || 'Mínimo 3 caracteres',
            ]"
          />

          <q-input
            v-model="entity.address"
            label="Dirección"
            outlined
            :rules="[(val) => !!val || 'Dirección es requerida']"
          />

          <q-input
            v-model="entity.phoneNumber"
            label="Número de Teléfono"
            type="tel"
            outlined
            :rules="[
              (val) => !!val || 'Número de teléfono es requerido',
              (val) => /^[0-9]+$/.test(val) || 'Debe ser un número válido',
              (val) => val.length >= 10 || 'Mínimo 10 dígitos',
            ]"
          />

          <q-input
            v-model="entity.email"
            label="Correo Electrónico"
            type="email"
            outlined
            :rules="[
              (val) => !!val || 'Correo es requerido',
              (val) => /.+@.+\..+/.test(val) || 'Debe ser un correo válido',
            ]"
          />

          <q-input
            v-model="entity.website"
            label="Sitio Web"
            type="url"
            outlined
            :rules="[
              (val) => !!val || 'Sitio web es requerido',
              (val) =>
                /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/.*)?$/.test(
                  val
                ) || 'Debe ser una URL válida',
            ]"
          />

          <q-input
            v-model="entity.nit"
            label="NIT de la Entidad"
            type="text"
            outlined
            :rules="[
              (val) => !!val || 'NIT es requerido',
              (val) => /^[0-9]+$/.test(val) || 'Debe ser un número válido',
            ]"
          />

          <q-input
            v-model="entity.country"
            label="País de operación"
            outlined
            :rules="[(val) => !!val || 'País es requerido']"
          />

          <q-btn
            type="submit"
            label="Registrar Entidad"
            color="primary"
            class="q-mt-md"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Patient {
  names: string;
  lastNames: string;
  email: string;
  password: string;
  phoneNumber: string;
  documentType: string;
  documentNumber: string;
  gender: string;
  dateBirthday: string;
  country: string;
  city: string;
}

interface Entity {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  website: string;
  nit: string;
  country: string;
}

const userOptions = [
  { label: 'Paciente', value: 'patient' },
  { label: 'Entidad Médica', value: 'entity' },
];

const userType = ref<{ label: string; value: string } | null>(null);

const documentTypeOptions = [
  { label: 'CC', value: 'cc' },
  { label: 'Registro Nacimiento', value: 'RN' },
  { label: 'Cedula Extrangera', value: 'CE' },
];

const documentType = ref<{ label: string; value: string } | null>(null);

const genderOptions = [
  { label: 'Femenino', value: 'female' },
  { label: 'Masculino', value: 'male' },
];

const genderType = ref<{ label: string; value: string } | null>(null);

// Estado del formulario de paciente
const patient = ref<Patient>({
  names: '',
  lastNames: '',
  email: '',
  password: '',
  phoneNumber: '',
  documentType: '',
  documentNumber: '',
  gender: '',
  dateBirthday: '',
  country: '',
  city: '',
});

// Estado del formulario de entidad médica
const entity = ref<Entity>({
  name: '',
  address: '',
  phoneNumber: '',
  email: '',
  website: '',
  nit: '',
  country: '',
});

// Función para registrar paciente
const onSubmitPatient = () => {
  const form = ref('patientForm');
  if (form.value) {
    console.log('Paciente registrado:', patient.value);
  } else {
    console.log('Errores en el formulario de paciente');
  }
};

// Función para registrar entidad médica
const onSubmitEntity = () => {
  const form = ref('entityForm');
  if (form.value) {
    console.log('Entidad médica registrada:', entity.value);
  } else {
    console.log('Errores en el formulario de entidad médica');
  }
};
</script>

<style scoped>
.q-mb-md {
  margin-bottom: 16px;
}

.q-pa-md {
  padding: 16px;
}

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
