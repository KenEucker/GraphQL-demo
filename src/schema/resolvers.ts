import { Resolvers } from './generated/types'
import { posts, comments, authors } from './db'
import { v4 as uuidv4 } from 'uuid'
import { GraphQLError } from 'graphql'

const db = {
  posts,
  comments,
  authors,
}

/// TS-IGNORE REASON: resolvers, defined below, for each of the 
/// different types can produce the author, post, or comment 
/// from a scalar value. This breaks our codegen types for the
/// return of these reducers, but works at runtime.
export const resolvers: Resolvers = {
    Author: {
      // @ts-ignore
        comments: (parent) => db.comments.filter(c => c.author === parent.id),
      // @ts-ignore
        posts: (parent) => db.posts.filter(p => p.author === parent.id),
    },
    Post: {
      // @ts-ignore
        author: (parent) =>  db.authors.find(a => a.id === parent.author),
      // @ts-ignore
        comments: (parent) => db.comments.filter(c => c.post === parent.id)
    },
    Comment: {
      // @ts-ignore
        author: (parent) => db.authors.find(a => a.id === parent.author),
      // @ts-ignore
        post: (parent) => db.posts.find(a => a.id === parent.id),
    },
    Query: {
      // @ts-ignore
      author: (parent, args) => db.authors.find(p => p.id === args.id),
      // @ts-ignore
      post: (parent, args) => db.posts.find(p => p.id === args.id),
      // @ts-ignore
      authors: (parent, args) => {
        if (args.query) {
            const query = args.query.toLowerCase() /// Why hack?
            return db.authors.filter(a => 
                a.firstName.toLowerCase().indexOf(query) !== -1 || 
                a.lastName.toLowerCase().indexOf(query) !== -1)
        }

        return db.authors
      },
      // @ts-ignore
      posts: (parent, args) => {
        if (args.query) {
            const query = args.query.toLowerCase() /// Why hack?
            return db.posts.filter(p => 
                p.body.toLowerCase().indexOf(query) !== -1 || 
                p.title.toLowerCase().indexOf(query) !== -1)
        }

        return db.posts
      },
      // @ts-ignore
      comments: (parent, args) => {
        let foundComments: any = []
        
        if (args.author) {
            const author = args.author.toLowerCase() /// Why hack?
            const authorsFound: any[] = db.authors.filter(a => 
                a.firstName.toLowerCase().indexOf(author) !== -1 || 
                a.lastName.toLowerCase().indexOf(author) !== -1)
            foundComments = foundComments.concat(authorsFound.reduce((o,a) => o.concat(a.comments), []))
        }

        if (args.text) {
            const text = args.text.toLowerCase() /// Why hack?
            const commentsFound: any[] = db.comments.filter(c => c.text.indexOf(text) !== -1)
            foundComments = foundComments.concat(commentsFound)
        }

        if (args.author || args.text) {
            /// Do not return duplicates
            return foundComments.filter((o: any, i: number) => foundComments.indexOf(o) === i)
        }

        return db.comments
      },
    },
    Mutation: {
        createAuthor(parent, args) {
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
        createComment(parent, args) {
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
        createPost(parent, args) {
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
        deleteAuthor(parent, args) {
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
        deleteComment(parent, args) {
          const commentIndex = db.comments.findIndex(a => a.id === args.commentId)

          if (commentIndex === -1) {
              throw new GraphQLError(`Comment does not exist.`)
          }
          
          const deletedComments = db.comments.splice(commentIndex, 1)
          
          return deletedComments[0]
        },
        // @ts-ignore
        deletePost(parent, args) {
          const postIndex = db.posts.findIndex(a => a.id === args.postId)

          if (postIndex === -1) {
              throw new GraphQLError(`Post does not exist.`)
          }

          const deletedPosts = db.posts.splice(postIndex, 1)
          db.comments = db.comments.filter(c => c.post !== args.postId)
          
          return deletedPosts[0]
        }
    }
  }