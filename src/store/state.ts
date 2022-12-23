import { defineStore } from 'pinia'
import { Author } from '../schema/generated/types'

const getInitialMenuState = (): {
  createPostOpen: boolean
  leftMenuOpen: boolean
  rightMenuOpen: boolean
} => ({
  createPostOpen: false,
  leftMenuOpen: true,
  rightMenuOpen: true,
})
export const useMenusState = defineStore('useMenusState', {
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

const getInitialAuthorState = (): { loggedIn: boolean; author: Author } => ({
  loggedIn: false,
  author: {
    id: 0,
    avatar: '',
    email: '',
    name: '',
    handle: '',
  },
})
export const useAuthorState = defineStore({
  id: 'useAuthorState',
  state: getInitialAuthorState,
  getters: {
    isLoggedIn: (s) => s.loggedIn,
    getAuthor: (s) => s.author,
    getAuthorId: (s) => s.author?.id ?? 0,
  },
  actions: {
    login(author: Author) {
      this.author = author
      this.loggedIn = true
    },
    logout(id: number) {
      this.loggedIn = false
    },
  },
})
