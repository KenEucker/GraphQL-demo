/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Author = {
  readonly __typename?: 'Author';
  readonly avatar: Scalars['String'];
  readonly banner?: Maybe<Scalars['String']>;
  readonly bio?: Maybe<Scalars['String']>;
  readonly birthday?: Maybe<Scalars['String']>;
  readonly createdAt?: Maybe<Scalars['Date']>;
  readonly email: Scalars['String'];
  readonly handle: Scalars['String'];
  readonly id: Scalars['Int'];
  readonly interactions?: Maybe<ReadonlyArray<Interaction>>;
  readonly joined?: Maybe<Scalars['String']>;
  readonly location?: Maybe<Scalars['String']>;
  readonly name: Scalars['String'];
  readonly permissions?: Maybe<ReadonlyArray<Permissions>>;
  readonly posts?: Maybe<ReadonlyArray<Post>>;
  readonly status?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['Date']>;
  readonly verified?: Maybe<Scalars['Boolean']>;
  readonly website?: Maybe<Scalars['String']>;
};

export type AuthorByInput = {
  readonly email?: InputMaybe<Scalars['String']>;
  readonly first?: InputMaybe<Scalars['Int']>;
  readonly handle?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['Int']>;
  readonly skip?: InputMaybe<Scalars['Int']>;
};

export type AuthorInput = {
  readonly email?: InputMaybe<Scalars['String']>;
  readonly handle?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['Int']>;
};

export type AuthorSubscriptionPayload = {
  readonly __typename?: 'AuthorSubscriptionPayload';
  readonly data?: Maybe<Author>;
  readonly mutation: MutationType;
};

export type CreateAuthorInput = {
  readonly avatar?: InputMaybe<Scalars['String']>;
  readonly banner?: InputMaybe<Scalars['String']>;
  readonly email: Scalars['String'];
  readonly handle: Scalars['String'];
  readonly name: Scalars['String'];
  readonly verified?: InputMaybe<Scalars['Boolean']>;
};

export type CreateInteractionInput = {
  readonly authorId: Scalars['Int'];
  readonly like?: InputMaybe<Scalars['Boolean']>;
  readonly love?: InputMaybe<Scalars['Boolean']>;
  readonly postId: Scalars['Int'];
  readonly repost?: InputMaybe<Scalars['Boolean']>;
  readonly share?: InputMaybe<Scalars['Boolean']>;
  readonly text?: InputMaybe<Scalars['String']>;
};

export type CreatePostInput = {
  readonly authorId: Scalars['Int'];
  readonly media?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly published?: InputMaybe<Scalars['Boolean']>;
  readonly status?: InputMaybe<Scalars['String']>;
  readonly text?: InputMaybe<Scalars['String']>;
  readonly title: Scalars['String'];
};

export type ForOptionsInput = {
  readonly cursor?: InputMaybe<Scalars['String']>;
  readonly orderById?: InputMaybe<Scalars['String']>;
  readonly skip?: InputMaybe<Scalars['Int']>;
  readonly take?: InputMaybe<Scalars['Int']>;
};

export type GetPostInteractionsPayload = {
  readonly __typename?: 'GetPostInteractionsPayload';
  readonly likes?: Maybe<Scalars['Int']>;
  readonly loves?: Maybe<Scalars['Int']>;
  readonly reposts?: Maybe<Scalars['Int']>;
  readonly shares?: Maybe<Scalars['Int']>;
};

export type Interaction = {
  readonly __typename?: 'Interaction';
  readonly author: Author;
  readonly createdAt?: Maybe<Scalars['Date']>;
  readonly id: Scalars['Int'];
  readonly like?: Maybe<Scalars['Boolean']>;
  readonly love?: Maybe<Scalars['Boolean']>;
  readonly post: Post;
  readonly repost?: Maybe<Scalars['Boolean']>;
  readonly share?: Maybe<Scalars['Boolean']>;
  readonly text?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['Date']>;
};

export type InteractionByInput = {
  readonly author?: InputMaybe<AuthorInput>;
  readonly first?: InputMaybe<Scalars['Int']>;
  readonly post?: InputMaybe<PostInput>;
  readonly skip?: InputMaybe<Scalars['Int']>;
};

