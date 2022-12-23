<script setup lang="ts">
import PopButton from '../atomic/PopButton.vue'
import Heart from 'vue-ionicons/dist/md-heart.vue'
import HeartEmpty from 'vue-ionicons/dist/md-heart-empty.vue'
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

const emit = defineEmits(['iLoveIt'])
const iLoveIt =
  props.authorId !== 0
    ? async () => {
        const updatingInteraction = {
          postId: props.post.id,
          authorId: props.authorId,
          love: true,
        }

        const updatedPostInteraction = await useUpdateInteractionMutation({
          data: updatingInteraction,
        })
        emit('iLoveIt')
      }
    : () => {
        /// Nothing to do, no author to invoke
      }
</script>

<template>
  <pop-button variant="purple">
    <span v-if="props.post.iLoveIt" class="ml-1 align-middle"
      ><heart w="25" h="25" class="text-amber-300 align-middle" />{{ props.post.likes }}</span
    ><span v-else class="align-middle" @click="iLoveIt">
      <heart-empty class="align-bottom mr-1" w="25" h="25" />{{ props.post.likes ?? 0 }}</span
    >
  </pop-button>
</template>
