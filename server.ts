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
    origin: 'http://localhost:3000',
    credentials: true,
  },
})

// Pass it into a server to hook into request handlers.
const server = createServer(yoga)

// Start the server and you're done!
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
