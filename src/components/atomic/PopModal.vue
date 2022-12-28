<script setup lang="ts">
import { useMenuState } from '../../store/state'
const menuStore = useMenuState()
</script>
<template>
  <div class="z-1000">
    <transition name="fade" appear>
      <div
        v-show="menuStore.isSignupOpen"
        class="absolute top-0 bottom-0 left-0 right-0 cursor-pointer bg-slate-600 z-998"
        @click="menuStore.closeSignup()"
      ></div>
    </transition>
    <transition name="pop" appear>
      <div
        v-show="menuStore.isSignupOpen"
        class="absolute top-0 bottom-0 left-0 right-0 p-2 m-auto text-center bg-white shadow-lg opacity-100 w-[90%] md:w-1/2 rounded-xl border-1 z-999 h-2/3 md:h-2/3 transform-scale-1 transform-translate-y-0 h-140"
        role="dialog"
      >
        <slot clas="z-1000"></slot>
      </div>
    </transition>
  </div>
</template>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
