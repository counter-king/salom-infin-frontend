const Chat = [
  {
    path: "chat",
    name: "ChatIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/index.vue"),
    redirect: { name: "ChatPrivate" },
    children: [
      {
        path: "private",
        name: "ChatPrivate",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/PrivateChat.vue")
      },
      {
        path: "group",
        name: "ChatGroup",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/GroupChat.vue")
      },
    ]
  }
]

export default Chat
