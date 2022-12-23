<script setup lang="ts">
import { onMounted, reactive, watch, ref } from 'vue'
import PovPost from './PovPost.vue'
import LoadingSpinner from '../atoms/LoadingSpinner.vue'
import ErrorMessage from '../atoms/ErrorMessage.vue'
import { Post } from '../../schema/generated/types'
import { useQuery, useSubscription } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const props = defineProps({
  oneColumn: {
    type: Boolean,
    default: false,
  },
})

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

const url = new URL('http://localhost:4000/graphql')

url.searchParams.append('query', newPostSubscription)
const eventsource = new EventSource(url.toString(), {
  withCredentials: true, // This is required for cookies
})

eventsource.onmessage = function (event) {
  const data = JSON.parse(event.data)
  const { data: newPostCreated, mutation } = data.data.post
  leftPosts.unshift(newPostCreated)
}

// const { result: newPostCreated, onResult } = useSubscription(newPostSubscription)
// const feedNewPost = reactive(newPostCreated)
// onResult(console.log)
// watch(feedNewPost, (data) => {
//   console.log({ newPostCreated: data })
//   leftPosts.push(data)
// })

// Call the gql function with the GraphQL query
const getPostsQuery = gql`
  query posts {
    posts {
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
`

const { result: allPosts, loading, error, refetch } = useQuery(getPostsQuery)
const feedPosts = reactive(allPosts)

let leftPosts: Post[] = reactive([])
let rightPosts: Post[] = reactive([])

const sortPosts = () => {
  feedPosts.value?.posts?.forEach((post: Post, index: number) => {
    if (index % 2 != 0) {
      leftPosts.push(post)
    } else {
      rightPosts.push(post)
    }
  })
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

watch(feedPosts, sortPosts)
onMounted(sortPosts)
</script>

<template>
  <div>
    <div v-if="loading" class="mt-20">
      <loading-spinner />
    </div>
    <div v-else-if="error">
      <error-message title="Error Fetching Post Data" :message="error.message" />
    </div>
    <div
      v-else
      class="w-full grid transition-all"
      :class="props.oneColumn ? 'md:grid-cols-1 px-20 pt-5' : 'md:grid-cols-2'"
    >
      <div class="flex flex-col p-2">
        <pov-post
          v-for="(post, index) in rightPosts"
          :key="index"
          :post="post"
          @i-like-it="likePost(post)"
          @i-love-it="lovePost(post)"
          @i-want-some-more-of-it="rePost(post)"
          @i-want-to-share-it="sharePost"
        ></pov-post>
      </div>
      <div class="flex flex-col p-2">
        <pov-post
          v-for="(post, index) in leftPosts"
          :key="index"
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
