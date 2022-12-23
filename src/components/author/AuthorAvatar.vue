<script setup lang="ts">
const props = defineProps({
  author: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
})
</script>

<template>
  <div
    class="avatar rounded-full bg-ll-base dark:bg-ld-base border-2 border-ll-border dark:border-ld-border relative"
  >
    <img
      :src="props.author.avatar"
      class="w-full h-full rounded-full object-cover"
      :alt="`${props.author.avatar} profile picture`"
    />
  </div>
</template>
