<script setup lang="ts">
  import { reactive } from 'vue'
  import { useQuery } from '@vue/apollo-composable'
  // import { useAllAuthorsQuery } from '../schema/graphql'
  import { gql } from '@apollo/client/core'

  const authors = reactive([])
  // const { loading, result, error } = useAllAuthorsQuery()
  const { loading } = useQuery(gql`
    query allAuthors {
      allAuthors {
        id
        firstName
        lastName
      }
    }
  `, authors)
</script>
<template>
  <div v-if="loading">Loading query...</div>
  <div v-else>
    <ul>
      <li v-for="author in authors">{{ author.firstName }}</li>
    </ul>
  </div>
</template>