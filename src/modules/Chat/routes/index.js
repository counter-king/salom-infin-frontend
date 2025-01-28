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
        path: "private/:id",
        name: "ChatPrivateDetail",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/PrivateChat.vue")
      },
      {
        path: "group/:id",
        name: "ChatGroupDetail",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/GroupChat.vue")
      },
    ]
  }
]

export default Chat
