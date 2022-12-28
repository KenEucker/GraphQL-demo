<script setup lang="ts">
import PopModal from '../atomic/PopModal.vue'
import PopButton from '../atomic/PopButton.vue'
import LoadingSpinner from '../atomic/LoadingSpinner.vue'
import PovAuthor from '../author/PovAuthor.vue'
import PointOfVue from '../atomic/PointOfVue.vue'
import { useAuthorState, useMenuState } from '../../store/state'
import { ref, reactive } from 'vue'
import { Author } from '../../schema/generated/types.d'
import { useWindowSize } from '@vueuse/core'
import { useRouter } from 'vue-router'

const { width } = useWindowSize()
const label = ref('Signup for your own Point Of Vue!')
const formRef = ref()
const signUpForm = ref()
const handleRef = ref()
const loadingRef = ref(false)
const authorState = useAuthorState()
const menuState = useMenuState()
const router = useRouter()

const author = reactive({
  email: '',
  name: '',
  handle: '',
  avatar: '/img/add-profile.png',
})

const signUp = async (e: Event) => {
  e.preventDefault()

  const emailInUse = await authorState.isEmailInUse(author.email)
  if (emailInUse) {
    label.value = `email address [${emailInUse.email}] is already signed up.`
  } else {
    menuState.openSignup()
  }
}

const completeSignup = async (e: Event) => {
  e.preventDefault()

  loadingRef.value = true
  const result = await authorState.authorSignup({ ...author } as Author)

  if (result) {
    handleRef.value.setCustomValidity(result)
    handleRef.value.reportValidity()
  } else {
    menuState.closeSignup()
    router.push('/posts')
  }
  loadingRef.value = false
  return false
}

const clearError = (e: any) => {
  e.currentTarget.setCustomValidity('')
  e.currentTarget.reportValidity()
}
</script>
<template>
  <div class="w-full px-8 pt-6 pb-8 mb-4 bg-gray-900 rounded-lg shadow-lg opacity-75">
    <div v-if="authorState.isLoggedIn">
      <div class="mb-4 text-center">
        <label class="block py-2 mb-2 font-bold text-blue-300 text-2xl">
          Thank you for signing up!
        </label>
      </div>
    </div>
    <form v-else ref="formRef" @submit="signUp">
      <div class="mb-4">
        <label class="block py-2 mb-2 font-bold text-blue-300" for="email">
          {{ label }}
        </label>
        <input
          id="email"
          v-model="author.email"
          type="email"
          required
          class="w-full p-3 leading-tight text-gray-700 transition duration-300 ease-in-out transform border rounded shadow appearance-none focus:ring hover:scale-105"
          placeholder="you@somewhere.com"
        />
      </div>
      <div class="flex items-center justify-between pt-4">
        <button
          class="px-4 py-2 font-bold transition duration-300 ease-in-out transform rounded bg-gradient-to-r text-slate-800 from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 focus:ring hover:scale-105"
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
    <pop-modal>
      <loading-spinner v-if="loadingRef" />
      <form
        v-else
        ref="signUpForm"
        class="relative w-full m-auto bg-white md:w-3/4 z-1000"
        @submit="completeSignup"
      >
        <pov-author :size="width < 500 ? 'medium' : 'large'" :author="author" />
        <fieldset>
          <legend class="text-xl">Please complete your signup</legend>
          <p>
            <label class="relative z-1001" for="email">Email Address</label>
            <input
              v-model="author.email"
              type="email"
              name="email"
              required
              class="relative block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring z-1001"
            />
          </p>
          <p class="relative">
            <label class="relative z-1001" for="handle">Handle</label>
            <input
              :ref="handleRef"
              v-model="author.handle"
              type="handle"
              name="handle"
              required
              class="relative block w-full px-4.5 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring z-1001"
              @change="clearError"
            />
            <span class="absolute inset-y-10 left-0 flex pl-[1%] z-1001">@</span>
          </p>
          <p>
            <label class="relative z-1001" for="name">Avatar URL</label>
            <input
              v-model="author.avatar"
              type="avatar"
              name="avatar"
              required
              class="relative block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring z-1001"
            />
          </p>
          <p>
            <label class="relative z-1001" for="name">Name</label>
            <input
              v-model="author.name"
              type="name"
              name="name"
              required
              class="relative block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring z-1001"
            />
          </p>
        </fieldset>
        <div>
          <pop-button
            class="px-6 py-2 m-auto mt-1 font-bold rounded bg-ll-primary text-slate-800 hover:scale-105"
            type="submit"
          >
            <point-of-vue :icon-only="true" class="ml-1 align-middle max-h-8 max-w-8" />
          </pop-button>
        </div>
      </form>
    </pop-modal>
  </div>
</template>
