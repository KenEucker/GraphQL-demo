<script setup lang="ts">
import RePost from 'vue-ionicons/dist/md-sync.vue'
import PopButton from '../atomic/PopButton.vue'
import { useMutation } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const mutation = gql`
  mutation UpdateInteractionPovPost($data: UpdateInteractionInput!) {
    updateInteraction(data: $data) {
      id
    }
  }
`
const { mutate: useUpdateInteractionMutation } = useMutation(mutation)

const props = defineProps({
  interactions: {
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
  postId: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    defaiult: false,
  },
})

const emit = defineEmits(['iWantSomeMoreOfIt'])
const iWantSomeMoreOfIt =
  props.authorId !== 0
    ? async () => {
        const updatingInteraction = {
          postId: props.postId,
          authorId: props.authorId,
          repost: true,
        }

        const updatedPostInteraction = await useUpdateInteractionMutation({
          data: updatingInteraction,
        })
        emit('iWantSomeMoreOfIt')
      }
    : () => {
        /// Nothing to do, no author to invoke
      }
</script>

<template>
  <pop-button variant="green">
    <RePost
      w="25"
      h="25"
      :class="active ? 'text-yellow-600' : ''"
      @click="iWantSomeMoreOfIt"
    /><span class="ml-1">{{ props.interactions?.repost ?? 0 }}</span>
  </pop-button>
</template>
