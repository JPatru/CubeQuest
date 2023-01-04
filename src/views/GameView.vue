<template>
  <div v-for="j in 3" :key="j" class="columns is-variable is-2 is-gapless board">
    <div v-for="i in 7" :key="i" class="column">
      
      <div class="has-text-centered">
        <figure class="image is-96x96 is-inline-block">
          <img src="https://bulma.io/images/placeholders/96x96.png">
        </figure>
      </div>

    </div>
  </div>  
    
</template>

<style>
  .board {
    margin: auto;
    width: 720px;
    height: 80px;
  }
</style>