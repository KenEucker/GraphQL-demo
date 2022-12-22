<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import PovPost from './PovPost.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorMessage from './ErrorMessage.vue'
import { Post } from '../../schema/generated/types.d'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const props = defineProps({
  oneColumn: {
    type: Boolean,
    default: false,
  },
})

// Call the gql function with the GraphQL query
const query = gql`
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

const { result, loading, error, refetch } = useQuery(query)
const feedPosts = reactive(result)

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
    <div v-if="loading">
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
