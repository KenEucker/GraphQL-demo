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
    async authorSignup(email: string) {
      const SignUpAuthorQuery = gql`
        query SignUpAuthor($email: String!) {
          createAuthor(data: {
            email,
          })
        }
      `
      const { data } = await apolloClient.query({
        query: SignUpAuthorQuery,
        variables: { email },
      })

      if (data?.author) {
        this.author = data.author
        storedId.value = this.author.id
        storedEmail.value = this.author.email
        this.loggedIn = true
      }
    },
    loginWithEmail(email: string) {
      return this.login({ email } as Author)
    },
    async login(author?: Author) {
      author = author ?? ({ id: storedId.value, email: storedEmail.value } as Author)
      const loginViaEmailQuery = gql`
        query StoreAuthor($email: String!) {
          author(where: { email: $email }) {
            id
            name
            email
            handle
            verified
            status
            avatar
            location
            bio
            birthday
            link
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
    async updateAuthor(author: Author) {
      const updateAuthorMutation = gql`
        mutation StoreUpdateAuthor($data: UpdateAuthorInput!, $id: Int!) {
          updateAuthor(data: $data, id: $id) {
            id
          }
        }
      `
      console.log('updating author', author)
      const data = await apolloClient.mutate({
        mutation: updateAuthorMutation,
        variables: { data: author, id: this.author.id },
      })
    },
    logout() {
      this.author = getInitialAuthorState().author
      this.loggedIn = false
      storedId.value = null
      storedEmail.value = null
    },
  },
})
