import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  
     {
      path: '/frist-page',
      name: 'frist-page',
      component: () => import('../views/FristPage.vue'),
    },
    {
      path: '/computed',
      name: 'computed',
      // lazy-load: chỉ tải khi người dùng truy cập trang này
      component: () => import('../views/Computed.vue'),
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/Todo.vue'),
    }
  ],
})

export default router
