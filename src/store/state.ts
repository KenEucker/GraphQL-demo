import { defineStore } from 'pinia'

export const useisCreatePostOpen = defineStore({
  id: 'isCreatePostOpen',
  state: () => ({
    isCreatePostOpen: true,
  }),
  getters: {
    isCreatePostOpen: (state) => state.isCreatePostOpen,
  },
  actions: {
    toggleCreaetPostOpen() {
      this.isCreatePostOpen = !this.isCreatePostOpen
    },
  },
})

export const useCurrentUser = defineStore({
  id: 'useCurrentUser',
  state: () => ({
    currentUser: null,
  }),
  actions: {
    login(email: string) {
      console.log('login')
    },
  },
})
