import { defineStore } from 'pinia'
import { collection, doc, setDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase/index.js'
import { useStoreAuth } from '@/stores/storeAuth'
import { useStoreStages } from '@/stores/storeStages'

let ParametersDocRef
let getParametersSnapshot = null

export const useStoreParameters = defineStore('storeParameters', {
  state: () => {
    return {
      id:'',
      parameters: {
        progression: []
      }
    }
  },
  actions: {
    init () {
      const storeAuth = useStoreAuth()
      this.id = storeAuth.user.id
      ParametersDocRef = doc(db, 'parameters', this.id)
      this.getParameters()
    },
    async initParameters(id) {

      const storeStages = useStoreStages()
      let NewProgression = []
      for (let j = 0; j < storeStages.stages.length; j++) {
        NewProgression[j] = {
          id: storeStages.stages[j].id,
          score: 0,
          completed: false
        }
      }
      this.parameters.progression = NewProgression

      await setDoc(doc(db, "parameters", id), {
        progression: this.parameters.progression
      })

    },
    getParameters() {
      if (getParametersSnapshot) getParametersSnapshot() // fermer le listener actif

      getParametersSnapshot = onSnapshot(ParametersDocRef, (doc) => {
        this.parameters = doc.data()
      })
    },
    async updateProgression() {      
      await updateDoc( doc(collection(db, 'parameters'), this.id), {
        progression: this.progression
      })
    }
  }
})