<script setup lang="ts">
import AuthorStatus from './AuthorStatus.vue'
const props = defineProps({
  author: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
  showStatus: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="avatar rounded-full bg-ll-base dark:bg-ld-base border-2 border-ll-border dark:border-ld-border relative"
  >
    <img
      :src="props.author.avatar"
      class="rounded-full object-cover w-full h-full"
      :alt="`${props.author.avatar} profile picture`"
    />
  </div>
</template>
