import { createServer } from "node:http"
import { createYoga } from "graphql-yoga"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { schema } from './src/schema'

const typeDefs = loadSchemaSync("schema.graphql", {
  loaders: [new GraphQLFileLoader()],
})

// TODO: convert to NextJs project?
// import type { NextApiRequest, NextApiResponse } from 'next'

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema
})

// Pass it into a server to hook into request handlers.
const server = createServer(yoga)

// Start the server and you're done!
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql")
})