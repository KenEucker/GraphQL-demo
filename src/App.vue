<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from './components/layouts/AppLayout.vue'
import HeaderBar from './components/app/HeaderBar.vue'
import SlideMenuLeft from './components/app/SlideMenuLeft.vue'
import SlideMenuRight from './components/app/SlideMenuRight.vue'
import { useRouter } from 'vue-router'

const { currentRoute } = useRouter()

/// TODO: get these values from the route config
const leftMenuOpen = ref(false)
const rightMenuOpen = ref(false)
const showCreatePost = ref(true)
</script>
<template>
  <app-layout
    :left-menu-open="leftMenuOpen"
    :right-menu-open="rightMenuOpen"
    :show-create-post="showCreatePost"
  >
    <template #header>
      <header-bar
        :display-right-menu-button="!currentRoute.meta.hideRightMenu"
        :left-menu-open="leftMenuOpen"
        :right-menu-open="rightMenuOpen"
        @on-menu-click="leftMenuOpen = !leftMenuOpen"
        @on-right-menu-click="rightMenuOpen = !rightMenuOpen"
      >
      </header-bar>
    </template>
    <template #leftMenu>
      <slide-menu-left
        :is-expanded="leftMenuOpen"
        @on-login-click="leftMenuOpen = true"
        @on-open-create-post="showCreatePost = true"
        @on-close-menu="
          (v) => {
            leftMenuOpen = v
          }
        "
      >
      </slide-menu-left>
    </template>
    <template v-if="!currentRoute.meta.hideRightMenu" #rightMenu>
      <slide-menu-right> </slide-menu-right>
    </template>
    <template #body>
      <router-view :key="$route.fullPath"></router-view>
    </template>
  </app-layout>
</template>
