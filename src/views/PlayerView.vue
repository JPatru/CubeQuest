<template>
  <div>
    Player
  </div>
  <div
    class="button is-danger"
    @click="resetProgression()"
  >
    Réinitialiser la progression
  </div>
</template>

<script setup>

//
// IMPORTS
//

  import { ref } from 'vue'
  import { useStoreParameters } from '@/stores/storeParameters'
  import { storeToRefs } from 'pinia'

//
// STORE
//
  const storeParameters = useStoreParameters()

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
    }
  }

</script>