<script setup lang="ts">
import { computed } from 'vue'
import ExtraSpecialCheckmark from '../atomic/VerifiedCheckmark.vue'
import AuthorAvatar from './AuthorAvatar.vue'
import AuthorHandle from './AuthorHandle.vue'
import AuthorStatus from './AuthorStatus.vue'
import AuthorWebsite from './AuthorWebsite.vue'
import AuthorJoined from './AuthorJoined.vue'
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
  full: {
    type: Boolean,
    default: false,
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
  <div
    class="flex relative w-full"
    :class="props.size === 'large' ? 'inline-grid' : 'items-center'"
  >
    <extra-special-checkmark v-if="author.verified" :size="props.size" class="special-aint-ya" />
    <author-avatar
      :avatar="props.author.avatar"
      :class="`${props.goToAuthorPage ? 'cursor-pointer' : ''} ${classes}`"
      @click="goToAuthorPage"
    />
    <div v-if="!props.imageOnly" class="justify-center w-1/2 pl-4">
      <div>
        <h2 class="text-xl leading-6 font-bold dark:text-white">
          <author-name :name="props.author.name" />
        </h2>
        <p class="text-sm leading-5 font-medium text-gray-600">
          <author-handle :handle="props.author.handle" />
        </p>
      </div>
      <div v-if="props.full" class="mt-3">
        <p class="text-white leading-tight mb-2">
          <author-status :status="props.author.status" />
        </p>
        <div class="text-gray-600 flex">
          <author-website :website="props.author.website" :show-icon="true" />
          <author-joined :joined="props.author.joined" :show-icon="true" />
        </div>
      </div>
      <div
        v-if="props.full"
        class="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid"
      >
        <div class="text-center pr-3">
          <span class="font-bold dark:text-white">0</span
          ><span class="text-gray-600"> Following</span>
        </div>
        <div class="text-center px-3">
          <span class="font-bold dark:text-white">0 </span
          ><span class="text-gray-600"> Followers</span>
        </div>
      </div>
    </div>
  </div>
</template>
