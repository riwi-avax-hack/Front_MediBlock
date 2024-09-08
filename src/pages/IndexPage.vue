<template>
  <!-- Sección principal (hero) -->
  <section class="hero bg-primary text-white q-pa-md">
    <div class="hero-content text-center" data-aos="fade-up">
      <!-- Espacio para el logo -->
      <div class="q-mb-md">
        <img
          src="../assets/logo-removebg.png"
          alt="MediBlock Logo"
          height="150"
        />
      </div>
      <h1 class="q-mb-md">Toma el Control de Tu Historia Clínica</h1>
      <p class="text-h6 q-mb-md">
        Con MediBlock, tú eres el dueño de tu información médica. Protegida con
        la seguridad de la tecnología blockchain.
      </p>
      <q-btn size="lg" color="secondary" label="Empieza Ahora" to="/register" />
    </div>
  </section>

  <!-- Sección de características -->
  <section id="features" class="q-pa-xl bg-light q-mt-lg">
    <div class="text-center q-mb-lg" data-aos="fade-up">
      <h2 class="text-primary">Características Clave</h2>
      <p class="text-h6">
        Descubre por qué MediBlock es la mejor opción para la seguridad de tu
        historia clínica
      </p>
    </div>

    <!-- Tarjetas alineadas con animaciones -->
    <div class="row justify-center q-gutter-md no-wrap">
      <q-card
        flat
        bordered
        class="q-pa-md col-12 col-md-4"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <q-icon name="lock" color="primary" size="50px" />
        <q-card-section>
          <h3 class="q-mb-none">Seguridad Blockchain</h3>
          <p class="text-subtitle2">
            Tu información médica está cifrada y protegida usando tecnología de
            blockchain, garantizando seguridad total.
          </p>
        </q-card-section>
      </q-card>

      <q-card
        flat
        bordered
        class="q-pa-md col-12 col-md-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <q-icon name="sync" color="primary" size="50px" />
        <q-card-section>
          <h3 class="q-mb-none">Portabilidad de Datos</h3>
          <p class="text-subtitle2">
            Tus datos médicos están siempre contigo, sin importar la entidad de
            salud donde estés registrado.
          </p>
        </q-card-section>
      </q-card>

      <q-card
        flat
        bordered
        class="q-pa-md col-12 col-md-4"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <q-icon name="verified_user" color="primary" size="50px" />
        <q-card-section>
          <h3 class="q-mb-none">Privacidad Garantizada</h3>
          <p class="text-subtitle2">
            Solo tú decides quién accede a tu historia clínica, con controles
            granulares sobre la privacidad.
          </p>
        </q-card-section>
      </q-card>
    </div>
  </section>

  <!-- Sección de cómo funciona -->
  <section id="security" class="q-pa-xl bg-primary text-white q-mt-lg">
    <div class="text-center q-mb-lg" data-aos="fade-up">
      <h2>Cómo Funciona MediBlock</h2>
      <p class="text-h6">
        Con tecnología blockchain, tus datos son inmutables y 100% seguros. Aquí
        te explicamos cómo.
      </p>
    </div>
    <div class="row justify-center q-gutter-md no-wrap">
      <q-card
        flat
        bordered
        class="q-pa-md col-12 col-md-5 card-dark-text"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <q-icon name="account_circle" color="primary" size="50px" />
        <q-card-section>
          <h3>Propiedad de Datos</h3>
          <p>
            Tú tienes el control completo de tus datos médicos. Puedes
            compartirlos, revocar accesos, o simplemente tenerlos seguros para
            ti.
          </p>
        </q-card-section>
      </q-card>

      <q-card
        flat
        bordered
        class="q-pa-md col-12 col-md-5 card-dark-text"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <q-icon name="security" color="primary" size="50px" />
        <q-card-section>
          <h3>Cifrado Seguro</h3>
          <p>
            Cada bloque de tu información está protegido con un cifrado de
            última generación, haciéndolo inaccesible para terceros no
            autorizados.
          </p>
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Inicializamos AOS al montar el componente
onMounted(() => {
  AOS.init({
    duration: 800, // Duración de la animación en milisegundos
    once: true, // Si la animación debe ejecutarse una sola vez
  });
});
</script>

<style scoped>
/* Hero */
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}

.hero-content {
  max-width: 700px;
  margin: 0 auto;
}

/* Evitar que las tarjetas se rompan en varias filas */
.row {
  flex-wrap: nowrap;
}

.bg-light {
  background-color: #f5f5f5;
}

.no-wrap {
  flex-wrap: nowrap;
}

.card-dark-text {
  background-color: white;
  color: black;
}
</style>
