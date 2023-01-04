<template>
  <div
    class="playground container card content has-text-centered p-6"
    @mouseout="resetTable"
  >
    <h1 class="is-1 has-text-centered is-family-monospace">{{ stages[stageIndex].title }}</h1>
    <div v-for="i in 7" :key="i" class="columns is-inline-block is-mobile is-centered has-text-centered is-gapless">
      <div v-for="j in 3" :key="j" class="column ">
        
        <div class="case has-text-centered">
          <figure
            class="image is-96x96 is-inline-block m-0"
            @click="play(j-1,i-1)"
            @mouseenter="inFigure(j-1,i-1)"
            @mouseout="outFigure(j-1,i-1)"
          >
            <img v-if="isOverTable[(i-1+(j-1)*7)] == 0" :src="getImageUrl('unrevealed.png')" >
            <img v-if="isOverTable[(i-1+(j-1)*7)] == 1" :src="getImageUrl('unrevealedHover.png')" >
            <img v-if="isOverTable[(i-1+(j-1)*7)] == 2" :src="getImageUrl('revealed.png')" >
          </figure>
        </div>

      </div>
    </div>  
  </div>

    
</template>

<script setup>
//
// IMPORTS
//
//
  import { useStoreStages } from '@/stores/storeStages'
  import { storeToRefs } from 'pinia'
  import { ref, onBeforeMount } from 'vue'
  import { useRoute } from 'vue-router'

//
// STORES
//
  
  const storeStages = useStoreStages()

//
// REFS
//
  const { stages } = storeToRefs(storeStages)
  const isOverTable = ref([])
  const stage = ref()
  const stageIndex = ref()

//
// ROUTER
//
  const route = useRoute()

//
// PLAY
//
  const play = (col, raw) => {
    let position = raw + col*7
    isOverTable.value[position] = 2
  }

  const getImageUrl = (picName) => {
      return new URL(`../assets/images/${stage.value}/${picName}`, import.meta.url).href
  }

//
// ONMOUNTED
//
  onBeforeMount(() => {
    resetTable()
    stage.value = route.params.id
    for (let i = 0; i < stages.value.length; i++) {
      if (stage.value === stages.value[i].id) {
        stageIndex.value = i
      }   
    }   
      console.log(stageIndex.value);
  })

//
// MOUSEOVER
//
const inFigure = (col, raw) => {
    let position = raw + col*7
    if (isOverTable.value[position] !== 2) {
      isOverTable.value[position] = 1
    }
  }

  const outFigure = (col, raw) => {
    let position = raw + col*7
    if (isOverTable.value[position] !== 2) {
      isOverTable.value[position] = 0
    }
  }

  const resetTable = () => {
    for (let i = 0; i < 21; i++) {
      if (isOverTable.value[i] !== 2) {
        isOverTable.value[i] = 0
      }
    }
  }

</script>

<style>
  .image {
    cursor: pointer;
  }
  .playground {
    padding: 0px;
    height: 500px;
    width: 950px;
  }
  .case {
    height: 96px;
    margin: 5px 3px 5px 3px;
  }
</style>