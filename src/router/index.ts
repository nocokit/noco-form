import { createRouter, createWebHistory } from 'vue-router'
import PathNotFound from '../views/ErrorPage/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/form-editor'
    },
    {
      path: '/form-editor',
      name: 'form-editor',
      component: () => import('../views/FormEditor/index.vue')
    },
    {
      path: '/:id/form-editor',
      name: 'form-editor-id',
      component: () => import('../views/FormEditor/index.vue')
    },
    { path: '/:pathMatch(.*)*', component: PathNotFound },
  ]
})

export default router
