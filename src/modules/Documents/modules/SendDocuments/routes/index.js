const SendDocuments = [
  {
    path: "send-documents",
    name: "SendDocumentsIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/index.vue"),
    redirect: { name: "SendDocumentsList" },
    children: [
      {
        path: "list",
        name: "SendDocumentsList",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/List.vue"),
      },
      {
        path: "create/:type",
        name: "SendDocumentsCreate",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Create.vue"),
      },
      {
        path: "detail/:id/:subType",
        name: "SendDocumentsDetail",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Detail.vue"),
      }
    ]
  }
]

export default SendDocuments
