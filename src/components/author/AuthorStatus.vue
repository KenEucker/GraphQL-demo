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
  {{ props.author.status }}
</template>
