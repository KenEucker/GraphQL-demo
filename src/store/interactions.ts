import { apolloClient } from '.'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { useStorage } from '@vueuse/core'
import { Interaction } from '../schema/generated/types.d'

export const getInitialInteractionState = (): { interactions: Interaction[] } => ({
  interactions: [],
})

export const useInteractionState = defineStore({
  id: 'useInteractionState',
  state: getInitialInteractionState,
  getters: {
    getInteractions: (s) => s.interactions,
  },
  actions: {},
})
