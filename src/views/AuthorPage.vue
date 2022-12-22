<script setup lang="ts">
import ArrowBack from 'vue-ionicons/dist/md-arrow-back.vue'
import PovSelfPost from '../components/app/PovSelfPost.vue'
import LoadingSpinner from '../components/app/LoadingSpinner.vue'
import ErrorMessage from '../components/app/ErrorMessage.vue'
import PovAuthor from '../components/app/PovAuthor.vue'
import { reactive, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useStorage } from '@vueuse/core'
import { useRouteParams } from '@vueuse/router'

const storedEmail = useStorage('author-email', '')
const handle = useRouteParams('handle')
const handleIsSet = handle.value?.length
const authorByTerm = handleIsSet ? handle.value : storedEmail.value

// Call the gql function with the GraphQL query
const authorByEmailQuery = gql`
  query AuthorByEmail($term: String!) {
    author(where: { email: $term }) {
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
// Call the gql function with the GraphQL query
const authorByHandleQuery = gql`
  query AuthorByHandle($term: String!) {
    author(where: { handle: $term }) {
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

const query = handleIsSet ? authorByHandleQuery : authorByEmailQuery

const { result, loading, error } = useQuery(query, { term: authorByTerm })
const isLoggedIn = reactive(result)

watch(isLoggedIn, (r) => {
  const loggedInAuthor = r?.author
  if (loggedInAuthor) {
    author.value = loggedInAuthor
  } else {
    if (!handleIsSet) {
      storedEmail.value = null
    }
    router.push('/')
  }
})

const author = ref()
const router = useRouter()

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
            v-if="props.showBackButton || handleIsSet"
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
