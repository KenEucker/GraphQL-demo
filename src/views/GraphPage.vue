<script setup lang="ts">
import { graphUrl } from '../utilities'
</script>

<template>
  <div class="w-full h-600">
    <iframe class="w-full h-full" :src="graphUrl" />
  </div>
</template>
