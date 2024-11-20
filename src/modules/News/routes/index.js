const News = [
  {
    path: 'news',
    name: 'NewsIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/index.vue')
  }
]

export default News
