const InteractionABS = [
  {
    path: 'interaction-abs',
    name: 'InteractionABSIndex',
    meta: {
      isAuthRequired: true,
    },
    component: () => import('../views/index.vue')
  }
]

export default InteractionABS