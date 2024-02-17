const Chat = [
  {
    path: "chat",
    name: "ChatIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/index.vue"),
  }
]

export default Chat
