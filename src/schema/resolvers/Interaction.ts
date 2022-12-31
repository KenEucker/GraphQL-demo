const Interaction = {
  // @ts-ignore
  author: async (parent, args, { prisma }, info) =>
    prisma.author.findMany({
      where: {
        id: parent.authorId,
      },
    }),
  // @ts-ignore
  post: async (parent, args, { prisma }, info) =>
    prisma.post.findMany({
      where: {
        id: parent.postId,
      },
    }),
}

export default Interaction
