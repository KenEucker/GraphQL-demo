<script setup lang="ts">
import { useMouse, useCounter } from '@vueuse/core'

defineProps<{ msg: string }>()

const { x, y } = useMouse()
const { count, inc, dec } = useCounter()
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <h2>TestBed</h2>
    <h3>Mouse: {{x}} x {{y}}</h3>
    <button type="button" @click="count--">-</button>
    <span>count is {{ count }}</span>
    <button type="button" @click="count++">+</button>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    This project starter uses
    <a href="https://the-guild.dev/graphql/codegen" target="_blank"
      >graphql-codegen</a
    >, to generate Typed Queries, resolvers, and more for Vue Apollo.
  </p>
  <p>
    <a href="https://vitejs.dev/blog/announcing-vite4.html" target="_blank"
      >GraphQL Yoga</a
    > runs the development Apollo server including a 
    <a href="http://localhost:4000/graphql" target="_blank">
      playground
    </a>
  </p>
  <p>
    Powered by vite 4
    <a href="https://vitejs.dev/blog/announcing-vite4.html" target="_blank"
      >Vite 4</a
    >, now using 
    <a href="https://rollupjs.org/guide/en/" target="_blank">
      Rollup 3
    </a>
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">This starter was developed as research into learning GraphQL and Apollo.</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

span {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
