import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
const uri = `${process.env.GRAPH_URL}:${process.env.GRAPH_PORT}/${process.env.GRAPH_PATH}`

// HTTP connection to the API
const link = createHttpLink({ uri })

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link,
  cache,
  /// TODO: grab from env
  connectToDevTools: process.env.DEV === 'true',
})
