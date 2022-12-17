<script setup lang="ts">
import { ref } from 'vue'
import {
  useMouse,
  useCounter,
  useDark, 
  useToggle,
  useFps,
} from '@vueuse/core'
import { UseNetwork } from '@vueuse/components'
import { useMotion } from '@vueuse/motion';

let counting = false

const isDark = useDark()
const toggleDark = useToggle(isDark)
const { x, y } = useMouse()
const { count, inc, dec } = useCounter()
const fps = useFps()
const countdown = ref<HTMLElement>()

const { apply } = useMotion(countdown, {
  initial: {
    opacity: 0,
    y: -100,
    'text-shadow': '0 0 1px rgba(0,0,0,0),'
  },
  enter: {
    opacity: 1,
    y: 0,
    'text-shadow': '0 0 10px rgba(0,200,0,1),',
  },
  glowing: {
    opacity: 1,
    y: 0,
    'text-shadow': '0 0 10px rgba(0,200,0,1),',
    transition: {
      duration: 250,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  }
})

const beginCountdown = () => {
  if (counting || !countdown.value) {
    return
  }

  countdown.value.innerHTML = '...'
  apply('glowing')
  counting = true

  const url = new URL('http://localhost:4000/graphql')
  
  url.searchParams.append(
    'query',
    `subscription Countdown($from: Int!) {
        countdown(from: $from)
      }`
  )
  url.searchParams.append('variables', JSON.stringify({ from: 100 }))
  
  const eventsource = new EventSource(url.toString(), {
    withCredentials: true // This is required for cookies
  })
  
  eventsource.onmessage = function (event) {
    const data = JSON.parse(event.data)
    const count = data.data.countdown

    if (!count || !countdown.value) {
      return
    }

    countdown.value.innerHTML = count
  }
}
</script>

<template>
  <div class="card">
    <h2>TestBed</h2>
    <h3>Mouse: {{x}} x {{y}}</h3>
    <button type="button" @click="beginCountdown()">count down</button>
    <span class="countdown" ref="countdown">100</span>
    <br />
    <br />
    <button type="button" @click="dec()">-</button>
    <span>count is {{ count }}</span>
    <button type="button" @click="inc()">+</button>
    <br />
    <br />
    <UseNetwork v-slot="{ isOnline, downlink, downlinkMax, effectiveType, type}">
      IsOnline: {{ isOnline }}
      <br />
      Speed: {{ downlinkMax ?? downlink }}
      <br />
      Connection: {{ type ?? effectiveType }}
      <br />
      FPS: {{ fps }}
    </UseNetwork>
    <br />
    <br />
    <button @click="toggleDark()">
      Enable {{ isDark ? 'Light' : 'Dark' }} Mode
    </button>
  </div>
</template>

<style scoped>
span {
  padding-left: 10px;
  padding-right: 10px;
}

.countdown {
  margin-left: 25px;
  font-size: 32px;
  text-align: right;
  vertical-align: middle;
}
</style>
