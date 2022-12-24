import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import EnvironmentPlugin from 'vite-plugin-environment'
import env from 'dotenv'
env.config()

const port = parseInt(process.env.PORT ?? '80')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    EnvironmentPlugin({
      ORIGIN: process.env.ORIGIN ?? 'http://localhost',
      ORIGIN_PORT: process.env.ORIGIN_PORT ?? port.toString(),
      PORT: port.toString(),
      GRAPH_URL: process.env.GRAPH_URL ?? 'http://localhost',
      GRAPH_PORT: process.env.GRAPH_PORT ?? '8080',
      GRAPH_PATH: process.env.GRAPH_PATH ?? 'graphql',
      STUDIO_URL: process.env.STUDIO_URL ?? 'http://localhost:5555',
    }),
  ],
  server: {
    port: process.env.ORIGIN_PORT ? parseInt(process.env.ORIGIN_PORT) : port,
  },
  preview: {
    port: process.env.ORIGIN_PORT ? parseInt(process.env.ORIGIN_PORT) : port,
  },
})
