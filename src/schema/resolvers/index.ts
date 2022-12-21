// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Resolvers } from '../generated/types'
import Query from './Query'
import Mutation from './Mutation'
import Subscription from './Subscription'
import Author from './Author'
import Interaction from './Interaction'
import Post from './Post'

/// TS-IGNORE REASON: resolvers, included below, for each of the
/// different types can produce the author, post, or comment
/// from a scalar value. This breaks our codegen types for the
/// return of these reducers, but works at runtime.
export const resolvers: Resolvers = {
  Query,
  Mutation,
  Subscription,
  Author,
  Interaction,
  Post,
}
