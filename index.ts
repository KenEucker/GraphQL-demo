// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import { schema, pubsub, prisma } from './src/schema'
import db from './src/store/seed'

/// Environment Variables and their Defaults
const originUrl = process.env.ORIGIN ?? 'http://localhost'
const originPort = process.env.ORIGIN_PORT ? parseInt(process.env.ORIGIN_PORT) : 8080
const graphUrl = process.env.GRAPH_URL ?? 'http://localhost'
const graphPort = process.env.GRAPH_PORT ? parseInt(process.env.GRAPH_PORT) : 8100
const graphPath = process.env.GRAPH_PATH ?? 'graphql'
const port = process.env.PORT ? parseInt(process.env.PORT) : graphPort

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
    origin: `${originUrl}${originPort !== 80 ? `:${originPort}` : ''}`,
    credentials: true,
  },
})

// Pass it into a server to hook into request handlers.
const server = createServer(yoga)

server.listen(port, () => {
  console.info(`🚀 GraphQL Server (yoga) is running on ${serverUrl}`)
})

export default server
