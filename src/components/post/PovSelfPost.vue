<script setup lang="ts">
import Shares from 'vue-ionicons/dist/md-sync.vue'
import Heart from 'vue-ionicons/dist/md-heart.vue'
import HeartEmpty from 'vue-ionicons/dist/md-heart-empty.vue'
import Points from 'vue-ionicons/dist/md-bonfire.vue'
import Share from 'vue-ionicons/dist/md-share.vue'
import PopButton from '../atoms/PopButton.vue'
import PovPostMedia from './PovPostMedia.vue'

const props = defineProps({
  post: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
})
</script>

<template>
  <div class="w-full p-1 bg-ll-neutral dark:bg-ld-neutral rounded-md flex flex-col mb-4">
    <div class="grid grid-cols-2 grid-cols-[10%_90%] p-2 pb-4">
      <div class="row-span-3 col-span-1">
        <div class="col-span-1">
          <button type="button" class="text-white text-left items-center mt-3">
            <img
              :alt="`${post.author?.handle} profile photo`"
              class="rounded-full 100"
              :width="50"
              :height="50"
              :src="post.author?.avatar"
            />
          </button>
        </div>
      </div>
      <div class="row-span-1 col-span-1">
        <strong>{{ post.author?.name }} </strong>
        <span class="text-twitter-gray">{{ post.author?.handle }} · </span>
        <span class="text-twitter-gray">{{ post.title }}</span>
      </div>
      <pov-post-media v-if="post.media?.length" :media="post.media" />
      <div class="row-span-2 col-span-1">
        <div>
          <p>
            {{ post.text }}
          </p>
        </div>
      </div>
      <div class="flex justify-around mt-3 row col-span-2 w-[100%]">
        <pop-button variant="red">
          <points w="25" h="25" :class="props.post.iLikeIt ? 'text-yellow-600' : ''" /><span
            class="ml-1"
            >{{ props.post?.interactions ?? 0 }}</span
          >
        </pop-button>
        <pop-button variant="green">
          <shares w="25" h="25" :class="post.iWantSomeMoreOfIt ? 'text-yellow-600' : ''" /><span
            class="ml-1"
            >{{ props.post?.shares ?? 0 }}</span
          >
        </pop-button>
        <pop-button variant="purple">
          <span v-if="props.post.iLoveIt" class="ml-1 align-middle"
            ><heart w="25" h="25" class="text-amber-300 align-middle" />{{ props.post.likes }}</span
          ><span v-else class="align-middle">
            <heart-empty class="align-bottom mr-1" w="25" h="25" />{{ props.post.likes ?? 0 }}</span
          >
        </pop-button>
        <pop-button
          variant="blue"
          class="flex items-center active:scale-95 transform transition-transform"
        >
          <share w="25" h="25" />
        </pop-button>
      </div>
    </div>
  </div>
</template>
