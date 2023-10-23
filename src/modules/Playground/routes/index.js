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
  }
]

export default Playground
