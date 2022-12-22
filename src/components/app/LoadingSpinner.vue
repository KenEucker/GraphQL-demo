<script setup lang="ts">
import { faker } from '@faker-js/faker'
</script>

<template>
  <div class="w-full min-h-screen flex justify-center items-center">
    <div class="absolute flex w-full text-xl justify-center top-1/2">
      {{ faker.hacker.phrase() }}
    </div>
    <div class="p-10 rounded-xl relative">
      <div class="w-full min-h-screen flex justify-center items-center">
        <div class="flex min-h-screen w-full mt-1/2 justify-center">
          <div
            class="flex h-50 w-50 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin"
          >
            <div class="h-40 w-40 rounded-full bg-ll-base dark:bg-ld-base"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
