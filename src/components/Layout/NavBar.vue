<template>
  <nav
    class="navbar is-info"
    aria-label="main navigation"
    role="navigation"
  >
    <div class="container is-max-desktop">
      <div class="navbar-brand">
          <RouterLink
            class="navbar-item is-size-4 is-family-monospace"
            to="/"
          >
            Cube Quest
          </RouterLink>

        <a
          @click.prevent="showMobileNav = !showMobileNav"
          class="navbar-burger"
          :class="{ 'is-active' : showMobileNav }"
          aria-expanded="false"
          aria-label="menu"
          data-target="navbarBasicExample"
          role="button"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active' : showMobileNav }"
      >

        <div class="navbar-start">
          <button
            class="button is-small is-success mt-3 ml-3"
            @click="logout"
          >
          déconnexion 
          </button>
        </div>

        <div class="navbar-end">

          <RouterLink
            class="navbar-item"
            to="/LevelSelection"
            active-class="is-active"
          >
            Stage selection
          </RouterLink>

          <RouterLink
            class="navbar-item"
            to="/game"
            active-class="is-active"
          >
            Jouer
          </RouterLink>

          <RouterLink
            class="navbar-item"
            to="/player"
            active-class="is-active"
          >
            Moncompte
          </RouterLink>

        </div>
      </div>
    </div>

  </nav>

</template>

<script setup>
//
// IMPORTS
//
  import { ref } from 'vue'

//
// MENU MOBILE
//
  const showMobileNav = ref(false)

</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>