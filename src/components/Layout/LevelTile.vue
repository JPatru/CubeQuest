<template>

<div>
  <div class="tile is ancestor box has-text-centered pt-4">
    <div class="tile is-12 is-vertical">
      <div class="tile">

        <div class="tile is-1"></div>

        <div class="tile is-6">
          <figure class="image is-128x128 is-inline-block">
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
              v-if="true"
              class="button is-primary is-small is-warning mt-2 is-centered"
              :to="`${stageObject.id[i-1]}`"
            >
              Niv. {{ stageObject.subStage[i-1] }}
            </RouterLink>

            <div v-else  class="button is-primary is-small is-success mt-2 is-centered">
              <p class="is-size-7 has-text--success-light is-inline">Niv. 1</p> 
              <i class="mdi mdi-star-check is-large is-size-6 has-text--success-light"></i>
            </div>
          </div>

        </div>
      </div>

      <div class="tile is-parent">
        <div class="tile">
          <p class="container is-size-5">{{ stageObject.type }}</p>
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
  import { ref } from 'vue'

//
// PROPS
//
  const props = defineProps({
    stageObject: {
      type: Object,
      required: true
    }
  })

  console.log(props.stageObject.stage);

  const getImageUrl = (folder) => {
      return new URL(`../../assets/images/${folder}/preview.png`, import.meta.url).href
  }





</script>