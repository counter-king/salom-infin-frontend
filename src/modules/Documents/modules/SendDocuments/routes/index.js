const SendDocuments = [
  {
    path: "send-documents",
    name: "SendDocumentsIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/index.vue"),
    redirect: { name: "SendDocumentsInnerIndex" },
    children: [
      // Внутренний
      {
        path: "inner",
        name: "SendDocumentsInnerIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Inner/index.vue"),
      },
      // /Внутренний

      // Рапорт
      {
        path: "notice",
        name: "SendDocumentsNoticeIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Notice/index.vue"),
      },
      // /Рапорт
    ]
  }
]

export default SendDocuments
