import { UpdateAuthorInput } from './../schema/generated/types.d'
import { apolloClient } from './'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { useStorage } from '@vueuse/core'
import { Author } from '../schema/generated/types.d'
import auth from '../auth'
import { watch } from 'vue'

// Local storage state
const storedEmail = useStorage('author-email', '')
const storedId = useStorage('author-id', 0)
const storedToken = useStorage('author-token', '')

export const getInitialAuthorState = (): {
  loggedIn: boolean
  author: Author
  auth0Configured: boolean
  auth0Token: string
} => ({
  loggedIn: false,
  auth0Configured: auth.initialized,
  author: {
    id: 0,
    avatar: '',
    banner: '',
    email: '',
    name: '',
    handle: '',
    verified: false,
  },
  auth0Token: '',
})

export const useAuthorState = defineStore({
  id: 'useAuthorState',
  state: getInitialAuthorState,
  getters: {
    isAuth0: (s) => s.auth0Configured,
    isAuthorSignedUp: (s) => s.author?.id !== -1,
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
            banner
            website
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
      auth.loginWithRedirect()
    },
    loginWithEmail(email: string) {
      return this.fetchAuthor({ email } as Author)
    },
    async checkLogin() {
      if (this.auth0Configured) {
        watch(auth.user, async (user) => {
          if (auth?.isAuthenticated?.value) {
            this.loggedIn = true
            this.author = {
              id: -1,
              name: user.name,
              email: user.email,
              avatar: user.picture,
              handle: user.nickname,
              verified: false,
            }
            if (!storedToken.value.length) {
              this.auth0Token = await auth.getAccessTokenSilently()

              if (this.auth0Token.length) {
                storedToken.value = this.auth0Token
              }
            }

            this.fetchAuthor(this.author)
          } else if (storedId.value !== 0 || storedEmail.value.length) {
            this.logout()
          }
        })
      } else {
        if (await this.login()) {
          this.logout()
        }
      }
    },
    async login() {
      if (this.auth0Configured && auth?.isAuthenticated?.value) {
        return this.loginWithAuth0()
      } else {
        return this.fetchAuthor()
      }
    },
    async fetchAuthor(author?: Author) {
      author = author ?? ({ id: storedId.value, email: storedEmail.value } as Author)
      const loginViaEmailQuery = gql`
        query StoreFetchAuthor($email: String!) {
          author(where: { email: $email }) {
            id
            name
            email
            handle
            verified
            status
            avatar
            location
            banner
            bio
            birthday
            website
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
            name
            email
            handle
            verified
            status
            avatar
            location
            banner
            bio
            birthday
            website
          }
        }
      `

      const data = await apolloClient.mutate({
        mutation: updateAuthorMutation,
        variables: { data: author, id: this.author.id },
      })

      if (data.data.updateAuthor) {
        const author = data.data.updateAuthor
        this.author = {
          id: author.id,
          name: author.name,
          handle: author.name,
          avatar: author.avatar,
          banner: author.banner,
          location: author.location,
          website: author.website,
          email: author.email,
          bio: author.bio,
          birthday: author.birthday,
        }

        return data.data.updateAuthor
      }

      return data
    },
    logout() {
      this.author = getInitialAuthorState().author
      this.loggedIn = false
      storedId.value = null
      storedEmail.value = null
      storedToken.value = null

      if (auth?.isAuthenticated) {
        auth.logout({ returnTo: window.location.origin })
      }
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
