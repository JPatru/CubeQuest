<template>

  <div
    class="columns"
    v-for="i in stagesArray.length"
    :key="i"
  >
    <LevelTile 
      v-for="stageObject in stagesArray[i-1]"
      :key="stageObject.stage"
      :stageObject="stageObject"
      class="column"
    />

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

    let tempArraysubstage = []
    let tempArrayId = []
    let tempIndex = []
    for (let i = 0; i < tempArrayStage.length; i++) {
      tempArraysubstage[i] = []   
      tempArrayId[i] = []      
      tempIndex[i] = []    
    }

    for (let i = 0; i < tempArrayStage.length; i++) {
      for (let j = 0; j < stages.value.length; j++) {
        if (stages.value[j].stage === tempArrayStage[i]) {
          tempArraysubstage[i].push(stages.value[j].subStage)
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
        subStage: tempArraysubstage[i],
        type: tempArrayType[i],
        index: tempIndex[i]
      }
      stagesArrayTemp.push(stageObject)
    }
    console.log(stagesArrayTemp);

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

console.log(stagesArray.value);

  })

//
// REFS
//
  const id = ref(1)

</script>

<style>
</style>