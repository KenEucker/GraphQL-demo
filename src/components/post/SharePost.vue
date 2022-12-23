<script setup lang="ts">
import Share from 'vue-ionicons/dist/md-share.vue'
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

const emit = defineEmits(['iWantToShareIt'])
const iWantToShareIt =
  props.authorId !== 0
    ? async () => {
        const updatingInteraction = {
          postId: props.post.id,
          authorId: props.authorId,
          share: true,
        }

        const updatedPostInteraction = await useUpdateInteractionMutation({
          data: updatingInteraction,
        })
        emit('iWantToShareIt')
      }
    : () => {
        /// Nothing to do, no author to invoke
      }
</script>

<template>
  <pop-button
    variant="blue"
    class="flex items-center active:scale-95 transform transition-transform"
    @click="iWantToShareIt"
  >
    <share w="25" h="25" />
  </pop-button>
</template>
