import { v4 as uuidv4 } from 'uuid'
import { GraphQLError } from 'graphql'
import { MutationType } from '../generated/types.d'

const Mutation = {
  // @ts-ignore
  createAuthor(parent, args, { db, pubsub }, info) {
    const emailTaken = db.authors.some((a: { email: any }) => args.author.email === a.email)
    if (emailTaken) {
      throw new GraphQLError(`Email is already in use.`)
    }

    const handleTaken = db.authors.some((a: { handle: any }) => args.author.handle === a.handle)
    if (handleTaken) {
      throw new GraphQLError(`Handle is already in use.`)
    }

    const newAuthor = {
      id: uuidv4(),
      ...args.author,
      interactions: [],
      posts: [],
    }

    db.authors.push(newAuthor)
    pubsub.publish(`author`, { mutation: 'CREATED', data: newAuthor })

    return newAuthor
  },
  // @ts-ignore
  createInteraction(parent, args, { db, pubsub }, info) {
    const { authorId, postId } = args.interaction
    const author = db.authors.find((a: { id: any }) => authorId === a.id)
    if (!author) {
      throw new GraphQLError(`Author does not exist.`)
    }

    const postIndex = db.posts.findIndex((p: { id: any }) => postId === p.id)
    if (!postIndex) {
      throw new GraphQLError(`Post does not exist.`)
    }

    const post = db.posts[postIndex]

    const alreadyInteractionedOnPost = db.interactions.some(
      (c: { post: any; author: any }) => c.post === post.id && c.author === author.id
    )
    if (alreadyInteractionedOnPost) {
      throw new GraphQLError(`Author already interactioned on this post.`)
    }

    const newInteraction = {
      id: uuidv4(),
      text: args.interaction.text,
      post: post.id,
      author: author.id,
    }

    /// Add the new interaction to the database
    db.interactions.push(newInteraction)
    /// Add the new interaction to the post
    post.interactions.push(newInteraction.id)
    /// Update the post in the database
    db.posts[postIndex] = post

    pubsub.publish(`interaction`, { mutation: 'CREATED', data: newInteraction })

    return newInteraction
  },
  // @ts-ignore
  createPost(parent, args, { db, pubsub }, info) {
    const { authorId, title, body, published } = args.post
    const author = db.authors.find((a: { id: any }) => authorId === a.id)
    if (!author) {
      throw new GraphQLError(`Author does not exist.`)
    }

    const postAlreadyExists = db.posts.some(
      (p: { author: any; title: any }) => p.author === author.id && p.title === title
    )

    if (postAlreadyExists) {
      throw new GraphQLError(`Post already exists with title for author.`)
    }

    const newPost = {
      id: uuidv4(),
      title,
      body: body ?? '',
      author: author.id,
      published,
      interactions: [],
    }

    db.posts.push(newPost)
    pubsub.publish(`post`, { mutation: 'CREATED', data: newPost })

    return newPost
  },
  publishPost(parent: any, { id }: any, { db, pubsub }: any, info: any) {
    const postIndex = db.posts.findIndex((p: { id: any }) => p.id === id)

    if (postIndex === -1) {
      throw new GraphQLError(`Post does not exist.`)
    }

    const publishedPost = db.posts[postIndex]

    /// First, do nothing
    if (publishedPost.published) {
      return publishedPost
    }

    publishedPost.published = true

    db.posts[postIndex] = publishedPost
    pubsub.publish('post', { mutation: 'PUBLISHED', data: publishedPost })

    return publishedPost
  },
  unPublishPost(parent: any, { id }: any, { db, pubsub }: any, info: any) {
    const postIndex = db.posts.findIndex((p: { id: any }) => p.id === id)

    if (postIndex === -1) {
      throw new GraphQLError(`Post does not exist.`)
    }

    const unPublishedPost = db.posts[postIndex]

    /// First, do nothing
    if (!unPublishedPost.published) {
      return unPublishedPost
    }

    unPublishedPost.published = false

    db.posts[postIndex] = unPublishedPost
    /// TODO: this isn't firing for some reason
    pubsub.publish('post', { mutation: 'UNPUBLISHED', data: unPublishedPost })

    return unPublishedPost
  },

  // @ts-ignore
  deleteAuthor(parent, args, { db, pubsub }, info) {
    const authorIndex = db.authors.findIndex((a: { id: any }) => a.id === args.authorId)

    if (authorIndex === -1) {
      throw new GraphQLError(`Author does not exist.`)
    }

    const [deletedAuthor] = db.authors.splice(authorIndex, 1)

    db.posts = db.posts.filter((post: { author: any; id: any }) => {
      const match = post.author === args.authorId
      if (match) {
        /// Remove all interactions for that post
        db.interactions = db.interactions.filter((c: { post: any }) => c.post !== post.id)
      }

      return !match
    })

    /// Remove all interactions for the author
    db.interactions = db.interactions.filter((c: { author: any }) => c.author !== args.authorId)
    /// Publish the deleted event
    pubsub.publish(`author`, { mutation: 'DELETED', data: deletedAuthor })

    return deletedAuthor
  },
  // @ts-ignore
  deleteInteraction(parent, args, { db, pubsub }, info) {
    const interactionIndex = db.interactions.findIndex(
      (a: { id: any }) => a.id === args.interactionId
    )

    if (interactionIndex === -1) {
      throw new GraphQLError(`Interaction does not exist.`)
    }

    const [deletedInteraction] = db.interactions.splice(interactionIndex, 1)

    pubsub.publish(`interaction`, { mutation: 'DELETED', data: deletedInteraction })

    return deletedInteraction
  },
  // @ts-ignore
  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex((a: { id: any }) => a.id === args.postId)

    if (postIndex === -1) {
      throw new GraphQLError(`Post does not exist.`)
    }

    const [deletedPost] = db.posts.splice(postIndex, 1)

    db.interactions = db.interactions.filter((c: { post: any }) => c.post !== args.postId)
    if (deletedPost.published) {
      pubsub.publish(`post`, { mutation: 'DELETED', data: deletedPost })
    }

    return deletedPost
  },

  // @ts-ignore
  updateAuthor(parent, args, { db, pubsub }, info) {
    const { data, id } = args
    const authorIndex = db.authors.findIndex((a: { id: any }) => a.id === id)

    if (authorIndex === -1) {
      throw new GraphQLError(`Author does not exist.`)
    }
    const updatedAuthor = db.authors[authorIndex]

    if (typeof data.email === 'string') {
      const emailTaken = db.authors.some((a: { email: any }) => a.email === data.email)

      if (emailTaken) {
        throw new GraphQLError(`Email already taken.`)
      }

      updatedAuthor.email = data.email
    }

    updatedAuthor.name = data.name ?? updatedAuthor.name

    db.authors[authorIndex] = updatedAuthor
    pubsub.publish('author', { mutation: 'UPDATED', data: updatedAuthor })

    return updatedAuthor
  },
  // @ts-ignore
  updateInteraction(parent, args, { db, pubsub }, info) {
    const { data, id } = args
    const interactionIndex = db.interactions.findIndex((a: { id: any }) => a.id === id)

    if (interactionIndex === -1) {
      throw new GraphQLError(`Interaction does not exist.`)
    }

    const updatedInteraction = db.interactions[interactionIndex]

    updatedInteraction.text = data.text ?? updatedInteraction.text
    /// Not going to allow changing the post that a interaction was left for
    /// Not going to allow changing the author that left the interaction

    db.interactions[interactionIndex] = updatedInteraction
    pubsub.publish('interaction', { mutation: 'UPDATED', data: updatedInteraction })

    return updatedInteraction
  },
  // @ts-ignore
  updatePost(parent, args, { db, pubsub }, info) {
    const { data, id } = args
    const postIndex = db.posts.findIndex((a: { id: any }) => a.id === id)

    if (postIndex === -1) {
      throw new GraphQLError(`Post does not exist.`)
    }

    const updatedPost = db.posts[postIndex]
    updatedPost.title = data.title ?? updatedPost.title
    updatedPost.body = data.body ?? updatedPost.body
    /// Not allowing the updating of the published field with updatePost
    /// Client must use publishPost/unPublishPost mutations to set this

    db.posts[postIndex] = updatedPost

    if (updatedPost.published) {
      pubsub.publish('post', { mutation: 'UPDATED', data: updatedPost })
    }

    return updatedPost
  },

  // @ts-ignore
  verifyAuthor(parent, args, { db, pubsub }, info) {
    const { data, id } = args
    const authorIndex = db.authors.findIndex((a: { id: any }) => a.id === id)

    if (authorIndex === -1) {
      throw new GraphQLError(`Author does not exist.`)
    }
    const updatedAuthor = db.authors[authorIndex]

    updatedAuthor.verified = true

    db.authors[authorIndex] = updatedAuthor
    pubsub.publish('author', { mutation: 'UPDATED', data: updatedAuthor })

    return updatedAuthor
  },
}

export default Mutation
