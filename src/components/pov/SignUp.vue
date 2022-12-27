<script setup lang="ts">
import PopModal from '../atomic/PopModal.vue'
import PopButton from '../atomic/PopButton.vue'
import LoadingSpinner from '../atomic/LoadingSpinner.vue'
import PointOfVue from '../atomic/PointOfVue.vue'
import { useAuthorState, useMenuState } from '../../store/state'
import { ref, computed } from 'vue'
import { Author } from '../../schema/generated/types.d'

const label = ref('Signup for your own Point Of Vue!')
const signupEmailRef = ref()
const formRef = ref()
const emailRef = ref()
const handleRef = ref()
const nameRef = ref()
const loadingRef = ref(false)
const authorState = useAuthorState()
const menuState = useMenuState()
const fields = computed(() => [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    value: '',
    readonly: true,
    required: true,
    placeholder: 'email',
    ref: emailRef,
    fullWidth: true,
  },
  {
    name: 'handle',
    label: '@handle',
    prefix: '@',
    value: '',
    required: true,
    placeholder: 'handle',
    ref: handleRef,
    fullWidth: true,
  },
  {
    name: 'name',
    label: 'Display Name',
    value: '',
    placeholder: 'name',
    required: true,
    ref: nameRef,
    fullWidth: true,
  },
])

const signUp = async (e: Event) => {
  e.preventDefault()
  const email = signupEmailRef.value.value
  const emailInUse = await authorState.isEmailInUse(email)
  if (emailInUse) {
    label.value = `email address [${emailInUse.email}] is already signed up.`
  } else {
    /// Hacky
    fields.value[0].value = email
    menuState.openSignup()
  }
}

const completeSignup = async (e: Event) => {
  e.preventDefault()

  loadingRef.value = true
  const author = {
    email: emailRef.value[0].value,
    name: nameRef.value[0].value,
    handle: handleRef.value[0].value,
  }
  console.log('signing up auther', { author })
  const error = await authorState.authorSignup(author as Author)
  loadingRef.value = false

  console.log({ error })
}
</script>
<template>
  <div class="w-full px-8 pt-6 pb-8 mb-4 bg-gray-900 rounded-lg shadow-lg opacity-75">
    <div v-if="authorState.isLoggedIn">
      <div class="mb-4 text-center">
        <label class="block py-2 mb-2 font-bold text-blue-300"> Thank you for signing up! </label>
      </div>
    </div>
    <loading-spinner v-else-if="loadingRef" />
    <form v-else ref="formRef" @submit="signUp">
      <div class="mb-4">
        <label class="block py-2 mb-2 font-bold text-blue-300" for="email">
          {{ label }}
        </label>
        <input
          id="email"
          ref="signupEmailRef"
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
      <form class="relative w-full m-auto mt-10 bg-white md:w-3/4 z-1000">
        <fieldset>
          <legend class="text-xl">Please complete your signup</legend>
          <p
            v-for="field in fields"
            :key="field.name"
            :class="field.fullWidth ? 'col-span-2' : ''"
            class="relative z-1000"
          >
            <label class="relative z-1001" :for="field.name">{{ field.label }}</label>
            <input
              :id="field.name"
              :ref="field.ref"
              :name="field.name"
              :readonly="field.readonly"
              :type="field.type ?? 'text'"
              class="relative block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring z-1001"
              :class="field.fullWidth ? 'col-span-2' : ''"
              :value="field.value"
            />
            <span v-if="field.prefix" class="absolute inset-y-10 -left-1 flex pl-[1%] z-1001">{{
              field.prefix
            }}</span>
          </p>
        </fieldset>
        <div>
          <pop-button
            class="px-6 py-2 m-auto mt-5 font-bold rounded bg-ll-primary text-slate-800 hover:scale-105"
            @click="completeSignup"
          >
            <point-of-vue :icon-only="true" class="ml-1 align-middle max-h-8 max-w-8" />
          </pop-button>
        </div>
      </form>
    </pop-modal>
  </div>
</template>
