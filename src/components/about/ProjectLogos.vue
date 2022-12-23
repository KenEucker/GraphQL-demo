<script setup lang="ts">
import { vElementHover } from '@vueuse/components'

const logos = [
  {
    name: 'vite',
    description:
      'Builds the frontend client scripts and files and provides plugins for local development.',
    href: 'https://vitejs.dev',
    src: '/img/vite.svg',
  },
  {
    name: 'typescript',
    description: 'All of the source code for this project is written in TypeScript',
    href: 'https://typescriptlang.org',
    src: '/img/typescript.svg',
  },
  {
    name: 'graphql-yoga',
    description: 'A graphql server runs locally, in vite, with the help of graphql-yoga',
    href: 'https://the-guild.dev/graphql/yoga-server',
    src: '/img/graphql-yoga.svg',
  },
  {
    name: 'prisma',
    description:
      'Prisma is the ORM that creates and maintains the db and generating models in TypeScript.',
    href: 'https://prisma.io',
    src: '/img/prisma.png',
  },
  {
    name: 'graphql',
    description: 'GraphQl queries power the frontend application, making it very extensible.',
    href: 'https://graphql.org',
    src: '/img/GraphQL_Logo.svg',
  },
  {
    name: 'vue',
    description:
      'The frontend is written in Vue with TypeScript using the composition API and the most modern best practices.',
    href: 'https://vuejs.org',
    src: '/img/vue.svg',
  },
  {
    name: 'vueuse',
    description:
      "VueUse is like VueJs's version of jQuery providing both computational utilities as well as UI utilities.",
    href: 'https://vueuse.org',
    src: '/img/vueuse-icon.svg',
  },
  {
    name: 'windicss',
    description:
      'WindiCss provides class based styling and easy theming in the lightest set of deliverables for a rich visual experience and rapid development.',
    href: 'https://windicss.org',
    src: '/img/windicss-logo.svg',
  },
  {
    name: 'pinia',
    description:
      'Pinia stores the state of the frontend for components to remain up to date with data subscriptions to the backend GraphQL server.',
    href: 'https://pinia.vuejs.org',
    src: '/img/pinia-logo.svg',
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
  <div class="p-2 text-center mt-10 w-full md:p-4 md:w-3/4 m-auto">
    <span class="text-xl text-center">This project uses the following libraries and platforms</span>
    <div
      class="items-center justify-between space-between flex grid grid-cols-2 md:grid-cols-3 md:pl-10 lg:pr-30"
    >
      <div v-for="(logo, i) in logos" :key="`logo-${i}`" class="text-center m-auto">
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
            class="max-w-[95px] w-20 m-4 min-h-6 mx-auto"
            :class="logo.name"
            :alt="`${logo.name} logo`"
          />
        </a>
        <span class="text-lg">{{ logo.name }}</span>
        <p class="text-sm">{{ logo.description }}</p>
      </div>
    </div>
  </div>
</template>
