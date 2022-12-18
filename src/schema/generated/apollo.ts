import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
import gql from 'graphql-tag';
export type AuthorKeySpecifier = ('comments' | 'email' | 'firstName' | 'id' | 'lastName' | 'permissions' | 'posts' | AuthorKeySpecifier)[];
export type AuthorFieldPolicy = {
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	posts?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuthorSubscriptionPayloadKeySpecifier = ('data' | 'mutation' | AuthorSubscriptionPayloadKeySpecifier)[];
export type AuthorSubscriptionPayloadFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	mutation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommentKeySpecifier = ('author' | 'id' | 'post' | 'text' | CommentKeySpecifier)[];
export type CommentFieldPolicy = {
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommentSubscriptionPayloadKeySpecifier = ('data' | 'mutation' | CommentSubscriptionPayloadKeySpecifier)[];
export type CommentSubscriptionPayloadFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	mutation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createAuthor' | 'createComment' | 'createPost' | 'deleteAuthor' | 'deleteComment' | 'deletePost' | 'publishPost' | 'unPublishPost' | 'updateAuthor' | 'updateComment' | 'updatePost' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createAuthor?: FieldPolicy<any> | FieldReadFunction<any>,
	createComment?: FieldPolicy<any> | FieldReadFunction<any>,
	createPost?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAuthor?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteComment?: FieldPolicy<any> | FieldReadFunction<any>,
	deletePost?: FieldPolicy<any> | FieldReadFunction<any>,
	publishPost?: FieldPolicy<any> | FieldReadFunction<any>,
	unPublishPost?: FieldPolicy<any> | FieldReadFunction<any>,
	updateAuthor?: FieldPolicy<any> | FieldReadFunction<any>,
	updateComment?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePost?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostKeySpecifier = ('author' | 'comments' | 'id' | 'published' | 'title' | PostKeySpecifier)[];
export type PostFieldPolicy = {
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	published?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostSubscriptionPayloadKeySpecifier = ('data' | 'mutation' | PostSubscriptionPayloadKeySpecifier)[];
export type PostSubscriptionPayloadFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	mutation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('author' | 'authors' | 'comment' | 'comments' | 'post' | 'posts' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	authors?: FieldPolicy<any> | FieldReadFunction<any>,
	comment?: FieldPolicy<any> | FieldReadFunction<any>,
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	posts?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('author' | 'comment' | 'countdown' | 'post' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	comment?: FieldPolicy<any> | FieldReadFunction<any>,
	countdown?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Author?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthorKeySpecifier | (() => undefined | AuthorKeySpecifier),
		fields?: AuthorFieldPolicy,
	},
	AuthorSubscriptionPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthorSubscriptionPayloadKeySpecifier | (() => undefined | AuthorSubscriptionPayloadKeySpecifier),
		fields?: AuthorSubscriptionPayloadFieldPolicy,
	},
	Comment?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommentKeySpecifier | (() => undefined | CommentKeySpecifier),
		fields?: CommentFieldPolicy,
	},
	CommentSubscriptionPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommentSubscriptionPayloadKeySpecifier | (() => undefined | CommentSubscriptionPayloadKeySpecifier),
		fields?: CommentSubscriptionPayloadFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Post?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier),
		fields?: PostFieldPolicy,
	},
	PostSubscriptionPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostSubscriptionPayloadKeySpecifier | (() => undefined | PostSubscriptionPayloadKeySpecifier),
		fields?: PostSubscriptionPayloadFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;