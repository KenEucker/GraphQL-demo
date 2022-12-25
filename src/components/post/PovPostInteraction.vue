<script setup lang="ts">
import LikePost from './LikePost.vue'
import LovePost from './LovePost.vue'
import SharePost from './SharePost.vue'
import RePost from './RePost.vue'
import { gql } from '@apollo/client/core'
import { useQuery } from '@vue/apollo-composable'
import { reactive, ref, watch } from 'vue'

const getPostInteractionsQuery = gql`
  query PovPostGetInteractionNumbers($postId: Int!) {
    getNumberOfInteractionsForPost(
      from: { id: $postId, like: true, love: true, share: true, repost: true }
    ) {
      like
      love
      repost
      share
    }
  }
`

const props = defineProps({
  authorId: {
    type: Number,
    default: 0,
  },
  postId: {
    type: Number,
    default: 0,
  },
  disableInteraction: {
    type: Boolean,
    default: false,
  },
})

const interactions = ref()

// eslint-disable-next-line no-constant-condition
if (false) {
  //props.postId !== 0) {
  const { result } = useQuery(getPostInteractionsQuery, {
    postId: props.postId,
  })
  const interactionsNumbersResult = reactive(result)
  watch(interactionsNumbersResult, (r) => {
    console.log({ interactions: r.getNumberOfInteractionsForPost })
    interactions.value = r.getNumberOfInteractionsForPost
  })
}

const emit = defineEmits(['iLikeIt', 'iLoveIt', 'iWantSomeMoreOfIt', 'iWantToShareIt'])
</script>

<template>
  <div class="flex justify-between pt-4 border-t border-ll-border dark:border-ld-border mt-4">
    <like-post
      :author-id="props.authorId"
      :interactions="interactions"
      :post-id="props.postId"
      :disable-interaction="props.disableInteraction"
      @i-like-it="emit('iLikeIt')"
    />
    <love-post
      :author-id="props.authorId"
      :interactions="interactions"
      :post-id="props.postId"
      :disable-interaction="props.disableInteraction"
      @i-love-it="emit('iLoveIt')"
    />
    <re-post
      :post-id="props.postId"
      :author-id="props.authorId"
      :interactions="interactions"
      :disable-interaction="props.disableInteraction"
      @i-want-some-more-of-it="emit('iWantSomeMoreOfIt')"
    />
    <share-post
      :post-id="props.postId"
      :author-id="props.authorId"
      :interactions="interactions"
      :disable-interaction="props.disableInteraction"
      @i-want-to-share-it="emit('iWantToShareIt')"
    />
  </div>
</template>
