import { Author, Interaction, Post } from '../generated/types'
import { GraphQLError } from 'graphql'

const Query = {
  // @ts-ignore
  author: (parent, args, { prisma }, info) => {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which author to query.')
    }

    return prisma.author.findUnique({ where })
  },
  // @ts-ignore
  post: (parent, args, { prisma }, info) => {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which post to query.')
    }

    return prisma.post.findUnique({ where })
  },
  // @ts-ignore
  interaction: (parent, args, { prisma }, info) => {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which interaction to query.')
    }

    return prisma.interaction.findUnique({ where })
  },
  // @ts-ignore
  authors: (parent, { where }, { prisma }, info) => {
    if (where?.id || where?.name || where?.email || where?.handle) {
      return prisma.author.findMany({ where })
    }
    return prisma.author.findMany()
  },
  // @ts-ignore
  posts: (parent, { where }, { prisma }, info) => {
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
      })
    }

    return prisma.post.findMany()
  },
  // @ts-ignore
  interactions: (parent, { where }, { prisma }, info) => {
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
}

export default Query
