const Query = {
  // @ts-ignore
  author: (parent, args, { db }, info) => db.authors.find((p) => p.id === args.id),
  // @ts-ignore
  post: (parent, args, { db }, info) => db.posts.find((p) => p.id === args.id),
  // @ts-ignore
  authors: (parent, args, { db }, info) => {
    if (args.query) {
      const query = args.query.toLowerCase() /// Why hack?
      return db.authors.filter(
        (a) =>
          a.firstName.toLowerCase().indexOf(query) !== -1 ||
          a.lastName.toLowerCase().indexOf(query) !== -1
      )
    }

    return db.authors
  },
  // @ts-ignore
  posts: (parent, args, { db }, info) => {
    if (args.query) {
      const query = args.query.toLowerCase() /// Why hack?
      return db.posts.filter(
        (p) =>
          p.body.toLowerCase().indexOf(query) !== -1 || p.title.toLowerCase().indexOf(query) !== -1
      )
    }

    return db.posts
  },
  // @ts-ignore
  comments: (parent, args, { db }, info) => {
    let foundComments: any = []

    if (args.author) {
      const author = args.author.toLowerCase() /// Why hack?
      const authorsFound: any[] = db.authors.filter(
        (a) =>
          a.firstName.toLowerCase().indexOf(author) !== -1 ||
          a.lastName.toLowerCase().indexOf(author) !== -1
      )
      foundComments = foundComments.concat(authorsFound.reduce((o, a) => o.concat(a.comments), []))
    }

    if (args.text) {
      const text = args.text.toLowerCase() /// Why hack?
      const commentsFound: any[] = db.comments.filter((c) => c.text.indexOf(text) !== -1)
      foundComments = foundComments.concat(commentsFound)
    }

    if (args.author || args.text) {
      /// Do not return duplicates
      return foundComments.filter((o: any, i: number) => foundComments.indexOf(o) === i)
    }

    return db.comments
  },
}

export default Query
