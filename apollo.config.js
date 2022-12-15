// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'graphql-demo',
        // URL to the GraphQL API
        url: 'http://localhost:4000/graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.ts',
      ],
    },
  }