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
      // На рассмотрении
      {
        path: "review",
        name: "ReviewIndex",
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import("../views/Review/index.vue"),
      },
      {
        path: "review/show/:id",
        name: "ReviewShow",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Review/show.vue"),
      },
      // Входящие
      {
        path: "assignment",
        name: "AssignmentIndex",
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import("../views/Assignment/index.vue"),
      },
      {
        path: "assignment/show/:id",
        name: "AssignmentShow",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Assignment/show.vue"),
      },
      // Исходящие
      {
        path: "outgoing",
        name: "OutgoingIndex",
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import("../views/Outgoing/index.vue"),
      },
      // На подпись
      {
        path: "sign",
        name: "SignIndex",
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import("../views/Sign/index.vue"),
      },
      // На согласовании
      {
        path: "approval",
        name: "ApprovalIndex",
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import("../views/Approval/index.vue"),
      },
      // На контроль
      {
        path: "control",
        name: "ControlIndex",
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import("../views/Control/index.vue"),
      },
    ]
  }
]

export default Boxes
