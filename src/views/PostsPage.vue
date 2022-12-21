<script setup lang="ts">
import PostFeed from '../components/app/PostFeed.vue'
import CreatePost from '../components/app/CreatePost.vue'
import { getCurrentInstance } from 'vue'
import { useWindowSize } from '@vueuse/core'

const instance = getCurrentInstance()
const pageData = instance?.parent?.parent?.props
const { width } = useWindowSize()
</script>

<template>
  <div class="w-full">
    <create-post
      class="mt-2"
      :show-post-create="pageData?.showCreatePost === true"
      @on-close-create-post="pageData ? (pageData.showCreatePost = false) : false"
    />
    <post-feed
      :one-column="
        pageData?.leftMenuOpen === true && pageData?.rightMenuOpen === true && width < 1300
      "
    />
  </div>
</template>
