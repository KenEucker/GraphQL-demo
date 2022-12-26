import { apolloClient } from '.'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { Author } from '../schema/generated/types'
import { useAuthorState } from './author'

export const getInitialPovState = (): {
  authorsToFollow: Author[]
  trending: any[]
  trendingTitle: string
  topTrending: any
  simple: boolean
} => ({
  authorsToFollow: [],
  trending: [
    {
      index: 0,
      title: 'Sports · trending',
      label: '#WorldCupRiots',
      stats: '9M Posts',
    },
    {
      index: 0,
      title: 'Entertainment',
      label: '#ChristmasMovies',
      stats: '12.3M Posts',
    },
    {
      index: 0,
      title: 'Politics · this year',
      label: '#StudentDebt',
      stats: '25.2K Posts',
    },
  ],
  topTrending: {
    title: 'WorldWarIII',
    text: 'Will there be nukes?',
  },
  trendingTitle: "What's happening",
  simple: false,
})

export const usePovState = defineStore({
  id: 'usePovState',
  state: getInitialPovState,
  getters: {
    isSimpleMode: (s) => s.simple,
    getTrending: (s) => s.trending,
    getAuthorsToFollow: (s) => s.authorsToFollow,
    getTrendingTitle: (s) => s.trendingTitle,
    getTopTrendingTitle: (s) => s.topTrending?.title,
    getTopTrendingText: (s) => s.topTrending?.text,
  },
  actions: {
    async initPovState() {
      await this.fetchAuthorsToFollow()
    },
    async fetchAuthorsToFollow() {
      const getAuthorsToFollowQuery = gql`
        query FollowMoreAuthors {
          authors {
            email
            name
            verified
            handle
            avatar
          }
        }
      `

      const queryResult = await apolloClient.query({
        query: getAuthorsToFollowQuery,
      })

      if (queryResult.data?.authors?.length) {
        this.authorsToFollow = queryResult.data.authors
      }
    },
    pruneAuthorsToFollow() {
      const authorSate = useAuthorState()
      if (authorSate.getAuthor?.id !== 0) {
        this.authorsToFollow = this.authorsToFollow.filter((a) => a.id === authorSate.getAuthor.id)
      }
    },
  },
})
