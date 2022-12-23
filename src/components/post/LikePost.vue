<script setup lang="ts">
import Points from 'vue-ionicons/dist/md-bonfire.vue'
import PopButton from '../atoms/PopButton.vue'
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

const emit = defineEmits(['iLikeIt'])
const iLikeIt =
  props.authorId !== 0
    ? async () => {
        const updatingInteraction = {
          postId: props.post.id,
          authorId: props.authorId,
          like: true,
        }

        const updatedPostInteraction = await useUpdateInteractionMutation({
          data: updatingInteraction,
        })
        emit('iLikeIt')
      }
    : () => {
        /// Nothing to do, no author to invoke
      }
</script>

<template>
  <pop-button variant="red">
    <points
      w="25"
      h="25"
      :class="props.post.iLikeIt ? 'text-yellow-600' : ''"
      @click="iLikeIt"
    /><span class="ml-1">{{ props.post?.likes ?? 0 }}</span>
  </pop-button>
</template>
