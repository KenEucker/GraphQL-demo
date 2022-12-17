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
    // @ts-ignore
    resolve: (data) => data,
  },
  comment: {
    // @ts-ignore
    // subscribe: async function* (parent, { postId }, { db, pubsub }) {
    //   const post = db.posts.find((p) => p.id === postId)

    //   if (!post) {
    //     throw new GraphQLError(`Post does not exist.`)
    //   }

    //   const getLatestPost = () => {
    //     const commentCount = Object.values(post.comments).length
    //     if (commentCount) {
    //       const latestCommentId = post.comments[commentCount - 1]
    //       // console.log({ latestCommentId, commentCount, comments: post.comments })
    //       return db.comments.find((c) => c.id === latestCommentId)
    //     }

    //     return null
    //   }

    //   yield getLatestPost()
    // },
    subscribe: (_, { postId }, { pubsub }) =>
      pipe(
        pubsub.subscribe('comment'),
        filter(c => c.post === postId),
        // map(c => c.post === postId)
      ),
    // @ts-ignore
    resolve: (data) => data,
  },
}

export default Subscription
