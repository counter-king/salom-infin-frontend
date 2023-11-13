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
      {
        path: "inner/show/:id",
        name: "RegistrationInnerIndexShow",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Inner/show.vue"),
      },
      // /Внутренний
      // Исходящие
      {
        path: "outgoing",
        name: "RegistrationOutgoingIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Outgoing/index.vue"),
      },
      {
        path: "outgoing/show/:id",
        name: "RegistrationOutgoingIndexShow",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Outgoing/show.vue"),
      },
      // /Исходящие
    ]
  }
]

export default Registration
