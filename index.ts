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

/// Environment Variables and their Defaults
const originUrl = process.env.ORIGIN_URL ?? 'http://localhost'
const originPort = process.env.ORIGIN_PORT ?? 8080
const graphUrl = process.env.GRAPH_URL ?? 'http://localhost'
const graphPort = process.env.GRAPH_PORT ?? 8100
const graphPath = process.env.GRAPH_PATH ?? 'graphql'
const port = process.env.PORT ?? graphPort
const serverUrl = `${graphUrl}:${port}/${graphPath}`

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema,
  context: {
    db,
    pubsub,
    prisma,
  },
  cors: {
    origin: `${originUrl}:${originPort}`,
    credentials: true,
  },
})

// Pass it into a server to hook into request handlers.
const server = createServer(yoga)

server.listen(port, () => {
  console.info(`🚀 GraphQL Server (yoga) is running on ${serverUrl}`)
})

export default server
