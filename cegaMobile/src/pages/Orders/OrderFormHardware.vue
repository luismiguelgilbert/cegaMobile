<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useQuasar } from 'quasar'
  import { useOrdersStore } from '../../store/storeOrder'
  import { useUserStore } from '../../store/storeUser'

  const $q = useQuasar()
  const userStore = useUserStore()
  const ordersStore = useOrdersStore()
  const userID = computed(() => userStore.login_id)
  const thisOrder = computed(() => ordersStore.currentOrder)
  const equipos = computed(() => ordersStore.equipos.filter(x => x.cliente === thisOrder.value.cliente))
  const equipoSeleccionado = ref('')
  const equipoSeleccionadoLabel = computed(() => equipoSeleccionado.value
    ? `${equipoSeleccionado.value.serie} - ${equipoSeleccionado.value.modelo}`
    : 'Seleccione equipo')

  async function guardarInforme () {
    try {
      $q.loading.show()
      const resultado = await ordersStore.guardarInforme(thisOrder.value, equipoSeleccionado.value, userID.value)
      const informeEquipoID = resultado[0].informe_equipo_id
      /* console.log('guardando imagen')
      const resultadoImagen = await ordersStore.guardarInformeImagen(informeEquipoID, equipoSeleccionado.value, userID.value)
      console.log('resultadoImagen')
      console.log(resultadoImagen) */
      $q.loading.hide()
      $q.notify({
        message: 'Informe guardardo correctamente',
        color: 'positive',
        html: true
      })
    } catch (error) {
      $q.loading.hide()
      $q.notify({
        message: `No se pudo guardar informe.<br/>${error.message}`,
        color: 'negative',
        html: true
      })
    }
    /* .then(res => {
      console.log('!!!!!!!! qqq !!!!!!!!!')
      console.log(res)
      console.log('!!!!!!!! ttt !!!!!!!!!')
      alert(res.data[0].informe_equipo_id)
      console.log('!!!!!!!! xxx !!!!!!!!!')
      // console.log(res.data)
      // console.log('!!!!!!!! mmm !!!!!!!!!')
      // const informeEquipoID = resultado.data[0].informe_equipo_id
      // console.log(informeEquipoID)
      $q.loading.hide()
      $q.notify({
        message: 'Informe guardado correctamente.',
        color: 'positive',
        multiLine: true
      })
    }).catch(err => {
      $q.loading.hide()
      $q.notify({
        message: `No se pudo guardar informe.<br/>${err.message}`,
        color: 'negative',
        html: true
      })
    }) */
  }

</script>
<template>
  <q-form class="full-width q-pa-lg q-gutter-y-md">

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
    <q-btn-dropdown
      size="lg"
      class="glossy q-ml-lg full-width"
      color="primary"
      :label="equipoSeleccionadoLabel">
      <q-list>
        <q-item
          :key="equipo.equipos_id"
          v-for="equipo in equipos"
          clickable
          v-close-popup
          @click="equipoSeleccionado = equipo">
          <q-item-section>
            <q-item-section>
              <q-item-label>{{ equipo.serie }} - {{ equipo.modelo }}</q-item-label>
              <q-item-label caption>{{ equipo.marca_equipo }}</q-item-label>
            </q-item-section>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <!--<q-select
      filled
      v-model="equipoSeleccionado"
      :options="equipos"
      option-value="equipos_id"
      option-label="serie"
      label="Seleccione el equipo" >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label>{{ scope.opt.serie }} - {{ scope.opt.modelo }}</q-item-label>
            <q-item-label caption>{{ scope.opt.marca_equipo }}</q-item-label>
            <q-item-label caption>{{ scope.opt.cliente }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>-->

    <!--<q-file
      filled
      v-model="equipoSeleccionado.archivo"
      label="Incluir archivo o imagen" />-->
    <q-input
      filled
      type="file"
      v-model="equipoSeleccionado.archivo"
      label="Incluir archivo o imagen"/>

    <q-input
      filled
      :readonly="!equipoSeleccionado"
      v-model="equipoSeleccionado.informeTecnico"
      label="Informe técnico"
      type="textarea"
      rows="20"
      :input-style="$attrs['input-style'] || 'min-height: 150px'"
    />
    <q-btn
      class="full-width q-mt-xl"
      no-caps
      color="positive"
      icon-right="fas fa-save"
      label="Guardar Informe"
      @click="guardarInforme" />
  </q-form>
</template>
