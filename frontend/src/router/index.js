import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'



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
    path: '/profile/:id',
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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Fetch user data if not already authenticated
  if (!authStore.isAuthenticated && document.cookie.includes('token')) {
    await authStore.fetchUser();
  }

  // Redirect to login if not authenticated
  if (to.name !== 'login' && to.name !== 'register' && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
    next({ name: 'feed' }); // Redirect authenticated users away from login/register
  } else {
    next();
  }
});

export default router
