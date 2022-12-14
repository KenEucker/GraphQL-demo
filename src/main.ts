import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './store'

createApp(App).provide(DefaultApolloClient, apolloClient).mount('#app')
