<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
import HelloApollo from '../components/HelloApollo.vue'

const logos = [
  {
    name: "vite",
    href: "https://vitejs.dev",
    src: "/vite.svg",
  },
  {
    name: "vue",
    href: "https://vuejs.org",
    src: "/vue.svg",
  },
  {
    name: "vueuse",
    href: "https://vueuse.org",
    src: "/vueuse-icon.svg",
  },
  {
    name: "typescript",
    href: "https://typescriptlang.org",
    src: "/typescript.svg",
  },
  {
    name: "apollo",
    href: "https://the-guild.dev/graphql/yoga-server",
    src: "/graphql-yoga.svg",
  },
]
</script>

<template>
  <div class="logos">
    <div v-for="logo in logos">
      <a :href="logo.href" target="_blank">
        <img 
          v-motion 
          :initial="{
            y: 100,
            opacity: 0,
            scale: 1,
          }"
          :enter="{
            y: 0,
            scale: 1,
            opacity: 1,
            transition: {
              stiffness: '100',
              delay: 100,
            },
          }"
          :hovered="{
            scale: 1.25,
          }"
          :src="logo.src"
          :class="`logo ${logo.name}`"
          :alt="`${logo.name} logo`" />
      </a>
    </div>
  </div>
  <HelloWorld msg="Vite + Vue + VueUse + TypeScript + Apollo" />
  <HelloApollo msg="Vite + Vue" />
</template>

<style lang="scss" scoped>
.logos {
  display: flex;
  margin: auto;
  width: 100%;

  > div {
    margin: auto;
  }
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.logo.ts:hover {
  filter: drop-shadow(0 0 2em #017ACC);
}

.logo.yoga:hover {
  filter: drop-shadow(0 0 2em #C025D3);
}

.logo.vueuse:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
