<script setup lang="ts">
const url = `${process.env.GRAPH_URL}:${process.env.GRAPH_PORT}/${process.env.GRAPH_PATH}`
</script>

<template>
  <div class="w-full h-600">
    <iframe class="w-full h-full" :src="url" />
  </div>
</template>
