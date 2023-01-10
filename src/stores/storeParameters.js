import { defineStore } from 'pinia'
import { collection, doc, setDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase/index.js'
import { useStoreAuth } from '@/stores/storeAuth'
import { useStoreStages } from '@/stores/storeStages'


export const useStoreParameters = defineStore('storeParameters', {
  state: () => {
    return {
      id:'',
      progression: [
        {
          nomNiveau: 'stage1niveau1',
          score: 100,
          terminé: true,
          tableProgression:[]
        }
      ]
    }
  },
  actions: {
    init () {
      const storeAuth = useStoreAuth()
      const storeStages = useStoreStages()
      this.id = storeAuth.user.id
      for (let i = 0; i < array.length; i++) {
        
      }
      // ParametersDocRef = doc(db, 'parameters', this.id)
      // this.getParameters()
    },    
  }
})