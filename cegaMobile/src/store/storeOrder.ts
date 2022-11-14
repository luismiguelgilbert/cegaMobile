import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
    equipos: [],
    currentOrder: null
  }),
  getters: {
    // userNameEmail: (state) => `${state.name} - ${state.email}`
  },
  actions: {
    async loadOrders (userID: number) {
      const res = await api.get(`${process.env.API}/api/orders/byUser/${userID}`)
      this.orders = res.data
    },
    async loadEquipos () {
      const res = await api.get(`${process.env.API}/api/orders/equipos`)
      this.equipos = res.data
    },
    resetOrdersData () {
      this.orders = []
    },
    selectOrder (selectedOrder) {
      this.currentOrder = selectedOrder
    },
    async guardarInforme (orderData: unknown, equipoData: unknown, userID: number): Promise<unknown> {
      const res = await api.post(`${process.env.API}/api/orders/guardar-informe`, {
        orderData,
        equipoData,
        userID
      })
      return res.data
    },
    async guardarInformeImagen (informeEquipoID: number, equipoData: unknown, userID: number): Promise<unknown> {
      const res = await api.post(`${process.env.API}/api/orders/guardar-informe-imagen`, {
        informeEquipoID,
        equipoData,
        userID
      })
      return res.data
    }
  }
})
