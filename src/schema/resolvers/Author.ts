import { Interaction } from '../generated/types'

const Author = {
  // @ts-ignore
  interactions: (parent, args, { db }, info) =>
    db.interactions.filter((i: Interaction) => i.author === parent.id),
  // @ts-ignore
  posts: (parent, args, { db }, info) => db.posts.filter((p) => p.author === parent.id),
}

export default Author
