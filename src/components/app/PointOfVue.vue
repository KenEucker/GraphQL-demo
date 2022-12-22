<script setup lang="ts">
import { computed } from 'vue'
import Pov from 'vue-ionicons/dist/md-bonfire.vue'

const props = defineProps({
  expanded: {
    type: Boolean,
    default: true,
  },
  rainbow: {
    type: Boolean,
    default: true,
  },
  condensed: {
    type: Boolean,
    default: true,
  },
  full: {
    type: Boolean,
    default: false,
  },
})

// /linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))
const fancyClass = computed(() =>
  props.rainbow === true
    ? 'bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-600 via-orange-200'
    : ''
)
</script>
<template>
  <div v-if="props.full">
    <span class="point" :class="fancyClass">Point</span>
    <span class="point-o align-top" :class="fancyClass">o</span>
    <img class="mt-1 align-middle w-12 h-12 inline" src="/img/pov.svg" />
    <!-- <pov class="mt-1 align-middle" w="40" h="40"></pov> -->
    <span class="point-of align-top" :class="fancyClass">f</span>
    <span class="point-of-view" :class="fancyClass">Vue</span>
  </div>
  <div v-else-if="props.expanded">
    <!-- <span class="point">Point</span> -->
    <!-- <span class="point-o align-top">o</span> -->
    <span class="text-xl ml-2 -mr-2" :class="fancyClass">P</span>
    <img class="mt-1 align-middle w-12 h-12 inline" src="/img/pov.svg" />
    <!-- <pov class="mt-1 align-middle" w="40" h="40"></pov> -->
    <!-- <span class="point-of align-top">f</span> -->
    <span class="text-xl -ml-2" :class="fancyClass">V</span>
    <span v-if="!props.condensed" class="text-xl" :class="fancyClass">ue</span>
    <!-- <span class="point-of-view">Vue</span> -->
  </div>
  <div v-else>
    <img class="mt-1 align-middle w-12 h-12 inline" src="/img/pov.svg" />
    <!-- <pov class="align-middle" w="40" h="40"></pov> -->
  </div>
</template>
<style lang="scss" scoped>
.point {
  font-size: 20px;

  &-o {
    margin-right: -10px;
    padding-left: 8px;
    font-size: 25px;

    &f {
      margin-left: -8px;
      padding-right: 8px;
      font-size: 25px;

      &-view {
        font-size: 20px;
      }
    }
  }
  color: linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8));
}
</style>
