<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { api } from 'boot/axios'
  import { useQuasar } from 'quasar'
  import { useUserStore } from '../store/storeUser'
  import { useOrdersStore } from '../store/storeOrder'
  import { useRouter } from 'vue-router'

  const $q = useQuasar()
  const $router = useRouter()
  const userStore = useUserStore()
  const ordersStore = useOrdersStore()

  const username = ref('admin')
  const password = ref('admin')

  onMounted(() => {
    userStore.resetUserData()
    ordersStore.resetOrdersData()
  })

  const login = async () => {
    $q.loading.show()
      await api.post(`${process.env.API}/api/users/login`, {
        username: username.value,
        password: password.value
       }).then(res => {
        $q.loading.hide()
        const { email, login, name } = res.data.data[0]
        $q.notify({ message: `Bienvenido ${name}!`, color: 'positive' })
        userStore.email = email
        userStore.login = login
        userStore.name = name
        userStore.login_id = res.data.data[0].login_id
        $router.push('/')
      }).catch(err => {
        console.log('HER!!!!!')
        $q.loading.hide()
        if (err.response) {
          $q.notify({ message: err.response.data.message, color: 'negative', multiLine: true })
        } else {
          $q.notify({ message: `Error de conexión con el servidor (${process.env.API})`, color: 'negative', multiLine: true })
        }
      })
  }
</script>

<template>
  <q-layout view="lHh Lpr fff" class="window-height">
    <q-page-container class="window-height">
      <q-page class="row justify-evenly">
        <q-form
          @submit.prevent="login"
          class="full-width q-pa-lg q-mt-xl"
        >
          <q-input
            outlined
            v-model="username"
            label="Su Usuario"
            placeholder="Ingrese su usuario"
            :rules="[ val => val && val.length > 0 || 'Por favor ingrese su usuario']"
          />

          <q-input
            class="q-pt-lg q-pb-xl"
            outlined
            v-model="password"
            type="password"
            label="Su contraseña *"
            :rules="[ val => val && val.length > 0 || 'Por favor ingrese su contraseña']"
          />
          <q-btn
            class="full-width"
            color="primary"
            type="submit"
            no-caps
            label="Login" />
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
