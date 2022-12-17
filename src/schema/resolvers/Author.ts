const Author = {
  // @ts-ignore
  comments: (parent, args, { db }, info) => db.comments.filter((c) => c.author === parent.id),
  // @ts-ignore
  posts: (parent, args, { db }, info) => db.posts.filter((p) => p.author === parent.id),
}

export default Author
