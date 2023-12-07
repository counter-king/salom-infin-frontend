const Boxes = [
  {
    path: "boxes",
    name: "BoxesIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/index.vue"),
    redirect: { name: "ReviewIndex" },
    children: [
      // Входящие
      {
        path: "incoming",
        name: "IncomingIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Incoming/index.vue"),
      },
      // Исходящие
      {
        path: "outgoing",
        name: "OutgoingIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Outgoing/index.vue"),
      },
      // На рассмотрении
      {
        path: "review",
        name: "ReviewIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Review/index.vue"),
      },
      // На подпись
      {
        path: "sign",
        name: "SignIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Sign/index.vue"),
      },
      // На согласовании
      {
        path: "approval",
        name: "ApprovalIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Approval/index.vue"),
      },
      // На контроль
      {
        path: "control",
        name: "ControlIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Control/index.vue"),
      },
    ]
  }
]

export default Boxes
