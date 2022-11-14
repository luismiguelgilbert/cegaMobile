<script setup lang="ts">
	import { computed, ref, onMounted } from 'vue'
	import { useUserStore } from '../store/storeUser'
	import { useRouter } from 'vue-router'
	import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue'

	const $router = useRouter()
	const userStore = useUserStore()

	const userLogin = computed(() => userStore.login)

	onMounted(() => {
    if (userLogin.value === null || userLogin.value.length <= 0) {
			$router.push('/Login')
		}
  })

	const essentialLinks: EssentialLinkProps[] = [
		{
			title: 'Actividades',
			caption: 'Ver mis actividades',
			icon: 'fas fa-list',
			link: '/orders'
		},
		{
			title: 'Salir',
			caption: 'Cierra sesión',
			icon: 'fas fa-door-open',
			link: '/login'
		}
	]

	const leftDrawerOpen = ref(false)

	function toggleLeftDrawer () {
		leftDrawerOpen.value = !leftDrawerOpen.value
	}
</script>

<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar class="q-pr-none">
				<q-btn
					flat
					dense
					round
					icon="fas fa-bars"
					aria-label="Menu"
					label="Cega App"
					@click="toggleLeftDrawer"
				/>

				<q-toolbar-title />

				<q-btn
					:label="userLogin"
					stretch
					flat
					no-caps
					icon="fas fa-user" />

			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="leftDrawerOpen"
			show-if-above
			bordered
			:overlay="false"
		>
			<q-list>
				<q-item-label
					header
				>
					Cega App
				</q-item-label>

				<EssentialLink
					v-for="link in essentialLinks"
					:key="link.title"
					v-bind="link"
				/>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>
