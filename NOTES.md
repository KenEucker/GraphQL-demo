# project description

Udemy Modern GraphQL Bootcamp (with Node.js and Apollo)
https://www.udemy.com/share/101WtW3@DsWGBqkerk4VGISrd4_ZEuZQ8IzNlGR0PGKZOuBrTDKNsxlHIT4m5XbdgdATbiQeKg==/

Learn how to build GraphQL applications using Node.js. Includes Prisma v1, authentication, Apollo Client, and more!

# stack decisions

- Vite4
- Vue3
- Apollo Server
- GraphQL Yoga
- Vue Apollo

# development decisions

Client -- Vite Built Development server on localhost:3000/
Server -- Apollo Server w/playground on localhost:4000/graphql

GraphQL CodeGen
https://www.apollographql.com/docs/react/development-testing/static-typing/

# how I got there

https://graphql.org/learn/queries/

https://the-guild.dev/graphql/codegen/docs/guides/graphql-server-apollo-yoga

https://www.youtube.com/watch?v=tHMaNmqPIC4

https://v4.apollo.vuejs.org/
https://v4.apollo.vuejs.org/guide-composable/

Subscriptions deviates from the udemy course instruction. I believe that this is due to the fact that I am using Apollo V4 with Graphql-Yoga@latest. https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions

Hasura instead of Heroku (Just kidding went back to Heroku)
https://cloud.hasura.io/

Deploying Prisma to Heroku
https://github.com/prisma/prisma-examples/tree/latest/deployment-platforms/heroku

# potential hosting solutions

- https://nhost.io/

# tools used

- Vuejs devtools https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd

- Apollo Client Devtools https://chrome.google.com/webstore/detail/apollo-client-devtools/jdkknkkbebbapilgoeccciglkfbmbnfm

# advanced learning

Serverless GraphQL Starter Kit - https://github.com/serverless/serverless-graphql

Put it all into NextJs - https://github.com/dotansimha/graphql-yoga/tree/main/examples/nextjs

Whatever Remix is - https://remix.run/docs/en/v1/tutorials/blog

# big platform ideas

Build a Coolify server - https://github.com/coollabsio/coolify
Connect Totum for artists - https://github.com/poulainv/tottem
Connect calendly for scheduling - https://github.com/calcom/cal.com
Connect umami for analytics - https://github.com/umami-software/umami
Connect vaultwarden for IAM services - https://github.com/dani-garcia/vaultwarden
Build in a code server for creating Vue's - https://github.com/coder/code-server
Connect Linen for chat spaces (no DMs!) - https://github.com/Linen-dev/linen.dev
Build Beam into posts for more rich "longform" posts - https://github.com/planetscale/beam
