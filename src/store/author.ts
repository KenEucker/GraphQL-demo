import { apolloClient } from './'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { useStorage } from '@vueuse/core'
import { Author } from '../schema/generated/types.d'
import auth0 from '../auth'
import { watch } from 'vue'

// Local storage state
const storedEmail = useStorage('author-email', '')
const storedId = useStorage('author-id', 0)

export const getInitialAuthorState = (): {
  loggedIn: boolean
  author: Author
  auth0Configured: boolean
} => ({
  loggedIn: false,
  auth0Configured: auth0.initialized,
  author: {
    id: 0,
    avatar: '',
    email: '',
    name: '',
    handle: '',
    verified: false,
  },
})

export const useAuthorState = defineStore({
  id: 'useAuthorState',
  state: getInitialAuthorState,
  getters: {
    isAuth0: (s) => s.auth0Configured,
    isAuthorSignedUp: (s) => s.author?.id !== 0,
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
      return this.fetchAuthor({ email } as Author)
    },
    checkLogin() {
      if (this.auth0Configured) {
        watch(auth0.user, (user) => {
          if (auth0?.isAuthenticated?.value) {
            this.loggedIn = true
            this.author = {
              id: 0,
              name: user.name,
              email: user.email,
              avatar: user.picture,
              handle: user.nickname,
              verified: false,
            }
            this.fetchAuthor(this.author)
          } else {
            console.log({ auth0 })
          }
        })
      } else {
        this.login()
      }
    },
    async login() {
      if (this.auth0Configured && auth0?.isAuthenticated?.value) {
        return this.loginWithAuth0()
      } else {
        return this.fetchAuthor()
      }
    },
    async fetchAuthor(author?: Author) {
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
      if (auth0?.isAuthenticated) {
        auth0.logout()
      }

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
