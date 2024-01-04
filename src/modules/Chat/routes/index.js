const Chat = [
  {
    path: "chat",
    name: "ChatIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/Home.vue"),
  }
]

export default Chat
