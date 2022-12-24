<script setup lang="ts">
import Points from 'vue-ionicons/dist/md-bonfire.vue'
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

const emit = defineEmits(['iLikeIt'])
const iLikeIt =
  props.authorId !== 0
    ? async () => {
        const updatingInteraction = {
          postId: props.postId,
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
    <points w="25" h="25" :class="props.active ? 'text-yellow-600' : ''" @click="iLikeIt" /><span
      class="ml-1"
      >{{ props.interactions?.like ?? 0 }}</span
    >
  </pop-button>
</template>
