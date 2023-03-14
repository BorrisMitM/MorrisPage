import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Project from '@/views/Project.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/#projectOMW',
    name: 'About',
    component: About
  },
  {
    path: '/#projectOMW',
    name: 'Project',
    component: Project
  },
  {
    path: '/:catchAll(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
