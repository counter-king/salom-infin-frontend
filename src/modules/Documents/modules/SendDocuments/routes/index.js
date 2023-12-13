const SendDocuments = [
  {
    path: "send-documents",
    name: "SendDocumentsIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/index.vue"),
  },
  {
    path: "send-documents/create/:type",
    name: "SendDocumentsCreate",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/Create.vue"),
  }
]

export default SendDocuments
