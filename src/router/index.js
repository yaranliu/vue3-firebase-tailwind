import { createRouter, createWebHistory } from 'vue-router'

import { getAuth } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/sign-up', name: 'sign-up', component: () => import('../views/SignUpView.vue') },
    { path: '/sign-in', name: 'sign-in', component: () => import('../views/SignInView.vue') },

    // Routes requiring authentication
    { path: '/dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { requiresAuth: true } },
  ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !getAuth().currentUser) {
        next('/sign-in')
    } else {
        next()
    }
})

export default router
