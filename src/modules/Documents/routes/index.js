import Boxes from "./Boxes.route"
import SendDocuments from "./SendDocuments.route"

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
