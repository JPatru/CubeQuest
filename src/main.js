import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import MathJax, { initMathJax, renderByMathjax } from "mathjax-vue3"; //en+

import App from './App.vue'
import router from './router'

function onMathJaxReady() { //en+
  const el = document.getElementById("elementId"); //en+
  renderByMathjax(el); //en+
}

initMathJax({}, onMathJaxReady); //en+

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.use(MathJax)

app.mount('#app')
