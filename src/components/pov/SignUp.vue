<script setup lang="ts">
import LoadingSpinner from '../atomic/LoadingSpinner.vue'
import PovAuthor from '../author/PovAuthor.vue'
import { useAuthorState } from '../../store/state'
import { ref, reactive } from 'vue'
import { Author } from '../../schema/generated/types.d'
import { useWindowSize } from '@vueuse/core'
import { useRouter } from 'vue-router'
import Popper from 'vue3-popper'

const { width } = useWindowSize()
const label = ref('Signup for your own Point Of Vue!')
const formRef = ref()
const signUpForm = ref()
const handleRef = ref()
const loadingRef = ref(false)
const errors = ref()
const showSignupModal = ref(false)
const authorState = useAuthorState()
const router = useRouter()

const author = reactive({
  email: '',
  name: '',
  handle: '',
  avatar: '/img/add-profile.png',
  verified: false,
})

const signUp = async (e: Event) => {
  e.preventDefault()

  const emailInUse = await authorState.isEmailInUse(author.email)
  if (emailInUse) {
    label.value = `email address [${emailInUse.email}] is already signed up.`
  } else {
    showSignupModal.value = true
  }
}

const completeSignup = async (e: Event) => {
  e.preventDefault()
  e.stopPropagation()

  loadingRef.value = true
  const result = await authorState.authorSignup({ ...author } as Author)
  console.log({ result })
  if (result) {
    errors.value = result
  } else {
    showSignupModal.value = false
    router.push('/posts')
  }
  loadingRef.value = false
  return false
}
</script>
<template>
  <div class="w-full px-8 pt-6 pb-8 mb-4 bg-gray-900 rounded-lg shadow-lg">
    <div
      v-if="showSignupModal"
      class="absolute h-100vh w-100vw top-0 bottom-0 left-0 right-0"
      @click="showSignupModal = false"
    ></div>
    <div v-if="authorState.isLoggedIn">
      <div class="mb-4 text-center">
        <label class="block py-2 mb-2 font-bold text-green-300 text-2xl">
          Thank you for signing up!
        </label>
      </div>
    </div>
    <form v-else ref="formRef" @submit="signUp">
      <div class="mb-4">
        <label class="block py-2 mb-2 font-bold text-green-300" for="email">
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
    <popper :show="showSignupModal" :placement="width > 400 ? 'right' : 'top'">
      <template #default></template>
      <template #content>
        <div class="translate-y-6">
          <loading-spinner v-if="loadingRef" />
          <form
            v-else
            ref="signUpForm"
            class="w-full max-w-sm p-4border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
            @submit="completeSignup"
          >
            <pov-author :size="width < 500 ? 'medium' : 'large'" :author="author" />
            <div
              v-if="errors"
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span class="block sm:inline">{{ errors }}</span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="errors = null">
                <svg
                  class="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                  />
                </svg>
              </span>
            </div>
            <h5 v-else class="text-xl font-medium text-gray-900 dark:text-white">
              Complete your signup
            </h5>
            <fieldset>
              <p>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="email"
                  >Email Address</label
                >
                <input
                  v-model="author.email"
                  type="email"
                  name="email"
                  required
                  readonly
                  class="relative block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring"
                />
              </p>
              <p class="relative">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="handle"
                  >Handle</label
                >
                <input
                  :ref="handleRef"
                  v-model="author.handle"
                  type="handle"
                  name="handle"
                  required
                  class="relative block w-full px-4.5 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring"
                />
                <span class="absolute inset-y-9 left-0 flex pl-[1%]">@</span>
              </p>
              <p>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="name"
                  >Avatar URL</label
                >
                <input
                  v-model="author.avatar"
                  type="avatar"
                  name="avatar"
                  required
                  class="relative block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring"
                />
              </p>
              <p>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="name"
                  >Name</label
                >
                <input
                  v-model="author.name"
                  type="name"
                  name="name"
                  required
                  class="relative block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring"
                />
              </p>

              <div class="flex items-start mt-1">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="verify"
                      v-model="author.verified"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <label
                    for="verify"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Verify me</label
                  >
                </div>
                <a
                  href="#"
                  class="ml-auto text-sm text-green-700 hover:underline dark:text-green-500"
                  >no password?</a
                >
              </div>
              <button
                type="submit"
                class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 mt-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Create your account
              </button>
              <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                By clicking create account you agree that you haven't read any terms or conditions
              </div>
            </fieldset>
          </form>
        </div>
      </template>
    </popper>
  </div>
</template>
