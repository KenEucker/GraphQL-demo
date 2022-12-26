import { apolloClient } from './'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { Post } from '../schema/generated/types.d'

export const getInitialPostsState = (): {
  posts: Post[]
  postsLoading: boolean
  postsQueryError: any
} => ({
  postsLoading: false,
  postsQueryError: null,
  posts: [],
})

export const usePostsState = defineStore({
  id: 'usePostsState',
  state: getInitialPostsState,
  getters: {
    getPostsLoading: (s) => s.postsLoading,
    getPostsError: (s) => s.postsQueryError,
    getPosts: (s) => s.posts,
  },
  actions: {
    async getAllPosts() {
      this.postsLoading = true

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
      const queryResult = await apolloClient.query({
        query: getPostsQuery,
      })

      this.postsQueryError = queryResult.error

      if (queryResult.data?.posts?.length) {
        console.log({ data: queryResult.data })
        this.posts = queryResult.data.posts
      }

      this.postsLoading = false
    },
  },
})
