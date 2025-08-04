const Survey = [
  {
    path: 'survey',
    name: 'SurveyIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/index.vue'),
    redirect: {
      name: 'TestsIndex'
    },
    children: [
      {
        path: 'tests',
        name: 'TestsIndex',
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import('../views/Tests/index.vue'),
      },
      {
        path: 'survey',
        name: 'SurveyIndex',
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import('../views/Survey/index.vue'),
      }
    ]
  }
]

export default Survey
