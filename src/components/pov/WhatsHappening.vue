<script setup lang="ts">
import { reactive } from 'vue'
const trending = reactive([
  {
    index: 0,
    title: 'Sports · trending',
    label: '#WorldCupRiots',
    stats: '9M Posts',
  },
  {
    index: 0,
    title: 'Entertainment',
    label: '#ChristmasMovies',
    stats: '12.3M Posts',
  },
  {
    index: 0,
    title: 'Politics · this year',
    label: '#StudentDebt',
    stats: '25.2K Posts',
  },
])
</script>
<template>
  <ul class="w-full bg-ll-neutral dark:bg-ld-neutral p-5 rounded-md mb-5">
    <li
      class="dark:text-gray-200 text-gray-700 text-lg border-b pb-3 border-ll-border dark:border-ld-border"
    >
      <p>What's happening</p>
    </li>
    <li class="mb-4 mt-2">
      <p class="text-lg dark:text-gray-200 text-gray-700 font-bold">#WorldWarIII</p>
      <p class="text-xs">Will there be nukes?</p>
    </li>
    <li v-for="(trend, index) in trending" :key="index" class="mb-4">
      <p class="text-xs">{{ trend.title }}</p>
      <p class="text-lg dark:text-gray-200 text-gray-700 font-bold">{{ trend.label }}</p>
      <p class="text-xs">{{ trend.stats }}</p>
    </li>
  </ul>
</template>
