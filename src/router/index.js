import { createRouter, createWebHistory } from 'vue-router'
import LevelSelectionView from '../views/LevelSelectionView.vue'
import LoginView from '../views/LoginView.vue'
import PlayerView from '../views/PlayerView.vue'
import GameView from '../views/GameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/levelSelection',
      name: 'levelSelection',
      component: LevelSelectionView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    },
    {
      path: '/player',
      name: 'player',
      component: PlayerView
    }
  ]
})

export default router
