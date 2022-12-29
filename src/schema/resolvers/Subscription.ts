import { GraphQLError } from 'graphql'
import { pipe, filter } from 'graphql-yoga'
import { Author, AuthorByInput, InteractionByInput, PostByInput } from '../generated/types'

const Subscription = {
  countdown: {
    // This will return the value on every 1 sec until it reaches 0
    subscribe: async function* (parent: never, args: { from: number }) {
      const from = args.from ?? 100

      for (let i = from; i >= 0; i--) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        yield i
      }
    },
    resolve: (data: any) => data,
  },
  author: {
    subscribe: async (
      parent: never,
      { where }: { where: AuthorByInput },
      { prisma, pubsub }: any
    ) => {
      if (where && (where.id || where.email || where.handle)) {
        const author = await prisma.author.findUnique({ where })

        if (!author) {
          throw new GraphQLError('author does not exist')
        }
      }

      return pipe(
        pubsub.subscribe('author'),
        filter((a: { data: Author }) => (where?.email ? a.data.email === where.email : true)),
        filter((a: { data: Author }) => (where?.id ? a.data.id === where.id : true))
      )
    },
    resolve: (data: any) => data,
  },
  interaction: {
    subscribe: async (
      parent: never,
      { where }: { where: InteractionByInput },
      { pubsub, prisma }: any
    ) => {
      if (where && (where.author || where.post)) {
        const interaction = await prisma.interaction.findUnique({
          where: {
            posts: where.post,
            authors: where.author,
          },
        })

        if (!interaction) {
          throw new GraphQLError('author or post does not exist')
        }
      }

      return pipe(
        pubsub.subscribe('interaction'),
        filter((c: any) => (where?.author?.id ? c.data.authorId === where.author.id : true)),
        filter((c) => (where?.post?.id ? c.data.postId === where.post.id : true))
      )
    },
    resolve: (data: any) => data,
  },
  post: {
    subscribe: async (
      parent: never,
      { where }: { where: PostByInput },
      { pubsub, prisma }: any
    ) => {
      if (where && where.author) {
        const author = await prisma.author.findUnique({ where: where.author })

        if (!author) {
          throw new GraphQLError('author does not exist')
        }
      }

      return pipe(
        pubsub.subscribe('post'),
        filter((p: any) => (where?.author?.id ? p.data.authorId === where.author.id : true)),
        filter((p: any) => (where?.author?.email ? p.data.email === where.author.email : true)),
        filter((p: any) => (where?.author?.handle ? p.data.handle === where.author.handle : true)),
        filter((p) => (p.mutation !== 'UNPUBLISHED' ? p.data.published : true))
      )
    },
    resolve: (data: any) => data,
  },
}

export default Subscription
