<template>
  <div
    class="playground"
    @mouseout="resetTable"
  >
    <div v-for="j in 3" :key="j" class="columns is-variable is-2 is-gapless board">
      <div v-for="i in 7" :key="i" class="column">
        
        <div class="has-text-centered">
          <figure
            class="image is-96x96 is-inline-block"
            @click="play(j-1,i-1)"
            @mouseenter="inFigure(j-1,i-1)"
            @mouseout="outFigure(j-1,i-1)"
          >
            <img v-if="isOverTable[(i-1+(j-1)*7)] == 0" src="@/assets/images/stage1/testHover.png" >
            <img v-if="isOverTable[(i-1+(j-1)*7)] == 1" src="@/assets/images/stage1/test.png" >
            <img v-if="isOverTable[(i-1+(j-1)*7)] == 2" src="@/assets/images/stage1/testYeah.png" >
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
  import { onMounted, ref, computed } from 'vue'
  import { useRoute } from 'vue-router'

//
// REFS
//
  const isOverTable = ref([])

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

//
// ONMOUNTED
//
  onMounted(() => {
    resetTable()
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
  .board {
    margin: auto;
    width: 720px;
    height: 80px;
  }
  .image {
    cursor: pointer;
  }
</style>