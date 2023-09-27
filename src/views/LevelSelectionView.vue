<template>

  <div v-if="parameters.freshProfile" class="card mt-6 has-background-warning">
    <header class="card-header ">
      <p class="card-header-title is-centered is-size-2">
        Instructions
      </p>
    </header>
    <div class="card-content">
      <div class="content has-text-justified is-size-4">        
        <p>Cube Quest est un quiz mathématique. Choisissez le thème du questionnaire et lancez-vous dans une série de 27 questions pour révéler l'image cachée.<br> Votre score est important ! Restez concentré(e). A chaque bonne réponse, vous gagnez des points, en enchaînant les bonnes réponses vous activez un combo qui augmente considérablement le score. Une mauvaise réponse ne fait pas perdre de points mais annule le combo et gare aux erreurs en chaîne... <br><br> Arriverez-vous à atteindre le score parfait de 500 points dans chaque défi ? <br> En cliquant sur la vignette de chaque défi, accédez à l'image cachée. Sa netteté dépend de votre score ! </p><p>Il est possible d'enregistrer votre progression en vous rendant dans Mon Compte. </p>
        <div class="has-text-centered">          
          <div @click="gotIt" class="button is-large is-primary is-success mt-2 is-inline has-text-centered">J'ai compris !</div>
        </div>
      </div>
    </div>
  </div>

<div v-if="!parameters.freshProfile" >  
  <div
    class="columns"
    v-for="i in stagesArray.length"
    :key="i"
  >
    <LevelTile 
      v-for="stageObject in stagesArray[i-1]"
      :key="stageObject.stage"
      :stageObject="stageObject"
      class="column is-one-third"
    />

  </div>
</div>

</template>

<script setup>
//
// IMPORTS
//
  import { ref, onBeforeMount } from 'vue'
  import LevelTile from '@/components/Layout/LevelTile.vue'
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
  const { stages } = storeToRefs(storeStages)
  const { parameters } = storeToRefs(storeParameters)

  const stagesArray = ref([])

//
// MOUNTED
//
  onBeforeMount(() => {
    let tempValue = stages.value[0].stage
    let tempType = stages.value[0].type
    let tempArrayStage = [tempValue]
    let tempArrayType = [tempType]
    let j = 1
    for (let i = 1; i < stages.value.length; i++) {
      if (stages.value[i].stage !== tempValue) {
        tempArrayStage[j] = stages.value[i].stage
        tempArrayType[j] = stages.value[i].type
        j++
      }      
      tempValue = stages.value[i].stage
    }

    let tempArrayOrientation = []
    let tempArrayId = []
    let tempIndex = []
    for (let i = 0; i < tempArrayStage.length; i++) {
      tempArrayOrientation[i] = []   
      tempArrayId[i] = []      
      tempIndex[i] = []    
    }

    for (let i = 0; i < tempArrayStage.length; i++) {
      for (let j = 0; j < stages.value.length; j++) {
        if (stages.value[j].stage === tempArrayStage[i]) {
          tempArrayOrientation[i].push(stages.value[j].orientation)
          tempArrayId[i].push(stages.value[j].id)
          tempIndex[i].push(j)
        }
      }
    }

    let stagesArrayTemp = []
    for (let i = 0; i < tempArrayStage.length; i++) {
      let stageObject = {
        stage: tempArrayStage[i],
        id: tempArrayId[i],
        orientation: tempArrayOrientation[i],
        type: tempArrayType[i],
        index: tempIndex[i]
      }
      stagesArrayTemp.push(stageObject)
    }

    let columnNumber = 3
    let rawNumber
    if (stagesArrayTemp.length%columnNumber === 0) {
      rawNumber = stagesArrayTemp.length/columnNumber
    } else {
      rawNumber = Math.floor(stagesArrayTemp.length/columnNumber)+1
    }

    for (let i = 0; i < rawNumber; i++) {
      stagesArray.value[i] = []
      for (let j = 0; j < columnNumber; j++) {
        if (stagesArrayTemp[j+columnNumber*i]) {
          stagesArray.value[i].push(stagesArrayTemp[j+columnNumber*i])
        }                 
      }      
    }
  })

//
// INFO PANEL
//
  const gotIt = () => {
    storeParameters.gotIt()
  }


//
// REFS
//
  const id = ref(1)

</script>

<style>
</style>