export type InteractionDelta = {
  readonly __typename?: 'InteractionDelta';
  readonly id: Scalars['Int'];
  readonly like: Scalars['Int'];
  readonly love: Scalars['Int'];
  readonly repost: Scalars['Int'];
  readonly share: Scalars['Int'];
  readonly text?: Maybe<Scalars['String']>;
};

export type InteractionDeltaSubscriptionPayload = {
  readonly __typename?: 'InteractionDeltaSubscriptionPayload';
  readonly data: InteractionDelta;
  readonly mutation: MutationType;
};

export type InteractionInput = {
  readonly author?: InputMaybe<AuthorInput>;
  readonly id?: InputMaybe<Scalars['Int']>;
  readonly post?: InputMaybe<PostInput>;
};

export type InteractionSubscriptionPayload = {
  readonly __typename?: 'InteractionSubscriptionPayload';
  readonly data?: Maybe<Interaction>;
  readonly mutation: MutationType;
};

export type InteractionType =
  | 'like'
  | 'love'
  | 'repost'
  | 'share';

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly createAuthor: Author;
  readonly createInteraction: Interaction;
  readonly createPost: Post;
  readonly deleteAuthor: Author;
  readonly deleteInteraction: Interaction;
  readonly deletePost: Post;
  readonly publishPost: Post;
  readonly toggleInteraction: Interaction;
  readonly unPublishPost: Post;
  readonly unVerifyAuthor: Author;
  readonly updateAuthor: Author;
  readonly updatePost: Post;
  readonly verifyAuthor: Author;
};


export type MutationCreateAuthorArgs = {
  author: CreateAuthorInput;
};


export type MutationCreateInteractionArgs = {
  interaction: CreateInteractionInput;
};


export type MutationCreatePostArgs = {
  post: CreatePostInput;
};


export type MutationDeleteAuthorArgs = {
  authorId?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AuthorByInput>;
};


export type MutationDeleteInteractionArgs = {
  interactionId?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InteractionByInput>;
};


export type MutationDeletePostArgs = {
  id?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PostByInput>;
};


export type MutationPublishPostArgs = {
  id: Scalars['Int'];
};


