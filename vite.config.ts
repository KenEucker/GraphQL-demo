import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import EnvironmentPlugin from 'vite-plugin-environment'
// import graphqlPlugin from 'vite-plugin-graphql'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    EnvironmentPlugin({
      ORIGIN: process.env.ORIGIN ?? 'http://localhost',
      PORT: process.env.PORT ?? '3000',
      GRAPH_URL: process.env.GRAPH_URL ?? 'http://localhost',
      GRAPH_PORT: process.env.GRAPH_PORT ?? '4000',
      GRAPH_PATH: process.env.GRAPH_PATH ?? 'graphql',
      DATABASE_URL: process.env.DATABASE_URL ?? null,
    }),
  ],
  // plugins: [vue(), graphqlPlugin],
  server: {
    port: 3000,
  },
  preview: {
    port: 80,
  },
})
