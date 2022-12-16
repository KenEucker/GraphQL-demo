const Post = {
  // @ts-ignore
    author: (parent, args, { db }, info) =>  db.authors.find(a => a.id === parent.author),
  // @ts-ignore
    comments: (parent, args, { db }, info) => db.comments.filter(c => c.post === parent.id)
}

export default Post