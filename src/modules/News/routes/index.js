
const News = [
  {
    path: 'news',
    name: 'NewsIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/index.vue'),
    redirect: { name: "NewsList" },
    children: [
      {
        path: 'list',
        name: 'NewsList',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/List.vue')
      },
      // {
      //   path: 'my-save-news-list',
      //   name: 'MySaveNewsList',
      //   meta: {
      //     isAuthRequired: true
      //   },
      //   component: () => import('../views/MySaveNewsList.vue')
      // },
      {
        path: 'my-news-list',
        name: 'MyNewsList',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/MyNewsList.vue')
      },
      {
        path: 'moderation-list',
        name: 'NewsModerationList',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/ModerationList.vue')
      },
    ]
  },
  {
    path: 'news/:id',
    name: 'NewsShow',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/Show.vue')
  },
  {
    path: 'news/edit/:id',
    name: 'NewsEdit',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/Edit.vue')
  },
  {
    path: 'news/create',
    name: 'NewsCreate',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/Create.vue')
  }
]

export default News
