<template>
<div class="mb-6 is-size-5">
  compte : {{ storeAuth.user.alias }}
</div>
<div class="columns">  
  <div
    class="button is-normal column is-primary pb-6 m-3 is-size-5"
  >
    Enregistrer la progression
  </div>

  <RouterLink
    class="button is-large column is-warning pb-6 m-3  is-size-5"
    to="/levelSelection"
    @click="resetProgression()"
  >
    Réinitialiser la progression
  </RouterLink>

  <div
    class="button is-large column is-danger pb-6 m-3  is-size-5"
  >
    Supprimer mon compte
  </div>
</div>
</template>

<script setup>

//
// IMPORTS
//

  import { ref } from 'vue'
  import { useStoreParameters } from '@/stores/storeParameters'
  import { useStoreAuth } from '@/stores/storeAuth'
  import { storeToRefs } from 'pinia'

//
// STORE
//
  const storeParameters = useStoreParameters()
  const storeAuth = useStoreAuth()

//
// REFS
//
  const { parameters } = storeToRefs(storeParameters)

//
// RESET
//

  const resetProgression = () => {
    for (let i = 0; i < parameters.value.progression.length; i++) {
      parameters.value.progression[i].completed = false
      parameters.value.progression[i].score = 0
      storeParameters.updateProgression()
      storeParameters.gotIt()
    }
  }

</script>