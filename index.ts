// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import { schema, pubsub, prisma } from './src/schema'
import db from './src/store/seed'

// import { loadSchemaSync } from "@graphql-tools/load"
// import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"

// const typeDefs = loadSchemaSync("src/schema/schema.gql", {
//   loaders: [new GraphQLFileLoader()],
// })

// TODO: convert to NextJs project?
// import type { NextApiRequest, NextApiResponse } from 'next'

const graphUrl = process.env.GRAPH_URL ?? 'http://localhost'
const graphPort = process.env.GRAPH_PORT ?? 8100
const graphPath = process.env.GRAPH_URL ?? 'graphql'

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema,
  context: {
    db,
    pubsub,
    prisma,
  },
  cors: {
    origin: `${process.env.ORIGIN}${
      process.env.ORIGIN_PORT !== '80' ? `:${process.env.ORIGIN_PORT}` : ''
    }`,
    credentials: true,
  },
})

// Pass it into a server to hook into request handlers.
const server = createServer(yoga)
const port = process.env.PORT ?? graphPort
const url = `${graphUrl}:${port}/${graphPath}`

server.listen(port, () => {
  console.info(`🚀 GraphQL Server (yoga) is running on ${url}`)
})

export default server
