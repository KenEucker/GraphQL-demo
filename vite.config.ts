import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import graphqlPlugin from 'vite-plugin-graphql'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // plugins: [vue(), graphqlPlugin],
})
