<script setup lang="ts">
import PovAuthor from '../components/author/PovAuthor.vue'
import { ref, computed } from 'vue'
import { useAuthorState } from '../store/state'
import { Author } from '../schema/generated/types.d'
import { useRouter } from 'vue-router'

const authorState = useAuthorState()
const router = useRouter()
const emailRef = ref()
const handleRef = ref()
const nameRef = ref()
const linkRef = ref()
const birthdayRef = ref()
const locationRef = ref()
const bioRef = ref()
const avatarRef = ref()

if (authorState.isLoggedIn && !authorState.isAuthorSignedUp) {
  router.push('/')
}

const fields = computed(() => [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    value: authorState.getAuthor.email,
    required: true,
    placeholder: 'email',
    ref: emailRef,
    fullWidth: true,
  },
  {
    name: 'handle',
    label: '@handle',
    readonly: true,
    prefix: '@',
    value: authorState.getAuthor.handle,
    placeholder: 'handle',
    ref: handleRef,
  },
  {
    name: 'name',
    label: 'Display Name',
    value: authorState.getAuthor.name,
    placeholder: 'name',
    ref: nameRef,
  },
  {
    name: 'location',
    label: 'Location',
    value: authorState.getAuthor.location,
    placeholder: 'location',
    ref: locationRef,
  },
  {
    name: 'birthday',
    type: 'date',
    label: 'Birthday',
    value: authorState.getAuthor.birthday,
    placeholder: 'birthday',
    ref: birthdayRef,
  },
  {
    name: 'link',
    label: 'Website',
    value: authorState.getAuthor.link,
    placeholder: 'website',
    fullWidth: true,
    ref: linkRef,
  },
  {
    name: 'bio',
    label: 'Biography',
    type: 'textarea',
    value: authorState.getAuthor.bio,
    placeholder: 'bio',
    ref: bioRef,
    fullWidth: true,
  },
])

const setValueIfChanged = (reference: any, original: any) => {
  if (reference.value?.length) {
    if (reference.value[0].value && reference.value[0].value !== original) {
      return reference.value[0].value
    }
  }
  return undefined
}

function saveFields(e: Event) {
  e.preventDefault()

  const authorFieldsToUpdate = {
    avatar: setValueIfChanged(avatarRef, authorState.getAuthor.avatar),
    name: setValueIfChanged(nameRef, authorState.getAuthor.name),
    link: setValueIfChanged(linkRef, authorState.getAuthor.link),
    birthday: setValueIfChanged(birthdayRef, authorState.getAuthor.birthday),
    location: setValueIfChanged(locationRef, authorState.getAuthor.location),
    bio: setValueIfChanged(bioRef, authorState.getAuthor.bio),
    email: setValueIfChanged(emailRef, authorState.getAuthor.email),
  }

  authorState.updateAuthor(authorFieldsToUpdate as Author)
}
</script>

<template>
  <div>
    <section
      class="max-w-4xl p-6 mx-auto rounded-md shadow-md mx-auto dark:bg-gray-800 mt-20"
      :style="{ background: `url(${authorState.getAuthor.banner}) no-repeat right` }"
    >
      <pov-author :author="authorState.getAuthor" size="large" :go-to-author-page="false" />
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
              :value="field.value"
            />
            <span v-if="field.prefix" class="absolute inset-y-10 left-0 flex pl-[1%]">{{
              field.prefix
            }}</span>
          </div>
        </div>

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
  </div>
</template>
