const Post = {
  // @ts-ignore
  author: (parent, args, { db }, info) => db.authors.find((a) => a.id === parent.author),
  // @ts-ignore
  interactions: (parent, args, { db }, info) => db.interactions.filter((i) => i.post === parent.id),
}

export default Post
