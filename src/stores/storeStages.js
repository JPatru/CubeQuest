import { defineStore } from 'pinia'

export const useStoreStages = defineStore('storeStages', {
  state: () => {
    return {
      stages: [
        {
          id: 'stage1',
          png: [,,,,,,
                ,,,,,,
                ,,,,,,],
          questions: [],
          reponses: []
        },
        {
          id: 'stage2',
        },
        {
          id: 'stage3',
        },
        { 
          id: 'stage4',
        }
      ],
    }
  },
  actions: {
    
  },
  getters: {
    
  }
})