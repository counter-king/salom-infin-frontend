const News = [
  {
    path: 'news',
    name: 'NewsIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/index.vue')
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
