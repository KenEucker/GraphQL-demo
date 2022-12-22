import { Author, Interaction, Post } from '../generated/types'

const Query = {
  // @ts-ignore
  author: (parent, args, { db }, info) => db.authors.find((p) => p.id === args.id),
  // @ts-ignore
  post: (parent, args, { db }, info) => db.posts.find((p) => p.id === args.id),
  // @ts-ignore
  interaction: (parent, args, { db }, info) => db.interactions.find((i) => i.id === args.id),
  // @ts-ignore
  authors: (parent, { where }, { db, prisma }, info) => {
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
  posts: (parent, { where }, { db, prisma }, info) => {
    if (where?.id || where?.title || where?.text) {
      return prisma.post.findMany()
      return db.posts.filter(
        (p: Post) =>
          p.id === where.id ||
          p.text?.toLowerCase().indexOf(where.text) !== -1 ||
          p.title.toLowerCase().indexOf(where.title) !== -1
      )
    }

    return prisma.post.findMany()
  },
  // @ts-ignore
  interactions: (parent, { where }, { prisma }, info) => {
    let foundInteractions: any = []

    if (where?.author) {
      const authorsFound: any[] = prisma.author.filter(
        (a: Author) => a.name.toLowerCase().indexOf(where.author.toLowerCase()) !== -1
      )
      foundInteractions = foundInteractions.concat(
        authorsFound.reduce((o, a) => o.concat(a.interactions), [])
      )
    }

    if (where?.text) {
      const interactionsFound: any[] = prisma.interaction.findMany(
        (i: Interaction) => i.text?.indexOf(where.text.toLowerCase()) !== -1
      )
      foundInteractions = foundInteractions.concat(interactionsFound)
    }

    if (where?.author || where?.text) {
      /// Do not return duplicates
      return foundInteractions.filter((o: any, i: number) => foundInteractions.indexOf(o) === i)
    }

    return db.interactions
  },
}

export default Query
