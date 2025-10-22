const Policies = [
  {
    path: 'policies',
    name: 'PoliciesIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/Policies/index.vue'),
  }
]

export default Policies
