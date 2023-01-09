<template>
  <div
    class="playground container card content has-text-centered p-6"
    @mouseout="resetTable"
  > 
    <header class="card-header columns">
      <p class="column is-half">
        {{ stages[stageIndex].stage }} / Niveau {{ stages[stageIndex].subStage }}
      </p>
      <p class="column is-half">
        score : {{ score }}
      </p>
    </header>
    
    <div v-for="i in 9" :key="i" class="columns is-inline-block is-mobile is-centered has-text-centered is-gapless">
      <div v-for="j in 3" :key="j" class="column ">
        
        <div class="case has-text-centered">
          <figure
            class="image is-96x96 is-inline-block m-0"
            @click="play(j-1,i-1)"
            @mouseenter="inFigure(j-1,i-1)"
            @mouseout="outFigure(j-1,i-1)"
          >
            <img v-if="isOverTable[(i-1+(j-1)*9)] == 0" :src="getImageUrl('unrevealed.png')" >
            <img v-if="isOverTable[(i-1+(j-1)*9)] == 1" :src="getImageUrl('unrevealedHover.png')" >
            <img v-if="isOverTable[(i-1+(j-1)*9)] == 2" :src="getImageUrl(imgFile[(i-1+(j-1)*9)])" 
            >
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

        <div v-for="i in question.length" :key="i" class="content m-0 is-inline">

          <!-- Si question est du texte -->
          <div
            v-if="question[i-1][0] === 't'"
            class="is-inline is-size-4"
          >
            {{ question[i-1][1] }}
          </div>
      
          <!-- Si question est du latex -->
          <div v-if="question[i-1][0] === 'e'" class="is-inline is-size-4">
            <math-jax :latex="`${ question[i-1][1] }`" />
          </div> 

          <!-- Si question est un tableau  -->
          <div v-if="question[i-1][0][0] === ('tabh'||'tabb')">
            <table class="table is-striped">
              <thead>                
                <tr>
                  <template v-for="j in question[i-1][0].length-1" :key="j">
                    <th v-if="question[i-1][0][0] === 'tabh'">
                      <math-jax v-if="question[i-1][0][j][0] === 'e'" :latex="`${ question[i-1][0][j][1] }`" />
                    </th>
                  </template>
                </tr>              
              </thead>
              <tbody>                
                <tr v-for="k in question[i-1].length-1" :key="k">
                  <template v-for="j in question[i-1][k].length-1" :key="j">
                    <td v-if="question[i-1][1][0] === 'tabb'">
                      <math-jax v-if="question[i-1][k][j][0] === 'e'" :latex="`${ question[i-1][k][j][1] }`" />
                    </td>          
                  </template>                         
                </tr>
              </tbody>
            </table>
        
          </div>

          <!-- Si question est une image -->
          <div v-if="question[i-1][0] === 'im'" class="">
            <img :src="getImageQuestion(question[i-1][1])" >
          </div> 

          
        </div>

      </div>
      <footer class="card-footer">

          <div @click="clickAnswer(0)" class="reponse card-footer-item m-0 is-size-5 is-inline">

            <div v-for="i in randomAnswers[0].length" :key="i" class="content m-0 is-inline">
              <!-- Si réponse est du texte -->
              <div v-if="randomAnswers[0][i-1][0] === 't'" class="is-inline is-size-5">
                {{ randomAnswers[0][i-1][1] }}
              </div>
              <!-- Si réponse est du latex -->
              <math-jax v-if="randomAnswers[0][i-1][0] === 'e'" :latex="`${ randomAnswers[0][i-1][1] }`" />

            </div> 

          </div>

          <div @click="clickAnswer(1)" class="reponse card-footer-item m-0 is-size-5 is-inline">

            <div v-for="i in randomAnswers[1].length" :key="i" class="content m-0 is-inline">
              <!-- Si réponse est du texte -->
              <div v-if="randomAnswers[1][i-1][0] === 't'" class="is-inline is-size-5">
                {{ randomAnswers[1][i-1][1] }}
              </div>
              <!-- Si réponse est du latex -->
              <math-jax v-if="randomAnswers[1][i-1][0] === 'e'" :latex="`${ randomAnswers[1][i-1][1] }`" />

            </div>
          </div>

      </footer>
    </div>

    <div>
      <progress class="progress is-info" :value="progress" max="100">30%</progress>
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
  const score = ref(100)
  const progress = ref(0)
  const question = ref([])
  const imgFile = ref([])

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
    let position = raw + col*9
    if (isOverTable.value[position] !== 2) {
      playCard.value = true
      colRaw.value[0] = col
      colRaw.value[1] = raw
    }
    question.value = stages.value[stageIndex.value].questions[randomQuestions.value[questionCall.value]]
    console.log('stageIndex',stageIndex.value);
    console.log('randomQuestions',randomQuestions.value);
    console.log('questionCall',questionCall.value);
    console.log('question',question.value)

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
    score.value-=5
  }

  const win = (col, raw) => {
    let position = raw + col*9
    isOverTable.value[position] = 2
    progress.value+=100/27
  }

  const getImageUrl = (picName) => {
      return new URL(`../assets/images/${stages.value[stageIndex.value].stage}/${stages.value[stageIndex.value].subStage}/${picName}`, import.meta.url).href
  }

const getImageQuestion = (picName) => {
    return new URL(`../assets/images/questions/${picName}`, import.meta.url).href
}

//
// ONMOUNTED
//
  onBeforeMount(() => {
    resetTable()
    stage.value = route.params.id
    for (let i = 0; i < stages.value.length; i++) {
        console.log(stage.value,stages.value[i].id)
      if (stage.value === stages.value[i].id) {
        stageIndex.value = i
        console.log(stage.value)
      }   
    }   
    randomizeQuestions()
    randomizeAnswers()
    for (let i = 0; i < 27; i++) {
      imgFile.value[i] = `${i}`+'.png'      
    }
    console.log(randomAnswers.value);
    
  })

//
// MOUSEOVER
//
const inFigure = (col, raw) => {
    let position = raw + col*9
    if (isOverTable.value[position] !== 2) {
      isOverTable.value[position] = 1
    }
  }

  const outFigure = (col, raw) => {
    let position = raw + col*9
    if (isOverTable.value[position] !== 2) {
      isOverTable.value[position] = 0
    }
  }

  const resetTable = () => {
    for (let i = 0; i < 27; i++) {
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
    left: 235px;
    font-size: 1.2em;
  }
  .reponse {
    cursor: pointer;
  }
  .playground {
    padding: 0px;
    height: 500px;
    width: 1020px;
  }
  .case {
    height: 96px;
    margin: 5px 3px 5px 3px;
  }
</style>