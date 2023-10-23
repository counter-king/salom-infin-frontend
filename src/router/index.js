import { createRouter, createWebHistory } from 'vue-router'
// Modules
import Playground from "../modules/Playground/routes"
import Auth from "../modules/Auth/routes"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // MainLayout
    {
      path: "/",
      name: "MainLayout",
      component: () => import("@/layout/MainLayout.vue"),
      children: [
        // Icons
        ...Playground
      ]
    },
    // /MainLayout

    // AuthLayout
    {
      path: "/auth",
      name: "AuthLayout",
      component: () => import("@/layout/AuthLayout.vue"),
      children: [
        // Auth
        ...Auth
      ]
    }
    // /AuthLayout
  ]
})

export default router
