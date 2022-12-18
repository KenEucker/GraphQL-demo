import { GraphQLError } from 'graphql'
import { pipe, map, filter } from 'graphql-yoga'

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
    subscribe: (parent: never, { by }, { db, pubsub }) => {
      if (by && (by.id || by.email)) {
        const author = db.authors.find((a) => a.email === by.email || a.id === by.id)

        if (!author) {
          throw new GraphQLError('author does not exist')
        }
      }

      return pipe(
        pubsub.subscribe('author'),
        filter((a) => (by?.email ? a.data.email === by.email : true)),
        filter((a) => (by?.id ? a.data.id === by.id : true))
      )
    },
    resolve: (data: any) => data,
  },
  comment: {
    subscribe: (parent: never, { by }, { pubsub, db }) => {
      if (by && (by.author || by.post)) {
        const comment = db.comments.find((c) => c.author === by.author || c.post === by.post)

        if (!comment) {
          throw new GraphQLError('author or post does not exist')
        }
      }

      return pipe(
        pubsub.subscribe('comment'),
        filter((c) => (by?.author ? c.data.author === by.author : true)),
        filter((c) => (by?.post ? c.data.post === by.post : true))
      )
    },
    resolve: (data: any) => data,
  },
  post: {
    subscribe: (parent: never, { by }, { pubsub, db }) => {
      if (by && by.author) {
        const author = db.authors.find((a) => a.id === by.author)

        if (!author) {
          throw new GraphQLError('author does not exist')
        }
      }

      return pipe(
        pubsub.subscribe('post'),
        filter((p) => (by?.author ? p.data.author === by.author : true)),
        filter((p) => (p.mutation !== 'UNPUBLISHED' ? p.data.published : true))
      )
    },
    resolve: (data: any) => data,
  },
}

export default Subscription
