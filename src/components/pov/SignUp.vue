<script setup lang="ts">
import PovAuthor from '../author/PovAuthor.vue'
import { useAuthorState } from '../../store/state'
import { ref } from 'vue'

const emailRef = ref()
const authorState = useAuthorState()

const signUp = () => {
  if (emailRef.value.value) {
    const email = emailRef.value.value
    console.log('signing up authoer', { email })
    authorState.authorSignup(email)
  }
}
</script>
<template>
  <div class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
    <div v-if="authorState.isLoggedIn">
      <div class="text-center mb-4">
        <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
          Thank you for signing up!
        </label>
      </div>
    </div>
    <form v-else>
      <div class="mb-4">
        <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
          Signup for your own Point Of Vue!
        </label>
        <input
          id="emailaddress"
          ref="emailRef"
          class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
          type="text"
          placeholder="you@somewhere.com"
        />
      </div>
      <div class="flex items-center justify-between pt-4">
        <button
          class="bg-gradient-to-r text-slate-800 from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
          type="button"
          @click="signUp"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>
