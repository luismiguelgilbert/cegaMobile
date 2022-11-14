<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useOrdersStore } from '../../store/storeOrder'
  import { useUserStore } from '../../store/storeUser'
  import { useRouter } from 'vue-router'
  import { useQuasar } from 'quasar'

  const $q = useQuasar()
  const $router = useRouter()
  const userStore = useUserStore()
  const ordersStore = useOrdersStore()
  const myOrders = computed(() => ordersStore.orders)
  const userID = computed(() => userStore.login_id)
  // orden_trabajo_estado
  const orderIcon = (order) => {
    if (order.orden_trabajo_estado === 'Proceso') { return 'fas fa-play' }
    if (order.orden_trabajo_estado === 'Terminado') { return 'fas fa-square-check' }
    if (order.orden_trabajo_estado === 'Anulado') { return 'fas fa-trash-alt' }
  }

  onMounted(() => {
    $q.loading.show()
    ordersStore.loadOrders(userID.value)
    ordersStore.loadEquipos()
    $q.loading.hide()
  })

  const loadOrderData = (selectedOrder) => {
    try {
      ordersStore.selectOrder(selectedOrder)
      $router.push('/orderForm')
    } catch (error) {
      $q.notify({
        message: 'No se puede abrir la orden seleccionada',
        color: 'negative'
      })
    }
  }

</script>

<template>
  <q-page>
    <q-list
      v-if="myOrders"
      bordered
      separator>
      <q-item
        v-for="order in myOrders"
        :key="order.id"
        clickable
        v-ripple
        @click="loadOrderData(order)">
        <q-item-section avatar>
          <q-icon color="primary" name="fas fa-file-alt" />
        </q-item-section>

        <q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">{{order.customerName}} - ({{order.correlativo}})</q-item-label>
            <q-item-label class="text-weight-bold">Fecha: {{order.start_date_format}} {{order.start_time_format}}</q-item-label>
            <q-item-label caption lines="1">Telf: {{order.customerPhone}}</q-item-label>
            <q-item-label caption lines="2">Dir: {{order.customerAddress}}</q-item-label>
            <q-item-label caption lines="2">{{order.detalle_trabajo}}</q-item-label>
          </q-item-section>
        </q-item-section>

        <q-item-section avatar>
          <q-icon
            color="primary"
            :name="orderIcon(order)" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
