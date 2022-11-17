import { createRouter, createWebHistory } from 'vue-router'

import { getAuth } from "firebase/auth";

import { DefaultRouteNames} from "@/configuration/AppConfiguration";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/sign-up', name: DefaultRouteNames.signUp, component: () => import('../views/auth/SignUpView.vue') },
        { path: '/sign-in', name: DefaultRouteNames.signIn, component: () => import('../views/auth/SignInView.vue') },
        { path: '/', name: DefaultRouteNames.home.public, component: () => import('../views/public/HomeView.vue') },
        { path: '/about', name: 'about', component: () => import('../views/public/AboutView.vue') },
        { path: '/lorem', name: 'lorem', component: () => import('../views/public/LoremIpsum.vue') },
        { path: '/dogs', name: 'dogs', component: () => import('../views/public/DogsView.vue') },

        // Routes requiring authentication
        { path: '/user', name: DefaultRouteNames.home.user, component: () => import('../views/app/UserHomeView.vue'), meta: { requiresAuth: true } },
        { path: '/inbox', name: 'inbox', component: () => import('../views/app/InboxView.vue'), meta: { requiresAuth: true } },
        { path: '/dashboard', name: 'dashboard', component: () => import('../views/app/DashboardView.vue'), meta: { requiresAuth: true } },

        // Not found
        { path: "/:pathMatch(.*)*", name: 'notFound', component: () => import('../views/public/PageNotFound.vue') }
    ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !getAuth().currentUser) {
        next({ name: DefaultRouteNames.signIn, query: { redirect: to.name }})
    } else {
        if (to.name === DefaultRouteNames.signIn && getAuth().currentUser) { next({ name: DefaultRouteNames.home.user }) }
        else {
            next()
        }
    }
})

export default router
