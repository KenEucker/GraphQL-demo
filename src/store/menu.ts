import { defineStore } from 'pinia'

export const getInitialMenuState = (): {
  createPostOpen: boolean
  leftMenuOpen: boolean
  rightMenuOpen: boolean
} => ({
  createPostOpen: false,
  leftMenuOpen: false,
  rightMenuOpen: false,
})

export const useMenuState = defineStore('useMenuState', {
  state: getInitialMenuState,
  getters: {
    isCreatePostOpen: (s) => s.createPostOpen,
    isLeftMenuOpen: (s) => s.leftMenuOpen,
    isRightMenuOpen: (s) => s.rightMenuOpen,
  },
  actions: {
    closeCreatePost() {
      this.createPostOpen = false
    },
    openCreatePost() {
      this.createPostOpen = true
    },
    toggleLeftMenu() {
      this.leftMenuOpen = !this.leftMenuOpen
    },
    closeLeftMenu() {
      this.leftMenuOpen = false
    },
    openLeftMenu() {
      this.leftMenuOpen = true
    },
    toggleRightMenu() {
      this.rightMenuOpen = !this.rightMenuOpen
    },
    closeRightMenu() {
      this.rightMenuOpen = false
    },
    openRightMenu() {
      this.rightMenuOpen = true
    },
  },
})
