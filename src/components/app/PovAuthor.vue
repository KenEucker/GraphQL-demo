<script setup lang="ts">
import { computed } from 'vue'
import ExtraSpecialCheckmark from './VerifiedCheckmark.vue'

const props = defineProps({
  author: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
  imageOnly: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'small',
  },
})

const classes = computed(() => {
  switch (props.size) {
    case 'large':
      return 'w-50 h-50'
    case 'small':
    default:
      return 'w-15 h-15'
  }
})
</script>
<template>
  <div class="flex items-center relative">
    <extra-special-checkmark v-if="author.verified" :size="props.size" />
    <div
      class="avatar rounded-full bg-ll-base dark:bg-ld-base border-2 border-ll-border dark:border-ld-border relative"
      :class="classes"
    >
      <img
        :src="props.author.avatar"
        class="w-full h-full rounded-full object-cover"
        :alt="`${props.author.avatar} profile picture`"
      />
    </div>
    <div v-if="!props.imageOnly" class="flex flex-col ml-2">
      <p class="text-2xl font-bold text-gray-800 dark:text-gray-300">
        {{ props.author.name }}
      </p>
      <p class="-mt-1">{{ props.author.handle }}</p>
      <p class="-mt-1">{{ props.author.status }}</p>
    </div>
  </div>
</template>
