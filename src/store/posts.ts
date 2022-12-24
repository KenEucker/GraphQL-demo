import { apolloClient } from './'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { Post } from '../schema/generated/types.d'

export const getInitialPostsState = (): { posts: Post[]; postsInitialized: boolean } => ({
  postsInitialized: false,
  posts: [],
})

export const usePostsState = defineStore({
  id: 'usePostsState',
  state: getInitialPostsState,
  getters: {
    init: (s) => s.postsInitialized,
    getPosts: (s) => s.posts,
  },
  actions: {
    async getAllPosts() {
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
      const { data } = await apolloClient.query({
        query: getPostsQuery,
      })

      if (data?.posts?.length) {
        console.log({ data })
        this.posts = data.posts
      }

      this.postsInitialized = true
    },
  },
})
