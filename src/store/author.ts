import { apolloClient } from './'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { useStorage } from '@vueuse/core'
import { Author } from '../schema/generated/types.d'
import auth0 from '../auth'

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
    async authorSignup(author: Author) {
      const SignUpAuthorQuery = gql`
        mutation SignUpAuthor($author: CreateAuthorInput!) {
          createAuthor(author: $author) {
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

      try {
        const { data, errors } = await apolloClient.mutate({
          mutation: SignUpAuthorQuery,
          variables: { author },
        })

        if (data?.createAuthor) {
          this.author = data.createAuthor
          storedId.value = this.author.id
          storedEmail.value = this.author.email
          this.loggedIn = true
        } else {
          return errors ?? data.error ?? 'unknown error'
        }

        return null
      } catch (err: any) {
        return err.message ?? err
      }
    },
    loginWithAuth0() {
      auth0.loginWithRedirect()
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
      const { data, error: queryError } = await apolloClient.query({
        query: loginViaEmailQuery,
        variables: { email: author.email },
      })
      let error = null

      if (data?.author) {
        this.author = data.author
        storedId.value = this.author.id
        storedEmail.value = this.author.email
        this.loggedIn = true
      } else if (queryError) {
        error = queryError.message
      } else {
        error = 'no author found with that email address'
      }

      return error
    },
    async updateAuthor(author: Author) {
      const updateAuthorMutation = gql`
        mutation StoreUpdateAuthor($data: UpdateAuthorInput!, $id: Int!) {
          updateAuthor(data: $data, id: $id) {
            id
          }
        }
      `
      const data = await apolloClient.mutate({
        mutation: updateAuthorMutation,
        variables: { data: author, id: this.author.id },
      })

      return data
    },
    logout() {
      this.author = getInitialAuthorState().author
      this.loggedIn = false
      storedId.value = null
      storedEmail.value = null
    },
    async isEmailInUse(email: string) {
      const checkForEmailInUseQuery = gql`
        query StoreAuthorEmailInUse($email: String!) {
          author(where: { email: $email }) {
            email
          }
        }
      `
      const { data, error } = await apolloClient.query({
        query: checkForEmailInUseQuery,
        variables: { email },
      })

      return error ?? data?.author
    },
  },
})
