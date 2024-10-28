import { createRouter, createWebHistory } from 'vue-router'

import routerGuards from '@/router/routerGuards'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import VerifyView from '@/views/VerifyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'HomeView',
          component: HomeView,
        },
        {
          path: '/profile',
          name: 'ProfileView',
          component: ProfileView,
          meta: { auth: true },
        },
      ],
    },
    {
      path: '/verify',
      name: 'VerifyView',
      component: VerifyView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'HomeView' },
    },
  ],
})

routerGuards(router)

export default router
