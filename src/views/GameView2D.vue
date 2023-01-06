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

    <div v-if="playCard" class="question card">
      <header class="card-header">
        <p class="card-header-title has-text-centered">
          Question :
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <div v-for="i in stages[stageIndex].questions[questionCall].length" :key="i">

            <!-- Si question est du texte -->
            <p
              v-if="stages[stageIndex].questions[questionCall][i-1][0] === 't'"
              class="is-size-4"
            >
              {{ stages[stageIndex].questions[randomQuestions[questionCall]][i-1][1] }}
            </p>
            <!-- Si question est du latex -->
            <math-jax v-if="stages[stageIndex].questions[questionCall][i-1][0] === 'e'" :latex="`${ stages[stageIndex].questions[randomQuestions[questionCall]][i-1][1] }`" />
            
          </div>


        </div>
      </div>
      <footer class="card-footer">

        <!-- Si réponse est du texte -->
        <p
          v-if="randomAnswers[0][0] === 't'"
          @click="clickAnswer(0)"
          class="reponse card-footer-item m-0"
        >
          {{ randomAnswers[0][1] }}
        </p>
        <p
          v-if="randomAnswers[1][0] === 't'"
          @click="clickAnswer(1)"
          class="reponse card-footer-item m-0"
        >
          {{ randomAnswers[1][1] }}
        </p>
        <!-- Si réponse est du latex -->
        <math-jax v-if="randomAnswers[0][0] === 'e'" @click="clickAnswer(0)" class="reponse card-footer-item" :latex="`${ randomAnswers[0][1] }`" />
        <math-jax v-if="randomAnswers[1][0] === 'e'" @click="clickAnswer(1)" class="reponse card-footer-item" :latex="`${ randomAnswers[1][1] }`" />
      </footer>
    </div>

    <div>
      
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
  import { ref, onBeforeMount, computed } from 'vue'
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
  const playCard = ref(false)
  const randomQuestions = ref([])
  const randomAnswers = ref(null)
  const questionCall = ref(0)
  const goodAnswer = ref(null)
  const colRaw = ref([])

//
// ROUTER
//
  const route = useRoute()

//
// PLAY
//
  const randomizeQuestions = () => {
    for (let i = 0; i < stages.value[stageIndex.value].questions.length; i++) {
      let randRank = Math.floor(Math.random()*stages.value[stageIndex.value].questions.length)
      while (randomQuestions.value.includes(randRank)) { 
        randRank = Math.floor(Math.random()*stages.value[stageIndex.value].questions.length)
      }
      randomQuestions.value.push(randRank)
    }
  }

  const randomizeAnswers = () => {
    goodAnswer.value = Math.floor(Math.random()*2)
    if (goodAnswer.value === 0) {
      randomAnswers.value = [
        stages.value[stageIndex.value].vrai[randomQuestions.value[questionCall.value]],
        stages.value[stageIndex.value].faux[randomQuestions.value[questionCall.value]]
      ]
    } else {      
      randomAnswers.value = [
        stages.value[stageIndex.value].faux[randomQuestions.value[questionCall.value]],
        stages.value[stageIndex.value].vrai[randomQuestions.value[questionCall.value]]
      ]
    }
  }

  const play = (col, raw) => {
    let position = raw + col*7
    if (isOverTable.value[position] !== 2) {
      playCard.value = true
      colRaw.value[0] = col
      colRaw.value[1] = raw
    }

  }

  const clickAnswer = (answer,col,raw) => {
    playCard.value = false
    if (answer === goodAnswer.value) {
      win(colRaw.value[0],colRaw.value[1])
    } else {
      loose()
    }
    questionCall.value++
    randomizeAnswers()
  }

  const loose = (col, raw) => {
    console.log('perdu')
  }

  const win = (col, raw) => {
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
    randomizeQuestions()
    randomizeAnswers()
    for (let i = 0; i < stages.value[stageIndex.value].questions.length; i++) {
      console.log(stages.value[stageIndex.value].questions[i].length)
      
    }
    
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
  /* .image:hover {
    transform: scale(1.15);
    z-index: 1;
  } */
  .question {
    position: absolute;
    width: 550px;
    top: 180px;
    left: 200px;
    font-size: 1.2em;
  }
  .reponse {
    cursor: pointer;
    font-size: 1.2em;
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