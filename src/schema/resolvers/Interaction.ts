import { Author, Post } from '../generated/types'

const Interaction = {
  // @ts-ignore
  author: (parent, args, { prisma }, info) => {
    return prisma.author.findMany({
      where: {
        posts: parent.post.id,
      },
    })
  },
  // @ts-ignore
  post: (parent, args, { prisma }, info) =>
    prisma.post.findMany({
      where: {
        id: parent.post.id,
      },
    }),
}

export default Interaction
