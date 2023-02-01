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
  import { useStoreAuth } from '@/stores/storeAuth'

//
// STORE
//
  const storeAuth = useStoreAuth()

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

  /* html {
    width: 1440px;
    height: 1024px;
    background-image: url("assets/images/loginPage/loginBckGrnd.png");
    background-repeat: no-repeat;
  } */
  html {
    background-color: #e3f2fd;
  }

</style>
