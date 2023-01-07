<script setup lang="ts">
import Points from 'vue-ionicons/dist/md-bonfire.vue'
import Heart from 'vue-ionicons/dist/md-heart.vue'
import HeartEmpty from 'vue-ionicons/dist/md-heart-empty.vue'
import Share from 'vue-ionicons/dist/md-share.vue'
import Repost from 'vue-ionicons/dist/md-sync.vue'
import PopButton from '../atomic/PopButton.vue'
import { gql } from '@apollo/client/core'
import { useMutation } from '@vue/apollo-composable'
import { computed } from 'vue'

const props = defineProps({
  count: {
    type: Number,
    default: 0,
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
    default: false,
  },
  disableInteraction: {
    type: Boolean,
    default: false,
  },
  hideCount: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'like',
  },
})

// const authorId = computed(() => props.authorId)

const mutation = gql`
  mutation UpdateInteractionPovPost($data: UpdateInteractionInput!) {
    toggleInteraction(data: $data) {
      id
    }
  }
`

const { mutate: useUpdateInteractionMutation } = useMutation(mutation)

async function onPostInteraction() {
  if (props.authorId < 1 || props.disableInteraction) {
    return
  }

  const updatingInteraction: {
    postId: number
    authorId: number
    like?: boolean
    love?: boolean
    repost?: boolean
    share?: boolean
  } = {
    postId: props.postId,
    authorId: props.authorId,
  }
  switch (props.variant) {
    case 'like':
      updatingInteraction.like = true
      break
    case 'love':
      updatingInteraction.love = true
      break
    case 'repost':
      updatingInteraction.repost = true
      break
    case 'share':
      updatingInteraction.share = true
      break
  }

  const updatedPostInteraction = await useUpdateInteractionMutation({
    data: updatingInteraction,
  })

  emit('onInteraction', props.variant)
}

const emit = defineEmits(['onInteraction'])

const popoverContent = computed(() =>
  props.disableInteraction
    ? 'you cannot do that'
    : props.authorId < 0
    ? 'complete your signup'
    : props.authorId < 1
    ? 'you must be logged in'
    : `${props.variant}d`
)
</script>

<template>
  <pop-button :variant="variant" :popover-content="popoverContent" @click="onPostInteraction">
    <div v-if="props.variant === 'like'">
      <points w="25" h="25" :class="props.active ? 'text-yellow-600' : ''" class="align-middle" />
      <span v-show="!props.hideCount" class="ml-1 align-middle">{{ props.count }}</span>
    </div>
    <div v-if="props.variant === 'love'" class="ml-1">
      <span v-if="props.active" class="ml-1 align-middle">
        <heart w="25" h="25" class="align-middle text-amber-300" />
        <span v-show="!props.hideCount" class="ml-1 align-middle">{{ props.count }}</span>
      </span>
      <span v-else class="align-middle">
        <heart-empty class="mr-1 align-bottom" w="25" h="25" />
        <span v-show="!props.hideCount" class="ml-1 align-middle">{{ props.count }}</span>
      </span>
    </div>
    <div v-if="props.variant === 'repost'">
      <repost w="25" h="25" class="align-middle" :class="active ? 'text-yellow-600' : ''" />
      <span v-show="!props.hideCount" class="ml-1 align-middle">{{ props.count }}</span>
    </div>
    <div v-if="props.variant === 'share'">
      <share w="25" h="25" class="align-middle" />
      <span v-show="!props.hideCount" class="ml-1 align-middle">{{ props.count }}</span>
    </div>
  </pop-button>
</template>
