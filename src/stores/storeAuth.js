import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser } from 'firebase/auth'
import { auth } from '@/firebase/index.js'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.user.alias = user.email
          this.router.push('/levelSelection')
        } else {
          this.user = {}
          this.router.push('/')
        }
      })
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user
      }).catch((error) => {
        console.log('message d\'erreur : ', error.message)
      })
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user
      }).catch((error) => {
        console.log(error.message)
      })
    },
    logoutUser() {
      signOut(auth).then(() => {
        // console.log('utilisateur déconnecté')
      }).catch((error) => {
        console.log(error.message)
      })
    },
    deleteAccount() {
      const user = auth.currentUser
      const idToDelete = user.uid
      deleteUser(user).then(() => {
      }).catch((error) => {
        console.log('error message: ',error.message)
      })
    }
  }
})