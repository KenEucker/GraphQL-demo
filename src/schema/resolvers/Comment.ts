const Comment = {
  // @ts-ignore
  author: (parent, args, { db }, info) => db.authors.find((a) => a.id === parent.author),
  // @ts-ignore
  post: (parent, args, { db }, info) => db.posts.find((a) => a.id === parent.post),
}

export default Comment
