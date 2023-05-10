<template>

<div>
  <div class="zoomable tile is ancestor box has-text-centered pt-4 mb-0">
    <div class="tile is-12 is-vertical">
      <div class="tile">

        <div class="tile is-3"></div>

        <div class="tile is-6">
          <figure @click="hasClicked = true" class="previewImage image is-128x128 is-inline-block  is-outlined">
            <img :src="getImageUrl(stageObject.stage)" >
          </figure>
        </div>

        <div class="tile is-3">
          <p v-if="levelScore == 500" class="badgeOr mdi mdi-crown-circle is-size-1 pl-4 pt-5"></p>
          <p v-if="(levelScore > 349) && (levelScore < 500)" class="badgeArgent mdi mdi-crown-circle is-size-1 pl-4 pt-5"></p>
          <p v-if="(levelScore > 249) && (levelScore < 350)" class="badgeBronze mdi mdi-crown-circle is-size-1 pl-4 pt-5"></p>
        </div>

       <!--  <div class="tile is-vertical is-parent is-4 p-0">

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
              Défi {{ stageObject.subStage[i-1] }}
            </RouterLink>
            
            <RouterLink
              v-else
              class="button is-primary is-small is-success mt-2 is-centered"
              :to="`${stageObject.id[i-1]}`"
            >
              Rejouer
            </RouterLink>

            <div v-else  class="button is-primary is-small is-success mt-2 is-centered">
              <p class="is-size-7 has-text--success-light is-inline">Défi {{ stageObject.subStage[i-1] }}</p>
              <i v-if="parameters.progression[stageObject.index[i-1]].score == 100" class="mdi mdi-star-check is-large is-size-6 has-text--success-light pl-2"></i>
            </div>
          </div> 

        </div>-->
      </div>

      <div class="tile is-parent">
        <div class="tile">
          <p class="container is-size-5">{{ stageObject.type }}</p>
        </div>
      </div>            
      
      <RouterLink
        v-if="!parameters.progression[stageObject.index[0]].completed"
        class="button is-primary is-small is-warning mt-2 is-centered is-size-6"
        :to="`${stageObject.id[0]}`"
      >
        <strong>Lancer le défi</strong>
      </RouterLink>
      
      <RouterLink
        v-else
        class="button is-primary is-small is-success mt-2 is-centered is-size-6"
        :to="`${stageObject.id[0]}`"
      >
        Rejouer à {{ stageObject.type }}
      </RouterLink>

      <div class="tile is-parent">
        <div class="tile">
          <p v-if="levelScore > 0" class="container is-size-4">Score : {{ levelScore }} pts</p>
          <p v-else class="container is-size-4">Score : 0</p>
        </div>
      </div>
    </div>    

  </div> 

  <div class="diapo" @click="hasClicked = false" v-if="hasClicked">
    <div v-if="stageObject.orientation == 'h'">
      <img class="mt-6" :src="getImageWithScore(stageObject.stage,imageScore())" >
    </div>
    <div v-if="stageObject.orientation == 'v'">
      <img :src="getImageWithScore(stageObject.stage,imageScore())" >
    </div>


  </div>

</div>


</template>


<script setup>
//
// IMPORTS
//
  import { ref, computed } from 'vue'
  import { useStoreStages } from '@/stores/storeStages'
  import { useStoreParameters } from '@/stores/storeParameters'
  import { storeToRefs } from 'pinia'

//
// STORES
//  
  const storeStages = useStoreStages()
  const storeParameters = useStoreParameters()

//
// REFS
//
  const { parameters } = storeToRefs(storeParameters)
  const { stages } = storeToRefs(storeStages)
  const progressionPosition = ref(null)
  const hasClicked = ref(false)

//
// SCORE
//
  const levelScore = computed(() => {
    let score = 0
    let startIndex = props.stageObject.index[0]
    let endIndex = props.stageObject.index[0]+props.stageObject.index.length
    for (let i = startIndex; i < endIndex; i++) {
      score += parameters.value.progression[i].score      
    }
    console.log(props.stageObject);
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

  const getImageWithScore = (folder,file) => {
      return new URL(`../../assets/images/${folder}/${file}.jpg`, import.meta.url).href
  }

  const imageScore = () => {
    let imgScore
      if (levelScore.value < 50) {
        imgScore = '0'
      }
      if (levelScore.value >= 50) {
        imgScore = '50'
      }
      if (levelScore.value >= 150) {
        imgScore = '100'
      }
      if (levelScore.value >= 250) {
        imgScore = '150'
      }
      if (levelScore.value >= 350) {
        imgScore = '200'
      }
      if (levelScore.value >= 400) {
        imgScore = '250'
      }
      console.log('imgScore',imgScore);
      console.log('levelScore',levelScore.value);
      return imgScore
  }

</script>

<style>
  .diapo {
    z-index: 10;
    position: absolute;
    top: 10px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center; 
    cursor: pointer;   
  }
  .zoomable:hover {
    transform: scale(1.03);
  }
  .badgeOr {
    color: gold
  }
  .badgeArgent {
    color: silver
  }
  .badgeBronze {
    color: #CD7F32
  }
  .previewImage {
    border: 1px solid rgb(0, 0, 0);
  }
</style>