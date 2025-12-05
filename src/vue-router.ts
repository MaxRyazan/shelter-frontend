import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        path: "/",
        name: "App",
        component: () => import("@/components/layouts/AppLayout.vue"),
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