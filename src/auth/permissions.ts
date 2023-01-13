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
      createCreator: allow,
      createInteraction: isAuthenticated,
      createPost: isAuthenticated,
      publishPost: isAuthenticated,
      unPublishPost: isAuthenticated,
      deleteCreator: isAuthenticated,
      deleteInteraction: isAuthenticated,
      deletePost: isAuthenticated,
      updateCreator: isAuthenticated,
      toggleInteraction: isAuthenticated,
      updatePost: isAuthenticated,
      verifyCreator: isAuthenticated,
      unVerifyCreator: isAuthenticated,
    },
    Subscription: {
      '*': allow,
      creator: isAuthenticated,
      interaction: isAuthenticated,
    },
  },
  {
    allowExternalErrors: true,
  }
)

export default permissions
