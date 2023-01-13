import { MockContext, Context, createMockContext } from '../context'
import Mutation from '../../src/schema/resolvers/Mutation'
import { Post } from '../../src/schema/generated/types.d'

const { createPost, updatePost } = Mutation

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

test('should create new post ', async () => {
  const post = {
    id: 1,
    title: "Ain't It Rich",
    text: 'hello, prisma',
    creatorId: 1,
    published: true,
    // status: '',
    // media: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  mockCtx.prisma.post.create.mockResolvedValue(post)

  await expect(createPost(undefined, { post }, ctx, undefined)).resolves.toEqual(post)
})

test('should update a post ', async () => {
  const post = {
    id: 1,
    title: 'Rich It Is',
    published: false,
    creatorId: 1,
    // text: "It's Richard!",
    // status: '',
    // media: [],
  }
  mockCtx.prisma.post.update.mockResolvedValue(post)

  await expect(updatePost(undefined, post, ctx, undefined)).resolves.toEqual(post)
})

// test('should fail if user does not accept terms', async () => {
//   const user = {
//     id: 1,
//     name: 'Rich Haines',
//     email: 'hello@prisma.io',
//     acceptTermsAndConditions: false,
//   }

//   mockCtx.prisma.user.create.mockRejectedValue(new Error('User must accept terms!'))

//   await expect(createUser(user, ctx)).resolves.toEqual(new Error('User must accept terms!'))
// })
