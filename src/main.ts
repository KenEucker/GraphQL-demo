import './style.scss'
import { createApp } from 'vue'
import App from './App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './store'
import { MotionPlugin } from '@vueuse/motion'

createApp(App)
    .provide(DefaultApolloClient, apolloClient)
    .use(MotionPlugin)
    .mount('#app')
