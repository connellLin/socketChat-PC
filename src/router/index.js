import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/hasChat", name: "HasChat", component: () => import("../views/HasChat/HasChat.vue") }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;