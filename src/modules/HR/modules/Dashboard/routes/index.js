const HrDashboard = [
  {
    path: 'dashboard',
    name: 'HrDashboardIndex',
    meta: {
      isAuthRequired: true,
      navigation: true
    },
    redirect: {
      name: 'HRMain'
    },
    component: () => import('../views/index.vue'),
    children: [
      {
        path: 'main',
        name: 'HRMain',
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import('../views/Main.vue'),
      },
      {
        path: 'financial',
        name: 'HRFinancial',
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import('../views/Financial.vue'),
      },
      {
        path: 'trip',
        name: 'HRTrip',
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import('../views/Trip.vue'),
      },
    ]
  }
]

export default HrDashboard
