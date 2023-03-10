import { createRouter, createWebHistory } from "vue-router";
import loginpage from '../components/LoginPage.vue'
import insertView from '../views/insertView.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "login",
            component: loginpage,
        },
        {
            path: "/insert",
            name: "insert",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: insertView
        },
    ],
});

export default router;