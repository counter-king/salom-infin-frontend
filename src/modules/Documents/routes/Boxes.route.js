const Boxes = [
  {
    path: "boxes",
    name: "BoxesIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/Boxes/index.vue"),
    redirect: { name: "IncomingIndex" },
    children: [
      // Входящие
      {
        path: "incoming",
        name: "IncomingIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Boxes/Incoming/index.vue"),
      },
      // Исходящие
      {
        path: "outgoing",
        name: "OutgoingIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Boxes/Outgoing/index.vue"),
      },
      // На рассмотрении
      {
        path: "review",
        name: "ReviewIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Boxes/Review/index.vue"),
      },
      // На подпись
      {
        path: "sign",
        name: "SignIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Boxes/Sign/index.vue"),
      },
      // На согласовании
      {
        path: "approval",
        name: "ApprovalIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Boxes/Approval/index.vue"),
      },
      // На контроль
      {
        path: "control",
        name: "ControlIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Boxes/Control/index.vue"),
      },
    ]
  }
]

export default Boxes
