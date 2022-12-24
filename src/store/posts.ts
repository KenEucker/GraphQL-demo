import { apolloClient } from './'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { Post } from '../schema/generated/types.d'

export const getInitialPostState = (): { posts: Post[] } => ({
  posts: [],
})

export const usePostState = defineStore({
  id: 'usePostState',
  state: getInitialPostState,
  getters: {
    getPosts: (s) => s.posts,
  },
  actions: {},
})
