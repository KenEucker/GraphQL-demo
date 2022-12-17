<script setup lang="ts">
import AboutProject from '../components/AboutProject.vue'
import TestBed from '../components/TestBed.vue'
import AuthorList from '../components/AuthorList.vue'
import { vElementHover } from '@vueuse/components'

const logos = [
  {
    name: 'vite',
    href: 'https://vitejs.dev',
    src: '/vite.svg',
  },
  {
    name: 'vue',
    href: 'https://vuejs.org',
    src: '/vue.svg',
  },
  {
    name: 'vueuse',
    href: 'https://vueuse.org',
    src: '/vueuse-icon.svg',
  },
  {
    name: 'typescript',
    href: 'https://typescriptlang.org',
    src: '/typescript.svg',
  },
  {
    name: 'apollo',
    href: 'https://the-guild.dev/graphql/yoga-server',
    src: '/graphql-yoga.svg',
  },
]

const hoverered = (index: number) => {
  const logo = logos[index]
  const logoEl = document.querySelector(`.name.${logo.name}`)

  logoEl?.classList.add('hovered')
  setTimeout(() => {
    logoEl?.classList.remove('hovered')
  }, 500)
}
</script>

<template>
  <h1>Vue GraphQl TypeScript Demo</h1>
  <div class="logos">
    <div v-for="(logo, i) in logos" :key="`logo-${i}`">
      <a v-element-hover="() => hoverered(i)" :href="logo.href" target="_blank">
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
          :alt="`${logo.name} logo`"
        />
      </a>
    </div>
  </div>
  <h1>
    <span v-for="(logo, i) in logos" :key="`name-${i}`" :class="`name ${logo.name}`">
      {{ logo.name }} +
    </span>
    you!
  </h1>

  <test-bed />
  <about-project />
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

.logo.vite:hover,
.name.vite.hovered {
  filter: drop-shadow(0 0 2em #646cffaa);
  color: #646cffaa;
}

.logo.vue:hover,
.name.vue.hovered {
  filter: drop-shadow(0 0 2em #42b883aa);
  color: #42b883aa;
}

.logo.vueuse:hover,
.name.vueuse.hovered {
  filter: drop-shadow(0 0 2em #42b883aa);
  color: #42b883aa;
}

.logo.typescript:hover,
.name.typescript.hovered {
  filter: drop-shadow(0 0 2em #017acc);
  color: #017acc;
}

.logo.apollo:hover,
.name.apollo.hovered {
  filter: drop-shadow(0 0 2em #c025d3);
  color: #c025d3;
}
</style>
