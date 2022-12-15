import { Resolvers } from './generated/types'
import { posts, comments, authors } from './db'

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
  }