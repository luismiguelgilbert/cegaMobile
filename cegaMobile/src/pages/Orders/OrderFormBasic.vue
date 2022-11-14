<script setup lang="ts">
  import { computed } from 'vue'
  import { useOrdersStore } from '../../store/storeOrder'

  const ordersStore = useOrdersStore()
  const thisOrder = computed(() => ordersStore.currentOrder)
  const formattedDateTime = computed(() => `${ordersStore.currentOrder.start_date_format} - ${ordersStore.currentOrder.start_time_format}`)

</script>
<template>
  <q-form
  v-if="ordersStore.currentOrder !== null"
  class="full-width q-pa-lg q-gutter-y-md">
    <!--<q-input
      filled readonly
      v-model="thisOrder.id"
      label="# Actividad"
    />
    <q-input
    filled readonly
      v-model="thisOrder.detalle_actividad"
      label="Detalle de Actividad"
      type="textarea"
    />-->
    <q-input
      filled readonly
      v-model="thisOrder.correlativo"
      label="Correlativo de Actividad"
    />
    <q-input
      filled readonly
      v-model="formattedDateTime"
      label="Fecha"
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
      rows="20"
      :input-style="$attrs['input-style'] || 'min-height: 150px'"
    />
  </q-form>
</template>
