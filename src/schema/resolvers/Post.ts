import { Author, Interaction } from '../generated/types'

const Post = {
  // @ts-ignore
  author: (parent, args, { prisma }, info) => {
    return prisma.author.findFirst({
      where: {
        posts: {
          some: {
            id: parent.id,
          },
        },
        email: parent.email,
        handle: parent.handle,
      },
      include: { posts: true },
    })
  },
  // @ts-ignore
  interactions: (parent, args, { prisma }, info) =>
    prisma.interaction.findUnique({
      where: parent,
      include: { posts: true },
    }),
}

export default Post
