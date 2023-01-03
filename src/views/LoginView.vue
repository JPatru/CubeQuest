<template>
  <div class="app-title block has-text-centered mt-12">
    <h1 class="has-text-weight-bold">Cube Quest</h1>
  </div>
  <div class="block auth-form">
    <div class="tabs is-centered is-boxed is-normal">
      <ul>
        <li
          :class="{ 'is-active' : !register }"
        >
          <a @click.prevent="register=false">Connexion</a>
        </li>
        <li
          :class="{ 'is-active' : register }"
        >
          <a @click.prevent="register=true">Créer un compte</a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">
          {{ formTitle }}
        </div>

        <form
          @submit.prevent="onSubmit"
        >
          <div class="field">
            <label class="label">Identifiant</label>
            <div class="control">
              <input
                v-model="credentials.email"
                class="input"
                placeholder="Identifiant"
                type="email"
              >
            </div>
          </div>
          <div class="field">
            <label class="label">Mot de passe</label>
            <div class="control">
              <input
                v-model="credentials.password"
                class="input"
                placeholder="Mot de passe"
                type="password"
              >
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary is-info">
                {{ formTitle }}
              </button>
            </p>
          </div>
        </form>

      </div>
    </div>

  </div>
</template>

<script setup>

//
// IMPORTS
//

  import { ref, computed, reactive } from 'vue'

//
// CONNEXION
//

  const register = ref(false)

  const formTitle = computed(() => {
    return register.value ? "Créer un compte" : "Connexion"
  })

//
// FORMULAIRE DE CONNEXION
//

  const credentials = reactive({
    email: '',
    password: ''
  })

</script>

<style >
.app-title {
  margin-top: 100px;
  font-family: 'Quicksand', serif;
  font-size: 96px;
  text-shadow: 4px 4px 4px #aaa;
}

.auth-form {
  max-width: 450px;
  margin: 0 auto;
}
</style>