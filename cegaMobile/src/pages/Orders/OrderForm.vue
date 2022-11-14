<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue'
  import { useOrdersStore } from '../../store/storeOrder'
  import { useRouter } from 'vue-router'
  // import { useQuasar } from 'quasar'

  import OrderFormBasic from './OrderFormBasic.vue'
  // import OrderFormContact from './OrderFormContact.vue'
  import OrderFormHardware from './OrderFormHardware.vue'

  // const $q = useQuasar()
  const $router = useRouter()
  const ordersStore = useOrdersStore()

  const selectedTab = ref('basic')

  onBeforeMount(() => {
    if (ordersStore.currentOrder === null) {
      $router.push('/orders')
    }
  })

</script>

<template>
  <q-page>
    <q-tab-panels
      v-model="selectedTab"
      animated
      vertical
      transition-prev="jump-up"
      transition-next="jump-up">
      <q-tab-panel name="basic">
        <OrderFormBasic />
      </q-tab-panel>
      <!--<q-tab-panel name="contact">
        <OrderFormContact />
      </q-tab-panel>-->
      <q-tab-panel name="hardware">
        <OrderFormHardware />
      </q-tab-panel>
    </q-tab-panels>

    <q-footer reveal elevated>
      <q-tabs
        v-model="selectedTab"
        no-caps>
        <q-tab name="basic" icon="fas fa-file-alt" label="General" />
        <!--<q-tab name="contact" icon="fas fa-users" label="Contacto" />-->
        <q-tab name="hardware" icon="fas fa-server" label="Informes" />
      </q-tabs>
    </q-footer>
  </q-page>
</template>
