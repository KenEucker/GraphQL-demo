<script setup lang="ts">
import PostFeed from '../components/post/PostFeed.vue'
import CreatePost from '../components/post/CreatePost.vue'
import { useWindowSize } from '@vueuse/core'
import { useMenuState } from '../store/state'

const state = useMenuState()
const { width } = useWindowSize()
</script>

<template>
  <div class="w-full">
    <create-post
      class="mt-2"
      :is-open="state.isCreatePostOpen"
      @on-open="state.openCreatePost()"
      @on-close="state.closeCreatePost()"
    />
    <post-feed
      :one-column="state.leftMenuOpen === true && state.rightMenuOpen === true && width < 1300"
    />
  </div>
</template>
