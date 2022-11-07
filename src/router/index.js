import { createRouter, createWebHistory } from 'vue-router'

import { getAuth } from "firebase/auth";

import { RouteNames} from "@/configuration/app-configuration";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/sign-up', name: RouteNames.signUp, component: () => import('../views/auth/SignUpView.vue') },
        { path: '/sign-in', name: RouteNames.signIn, component: () => import('../views/auth/SignInView.vue') },
        { path: '/', name: 'home', component: () => import('../views/public/HomeView.vue') },
        { path: '/about', name: 'about', component: () => import('../views/public/AboutView.vue') },
        { path: '/lorem', name: 'lorem', component: () => import('../views/public/LoremIpsum.vue') },

        // Routes requiring authentication
        { path: '/dashboard', name: 'dashboard', component: () => import('../views/app/DashboardView.vue'), meta: { requiresAuth: true } },
    ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !getAuth().currentUser) {
        next({ name: RouteNames.signIn })
    } else {
        next()
    }
})

export default router
