<script setup lang="ts">
import PovAuthor from '../author/PovAuthor.vue'
import { usePovState } from '../../store/state'
import { onMounted } from 'vue'

const povState = usePovState()
onMounted(() => {
  povState.pruneAuthorsToFollow()
})
</script>
<template>
  <ul
    v-if="povState.getAuthorsToFollow"
    class="w-full bg-ll-neutral dark:bg-ld-neutral p-5 rounded-md mb-5"
  >
    <li
      class="dark:text-gray-200 text-gray-700 text-lg border-b pb-3 border-ll-border dark:border-ld-border mb-4"
    >
      <p>Who to follow</p>
    </li>
    <div
      v-for="author in povState.getAuthorsToFollow"
      :key="author.handle"
      class="flex items-center mb-4"
    >
      <pov-author :author="author" />
    </div>
  </ul>
</template>
