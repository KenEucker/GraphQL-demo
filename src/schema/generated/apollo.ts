import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
import gql from 'graphql-tag';
export type AuthorKeySpecifier = ('avatar' | 'banner' | 'bio' | 'birthday' | 'email' | 'handle' | 'id' | 'interactions' | 'link' | 'location' | 'name' | 'permissions' | 'posts' | 'status' | 'verified' | AuthorKeySpecifier)[];
export type AuthorFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	banner?: FieldPolicy<any> | FieldReadFunction<any>,
	bio?: FieldPolicy<any> | FieldReadFunction<any>,
	birthday?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	handle?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	interactions?: FieldPolicy<any> | FieldReadFunction<any>,
	link?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	posts?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	verified?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuthorSubscriptionPayloadKeySpecifier = ('data' | 'mutation' | AuthorSubscriptionPayloadKeySpecifier)[];
export type AuthorSubscriptionPayloadFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	mutation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InteractionKeySpecifier = ('author' | 'id' | 'like' | 'post' | 'share' | 'text' | InteractionKeySpecifier)[];
export type InteractionFieldPolicy = {
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	like?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	share?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InteractionSubscriptionPayloadKeySpecifier = ('data' | 'mutation' | InteractionSubscriptionPayloadKeySpecifier)[];
export type InteractionSubscriptionPayloadFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	mutation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createAuthor' | 'createInteraction' | 'createPost' | 'deleteAuthor' | 'deleteInteraction' | 'deletePost' | 'publishPost' | 'unPublishPost' | 'updateAuthor' | 'updateInteraction' | 'updatePost' | 'verifyAuthor' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createAuthor?: FieldPolicy<any> | FieldReadFunction<any>,
	createInteraction?: FieldPolicy<any> | FieldReadFunction<any>,
	createPost?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAuthor?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteInteraction?: FieldPolicy<any> | FieldReadFunction<any>,
	deletePost?: FieldPolicy<any> | FieldReadFunction<any>,
	publishPost?: FieldPolicy<any> | FieldReadFunction<any>,
	unPublishPost?: FieldPolicy<any> | FieldReadFunction<any>,
	updateAuthor?: FieldPolicy<any> | FieldReadFunction<any>,
	updateInteraction?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePost?: FieldPolicy<any> | FieldReadFunction<any>,
	verifyAuthor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostKeySpecifier = ('author' | 'id' | 'interactions' | 'media' | 'published' | 'status' | 'tags' | 'text' | 'title' | PostKeySpecifier)[];
export type PostFieldPolicy = {
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	interactions?: FieldPolicy<any> | FieldReadFunction<any>,
	media?: FieldPolicy<any> | FieldReadFunction<any>,
	published?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostSubscriptionPayloadKeySpecifier = ('data' | 'mutation' | PostSubscriptionPayloadKeySpecifier)[];
export type PostSubscriptionPayloadFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	mutation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('author' | 'authors' | 'interaction' | 'interactions' | 'post' | 'posts' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	authors?: FieldPolicy<any> | FieldReadFunction<any>,
	interaction?: FieldPolicy<any> | FieldReadFunction<any>,
	interactions?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	posts?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('author' | 'countdown' | 'interaction' | 'post' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	countdown?: FieldPolicy<any> | FieldReadFunction<any>,
	interaction?: FieldPolicy<any> | FieldReadFunction<any>,
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
	Interaction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InteractionKeySpecifier | (() => undefined | InteractionKeySpecifier),
		fields?: InteractionFieldPolicy,
	},
	InteractionSubscriptionPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InteractionSubscriptionPayloadKeySpecifier | (() => undefined | InteractionSubscriptionPayloadKeySpecifier),
		fields?: InteractionSubscriptionPayloadFieldPolicy,
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