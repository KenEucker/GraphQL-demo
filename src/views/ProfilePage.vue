<script setup lang="ts">
import Location from 'vue-ionicons/dist/md-pin.vue'
import Calendar from 'vue-ionicons/dist/md-calendar.vue'
import Birthday from 'vue-ionicons/dist/ios-gift.vue'
import ArrowBack from 'vue-ionicons/dist/md-arrow-back.vue'
import Link from 'vue-ionicons/dist/md-link.vue'
import PovSelfPost from '../components/app/PovSelfPost.vue'
import LoadingSpinner from '../components/app/LoadingSpinner.vue'
import ErrorMessage from '../components/app/ErrorMessage.vue'
import { reactive, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useStorage } from '@vueuse/core'

const storedEmail = useStorage('author-email', '')

// Call the gql function with the GraphQL query
const query = gql`
  query AuthorPanelAuthor($email: String!) {
    authors(by: { email: $email }) {
      id
      name
      email
      handle
      avatar
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
          verified
        }
      }
    }
  }
`

const { result, loading, error } = useQuery(query, { email: storedEmail.value })
const isLoggedIn = reactive(result)
watch(isLoggedIn, (r) => {
  const loggedInAuthor = r?.authors.find((a: any) => a.email === storedEmail.value)
  if (loggedInAuthor) {
    author.value = loggedInAuthor
  } else {
    storedEmail.value = null
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

function selected(idx: number) {
  state.selected = idx
}
</script>

<template>
  <div v-if="loading">
    <loading-spinner />
  </div>
  <div v-else-if="error">
    <error-message title="Error Fetching Profile Data" :message="error.message" />
  </div>
  <div v-else class="w-full p-4 pr-6 max-w-[700px] mx-auto">
    <div class="flex p-1 text-twitter-gray">
      <arrow-back v-if="props.showBackButton" w="25" h="25" class="text-twitter-primary p-3 px-4" />
      <div>
        <span class="block mb-0 font-bold text-xl">{{ author?.name }}</span>
        <small>{{ author?.posts?.length ?? 0 }} Posts</small>
      </div>
    </div>
    <div v-if="author?.banner" class="banner bg-gray-700 h-50 object-fill">
      <img :src="author?.banner" class="w-[100%]" />
    </div>
    <div class="px-3 pb-3 text-twitter-gray">
      <div class="w-40 -mt-18 -ml-10">
        <img
          :src="author?.avatar"
          class="w-full h-full rounded-full object-cover border-4 border-black relative"
          alt=""
        />
      </div>
      <div class="ml-3">
        <div class="font-bold text-xl">{{ author?.name }}</div>
        <div>{{ author?.handle }}</div>
      </div>
      <div class="my-2 ml-3">{{ author?.status }}</div>
      <div class="ml-3">
        <div class="flex">
          <div v-if="author?.location" class="mr-3">
            <Location w="18" h="18" />
            {{ author?.location }}
          </div>
          <div v-if="author?.birthday">
            <Birthday w="18" h="18" />
            {{ author?.birthday }}
          </div>
        </div>
        <div v-if="author?.link">
          <Link w="18" h="18" />
          {{ author?.link }}
        </div>
        <div v-if="author?.joined">
          <Calendar w="18" h="18" />
          {{ author?.joined }}
        </div>
        <div class="flex mt-2">
          <div class="mr-4">
            <strong class="mr-1">{{ author?.following ?? 0 }}</strong>
            <span>Following</span>
          </div>
          <div>
            <strong class="mr-1">{{ author?.followers ?? 0 }}</strong>
            <span>Followers</span>
          </div>
        </div>
      </div>
    </div>
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
    <div v-if="state.selected === 0" class="flex grid grid-cols-1">
      <pov-self-post v-for="post in author?.posts" :key="post.id" :post="post"></pov-self-post>
    </div>
  </div>
</template>
