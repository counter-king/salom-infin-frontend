import { createRouter, createWebHistory } from 'vue-router'
// Modules
import Playground from "../modules/Playground/routes"
import Auth from "../modules/Auth/routes"
import Dashboard from "../modules/Dashboard/routes"
import Documents from "../modules/Documents/routes"
import Settings from "../modules/Settings/routes"
import Search from "../modules/Search/routes"

import { getStorageItem } from "@/utils/storage"
import { ACCESS } from "@/constants/storage"


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
        // Settings
        ...Settings,
        // Search
        ...Search,

      ]
    },
    // /MainLayout

    // AuthLayout
    {
      path: "/auth",
      name: "AuthLayout",
      component: () => import("@/layout/AuthLayout.vue"),
      redirect: { name: "Login" },
      children: [
        // Auth
        ...Auth
      ]
    },
    // /AuthLayout

    // Playground
    ...Playground
  ]
})

// router.beforeEach((to, from, next) => {
//   const paramsLocale = to.params.locale
//   const token = getStorageItem(ACCESS)
//
//   if (to.meta.isAuthRequired && !token) {
//     return next({ name: "AuthLayout", params: { locale: paramsLocale } });
//   }
//
//   next();
// })
export default router
