const Post = {
  // @ts-ignore
  author: (parent, args, { prisma }, info) => {
    return prisma.author.findFirst({
      where: {
        id: parent.authorId,
        posts: parent.author
          ? {
              some: {
                id: parent.id,
              },
            }
          : undefined,
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
      orderBy: {
        id: 'desc',
      },
    }),
}

export default Post
