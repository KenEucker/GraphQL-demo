<script setup lang="ts">
import LikePost from './LikePost.vue'
import LovePost from './LovePost.vue'
import SharePost from './SharePost.vue'
import RePost from './RePost.vue'

const props = defineProps({
  post: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
  authorId: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['iLikeIt', 'iLoveIt', 'iWantSomeMoreOfIt', 'iWantToShareIt'])
</script>

<template>
  <div class="flex justify-between pt-4 border-t border-ll-border dark:border-ld-border mt-4">
    <like-post :author-id="props.authorId" :post="props.post" @i-like-it="emit('iLikeIt')" />
    <love-post :post="props.post" :author-id="props.authorId" @i-love-it="emit('iLoveIt')" />
    <re-post
      :post="props.post"
      :author-id="props.authorId"
      @i-want-some-more-of-it="emit('iWantSomeMoreOfIt')"
    />
    <share-post
      :post="props.post"
      :author-id="props.authorId"
      @i-want-to-share-it="emit('iWantToShareIt')"
    />
  </div>
</template>
