<template>
  <div class="app-title block has-text-centered mt-12 mb-6">
    <h1 class="has-text-weight-bold">Cube Quest</h1>
  </div>

  <div class="columns">



    <div class="block auth-form column is-one-third">
    <div class="tabs is-centered is-normal">
      <ul>
        <li
          :class="{ 'is-active' : !register }"
        >
          <a class="is-size-7" @click.prevent="register=false">Connexion</a>
        </li>
        <li
          :class="{ 'is-active' : register }"
        >
          <a class="is-size-7" @click.prevent="register=true">Créer un compte</a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content p-4">

        <form
          @submit.prevent="onSubmit"
        >
          <div class="field">
            <label class="label is-size-7">Identifiant</label>
            <div class="control">
              <input
                v-model="credentials.email"
                class="input is-small"
                placeholder="Identifiant"
                type="email"
              >
            </div>
          </div>
          <div class="field">
            <label class="label is-size-7">Mot de passe</label>
            <div class="control">
              <input
                v-model="credentials.password"
                class="input is-small"
                placeholder="Mot de passe"
                type="password"
              >
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary is-info is-small is-rounded">
                {{ formTitle }}
              </button>
            </p>
          </div>
        </form>

      </div>
    </div>

  </div>

  </div>


</template>

<script setup>

//
// IMPORTS
//

  import { ref, computed, reactive } from 'vue'
  import { useStoreAuth } from '@/stores/storeAuth'

//
// STORE
//
  const storeAuth = useStoreAuth()

//
// CONNEXION
//

  const register = ref(false)

  const formTitle = computed(() => {
    return register.value ? "Créer un compte" : "Connexion"
  })

  const credentials = reactive({
    email: '',
    password: ''
  })

//
// SUBMIT
//

  const onSubmit = () => {
    if (!credentials.email || !credentials.password) {
      alert('Attention, veuillez rentrer un email valide et un mot de passe')
    }
    else {
      if (register.value) {
        storeAuth.registerUser(credentials)
      }
      else {
        storeAuth.loginUser(credentials)
      }
    }
  }

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');

  @font-face {
    font-family: "cubic";
    src: url("../assets/fonts/cubic.ttf");
  }

.app-title {
  margin-top: 60px;
  font-family: 'Poiret One', cursive, serif;
  letter-spacing: 16px;
  font-size: 96px;
  /* text-shadow: 2px 4px 24px #b8b8b8; */
}

.auth-form {
  max-width: 220px;
  margin: 0 auto;

}
</style>