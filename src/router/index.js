import { createRouter, createWebHistory } from 'vue-router'
// Modules
import Playground from "../modules/Playground/routes"
import Dashboard from "../modules/Dashboard/routes"
import Documents from "../modules/Documents/routes"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // MainLayout
    {
      path: "/",
      name: "MainLayout",
      component: () => import("@/layout/MainLayout.vue"),
      redirect: { name: "DashboardIndex" },
      children: [
        // Dashboard
        ...Dashboard,
        // Documents
        ...Documents,
        // Playground
        ...Playground
      ]
    },
    // /MainLayout

    // AuthLayout
    {
      path: "/auth",
      name: "AuthLayout",
      component: () => import("@/layout/AuthLayout.vue")
    },
    // /AuthLayout
  ]
})

export default router
