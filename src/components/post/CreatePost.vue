<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'
import LoadingSpinner from '../atomic/LoadingSpinner.vue'
import EmojiPicker from 'vue3-emoji-picker'
import { useMutation } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useAuthorState } from '../../store/state'

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

  const newlyCreatedPost = await useCreatePostMutation({ post: newPostData })
  newPostLoading.value = false
  emit('onNewPostCreated', newlyCreatedPost)
  closeCreatePost()
}

onMounted(() => {
  if (props.isFocused) {
    textRef.value.focus()
  }
})
</script>

<template>
  <div class="">
    <div v-if="newPostLoading">
      <loading-spinner :full-screen="false" />
    </div>
    <div
      v-else
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
          <button
            class="flex items-center justify-center w-10 h-10 mr-2 transition-transform transform border rounded-md border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-500 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
          </button>
        </div>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-full h-full"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
