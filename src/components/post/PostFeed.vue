<script setup lang="ts">
import { reactive, watch } from 'vue'
import PovPost from './PovPost.vue'
import LoadingSpinner from '../atomic/LoadingSpinner.vue'
import ErrorMessage from '../atomic/ErrorMessage.vue'
import { Post } from '../../schema/generated/types.d'
import { graphUrl } from '../../utilities'
import { usePostsState } from '../../store/state'

const props = defineProps({
  oneColumn: {
    type: Boolean,
    default: false,
  },
})

let leftPosts: Post[] = reactive([])
let rightPosts: Post[] = reactive([])

const postsState = usePostsState()
const postsLoaded = reactive(postsState)
watch(postsLoaded, () => {
  if (postsState.getPostsLoading) {
    console.log('loading posts ... ')
  } else {
    injectPosts()
  }
})
postsState.getAllPosts()

const newPostSubscription = `
  subscription NewPostPostFeed {
    post {
      mutation
      data {
        id
        title
        author {
          name
          handle
          verified
          avatar
        }
        text
        media
      }
    }
  }
`

const injectPosts = () => {
  postsState.getPosts.forEach((post: Post, index: number) => {
    if (index % 2 != 0) {
      leftPosts.push(post)
    } else {
      rightPosts.push(post)
    }
  })
}

const url = new URL(graphUrl)

url.searchParams.append('query', newPostSubscription)
const eventsource = new EventSource(url.toString(), {
  withCredentials: true, // This is required for cookies
})

eventsource.onmessage = function (event) {
  const data = JSON.parse(event.data)
  const { data: post, mutation } = data.data.post

  if (mutation === 'CREATED') {
    if (leftPosts.length < rightPosts.length) {
      leftPosts.unshift(post)
    } else {
      rightPosts.unshift(post)
    }
  }
}

const likePost = (post: Post) => {
  // const likePostMutation = gql`
  //   mutation likePost($postId: String!) {
  //     likePost(postId: $postId)
  //   }
  // `
  // refetch()
}
const lovePost = (post: Post) => {
  // const likePostMutation = gql`
  //   mutation likePost($postId: String!) {
  //     likePost(postId: $postId)
  //   }
  // `
  // refetch()
}
const rePost = (post: Post) => {
  // const likePostMutation = gql`
  //   mutation likePost($postId: String!) {
  //     likePost(postId: $postId)
  //   }
  // `
  // refetch()
}
const sharePost = (post: Post) => {
  // const likePostMutation = gql`
  //   mutation likePost($postId: String!) {
  //     likePost(postId: $postId)
  //   }
  // `
  // refetch()
}
/// Provided by ChatGPT
function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // The maximum is inclusive and the minimum is inclusive
}
</script>

<template>
  <div>
    <div v-if="postsState.getPostsLoading" class="mt-20">
      <loading-spinner />
    </div>
    <div v-else-if="postsState.getPostsError">
      <error-message title="Error Fetching Post Data" :message="postsState.getPostsError.message" />
    </div>
    <div
      v-else
      class="w-full grid transition-all"
      :class="props.oneColumn ? 'md:grid-cols-1 px-20 pt-5' : 'md:grid-cols-2'"
    >
      <div class="flex flex-col p-2">
        <pov-post
          v-for="post in rightPosts"
          :key="`id-${post.id}`"
          v-motion
          :initial="{
            y: getRandomIntInclusive(-100, -80),
            opacity: 0.2,
            scale: 1,
          }"
          :enter="{
            y: 0,
            scale: 1,
            opacity: 1,
            transition: {
              stiffness: getRandomIntInclusive(70, 100).toString(),
              delay: getRandomIntInclusive(25, 200),
            },
          }"
          :post="post"
          @i-like-it="likePost(post)"
          @i-love-it="lovePost(post)"
          @i-want-some-more-of-it="rePost(post)"
          @i-want-to-share-it="sharePost"
        ></pov-post>
      </div>
      <div class="flex flex-col p-2">
        <pov-post
          v-for="post in leftPosts"
          :key="`id-${post.id}`"
          v-motion
          :initial="{
            y: getRandomIntInclusive(-100, -80),
            opacity: 0.2,
            scale: 1,
          }"
          :enter="{
            y: 0,
            scale: 1,
            opacity: 1,
            transition: {
              stiffness: getRandomIntInclusive(70, 100).toString(),
              delay: getRandomIntInclusive(25, 200),
            },
          }"
          :post="post"
          @i-like-it="likePost(post)"
          @i-love-it="lovePost(post)"
          @i-want-some-more-of-it="rePost(post)"
          @i-want-to-share-it="sharePost"
        ></pov-post>
      </div>
    </div>
  </div>
</template>
