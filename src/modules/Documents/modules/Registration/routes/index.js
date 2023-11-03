const Registration = [
  {
    path: "registration",
    name: "RegistrationIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/index.vue"),
    redirect: { name: "RegistrationIncomingIndex" },
    children: [
      // Входящий
      {
        path: "incoming",
        name: "RegistrationIncomingIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Incoming/index.vue"),
      },
      {
        path: "incoming/show/:id",
        name: "RegistrationIncomingShow",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Incoming/show.vue"),
      },
      // /Входящий
      // Внутренний
      {
        path: "inner",
        name: "RegistrationInnerIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Inner/index.vue"),
      },
      // /Внутренний
    ]
  }
]

export default Registration
