/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Author = {
  readonly __typename?: 'Author'
  readonly comments?: Maybe<ReadonlyArray<Comment>>
  readonly email: Scalars['String']
  readonly firstName: Scalars['String']
  readonly id: Scalars['ID']
  readonly lastName: Scalars['String']
  readonly posts?: Maybe<ReadonlyArray<Maybe<Post>>>
}

export type Comment = {
  readonly __typename?: 'Comment'
  readonly author: Author
  readonly id: Scalars['ID']
  readonly post: Post
  readonly text: Scalars['String']
}

export type CreateAuthorInput = {
  readonly email: Scalars['String']
  readonly firstName: Scalars['String']
  readonly lastName: Scalars['String']
}

export type CreateCommentInput = {
  readonly authorId: Scalars['String']
  readonly postId: Scalars['String']
  readonly text: Scalars['String']
}

export type CreatePostInput = {
  readonly authorId: Scalars['String']
  readonly body?: InputMaybe<Scalars['String']>
  readonly title: Scalars['String']
}

export type Mutation = {
  readonly __typename?: 'Mutation'
  readonly createAuthor: Author
  readonly createComment: Comment
  readonly createPost: Post
  readonly deleteAuthor: Author
  readonly deleteComment: Comment
  readonly deletePost: Post
  readonly publishPost: Post
  readonly updateAuthor: Author
  readonly updateComment: Comment
  readonly updatePost: Post
}

export type MutationCreateAuthorArgs = {
  author: CreateAuthorInput
}

export type MutationCreateCommentArgs = {
  comment: CreateCommentInput
}

export type MutationCreatePostArgs = {
  post: CreatePostInput
}

export type MutationDeleteAuthorArgs = {
  authorId: Scalars['String']
}

export type MutationDeleteCommentArgs = {
  commentId: Scalars['String']
}

export type MutationDeletePostArgs = {
  postId: Scalars['String']
}

export type MutationPublishPostArgs = {
  postId: Scalars['String']
}

export type MutationUpdateAuthorArgs = {
  data: UpdateAuthorInput
  id: Scalars['String']
}

export type MutationUpdateCommentArgs = {
  data: UpdateCommentInput
  id: Scalars['String']
}

export type MutationUpdatePostArgs = {
  data: UpdatePostInput
  id: Scalars['String']
}

export type Post = {
  readonly __typename?: 'Post'
  readonly author: Author
  readonly comments?: Maybe<ReadonlyArray<Comment>>
  readonly id: Scalars['ID']
  readonly title: Scalars['String']
}

export type Query = {
  readonly __typename?: 'Query'
  readonly author?: Maybe<Author>
  readonly authors?: Maybe<ReadonlyArray<Maybe<Author>>>
  readonly comment?: Maybe<Comment>
  readonly comments?: Maybe<ReadonlyArray<Maybe<Comment>>>
  readonly post?: Maybe<Post>
  readonly posts?: Maybe<ReadonlyArray<Maybe<Post>>>
}

export type QueryAuthorArgs = {
  id: Scalars['ID']
}

export type QueryAuthorsArgs = {
  query?: InputMaybe<Scalars['String']>
}

export type QueryCommentArgs = {
  id: Scalars['ID']
}

export type QueryCommentsArgs = {
  author?: InputMaybe<Scalars['String']>
  text?: InputMaybe<Scalars['String']>
}

export type QueryPostArgs = {
  id: Scalars['ID']
}

export type QueryPostsArgs = {
  query?: InputMaybe<Scalars['String']>
}

export type Subscription = {
  readonly __typename?: 'Subscription'
  readonly comment?: Maybe<Comment>
  readonly countdown: Scalars['Int']
}

export type SubscriptionCommentArgs = {
  postId: Scalars['String']
}

export type SubscriptionCountdownArgs = {
  from?: InputMaybe<Scalars['Int']>
}

export type UpdateAuthorInput = {
  readonly email?: InputMaybe<Scalars['String']>
  readonly firstName?: InputMaybe<Scalars['String']>
  readonly lastName?: InputMaybe<Scalars['String']>
}

export type UpdateCommentInput = {
  readonly authorId?: InputMaybe<Scalars['String']>
  readonly postId?: InputMaybe<Scalars['String']>
  readonly text?: InputMaybe<Scalars['String']>
}

