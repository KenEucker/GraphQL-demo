<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'
import LoadingSpinner from '../atomic/LoadingSpinner.vue'
import ErrorMessage from '../atomic/ErrorMessage.vue'
import EmojiPicker from 'vue3-emoji-picker'
import { useMutation } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useAuthorState } from '../../store/state'
import CloseIcon from 'vue-ionicons/dist/md-close-circle-outline.vue'
import ImagesIcon from 'vue-ionicons/dist/md-images.vue'
import Popper from 'vue3-popper'

const authorState = useAuthorState()
let newPostLoading = ref(false)
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  isFocused: {
    type: Boolean,
    default: false,
  },
})

const mutation = gql`
  mutation CreateNewPost($post: CreatePostInput!) {
    createPost(post: $post) {
      id
    }
  }
`
const { mutate: useCreatePostMutation } = useMutation(mutation)
const emit = defineEmits(['onClose', 'onOpen', 'onNewPostCreated'])

const firstTitle = useDateFormat(useNow(), 'MMMM DD, YYYY').value
const titleRef = ref()
const statusRef = ref()
const textRef = ref()
const errorMessage = ref('')
const errors = ref()
const showEmojiPicker = reactive({
  show: false,
  emoji: null,
})

const onSelectEmoji = (emoji: any) => {
  showEmojiPicker.show = false
  showEmojiPicker.emoji = emoji
  statusRef.value.value = emoji.i
}

const getNewTitle = () => {
  if (titleRef.value?.value?.length) {
    return
  }
  const formatted = useDateFormat(useNow(), 'MMMM DD, YYYY @ hh:mm a')
  titleRef.value.value = formatted.value
}

const closeCreatePost = () => {
  emit('onClose')
}

const openCreatePost = () => {
  emit('onOpen')
}

async function createNewPost() {
  newPostLoading.value = true
  const newPostData = {
    authorId: authorState.getAuthorId,
    text: textRef.value.value,
    status: statusRef.value.value,
    title: titleRef.value.value,
    published: true,
  }

  try {
    const newlyCreatedPost = await useCreatePostMutation({ post: newPostData })
    newPostLoading.value = false
    textRef.value.value = ''
    statusRef.value.value = ''
    titleRef.value.value = ''
    emit('onNewPostCreated', newlyCreatedPost)
    closeCreatePost()
  } catch (e: any) {
    textRef.value.value = newPostData.text
    statusRef.value.value = newPostData.status
    titleRef.value.value = newPostData.title
    console.error(e.message)
    errors.value = true
    errorMessage.value = e.message
    newPostLoading.value = false
  }
}

onMounted(() => {
  if (props.isFocused) {
    textRef.value.focus()
  }
})
</script>

<template>
  <div class="" @click="errors = false">
    <div v-show="newPostLoading">
      <loading-spinner :full-screen="false" />
    </div>
    <div
      v-show="!newPostLoading"
      class="relative flex flex-col mx-2 transition-all rounded-md bg-ll-neutral dark:bg-ld-neutral"
      :class="props.isOpen ? 'h-70 p-5' : 'overflow-hidden h-0 p-0'"
    >
      <div class="flex">
        <emoji-picker
          v-show="showEmojiPicker.show"
          :input="true"
          class="absolute z-2000"
          :native="true"
          @select="onSelectEmoji"
        />
        <input
          ref="statusRef"
          type="text"
          class="w-20 p-2 mb-2 text-lg text-center rounded-md outline-none bg-ll-base dark:bg-ld-base"
          placeholder="status"
          resize="none"
          @focus="showEmojiPicker.show = true"
        />
        <input
          ref="titleRef"
          type="text"
          class="w-3/4 p-2 mx-auto mb-2 text-lg rounded-md outline-none bg-ll-base dark:bg-ld-base"
          :placeholder="firstTitle"
          :value="''"
          resize="none"
        />
      </div>
      <textarea
        ref="textRef"
        class="w-full h-full p-4 text-lg rounded-md outline-none bg-ll-base dark:bg-ld-base"
        placeholder="What's happening?"
        resize="none"
        @input="getNewTitle"
      ></textarea>
      <div class="flex items-center justify-between w-full pt-3">
        <div class="flex">
          <button
            class="flex items-center justify-center w-10 h-10 mr-2 transition-transform transform border rounded-md border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-500 active:scale-95"
          >
            <images-icon class="m-auto" h="30" w="30" />
          </button>
        </div>
        <popper :show="errors" placement="bottom">
          <template #default></template>
          <template #content>
            <error-message :message="errorMessage" title="Error creating post" />
          </template>
        </popper>
        <div class="flex">
          <button
            class="flex items-center px-5 py-2 text-sm text-white transition-transform transform rounded-md bg-ll-primary dark:bg-ld-primary active:scale-95"
            @click="createNewPost"
          >
            Post
          </button>
        </div>
      </div>
      <button
        class="absolute flex items-center w-8 h-8 mr-2 text-sm transition-transform transform border rounded-full -top-0 -right-1 bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border active:scale-95"
        @click="closeCreatePost"
      >
        <close-icon class="m-auto" h="30" w="30" />
      </button>
    </div>
  </div>
</template>
