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
        progression: [
          { id: 'stage1niveau1', completed: false, score: 0 },
          { id: 'stage1niveau2', completed: false, score: 0 },
          { id: 'stage1niveau3', completed: false, score: 0 },
          { id: 'stage2niveau1', completed: false, score: 0 },
          { id: 'stage2niveau2', completed: false, score: 0 }
        ]
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

      let newLevelsIds = []
      let docUpdated = []
      for (let i = 0; i < this.parameters.progression.length; i++) {
        newLevelsIds.push(this.parameters.progression[i].id)
      }

      getParametersSnapshot = onSnapshot(ParametersDocRef, (doc) => {
        // Ajout des nouveaux niveaux.
        for (let i = 0; i < this.parameters.progression.length; i++) {
          let idToDelete
          for (let j = 0; j < doc.data().progression.length; j++) {
            if (this.parameters.progression[i].id === doc.data().progression[j].id)
              idToDelete = this.parameters.progression[i].id
              newLevelsIds = newLevelsIds.filter(id => id !== idToDelete)
          }          
        };
        docUpdated = doc.data().progression
        for (let i = 0; i < newLevelsIds.length; i++) {
          docUpdated.push({
            id: newLevelsIds[i],
            completed: false,
            score: 0
          })   
        }

        this.parameters.progression = docUpdated
      })

    },
    async updateProgression() {      
      await updateDoc( doc(collection(db, 'parameters'), this.id), {
        progression: this.parameters.progression
      })
    }
  }
})