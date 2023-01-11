<template>

  <div class="columns is-3">

    <div class="column is-one-third">
      <div class="tile is-ancestor box has-text-centered">
        <div class="tile is-12 is-vertical">
          <div class="tile">

            <div class="tile is-1"></div>

            <div class="tile is-6">
              <figure class="image is-128x128 is-inline-block">
                <img src="../assets/images/stage1/preview.png">
              </figure>
            </div>

            <div class="tile is-vertical is-parent is-5 p-0">

              <div class="tile">
                <RouterLink
                  v-if="!parameters.progression[0].completed"
                  class="button is-primary is-small is-warning mt-2 is-centered"
                  :to="`${stages[0].id}`"
                >
                  Niv. {{ stages[0].subStage }}
                </RouterLink>

                <div v-else  class="button is-primary is-small is-success mt-2 is-centered">
                  <p class="is-size-7 has-text--success-light is-inline">Niv. 1</p> 
                  <i class="mdi mdi-star-check is-large is-size-6 has-text--success-light"></i>
                </div>
              </div>

              <div class="tile">
                <RouterLink
                  class="button is-primary is-small is-warning mt-2 is-centered"
                  :to="`${stages[1].id}`"
                >
                  Niv. {{ stages[1].subStage }}
                </RouterLink>
              </div>
              <div class="tile">
                <RouterLink
                  class="button is-primary is-small is-warning mt-2 is-centered"
                  :to="`${stages[2].id}`"
                >
                  Niv. {{ stages[2].subStage }}
                </RouterLink>
              </div>
            </div>
          </div>

          <div class="tile is-parent">
            <div class="tile">
              <div class="container is-size-5">{{ stages[0].type }}</div>
            </div>
          </div>

        </div>
      </div>
    </div>      

    <div class="column is-one-third">
      <div class="tile is-ancestor box has-text-centered">
        <div class="tile is-12 is-vertical">
          <div class="tile">

            <div class="tile is-1"></div>

            <div class="tile is-6">
              <figure class="image is-128x128 is-inline-block">
                <img src="../assets/images/stage2/preview.png">
              </figure>
            </div>

            <div class="tile is-vertical is-parent is-5 p-0">

              <div class="tile">
                <RouterLink
                  v-if="!parameters.progression[0].completed"
                  class="button is-primary is-small is-warning mt-2 is-centered"
                  :to="`${stages[3].id}`"
                >
                  Niv. {{ stages[3].subStage }}
                </RouterLink>

                <div v-else  class="button is-primary is-small is-success mt-2 is-centered">
                  <p class="is-size-7 has-text--success-light is-inline">Niv. 1</p> 
                  <i class="mdi mdi-star-check is-large is-size-6 has-text--success-light"></i>
                </div>
              </div>

              <div class="tile">
                <RouterLink
                  class="button is-primary is-small is-warning mt-2 is-centered"
                  :to="`${stages[4].id}`"
                >
                  Niv. {{ stages[4].subStage }}
                </RouterLink>
              </div>
            </div>
          </div>

          <div class="tile is-parent">
            <div class="tile">
              <div class="container is-size-5">{{ stages[3].type }}</div>
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- <div class="column is-one-third">
      <div class="box has-text-centered">
        <figure class="image is-128x128 is-inline-block">
          <img src="../assets/images/stage2/preview.png">
        </figure><br>

        <RouterLink
          class="button is-primary is-small is-warning m-2 is-centered"
          :to="`${stages[3].id}`"
        >
          Niv. {{ stages[3].subStage }}
        </RouterLink>  

        <RouterLink
          class="button is-primary is-small is-warning m-2 is-centered"
          :to="`${stages[4].id}`"
        >
          Niv. {{ stages[4].subStage }}
        </RouterLink>  

        <p>{{ stages[4].type }}</p>
      </div>
    </div>

    <div class="column is-one-third">
      <div class="box has-text-centered">
        <figure class="image is-128x128 is-inline-block">
          <img src="../assets/images/stage3/preview.png">
        </figure><br>
        <RouterLink
          class="button is-primary is-small is-warning m-2 is-centered"
          :to="`${stages[4].id}`"
        >
          Niv. {{ stages[4].subStage }}
        </RouterLink>   
      </div>
    </div>
    
  </div>

  <div class="columns">

    <div class="column is-one-third">
      <div class="box has-text-centered">
        <figure class="image is-128x128 is-inline-block">
          <img src="../assets/images/stage4/preview.png">
        </figure><br>
        <RouterLink
          class="button is-primary is-small is-warning m-2 is-centered"
          :to="`${stages[5].id}`"
        >
          Niv. {{ stages[5].subStage }}
        </RouterLink>    
      </div>
    </div>
-->
  </div> 
    
</template>

<script setup>
//
// IMPORTS
//
  import { ref, onBeforeMount } from 'vue'
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
  // onBeforeMount(() => {
  //   for (let i = 0; i < stages.value.length; i++) {
  //     let tempArray = {
  //       content: {
  //         stage: stages.value[i].stage,
  //         id: stages.value[i].id,
  //         type: stages.value[i].type,
  //         subStage: stages.value[i].subStage,
  //       }
  //     }
  //     for (let j = 0; j < stagesArray.value.length; j++) {
  //       if (tempArray.content.) {
  //         const element = array[j];
  //       }
        
  //     }
  //     stagesArray.value[i] = {

  //     }
      
  //   }
  // })

//
// REFS
//
  const id = ref(1)

</script>

<style>
</style>