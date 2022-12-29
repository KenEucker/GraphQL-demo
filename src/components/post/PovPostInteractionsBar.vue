<script setup lang="ts">
import PovPostInteraction from './PovPostInteraction.vue'
import { gql } from '@apollo/client/core'
import { reactive, watch } from 'vue'
import { useLazyQuery } from '@vue/apollo-composable'

const interactions = reactive({
  likes: 0,
  loves: 0,
  reposts: 0,
  shares: 0,
})

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

const getPostInteractionsQuery = gql`
  query PovPostGetInteractionNumbers($id: Int!) {
    getPostInteractions(id: $id) {
      likes
      loves
      reposts
      shares
    }
  }
`
const { result, load } = useLazyQuery(getPostInteractionsQuery, { id: props.postId })
watch(result, ({ getPostInteractions }: any) => {
  interactions.likes = getPostInteractions.likes
  interactions.loves = getPostInteractions.loves
  interactions.reposts = getPostInteractions.reposts
  interactions.shares = getPostInteractions.shares
})
load()

const onInteractionSuccess = (interaction: string) => {
  switch (interaction) {
    case 'like':
      interactions.likes = interactions.likes + 1
      console.log({ likes: interactions.likes })
      break
    case 'love':
      interactions.loves = interactions.loves + 1
      console.log({ loves: interactions.loves })
      break
    case 'repost':
      interactions.reposts = interactions.reposts + 1
      console.log({ reposts: interactions.reposts })
      break
    case 'share':
      interactions.shares = interactions.shares + 1
      console.log({ shares: interactions.shares })
      break
  }
}
</script>

<template>
  <div class="flex justify-between pt-4 mt-4 border-t border-ll-border dark:border-ld-border">
    <pov-post-interaction
      variant="like"
      :author-id="props.authorId"
      :post-id="props.postId"
      :count="interactions.likes"
      @on-interaction="onInteractionSuccess"
    />
    <pov-post-interaction
      variant="love"
      :author-id="props.authorId"
      :post-id="props.postId"
      :count="interactions.loves"
      @on-interaction="onInteractionSuccess"
    />
    <pov-post-interaction
      variant="repost"
      :post-id="props.postId"
      :author-id="props.authorId"
      :count="interactions.reposts"
      @on-interaction="onInteractionSuccess"
    />
    <pov-post-interaction
      variant="share"
      :post-id="props.postId"
      :author-id="props.authorId"
      :count="interactions.shares"
      :disable-interaction="props.disableInteraction"
      @on-interaction="onInteractionSuccess"
    />
  </div>
</template>
