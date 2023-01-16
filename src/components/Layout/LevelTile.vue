<template>

<div>
  <div class="tile is ancestor box has-text-centered pt-4">
    <div class="tile is-12 is-vertical">
      <div class="tile">

        <div class="tile is-1"></div>

        <div class="tile is-6">
          <figure @click="showFrame" class="image is-128x128 is-inline-block">
            <img :src="getImageUrl(stageObject.stage)" >
          </figure>
        </div>

        <div class="tile is-1"></div>

        <div class="tile is-vertical is-parent is-4 p-0">

          <div
            v-for="i in stageObject.subStage.length"
            :key="i"
            class="tile"
          >
            <RouterLink
              v-if="!parameters.progression[stageObject.index[i-1]].completed"
              class="button is-primary is-small is-warning mt-2 is-centered"
              :to="`${stageObject.id[i-1]}`"
            >
              Niv. {{ stageObject.subStage[i-1] }}
            </RouterLink>

            <div v-else  class="button is-primary is-small is-success mt-2 is-centered">
              <p class="is-size-7 has-text--success-light is-inline">Niv. {{ stageObject.subStage[i-1] }}</p>
              <i v-if="parameters.progression[stageObject.index[i-1]].score == 100" class="mdi mdi-star-check is-large is-size-6 has-text--success-light pl-2"></i>
            </div>
          </div>

        </div>
      </div>

      <div class="tile is-parent">
        <div class="tile">
          <p class="container is-size-5">{{ stageObject.type }}</p>
        </div>
      </div>

      <div class="tile is-parent">
        <div class="tile">
          <p v-if="levelScore > 0" class="container is-size-3">{{ levelScore }} / {{ 100 * stageObject.index.length }}</p>
          <p v-else class="container is-size-3 mdi mdi-null"></p>
        </div>
      </div>
    </div>

    

  </div> 
</div>



</template>


<script setup>
//
// IMPORTS
//
  import { ref, computed } from 'vue'
  import { useStoreParameters } from '@/stores/storeParameters'
  import { storeToRefs } from 'pinia'

//
// STORES
//  
  const storeParameters = useStoreParameters()

//
// REFS
//
  const { parameters } = storeToRefs(storeParameters)
  const progressionPosition = ref(null)

//
// SCORE
//
  const levelScore = computed(() => {
    let score = 0
    let startIndex = props.stageObject.index[0]
    let endIndex = props.stageObject.index[0]+props.stageObject.index.length
    for (let i = startIndex; i < endIndex; i++) {
      console.log(score);
      score += parameters.value.progression[i].score      
    }
    return score
  })

//
// PROPS
//
  const props = defineProps({
    stageObject: {
      type: Object,
      required: true
    }
  })

//
// SHOWFRAME
//
  const showFrame = () => {
    console.log('tableau');
  }

  const getImageUrl = (folder) => {
      return new URL(`../../assets/images/${folder}/preview.png`, import.meta.url).href
  }





</script>