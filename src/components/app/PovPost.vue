<script setup lang="ts">
import Shares from 'vue-ionicons/dist/md-sync.vue'
import Heart from 'vue-ionicons/dist/md-heart.vue'
import HeartEmpty from 'vue-ionicons/dist/md-heart-empty.vue'
import MoreIcon from 'vue-ionicons/dist/md-more.vue'
import Points from 'vue-ionicons/dist/md-bonfire.vue'
import Share from 'vue-ionicons/dist/md-share.vue'
import PopButton from './PopButton.vue'
import PovAuthor from './PovAuthor.vue'
import PovPostMedia from './PovPostMedia.vue'

const extractHashtags = (str: string) => {
  var rgx = /#(\w+)\b/gi
  var result = []
  var temp
  while ((temp = rgx.exec(str))) {
    result.push(temp[1])
  }
  return result
}

const props = defineProps({
  post: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
})

const emit = defineEmits(['iLikeIt', 'iLoveIt', 'iWantSomeMoreOfIt'])

const generateText = () => {
  return props.post?.text?.replace(
    /#(\S*)/g,
    '<a class="text-ll-primary" href="/search/$1">#$1</a>'
  )
}
</script>

<template>
  <div class="w-full p-5 bg-ll-neutral dark:bg-ld-neutral rounded-md flex flex-col mb-4">
    <div class="flex justify-between">
      <pov-author :author="props.post?.author" />
      <button class="active:scale-95 transform transition-transform relative">
        <more-icon h="30" w="30" class="absolute top-0 right-0" />
      </button>
    </div>
    <p class="mt-2 m-auto -mb-3 flex justify-between text-gray-500 text-xs">
      {{ props.post.title }}
    </p>

    <p :class="props.post?.text ? ' my-4 text-xl' : ''">{{ generateText() }}</p>
    <pov-post-media :media="props.post?.media" />
    <div class="flex justify-between pt-4 border-t border-ll-border dark:border-ld-border mt-4">
      <pop-button variant="red">
        <points
          w="25"
          h="25"
          :class="props.post.iLikeIt ? 'text-yellow-600' : ''"
          @click="emit('iLikeIt')"
        /><span class="ml-1">{{ props.post?.interactions ?? 0 }}</span>
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
        ><span v-else class="align-middle" @click="emit('iLoveIt')">
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
</template>
