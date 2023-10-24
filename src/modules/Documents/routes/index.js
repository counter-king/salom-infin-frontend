import Boxes from "../modules/Boxes/routes"
import SendDocuments from "../modules/SendDocuments/routes"

const Documents = [
  {
    path: "documents",
    name: "DocumentsIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/index.vue"),
    redirect: { name: "BoxesIndex" },
    children: [
      // Ящики
      ...Boxes,
      // Отправка документов
      ...SendDocuments
    ]
  }
]

export default Documents
