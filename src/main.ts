import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './store'

createApp(App).provide(DefaultApolloClient, apolloClient).mount('#app')
