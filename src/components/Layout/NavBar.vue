<template>
  <nav
    class="navbar is-info"
    aria-label="main navigation"
    role="navigation"
  >
    <div class="container  is-max-widescreen">
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
          {{ storeAuth.user.alias }} déconnexion 
          </button>
        </div>

        <div class="navbar-end">

          <RouterLink
            class="navbar-item"
            to="/LevelSelection"
            active-class="is-active"
          >
            Selection de niveau
          </RouterLink>

          <!-- <RouterLink
            class="navbar-item"
            to="/game"
            active-class="is-active"
          >
            Jouer
          </RouterLink> -->

          <RouterLink
            class="navbar-item"
            to="/player"
            active-class="is-active"
          >
            Mon compte
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
  import { useStoreAuth } from '@/stores/storeAuth'

//
// STORES
//
  const storeAuth = useStoreAuth()

//
// MENU MOBILE
//
  const showMobileNav = ref(false)

//
// LOGOUT
//
  const logout = () => {
    showMobileNav.value = false
    storeAuth.logoutUser()
  }

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