<script setup lang="ts">
import Pov from 'vue-ionicons/dist/md-bonfire.vue'

const props = defineProps({
  expanded: {
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
</script>
<template>
  <div v-if="props.full">
    <span class="point">Point</span>
    <span class="point-o align-top">o</span>
    <pov class="mt-1 align-middle" w="40" h="40"></pov>
    <span class="point-of align-top">f</span>
    <span class="point-of-view">Vue</span>
  </div>
  <div v-else-if="props.expanded">
    <!-- <span class="point">Point</span> -->
    <!-- <span class="point-o align-top">o</span> -->
    <span class="text-xl ml-2 -mr-2">P</span>
    <pov class="mt-1 align-middle" w="40" h="40"></pov>
    <!-- <span class="point-of align-top">f</span> -->
    <span class="text-xl -ml-2">V</span>
    <span v-if="!props.condensed" class="text-xl">ue</span>
    <!-- <span class="point-of-view">Vue</span> -->
  </div>
  <div v-else>
    <pov class="align-middle" w="40" h="40"></pov>
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
}
</style>
