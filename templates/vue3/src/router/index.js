import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, 
  {
    path: '/demo',
    name: 'demo',
    component: () => import('../views/demo')
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('../views/todo')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
