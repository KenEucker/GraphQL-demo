import { Resolvers } from '../generated/types'
import Query from './Query'
import Mutation from './Mutation'
import Author from './Author'
import Comment from './Comment'
import Post from './Post'

/// TS-IGNORE REASON: resolvers, defined below, for each of the 
/// different types can produce the author, post, or comment 
/// from a scalar value. This breaks our codegen types for the
/// return of these reducers, but works at runtime.
export const resolvers: Resolvers = {
  Query,
  Mutation,
  Author,
  Comment,
  Post,
}