import { v4 as uuidv4 } from 'uuid'
import { GraphQLError } from 'graphql'
import { MutationType } from '../generated/types.d'

const Mutation = {
  // @ts-ignore
  createAuthor(parent, args, { db, pubsub }, info) {
    const emailTaken = db.authors.some((a) => args.author.email === a.email)
    if (emailTaken) {
      throw new GraphQLError(`Email is already in use.`)
    }

    const newAuthor = {
      id: uuidv4(),
      ...args.author,
      comments: [],
      posts: [],
    }

    db.authors.push(newAuthor)
    pubsub.publish(`author`, { mutation: 'CREATED', data: newAuthor })

    return newAuthor
  },
  // @ts-ignore
  createComment(parent, args, { db, pubsub }, info) {
    const { authorId, postId } = args.comment
    const author = db.authors.find((a) => authorId === a.id)
    if (!author) {
      throw new GraphQLError(`Author does not exist.`)
    }

    const postIndex = db.posts.findIndex((p) => postId === p.id)
    if (!postIndex) {
      throw new GraphQLError(`Post does not exist.`)
    }

    const post = db.posts[postIndex]

    const alreadyCommentedOnPost = db.comments.some(
      (c) => c.post === post.id && c.author === author.id
    )
    if (alreadyCommentedOnPost) {
      throw new GraphQLError(`Author already commented on this post.`)
    }

    const newComment = {
      id: uuidv4(),
      text: args.comment.text,
      post: post.id,
      author: author.id,
    }

    /// Add the new comment to the database
    db.comments.push(newComment)
    /// Add the new comment to the post
    post.comments.push(newComment.id)
    /// Update the post in the database
    db.posts[postIndex] = post

    pubsub.publish(`comment`, { mutation: 'CREATED', data: newComment })

    return newComment
  },
  // @ts-ignore
  createPost(parent, args, { db, pubsub }, info) {
    const { authorId, title, body, published } = args.post
    const author = db.authors.find((a) => authorId === a.id)
    if (!author) {
      throw new GraphQLError(`Author does not exist.`)
    }

    const postAlreadyExists = db.posts.some((p) => p.author === author.id && p.title === title)

    if (postAlreadyExists) {
      throw new GraphQLError(`Post already exists with title for author.`)
    }

    const newPost = {
      id: uuidv4(),
      title,
      body: body ?? '',
      author: author.id,
      published,
      comments: [],
    }

    db.posts.push(newPost)
    pubsub.publish(`post`, { mutation: 'CREATED', data: newPost })

    return newPost
  },
  publishPost(parent, { id }, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex((p) => p.id === id)

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
  unPublishPost(parent, { id }, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex((p) => p.id === id)

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
    const authorIndex = db.authors.findIndex((a) => a.id === args.authorId)

    if (authorIndex === -1) {
      throw new GraphQLError(`Author does not exist.`)
    }

    const [deletedAuthor] = db.authors.splice(authorIndex, 1)

    db.posts = db.posts.filter((post) => {
      const match = post.author === args.authorId
      if (match) {
        /// Remove all comments for that post
        db.comments = db.comments.filter((c) => c.post !== post.id)
      }

      return !match
    })

    /// Remove all comments for the author
    db.comments = db.comments.filter((c) => c.author !== args.authorId)
    /// Publish the deleted event
    pubsub.publish(`author`, { mutation: 'DELETED', data: deletedAuthor })

    return deletedAuthor
  },
  // @ts-ignore
  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.comments.findIndex((a) => a.id === args.commentId)

    if (commentIndex === -1) {
      throw new GraphQLError(`Comment does not exist.`)
    }

    const [deletedComment] = db.comments.splice(commentIndex, 1)

    pubsub.publish(`comment`, { mutation: 'DELETED', data: deletedComment })

    return deletedComment
  },
  // @ts-ignore
  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex((a) => a.id === args.postId)

    if (postIndex === -1) {
      throw new GraphQLError(`Post does not exist.`)
    }

    const [deletedPost] = db.posts.splice(postIndex, 1)

    db.comments = db.comments.filter((c) => c.post !== args.postId)
    if (deletedPost.published) {
      pubsub.publish(`post`, { mutation: 'DELETED', data: deletedPost })
    }

    return deletedPost
  },

  // @ts-ignore
  updateAuthor(parent, args, { db, pubsub }, info) {
    const { data, id } = args
    const authorIndex = db.authors.findIndex((a) => a.id === id)

    if (authorIndex === -1) {
      throw new GraphQLError(`Author does not exist.`)
    }
    const updatedAuthor = db.authors[authorIndex]

    if (typeof data.email === 'string') {
      const emailTaken = db.authors.some((a) => a.email === data.email)

      if (emailTaken) {
        throw new GraphQLError(`Email already taken.`)
      }

      updatedAuthor.email = data.email
    }

    updatedAuthor.firstName = data.firstName ?? updatedAuthor.firstName
    updatedAuthor.lastName = data.lastName ?? updatedAuthor.lastName

    db.authors[authorIndex] = updatedAuthor
    pubsub.publish('author', { mutation: 'UPDATED', data: updatedAuthor })

    return updatedAuthor
  },
  // @ts-ignore
  updateComment(parent, args, { db, pubsub }, info) {
    const { data, id } = args
    const commentIndex = db.comments.findIndex((a) => a.id === id)

    if (commentIndex === -1) {
      throw new GraphQLError(`Comment does not exist.`)
    }

    const updatedComment = db.comments[commentIndex]

    updatedComment.text = data.text ?? updatedComment.text
    /// Not going to allow changing the post that a comment was left for
    /// Not going to allow changing the author that left the comment

    db.comments[commentIndex] = updatedComment
    pubsub.publish('comment', { mutation: 'UPDATED', data: updatedComment })

    return updatedComment
  },
  // @ts-ignore
  updatePost(parent, args, { db, pubsub }, info) {
    const { data, id } = args
    const postIndex = db.posts.findIndex((a) => a.id === id)

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
}

export default Mutation
