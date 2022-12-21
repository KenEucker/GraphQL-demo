<script setup lang="ts">
import { vElementHover } from '@vueuse/components'

const logos = [
  {
    name: 'vite',
    href: 'https://vitejs.dev',
    src: '/img/vite.svg',
  },
  {
    name: 'vue',
    href: 'https://vuejs.org',
    src: '/img/vue.svg',
  },
  {
    name: 'vueuse',
    href: 'https://vueuse.org',
    src: '/img/vueuse-icon.svg',
  },
  {
    name: 'typescript',
    href: 'https://typescriptlang.org',
    src: '/img/typescript.svg',
  },
  {
    name: 'apollo',
    href: 'https://the-guild.dev/graphql/yoga-server',
    src: '/img/graphql-yoga.svg',
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
  <div class="p-2 text-xl text-center mt-10 w-full md:p-4 md:w-3/4 m-auto">
    <h1>This project uses the following libraries and platforms.</h1>
    <div class="items-center justify-between flex-wrap flex md:pl-10 lg:pr-30">
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
            class="logo"
            :class="logo.name"
            :alt="`${logo.name} logo`"
          />
        </a>
      </div>
    </div>
    <div
      class="text-xl text-center flex justify-between items-center justify-between flex-wrap flex md:pl-10 lg:pr-40"
    >
      <span v-for="(logo, i) in logos" :key="`name-${i}`" class="p-5 name" :class="logo.name">
        <span class="ml-5">{{ logo.name }}</span>
        <span class="ml-5">+</span>
      </span>
      <span class="mr-5 p-5">you!</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  min-height: 6rem;
  padding: 1.5em;
  will-change: filter;
  max-width: 95px;
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
