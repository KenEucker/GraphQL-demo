<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  variant: {
    type: String,
    default: 'green',
  },
})
const classes = computed(() => {
  const [color, size] = props.variant.split('-')
  let hColor = color
  let hoverColor = ''
  let hoverSize = ''

  switch (color) {
    case 'like':
      hColor = 'red'
      break
    case 'love':
      hColor = 'purple'
      break
    case 'repost':
      hColor = 'green'
      break
    case 'share':
      hColor = 'blue'
      break
    default:
      break
  }
  hoverColor = hColor ? `${hColor}-600` : ''
  switch (size) {
    case 'thick':
      hoverSize = '-xl'
      break
    default:
      hoverSize = ''
      break
  }

  return `${hoverColor.length ? `hover:shadow-${hoverColor}` : ''} ${
    hoverSize.length ? `hover:shadow${hoverSize}` : ''
  } h-${hColor}`
})
</script>

<template>
  <button
    v-motion
    class="flex transition-transform transform rounded-full active:scale-95"
    :class="classes"
    :initial="{
      y: 4,
      scale: 1,
    }"
    :enter="{
      y: 0,
      scale: 1,
    }"
    :tapped="{
      scale: 1.5,
    }"
  >
    <slot></slot>
  </button>
</template>
<style lang="scss" scoped>
.h-blue {
  &-active {
    color: #017acc;
  }

  &:hover {
    filter: drop-shadow(0 0 4px #017acc);
    color: #017acc;
  }
}

.h-purple {
  &-active {
    color: #646cffaa;
  }

  &:hover {
    filter: drop-shadow(0 0 4px #646cffaa);
    color: #646cffaa;
  }
}

.h-pink {
  &-active {
    color: #c025d3;
  }

  &:hover {
    filter: drop-shadow(0 0 4px #c025d3);
    color: #c025d3;
  }
}

.h-green {
  &-active {
    color: #42b883;
  }

  &:hover {
    filter: drop-shadow(0 0 4px #42b883);
    color: #42b883;
  }
}

.h-red {
  &-active {
    color: #ba2c60;
  }

  &:hover {
    filter: drop-shadow(0 0 4px #ba2c60);
    color: #ba2c60;
  }
}
</style>
