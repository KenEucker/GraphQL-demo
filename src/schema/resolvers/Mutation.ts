import { v4 as uuidv4 } from 'uuid'
import { GraphQLError } from 'graphql'

const Mutation = {
    createAuthor(parent, args, { db }, info) {
        const emailTaken = db.authors.some(a => args.author.email === a.email)
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

        return newAuthor
    },
    // @ts-ignore
    createComment(parent, args, { db }, info) {
      const {authorId, postId} = args.comment
      const author = db.authors.find(a => authorId === a.id)
      if (!author) {
          throw new GraphQLError(`Author does not exist.`)
      }

      const post = db.posts.find(p => postId === p.id)
      if (!post) {
          throw new GraphQLError(`Post does not exist.`)
      }

      const alreadyCommentedOnPost = db.comments.some(c => c.post === post.id && c.author === author.id)
      if (alreadyCommentedOnPost) {
        throw new GraphQLError(`Author already commented on this post.`)
      }

      const newComment = {
          id: uuidv4(),
          text: args.comment.text,
          post: post.id,
          author: author.id,
      }
      db.comments.push(newComment)

      return newComment
    },
    // @ts-ignore
    createPost(parent, args, { db }, info) {
      const {authorId, title, body} = args.post
      const author = db.authors.find(a => authorId === a.id)
      if (!author) {
          throw new GraphQLError(`Author does not exist.`)
      }

      const postAlreadyExists = db.posts.some(p => p.author === author.id && p.title === title)

      if (postAlreadyExists) {
        throw new GraphQLError(`Post already exists with title for author.`)
      }

      const newPost = {
          id: uuidv4(),
          title,
          body: body ?? "",
          author: author.id,
          comments: [],
          published: false,
      }
      db.posts.push(newPost)

      return newPost
    },

    // @ts-ignore
    deleteAuthor(parent, args, { db }, info) {
      const authorIndex = db.authors.findIndex(a => a.id === args.authorId)

      if (authorIndex === -1) {
          throw new GraphQLError(`Author does not exist.`)
      }

      const deletedAuthors = db.authors.splice(authorIndex, 1)

      db.posts = db.posts.filter(post => {
        const match = post.author === args.authorId
        if (match) {
          /// Remove all comments for that post
          db.comments = db.comments.filter(c => c.post !== post.id)
        }

        return !match
      })
      /// Remove all comments for the author
      db.comments = db.comments.filter(c => c.author !== args.authorId)

      return deletedAuthors[0]
    },
    // @ts-ignore
    deleteComment(parent, args, { db }, info) {
      const commentIndex = db.comments.findIndex(a => a.id === args.commentId)

      if (commentIndex === -1) {
          throw new GraphQLError(`Comment does not exist.`)
      }
      
      const deletedComments = db.comments.splice(commentIndex, 1)
      
      return deletedComments[0]
    },
    // @ts-ignore
    deletePost(parent, args, { db }, info) {
      const postIndex = db.posts.findIndex(a => a.id === args.postId)

      if (postIndex === -1) {
          throw new GraphQLError(`Post does not exist.`)
      }

      const deletedPosts = db.posts.splice(postIndex, 1)
      db.comments = db.comments.filter(c => c.post !== args.postId)
      
      return deletedPosts[0]
    },

    // @ts-ignore
    updateAuthor(parent, args, { db }, info) {
        const { data, id } = args
        const authorIndex = db.authors.findIndex(a => a.id === id)

        if (authorIndex === -1) {
            throw new GraphQLError(`Author does not exist.`)
        }
        const author = db.authors[authorIndex]

        if (typeof data.email === 'string') {
            const emailTaken = db.authors.some(a => a.email === data.email)

            if (emailTaken) {
                throw new GraphQLError(`Email already taken.`)
            }

            author.email = data.email
        }

        author.firstName = data.firstName ?? author.firstName
        author.lastName = data.lastName ?? author.lastName
        
        db.authors[authorIndex] = author

        return author
    },
    // @ts-ignore
    updateComment(parent, args, { db }, info) {
        const { data, id } = args
        const commentIndex = db.comments.findIndex(a => a.id === id)
  
        if (commentIndex === -1) {
            throw new GraphQLError(`Comment does not exist.`)
        }

        const comment = db.comments[commentIndex]

        comment.text = data.text ?? comment.text
        /// Not going to allow changing the post that a comment was left for
        /// Not going to allow changing the author that left the comment

        db.comments[commentIndex] = comment

        return comment
    },
    // @ts-ignore
    updatePost(parent, args, { db }, info) {
        const { data, id } = args
        const postIndex = db.posts.findIndex(a => a.id === id)
  
        if (postIndex === -1) {
            throw new GraphQLError(`Post does not exist.`)
        }

        const post = db.posts[postIndex]
        post.title = data.title ?? post.title
        post.body = data.body ?? post.body

        db.posts[postIndex] = post
        
        return post
    }
}

export default Mutation