<script setup lang="ts">
import { ref, watch } from 'vue'
import LoginIcon from 'vue-ionicons/dist/md-log-in.vue'
import LogoutIcon from 'vue-ionicons/dist/md-log-out.vue'
import PointOfVue from '../atomic/PointOfVue.vue'
import PovAuthor from './PovAuthor.vue'
import { useMenuState, useAuthorState } from '../../store/state'
import { storeToRefs } from 'pinia'

const emailInput = ref()
const menuState = useMenuState()
const authorState = useAuthorState()

const props = defineProps({
  isExpanded: Boolean,
})

const { author } = storeToRefs(authorState)
watch(author, () => {
  if (authorState.isLoggedIn) {
    menuState.openCreatePost()
  } else {
    menuState.closeCreatePost()
  }
})

const loginWithEmail = () => {
  authorState.loginWithEmail(emailInput.value.value)
}

const logout = () => {
  authorState.logout()
}

authorState.login()
</script>

<template>
  <div class="flex appjustify-center items-center">
    <div v-if="authorState.isLoggedIn" class="profile flex flex-col relative">
      <button v-if="props.isExpanded" class="absolute -top-1/5 md:-left-2" @click="logout()">
        <logout-icon h="32" w="32" />
      </button>
      <pov-author :author="author" size="small" :image-only="!props.isExpanded" />
      <div
        v-if="props.isExpanded"
        class="w-full flex justify-between mt-5 pb-5 border-b border-ll-border dark:border-ld-border gap-2"
      >
        <div class="flex flex-col justify-center items-center">
          <p class="text-lg font-bold text-gray-800 dark:text-gray-300">
            {{ author.posts?.length ?? 0 }}
          </p>
          <p class="-mt-1 text-xs">Posts</p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <p class="text-lg font-bold text-gray-800 dark:text-gray-300">
            {{ author.followers ?? 0 }}
          </p>
          <p class="-mt-1 text-xs">Followers</p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <p class="text-lg font-bold text-gray-800 dark:text-gray-300">
            {{ author.following ?? 0 }}
          </p>
          <p class="-mt-1 text-xs">Following</p>
        </div>
      </div>
    </div>
    <div
      v-else-if="props.isExpanded"
      class="shadow-md rounded dark:bg-ld-base sm:w-100 md:w-40 p-2 w-40 lg:w-60 lg:p-4 lg:pt-6 lg:mb-4 flex flex-col"
    >
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2 text-center" for="email">
          <point-of-vue :expanded="props.isExpanded" />
        </label>
        <input
          id="email"
          ref="emailInput"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          type="text"
          placeholder="Email Address"
        />
      </div>
      <button
        class="bg-ll-primary dark:bg-ld-primary rounded-lg py-3 text-tight active:scale-95 transform transition-transform flex items-center justify-center"
        type="button"
        @click="loginWithEmail()"
      >
        <login-icon h="20" w="20" />
      </button>
    </div>
    <button
      v-else
      class="rounded-lg py-3 text-tight active:scale-95 transform transition-transform flex"
      type="button"
    >
      <login-icon h="24" w="24" @click="menuState.openLeftMenu()" />
    </button>
  </div>
</template>
