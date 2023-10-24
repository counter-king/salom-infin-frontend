import Boxes from "../modules/Boxes/routes"
import SendDocuments from "../modules/SendDocuments/routes"
import Registration from "../modules/Registration/routes"

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
      ...SendDocuments,
      // Регистрация
      ...Registration
    ]
  }
]

export default Documents
