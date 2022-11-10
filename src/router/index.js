import { createRouter, createWebHistory } from 'vue-router'

import { getAuth } from "firebase/auth";

import { RouteNames} from "@/configuration/app-configuration";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/sign-up', name: RouteNames.signUp, component: () => import('../views/auth/SignUpView.vue') },
        { path: '/sign-in', name: RouteNames.signIn, component: () => import('../views/auth/SignInView.vue') },
        { path: '/', name: RouteNames.home.public, component: () => import('../views/public/HomeView.vue') },
        { path: '/about', name: 'about', component: () => import('../views/public/AboutView.vue') },
        { path: '/lorem', name: 'lorem', component: () => import('../views/public/LoremIpsum.vue') },

        // Routes requiring authentication
        { path: '/user', name: RouteNames.home.user, component: () => import('../views/app/UserHomeView.vue'), meta: { requiresAuth: true } },
        { path: '/dashboard', name: 'dashboard', component: () => import('../views/app/DashboardView.vue'), meta: { requiresAuth: true } },

        // Not found
        { path: "/:pathMatch(.*)*", name: 'notFound', component: () => import('../views/public/PageNotFound.vue') }
    ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !getAuth().currentUser) {
        next({ name: RouteNames.signIn, query: { redirect: to.name }})
    } else {
        if (to.name === RouteNames.signIn && getAuth().currentUser) { next({ name: RouteNames.home.user }) }
        else {
            next()
        }
    }
})

export default router
