import { apolloClient } from './'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { useStorage } from '@vueuse/core'
import { Author } from '../schema/generated/types.d'

// Local storage state
const storedEmail = useStorage('author-email', '')
const storedId = useStorage('author-id', 0)

export const getInitialAuthorState = (): { loggedIn: boolean; author: Author } => ({
  loggedIn: false,
  author: {
    id: 0,
    avatar: '',
    email: '',
    name: '',
    handle: '',
  },
})

export const useAuthorState = defineStore({
  id: 'useAuthorState',
  state: getInitialAuthorState,
  getters: {
    isLoggedIn: (s) => s.loggedIn,
    getAuthor: (s) => s.author,
    getAuthorId: (s) => s.author?.id ?? 0,
  },
  actions: {
    loginWithEmail(email: string) {
      return this.login({ email } as Author)
    },
    async login(author?: Author) {
      author = author ?? ({ id: storedId.value, email: storedEmail.value } as Author)
      const loginViaEmailQuery = gql`
        query AuthorPanelAuthor($email: String!) {
          author(where: { email: $email }) {
            id
            name
            email
            handle
            verified
            status
            avatar
            posts {
              id
            }
          }
        }
      `
      const { data } = await apolloClient.query({
        query: loginViaEmailQuery,
        variables: { email: author.email },
      })

      if (data?.author) {
        this.author = data.author
        storedId.value = this.author.id
        storedEmail.value = this.author.email
        this.loggedIn = true
      }
    },
    logout() {
      this.author = getInitialAuthorState().author
      this.loggedIn = false
    },
  },
})
