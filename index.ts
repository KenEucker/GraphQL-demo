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
const port = Number.parseInt(process.env.PORT || process.env.GRAPH_PORT) ?? 80
const url = `${process.env.GRAPH_URL}:${port}/${process.env.GRAPH_PATH}`

server.listen(port, () => {
  console.info(`🚀 GraphQL Server (yoga) is running on ${url}`)
})

export default server
