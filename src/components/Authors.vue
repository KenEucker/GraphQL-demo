<script setup lang="ts">
  import { computed } from 'vue'
  import { useQuery } from '@vue/apollo-composable'
  import { gql } from '@apollo/client/core'

  // Call the gql function with the GraphQL query
  const query = gql`
    query allAuthors {
      authors {
        id
        firstName
        lastName
      }
    }
  `

  const { result, loading, error } = useQuery(query)
  const list = computed(() => result.value?.authors ?? [])
</script>
<template>
  <div v-if="loading">Loading query...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <ul>
      <li v-for="author in list">{{ author.firstName }}</li>
    </ul>
  </div>
</template>