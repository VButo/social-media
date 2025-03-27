import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'feed',
      component: () => import('@/views/Feed.vue'),
    },
    /* 
    {
      path: '/profile/:username',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
    },
    */
   {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
   },
   {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Registration.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/Users.vue'),
    }
  ],
})

export default router
