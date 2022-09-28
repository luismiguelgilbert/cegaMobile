<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="fas fa-bars"
					aria-label="Menu"
					@click="toggleLeftDrawer"
				/>

				<q-toolbar-title class="text-weight-bold">
					Cega App
				</q-toolbar-title>

			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="leftDrawerOpen"
			show-if-above
			bordered
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

<script setup lang="ts">
import { ref } from 'vue'
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue'
/* import { useQuasar } from 'quasar'

const $q = useQuasar()
$q.dark.set(true) */

const essentialLinks: EssentialLinkProps[] = [
  {
		title: 'Inicio',
    caption: 'Regresar a Inicio',
		icon: 'fas fa-home',
		link: '/'
	},
	{
    title: 'Orders',
    caption: 'Ver mis órdenes',
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
