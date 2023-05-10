<template>
  <div
    class="playground container card content has-text-centered p-4"
    @mouseout="resetTable"
  > 
    <div v-if="stages[stageIndex].orientation == 'h'">
      <div class="notification columns is-link is-light">
        <p class="column is-one-third m-0 is-size-4">
          {{ stages[stageIndex].type }} 
        </p>
        <p class="column is-one-third  is-size-4 m-0">
          score : {{ score }}
        </p>
        <p v-if="combo <5" class="column is-one-third is-size-4"> combo : {{ combo }} </p>
        <p v-if="combo ===5" class="column is-one-third has-text-success has-text-weight-bold is-size-4"> enchaînement : {{ combo }} </p>
      </div>

      <div class="mt-6">
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
      </div>

    </div>


    <div v-if="stages[stageIndex].orientation == 'v'" class="columns">
      <div class="column is-half">
        <div class="notification is-link is-light">
          <p class="m-0 is-size-4">
            {{ stages[stageIndex].type }} <br>
            score : {{ score }} <br>
            <span v-if="combo <5"> combo : {{ combo }} </span>
            <span v-if="combo ===5" class="column has-text-success has-text-weight-bold"> combo : {{ combo }} </span>
          </p>      
        </div>
      </div>


      <div class="column is-half mt-0 mb-0">
        <div v-for="i in 3" :key="i" class="columns is-inline-block is-mobile is-centered has-text-centered is-gapless mb-0">
          <div v-for="j in 9" :key="j" class="column ">
            
            <div class="case has-text-centered">
              <figure
                class="image is-96x96 is-inline-block m-0"
                @click="play(j-1,i-1)"
                @mouseenter="inFigure(j-1,i-1)"
                @mouseout="outFigure(j-1,i-1)"
              >
                <img v-if="isOverTable[(i-1+(j-1)*3)] == 0" :src="getImageUrl('unrevealed.png')" >
                <img v-if="isOverTable[(i-1+(j-1)*3)] == 1" :src="getImageUrl('unrevealedHover.png')" >
                <img v-if="isOverTable[(i-1+(j-1)*3)] == 2" :src="getImageUrl(imgFile[(i-1+(j-1)*3)])" 
                >
              </figure>
            </div>

          </div>
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
      <footer v-if="!showCorrection" class="card-footer has-background-info-light">

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
      
      <!-- Affichage correction -->
      <div v-if="showCorrection">
        <header class="card-header has-background-primary">
          <p class="card-header-title has-text-centered">
            Correction :
          </p>
        </header>
        <div class="card-content has-background-primary">

          <div v-for="i in correction.length" :key="i" class="content m-0 is-inline">

            <!-- Si correction est du texte -->
            <div
              v-if="correction[i-1][0] === 't'"
              class="is-inline is-size-4"
            >
              {{ correction[i-1][1] }}
            </div>
        
            <!-- Si correction est du latex -->
            <div v-if="correction[i-1][0] === 'e'" class="is-inline is-size-4">
              <math-jax :latex="`${ correction[i-1][1] }`" />
            </div>

            <!-- Si correction est une image -->
            <div v-if="correction[i-1][0] === 'im'" class="">
              <img :src="getImageQuestion(correction[i-1][1])" >
            </div> 

            <!-- Si correction est un tableau -->
            <div v-if="correction[i-1][0][0] === ('tabh'||'tabb')">
              <table class="table is-striped">
                <thead>                
                  <tr>
                    <template v-for="j in correction[i-1][0].length-1" :key="j">
                      <th v-if="correction[i-1][0][0] === 'tabh'">
                        <math-jax v-if="correction[i-1][0][j][0] === 'e'" :latex="`${ correction[i-1][0][j][1] }`" />
                      </th>
                    </template>
                  </tr>              
                </thead>
                <tbody>                
                  <tr v-for="k in correction[i-1].length-1" :key="k">
                    <template v-for="j in correction[i-1][k].length-1" :key="j">
                      <td v-if="correction[i-1][1][0] === 'tabb'">
                        <math-jax v-if="correction[i-1][k][j][0] === 'e'" :latex="`${ correction[i-1][k][j][1] }`" />
                      </td>          
                    </template>                         
                  </tr>
                </tbody>
              </table>
          
            </div>
            
          </div>
        </div>
        <footer class="container has-text-centered has-background-primary">

          <div @click="hideCorrection()" class="button is-small has-background-warning m-2">
            C'est compris !
          </div>

        </footer>
      </div>

    </div>


    <!-- Affichage Fin de niveau -->

    <div v-if="endGame" class="question card">
      <header class="card-content has-text-centered">
        <p class="is-size-3">
          Niveau terminé !
        </p>
      </header>

      <div class="card-content">
        <p class="is-size-2">score : {{ score }}</p>
        
        <RouterLink
          @click="save(score)"
          class="button has-background-success m-2"
          to="/levelSelection"
        >
        Retour au menu
        </RouterLink>

      </div>

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
  import { useStoreParameters } from '@/stores/storeParameters'
  import { storeToRefs } from 'pinia'
  import { ref, onBeforeMount, computed } from 'vue'
  import { useRoute } from 'vue-router'

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
  const isOverTable = ref([])
  const stage = ref()
  const stageIndex = ref()
  const playCard = ref(false)
  const randomQuestions = ref([])
  const randomAnswers = ref(null)
  const showCorrection = ref(false)
  const questionCall = ref(0)
  const goodAnswer = ref(null)
  const endGame = ref(false)
  const colRaw = ref([])
  const score = ref(0)
  const combo = ref(0)
  const fail = ref(0)
  const progress = ref(0)
  const question = ref([])
  const correction = ref([])
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
    let position
    if(stages.value[stageIndex.value].orientation == 'h') {      
      position = raw + col*9
    }
    if(stages.value[stageIndex.value].orientation == 'v') {      
      position = raw + col*3
    }
    if (isOverTable.value[position] !== 2) {
      playCard.value = true
      colRaw.value[0] = col
      colRaw.value[1] = raw
    }
    question.value = stages.value[stageIndex.value].questions[randomQuestions.value[questionCall.value]]
    correction.value = stages.value[stageIndex.value].correction[randomQuestions.value[questionCall.value]]

  }

  const clickAnswer = (answer,col,raw) => {
    if (answer === goodAnswer.value) {
      win(colRaw.value[0],colRaw.value[1])
      playCard.value = false
    } else {
      lose()
    }
    questionCall.value++
    randomizeAnswers()
  }

  const lose = (col, raw) => {
    fail.value+=1
    combo.value = 0
    showCorrection.value = true
    if (fail.value>=3) {
      console.log('penalité')
      for (let i = 0; i < isOverTable.value.length; i++) {
        if (isOverTable.value[i] === 2) {
          isOverTable.value[i] = 0
          if (score.value >= 10) {
            score.value -= 10
          }
          break
        }
      }
      let revealedTiles = 0
      for (let i = 0; i < isOverTable.value.length; i++) {
        if (isOverTable.value[i] === 2) {
          revealedTiles+=1
        }        
      }
      if (revealedTiles === 0) {
        score.value = 0
      }
    }
  }

  const win = (col, raw) => {
    fail.value = 0
    let position
    if(stages.value[stageIndex.value].orientation == 'h') {      
      position = raw + col*9
    }
    if(stages.value[stageIndex.value].orientation == 'v') {      
      position = raw + col*3
    }
    isOverTable.value[position] = 2
    progress.value+=100/27
    score.value+=(5+3*combo.value)
    if (score.value===495) {
      score.value = 500
    }
    if (combo.value <5 ) {
      combo.value+=1
    }
    console.log(progress.value);
    if (progress.value >= 100) {
      endGame.value = true
    }
  }

  const hideCorrection = () => {
    showCorrection.value = false
    playCard.value = false
  }

  const save = (score) => {
    parameters.value.progression[stageIndex.value].completed = true
    parameters.value.progression[stageIndex.value].score = score
    storeParameters.updateProgression()
  }

  const getImageUrl = (picName) => {
      return new URL(`../assets/images/${stages.value[stageIndex.value].stage}/tiles/${picName}`, import.meta.url).href
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
      if (stage.value === stages.value[i].id) {
        stageIndex.value = i
      }   
    }   
    randomizeQuestions()
    randomizeAnswers()
    for (let i = 0; i < 27; i++) {
      imgFile.value[i] = `${i}`+'.png'      
    }
    
  })

//
// MOUSEOVER
//
  const inFigure = (col, raw) => {
    let position
    if(stages.value[stageIndex.value].orientation == 'h') {      
      position = raw + col*9
    }
    if(stages.value[stageIndex.value].orientation == 'v') {      
      position = raw + col*3
    }
    if (isOverTable.value[position] !== 2) {
      isOverTable.value[position] = 1
    }
  }

  const outFigure = (col, raw) => {
    let position
    if(stages.value[stageIndex.value].orientation == 'h') {      
      position = raw + col*9
    }
    if(stages.value[stageIndex.value].orientation == 'v') {      
      position = raw + col*3
    }
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
    height: 980px;
    width: 1020px;
  }
  .case {
    height: 96px;
    margin: 5px 3px 5px 3px;
  }
</style>