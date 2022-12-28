<script setup lang="ts">
import { computed } from 'vue'
import ExtraSpecialCheckmark from '../atomic/VerifiedCheckmark.vue'
import AuthorAvatar from './AuthorAvatar.vue'
import AuthorHandle from './AuthorHandle.vue'
import AuthorStatus from './AuthorStatus.vue'
import AuthorName from './AuthorName.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
  goToAuthorPage: {
    type: Boolean,
    default: true,
  },
})

const classes = computed(() => {
  switch (props.size) {
    case 'large':
      return 'w-50 h-50'
    case 'medium':
      return 'w-40 h-40'
    case 'small':
    default:
      return 'w-15 h-15'
  }
})

const goToAuthorPage = props.goToAuthorPage
  ? () => {
      router.push(`/${props.author.handle}`)
    }
  : () => {
      /// nothing to do
    }
</script>
<template>
  <div class="flex relative" :class="props.size === 'large' ? 'inline-grid' : 'items-center'">
    <extra-special-checkmark v-if="author.verified" :size="props.size" class="special-aint-ya" />
    <author-avatar
      :author="props.author"
      :class="`${props.goToAuthorPage ? 'cursor-pointer' : ''} ${classes}`"
      @click="goToAuthorPage"
    />
    <div
      v-if="!props.imageOnly"
      class="flex flex-col ml-2 text-left"
      :class="props.size === 'medium' ? 'mt-20' : ''"
    >
      <p class="text-2xl font-bold text-gray-800 dark:text-gray-300">
        <author-name :author="props.author" />
      </p>
      <p class="-mt-1"><author-handle :author="props.author" /></p>
      <p class="mt-1 text-center"><author-status :author="props.author" /></p>
    </div>
  </div>
</template>
