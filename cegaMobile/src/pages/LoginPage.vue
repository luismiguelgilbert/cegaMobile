<script setup lang="ts">
  import { ref } from 'vue'
  const onSubmit = () => {
    console.log('onSubmit')
  }
  const onReset = () => {
    console.log('onReset')
  }
  const username = ref('')
  const password = ref('')
</script>

<template>
  <q-layout view="lHh Lpr fff" class="window-height">
    <q-page-container class="window-height">
      <q-page class="row justify-evenly">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="full-width q-pa-lg"
        >
          <q-input
            outlined
            v-model="username"
            label="Su Usuario"
            placeholder="Ingrese su usuario"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            class="q-pt-lg q-pb-xl"
            outlined
            v-model="password"
            type="password"
            label="Your age *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-btn
            class="full-width"
            color="primary"
            type="submit"
            to="/"
            no-caps
            label="Login" />
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
