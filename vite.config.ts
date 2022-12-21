import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
// import graphqlPlugin from 'vite-plugin-graphql'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  // plugins: [vue(), graphqlPlugin],
  server: {
    port: 3000,
  },
})
