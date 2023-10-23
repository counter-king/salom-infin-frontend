const Playground = [
  {
    path: "/icons",
    name: "IconsIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/Icons/index.vue"),
  },
  {
    path: "/buttons",
    name: "ButtonsIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/Button/index.vue"),
  },
  {
    path: "/avatar",
    name: "AvatarIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/Avatar/index.vue"),
  }
]
export default Playground
