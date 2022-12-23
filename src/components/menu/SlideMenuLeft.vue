<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PostPov from 'vue-ionicons/dist/md-bonfire.vue'
import RouteButton from '../atomic/RouteButton.vue'
import AuthorPanel from '../author/AuthorPanel.vue'
import { useMenusState, useAuthorState } from '../../store/state'

const menuState = useMenusState()
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
</script>
<template>
  <div
    class="w-full h-full flex flex-col relative overflow-y-auto overflow-x-hidden items-center"
    :class="props.isExpanded ? 'p-10 px-5' : 'p-2'"
  >
    <author-panel :is-expanded="props.isExpanded" />
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
      class="w-full max-w-50 md:max-w-90 bg-ll-primary dark:bg-ld-primary text-white rounded-lg py-3 px-2 active:scale-95 transform transition-transform flex items-center justify-center"
      @click="postButtonClick"
    >
      <p v-if="props.isExpanded" class="mr-4">Post</p>
      <post-pov class="" w="30" h="30" />
    </button>

    <button
      class="md:hidden w-8 h-8 absolute top-2 -right-1 bg-ll-neutral dark:bg-ld-neutral text-sm border-ll-border dark:border-ld-border border rounded-full flex items-center mr-2 active:scale-95 transform transition-transform"
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
