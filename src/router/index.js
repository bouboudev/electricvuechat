import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: () => import('../views/Chat.vue'),
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      const user = store.state.user;
      if (user) {
        next();
      } else {
        next('/');
        
      }
    }
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
