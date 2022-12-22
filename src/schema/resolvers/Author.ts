import { Interaction, Post } from '../generated/types'

const Author = {
  // @ts-ignore
  interactions: (parent, args, { prisma }, info) =>
    prisma.interaction.findMany({
      where: {
        author: {
          id: parent.id,
        },
        post: {
          id: parent.post.id,
        },
      },
      include: {
        author: true,
      },
    }),
  // @ts-ignore
  posts: (parent, args, { prisma }, info) =>
    prisma.post.findMany({
      where: {
        author: {
          id: parent.id,
        },
      },
    }),
}

export default Author
