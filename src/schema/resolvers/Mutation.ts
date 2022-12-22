import { v4 as uuidv4 } from 'uuid'
import { GraphQLError } from 'graphql'
import { MutationType } from '../generated/types.d'

const Mutation = {
  // @ts-ignore
  async createAuthor(parent, args, { prisma, pubsub }, info) {
    const emailTaken = await prisma.author.findUnique({
      where: {
        email: args.data.email,
      },
    })
    if (emailTaken) {
      throw new GraphQLError(`Email is already in use.`)
    }

    const handleTaken = await prisma.author.findUnique({
      where: {
        handle: args.data.handle,
      },
    })
    if (handleTaken) {
      throw new GraphQLError(`Handle is already in use.`)
    }

    const newAuthor = {
      ...args.author,
      interactions: [],
      posts: [],
    }

    const createdAuthor = await prisma.author.create({ data: newAuthor })
    pubsub.publish(`author`, { mutation: 'CREATED', data: createdAuthor })

    return createdAuthor
  },
  // @ts-ignore
  async createInteraction(parent, args, { prisma, pubsub }, info) {
    const { authorId, postId } = args.interaction
    const author = await prisma.author.findUnique({ where: { id: authorId } })
    if (!author) {
      throw new GraphQLError(`Author does not exist.`)
    }

    const post = await prisma.post.findUnique({ where: { id: postId } })

    if (!post) {
      throw new GraphQLError(`Post does not exist.`)
    }

    const alreadyInteractionedOnPost = await prisma.interaction.findUnique({
      where: {
        postId,
        authorId,
      },
    })
    if (alreadyInteractionedOnPost) {
      throw new GraphQLError(`Author post interaction already created for this post.`)
    }

    const newInteraction = {
      like: args.interaction.like,
      love: args.interaction.love,
      share: args.interaction.share,
      text: args.interaction.text,
      post: post.id,
      author: author.id,
    }

    const interactionCreated = await prisma.interaction.create({ data: newInteraction })

    pubsub.publish(`interaction`, { mutation: 'CREATED', data: interactionCreated })

    return interactionCreated
  },
  // @ts-ignore
  async createPost(parent, args, { prisma, pubsub }, info) {
    const { authorId, title, text, status, published } = args.post
    const author = await prisma.author.findUnique({
      where: {
        id: authorId,
      },
    })
    if (!author) {
      throw new GraphQLError(`Author does not exist.`)
    }

    const postAlreadyExists = await prisma.post.findFirst({
      where: {
        author: {
          id: author.id,
        },
        title,
      },
    })

    if (postAlreadyExists) {
      throw new GraphQLError(`Post already exists with title for author.`)
    }

    const newPost = {
      authorId: author.id,
      title,
      text: text ?? '',
      status,
      published,
    }

    const createdPost = await prisma.post.create({ data: newPost })
    pubsub.publish(`post`, { mutation: 'CREATED', data: createdPost })

    return createdPost
  },
  async publishPost(parent: any, { id }: any, { prisma, pubsub }: any, info: any) {
    const unpublishedPost = await prisma.post.findUnique({ where: { id } })

    if (!unpublishedPost) {
      throw new GraphQLError(`Post does not exist.`)
    }

    /// First, do nothing
    if (unpublishedPost.published) {
      return unpublishedPost
    }

    unpublishedPost.published = true

    const publishedPost = await prisma.post.update({
      where: {
        id: unpublishedPost.id,
      },
      data: unpublishedPost,
    })
    pubsub.publish('post', { mutation: 'PUBLISHED', data: publishedPost })

    return publishedPost
  },
  async unPublishPost(parent: any, { id }: any, { prisma, pubsub }: any, info: any) {
    const publishedPost = await prisma.post.findUnique({ where: { id } })

    if (!publishedPost) {
      throw new GraphQLError(`Post does not exist.`)
    }

    /// First, do nothing
    if (publishedPost.published) {
      return publishedPost
    }

    publishedPost.published = false

    const unPublishedPost = await prisma.post.update({
      where: {
        id: publishedPost.id,
      },
      data: publishedPost,
    })
    pubsub.publish('post', { mutation: 'PUBLISHED', data: unPublishedPost })

    return unPublishedPost
  },

  // @ts-ignore
  async deleteAuthor(parent, args, { prisma, pubsub }, info) {
    const { data, id } = args
    const authorToDelete = await prisma.author.findUnique({ where: { id } })

    if (!authorToDelete) {
      throw new GraphQLError(`Author does not exist.`)
    }

    const deletedAuthor = await prisma.author.delete({ where: { id } })

    /// Publish the deleted event
    pubsub.publish(`author`, { mutation: 'DELETED', data: deletedAuthor })

    return deletedAuthor
  },
  // @ts-ignore
  async deleteInteraction(parent, args, { prisma, pubsub }, info) {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which interaction to delete.')
    }

    const deletedInteraction = await prisma.interaction.delete({ where })

    pubsub.publish(`interaction`, { mutation: 'DELETED', data: deletedInteraction })

    return deletedInteraction
  },
  // @ts-ignore
  async deletePost(parent, args, { prisma, pubsub }, info) {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which post to delete.')
    }

    const postToDelete = await prisma.post.findUnique({ where: { id: args.postId } })

    if (!postToDelete) {
      throw new GraphQLError(`Post does not exist.`)
    }

    const deletedPost = await prisma.post.delete({
      where: { id: args.postId },
    })

    if (postToDelete.published) {
      pubsub.publish(`post`, { mutation: 'DELETED', data: deletedPost })
    }

    return deletedPost
  },

  // @ts-ignore
  async updateAuthor(parent, args, { prisma, pubsub }, info) {
    const { data, id } = args
    const authorToUpdate = await prisma.author.findUnique({ where: { id } })

    if (!authorToUpdate) {
      throw new GraphQLError(`Author does not exist.`)
    }

    if (typeof data.email === 'string' && data.email !== authorToUpdate.email) {
      const emailTaken = await prisma.author.findUnique({ where: { email: authorToUpdate.email } })

      if (emailTaken) {
        throw new GraphQLError(`Email already taken.`)
      }

      authorToUpdate.email = data.email
    }

    authorToUpdate.name = data.name ?? authorToUpdate.name
    authorToUpdate.link = data.link ?? authorToUpdate.link
    authorToUpdate.location = data.location ?? authorToUpdate.location
    authorToUpdate.bio = data.bio ?? authorToUpdate.status
    authorToUpdate.status = data.name ?? authorToUpdate.status

    const updatedAuthor = await prisma.author.update({ where: { id }, data: authorToUpdate })
    pubsub.publish('author', { mutation: 'UPDATED', data: updatedAuthor })

    return updatedAuthor
  },
  // @ts-ignore
  async updateInteraction(parent, args, { prisma, pubsub }, info) {
    const updatedInteraction = await prisma.interaction.upsert({
      where: { id: args.id ?? 0 },
      update: args.data,
      create: args.data,
    })

    pubsub.publish('interaction', { mutation: 'UPDATED', data: updatedInteraction })

    return updatedInteraction
  },
  // @ts-ignore
  async updatePost(parent, args, { prisma, pubsub }, info) {
    const { data, id } = args
    const postToUpdate = await prisma.post.findUnique({ where: { id } })

    if (!postToUpdate) {
      throw new GraphQLError(`Post does not exist.`)
    }

    postToUpdate.title = data.title ?? postToUpdate.title
    postToUpdate.text = data.text ?? postToUpdate.text
    /// Not allowing the updating of the published field with updatePost
    /// Client must use publishPost/unPublishPost mutations to set this

    const updatedPost = await prisma.post.update({
      where: { id },
      data: postToUpdate,
    })

    if (updatedPost.published) {
      pubsub.publish('post', { mutation: 'UPDATED', data: updatedPost })
    }

    return updatedPost
  },

  // @ts-ignore
  async verifyAuthor(parent, args, { prisma, pubsub }, info) {
    const { data, id } = args
    const authorToUpdate = await prisma.author.findUnique({ where: { id } })

    if (!authorToUpdate) {
      throw new GraphQLError(`Author does not exist.`)
    }

    // First, do nothing
    if (authorToUpdate.verified) {
      return authorToUpdate
    }
    authorToUpdate.verified = true

    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: authorToUpdate,
    })

    pubsub.publish('author', { mutation: 'UPDATED', data: updatedAuthor })

    return updatedAuthor
  },

  // @ts-ignore
  async unVerifyAuthor(parent, args, { prisma, pubsub }, info) {
    const { data, id } = args
    const authorToUpdate = await prisma.author.findUnique({ where: { id } })

    if (!authorToUpdate) {
      throw new GraphQLError(`Author does not exist.`)
    }

    // First, do nothing
    if (!authorToUpdate.verified) {
      return authorToUpdate
    }
    authorToUpdate.verified = false

    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: authorToUpdate,
    })

    pubsub.publish('author', { mutation: 'UPDATED', data: updatedAuthor })

    return updatedAuthor
  },
}

export default Mutation
