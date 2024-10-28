import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import VerifyView from '@/views/VerifyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/verify',
      name: 'VerifyView',
      component: VerifyView,
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: ProfileView,
      meta: { auth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'HomeView' },
    },
  ],
})

export default router
