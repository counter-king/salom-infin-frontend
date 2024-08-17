const Handbook = [
  {
    path: 'handbook',
    name: 'HandbookIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/index.vue')
  }
]

export default Handbook
