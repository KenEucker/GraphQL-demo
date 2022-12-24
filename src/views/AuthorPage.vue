<script setup lang="ts">
import ArrowBack from 'vue-ionicons/dist/md-arrow-back.vue'
import PovSelfPost from '../components/post/PovSelfPost.vue'
import LoadingSpinner from '../components/atomic/LoadingSpinner.vue'
import ErrorMessage from '../components/atomic/ErrorMessage.vue'
import PovAuthor from '../components/author/PovAuthor.vue'
import { reactive, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useRouteParams } from '@vueuse/router'
import { useAuthorState } from '../store/state'

const authorState = useAuthorState()
const handleParam = useRouteParams('handle')
const handleParamIsSet = handleParam.value?.length
const handle = handleParamIsSet ? handleParamIsSet : authorState.getAuthor.handle

// Call the gql function with the GraphQL query
const authorByHandleQuery = gql`
  query AuthorByHandle($handle: String!) {
    author(where: { handle: $handle }) {
      id
      name
      email
      handle
      avatar
      status
      verified
      banner
      posts {
        id
        title
        text
        media
        author {
          id
          handle
          avatar
          status
          verified
        }
      }
    }
  }
`

const author = ref()
const router = useRouter()
const { result, loading, error } = useQuery(authorByHandleQuery, { handle })
const authorQuery = reactive(result)

watch(authorQuery, (r) => {
  if (r?.author) {
    author.value = r.author
  } else {
    router.push('/')
  }
})

const state = reactive({
  sec: ['Posts', 'Threads', 'Groups', 'Favorites'],
  selected: 0,
})

const props = defineProps({
  showBackButton: {
    type: Boolean,
    default: false,
  },
})

function goBack() {
  router.back()
}

function selected(idx: number) {
  state.selected = idx
}
</script>

<template>
  <div>
    <div v-if="loading">
      <loading-spinner />
    </div>
    <div v-else-if="error">
      <error-message title="Error Fetching Profile Data" :message="error.message" />
    </div>
    <div v-else class="w-full p-4 pr-6 max-w-[700px] mx-auto">
      <div class="ml-10 md:ml-0">
        <div class="flex p-1 text-twitter-gray">
          <arrow-back
            v-if="props.showBackButton"
            w="25"
            h="25"
            class="text-twitter-primary p-3 px-4 cursor-pointer"
            @click="goBack"
          />
          <div>
            <span class="block mb-0 font-bold text-xl">{{ author?.name }}</span>
            <small>{{ author?.posts?.length ?? 0 }} Posts</small>
          </div>
        </div>
        <div class="banner bg-gray-700 min-h-50 h-50 object-fill">
          <img :src="author?.banner" class="w-[100%]" />
        </div>
        <pov-author :author="author" size="medium" class="-mt-18 -ml-10" />
        <div class="flex">
          <button
            v-for="(section, index) in state.sec"
            :key="index"
            type="button"
            class="flex-grow transition border-twitter-primary duration-150 ease-in-out py-4 text-sm font-semibold hover:bg-twitter-hover hover:text-twitter-primary focus:outline-none"
            :class="state.selected ? 'border-b-2 text-twitter-primary' : 'text-twitter-gray'"
            @click="selected(index)"
          >
            {{ section }}
          </button>
        </div>
      </div>
      <div v-if="state.selected === 0" class="flex grid grid-cols-1">
        <pov-self-post v-for="post in author?.posts" :key="post.id" :post="post"></pov-self-post>
      </div>
    </div>
  </div>
</template>
