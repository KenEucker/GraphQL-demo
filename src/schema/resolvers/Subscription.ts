import { GraphQLError } from 'graphql'

const Subscription = {
    countdown: {
        // This will return the value on every 1 sec until it reaches 0
        // @ts-ignore
        subscribe: async function* (parent, { from }) {
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
        subscribe: async function* (parent, { postId }, { db }) {
            const post = db.posts.find(p => p.id === postId)

            if (!post) {
                throw new GraphQLError(`Post does not exist.`)
            }

            const commentCount = Object.values(post.comments).length
            if (commentCount) {
                const latestCommentId = post.comments[commentCount - 1]
                console.log({latestCommentId, commentCount, comments: post.comments})
                const comment = db.comments.find(c => c.id === latestCommentId)

                yield comment
            } else {
                yield null
            }
        },
        // @ts-ignore
        resolve: (data) => data,
    }
}

export default Subscription