export type UpdatePostInput = {
  readonly authorId?: InputMaybe<Scalars['String']>
  readonly body?: InputMaybe<Scalars['String']>
  readonly title?: InputMaybe<Scalars['String']>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Author: ResolverTypeWrapper<Author>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Comment: ResolverTypeWrapper<Comment>
  CreateAuthorInput: CreateAuthorInput
  CreateCommentInput: CreateCommentInput
  CreatePostInput: CreatePostInput
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Post: ResolverTypeWrapper<Post>
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']>
  Subscription: ResolverTypeWrapper<{}>
  UpdateAuthorInput: UpdateAuthorInput
  UpdateCommentInput: UpdateCommentInput
  UpdatePostInput: UpdatePostInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: Author
  Boolean: Scalars['Boolean']
  Comment: Comment
  CreateAuthorInput: CreateAuthorInput
  CreateCommentInput: CreateCommentInput
  CreatePostInput: CreatePostInput
  ID: Scalars['ID']
  Int: Scalars['Int']
  Mutation: {}
  Post: Post
  Query: {}
  String: Scalars['String']
  Subscription: {}
  UpdateAuthorInput: UpdateAuthorInput
  UpdateCommentInput: UpdateCommentInput
  UpdatePostInput: UpdatePostInput
}

export type AuthorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']
> = {
  comments?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Comment']>>, ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  posts?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']
> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createAuthor?: Resolver<
    ResolversTypes['Author'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateAuthorArgs, 'author'>
  >
  createComment?: Resolver<
    ResolversTypes['Comment'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCommentArgs, 'comment'>
  >
  createPost?: Resolver<
    ResolversTypes['Post'],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePostArgs, 'post'>
  >
  deleteAuthor?: Resolver<
    ResolversTypes['Author'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteAuthorArgs, 'authorId'>
  >
  deleteComment?: Resolver<
    ResolversTypes['Comment'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCommentArgs, 'commentId'>
  >
  deletePost?: Resolver<
    ResolversTypes['Post'],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePostArgs, 'postId'>
  >
  publishPost?: Resolver<
    ResolversTypes['Post'],
    ParentType,
    ContextType,
    RequireFields<MutationPublishPostArgs, 'postId'>
  >
  updateAuthor?: Resolver<
    ResolversTypes['Author'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAuthorArgs, 'data' | 'id'>
  >
  updateComment?: Resolver<
    ResolversTypes['Comment'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCommentArgs, 'data' | 'id'>
  >
  updatePost?: Resolver<
    ResolversTypes['Post'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePostArgs, 'data' | 'id'>
  >
}

export type PostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>
  comments?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Comment']>>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  author?: Resolver<
    Maybe<ResolversTypes['Author']>,
    ParentType,
    ContextType,
    RequireFields<QueryAuthorArgs, 'id'>
  >
  authors?: Resolver<
    Maybe<ReadonlyArray<Maybe<ResolversTypes['Author']>>>,
    ParentType,
    ContextType,
    Partial<QueryAuthorsArgs>
  >
  comment?: Resolver<
    Maybe<ResolversTypes['Comment']>,
    ParentType,
    ContextType,
    RequireFields<QueryCommentArgs, 'id'>
  >
  comments?: Resolver<
    Maybe<ReadonlyArray<Maybe<ResolversTypes['Comment']>>>,
    ParentType,
    ContextType,
    Partial<QueryCommentsArgs>
  >
  post?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QueryPostArgs, 'id'>
  >
  posts?: Resolver<
    Maybe<ReadonlyArray<Maybe<ResolversTypes['Post']>>>,
    ParentType,
    ContextType,
    Partial<QueryPostsArgs>
  >
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  comment?: SubscriptionResolver<
    Maybe<ResolversTypes['Comment']>,
    'comment',
    ParentType,
    ContextType,
    RequireFields<SubscriptionCommentArgs, 'postId'>
  >
  countdown?: SubscriptionResolver<
    ResolversTypes['Int'],
    'countdown',
    ParentType,
    ContextType,
    Partial<SubscriptionCountdownArgs>
  >
}

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>
  Comment?: CommentResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Post?: PostResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
}
