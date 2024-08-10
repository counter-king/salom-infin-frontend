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
        path: "create/:document_type",
        name: "SendDocumentsCreate",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Create.vue"),
      },
      {
        path: "update/:id/:document_type/:document_sub_type",
        name: "SendDocumentsUpdate",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Update.vue"),
      },
      {
        path: "detail/:id/:document_type/:document_sub_type",
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
