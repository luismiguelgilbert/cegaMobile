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
    v-model="thisOrder.correlativo"
    label="Orden de Trabajo"
  />
  <q-input
  filled readonly
    v-model="thisOrder.customerName"
    label="Cliente"
  />
  <q-input
  filled readonly
    v-model="thisOrder.customerAddress"
    label="Dirección"
  />
  <q-input
    filled readonly
    v-model="thisOrder.customerPhone"
    label="Teléfono"
  />
  <q-input
  filled readonly
    v-model="thisOrder.detalle_trabajo"
    label="Orden de Trabajo"
    type="textarea"
  />
  </q-form>
</template>