export type MutationToggleInteractionArgs = {
  data: UpdateInteractionInput;
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationUnPublishPostArgs = {
  id: Scalars['Int'];
};


export type MutationUnVerifyAuthorArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateAuthorArgs = {
  data: UpdateAuthorInput;
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationVerifyAuthorArgs = {
  id: Scalars['Int'];
};

export type MutationType =
  | 'CREATED'
  | 'DELETED'
  | 'DELTA'
  | 'PUBLISHED'
  | 'UNPUBLISHED'
  | 'UPDATED';

export type Permissions =
  | 'INTERACT'
  | 'LOGIN'
  | 'READ'
  | 'WRITE';

export type Post = {
  readonly __typename?: 'Post';
  readonly author: Author;
  readonly createdAt?: Maybe<Scalars['Date']>;
  readonly id: Scalars['Int'];
  readonly interactions?: Maybe<ReadonlyArray<Interaction>>;
  readonly media?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly published?: Maybe<Scalars['Boolean']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly tags?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly text?: Maybe<Scalars['String']>;
  readonly title: Scalars['String'];
  readonly updatedAt?: Maybe<Scalars['Date']>;
};

export type PostByInput = {
  readonly author?: InputMaybe<AuthorInput>;
  readonly first?: InputMaybe<Scalars['Int']>;
  readonly id?: InputMaybe<Scalars['Int']>;
  readonly skip?: InputMaybe<Scalars['Int']>;
  readonly title?: InputMaybe<Scalars['String']>;
};

export type PostInput = {
  readonly author?: InputMaybe<AuthorInput>;
  readonly id?: InputMaybe<Scalars['Int']>;
  readonly title?: InputMaybe<Scalars['String']>;
};

export type PostSubscriptionPayload = {
  readonly __typename?: 'PostSubscriptionPayload';
  readonly data?: Maybe<Post>;
  readonly mutation: MutationType;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly author?: Maybe<Author>;
  readonly authors?: Maybe<ReadonlyArray<Maybe<Author>>>;
  readonly getPostInteractions?: Maybe<GetPostInteractionsPayload>;
  readonly interaction?: Maybe<Interaction>;
  readonly interactions?: Maybe<ReadonlyArray<Maybe<Interaction>>>;
  readonly post?: Maybe<Post>;
  readonly posts?: Maybe<ReadonlyArray<Maybe<Post>>>;
  readonly searchPosts?: Maybe<SearchPostsPayload>;
};


export type QueryAuthorArgs = {
  id?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AuthorByInput>;
};


export type QueryAuthorsArgs = {
  by?: InputMaybe<ForOptionsInput>;
  where?: InputMaybe<AuthorByInput>;
};


export type QueryGetPostInteractionsArgs = {
  id: Scalars['Int'];
};


export type QueryInteractionArgs = {
  id?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InteractionByInput>;
};


export type QueryInteractionsArgs = {
  by?: InputMaybe<ForOptionsInput>;
  where?: InputMaybe<InteractionByInput>;
};


export type QueryPostArgs = {
  id?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PostByInput>;
};


export type QueryPostsArgs = {
  by?: InputMaybe<ForOptionsInput>;
  where?: InputMaybe<PostByInput>;
};


export type QuerySearchPostsArgs = {
  by?: InputMaybe<ForOptionsInput>;
  search: SearchPostsInput;
};

export type SearchPostsInput = {
  readonly text: Scalars['String'];
};

export type SearchPostsPayload = {
  readonly __typename?: 'SearchPostsPayload';
  readonly posts?: Maybe<ReadonlyArray<Post>>;
};

export type Subscription = {
  readonly __typename?: 'Subscription';
  readonly author?: Maybe<AuthorSubscriptionPayload>;
  readonly countdown: Scalars['Int'];
  readonly interaction?: Maybe<InteractionSubscriptionPayload>;
  readonly interactionDelta?: Maybe<InteractionDeltaSubscriptionPayload>;
  readonly post?: Maybe<PostSubscriptionPayload>;
};


export type SubscriptionAuthorArgs = {
  where?: InputMaybe<AuthorByInput>;
};


export type SubscriptionCountdownArgs = {
  from?: InputMaybe<Scalars['Int']>;
};


export type SubscriptionInteractionArgs = {
  where?: InputMaybe<InteractionByInput>;
};


export type SubscriptionInteractionDeltaArgs = {
  where?: InputMaybe<InteractionByInput>;
};


export type SubscriptionPostArgs = {
  where?: InputMaybe<PostByInput>;
};

export type UpdateAuthorInput = {
  readonly avatar?: InputMaybe<Scalars['String']>;
  readonly banner?: InputMaybe<Scalars['String']>;
  readonly bio?: InputMaybe<Scalars['String']>;
  readonly birthday?: InputMaybe<Scalars['String']>;
  readonly email?: InputMaybe<Scalars['String']>;
  readonly location?: InputMaybe<Scalars['String']>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly status?: InputMaybe<Scalars['String']>;
  readonly website?: InputMaybe<Scalars['String']>;
};

export type UpdateInteractionInput = {
  readonly authorId: Scalars['Int'];
  readonly like?: InputMaybe<Scalars['Boolean']>;
  readonly love?: InputMaybe<Scalars['Boolean']>;
  readonly postId: Scalars['Int'];
  readonly repost?: InputMaybe<Scalars['Boolean']>;
  readonly share?: InputMaybe<Scalars['Boolean']>;
  readonly text?: InputMaybe<Scalars['String']>;
};

export type UpdatePostInput = {
  readonly authorId: Scalars['Int'];
  readonly media?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly postId: Scalars['Int'];
  readonly status?: InputMaybe<Scalars['String']>;
  readonly text?: InputMaybe<Scalars['String']>;
  readonly title?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Author: ResolverTypeWrapper<Author>;
  AuthorByInput: AuthorByInput;
  AuthorInput: AuthorInput;
  AuthorSubscriptionPayload: ResolverTypeWrapper<AuthorSubscriptionPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateAuthorInput: CreateAuthorInput;
  CreateInteractionInput: CreateInteractionInput;
  CreatePostInput: CreatePostInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ForOptionsInput: ForOptionsInput;
  GetPostInteractionsPayload: ResolverTypeWrapper<GetPostInteractionsPayload>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Interaction: ResolverTypeWrapper<Interaction>;
  InteractionByInput: InteractionByInput;
  InteractionDelta: ResolverTypeWrapper<InteractionDelta>;
  InteractionDeltaSubscriptionPayload: ResolverTypeWrapper<InteractionDeltaSubscriptionPayload>;
  InteractionInput: InteractionInput;
  InteractionSubscriptionPayload: ResolverTypeWrapper<InteractionSubscriptionPayload>;
  InteractionType: InteractionType;
  Mutation: ResolverTypeWrapper<{}>;
  MutationType: MutationType;
  Permissions: Permissions;
  Post: ResolverTypeWrapper<Post>;
  PostByInput: PostByInput;
  PostInput: PostInput;
  PostSubscriptionPayload: ResolverTypeWrapper<PostSubscriptionPayload>;
  Query: ResolverTypeWrapper<{}>;
  SearchPostsInput: SearchPostsInput;
  SearchPostsPayload: ResolverTypeWrapper<SearchPostsPayload>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateAuthorInput: UpdateAuthorInput;
  UpdateInteractionInput: UpdateInteractionInput;
  UpdatePostInput: UpdatePostInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: Author;
  AuthorByInput: AuthorByInput;
  AuthorInput: AuthorInput;
  AuthorSubscriptionPayload: AuthorSubscriptionPayload;
  Boolean: Scalars['Boolean'];
  CreateAuthorInput: CreateAuthorInput;
  CreateInteractionInput: CreateInteractionInput;
  CreatePostInput: CreatePostInput;
  Date: Scalars['Date'];
  ForOptionsInput: ForOptionsInput;
  GetPostInteractionsPayload: GetPostInteractionsPayload;
  Int: Scalars['Int'];
  Interaction: Interaction;
  InteractionByInput: InteractionByInput;
  InteractionDelta: InteractionDelta;
  InteractionDeltaSubscriptionPayload: InteractionDeltaSubscriptionPayload;
  InteractionInput: InteractionInput;
  InteractionSubscriptionPayload: InteractionSubscriptionPayload;
  Mutation: {};
  Post: Post;
  PostByInput: PostByInput;
  PostInput: PostInput;
  PostSubscriptionPayload: PostSubscriptionPayload;
  Query: {};
  SearchPostsInput: SearchPostsInput;
  SearchPostsPayload: SearchPostsPayload;
  String: Scalars['String'];
  Subscription: {};
  UpdateAuthorInput: UpdateAuthorInput;
  UpdateInteractionInput: UpdateInteractionInput;
  UpdatePostInput: UpdatePostInput;
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  banner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  interactions?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Interaction']>>, ParentType, ContextType>;
  joined?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Permissions']>>, ParentType, ContextType>;
  posts?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Post']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorSubscriptionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorSubscriptionPayload'] = ResolversParentTypes['AuthorSubscriptionPayload']> = {
  data?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  mutation?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GetPostInteractionsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetPostInteractionsPayload'] = ResolversParentTypes['GetPostInteractionsPayload']> = {
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  loves?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reposts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shares?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InteractionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Interaction'] = ResolversParentTypes['Interaction']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  like?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  love?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  repost?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  share?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InteractionDeltaResolvers<ContextType = any, ParentType extends ResolversParentTypes['InteractionDelta'] = ResolversParentTypes['InteractionDelta']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  like?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  love?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  repost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  share?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InteractionDeltaSubscriptionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['InteractionDeltaSubscriptionPayload'] = ResolversParentTypes['InteractionDeltaSubscriptionPayload']> = {
  data?: Resolver<ResolversTypes['InteractionDelta'], ParentType, ContextType>;
  mutation?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InteractionSubscriptionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['InteractionSubscriptionPayload'] = ResolversParentTypes['InteractionSubscriptionPayload']> = {
  data?: Resolver<Maybe<ResolversTypes['Interaction']>, ParentType, ContextType>;
  mutation?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationCreateAuthorArgs, 'author'>>;
  createInteraction?: Resolver<ResolversTypes['Interaction'], ParentType, ContextType, RequireFields<MutationCreateInteractionArgs, 'interaction'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'post'>>;
  deleteAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, Partial<MutationDeleteAuthorArgs>>;
  deleteInteraction?: Resolver<ResolversTypes['Interaction'], ParentType, ContextType, Partial<MutationDeleteInteractionArgs>>;
  deletePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, Partial<MutationDeletePostArgs>>;
  publishPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationPublishPostArgs, 'id'>>;
  toggleInteraction?: Resolver<ResolversTypes['Interaction'], ParentType, ContextType, RequireFields<MutationToggleInteractionArgs, 'data'>>;
  unPublishPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUnPublishPostArgs, 'id'>>;
  unVerifyAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationUnVerifyAuthorArgs, 'id'>>;
  updateAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationUpdateAuthorArgs, 'data'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'data'>>;
  verifyAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationVerifyAuthorArgs, 'id'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  interactions?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Interaction']>>, ParentType, ContextType>;
  media?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostSubscriptionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostSubscriptionPayload'] = ResolversParentTypes['PostSubscriptionPayload']> = {
  data?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  mutation?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, Partial<QueryAuthorArgs>>;
  authors?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Author']>>>, ParentType, ContextType, Partial<QueryAuthorsArgs>>;
  getPostInteractions?: Resolver<Maybe<ResolversTypes['GetPostInteractionsPayload']>, ParentType, ContextType, RequireFields<QueryGetPostInteractionsArgs, 'id'>>;
  interaction?: Resolver<Maybe<ResolversTypes['Interaction']>, ParentType, ContextType, Partial<QueryInteractionArgs>>;
  interactions?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Interaction']>>>, ParentType, ContextType, Partial<QueryInteractionsArgs>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, Partial<QueryPostArgs>>;
  posts?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType, Partial<QueryPostsArgs>>;
  searchPosts?: Resolver<Maybe<ResolversTypes['SearchPostsPayload']>, ParentType, ContextType, RequireFields<QuerySearchPostsArgs, 'search'>>;
};

export type SearchPostsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchPostsPayload'] = ResolversParentTypes['SearchPostsPayload']> = {
  posts?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Post']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  author?: SubscriptionResolver<Maybe<ResolversTypes['AuthorSubscriptionPayload']>, "author", ParentType, ContextType, Partial<SubscriptionAuthorArgs>>;
  countdown?: SubscriptionResolver<ResolversTypes['Int'], "countdown", ParentType, ContextType, Partial<SubscriptionCountdownArgs>>;
  interaction?: SubscriptionResolver<Maybe<ResolversTypes['InteractionSubscriptionPayload']>, "interaction", ParentType, ContextType, Partial<SubscriptionInteractionArgs>>;
  interactionDelta?: SubscriptionResolver<Maybe<ResolversTypes['InteractionDeltaSubscriptionPayload']>, "interactionDelta", ParentType, ContextType, Partial<SubscriptionInteractionDeltaArgs>>;
  post?: SubscriptionResolver<Maybe<ResolversTypes['PostSubscriptionPayload']>, "post", ParentType, ContextType, Partial<SubscriptionPostArgs>>;
};

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>;
  AuthorSubscriptionPayload?: AuthorSubscriptionPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  GetPostInteractionsPayload?: GetPostInteractionsPayloadResolvers<ContextType>;
  Interaction?: InteractionResolvers<ContextType>;
  InteractionDelta?: InteractionDeltaResolvers<ContextType>;
  InteractionDeltaSubscriptionPayload?: InteractionDeltaSubscriptionPayloadResolvers<ContextType>;
  InteractionSubscriptionPayload?: InteractionSubscriptionPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostSubscriptionPayload?: PostSubscriptionPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SearchPostsPayload?: SearchPostsPayloadResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

