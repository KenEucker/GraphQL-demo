<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'
import EmojiPicker from 'vue3-emoji-picker'
import { useMutation } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import LoadingSpinner from '../atomic/LoadingSpinner.vue'
import { useAuthorState } from '../../store/state'

const authorState = useAuthorState()
let newPostLoading = ref(false)
const props = defineProps({
  isOpen: {
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
const emit = defineEmits(['onMenuClick', 'onClose', 'onOpen', 'onNewPostCreated'])

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
</script>

<template>
  <div class="">
    <div v-if="newPostLoading">
      <loading-spinner :full-screen="false" />
    </div>
    <div
      v-else
      class="transition-all mx-2 bg-ll-neutral dark:bg-ld-neutral rounded-md flex flex-col relative"
      :class="props.isOpen ? 'h-70 p-5' : 'overflow-hidden h-0 p-0'"
    >
      <div class="flex">
        <emoji-picker
          v-show="showEmojiPicker.show"
          :input="true"
          class="absolute z-2000"
          @select="onSelectEmoji"
        />
        <input
          ref="statusRef"
          type="text"
          class="w-20 rounded-md bg-ll-base dark:bg-ld-base text-center p-2 mb-2 outline-none text-lg"
          placeholder="status"
          resize="none"
          @focus="showEmojiPicker.show = true"
        />
        <input
          ref="titleRef"
          type="text"
          class="w-3/4 mx-auto mb-2 rounded-md bg-ll-base dark:bg-ld-base p-2 outline-none text-lg"
          :placeholder="firstTitle"
          :value="''"
          resize="none"
        />
      </div>
      <textarea
        ref="textRef"
        class="w-full h-full rounded-md bg-ll-base dark:bg-ld-base p-4 outline-none text-lg"
        placeholder="What's happening?"
        resize="none"
        @input="getNewTitle"
      ></textarea>
      <div class="w-full flex items-center justify-between pt-3">
        <div class="flex">
          <button
            class="w-10 h-10 mr-2 border rounded-md flex justify-center items-center border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-500 active:scale-95 transition-transform transform"
            @click="emit('onMenuClick')"
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
            class="w-10 h-10 mr-2 border rounded-md flex justify-center items-center border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-500 active:scale-95 transition-transform transform"
            @click="emit('onMenuClick')"
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
            class="text-sm px-5 py-2 bg-ll-primary text-white dark:bg-ld-primary rounded-md flex items-center active:scale-95 transform transition-transform"
            @click="createNewPost"
          >
            Post
          </button>
        </div>
      </div>
      <button
        class="w-8 h-8 absolute -top-0 -right-1 bg-ll-neutral dark:bg-ld-neutral text-sm border-ll-border dark:border-ld-border border rounded-full flex items-center mr-2 active:scale-95 transform transition-transform"
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
