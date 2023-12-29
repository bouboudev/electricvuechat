import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Login from '../components/Login.vue'
import Chat from '../components/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: Chat,
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
    component: () => import('../components/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
