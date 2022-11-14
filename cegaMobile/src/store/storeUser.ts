import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    login_id: 0,
    login: '',
    name: '',
    email: '',
    loadingStatus: false
  }),
  getters: {
    userNameEmail: (state) => `${state.name} - ${state.email}`
  },
  actions: {
    resetUserData () {
      this.login_id = 0
      this.login = ''
      this.name = ''
      this.email = ''
    }
  }
})
