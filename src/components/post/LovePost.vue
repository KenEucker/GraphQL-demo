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

const emit = defineEmits(['iLoveIt'])
const iLoveIt =
  props.authorId !== 0
    ? async () => {
        const updatingInteraction = {
          postId: props.postId,
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
    <span v-if="props.active" class="ml-1 align-middle"
      ><heart w="25" h="25" class="text-amber-300 align-middle" />{{
        props.interactions.love
      }}</span
    ><span v-else class="align-middle" @click="iLoveIt">
      <heart-empty class="align-bottom mr-1" w="25" h="25" />{{
        props.interactions.love ?? 0
      }}</span
    >
  </pop-button>
</template>
