<template>

  <div class="columns">

    <div class="column is-one-quarter">
      <div class="box has-text-centered">
        <figure class="image is-128x128 is-inline-block">
          <img src="../assets/images/stage1/preview.png">
        </figure>
        <RouterLink
          class="button is-primary is-small is-success m-2 is-centered"
          :to="`${stages[0].id}`"
        >
          {{ stages[0].title }}
        </RouterLink>
        <p>{{ stages[0].type }}</p>
      </div>
    </div>

    <div class="column is-one-quarter">
      <div class="box has-text-centered">
        <figure class="image is-128x128 is-inline-block">
          <img src="../assets/images/stage2/preview.png">
        </figure>
        <RouterLink
          class="button is-primary is-small is-success m-2 is-centered"
          :to="`${stages[1].id}`"
        >
          {{ stages[1].title }}
        </RouterLink>  
        <p>{{ stages[1].type }}</p>
      </div>
    </div>

    <div class="column is-one-quarter">
      <div class="box has-text-centered">
        <figure class="image is-128x128 is-inline-block">
          <img src="../assets/images/stage3/preview.png">
        </figure>
        <RouterLink
          class="button is-primary is-small is-success m-2 is-centered"
          :to="`${stages[2].id}`"
        >
          {{ stages[2].title }}
        </RouterLink>   
      </div>
    </div>

    <div class="column is-one-quarter">
      <div class="box has-text-centered">
        <figure class="image is-128x128 is-inline-block">
          <img src="../assets/images/stage4/preview.png">
        </figure>
        <RouterLink
          class="button is-primary is-small is-success m-2 is-centered"
          :to="`${stages[3].id}`"
        >
          {{ stages[3].title }}
        </RouterLink>    
      </div>
    </div>

  </div>
    
</template>

<script setup>
//
// IMPORTS
//
  import { ref } from 'vue'
  import { useStoreStages } from '@/stores/storeStages'
  import { storeToRefs } from 'pinia'

//
// STORES
//
  
  const storeStages = useStoreStages()

//
// REFS
//
  const { stages } = storeToRefs(storeStages)

//
// REFS
//
  const id = ref(1)

</script>