<script setup lang="ts">
import MoreIcon from 'vue-ionicons/dist/md-more.vue'
import PovPostInteraction from './PovPostInteraction.vue'
import PostText from './PostText.vue'
import PovAuthor from '../author/PovAuthor.vue'
import PovPostMedia from './PovPostMedia.vue'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'

const router = useRouter()
const storedAuthorId = useStorage('author-id', 0)

function goToAuthorPage() {
  router.push(`/${props.post.author.handle}`)
}

const props = defineProps({
  post: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
})
</script>

<template>
  <div class="w-full p-5 bg-ll-neutral dark:bg-ld-neutral rounded-md flex flex-col mb-4">
    <div class="flex justify-between">
      <button @click="goToAuthorPage">
        <pov-author :author="props.post?.author" />
      </button>
      <button class="active:scale-95 transform transition-transform relative">
        <more-icon h="30" w="30" class="absolute top-0 right-0" />
      </button>
    </div>
    <p class="mt-2 -mb-3 flex justify-between text-xs text-white py-1">
      {{ props.post.title }}
    </p>

    <post-text :post="props.post" />
    <pov-post-media :media="props.post?.media" />
    <pov-post-interaction
      :author-id="storedAuthorId"
      :post-id="props.post.id"
      :disable-interaction="true"
    />
  </div>
</template>
