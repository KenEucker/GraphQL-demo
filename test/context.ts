import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { PubSub } from 'graphql-yoga'

export type Context = {
  prisma: PrismaClient
  pubsub: PubSub<any>
}

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>
  pubsub: DeepMockProxy<PubSub<any>>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
    pubsub: mockDeep<PubSub<any>>(),
  }
}
