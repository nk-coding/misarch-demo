// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/product"
    },
    {
        path: "/product",
        component: () => import("@/views/ProductsView.vue")
    },
    {
        path: "/product/:product",
        component: () => import("@/views/ProductView.vue")
    },
    {
        path: "/variant/:variant",
        component: () => import("@/views/ProductVariantView.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
