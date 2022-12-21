import { GraphQLError } from 'graphql'
import { pipe, filter } from 'graphql-yoga'
import { Author, AuthorByInput, InteractionByInput, PostByInput } from '../generated/types'

const Subscription = {
  countdown: {
    // This will return the value on every 1 sec until it reaches 0
    // @ts-ignore
    subscribe: async function* (parent, args) {
      const from = args.from ?? 100

      for (let i = from; i >= 0; i--) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        yield i
      }
    },
    resolve: (data: any) => data,
  },
  author: {
    subscribe: (parent: never, { by }: { by: AuthorByInput }, { db, pubsub }: any) => {
      if (by && (by.id || by.email || by.handle)) {
        const author = db.authors.find(
          (a: Author) => a.email === by.email || a.id === by.id || a.handle === by.handle
        )

        if (!author) {
          throw new GraphQLError('author does not exist')
        }
      }

      return pipe(
        pubsub.subscribe('author'),
        filter((a: { data: Author }) => (by?.email ? a.data.email === by.email : true)),
        filter((a: { data: Author }) => (by?.id ? a.data.id === by.id : true))
      )
    },
    resolve: (data: any) => data,
  },
  interaction: {
    subscribe: (parent: never, { by }: { by: InteractionByInput }, { pubsub, db }: any) => {
      if (by && (by.author || by.post)) {
        const interaction = db.interactions.find(
          (c: any) => c.author === by.author || c.post === by.post
        )

        if (!interaction) {
          throw new GraphQLError('author or post does not exist')
        }
      }

      return pipe(
        pubsub.subscribe('interaction'),
        filter((c: any) => (by?.author ? c.data.author === by.author : true)),
        filter((c) => (by?.post ? c.data.post === by.post : true))
      )
    },
    resolve: (data: any) => data,
  },
  post: {
    subscribe: (parent: never, { by }: { by: PostByInput }, { pubsub, db }: any) => {
      if (by && by.author) {
        const author = db.authors.find((a: Author) => a.id === by.author)

        if (!author) {
          throw new GraphQLError('author does not exist')
        }
      }

      return pipe(
        pubsub.subscribe('post'),
        filter((p: any) => (by?.author ? p.data.author === by.author : true)),
        filter((p) => (p.mutation !== 'UNPUBLISHED' ? p.data.published : true))
      )
    },
    resolve: (data: any) => data,
  },
}

export default Subscription
