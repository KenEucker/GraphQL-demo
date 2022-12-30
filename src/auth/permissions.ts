import { Subscription } from './../schema/generated/types.d'
import { rule, shield, and, not, or, allow, deny } from 'graphql-shield'

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  return typeof ctx.auth0 !== 'undefined'
})

const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  return ctx.user.role === 'admin'
})

const isEditor = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  return ctx.user.role === 'editor'
})

// Permissions
const permissions = shield(
  {
    Query: {
      '*': allow,
    },
    Mutation: {
      createAuthor: allow,
      createInteraction: isAuthenticated,
      createPost: isAuthenticated,
      publishPost: isAuthenticated,
      unPublishPost: isAuthenticated,
      deleteAuthor: isAuthenticated,
      deleteInteraction: isAuthenticated,
      deletePost: isAuthenticated,
      updateAuthor: isAuthenticated,
      updateInteraction: isAuthenticated,
      updatePost: isAuthenticated,
      verifyAuthor: isAuthenticated,
      unVerifyAuthor: isAuthenticated,
    },
    Subscription: {
      '*': allow,
      author: isAuthenticated,
      interaction: isAuthenticated,
    },
  },
  {
    allowExternalErrors: true,
  }
)

export default permissions
