const Kanban = [
  {
    path: "kanban",
    name: "KanbanIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/Home.vue"),
  }
]

export default Kanban
