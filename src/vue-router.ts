import {createRouter, createWebHistory, type NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {user} from "@/__stores/user-store";


const routes = [
    {
        path: "/",
        name: "App",
        component: () => import("@/components/layouts/AppLayout.vue"),
        beforeEnter: (
            _: RouteLocationNormalized,
            __: RouteLocationNormalized,
            next: NavigationGuardNext
        ) => {
            if (import.meta.env.DEV) {
                next()
            } else if (import.meta.env.PROD) {
                if (!user.value?.id) next('/who-am-i')
                else next()
            }
        }
    },
    {
        path: "/who-am-i",
        name: "Auth",
        component: () => import("@/components/layouts/AuthLayout.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;