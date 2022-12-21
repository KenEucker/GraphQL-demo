<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { Author } from '../../schema/generated/types'
import { useStorage } from '@vueuse/core'
import PovAuthor from './PovAuthor.vue'

const storedEmail = useStorage('author-email', '')

// Call the gql function with the GraphQL query
const query = gql`
  query FollowMoreAuthors {
    authors {
      email
      name
      verified
      handle
      avatar
    }
  }
`

const { result } = useQuery(query)
const authors = reactive(result)
let authorsToFollow: Author[] = reactive([])
watch(authors, (r) => {
  authorsToFollow = r.authors.filter((a: Author) => a.email !== storedEmail.value)
})
</script>
<template>
  <ul v-if="authors" class="w-full bg-ll-neutral dark:bg-ld-neutral p-5 rounded-md mb-5">
    <li
      class="dark:text-gray-200 text-gray-700 text-lg border-b pb-3 border-ll-border dark:border-ld-border mb-4"
    >
      <p>Who to follow</p>
    </li>
    <div v-for="author in authorsToFollow" :key="author.handle" class="flex items-center mb-4">
      <pov-author :author="author" />
    </div>
  </ul>
</template>
