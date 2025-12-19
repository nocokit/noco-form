import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'form-editor',
      component: () => import('../views/FormEditor/index.vue')
    },
    {
      path: '/:id',
      name: 'form-editor-with-id',
      component: () => import('../views/FormEditor/index.vue')
    }
  ]
})

export default router
