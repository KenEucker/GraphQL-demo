import { Resolvers } from './generated/types'
import { posts, comments, authors } from './db'
import { v4 as uuidv4 } from 'uuid'
import { GraphQLError } from 'graphql'

/// IGNORE REASON: resolvers, defined below, for each of the 
/// different types can produce the author, post, comments, or 
/// comments from a scalar value. This breaks our codegen types
/// for the return of these reducers, but works 
export const resolvers: Resolvers = {
    Author: {
      // @ts-ignore
        comments: (parent) => comments.filter(c => c.author === parent.id),
      // @ts-ignore
        posts: (parent) => posts.filter(p => p.author === parent.id),
    },
    Post: {
      // @ts-ignore
        author: (parent) =>  authors.find(a => a.id === parent.author),
      // @ts-ignore
        comments: (parent) => comments.filter(c => c.post === parent.id)
    },
    Comment: {
      // @ts-ignore
        author: (parent) => authors.find(a => a.id === parent.author),
      // @ts-ignore
        post: (parent) => posts.find(a => a.id === parent.id),
    },
    Query: {
      // @ts-ignore
      author: (parent, args) => authors.find(p => p.id === args.id),
      // @ts-ignore
      post: (parent, args) => posts.find(p => p.id === args.id),
      // @ts-ignore
      authors: (parent, args) => {
        if (args.query) {
            const query = args.query.toLowerCase() /// Why hack?
            return authors.filter(a => 
                a.firstName.toLowerCase().indexOf(query) !== -1 || 
                a.lastName.toLowerCase().indexOf(query) !== -1)
        }

        return authors
      },
      // @ts-ignore
      posts: (parent, args) => {
        if (args.query) {
            const query = args.query.toLowerCase() /// Why hack?
            return posts.filter(p => 
                p.body.toLowerCase().indexOf(query) !== -1 || 
                p.title.toLowerCase().indexOf(query) !== -1)
        }

        return posts
      },
      // @ts-ignore
      comments: (parent, args) => {
        let foundComments: any = []
        
        if (args.author) {
            const author = args.author.toLowerCase() /// Why hack?
            const authorsFound: any[] = authors.filter(a => 
                a.firstName.toLowerCase().indexOf(author) !== -1 || 
                a.lastName.toLowerCase().indexOf(author) !== -1)
            foundComments = foundComments.concat(authorsFound.reduce((o,a) => o.concat(a.comments), []))
        }

        if (args.text) {
            const text = args.text.toLowerCase() /// Why hack?
            const commentsFound: any[] = comments.filter(c => c.text.indexOf(text) !== -1)
            foundComments = foundComments.concat(commentsFound)
        }

        if (args.author || args.text) {
            /// Do not return duplicates
            return foundComments.filter((o: any, i: number) => foundComments.indexOf(o) === i)
        }

        return comments
      },
    },
    Mutation: {
        createAuthor(parent, args) {
            const emailTaken = authors.some(a => args.author.email === a.email)
            if (emailTaken) {
                throw new GraphQLError(`Email is already in use.`)
            }

            const newAuthor = {
                id: uuidv4(),
                ...args.author,
                comments: [],
                posts: [],
            }
            authors.push(newAuthor)

            return newAuthor
        },
        // @ts-ignore
        createComment(parent, args) {
          const {authorId, postId} = args.comment
          const author = authors.find(a => authorId === a.id)
          if (!author) {
              throw new GraphQLError(`Author does not exist.`)
          }

          const post = posts.find(p => postId === p.id)
          if (!post) {
              throw new GraphQLError(`Post does not exist.`)
          }

          const alreadyCommentedOnPost = comments.some(c => c.post === post.id && c.author === author.id)
          if (alreadyCommentedOnPost) {
            throw new GraphQLError(`Author already commented on this post.`)
          }

          const newComment = {
              id: uuidv4(),
              text: args.comment.text,
              post: post.id,
              author: author.id,
          }
          comments.push(newComment)

          return newComment
        },
        // @ts-ignore
        createPost(parent, args) {
          const {authorId, title, body} = args.post
          const author = authors.find(a => authorId === a.id)
          if (!author) {
              throw new GraphQLError(`Author does not exist.`)
          }

          const postAlreadyExists = posts.some(p => p.author === author.id && p.title === title)

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
          posts.push(newPost)

          return newPost
        }
    }
  }