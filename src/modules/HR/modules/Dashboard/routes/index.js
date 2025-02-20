const HrDashboard = [
  {
    path: 'dashboard',
    name: 'HrDashboardIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/index.vue'),
    children: [

    ]
  }
]

export default HrDashboard
