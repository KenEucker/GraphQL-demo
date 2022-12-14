import { Interaction, Post } from '../generated/types'

const Author = {
  // @ts-ignore
  // email: (parent, args, { prisma, auth0 }, info) => {
  //   console.log({ parent, auth0 })
  //   if (parent.id === auth0?.author?.id) {
  //     return parent.email
  //   }
  //   return null
  // },
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
      orderBy: {
        id: 'desc',
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
      orderBy: {
        id: 'desc',
      },
    }),
}

export default Author
