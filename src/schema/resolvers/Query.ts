import { Author, Interaction, Post } from '../generated/types'

const Query = {
  // @ts-ignore
  author: (parent, args, { db }, info) => db.authors.find((p) => p.id === args.id),
  // @ts-ignore
  post: (parent, args, { db }, info) => db.posts.find((p) => p.id === args.id),
  // @ts-ignore
  interaction: (parent, args, { db }, info) => db.interactions.find((i) => i.id === args.id),
  // @ts-ignore
  authors: (parent, { by }, { db, prisma }, info) => {
    if (by?.id || by?.name || by?.email || by?.handle) {
      return prisma.author.findMany()
      // return db.authors.filter(
      //   (a: Author) =>
      //     a.id === by.id || a.email === by.email || a.handle === by.handle || a.name === by.name
      // )
    }
    return prisma.author.findMany()

    // return db.authors
  },
  // @ts-ignore
  posts: (parent, { by }, { db, prisma }, info) => {
    if (by?.id || by?.title || by?.text) {
      return prisma.post.findMany()
      return db.posts.filter(
        (p: Post) =>
          p.id === by.id ||
          p.text?.toLowerCase().indexOf(by.text) !== -1 ||
          p.title.toLowerCase().indexOf(by.title) !== -1
      )
    }

    return prisma.post.findMany()
  },
  // @ts-ignore
  interactions: (parent, { by }, { db }, info) => {
    let foundInteractions: any = []

    if (by?.author) {
      const authorsFound: any[] = db.authors.filter(
        (a: Author) => a.name.toLowerCase().indexOf(by.author.toLowerCase()) !== -1
      )
      foundInteractions = foundInteractions.concat(
        authorsFound.reduce((o, a) => o.concat(a.interactions), [])
      )
    }

    if (by?.text) {
      const interactionsFound: any[] = db.interactions.filter(
        (i: Interaction) => i.text?.indexOf(by.text.toLowerCase()) !== -1
      )
      foundInteractions = foundInteractions.concat(interactionsFound)
    }

    if (by?.author || by?.text) {
      /// Do not return duplicates
      return foundInteractions.filter((o: any, i: number) => foundInteractions.indexOf(o) === i)
    }

    return db.interactions
  },
}

export default Query
