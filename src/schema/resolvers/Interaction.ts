import { Author, Post } from '../generated/types'

const Interaction = {
  // @ts-ignore
  author: async (parent, args, { prisma }, info) => {
    console.log({ parent })
    const results = await prisma.author.findMany({
      where: {
        id: parent.authorId,
      },
    })
    console.log({ results })

    return results
  },
  // @ts-ignore
  post: async (parent, args, { prisma }, info) => {
    console.log({ parent })
    const results = await prisma.post.findMany({
      where: {
        id: parent.postId,
      },
    })
    console.log({ results })
    return results
  },
}

export default Interaction
