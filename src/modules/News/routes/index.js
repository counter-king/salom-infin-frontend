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
    component: () => import('../views/show.vue')
  },
  {
    path: 'news/create',
    name: 'NewsCreate',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/create.vue')
  }
]

export default News
