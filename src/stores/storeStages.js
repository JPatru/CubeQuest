import { defineStore } from 'pinia'

export const useStoreStages = defineStore('storeStages', {
  state: () => {
    return {
      stages: [
        {
          id: 'stage1',
          title: 'Niveau 1',
          png: [,,,,,,
                ,,,,,,
                ,,,,,,],
          questions: [],
          reponses: []
        },
        {
          id: 'stage2',
          title: 'Niveau 2',
        },
        {
          id: 'stage3',
          title: 'Niveau 3',
        },
        { 
          id: 'stage4',
          title: 'Niveau 4',
        }
      ],
    }
  },
  actions: {
    
  },
  getters: {
    
  }
})