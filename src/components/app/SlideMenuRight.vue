<script setup lang="ts">
import WhatsHappening from './WhatsHappening.vue'
import FollowMore from './FollowMore.vue'
import AboutThisPage from './AboutThisPage.vue'
</script>
<template>
  <div class="w-full h-full flex flex-col py-2 px-2 bg-ll-base dark:bg-ld-base overflow-y-auto">
    <about-this-page />
    <whats-happening />
    <follow-more />
  </div>
</template>
