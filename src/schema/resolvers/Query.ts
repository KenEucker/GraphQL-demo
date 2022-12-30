import { Author, Interaction, Post } from '../generated/types'
import { GraphQLError } from 'graphql'
import { Prisma } from '@prisma/client'

const Query = {
  author: (parent: never, args: { where: { id: any }; id: any }, { prisma }: any, info: any) => {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which author to query.')
    }

    return prisma.author.findUnique({ where })
  },
  post: (parent: never, args: { where: { id: any }; id: any }, { prisma }: any, info: any) => {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which post to query.')
    }

    return prisma.post.findUnique({ where })
  },
  interaction: (
    parent: never,
    args: { where: { id: any }; id: any },
    { prisma }: any,
    info: any
  ) => {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which interaction to query.')
    }

    return prisma.interaction.findUnique({ where })
  },
  authors: (parent: never, { where }: any, { prisma }: any, info: any) => {
    if (where?.id || where?.name || where?.email || where?.handle) {
      return prisma.author.findMany({ where })
    }
    return prisma.author.findMany()
  },
  posts: (parent: never, { where }: any, { prisma }: any, info: any) => {
    if (where?.id || where?.title || where?.text) {
      return prisma.post.findMany({
        where: {
          id: where.id,
          title: {
            search: where.title,
          },
          text: {
            search: where.text,
          },
        },
        orderBy: {
          id: 'desc',
        },
      })
    }

    return prisma.post.findMany({
      orderBy: {
        id: 'desc',
      },
    })
  },
  interactions: (parent: never, { where }: any, { prisma }: any, info: any) => {
    const foundInteractions: any = []

    if (where?.author) {
      foundInteractions.push(
        prisma.author.findMany({
          where: {
            author: {
              id: where.author.id ?? 0,
            },
          },
        })
      )
    }

    if (where?.text) {
      foundInteractions.push(
        prisma.author.findMany({
          where: {
            text: {
              search: where.text,
            },
          },
        })
      )
    }

    if (where?.author || where?.text) {
      /// Do not return duplicates
      /// TODO: Need to dedup here
      return foundInteractions
      // return foundInteractions.filter((o: any, i: number) => foundInteractions.indexOf(o) === i)
    }

    return prisma.interactions.findMany()
  },

  getPostInteractions: async (parent: never, { id }: any, { prisma }: any, info: any) => {
    const query = Prisma.sql`SELECT
      COALESCE(SUM(CASE WHEN "like"=true THEN 1 ELSE 0 END), 0)::int as likes,
      COALESCE(SUM(CASE WHEN love=true THEN 1 ELSE 0 END), 0)::int as loves,
      COALESCE(SUM(CASE WHEN repost=true THEN 1 ELSE 0 END), 0)::int as reposts,
      COALESCE(SUM(CASE WHEN "share"=true THEN 1 ELSE 0 END), 0)::int as shares
    FROM "Interaction" WHERE "postId"=${Number(id)}`

    const result = await prisma.$queryRaw(query)

    const interactions = {
      likes: 0,
      loves: 0,
      reposts: 0,
      shares: 0,
    }

    if (result[0]) {
      interactions.likes = Number(result[0].likes)
      interactions.loves = Number(result[0].loves)
      interactions.reposts = Number(result[0].reposts)
      interactions.shares = Number(result[0].shares)
    }

    return interactions
  },
  searchPosts: async (
    parent: never,
    { search }: { search: string },
    { prisma }: any,
    info: any
  ) => {
    return prisma.post.findMany({
      where: {
        text: {
          search,
        },
      },
    })
  },
}

export default Query
