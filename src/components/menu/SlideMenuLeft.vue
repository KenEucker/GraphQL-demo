<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import PostPov from 'vue-ionicons/dist/md-bonfire.vue'
import RouteButton from '../atomic/RouteButton.vue'
import AuthorCard from '../author/AuthorCard.vue'
import { useMenuState, useAuthorState } from '../../store/state'

const menuState = useMenuState()
const authorState = useAuthorState()
const router = useRouter()
const routes = computed(() =>
  router.getRoutes().filter((r) => r.meta.mainMenu && (authorState.isLoggedIn || !r.meta.protected))
)
const currentRoute = router.currentRoute

const props = defineProps({
  isExpanded: {
    type: Boolean,
    default: false,
    required: true,
  },
})

function postButtonClick() {
  menuState.openCreatePost()
  menuState.closeLeftMenu()

  router.push('/posts')
}

const authorPanelClick = () => {
  if (!menuState.isLeftMenuOpen) {
    menuState.openLeftMenu()
  }
}
</script>
<template>
  <div
    class="relative flex flex-col items-center w-full h-full overflow-x-hidden overflow-y-auto"
    :class="props.isExpanded ? 'p-10 px-5' : 'p-2'"
  >
    <author-card
      class="cursor-pointer"
      :is-expanded="props.isExpanded"
      :use-auth0="authorState.isAuth0"
      @click="authorPanelClick"
    />
    <ul class="flex flex-col pt-5" :class="props.isExpanded ? '' : 'justify-center flex '">
      <li
        v-for="route in routes"
        :key="route.name"
        class="` w-full max-w-50 py-2 flex items-center cursor-pointer active:scale-95 transform transition-transform select-none"
        :class="`${props.isExpanded ? 'mb-2' : 'justify-center mb-4'} ${
          route.name == currentRoute.name ? 'text-ll-primary' : ''
        }`"
        @click="menuState.closeLeftMenu()"
      >
        <route-button
          :path="route.path"
          :text="(route.name as string)"
          :active="route.name == currentRoute.name"
          :expanded="props.isExpanded"
        />
      </li>
    </ul>

    <button
      v-if="authorState.isLoggedIn"
      class="flex items-center justify-center w-full px-2 py-3 text-white transition-transform transform rounded-lg max-w-50 md:max-w-90 bg-ll-primary dark:bg-ld-primary active:scale-95"
      @click="postButtonClick"
    >
      <p v-if="props.isExpanded" class="mr-4">Post</p>
      <post-pov class="" w="30" h="30" />
    </button>

    <button
      class="absolute flex items-center w-8 h-8 mr-2 text-sm transition-transform transform border rounded-full md:hidden top-2 -right-1 bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border active:scale-95"
      @click="menuState.closeLeftMenu()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-full h-full"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  </div>
</template>
