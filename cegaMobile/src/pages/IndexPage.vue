<script setup lang="ts">
	import { computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '../store/storeUser'

  const $router = useRouter()
  const userStore = useUserStore()
  const userName = computed(() => userStore.name)
  const userEmail = computed(() => userStore.email)
  const userLogin = computed(() => userStore.login)

  onMounted(() => {
    if (userLogin.value !== null) {
      $router.push('/orders')
		}
  })
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <b>Bienvenido {{userName}} <p>({{userEmail}})</p></b>
  </q-page>
</template>
