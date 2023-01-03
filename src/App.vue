<template>

  <div v-if='route.path != "/"'>
    <NavBar />
  </div>

  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>

</template>

<script setup>

//
// IMPORTS
//
  import NavBar from '@/components/Layout/NavBar.vue'
  import { RouterView, useRoute } from 'vue-router'
  import { onMounted } from 'vue'

//
// ROUTER
//
  const route = useRoute()

//
// MOUNTED
//
  onMounted(() => {
    storeAuth.init()
  })

</script>

<style>
  @import 'bulma/css/bulma.min.css';

  html {
    background-color: #ffffff;
  }

</style>
