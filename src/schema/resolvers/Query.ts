import { Author, Interaction, Post } from '../generated/types'

const Query = {
  // @ts-ignore
  author: (parent, args, { prisma }, info) => prisma.author.findUnique({ where: args.where }),
  // @ts-ignore
  post: (parent, args, { prisma }, info) => db.posts.find((p) => p.id === args.id),
  // @ts-ignore
  interaction: (parent, args, { prisma }, info) => db.interactions.find((i) => i.id === args.id),
  // @ts-ignore
  authors: (parent, { where }, { prisma }, info) => {
    if (where?.id || where?.name || where?.email || where?.handle) {
      return prisma.author.findMany({ where })
      // return db.authors.filter(
      //   (a: Author) =>
      //     a.id === where.id || a.email === where.email || a.handle === where.handle || a.name === where.name
      // )
    }
    return prisma.author.findMany()

    // return db.authors
  },
  // @ts-ignore
  posts: (parent, { where }, { prisma }, info) => {
    if (where?.id || where?.title || where?.text) {
      return prisma.post.findMany({
        where: {
          id: where.id,
          title: {
            search: where.title,
          },
          text: {
            search: where.text,
          },
        },
      })
      // return db.posts.filter(
      //   (p: Post) =>
      //     p.id === where.id ||
      //     p.text?.toLowerCase().indexOf(where.text) !== -1 ||
      //     p.title.toLowerCase().indexOf(where.title) !== -1
      // )
    }

    return prisma.post.findMany()
  },
  // @ts-ignore
  interactions: (parent, { where }, { prisma }, info) => {
    const foundInteractions: any = []

    if (where?.author) {
      foundInteractions.push(
        prisma.author.findMany({
          where: {
            author: {
              id: where.author.id ?? 0,
            },
          },
        })
      )
    }

    if (where?.text) {
      foundInteractions.push(
        prisma.author.findMany({
          where: {
            text: {
              search: where.text,
            },
          },
        })
      )
    }

    if (where?.author || where?.text) {
      /// Do not return duplicates
      /// TODO: Need to dedup here
      return foundInteractions
      // return foundInteractions.filter((o: any, i: number) => foundInteractions.indexOf(o) === i)
    }

    return prisma.interactions.findMany()
  },
}

export default Query
