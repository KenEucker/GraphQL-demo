<script setup lang="ts">
  import { useQuery } from '@vue/apollo-composable'
  import { gql } from '@apollo/client/core'

  const { loading, result, error } = useQuery(gql`
    query Users {
      users {
        id
        name
        age
      }
    }
  `)
</script>
<template>
  <div v-if="loading">Loading query...</div>
  <div v-else>
    <ul>
      <li v-for="user in result.users">{{ user.name }}</li>
    </ul>
  </div>
</template>