<template>

  <div class="columns">

    <div class="column is-one-quarter">
      <div class="box has-text-centered">
        <figure class="image is-128x128 is-inline-block">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </figure>
        <RouterLink
          class="button is-primary is-small is-success m-2 is-centered"
          :to="`${stages[0].id}`"
        >
          Stage {{ stages[0].id }}
        </RouterLink>
      </div>
    </div>

    <div class="column is-one-quarter">
      <div class="box has-text-centered">
        <figure class="image is-128x128 is-inline-block">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </figure>
        <RouterLink
          class="button is-primary is-small is-success m-2 is-centered"
          :to="`${stages[1].id}`"
        >
          Stage {{ stages[1].id }}
        </RouterLink>  
      </div>
    </div>

    <div class="column is-one-quarter">
      <div class="box has-text-centered">
        <figure class="image is-128x128 is-inline-block">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </figure>
        <RouterLink
          class="button is-primary is-small is-success m-2 is-centered"
          :to="`${stages[2].id}`"
        >
          Stage {{ stages[2].id }}
        </RouterLink>   
      </div>
    </div>

    <div class="column is-one-quarter">
      <div class="box has-text-centered">
        <figure class="image is-128x128 is-inline-block">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </figure>
        <RouterLink
          class="button is-primary is-small is-success m-2 is-centered"
          :to="`${stages[3].id}`"
        >
          Stage {{ stages[3].id }}
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