<script setup lang="ts">
import ImageIcon from 'vue-ionicons/dist/md-image.vue'
import LoadingSpinner from '../components/app/LoadingSpinner.vue'
import ErrorMessage from '../components/app/ErrorMessage.vue'
import PovAuthor from '../components/app/PovAuthor.vue'
import { reactive, watch, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useStorage } from '@vueuse/core'

const storedEmail = useStorage('author-email', '')
const router = useRouter()

// Call the gql function with the GraphQL query
const query = gql`
  query SettingsPageAuthor($email: String!) {
    authors(where: { email: $email }) {
      id
      name
      email
      handle
      avatar
      verified
      banner
      posts {
        id
        title
        text
        author {
          id
          handle
          avatar
          verified
        }
      }
    }
  }
`
const { result, loading, error } = useQuery(query, { email: storedEmail.value })
const isLoggedIn = reactive(result)
watch(isLoggedIn, (r) => {
  const loggedInAuthor = r?.authors.find((a: any) => a.email === storedEmail.value)
  if (loggedInAuthor) {
    author.value = loggedInAuthor
  } else {
    storedEmail.value = null
    router.push('/')
  }
})

const author = ref()
const fields = computed(() => [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    value: author.value?.email,
    required: true,
    placeholder: 'email',
    ref: ref(),
    fullWidth: true,
  },
  {
    name: 'handle',
    label: '@handle',
    readonly: true,
    prefix: '@',
    getValue: (f: any) => f?.value?.substring(1),
    value: author.value?.handle,
    placeholder: 'handle',
    ref: ref(),
  },
  {
    name: 'name',
    label: 'Display Name',
    value: author.value?.name,
    placeholder: 'name',
    ref: ref(),
  },
  {
    name: 'location',
    label: 'Location',
    value: author.value?.location,
    placeholder: 'location',
    ref: ref(),
  },
  {
    name: 'birthday',
    type: 'date',
    label: 'Birthday',
    value: author.value?.birthday,
    placeholder: 'birthday',
    ref: ref(),
  },
  {
    name: 'link',
    label: 'Website',
    value: author.value?.link,
    placeholder: 'website',
    fullWidth: true,
    ref: ref(),
  },
])

const images = [
  {
    name: 'avatar',
    label: 'Avatar',
    ref: ref(),
  },
  {
    name: 'banner',
    label: 'Banner',
    ref: ref(),
  },
]

function saveImages(e: Event) {
  e.preventDefault()
}

function saveFields(e: Event) {
  e.preventDefault()
}
</script>

<template>
  <div v-if="loading">
    <loading-spinner />
  </div>
  <div v-else-if="error">
    <error-message title="Error Fetching Account Data" :message="error.message" />
  </div>
  <div v-else>
    <section
      class="max-w-4xl p-6 mx-auto rounded-md shadow-md mx-auto dark:bg-gray-800 mt-20"
      :style="{ background: `url(/img/twitter-banner.jpg) no-repeat right` }"
    >
      <pov-author :author="author" size="large" />
    </section>
    <section class="max-w-4xl p-6 mx-auto rounded-md shadow-md dark:bg-gray-800 mt-20">
      <h1 class="text-xl font-bold capitalize dark:text-white">Profile settings</h1>
      <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div
            v-for="field in fields"
            :key="field.name"
            class="relative"
            :class="field.fullWidth ? 'col-span-2' : ''"
          >
            <label :for="field.name">{{ field.label }}</label>
            <input
              :id="field.name"
              :ref="field.ref"
              :name="field.name"
              :readonly="field.readonly"
              :type="field.type ?? 'text'"
              class="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              :class="field.fullWidth ? 'col-span-2' : ''"
              :value="field.getValue ? field.getValue(field) : field.value ?? ''"
            />
            <span v-if="field.prefix" class="absolute inset-y-10 left-0 flex pl-[1%]">{{
              field.prefix
            }}</span>
          </div>
        </div>

        <!-- <div>
          <label class="dark:text-gray-200" for="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            type="email"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label class="dark:text-gray-200" for="password">Password</label>
          <input
            id="password"
            type="password"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label class="dark:text-gray-200" for="passwordConfirmation"
            >Password Confirmation</label
          >
          <input
            id="passwordConfirmation"
            type="password"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label class="dark:text-gray-200" for="passwordConfirmation">Color</label>
          <input
            id="color"
            type="color"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label class="dark:text-gray-200" for="passwordConfirmation">Select</label>
          <select
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          >
            <option>Surabaya</option>
            <option>Jakarta</option>
            <option>Tangerang</option>
            <option>Bandung</option>
          </select>
        </div>
        <div>
          <label class="dark:text-gray-200" for="passwordConfirmation">Range</label>
          <input
            id="range"
            type="range"
            class="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label class="dark:text-gray-200" for="passwordConfirmation">Date</label>
          <input
            id="date"
            type="date"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label class="dark:text-gray-200" for="passwordConfirmation">Text Area</label>
          <textarea
            id="textarea"
            type="textarea"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          ></textarea>
        </div> -->

        <div class="flex justify-end mt-6">
          <button
            class="px-6 py-2 dark:text-white text-black leading-5 transition-colors duration-200 transform bg-ll-primary rounded-md hover:bg-ll-secondary focus:outline-none focus:bg-ll-secondary"
            @click="saveFields"
          >
            Save
          </button>
        </div>
      </form>
    </section>

    <!-- <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-10">
      <h2 class="text-lg font-semibold capitalize dark:text-white">Profile Images</h2>
      <form>
        <div v-for="image in images" :key="image.name" class="mt-4 mb-4">
          <label class="block text-sm font-medium"> {{ image.label }} </label>
          <div
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
          >
            <div class="space-y-1 text-center">
              <image-icon h="60" w="60" />
              <div class="flex text-sm">
                <label
                  for="file-upload"
                  class="relative cursor-pointer bg-white rounded-md font-medium hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span class="">Upload a file</span>
                  <input
                    :id="image.name"
                    :ref="image.ref"
                    :name="image.name"
                    type="file"
                    class="sr-only"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs">PNG, JPG, GIF up to 5MB</p>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button
            class="px-6 py-2 leading-5 dark:text-white text-black transition-colors duration-200 transform bg-ll-primary rounded-md hover:bg-ll-secondary focus:outline-none focus:bg-ll-secondary"
            @click="saveImages"
          >
            Save
          </button>
        </div>
      </form>
    </section> -->
  </div>
</template>
