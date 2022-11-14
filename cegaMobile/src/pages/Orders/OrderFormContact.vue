<script setup lang="ts">
  import { computed } from 'vue'
  import { useOrdersStore } from '../../store/storeOrder'

  const ordersStore = useOrdersStore()
  const thisOrder = computed(() => ordersStore.currentOrder)

</script>
<template>
  <q-form
  v-if="ordersStore.currentOrder !== null"
  class="full-width q-pa-lg q-gutter-y-md">
  <q-input
    filled readonly
    v-model="thisOrder.contactName"
    label="Persona de Contacto"
  />
  <q-input
  filled readonly
    v-model="thisOrder.contactPhone"
    label="Teléfono de Contacto"
  />
  <q-input
  filled readonly
    v-model="thisOrder.contactMail"
    label="Mail de Contacto"
  />
  <q-input
    filled readonly
    v-model="thisOrder.contactArea"
    label="Área"
  />
  </q-form>
</template>
